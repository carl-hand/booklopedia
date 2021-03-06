from flask import (
    Flask,
    request,
    redirect,
    jsonify,
    abort,
    send_from_directory,
    render_template,
)
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from .config import Config

db = SQLAlchemy()
ma = Marshmallow()


def create_app(config_class=Config):
    """Construct the core application."""
    app = Flask(__name__, static_folder="../../client/build", static_url_path="")
    CORS(app)
    app.config.from_object(Config)

    # have to import routes here because they import app variable
    from server.booklopedia.authors.routes import authors
    from server.booklopedia.books.routes import books
    from server.booklopedia.search.routes import search_route

    app.register_blueprint(authors)
    app.register_blueprint(books)
    app.register_blueprint(search_route)

    @app.route("/")
    def index():
        return app.send_static_file("index.html")

    @app.teardown_appcontext
    def shutdown_session(exception=None):
        db.session.remove()

    db.init_app(app)
    ma.init_app(app)

    with app.app_context():
        db.create_all()

    return app
