FROM python:3.8-slim-buster

ENV PYTHONBUFFERED=1
ENV PATH="/sripts:${PATH}"

# Install linux dependencies 
RUN apt-get update && apt-get install -y libgdal-dev
RUN apt-get install -y binutils libproj-dev gdal-bin

# Install python dependencies 
ADD ./requirements.txt /requirements.txt
RUN pip install -r requirements.txt

#build folder
RUN mkdir -p /usr/src/app/staticfiles

#Copy file to folder
ADD ./app /usr/src/app
ADD ./*.env /usr/src/app/
ADD ./entrypoint.sh /usr/src/app/

#Run django 
WORKDIR /usr/src/app/
ENTRYPOINT ["sh", "./entrypoint.sh"]
