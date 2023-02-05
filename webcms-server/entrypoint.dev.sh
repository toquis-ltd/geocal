#!/bin/bash

apt install -y wget

wget https://cdn.proj.org/us_nga_egm08_25.tif -P /usr/local/lib/python3.8/dist-packages/pyproj/proj_dir/share/proj

PROJ_DOWNLOAD_DIR=$(python3 -c "import pyproj; print(pyproj.datadir.get_user_data_dir())" )

wget --mirror https://cdn.proj.org/ -P ${PROJ_DOWNLOAD_DIR}

python3 manage.py migrate --noinput

python3 manage.py collectstatic --noinput

python3 manage.py runserver 0.0.0.0:8000
