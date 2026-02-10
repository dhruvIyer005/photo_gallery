from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder='.')

@app.route('/')
def index():
    # This tells Python to show your index.html file
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    # This tells Python to find your CSS, JS, and Images
    return send_from_directory('.', path)

if __name__ == "__main__":
    app.run()
