import cv2
import numpy as np
from io import BytesIO
from PIL import Image

def predict_deepfake(file_bytes: bytes):
    try:
        img = Image.open(BytesIO(file_bytes)).convert('RGB')
        arr = np.array(img)
        gray = cv2.cvtColor(arr, cv2.COLOR_RGB2GRAY)
        lap = cv2.Laplacian(gray, cv2.CV_64F)
        variance = lap.var()
        score = float(min(max((variance - 100.0) / 1000.0, 0.0), 1.0))
        label = 'deepfake-suspected' if score < 0.2 else 'likely-real'
        return {'label': label, 'score': score, 'method': 'heuristic-laplacian'}
    except Exception as e:
        return {'error': str(e)}