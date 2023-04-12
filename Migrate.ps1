docker compose -f docker-compose.dev.yml exec backend python manage.py makemigrations
docker compose -f docker-compose.dev.yml exec backend python manage.py migrate
