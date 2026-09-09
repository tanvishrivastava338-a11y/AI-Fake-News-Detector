from flask import Flask, request, jsonify
from text_model import predict_text
from deepfake_model import predict_deepfake

app = Flask(__name__)

@app.route('/predict_text', methods=['POST'])
def predict_text_route():
    data = request.get_json(force=True)
    text = data.get('text', '')
    if not text:
        return jsonify({'error': 'text required'}), 400
    out = predict_text(text)
    return jsonify(out)

@app.route('/predict_deepfake', methods=['POST'])
def predict_deepfake_route():
    file_bytes = request.data
    if not file_bytes:
        return jsonify({'error': 'file bytes required'}), 400
    out = predict_deepfake(file_bytes)
    return jsonify(out)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)