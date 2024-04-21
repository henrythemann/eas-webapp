# eas-webapp
The website for European Auto Service. Built using Django as the backend with React as the frontend.

# Setup
To run the Django server, you need to install summernote (for HTML editor in admin page) and psycopg2 (postgres adapter):
```zsh
python3 -m pip install django-summernote
python3 -m pip install psycopg2 
```

You will also need to create a file called .my_pgpass in the backend folder with this format:
```
localhost:5432:mydatabase:myuser:mypassword
```

You will also need to create a config file for postgres at `~/.pg_service.conf` that looks like this:
```
[my_service]
host=localhost
port=5432
dbname=mydatabase
user=myuser
```

You also need to have a DJANGER_KEY environment variable set. You can set it temporarily with the following code:

```zsh
export DJANGER_KEY=$(python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
```

# Running
## Backend
```zsh
cd backend
python3 manage.py runserver
```
## Frontend
```zsh
cd frontend
npm run dev
```

# Changing API
When you change the models, you will need to run this from the backend folder
```zsh
python manage.py makemigrations
python manage.py migrate
```
When you change what the /api/site-info endpoint returns, you will need to update the local copy of the site info by running this command
```zsh
curl http://localhost:8000/api/site-info/ > frontend/data/siteInfo.json
```

# Clean Slate Django
To clear the database and start anew, there are a number of steps to follow

Delete migrations:
```zsh
mv site_data/migrations/__init__.py . && rm -r site_data/migrations && mkdir site_data/migrations && mv __init__.py site_data/migrations/__init__.py
```

Drop database:
```zsh
psql -U <username> -d eas
```
```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL PRIVILEGES ON SCHEMA public TO <user>;
```