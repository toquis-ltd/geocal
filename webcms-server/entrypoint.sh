#!/bin/bash

apt install -y wget

wget https://cdn.proj.org/us_nga_egm08_25.tif -P /usr/share/proj

python3 manage.py makemigrations --noinput

python3 manage.py migrate --noinput

python3 manage.py collectstatic --noinput 

gunicorn GeoCal.wsgi --bind 0.0.0.0:8000