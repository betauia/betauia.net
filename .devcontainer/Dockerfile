FROM python:3.13-alpine

RUN apk add --no-cache git openssh-client bash


COPY backend/requirements.txt /tmp/requirements.txt

RUN pip3 install -r /tmp/requirements.txt

WORKDIR /workspaces

CMD ["tail", "-f", "/dev/null"]
