"""Flask configuration variables."""
from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, ".env"))


class Config:
    """Set Flask configuration from .env file."""

    # General Config
    SECRET_KEY = environ.get("SECRET_KEY")
    FLASK_APP = environ.get("FLASK_APP")
    FLASK_ENV = environ.get("FLASK_ENV")

    # Database
    DB_USER = environ.get("DB_USER")
    DB_PASSWORD = environ.get("DB_PASSWORD")
    DB_SERVER = environ.get("DB_SERVER")
    DB_NAME = environ.get("DB_NAME")
    SQLALCHEMY_DATABASE_URI = (
        "mysql+mysqlconnector://{user}:{password}@{server}/{database}".format(
            user=DB_USER, password=DB_PASSWORD, server=DB_SERVER, database=DB_NAME
        )
    )
    SQLALCHEMY_POOL_SIZE = environ.get("SQLALCHEMY_POOL_SIZE")
    SQLALCHEMY_POOL_RECYCLE = environ.get("SQLALCHEMY_POOL_RECYCLE")
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_size": int(SQLALCHEMY_POOL_SIZE),
        "pool_recycle": int(SQLALCHEMY_POOL_RECYCLE),
    }

    # API
    API_KEY = environ.get("API_KEY")
