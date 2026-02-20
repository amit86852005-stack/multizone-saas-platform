# Import libraries for Flask web app
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import time
import os

# Create Flask app
app = Flask(__name__, static_folder='.', static_url_path='')

# Enable CORS so frontend can talk to backend
CORS(app)

# Route: Home page
@app.route('/')
def home():
    # Send index.html when user visits the home page
    return send_from_directory('.', 'index.html')

# Route: AI Explanation API
@app.route('/api/ai-explain', methods=['POST'])
def ai_explain():
    # Get data from the request
    data = request.json
    prompt = data.get('prompt', '')
    
    # Check if prompt is empty
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400
    
    # Wait a little bit to simulate AI thinking
    time.sleep(1)
    
    # Create AI response (this is fake AI for now)
    # In real life, you would connect to OpenAI or Google Gemini API here
    response = f"I've analyzed your question about '{prompt}'. \n\n" \
               "Here is what I found: \n" \
               "1. Main Idea: This is important for understanding the topic.\n" \
               "2. Details: This part is very important.\n" \
               "3. Summary: You should focus on these points.\n\n" \
               "[AI System]: MultiZone Flask Backend created this response."
    
    # Return the response as JSON
    return jsonify({
        "reply": response,
        "source": "MultiZone AI",
        "timestamp": time.time()
    })

# Route: Health check (is the app running?)
@app.route('/api/health', methods=['GET'])
def health():
    # Return status of the app
    return jsonify({"status": "healthy", "services": ["auth", "ai", "database"]})


# Placeholder routes so clean paths like /jobs work in addition to /jobs.html
@app.route('/jobs')
def route_jobs():
    return send_from_directory('.', 'jobs.html')


@app.route('/resume')
def route_resume():
    return send_from_directory('.', 'resume.html')


@app.route('/skill-prep')
def route_skill_prep():
    return send_from_directory('.', 'skill-prep.html')


@app.route('/mentorship')
def route_mentorship():
    return send_from_directory('.', 'mentorship.html')


@app.route('/ai-coach')
def route_ai_coach():
    return send_from_directory('.', 'ai-coach.html')

# Main code - start the Flask app
if __name__ == '__main__':
    print("Starting MultiZone Backend on http://localhost:5000...")
    # debug=True means auto-reload on code changes
    app.run(debug=True, port=5000)
