import base64
from flask import jsonify, make_response, request, send_file
from json import loads
from bson import ObjectId



from models.user import User
from models.profile import Profile

def validate_profile_data(body):
    validated_data = {}
    if 'username' not in body or body['username'] == '':
        raise ValueError('username is required')
    if 'name' not in body or body['name'] == '':
        raise ValueError('name is required')

    validated_data['username'] = body['username']
    validated_data['name'] = body['name']

    if 'bio' in body:
        validated_data['bio'] = body['bio']

    if 'display' in body:
        validated_data['display'] = body['display']

    return validated_data


def check_availability(request):
    try:
        body = request.user
        if 'username' not in body:
            raise ValueError('username is required')

        username = body['username']

        profile = Profile.objects(username=username).first()
        if profile is None:
            return jsonify({ 'message': 'profile is not inserted', 'username': username, 'isPresent': False, 'status': 404 })
        else:
            return jsonify({ 'message': 'profile is present', 'username': username, 'isPresent': True, 'status': 200 })
    except (Exception) as e:
        return jsonify({ 'error': str(e), 'message': 'username or email is not available', 'status': 400 })


def create_profile(request):
    try:
        body = request.form
        username = request.user['username']
        display = request.files['display']
        validatad = validate_profile_data({**body, display: display, 'username': username})
        
        profile = Profile( **validatad)
        
        profile.display.put(display, content_type=display.content_type, filename=display.filename)
        
        profile.save()
        print(profile)
        return jsonify({
            'message': 'profile created', 'profile': {
                **loads(profile.to_json()),
            }
        })
    except (Exception) as e:
        # raise e
        return jsonify({ 'error': str(e), 'message': 'profile not created' }), 400


def delete_profile(request):
    try:
        username = request.args.get('username')
        if username is None:
            raise ValueError('username is required')
        
        profile = Profile.objects(username=username).first()
        
        # remove the display
        if profile.display is not None:
            profile.display.delete()
        
        profile.delete()
        
        return jsonify({ 'message': 'profile deleted', 'username': username })
    except (Exception) as e:
        return jsonify({ 'error': str(e), 'message': 'profile not deleted' }), 400

def get_Display(id):
    try:
        # display id is given
        # get the display
        # return the display
        print(id)
        profile = Profile.objects(display = ObjectId(id)).first()
        
        if profile is None:
            raise ValueError('profile not found')
        
        display = profile.display
        
        if display is None:
            raise ValueError('display not found')
        
        
        return send_file(display, mimetype=display.content_type)
    
    except (Exception) as e:
        return jsonify({ 'error': str(e), 'message': 'profile not found' }), 400

def get_one_profile(request):
    try:
        print(request.user.to_json())
        username = request.args.get('username')
        if username is None:
            raise ValueError('username is required')
        
        profile = Profile.objects(username=username).first()
        
        if profile is None:
            raise ValueError('profile not found')
        
        profile_data = loads(profile.to_json())
        
        return jsonify({ 'message': 'profile found', 'profile': {
                **profile_data,
            }
        })
    except (Exception) as e:
        return jsonify({ 'error': str(e), 'message': 'profile not found' }), 400

def update_profile(request):
    try:
        body = loads(request.get_data())
        validatad = validate_profile_data(body)
        display = request.files['display']
        
        profile = Profile.objects(username=validatad['username']).first()
        profile.name = validatad['name']
        profile.bio = validatad['bio']
        
        if(display):
            profile.display.put(display, content_type=display.content_type, filename=display.filename)
        
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