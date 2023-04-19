from mongoengine import Document, StringField, EmailField, DateTimeField, IntField, BooleanField, ListField, ReferenceField, EmbeddedDocumentField, EmbeddedDocument, CASCADE

class Profile(Document):
    username = StringField(required=True, unique=True, min_length=3)
    name = StringField(required=True)
    bio = StringField(default='', trim=True)
    created_at = DateTimeField(required=True)
    updated_at = DateTimeField(required=True)

    meta = {
        'collection': 'profiles',
        'indexes': ['username'],
        'auto_create_index': True,
        'strict': False,
        'ordering': ['-updated_at'],
        'allow_inheritance': False,
        'timestamps': {'created_at': 'created_at', 'updated_at': 'updated_at'}
    }
