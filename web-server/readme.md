# Coordinate system converter

## Issues

### CSS
* (Not critical) Globe object  The globe in popup has strange comportement and didn't positioned at the right place in different view size (This part is in react code)
* (Not critical) Header Searchbar Height of the Searchbar did't match with button size(this part is in django static/common)

### Django
* (Medium) Search is case sensitive, problem file is in (search/interfaces.py)

## Before Deployment
### Build react app
Before deploy docker file you will need Build js project
```sh
git clone https://github.com/YA2JA/CRS-Converter.git
cd CRS-Converter
yarn install
echo REACT_APP_HOST=(THE HOST NAME SHOULD BE HERE) > .env
yarn build
```
After build, remplace folders inside app\converter\static\converter  by new builded css and js folders
also don't forget to remplace files names in converter\templates\converter\index.html to new one.

## Deployment
### Setup
To do on linux
```sh
git clone https://github.com/YA2JA/tmp.git
cd tmp
echo SECRET_KEY=\"$(base64 /dev/urandom | head -c50)\" $'\n'"DEBUG=0"$'\n'"pg_name=postgres"$'\n'"pg_user=postgres"$'\n'"pg_host=pgdb"$'\n'"pg_pass=toor" > prod.env
```
### Docker up
To run from tmp directory
```sh
docker-compose up --build
```
Then
```sh
cat dump.sql | docker exec -i <container_id> psql -U postgres   
```

## Eventuality  
### Why could static not work ?
Some IDEs could remplace the LF by CRLF (new line) in bash files, to resolve that just copy file text and delete old file and create new one where you can paste the bash code