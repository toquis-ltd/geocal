FROM ubuntu:latest

ENV PYTHONBUFFERED=1
ENV PATH="/sripts:${PATH}"
ENV DEBIAN_FRONTEND=noninteractive 

# Install linux dependencies 
RUN apt-get update && apt-get install -y libgdal-dev
RUN apt-get install -y binutils libproj-dev gdal-bin

# Install python dependencies 
ADD ./requirements.txt /requirements.txt
RUN apt-get -y install python3-pip
RUN pip install --upgrade pip
RUN pip3 install -r requirements.txt

#build folder
RUN mkdir -p /usr/src/app/staticfiles

#Copy file to folder
ADD ./app /usr/src/app
ADD ./*.env /usr/src/app/
ADD ./entrypoint.dev.sh /usr/src/app/
ADD ./entrypoint.sh /usr/src/app/

#Run django
WORKDIR /usr/src/app/