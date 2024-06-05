FROM python:3.12.1

RUN apt-get -y update
RUN apt-get -y install vim

RUN mkdir -p /usr/src/app/backend
WORKDIR /usr/src/app/backend

COPY requirements.txt .

RUN pip install --upgrade pip 
RUN pip install -r requirements.txt

COPY . .

RUN python manage.py collectstatic
RUN python manage.py makemigrations
# RUN python manage.py migrate

EXPOSE 8000

# CMD ["gunicorn","--bind","0.0.0.0:8000","stock.wsgi:application && python manage.py migrate"]
CMD ["sh","-c","python manage.py migrate && gunicorn --bind 0.0.0.0:8000 backend.wsgi:application -t 240"]
# CMD ["python","manage.py","runserver","0.0.0.0:8000","--certificate","/etc/letsencrypt/live/i10c104.p.ssafy.io/fullchain.pem","--key","/etc/letsencrypt/live/i10c104.p.ssafy.io/privkey.pem"]

