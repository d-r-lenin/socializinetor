# rest api for users login
from flask import Blueprint, request, jsonify

from controllers.users import home

user_bp = Blueprint('u', __name__)

@user_bp.route('/login', methods=['POST'])
def login(data):
    # get the data from the request
    d = request.get_json()
    
    print(d);
    
    return jsonify({'message': 'login'})

@user_bp.route('/')
def test():
    return home();
