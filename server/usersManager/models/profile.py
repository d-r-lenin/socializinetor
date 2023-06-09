from mongoengine import Document, StringField, DateTimeField, FileField
import datetime

class Profile(Document):
    username = StringField(required=True, unique=True, min_length=3)
    name = StringField(required=True)
    bio = StringField(default='', trim=True)
    display = FileField( collection_name='fs');
    created_at = DateTimeField( default=datetime.datetime.utcnow)
    updated_at = DateTimeField()

    meta = {
        'collection': 'profiles',
        'indexes': ['username'],
        'auto_create_index': True,
        'strict': False,
        'ordering': ['-updated_at'],
        'timestamps': {'created_at': 'created_at', 'updated_at': 'updated_at'}
    }
