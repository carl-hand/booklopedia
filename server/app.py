from flask import Flask, request, redirect, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from datetime import datetime


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)
ma = Marshmallow(app)


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


book_schema = BookSchema()
books_schema = BookSchema(many=True)


@app.route("/")
def index():
    return "Hello World!"


@app.route("/books", methods=["GET"])
def get_books():
    books = Book.query.order_by(Book.date_created).all()
    return books_schema.jsonify(books)


@app.route("/book/<id>", methods=["GET"])
def get_book(id):
    book = Book.query.get_or_404(id)
    return book_schema.jsonify(book)


@app.route("/book", methods=["POST"])
def add_book():
    json_data = request.json
    title = json_data["title"]
    author = json_data["author"]
    category = json_data["category"]
    new_book = Book(title, author, category)

    # push to database
    try:
        db.session.add(new_book)
        db.session.commit()
        return book_schema.jsonify(new_book)
    except:
        return abort(500)


@app.route("/book/<id>", methods=["PUT"])
def update_book(id):
    book = Book.query.get_or_404(id)

    json_data = request.json
    title = json_data["title"]
    author = json_data["author"]
    category = json_data["category"]

    book.title = title
    book.author = author
    book.category = category

    try:
      db.session.commit()
      return book_schema.jsonify(book)
    except:
      return abort(500)


@app.route("/book/<id>", methods=["DELETE"])
def delete_book(id):
    book = Book.query.get_or_404(id)

    try:
        db.session.delete(book)
        db.session.commit()
        return book_schema.jsonify(book)
    except:
        return abort(500)


if __name__ == "__main__":
    app.run(debug=True)
