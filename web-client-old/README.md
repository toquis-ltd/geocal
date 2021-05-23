# Getting Started

## `Local Deployement`

### To deploy first

First you need to deploy the backend
```
git clone https://github.com/StoicEric/GDAL_UI
cd GDAL_UI
pip3 -r requirements.txt
export SECRET_KEY=\"$(base64 /dev/urandom | head -c50)\
python3 manage.py runserver
```

### Data base to download
[DataBase](https://drive.google.com/u/0/uc?id=1ySpR7P-N9QcWqboTZdcwk3xC5DXZG8h0&export=download)

[JSon Files](https://drive.google.com/u/0/uc?id=1i-JukfJPBdtUJNUtBuG6ChJJPhVjQr9b&export=download)

The Database should be unzip in main dirictory.

For json files you have to make dir with name "json_files", to unzip them there

### Frontend
```
git clone https://github.com/YA2JA/CRS-Converter.git
cd CRS-Converter
yarn install
echo 'REACT_APP_HOST="http://127.0.0.1:8000' > .env
yarn start
```
