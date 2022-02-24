#!/bin/bash
PROJ_DOWNLOAD_DIR=$(python3 -c "import pyproj; print(pyproj.datadir.get_user_data_dir())" )

wget --mirror https://cdn.proj.org/ -P ${PROJ_DOWNLOAD_DIR}

python3 manage.py migrate --noinput

python3 manage.py collectstatic --noinput

python3 manage.py runserver 0.0.0.0:8000
