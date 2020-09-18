from flask import Flask, request, jsonify, abort, Blueprint, Response
import requests
from ..config import Config

search_route = Blueprint("search", __name__)


@search_route.route("/search")
def search():
    search_term = request.args.get("searchTerm")
    response = requests.get(
        "https://www.googleapis.com/books/v1/volumes?q={search_term}&maxResults=1&key={api_key}".format(
            search_term=search_term, api_key=Config.API_KEY
        )
    )

    return Response(
        response.text,
        status=response.status_code,
        content_type=response.headers["content-type"],
    )
