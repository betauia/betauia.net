from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import JSONResponse
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_user_context
from app.auth.security import (
    create_access_token,
    create_registration_token,
    decode_registration_token,
    hash_password,
    verify_password,
)
from app.config import Config
from app.db.database import get_session
from app.limiter import limiter
from app.models.user import User
from app.schemas.auth import (
    RegistrationComplete,
    RegistrationInitiate,
    Token,
    UserLogin,
    UserResponse,
)
from app.utils.email import send_registration_email

router = APIRouter(prefix="/auth", tags=["Authentication"])


# Registration


@router.post("/register/initiate", status_code=status.HTTP_200_OK)
@limiter.limit("3/minute")
async def initiate_registration(
    request: Request,
    data: RegistrationInitiate,
    db: AsyncSession = Depends(get_session),
):
    """Initiate registration by sending a verification email."""

    result = await db.execute(select(User).where(User.email == data.email))
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered"
        )

    token = create_registration_token(data.email)
    verification_url = f"{Config.FRONTEND_URL}/account/create?token={token}"
    await send_registration_email(data.email, verification_url)

    return JSONResponse(
        status_code=200,
        content={"message": "Verification email sent. Please check your inbox."},
    )


@router.post("/register/complete", status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def complete_registration(
    request: Request,
    data: RegistrationComplete,
    db: AsyncSession = Depends(get_session),
):
    """Complete registration with the token from the verification email."""

    email = decode_registration_token(data.token)
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired token"
        )

    result = await db.execute(
        select(User).where((User.email == email) | (User.username == data.username))
    )
    existing_user = result.scalar_one_or_none()

    if existing_user:
        if existing_user.email == email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Username already taken"
        )

    new_user = User(
        email=email,
        username=data.username,
        hashed_password=hash_password(data.password),
        full_name=data.full_name,
        allergies=data.allergies,
    )

    try:
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)
    except IntegrityError:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email or username already exists",
        )

    return JSONResponse(
        status_code=201, content={"message": "Registration completed successfully"}
    )


# Login


@router.post("/login", response_model=Token)
@limiter.limit("10/minute")
async def login(
    request: Request, credentials: UserLogin, db: AsyncSession = Depends(get_session)
):
    """Login with email and password."""

    result = await db.execute(select(User).where(User.email == credentials.email))
    user = result.scalar_one_or_none()

    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": str(user.id)})
    return Token(access_token=access_token, token_type="bearer")


# User Info


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(user: UserResponse = Depends(get_user_context)):
    """Get information about the currently authenticated user."""
    return user
