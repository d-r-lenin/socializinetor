from mongoengine import Document, StringField, DateTimeField, IntField
import datetime

class User(Document):
    username = StringField(required=True, unique=True, min_length=3)
    password = StringField(required=True)
    email = StringField(required=True, unique=True)
    updatedAt = DateTimeField()
    createdAt = DateTimeField()
    meta = {
        'collection': 'users',
        'indexes': [
            {'fields': ['username'], 'unique': True},
            {'fields': ['email'], 'unique': True}
        ],
        'strict': False,
    }
