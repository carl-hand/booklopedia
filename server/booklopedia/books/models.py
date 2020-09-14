from server.booklopedia import db, ma
from datetime import datetime

author_book = db.Table(
    "author_book",
    db.Column("author_id", db.Integer, db.ForeignKey("author.id")),
    db.Column("book_id", db.Integer, db.ForeignKey("book.id")),
)


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    # this creates a fake column called books that can be accessed from the Python Author class
    # this books value will be a reference to all the books the current author has wrote
    authors = db.relationship(
        "Author", secondary="author_book", backref="books", lazy="dynamic"
    )
    category = db.Column(db.String(20))
    date_created = db.Column(db.DateTime, default=datetime.utcnow())

    def __init__(self, title, category):
        self.title = title
        self.category = category


class BookSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Book

    id = ma.auto_field()
    title = ma.auto_field()
    category = ma.auto_field()
    date_created = ma.auto_field()
    authors = ma.auto_field()
