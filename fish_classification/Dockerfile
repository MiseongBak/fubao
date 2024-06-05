## custom dockerfile syntax. latest stable release of the version 1 syntax
# syntax=docker/dockerfile:1

# python 3.7 저용량
FROM python:3.7

# work directory
WORKDIR /code

# python library list 복사
COPY requirements.txt requirements.txt

RUN apt-get update

# python library 설치
RUN pip install -r requirements.txt

RUN apt-get -y install libgl1-mesa-glx

# flask port 노출
EXPOSE 5000

# app.py 복사
COPY . .

# python flask 실행
CMD ["gunicorn", "-b", "0.0.0.0:5000", "wsgi:app"]