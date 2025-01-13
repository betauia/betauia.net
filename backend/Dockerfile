FROM python:3.12-alpine

WORKDIR /src
COPY requirements.txt /src
RUN pip3 install -r requirements.txt

COPY . .

CMD ["python3", "server.py"]
