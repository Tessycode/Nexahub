# Nexahub – Digital Services Marketplace

A full-stack web application: **React + TypeScript** frontend (Vite) backed by a **Django 5 + MySQL** REST API.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Backend | Python 3.13, Django 5.1, Django REST Framework |
| Database | MySQL 8.0 |
| API Docs | drf-spectacular (Swagger + ReDoc) |
| Auth | Session-based (HTTP-only cookie) |
| Containers | Docker + Docker Compose |

---

## Project Structure

```
Nexahub/
├── src/                          # React frontend
│   ├── contexts/
│   │   └── AuthContext.tsx       # Session auth context
│   ├── lib/
│   │   └── api.ts                # Typed API client (50+ endpoints)
│   └── pages/                    # 11 frontend pages
│
└── nexahub_backend/              # Django backend
    ├── manage.py
    ├── requirements.txt
    ├── .env                      # Dev environment (gitignored)
    ├── .env.example
    ├── Dockerfile
    ├── nexahub/
    │   ├── settings/
    │   │   ├── base.py
    │   │   ├── development.py
    │   │   └── production.py
    │   └── urls.py
    └── apps/
        ├── accounts/             # Custom User model + auth endpoints
        ├── core/                 # Company, Team, Testimonials, FAQs
        ├── services/             # Service catalogue
        ├── portfolio/            # Portfolio projects
        ├── pricing/              # Pricing plans
        ├── blog/                 # Blog posts + comments
        ├── contact/              # Enquiry form
        ├── orders/               # Service requests + invoices
        ├── dashboard/            # Client portal data
        └── notifications/        # In-app notification signals
```

---

## Quick Start (Docker)

### 1. Clone and configure

```bash
git clone <repo>
cd Nexahub

# The .env is pre-configured for local Docker development
# Edit nexahub_backend/.env to change passwords/keys
```

### 2. Start all services

```bash
docker-compose up --build
```

This will:
- Start MySQL 8.0 on port 3306
- Run Django migrations automatically
- Seed all demo data (company, team, services, portfolio, blog, pricing, testimonials)
- Start Gunicorn on port 8000

### 3. Start the frontend

```bash
npm install
npm run dev
```

Frontend is available at: http://localhost:5173  
Backend API is available at: http://localhost:8000  
Swagger UI: http://localhost:8000/api/docs/

---

## Manual Setup (Without Docker)

### Backend

```bash
cd nexahub_backend

# Create virtual environment
python -m venv venv
source venv/bin/activate      # Linux/Mac
venv\Scripts\activate          # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
# Edit .env — change DB_HOST=localhost (not 'db')

# Create MySQL database
mysql -u root -p
CREATE DATABASE nexahub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'nexahub_user'@'localhost' IDENTIFIED BY 'nexahub_password';
GRANT ALL PRIVILEGES ON nexahub_db.* TO 'nexahub_user'@'localhost';

# Run migrations
python manage.py migrate

# Seed demo data
python manage.py seed_all

# Create superuser (optional)
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

### Frontend

```bash
npm install
npm run dev
```

---

## API Endpoints

| Namespace | Base Path | Notes |
|---|---|---|
| Auth | `/api/v1/auth/` | login, register, logout, me, change-password |
| Core | `/api/v1/` | company, team, stats, testimonials, offices, FAQs |
| Services | `/api/v1/services/` | list, detail, categories |
| Portfolio | `/api/v1/portfolio/` | list, detail, categories |
| Pricing | `/api/v1/pricing/` | plans with features |
| Blog | `/api/v1/blog/` | posts (filterable), detail, comments, categories, tags |
| Contact | `/api/v1/contact/` | enquiry form (public) |
| Dashboard | `/api/v1/dashboard/` | overview, notifications, messages, settings, analytics |
| Orders | `/api/v1/orders/` | projects, invoices (auth required) |

Full interactive docs: **http://localhost:8000/api/docs/**

---

## Seed Management Commands

```bash
python manage.py seed_all           # Run all seeds in order
python manage.py seed_company       # Company info, offices, statistics
python manage.py seed_team          # 6 team members
python manage.py seed_services      # 4 categories + 8 services
python manage.py seed_portfolio     # 6 portfolio categories + 3 flagship projects
python manage.py seed_blog          # Categories, tags, 3 blog posts
python manage.py seed_testimonials  # 4 client testimonials
python manage.py seed_pricing       # 3 pricing plans (Starter, Pro, Enterprise)
```

---

## Authentication Flow

1. Frontend calls `GET /api/v1/auth/me/` on app load to restore session
2. On login, Django creates a session and sets an HTTP-only `sessionid` cookie
3. All subsequent requests include `credentials: 'include'` + CSRF token from cookie
4. Logout destroys the server-side session and clears the cookie

---

## Environment Variables

See `nexahub_backend/.env.example` for all variables.

Key variables:

| Variable | Description |
|---|---|
| `SECRET_KEY` | Django secret key |
| `DEBUG` | `True` for development |
| `DB_*` | MySQL connection settings |
| `CORS_ALLOWED_ORIGINS` | Frontend origin(s) |
| `EMAIL_*` | SMTP settings for transactional email |
| `FRONTEND_URL` | Used in password reset emails |

---

## Admin Panel

Available at: http://localhost:8000/admin/

All models are registered with full list/filter/search capabilities. Use `createsuperuser` to create an admin account.

---

## Next Steps

- [ ] Social OAuth (Google / GitHub) — post-launch
- [ ] Payment gateway integration (Stripe) — post-launch
- [ ] WebSocket notifications (Django Channels)
- [ ] Rate limiting (django-ratelimit)
- [ ] Redis caching layer
