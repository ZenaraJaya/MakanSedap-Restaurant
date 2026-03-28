"""
Centralized Firebase Admin / Firestore client for the Django backend.

Local dev options (pick ONE):
- Set env var FIREBASE_SERVICE_ACCOUNT_PATH to your service account JSON path, or
- Set env var GOOGLE_APPLICATION_CREDENTIALS to your service account JSON path, or
- Set env var FIREBASE_SERVICE_ACCOUNT_JSON to the JSON contents.

On Google Cloud environments, default credentials may also work.
"""

import json
import os
from functools import lru_cache

import firebase_admin
from firebase_admin import credentials, firestore
from google.auth.exceptions import DefaultCredentialsError


@lru_cache
def _init_app() -> firebase_admin.App:
    # Option 1: full JSON in env (safer for local dev with .env)
    sa_json = os.getenv("FIREBASE_SERVICE_ACCOUNT_JSON") or os.getenv("FIREBASE_CREDENTIALS_JSON")
    if sa_json:
        cred_dict = json.loads(sa_json)
        cred = credentials.Certificate(cred_dict)  # type: ignore[arg-type]
        return firebase_admin.initialize_app(cred, name="django-backend")

    # Option 2: service account JSON path
    cred_path = os.getenv("FIREBASE_SERVICE_ACCOUNT_PATH") or os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
    if cred_path:
        cred = credentials.Certificate(cred_path)
        return firebase_admin.initialize_app(cred, name="django-backend")

    # Fallback: default app (works on GCP environments with default creds)
    # If no ADC is present, Firestore calls will raise DefaultCredentialsError.
    return firebase_admin.initialize_app(name="django-backend")


@lru_cache
def get_db() -> "firestore.Client":
    app = _init_app()
    try:
        return firestore.client(app=app)
    except DefaultCredentialsError as e:
        raise DefaultCredentialsError(
            "Firebase Admin credentials not found. Set one of these environment variables "
            "before starting `python manage.py runserver`: "
            "FIREBASE_SERVICE_ACCOUNT_PATH or GOOGLE_APPLICATION_CREDENTIALS "
            "(path to your service account JSON), or FIREBASE_SERVICE_ACCOUNT_JSON "
            "(the JSON contents)."
        ) from e


def get_menu_items_collection():
    """
    Convenience helper for the menu collection in Firestore.
    Adjust the collection name to match your existing Firebase structure.
    """

    db = get_db()
    return db.collection("menuItems")

