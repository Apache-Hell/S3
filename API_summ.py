from flask import Flask, request, jsonify
import time
from transformers import BartForConditionalGeneration, BartTokenizer

app = Flask(__name__)

# Load BART model and tokenizer
model_name = "facebook/bart-large-cnn"
model = BartForConditionalGeneration.from_pretrained(model_name)
tokenizer = BartTokenizer.from_pretrained(model_name)

def summarize_text(text):
    # Craft the prompt with detailed instructions
    prompt = f"Summarize the following text, retaining all key information such as numbers, company names, percentages, trends, and specific project details:\n\n{text}"
    
    # Tokenize the input text
    inputs = tokenizer(prompt, max_length=1024, return_tensors="pt", truncation=True)

    # Generate the summary
    summary_ids = model.generate(inputs["input_ids"], num_beams=4, length_penalty=2.0, max_length=512, min_length=250, early_stopping=True)
    
    # Decode the generated summary
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get('text')
    if not text:
        return jsonify({'error': 'No text provided'}), 400

    # Record the start time
    start_time = time.time()

    summary = summarize_text(text)

    # Record the end time
    end_time = time.time()

    # Calculate the running time
    running_time = end_time - start_time

    return jsonify({'summary': summary, 'running_time': running_time})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
