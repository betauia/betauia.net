FROM python:3.13-alpine AS base

RUN apk add --no-cache curl postgresql-client \
    && curl -LsSf https://astral.sh/uv/install.sh | sh \
    && mv /root/.local/bin/uv /usr/local/bin/uv \
    && mv /root/.local/bin/uvx /usr/local/bin/uvx

WORKDIR /app

COPY requirements.lock /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN uv pip install --system --requirement requirements.lock

COPY . .

RUN chmod +x entrypoint.sh

FROM base AS development
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["python3", "server.py"]

FROM base AS production
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
