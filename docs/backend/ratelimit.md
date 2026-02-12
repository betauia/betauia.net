# Rate Limiting

To not let the backend get spammed down, we use rate limiting with `slowapi`.

## Default

Each endpoint has a default limit set by the limiter in `limiter.py`. It is used as a decoration on a route:

```py
from app.limiter import limiter

# ...

@router.get("/ping")
@limiter.limit("60/minute")
def ping(request: Request):
    """Simple ping endpoint to check if API is responding"""
    return {"message": "pong"}
```

> Note that the limiter decorator needs to be at the bottom.
