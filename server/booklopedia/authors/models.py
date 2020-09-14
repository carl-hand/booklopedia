from server.booklopedia import db, ma


# Create author model and 1 -> many relationship with book
# An author can have many books but each book can only have one author
author_book = db.Table('author_book',
                       db.Column('author_id', db.Integer, db.ForeignKey('author.author_id'),
                                 db.Column('book_id', db.Integer, db.ForeignKey="book.book_id")))


class Author(db.Model):
    author_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    # this creates a fake column called owner that can be accessed from the Python Book class
    # this owner value will be a reference to the Author that wrote the current book
    books = db.relationship('Book', secondary=author_book,
                            backref=db.backref('authors', lazy='dynamic'))

    def __init__(self, name):
        self.name = name


class AuthorSchema(ma.Schema):
    class Meta:
        fields = ('author_id', 'name', 'books')
