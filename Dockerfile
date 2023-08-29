FROM ubuntu:latest

ENV PYTHONBUFFERED=1
ENV PATH="/sripts:${PATH}"
ENV DEBIAN_FRONTEND=noninteractive

# Install python dependencies 
ADD ./back/requirements.txt /requirements.txt
RUN apt update
RUN apt -y install python3-pip
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

#build folder
RUN mkdir -p /usr/back/static

#Copy file to folder
ADD ./back /usr/back/
ADD ./entrypoint.sh /usr/back/
WORKDIR /usr/back/