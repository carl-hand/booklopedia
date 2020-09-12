from server.booklopedia import db, ma
from datetime import datetime


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(20))
    date_created = db.Column(db.DateTime, default=datetime.utcnow())

    def __init__(self, title, author, category):
        self.title = title
        self.author = author
        self.category = category


class BookSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'author', 'category', 'date_created')
