from flask import Flask, jsonify, Blueprint
from server.booklopedia.authors.models import Author, AuthorSchema

authors = Blueprint("authors", __name__)

author_schema = AuthorSchema()
authors_shchema = AuthorSchema(many=True)


@authors.route("/authors", methods=["GET"])
def get_authors():
    all_authors = Author.query.all()
    return authors_schema.jsonify(all_authors)


@authors.route("/author/<id>", methods=["GET"])
def get_author(id):
    author = Author.query.get_or_404(id)
    return author_shchema.jsonify(author)
