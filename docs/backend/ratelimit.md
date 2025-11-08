# Rate Limiting

To not let the backend get spammed down, we use rate limiting.

## Default

Each endpoint has a default limit set by the limiter in `limiter.py`. It is given by:

```py
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# For 60 requests per minute
limiter = Limiter(
    key_func=get_remote_address, default_limits=["60/minute"], headers_enabled=False
)
```

## Custom

To set a custom rate limit for heavier endpoints (for example login), you can set the limit with a decorator on the route:

```py
from app.limiter import limiter

# ...

@main_bp.route("/ping")
@limiter.limit("10/minute")
def ping():
    return {"message": "pong"}
```

> Note that the limiter decorator needs to be at the bottom.
