from mongoengine import Document, StringField

class Master(Document):
    key = StringField(required=True)
    value = StringField(required=True)

    meta = {
        'collection': 'masters',
        'indexes': [{'fields': ['key'], 'unique': True}]
        }
