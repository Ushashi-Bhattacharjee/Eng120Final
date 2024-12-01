from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

# Load questions from JSON file
with open('questions.json') as f:
    questions = json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_questions', methods=['GET'])
def get_questions():
    return jsonify(questions)

if __name__ == '__main__':
    app.run(debug=True)
