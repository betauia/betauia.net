if [ -f ".env" ]; then
	echo "Not copying .env, file found."
else
    echo "Copying .env from .env.default."
    cp .env.default .env
fi

docker compose build
