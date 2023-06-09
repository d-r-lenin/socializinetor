import os
from flask import Flask, render_template, request
from dotenv import load_dotenv
from flask_cors import CORS

from config.keys import MASTER_KEY

from controllers.middlewares import AuthMiddleware

from controllers.users import get_user
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

# add get_user middlewares here in before_request
@app.before_request
def get_user_middleware():
    try:
        token = request.cookies.get('sozi-x-auth-token')
        print(request.cookies)
        print(token)
        if token is None:
            return None
        user = get_user(token)
        if user is None:
            return None
        request.user = user
    except (Exception) as e:
        print(e) 

app.register_blueprint(user_bp, url_prefix="/user")
app.register_blueprint(profile_bp, url_prefix="/profile")



@app.route("/")
def hello_world():
    # send file test.html from root
    return render_template("test.html")


if(__name__ == "__main__"):
    app.run(port=4000, debug=True,)