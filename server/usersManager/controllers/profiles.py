import base64
from flask import jsonify, make_response, request
from json import loads


from models.user import User
from models.profile import Profile

def validate_profile_data(body):
    if 'username' not in body:
        raise ValueError('username is required')
    if 'name' not in body:
        raise ValueError('name is required')
    if 'bio' not in body:
        raise ValueError('bio is required')
    if 'display' not in body:
        raise ValueError('display is required')
    
    return {
        'username': body['username'],
        'name': body['name'],
        'bio': body['bio'],
        'display': body['display']
    }



def check_availability(request):
    try:
        body = loads(request.get_data())
        if 'username' not in body:
            raise ValueError('username is required')

        username = body['username']

        profile = Profile.objects(username=username).first()
        if profile is None:
            return jsonify({ 'message': 'profile is not inserted', 'username': username, 'isPresent': False })
        else:
            return jsonify({ 'message': 'profile is present', 'username': username, 'isPresent': True })
    except (Exception) as e:
        return jsonify({ 'error': str(e), 'message': 'username or email is not available' })


def create_profile(request):
    try:
        body = request.form
        display = request.files['display']
        display_binary = display.read()
        validatad = validate_profile_data({**body, 'display': display_binary})
        
        profile = Profile(**validatad)
        profile.save()
        print(profile)
        return jsonify({
            'message': 'profile created', 'profile': {
                'username': profile.username,
                'name': profile.name,
                'bio': profile.bio,
                'display': base64.b64encode(profile.display).decode('utf-8')
            }
        })
    except (Exception) as e:
        return jsonify({ 'error': str(e), 'message': 'profile not created' }), 400


def delete_profile(request):
    try:
        username = request.args.get('username')
        if username is None:
            raise ValueError('username is required')
        
        profile = Profile.objects(username=username).first()
        profile.delete()
        
        return jsonify({ 'message': 'profile deleted', 'username': username })
    except (Exception) as e:
        return jsonify({ 'error': str(e), 'message': 'profile not deleted' }), 400


def get_one_profile(request):
    try:
        username = request.args.get('username')
        if username is None:
            raise ValueError('username is required')
        
        profile = Profile.objects(username=username).first()
        
        profile_without_display = { 'username': profile.username, 'name': profile.name, 'bio': profile.bio }
        
        return jsonify({ 'message': 'profile found', 'profile': {
                **profile_without_display,
                'display': base64.b64encode(profile.display).decode('utf-8')
            }
        })
    except (Exception) as e:
        raise e
        return jsonify({ 'error': str(e), 'message': 'profile not found' }), 400

def update_profile(request):
    try:
        body = loads(request.get_data())
        validatad = validate_profile_data(body)
        
        profile = Profile.objects(username=validatad['username']).first()
        profile.name = validatad['name']
        profile.bio = validatad['bio']
        profile.display = validatad['display']
        profile.save()
        
        return jsonify({ 'message': 'profile updated', 'profile': profile })
    except (Exception) as e:
        return jsonify({ 'error': str(e), 'message': 'profile not updated' }), 400


def get_multiple_profiles(request):
    try:
        body = loads(request.get_data())
        
        usernames = body['usernames']
        
        if type(usernames) is not list:
            raise ValueError('usernames must be a list')
        
        profiles = Profile.objects(username__in=usernames)
        
        return jsonify({ 'message': 'profiles found', 'profiles': profiles })
    except (Exception) as e:
        return jsonify({ 'error': str(e), 'message': 'profiles not found' }), 400


def get_all_profiles(request):
    try:
        profiles = Profile.objects()
        
        return jsonify({ 'message': 'profiles found', 'profiles': profiles })
    except (Exception) as e:
        return jsonify({ 'error': str(e), 'message': 'profiles not found' }), 400