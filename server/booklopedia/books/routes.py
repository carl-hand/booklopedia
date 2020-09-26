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
    books = Book.query.order_by(Book.date_created.desc()).all()
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
    found_book = Book.query.filter_by(title=title).first()

    if found_book is not None:
        return abort(409, f"A book with the title '{title}' already exists")

    category = book["category"]
    description = book["description"]
    info_link = book["info_link"]
    thumbnail = book["thumbnail"]
    new_book = Book(title, category, description, info_link, thumbnail)

    author_names = book["authorNames"]
    for name in author_names:
        author = Author.query.filter_by(name=name).first()

        if author is None:
            author = Author(name)

        db.session.add(author)
        new_book.authors.append(author)

    # push to database
    try:
        db.session.add(new_book)
        db.session.commit()
        return book_schema.dump(new_book)
    except:
        db.session.rollback()
        return abort(500)
