import uuid
from io import BytesIO
from pathlib import Path

from fastapi import HTTPException, UploadFile
from PIL import Image

BASE_UPLOAD_DIR = Path("/uploads")

ALLOWED_IMAGE_TYPES = {"image/png", "image/jpeg", "image/webp"}
ALLOWED_TEXT_TYPES = {"text/plain"}
ALLOWED_DOC_TYPES = {"application/pdf"}

MAX_FILE_SIZE = 8 * 1024 * 1024  # 8 MB


def delete_upload(path: str) -> None:
    file_path = BASE_UPLOAD_DIR / path
    try:
        if file_path.exists():
            file_path.unlink()
    except OSError:
        pass


def save_upload(file: UploadFile, category: str) -> dict:
    if (
        file.content_type
        not in ALLOWED_IMAGE_TYPES | ALLOWED_DOC_TYPES | ALLOWED_TEXT_TYPES
    ):
        raise HTTPException(status_code=400, detail="Unsupported file type")

    contents = file.file.read()

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File too large")

    upload_dir = BASE_UPLOAD_DIR / category
    upload_dir.mkdir(parents=True, exist_ok=True)

    file_id = uuid.uuid4()

    if file.content_type in ALLOWED_IMAGE_TYPES:
        filename = f"{file_id}.webp"
        filepath = upload_dir / filename

        image = Image.open(BytesIO(contents))
        image.save(filepath, "WEBP", quality=80)

    elif file.content_type in ALLOWED_TEXT_TYPES:
        filename = f"{file_id}.txt"
        filepath = upload_dir / filename

        with filepath.open("wb") as f:
            f.write(contents)

    elif file.content_type in ALLOWED_DOC_TYPES:
        filename = f"{file_id}.pdf"
        filepath = upload_dir / filename

        with filepath.open("wb") as f:
            f.write(contents)

    else:
        raise HTTPException(status_code=400, detail="Invalid file type")

    return {
        "filename": filename,
        "path": f"{category}/{filename}",
        "url": f"/media/{category}/{filename}",
    }
