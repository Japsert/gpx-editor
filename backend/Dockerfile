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
