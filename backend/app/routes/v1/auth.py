import asyncio

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
from app.utils.turnstile import verify_turnstile_token

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

    valid = await verify_turnstile_token(data.captcha_token)
    if not valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="CAPTCHA verifisering feilet.",
        )

    email = data.email.lower().strip()

    domain_min_len = 4
    tld_min_len = 2

    is_valid = "@" in email
    if is_valid:
        try:
            local_part, domain = email.rsplit("@", 1)
            is_valid = (
                local_part
                and domain
                and len(domain) >= domain_min_len
                and "." in domain
                and len(domain.split(".")[-1]) >= tld_min_len
            )
        except ValueError:
            is_valid = False

    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Ugyldig e-postadresse."
        )

    result = await db.execute(select(User).where(User.email == email))
    user_exists = result.scalars().first()

    if not user_exists:
        token = create_registration_token(email)
        verification_url = f"{Config.FRONTEND_URL}/account/create?token={token}"

        if Config.DEBUG:
            return JSONResponse(
                status_code=200,
                content={
                    "message": "DEBUG mode: bruk denne lenken for registrering.",
                    "verification_url": verification_url,
                },
            )
        await send_registration_email(email, verification_url)

    return JSONResponse(
        status_code=200,
        content={
            "message": "Om mailen ikke er registrert, har det blitt sendt en mail til deg for å fullføre registreringen."
        },
    )


@router.post("/register/complete", status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def complete_registration(
    request: Request,
    data: RegistrationComplete,
    db: AsyncSession = Depends(get_session),
):
    """Complete registration with the token from the verification email."""

    min_password_length = 10
    if len(data.password) < min_password_length:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passordet må være minst 10 bokstaver langt.",
        )

    email = decode_registration_token(data.token)
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ugjyldig eller utgått registreringstoken.",
        )

    result = await db.execute(
        select(User).where((User.email == email) | (User.username == data.username))
    )
    existing_user = result.scalars().first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Registration failed: email or username might already be in use.",
        )

    new_user = User(
        email=email,
        username=data.username,
        hashed_password=hash_password(data.password),
        full_name=data.full_name,
        is_admin=False,
    )

    try:
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)
    except IntegrityError:
        await db.rollback()
        # Generisk melding igjen
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Registrering feilet: email eller brukernavn kan allerede være i bruk.",
        )

    return JSONResponse(
        status_code=201, content={"message": "Registrering ble fullført."}
    )


# Login


@router.post("/login", response_model=Token)
@limiter.limit("10/minute")
async def login(
    request: Request, credentials: UserLogin, db: AsyncSession = Depends(get_session)
):
    """Login with email and password."""

    result = await db.execute(
        select(User).where(User.email == credentials.email.lower().strip())
    )
    user = result.scalars().first()

    dummy_hash = "$argon2id$v=19$m=65536,t=3,p=4$B1Bi0+KqwJ95jMYvHsf9iQ$riQ5CyqbOfOMVHioGAbGurDLynB3zv+5vNYwhwhfICI"

    # To not leak times
    hash_to_check = user.hashed_password if user else dummy_hash
    password_valid = verify_password(credentials.password, hash_to_check)

    if not user or not password_valid:
        await asyncio.sleep(0.5)  # Delay for security
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Feil email eller passord.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": str(user.id)})
    return Token(access_token=access_token, token_type="bearer")


# User Info


@router.get("/me", response_model=UserResponse)
@limiter.limit("60/minute")
async def get_current_user_info(
    request: Request, user: UserResponse = Depends(get_user_context)
):
    """Get information about the currently authenticated user."""
    return user
