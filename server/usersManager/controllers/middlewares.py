from flask import request, abort

from controllers.users import is_authenticated

# protected_endpoints = ['/user']
protected_bp = ['profile_bp']

class AuthMiddleware:
    def __init__(self, app):
        self.app = app
        self.protected_bp = protected_bp[0]
        # set the protected endpoints
        self.protected_endpoints = ['/user/profile']

    def __call__(self, environ, start_response):
        path = request.path # get the path of the incoming request
        if path.startswith(self.protected_bp.url_prefix) or path in self.protected_endpoints: # check if the path is protected
            # Perform authentication logic here
            if not is_authenticated(request):
                abort(401)
        return self.app(environ, start_response)

