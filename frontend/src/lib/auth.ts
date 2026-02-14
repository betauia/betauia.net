const API_URL = import.meta.env.PUBLIC_BACKEND_URL || "http://localhost:8000";

export interface User {
  id: number;
  email: string;
  username: string;
  full_name: string;
  allergies: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationInitiate {
  email: string;
}

export interface RegistrationComplete {
  token: string;
  username: string;
  password: string;
  full_name: string;
  allergies?: string;
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
  return getToken() !== null;
}

// Registration

export async function initiateRegistration(
  data: RegistrationInitiate
): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/v1/auth/register/initiate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to send verification email");
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
    throw new Error(error.detail || "Failed to complete registration");
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
    throw new Error(error.detail || "Login failed");
  }

  const token: AuthToken = await response.json();
  saveToken(token.access_token);

  // Dispatch auth changed event
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("auth:changed"));
  }

  return token;
}

export function logout(): void {
  removeToken();

  // Dispatch auth changed event
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("auth:changed"));
    window.location.href = "/login";
  }
}

// User Info

export async function getCurrentUser(): Promise<User> {
  const token = getToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(`${API_URL}/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      removeToken();
    }
    const error = await response.json();
    throw new Error(error.detail || "Failed to fetch user");
  }

  return response.json();
}
