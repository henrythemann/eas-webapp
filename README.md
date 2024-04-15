# eas-webapp
The website for European Auto Service. Built using Django as the backend with React as the frontend.

# Setup
To run the Django server, you needs to have a DJANGER_KEY environment variable set. You can create it with the following code:
```zsh
python3 manage.py shell
```
In the shell:
```python
from django.core.management.utils import get_random_secret_key  
get_random_secret_key()
```
Copy that key into this command:
```zsh
export DJANGER_KEY='copied_key'
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