import os
from dotenv import dotenv_values

env_file = ".env"
example_file = ".env.example"

def validate_env_vars():
    env_vars = dotenv_values(env_file)
    example_vars = dotenv_values(example_file)

    missing_keys = [key for key in example_vars if key not in env_vars]
    if missing_keys:
        raise EnvironmentError(f"Missing required environment variables: {', '.join(missing_keys)}")

if __name__ == "__main__":
    try:
        validate_env_vars()
        print("Environment validation passed!")
    except Exception as e:
        print(f"Eror: {e}")
