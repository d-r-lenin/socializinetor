import jwt
from flask import jsonify, make_response, request
from json import loads
from bcrypt import hashpw, gensalt, checkpw
from marshmallow import ValidationError

from config.keys import MASTER_KEY

from models.user import User

from controllers.validators import (
    UserSchema,
    SignInSchema
)

validate_user = UserSchema()
validate_sign_in = SignInSchema()


def genarateHash(password):
    return hashpw(password.encode('utf-8'), gensalt()).decode('utf-8')

def validatePassword(password, hashedPassword):
    return checkpw(password.encode('utf-8'), hashedPassword.encode('utf-8'))



def home():
    return jsonify({ 'message': "okay" })

def create_user(request):
    try:
        body = request.get_data()
        data = loads(body)
        userData = validate_user.load(data)
        print("went here")
        userData['password'] = genarateHash(userData['password'])
        
        user = User(**userData)
        user.save()
        
        token = jwt.encode({ 'username': user.username }, MASTER_KEY, algorithm='HS256')
        
        resp = make_response(jsonify({ 'message': 'user created', 'user': user.username }))
        
        resp.set_cookie('sozi-x-auth-token', token, httponly=True, samesite='None')
        
        return resp
        
    except (Exception) as e:
        print(e)
        if isinstance(e, ValidationError):
            print(e)
            return jsonify({ 'error': e.normalized_messages() , 'message': 'user not created' }), 400
        return jsonify({ 'error': str(e), 'message': 'user not created' }), 400


def login(request):
    try:
        body = loads(request.get_data())
        data = validate_sign_in.load(body)
        user = User.objects(username=data['username']).first()
    
        # print(user.password)
        # print(genarateHash(data['password']))
        
        if user is None:
            raise ValidationError('user not found', 'username')
        if not validatePassword(data['password'], user.password):
            raise ValidationError('password is incorrect', 'password')
        
        token = jwt.encode({ 'username': user.username }, MASTER_KEY, algorithm='HS256')
        
        resp = make_response(jsonify({ 'message': 'user logged in', 'user': user.username }))
        
        resp.set_cookie('sozi-x-auth-token', token, httponly=True,samesite='None', secure=True)
        
        return resp
    except (Exception) as e:
        print(e)
        # check if validation error
        if isinstance(e, ValidationError):
            print(e)
            return jsonify({ 'error': e.normalized_messages() , 'message': 'user not logged in' })
        # raise e
        return jsonify({ 'error': str(e), 'message': 'user not logged in' })

def logout(request):
    resp = make_response(jsonify({ 'message': 'user logged out' }))
    resp.set_cookie('sozi-x-auth-token', '', httponly=True, samesite='None', secure=True, expires=0)
    
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


def is_authenticated(request):
    try:
        token = request.cookies.get('sozi-x-auth-token')
        if token is None:
            return False
        jwt.decode(token, MASTER_KEY, algorithms=['HS256'])
        return True
    except (Exception) as e:
        print(e)
        return False


def ping(request):
    try:
        token = request.cookies.get('sozi-x-auth-token')
        # get all cookies
        cookies = request.cookies
        print(cookies)
        if token is None:
            return jsonify({
                'message': 'Token is not provided',
                'error': 'Unauthorized',
                'status': 401
            }), 200
        token_data = jwt.decode(token, MASTER_KEY, algorithms=['HS256'])
        # check if user exists
        user = User.objects(username=token_data['username']).first()
        if user is None:
            return jsonify({'message': 'user not exists',
                'error': 'Unauthorized',
                'status': 404}), 200
        return jsonify({
                'message': 'user is logged in',
                'status': 200,
                'user': user.username,
            }), 200
    except (Exception) as e:
        # raise e
        return jsonify({'message': 'user is not logged in'}), 401
    
    
    
def get_user(token):
    try :
        if token is None:
            return None
        
        token_data = jwt.decode(token, MASTER_KEY, algorithms=['HS256'])
        
        if token_data is None:
            return None
        
        user = User.objects(username=token_data['username']).first()
        
        if user is None:
            return None
        
        return user
    except (Exception) as e:
        print(e)
        return None
   
    
    