from pathlib import Path
from fastapi import APIRouter, File, HTTPException, UploadFile, Depends
from pydantic import BaseModel

from app.config import get_settings
from app.deps import get_db, get_current_user
from app.models.user import User

router = APIRouter(prefix="/favicon", tags=["Favicon"])


class FaviconResponse(BaseModel):
    message: str
    path_ico: str
    path_png: str


MAX_SIZE = 2 * 1024 * 1024  # 2 MB
ALLOWED_TYPES = {"image/x-icon", "image/vnd.microsoft.icon", "image/png"}
ALLOWED_EXT = {".ico", ".png"}


@router.post(
    "",
    response_model=FaviconResponse,
    summary="Заменить фавиконку",
    description="Загрузите файл .ico или .png (рекомендуется 32×32 или 16×16). Сохраняется как favicon.ico и favicon.png.",
)
def upload_favicon(
    file: UploadFile | None = File(None, description="Файл .ico или .png"),
    current_user: User = Depends(get_current_user),
):
    """Загрузить новую фавиконку (требует прав админа)."""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Только админ может менять фавиконку")

    if not file or not file.filename:
        raise HTTPException(status_code=400, detail="Файл не выбран")

    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXT:
        raise HTTPException(
            status_code=400,
            detail="Допустимые форматы: .ico или .png",
        )

    content_type = (file.content_type or "").lower()
    is_ico = (
        ext == ".ico"
        or content_type in ("image/x-icon", "image/vnd.microsoft.icon")
    )
    is_png = ext == ".png" or content_type == "image/png"
    if not is_ico and not is_png:
        raise HTTPException(
            status_code=400,
            detail="Допустимые форматы: .ico или .png",
        )

    try:
        body = file.file.read()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка чтения файла: {e}")

    if len(body) > MAX_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Размер файла не более 2 МБ",
        )

    settings = get_settings()
    favicon_dir = Path(settings.FAVICON_DIR)
    favicon_dir.mkdir(parents=True, exist_ok=True)

    try:
        (favicon_dir / "favicon.ico").write_bytes(body)
        (favicon_dir / "favicon.png").write_bytes(body)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Не удалось сохранить: {e}")

    return {
        "message": "Фавиконка сохранена",
        "path_ico": f"{settings.API_BASE_URL.rstrip('/')}/static/favicon/favicon.ico",
        "path_png": f"{settings.API_BASE_URL.rstrip('/')}/static/favicon/favicon.png",
    }
