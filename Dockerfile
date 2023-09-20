FROM python:3.11.5-bullseye

ENV PYTHONBUFFERED=1
ENV PATH="/sripts:${PATH}"
ENV DEBIAN_FRONTEND=noninteractive

# Install python dependencies 
ADD ./back/requirements.txt /requirements.txt
RUN apt update

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

#build folder
RUN mkdir -p /usr/back/static

#Copy file to folder
ADD ./back /usr/back/
ADD ./entrypoint.sh /usr/back/
WORKDIR /usr/back/