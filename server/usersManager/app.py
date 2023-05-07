import os
from flask import Flask, render_template
from dotenv import load_dotenv
from flask_cors import CORS

from config.keys import MASTER_KEY

from controllers.middlewares import AuthMiddleware

from config.mongo import init_db, close_db
from views.users import user_bp
from views.profiles import profile_bp

load_dotenv()
init_db()


app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
app.config['MONGO_URI'] = os.environ.get('MONGO_URL') # not in use yet

# BUG: AuthMiddleware is not working properly
#TODO: fix AuthMiddleware class or create similar middleware for authorization.
# app.wsgi_app = AuthMiddleware(app.wsgi_app)

app.register_blueprint(user_bp, url_prefix="/user")
app.register_blueprint(profile_bp, url_prefix="/profile")



@app.route("/")
def hello_world():
    # send file test.html from root
    return render_template("test.html")


if(__name__ == "__main__"):
    app.run(port=4000, debug=True)