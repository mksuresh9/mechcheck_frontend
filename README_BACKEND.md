# MechCheck API

This is a production-ready Express + TypeScript skeleton for MechCheck.

Features:
- JWT authentication
- Role-based access control
- PostgreSQL integration (using `pg`)
- Routes for auth, users, bookings, payments, notifications
- SQL migration in `sql/init.sql`

Run locally (example):

```bash
# ensure .env contains DATABASE_URL and JWT_SECRET
npm install
npm run dev
```

Apply DB schema:

```bash
psql $DATABASE_URL -f sql/init.sql
```
