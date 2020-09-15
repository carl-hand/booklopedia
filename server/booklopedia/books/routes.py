from flask import Flask, request, redirect, jsonify, abort, Blueprint, current_app
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from datetime import datetime
from server.booklopedia.books.models import Book, BookSchema
from server.booklopedia.authors.models import Author
from server.booklopedia import db

books = Blueprint("books", __name__)

book_schema = BookSchema()
books_schema = BookSchema(many=True)


@books.route("/books", methods=["GET"])
def get_books():
    books = Book.query.order_by(Book.date_created).all()
    return books_schema.jsonify(books)


@books.route("/book/<id>", methods=["GET"])
def get_book(id):
    book = Book.query.get_or_404(id)
    return book_schema.jsonify(book)


@books.route("/book", methods=["POST"])
def add_book():
    json_data = request.json
    book = json_data["book"]
    title = book["title"]
    category = book["category"]
    new_book = Book(title, category)

    author_names = book["authors"]
    count = 0
    for name in author_names:
        author = Author.query.filter_by(name=name).first()

        if author is None:
            author = Author(name)

        db.session.add(author)
        new_book.authors.append(author)

    print(f"{new_book.authors}")
    # push to database
    try:
        db.session.add(new_book)
        db.session.commit()
        return book_schema.dump(new_book)
    except:
        return abort(500)


@books.route("/book/<id>", methods=["PUT"])
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


@books.route("/book/<id>", methods=["DELETE"])
def delete_book(id):
    book = Book.query.get_or_404(id)

    try:
        db.session.delete(book)
        db.session.commit()
        return book_schema.jsonify(book)
    except:
        return abort(500)
