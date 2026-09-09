from transformers import pipeline

classifier = pipeline(
    'text-classification',
    model='mrm8488/bert-tiny-finetuned-fake-news-detection'
)

def predict_text(text: str):
    preds = classifier(text[:512])
    return {
        'label': preds[0]['label'],
        'score': float(preds[0]['score'])
    }