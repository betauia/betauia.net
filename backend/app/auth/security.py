import secrets
from datetime import UTC, datetime, timedelta
from typing import Any

from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from jose import JWTError, jwt

from app.config import Config

ph = PasswordHasher()


# Password Functions


def hash_password(password: str) -> str:
    return ph.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        ph.verify(hashed_password, plain_password)
        return True
    except VerifyMismatchError:
        return False


# Access Token


def create_access_token(
    data: dict[str, Any], expires_delta: timedelta | None = None
) -> str:
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(UTC) + expires_delta
    else:
        expire = datetime.now(UTC) + timedelta(
            minutes=Config.ACCESS_TOKEN_EXPIRE_MINUTES
        )

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, Config.SECRET_KEY, algorithm=Config.ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> dict[str, Any] | None:
    try:
        payload = jwt.decode(token, Config.SECRET_KEY, algorithms=[Config.ALGORITHM])
        return payload
    except JWTError:
        return None


# Registration Token


def create_registration_token(email: str) -> str:
    expires_delta = timedelta(minutes=Config.REGISTRATION_TOKEN_EXPIRE_MINUTES)
    expire = datetime.now(UTC) + expires_delta

    to_encode = {
        "sub": email,
        "type": "registration",
        "exp": expire,
        "jti": secrets.token_urlsafe(16),
    }

    encoded_jwt = jwt.encode(to_encode, Config.SECRET_KEY, algorithm=Config.ALGORITHM)
    return encoded_jwt


def decode_registration_token(token: str) -> str | None:
    try:
        payload = jwt.decode(token, Config.SECRET_KEY, algorithms=[Config.ALGORITHM])

        if payload.get("type") != "registration":
            return None

        email = payload.get("sub")
        if not email or not isinstance(email, str):
            return None

        return email
    except JWTError:
        return None
