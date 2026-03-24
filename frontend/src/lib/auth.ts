const API_URL = import.meta.env.PUBLIC_BACKEND_URL || "http://localhost:8000";

export interface User {
  id: number;
  email: string;
  username: string;
  full_name: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationInitiate {
  email: string;
  captcha_token: string;
}

export interface RegistrationComplete {
  token: string;
  username: string;
  password: string;
  full_name: string;
}

export interface AuthToken {
  access_token: string;
  token_type: string;
}

// Token Management

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("auth_token");
}

export function saveToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("auth_token", token);
}

export function removeToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("auth_token");
}

export function isLoggedIn(): boolean {
  const token = getToken();
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  try {
    const payload = JSON.parse(atob(parts[1]));
    return payload.exp && Date.now() < payload.exp * 1000;
  } catch {
    return false;
  }
}

// Registration

export async function initiateRegistration(
  data: RegistrationInitiate
): Promise<{ message: string; verification_url?: string }> {
  const response = await fetch(`${API_URL}/v1/auth/register/initiate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Feilet å sende verifiseringsmail.");
  }

  return response.json();
}

export async function completeRegistration(
  data: RegistrationComplete
): Promise<{ message: string; user: { id: number; email: string; username: string } }> {
  const response = await fetch(`${API_URL}/v1/auth/register/complete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Feilet å fullføre registreringen.");
  }

  return response.json();
}

// Login / Logout

export async function login(credentials: LoginCredentials): Promise<AuthToken> {
  const response = await fetch(`${API_URL}/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Login feilet.");
  }

  const token: AuthToken = await response.json();
  saveToken(token.access_token);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("auth:changed"));
  }

  return token;
}

export function logout(): void {
  removeToken();

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("auth:changed"));
    window.location.href = "/login";
  }
}

// User Info

export async function getCurrentUser(): Promise<User> {
  const token = getToken();

  if (!token) {
    throw new Error("Ingen token funnet.");
  }

  const response = await fetch(`${API_URL}/v1/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    let message = "Kunne ikke hente brukeren.";

    try {
      const error = await response.json();
      message = error.detail || message;
    } catch {
      // Ignore json parse error
    }

    throw new Error(message);
  }

  return response.json() as Promise<User>;
}

export async function redirectUnauthorized(requireAdmin = false): Promise<void> {
  const token = getToken();

  if (!token || !isLoggedIn()) {
    removeToken();
    window.location.href = "/login?redirect=" + encodeURIComponent(window.location.pathname);
    return;
  }

  try {
    const user = await getCurrentUser();

    if (requireAdmin && !user.is_admin) {
      window.location.href = "/";
    }
  } catch {
    removeToken();
    window.location.href = "/login?redirect=" + encodeURIComponent(window.location.pathname);
  }
}
