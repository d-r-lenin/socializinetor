from marshmallow import (
    Schema, fields, validate, ValidationError, validates_schema
)

class UserSchema(Schema):
    username = fields.Str(required=True, validate=validate.Length(min=3, max=20))
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=3, max=20))
    confirmPassword = fields.Str(required=True, validate=validate.Length(min=3, max=20))

    @validates_schema
    def validate_confirmPassword(self, data, **kwargs):
        if data.get('password') != data.get('confirmPassword'):
            raise ValidationError({ "confirmPassword": ["not matchet with password"]});

    class Meta:
        ordered = True


class SignInSchema(Schema):
    username = fields.Str(required=True, validate=validate.Length(min=3, max=20))
    password = fields.Str(required=True, validate=validate.Length(min=3, max=20))

    class Meta:
        ordered = True


# from flask_request_validator import (
#     Param,
#     JSON,
#     Length,
#     Regexp,
#     Custom
# )
# from werkzeug.exceptions import BadRequest


# ##### Sign In Validation #####

# sign_in_validation = [
#     Param('username', JSON, str, rules=[Length(min=3, max=20)]),
#     Param('password', JSON, str, rules=[Length(min=8, max=20)])
# ]


# ##### Sign Up Validation #####

# def confirm_password_validator(password, confirm_password):
#     if password != confirm_password:
#         raise BadRequest('passwords do not match')

# sign_up_validation = [
#     Param('username', JSON, str, rules=[Length(min=3, max=20)]),
#     Param('email', JSON, str, rules=[Length(min=3, max=20), Regexp(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')]),
#     Param('password', JSON, str, rules=[Length(min=8, max=20)]),
#     Param('confirmPassword', JSON, str, rules=[Length(min=8, max=20)]),
#     Param('confirmPassword', JSON, str, rules=[Custom(confirm_password_validator, args=('password',))])
# ]