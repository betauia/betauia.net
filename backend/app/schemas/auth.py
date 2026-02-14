from datetime import datetime

from pydantic import BaseModel, EmailStr, Field

# Registration Schemas


class RegistrationInitiate(BaseModel):
    email: EmailStr


class RegistrationComplete(BaseModel):
    token: str
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8, max_length=128)
    full_name: str = Field(..., max_length=100)
    allergies: str | None = Field(None, max_length=255)


# Login Schema


class UserLogin(BaseModel):
    email: EmailStr
    password: str


# Response Schemas


class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    full_name: str
    allergies: str | None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
