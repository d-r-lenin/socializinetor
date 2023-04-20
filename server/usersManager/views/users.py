# rest api for users login
from flask import Blueprint, request, jsonify

from controllers.users import home, create_user, login, delete_user, logout, ping

user_bp = Blueprint('u', __name__)

@user_bp.route('/ping')
def ping_():
    return ping(request)

@user_bp.route('/')
def test():
    return home();

@user_bp.route('/create', methods=['POST'])
def create():
    return create_user(request)

@user_bp.route('/login', methods=['POST'])
def log():
    return login(request)

@user_bp.route('/logout')
def log_out():
    return logout(request)

@user_bp.route('/delete/me', methods=['DELETE'])
def delete():
    return delete_user(request)

