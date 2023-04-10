# got this from chatgpt, so it's probably not perfect :)

# stage 1: development
FROM python:3.9-alpine AS dev
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
RUN apk add --no-cache gcc musl-dev postgresql-dev
WORKDIR /app
COPY requirements*.txt .
RUN pip install -r requirements-dev.txt
COPY . .
#EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# stage 2: production
FROM python:3.9-alpine AS prod
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
RUN apk add --no-cache postgresql-dev
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
#EXPOSE 8000
#CMD ["gunicorn", "-b", "0.0.0.0:8000", "mysite.wsgi"]
