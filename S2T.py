from flask import Flask, request, jsonify
import whisper
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
model = whisper.load_model("base")

@app.route('/test', methods=['GET'])
def test_endpoint():
    return "Server is running", 200

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'audio' in request.files:
        audio_file = request.files['audio']
        audio_path = "./temp_audio.webm"
        audio_file.save(audio_path)

        # Transcribe the audio
        result = model.transcribe(audio_path)
        
        # Return the transcription
        print("This is result:",result['text'])
        return jsonify({'transcript': result['text']})
    else:
        return "No audio file provided", 400

if __name__ == '__main__':
    app.run(debug=True,host='localhost', port=8989)