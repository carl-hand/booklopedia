from server.booklopedia import db, ma
from datetime import datetime


class Book(db.Model):
    book_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    # author = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(20))
    date_created = db.Column(db.DateTime, default=datetime.utcnow())

    def __init__(self, title, category):
        self.title = title
        self.category = category
        self.authors = []


class BookSchema(ma.Schema):
    class Meta:
        fields = ("book_id", "title", "category", "date_created")
