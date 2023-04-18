from flask import Flask

from views.users import user_bp

app = Flask(__name__)

app.register_blueprint(user_bp, url_prefix="/users")


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


if(__name__ == "__main__"):
    app.run(debug=True)