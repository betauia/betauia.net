import asyncio

import requests

from app.config import Config

success_code = 200


async def verify_turnstile_token(token: str) -> bool:
    if not token:
        return False

    def do_request():
        url = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
        data = {"secret": Config.TURNSTILE_SECRET_KEY, "response": token}
        resp = requests.post(url, data=data, timeout=5)
        if resp.status_code != success_code:
            return False
        return resp.json().get("success", False)

    return await asyncio.to_thread(do_request)
