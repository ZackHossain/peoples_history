from flask import Flask
from flask_cors import CORS

from peoples_history.api.routes import api

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(api)
    return app

if __name__ == "__main__":
    create_app().run(
        host="0.0.0.0",
        port=5050,
        debug=True
    )