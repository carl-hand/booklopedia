from flask import Flask, request, redirect, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from .config import Config

db = SQLAlchemy()
ma = Marshmallow()
# mysql://scott:tiger@localhost/mydatabase

def create_app(config_class=Config):
    """Construct the core application."""
    app = Flask(__name__, static_folder='../../build', static_url_path='/')
    app.config.from_object(Config)

    # have to import routes here because they import app variable
    from server.booklopedia.books.routes import books
    app.register_blueprint(books)

    db.init_app(app)
    ma.init_app(app)

    return app

    # with app.app_context():
    #     # from __main__ import routes  # Import routes
    # from booklopedia.books.routes import books
    # app.register_blueprint(books)
    # db.create_all()  # Create sql tables for our data models

    # return app
