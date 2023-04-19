import jwt
from flask import jsonify, make_response, request
from json import loads

from config.keys import MASTER_KEY

from models.user import User

def validateUser(data):
    if 'username' not in data:
        raise ValueError('username is required')
    if 'password' not in data:
        raise ValueError('password is required')
    if 'email' not in data:
        raise ValueError('email is required')
    if 'confirmPassword' not in data:
        raise ValueError('confirmPassword is required')
    
    if data['password'] != data['confirmPassword']:
        raise ValueError('passwords do not match')
    
    # remove any extra data
    return { 'username': data['username'], 'password': data['password'], 'email': data['email'] }


def home():
    return jsonify({ 'message': "okay" })

def create_user(request):
    try:
        body = request.get_data()
        data = loads(body)
        userData = validateUser(data)
        
        user = User(**userData)
        user.save()
        
        print(MASTER_KEY)
        
        token = jwt.encode({ 'username': user.username }, MASTER_KEY, algorithm='HS256')
        
        resp = make_response(jsonify({ 'message': 'user created', 'user': user.username }))
        
        resp.set_cookie('sozi-x-auth-token', token, httponly=True, samesite='None')
        
        return resp
        
    except (Exception) as e:
        return jsonify({ 'error': str(e), 'message': 'user not created' })


def login(request):
    try:
        body = loads(request.get_data())
        user = User.objects(username=body['username']).first()
        if user is None:
            raise ValueError('user not found')
        if user.password != body['password']:
            raise ValueError('password is incorrect')
        
        token = jwt.encode({ 'username': user.username }, MASTER_KEY, algorithm='HS256')
        
        resp = make_response(jsonify({ 'message': 'user logged in', 'user': user.username }))
        
        resp.set_cookie('sozi-x-auth-token', token, httponly=True,samesite='None')
        
        return resp
    except (Exception) as e:
        return jsonify({ 'error': str(e), 'message': 'user not logged in' })

def logout(request):
    resp = make_response(jsonify({ 'message': 'user logged out' }))
    resp.set_cookie('sozi-x-auth-token', '', httponly=True, samesite='None')
    return resp


def delete_user(request):
    user_name = request.args.get('username')
    body = request.get_data()
    
    password = loads(body)['password']
    
    if user_name is None:
        return jsonify({'message': 'username is required'})
    if password is None:
        return jsonify({'message': 'password is required'})
    
    try :
        # delete the user
        user = User.objects(username=user_name).first()
        if password != user.password:
            raise ValueError('password is incorrect')
        user.delete()
        return jsonify({'message': 'user deleted', 'user': user.username })  
    except (Exception) as e:
        return jsonify({'message': 'user not deleted', 'error': str(e) })
    


def check_username(request):
    try:
        body = request.get_data()
        username = loads(body)['username']
        user = User.objects(username=username).first()
        if user is None:
            return jsonify({'message': 'username is available'}), 200
        return jsonify({'message': 'username is not available'}), 409
    except (Exception) as e:
        return jsonify({ 'error': str(e), 'message': 'user not created' }), 400