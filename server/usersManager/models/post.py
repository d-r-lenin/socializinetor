from mongoengine import Document, EmbeddedDocument, StringField, ListField, EmbeddedDocumentField, DateTimeField


class Comment(EmbeddedDocument):
    _id = ObjectIdField(default=lambda: ObjectId(), unique=True)
    username = StringField(required=True)
    body = StringField(required=True)
    createdAt = DateTimeField(default=datetime.now)
    updatedAt = DateTimeField(default=datetime.now)

class Post(Document):
    username = StringField(required=True, trim=True)
    title = StringField(required=True, trim=True)
    body = StringField(required=True, trim=True, default='')
    image = StringField(default=None)
    likes = ListField(StringField(), default=[])
    dislikes = ListField(StringField(), default=[])
    comments = ListField(EmbeddedDocumentField(Comment), default=[])

    meta = {'indexes': [
        {'fields': ['comments._id'], 'unique': True},
        {'fields': ['comments.createdAt']},
        {'fields': ['username']},
        {'indexes': ['createdAt']},
    ]}

