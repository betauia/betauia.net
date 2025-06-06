FROM python:3.13-alpine AS base

WORKDIR /app

COPY requirements.txt /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN pip3 install -r requirements.txt

COPY . .

FROM base AS development

ENV FLASK_ENV=development
CMD ["python3", "server.py"]

FROM base AS production

ENV FLASK_ENV=production
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "server:app"]
