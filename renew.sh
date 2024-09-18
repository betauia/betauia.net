#!/bin/sh

docker compose -f compose.yaml -f production.yaml run --rm certbot renew

docker compose -f compose.yaml -f production.yaml exec proxy nginx -s reload

