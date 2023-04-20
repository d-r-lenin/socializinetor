from mongoengine import Document, StringField, EmailField, DateTimeField, IntField, BooleanField, ListField, ReferenceField, EmbeddedDocumentField, EmbeddedDocument, CASCADE, BinaryField

class Profile(Document):
    username = StringField(required=True, unique=True, min_length=3)
    name = StringField(required=True)
    bio = StringField(default='', trim=True)
    display = BinaryField(default=b'')
    created_at = DateTimeField()
    updated_at = DateTimeField()

    meta = {
        'collection': 'profiles',
        'indexes': ['username'],
        'auto_create_index': True,
        'strict': False,
        'ordering': ['-updated_at'],
        'allow_inheritance': False,
        'timestamps': {'created_at': 'created_at', 'updated_at': 'updated_at'}
    }
