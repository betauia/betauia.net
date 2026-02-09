FROM python:3.13-alpine AS base

RUN apk add --no-cache curl \
    && curl -LsSf https://astral.sh/uv/install.sh | sh \
    && mv /root/.local/bin/uv /usr/local/bin/uv \
    && mv /root/.local/bin/uvx /usr/local/bin/uvx

WORKDIR /app

COPY requirements.lock /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN uv pip install --system --requirement requirements.lock

COPY . .

FROM base AS development
CMD ["python3", "server.py"]

FROM base AS production
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
