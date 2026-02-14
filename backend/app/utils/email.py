from fastapi_mail import (
    ConnectionConfig,
    FastMail,
    MessageSchema,
    MessageType,
    NameEmail,
)
from pydantic import EmailStr, SecretStr

from app.config import Config


def get_mail_config() -> ConnectionConfig:
    return ConnectionConfig(
        MAIL_USERNAME=Config.MAIL_USERNAME,
        MAIL_PASSWORD=SecretStr(Config.MAIL_PASSWORD),
        MAIL_FROM=Config.MAIL_FROM,
        MAIL_PORT=Config.MAIL_PORT,
        MAIL_SERVER=Config.MAIL_SERVER,
        MAIL_SSL_TLS=Config.MAIL_SSL_TLS,
        MAIL_STARTTLS=Config.MAIL_STARTTLS,
        USE_CREDENTIALS=Config.MAIL_USE_CREDENTIALS,
        VALIDATE_CERTS=Config.MAIL_VALIDATE_CERTS,
    )


async def send_email(to: EmailStr, subject: str, html_body: str) -> None:
    message = MessageSchema(
        subject=subject,
        recipients=[NameEmail(name="", email=to)],
        body=html_body,
        subtype=MessageType.html,
    )

    fm = FastMail(get_mail_config())
    await fm.send_message(message)


async def send_registration_email(email: str, verification_url: str) -> None:
    html = f"<html><body><p>Klikk <a href='{verification_url}'>denne lenken</a> for å fullføre registreringen.</p></body></html>"
    await send_email(email, "Fullfør registreringen din - BETA", html)
