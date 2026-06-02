import os
import logging
import numpy as np
from fastapi import HTTPException
from ..core.config import settings
from ..core.constants import CLASS_NAMES

logger = logging.getLogger(__name__)


class ModelService:
    def __init__(self):
        self._model = None
        self._target_size = (256, 256)
        self._class_names_mapping = CLASS_NAMES

    @property
    def model(self):
        if self._model is None:
            self.load_model()
        return self._model

    @property
    def target_size(self):
        _ = self.model
        return self._target_size

    @property
    def class_names_mapping(self):
        _ = self.model
        return self._class_names_mapping

    def load_model(self):
        model_path = settings.MODEL_PATH
        if not os.path.exists(model_path):
            logger.error(f"TensorFlow model not found at path: {model_path}")
            raise RuntimeError(
                f"Model file not found at {model_path}. "
                "Please place best_model.h5 in backend/app/models/."
            )

        try:
            logger.info(f"Loading TensorFlow/Keras model from {model_path}...")

            # Prepare custom objects for TF Hub models (KerasLayer)
            custom_objs = {}
            try:
                import tensorflow_hub as hub
                custom_objs['KerasLayer'] = hub.KerasLayer
                logger.info("Loaded tensorflow_hub successfully for custom_objects.")
            except ImportError:
                logger.warning("tensorflow_hub is not installed. Models using KerasLayer might fail to load.")

            # TF 2.20 ships Keras 3 by default.
            # Keras 3 can still load legacy .h5 files, but we need to handle
            # potential compatibility issues gracefully.
            import tensorflow as tf

            try:
                # Keras 3 primary path
                self._model = tf.keras.models.load_model(model_path, custom_objects=custom_objs, compile=False)
            except Exception as keras3_err:
                logger.warning(
                    f"Keras 3 load_model failed ({keras3_err}), "
                    "trying legacy Keras 2 loading..."
                )
                # Fallback: force legacy keras loading via environment variable
                os.environ["TF_USE_LEGACY_KERAS"] = "1"
                # Re-import after env change
                import importlib
                importlib.reload(tf)
                self._model = tf.keras.models.load_model(model_path, custom_objects=custom_objs, compile=False)

            # Extract target size from input shape
            input_shape = self._model.input_shape
            if input_shape and len(input_shape) >= 3:
                # input_shape typically: (None, height, width, channels)
                self._target_size = (input_shape[1], input_shape[2])
                logger.info(f"Detected model input target size: {self._target_size}")

            # Extract class names mapping based on output shape
            output_shape = self._model.output_shape
            if output_shape and len(output_shape) >= 2:
                num_classes = output_shape[1]
                if num_classes == 10:
                    from ..core.constants import TOMATO_CLASS_NAMES
                    self._class_names_mapping = TOMATO_CLASS_NAMES
                    logger.info("Detected 10 classes. Using TOMATO_CLASS_NAMES mapping.")
                elif num_classes == 25:
                    from ..core.constants import PLANT_5_CLASS_NAMES
                    self._class_names_mapping = PLANT_5_CLASS_NAMES
                    logger.info("Detected 25 classes. Using PLANT_5_CLASS_NAMES mapping.")
                else:
                    self._class_names_mapping = CLASS_NAMES
                    logger.info(f"Detected {num_classes} classes. Using default CLASS_NAMES mapping.")

            logger.info(
                f"Model loaded successfully! "
                f"Input shape: {self._model.input_shape}, "
                f"Output shape: {self._model.output_shape}"
            )
        except Exception as e:
            logger.error(f"Failed to load TensorFlow model: {e}")
            raise RuntimeError(f"Failed to load model: {str(e)}")

    def predict(self, preprocessed_image: np.ndarray):
        try:
            # Perform inference
            predictions = self.model.predict(preprocessed_image, verbose=0)

            # Extract predicted index and confidence score
            predicted_idx = int(np.argmax(predictions[0]))
            confidence = float(predictions[0][predicted_idx]) * 100.0

            # Map index to class label using class_names_mapping
            mapping = self.class_names_mapping
            if predicted_idx in mapping:
                predicted_class = mapping[predicted_idx]
            else:
                logger.warning(
                    f"Predicted index {predicted_idx} is out of bounds of mapping."
                )
                predicted_class = f"Unknown_Class_{predicted_idx}"

            logger.info(
                f"Prediction successful: class={predicted_class}, confidence={confidence:.2f}%"
            )
            return predicted_class, round(confidence, 2)

        except Exception as e:
            logger.error(f"Error during model inference: {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Error performing model inference: {str(e)}",
            )


model_service = ModelService()
