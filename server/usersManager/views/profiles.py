from flask import Blueprint, request, jsonify

from controllers.profiles import check_availability, create_profile, delete_profile, update_profile, get_one_profile, get_multiple_profiles, get_all_profiles, get_Display

profile_bp = Blueprint('p', __name__)

@profile_bp.route('/check/availability', methods=['GET'])
def check():
    return check_availability(request)

@profile_bp.route('/create', methods=['POST'])
def create():
    return create_profile(request)

@profile_bp.route('/delete', methods=['DELETE'])
def delete():
    return delete_profile(request)

@profile_bp.route('/update', methods=['PUT'])
def update():
    return update_profile(request)

@profile_bp.route('/get/one', methods=['GET'])
def get_one():
    return get_one_profile(request)

@profile_bp.route('/media/display/<id>', methods=['GET'])
def get_display(id):
    return get_Display(id)

@profile_bp.route('/get/multiple', methods=['POST'])
def get_multiple():
    return get_multiple_profiles(request)

@profile_bp.route('/get/all', methods=['GET'])
def get_all():
    return get_all_profiles(request)

