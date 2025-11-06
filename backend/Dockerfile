FROM python:3.13-alpine AS base

RUN apk add --no-cache curl \
    && curl -LsSf https://astral.sh/uv/install.sh | sh \
    && mv /root/.local/bin/uv /usr/local/bin/uv \
    && mv /root/.local/bin/uvx /usr/local/bin/uvx

WORKDIR /app

COPY requirements.txt /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN uv pip install --system --requirement requirements.txt

COPY . .

FROM base AS development
ENV FLASK_ENV=development
CMD ["python3", "server.py"]

FROM base AS production
ENV FLASK_ENV=production
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "server:app"]

