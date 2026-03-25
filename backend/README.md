# Restaurant Django API

Backend API for the restaurant app. **Firebase remains** for auth and realtime; use this for admin, reporting, or custom business logic.

## Setup

1. **Create and activate a virtual environment** (from project root):

   ```bash
   cd backend
   python -m venv .venv
   .venv\Scripts\activate   # Windows
   # source .venv/bin/activate   # macOS/Linux
   ```

2. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Run migrations:**

   ```bash
   python manage.py migrate
   ```

4. **Create a superuser** (optional, for Django admin):

   ```bash
   python manage.py createsuperuser
   ```

## Run the API

```bash
python manage.py runserver
```

API base URL: **http://localhost:8000**

- Health: http://localhost:8000/api/health/
- Menu (GET/POST): http://localhost:8000/api/menu/
- Django admin: http://localhost:8000/admin/

## Use with Next.js

- Next.js (and Firebase) runs on **http://localhost:3000**.
- From the frontend, call the Django API with `fetch('http://localhost:8000/api/...')`.
- CORS is allowed for `http://localhost:3000` and `http://127.0.0.1:3000`.

## Run both apps

- Terminal 1: `npm run dev` (Next.js)
- Terminal 2: `cd backend && .venv\Scripts\activate && python manage.py runserver` (Django)
