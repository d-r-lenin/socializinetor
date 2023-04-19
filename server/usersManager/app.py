import os
from flask import Flask
from dotenv import load_dotenv

from config.keys import MASTER_KEY

from controllers.middlewares import AuthMiddleware

from config.mongo import init_db, close_db
from views.users import user_bp
from views.profiles import profile_bp

load_dotenv()

app = Flask(__name__)
app.config['MONGO_URI'] = os.environ.get('MONGO_URL') # not in use yet

# BUG: AuthMiddleware is not working properly
#TODO: fix AuthMiddleware class or create similar middleware for authorization.
# app.wsgi_app = AuthMiddleware(app.wsgi_app)

app.register_blueprint(user_bp, url_prefix="/user")
app.register_blueprint(profile_bp, url_prefix="/profile")


@app.before_request
def init():
    init_db()

@app.after_request
def close(responce):
    close_db()
    return responce

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


if(__name__ == "__main__"):
    app.run(port=4000, debug=True)