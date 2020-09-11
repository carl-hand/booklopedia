from flask import Flask, request, redirect, jsonify, abort, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from datetime import datetime
from booklopedia.models import Book, BookSchema
from booklopedia import db

books = Blueprint('books', __name__)

book_schema = BookSchema()
books_schema = BookSchema(many=True)


@books.route("/")
def index():
    return "Hello World!"


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