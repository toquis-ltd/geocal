#!/bin/bash

python3 manage.py makemigrations --noinput

python3 manage.py migrate --noinput

python3 manage.py collectstatic --noinput 

gunicorn GeoCal.wsgi --bind 0.0.0.0:8000