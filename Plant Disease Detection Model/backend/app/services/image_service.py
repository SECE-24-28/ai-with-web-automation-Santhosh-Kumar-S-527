import io
import logging
from PIL import Image
import numpy as np
from fastapi import HTTPException, UploadFile

logger = logging.getLogger(__name__)


class ImageService:
    @staticmethod
    async def preprocess_image(file: UploadFile, target_size=(256, 256)) -> np.ndarray:
        """Read an uploaded leaf image, validate, resize, normalize, and return a batch array."""

        # Validate file type
        content_type = file.content_type or ""
        allowed_types = {"image/jpeg", "image/png", "image/jpg", "image/webp"}
        if content_type not in allowed_types:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file format '{content_type}'. Only JPEG, PNG, and WebP are allowed.",
            )

        try:
            # Read file bytes (async-safe via FastAPI UploadFile)
            contents = await file.read()
            if len(contents) == 0:
                raise HTTPException(status_code=400, detail="Uploaded file is empty.")

            # Open image using Pillow
            image = Image.open(io.BytesIO(contents))

            # Convert to RGB if not already
            if image.mode != "RGB":
                logger.info(f"Converting image mode from {image.mode} to RGB")
                image = image.convert("RGB")

            # Resize image using Bilinear resampling
            try:
                resample_filter = Image.Resampling.BILINEAR
            except AttributeError:
                resample_filter = Image.BILINEAR

            image = image.resize(target_size, resample_filter)

            # Convert to NumPy array and normalize to [0.0, 1.0]
            img_array = np.array(image, dtype=np.float32) / 255.0

            # Expand dimensions to create batch: shape (1, 256, 256, 3)
            img_array = np.expand_dims(img_array, axis=0)

            return img_array

        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Error processing leaf image: {e}")
            raise HTTPException(
                status_code=400,
                detail=f"Corrupted or invalid image file. Detailed error: {str(e)}",
            )


image_service = ImageService()
