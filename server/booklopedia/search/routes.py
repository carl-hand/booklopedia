from flask import Flask, request, jsonify, abort, Blueprint, Response
from os import environ, path
from dotenv import load_dotenv
import requests

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, ".env"))

search_route = Blueprint("search", __name__)


@search_route.route("/search")
def search():
    search_term = request.args.get("searchTerm")
    response = requests.get(
        "https://www.googleapis.com/books/v1/volumes?q={search_term}&maxResults=1&key={api_key}".format(
            search_term=search_term, api_key=environ.get("API_KEY")
        )
    )

    return Response(
        response.text,
        status=response.status_code,
        content_type=response.headers["content-type"],
    )
