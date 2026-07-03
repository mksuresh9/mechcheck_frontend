# 🔗 Project Interconnections & Integration Guide

This document details how the Backend API, Customer App, Mechanic App, and Admin Panel communicate and work together.

---

## 🌐 System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                           EXTERNAL INTEGRATIONS                               │
├────────────────────────────────────────────────────────────────────────────────┤
│  Razorpay  │  Firebase  │  Twilio  │  SendGrid  │  AWS S3  │  Google Maps     │
└────────────┬──────────────┬──────────┬──────────┬──────────┬──────────────────┘
             │              │          │          │          │
             ▼              ▼          ▼          ▼          ▼
┌────────────────────────────────────────────────────────────────────────────────┐
│                         BACKEND API SERVER (Node.js)                          │
│                                                                                │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │  API Gateway & Load Balancer                                           │ │
│  │  ├─ JWT Authentication                                                 │ │
│  │  ├─ Rate Limiting                                                      │ │
│  │  └─ Request Validation                                                 │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                           │                                                   │
│    ┌──────────────────────┼──────────────────────┐                           │
│    ▼                      ▼                      ▼                           │
│  ┌────────────┐      ┌──────────────┐     ┌─────────────┐                   │
│  │  Auth      │      │  Booking     │     │  Inspection │                   │
│  │ Service    │      │  Service     │     │  Service    │                   │
│  └────────────┘      └──────────────┘     └─────────────┘                   │
│    │                      │                      │                           │
│    ├──────────────────────┼──────────────────────┤                           │
│    │                      │                      │                           │
│  ┌────────────┐      ┌──────────────┐     ┌─────────────┐                   │
│  │ Payment    │      │  Notification│    │  Analytics  │                   │
│  │ Service    │      │  Service     │     │  Service    │                   │
│  └────────────┘      └──────────────┘     └─────────────┘                   │
│                           │                                                   │
│  ┌─────────────────────────┴──────────────────────────────────────────────┐  │
│  │                    PostgreSQL Database                                │  │
│  │  ┌────────────┬──────────┬──────────┬──────────┬──────────────────┐ │  │
│  │  │  users     │ vehicles │ bookings │ payments │ inspections     │ │  │
│  │  │ mechanics  │ reviews  │ admin    │ earnings │ notifications   │ │  │
│  │  └────────────┴──────────┴──────────┴──────────┴──────────────────┘ │  │
│  └─────────────────────────┬──────────────────────────────────────────────┘  │
│                            │                                                   │
│  ┌─────────────────────────┴──────────────────────────────────────────────┐  │
│  │  WebSocket Server (Socket.io)                                         │  │
│  │  ├─ Real-time booking updates                                         │  │
│  │  ├─ Location tracking                                                 │  │
│  │  ├─ Notifications                                                     │  │
│  │  └─ Chat messages                                                     │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                                │
└────────────────────────────────────────────────────────────────────────────────┘
        │                          │                        │
        │ REST API + JWT           │ WebSocket             │ WebSocket
        │                          │                        │
    ┌───┴───┐                  ┌────────┐            ┌────────────┐
    │       │                  │        │            │            │
    ▼       ▼                  ▼        ▼            ▼            ▼
┌─────────────────┐     ┌────────────────┐    ┌──────────────────┐
│ Customer App    │     │ Mechanic App   │    │  Admin Panel     │
│  (React Native) │     │ (React Native) │    │  (React Web)     │
│                 │     │                │    │                  │
│ ├─ Login        │     │ ├─ Login       │    │ ├─ Login         │
│ ├─ Bookings     │     │ ├─ Bookings    │    │ ├─ Users         │
│ ├─ Inspections  │     │ ├─ Inspections │    │ ├─ Mechanics     │
│ ├─ Payments     │     │ ├─ Earnings    │    │ ├─ Bookings      │
│ └─ Reviews      │     │ └─ Profile     │    │ ├─ Analytics     │
│                 │     │                │    │ └─ Settings      │
└─────────────────┘     └────────────────┘    └──────────────────┘
```

---

## 📡 API Communication Patterns

### REST API Endpoints Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      REST API v1 Endpoints                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  AUTH ENDPOINTS (/api/v1/auth)                                          │
│  ├─ POST   /login                    → All apps                         │
│  ├─ POST   /register                 → All apps                         │
│  ├─ POST   /logout                   → All apps                         │
│  ├─ POST   /refresh-token            → All apps                         │
│  └─ POST   /verify-email/:token      → All apps                         │
│                                                                         │
│  USER ENDPOINTS (/api/v1/users)                                         │
│  ├─ GET    /profile                  → All apps                         │
│  ├─ PUT    /profile                  → All apps                         │
│  ├─ DELETE /account                  → All apps                         │
│  └─ GET    /                         → Admin only (list all users)     │
│                                                                         │
│  VEHICLE ENDPOINTS (/api/v1/vehicles)                                   │
│  ├─ GET    /                         → Customer, Admin                  │
│  ├─ POST   /                         → Customer                         │
│  ├─ GET    /:id                      → Customer, Mechanic, Admin       │
│  ├─ PUT    /:id                      → Customer                         │
│  └─ DELETE /:id                      → Customer                         │
│                                                                         │
│  BOOKING ENDPOINTS (/api/v1/bookings)                                   │
│  ├─ GET    /                         → All roles                        │
│  ├─ POST   /                         → Customer                         │
│  ├─ GET    /:id                      → Customer, Mechanic, Admin       │
│  ├─ PUT    /:id/status               → Mechanic, Admin                  │
│  ├─ POST   /:id/assign-mechanic      → Admin only                       │
│  └─ DELETE /:id                      → Customer, Admin                  │
│                                                                         │
│  INSPECTION ENDPOINTS (/api/v1/inspections)                             │
│  ├─ GET    /template/:vehicleType    → Mechanic, Admin                  │
│  ├─ POST   /:bookingId/start         → Mechanic                         │
│  ├─ POST   /:bookingId/items         → Mechanic                         │
│  ├─ GET    /:bookingId/items         → Mechanic, Customer, Admin       │
│  ├─ PUT    /:bookingId/items/:itemId → Mechanic                         │
│  ├─ POST   /:bookingId/complete      → Mechanic                         │
│  ├─ GET    /:bookingId/details       → Customer, Admin                  │
│  └─ GET    /vehicle/:vehicleId/history → Customer, Admin               │
│                                                                         │
│  PAYMENT ENDPOINTS (/api/v1/payments)                                   │
│  ├─ POST   /create-order             → Customer                         │
│  ├─ POST   /verify-payment           → Customer                         │
│  ├─ GET    /history                  → Customer, Admin                  │
│  ├─ GET    /:id                      → Customer, Admin                  │
│  ├─ POST   /refund                   → Admin                            │
│  └─ POST   /payout                   → Admin                            │
│                                                                         │
│  MECHANIC ENDPOINTS (/api/v1/mechanics)                                 │
│  ├─ GET    /:id                      → Admin, Customer                  │
│  ├─ GET    /stats/:id                → Admin, Mechanic                  │
│  ├─ PUT    /kyc/:id                  → Admin                            │
│  ├─ POST   /:id/verify               → Admin                            │
│  ├─ POST   /:id/suspend              → Admin                            │
│  └─ GET    /earnings/:id             → Mechanic, Admin                  │
│                                                                         │
│  ADMIN ENDPOINTS (/api/v1/admin)                                        │
│  ├─ GET    /dashboard                → Admin                            │
│  ├─ GET    /analytics                → Admin                            │
│  ├─ GET    /audit-logs               → Admin                            │
│  └─ PUT    /settings                 → Admin                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Key User Workflows

### Workflow 1: Booking Creation & Inspection

```
Customer App                    Backend API                 Mechanic App
     │                              │                            │
     │──── POST /bookings ──────────→│                            │
     │   (vehicle_id, date, type)    │                            │
     │                          ┌─ Match available mechanics    │
     │                          │                                │
     │◄────────── Response ─────┤                                │
     │ (booking_id, price)      └─ Store in DB                  │
     │                              │                            │
     │                         ┌─ WebSocket: "booking:new"      │
     │                         │                                │
     │                         └────────────→ [Alert!] ◄────────┤
     │                              │     View & Accept/Decline  │
     │                              │           │                │
     │                              │◄──────────┘                │
     │                              │ PUT /bookings/:id/accept   │
     │                              │                            │
     │◄────────── Status Update ────┤                            │
     │ (booking:accepted)           │                            │
     │                              │──→ [Mechanic Assigned]     │
     │                              │                            │
     │                         WebSocket: "booking:in-progress"  │
     │                              │                            │
     │◄────────── Update ───────────┘                            │
     │ (mechanic_name, ETA)         │                            │
     │                              │                            │
     │                              │ GET /inspections/template  │
     │                              │◄────────────────────────────
     │                              │ (template data)            │
     │                              │                            │
     │                         ┌─ Mechanic fills inspection     │
     │                         │  POST /inspections/:id/items   │
     │                         │  PUT /inspections/:id/items/:itemId
     │                         │  POST /inspections/:id/photos  │
     │                         │                                │
     │                    ┌─ POST /inspections/:id/complete    │
     │                    │  (with all items & health score)   │
     │                    │                                     │
     │◄───────────────────┤ WebSocket: "inspection:completed"  │
     │ (Get full report)  └──────────────────→ [Mechanic OK]   │
     │                                                          │
```

### Workflow 2: Payment Processing

```
Customer App              Backend API              Razorpay API          Admin Panel
     │                        │                        │                     │
     │─ POST /payments ───────→│                        │                     │
     │ (booking_id, amount)    │                        │                     │
     │                    ┌─ Generate order           │                     │
     │                    │ order_id, amount, key     │                     │
     │◄───── Order Data ──┤                            │                     │
     │ (client_key)       └─ Create on Razorpay ─────→│                     │
     │                        │◄─── Order ID ─────────│                     │
     │                        │ (txn reference)        │                     │
     │                        │                        │                     │
     │ [Payment Gateway Opens - Customer enters card details]                │
     │                    ┌─ Webhook: payment.success │                     │
     │                    │                           │                     │
     │                ┌───┴─ Store transaction ───────│                     │
     │                │   UPDATE booking status       │                     │
     │                │   Generate invoice            │                     │
     │                │                               │                     │
     │◄─ Verify Payment ┤ Send email receipt          │                     │
     │ (success)        │ WebSocket: "payment:success"│◄────[Payment Log]───
     │                  │                             │                     │
     │                  │ Send SMS to mechanic ──→ [Notification]           │
     │                  │                                                    │
     │                  │◄─────────────────── Dashboard Refresh ────────────│
     │                  │                  (updated metrics)                │
     │                  │                                                    │
```

### Workflow 3: Admin Review & Mechanic Verification

```
Mechanic App              Backend API              Admin Panel
     │                        │                         │
     │─ Submit Profile ──────→│                         │
     │ (license, insurance,   │                         │
     │  insurance, bank)  ┌─ Store documents          │
     │                    │  in AWS S3                 │
     │                    │  Update mechanic.status =  │
     │                    │  "pending_verification"    │
     │                    │                            │
     │                    └──→ WebSocket Alert         │
     │                        │◄─────────────── [New mechanic pending] ─┐
     │                        │                         │                │
     │                        │                    Dashboard refresh     │
     │                        │                    GET /mechanics/pending│
     │                        │                         │                │
     │ [Waiting...]           │                    [Admin opens KYC form]
     │                        │                         │                │
     │                        │◄─ GET /mechanics/:id ──│
     │                        │   (load documents)      │
     │                        │                    [Admin reviews docs]  │
     │                        │                    [Approves mechanic]   │
     │                        │                         │                │
     │                        │◄─ PUT /mechanics/:id/verify ┐
     │                        │   (status: "verified")      │
     │◄────────────────────── Updated status ─────────────┘
     │ [Now verified!]         │                         │
     │                         │ Send email              │
     │ SMS: "You're verified"  │                    Log action in audit │
     │                         │                         │                │
```

---

## 🔐 Authentication & Authorization Flow

### JWT Token Lifecycle

```
LOGIN FLOW:
──────────

Customer (or Mechanic, Admin) enters credentials
         │
         ▼
Backend: POST /auth/login
├─ Validate email & password
├─ Lookup user in DB
├─ Check role & permissions
├─ Generate JWT: { userId, role, permissions, exp: +24h }
├─ Generate Refresh Token: { userId, tokenId, exp: +30d }
├─ Store refresh token in Redis/DB
└─ Return both tokens

App stores:
├─ Access Token → In-memory (recreate on app reload)
├─ Refresh Token → AsyncStorage (persistent)
└─ User Profile → Redux store


AUTHENTICATED REQUEST FLOW:
──────────────────────────

Client makes API request
├─ Include header: Authorization: Bearer <access_token>
│
▼
Backend API Middleware
├─ Extract token from header
├─ Verify signature using JWT_SECRET
├─ Check expiration
├─ If valid: attach user data to request (req.user)
├─ If expired: send 401 response
└─ Continue to route handler

Client receives 401
├─ Read refresh token from storage
├─ POST /auth/refresh-token { refresh_token }
│
▼
Backend
├─ Verify refresh token validity
├─ Generate new access token
└─ Return new access token

Client updates Authorization header
├─ Retry original request
└─ Continue normally


PERMISSION CHECKING:
───────────────────

Request reaches route handler
├─ Middleware: authorize(['admin', 'super_admin'])
├─ Check req.user.role against allowed roles
├─ If authorized: call controller
├─ If not authorized: return 403 Forbidden
└─ Continue to business logic
```

---

## 📡 WebSocket Events

### Real-Time Event Channels

```
╔════════════════════════════════════════════════════════════════╗
║                    WEBSOCKET EVENTS                           ║
╚════════════════════════════════════════════════════════════════╝

BOOKING EVENTS (emit to customers + admin):
──────────────────────────────────────────
├─ booking:created
│  └─ payload: { booking_id, vehicle, customer, date }
│
├─ booking:accepted (emit to customer)
│  └─ payload: { booking_id, mechanic_name, mechanic_phone, eta }
│
├─ booking:rejected (emit to customer)
│  └─ payload: { booking_id, reason }
│
├─ booking:in_progress (emit to customer + mechanic)
│  └─ payload: { booking_id, status, mechanic_location }
│
├─ booking:completed
│  └─ payload: { booking_id, completion_time, health_score }
│
└─ booking:cancelled
   └─ payload: { booking_id, reason, refund_initiated }


LOCATION EVENTS (private to mechanic + customer):
──────────────────────────────────────────────────
├─ mechanic:location_update
│  └─ payload: { booking_id, lat, lng, distance_to_customer }
│
└─ mechanic:eta_update
   └─ payload: { booking_id, eta_minutes }


INSPECTION EVENTS (emit to customer + admin):
──────────────────────────────────────────────
├─ inspection:started
│  └─ payload: { booking_id, mechanic_id, timestamp }
│
├─ inspection:item_added
│  └─ payload: { booking_id, item_id, category, status }
│
├─ inspection:photos_uploaded
│  └─ payload: { booking_id, photo_count, total_photos }
│
└─ inspection:completed
   └─ payload: { 
      booking_id, 
      health_score, 
      safety_score,
      recommendations_count,
      estimated_repair_cost
    }


NOTIFICATION EVENTS (to relevant user):
────────────────────────────────────────
├─ notification:new_booking
│  └─ payload: { booking_id, offer_expires_at }
│
├─ notification:message
│  └─ payload: { from_user, message, timestamp }
│
├─ notification:payment_confirmed
│  └─ payload: { booking_id, amount, transaction_id }
│
└─ notification:review_received
   └─ payload: { from_user, rating, comment }


ADMIN EVENTS (only to admin + super_admin):
────────────────────────────────────────────
├─ admin:mechanic_verification_needed
│  └─ payload: { mechanic_id, documents_count }
│
├─ admin:dispute_filed
│  └─ payload: { booking_id, complainant, reason }
│
├─ admin:high_value_transaction
│  └─ payload: { booking_id, amount }
│
└─ admin:system_alert
   └─ payload: { alert_type, severity, message }
```

---

## 🗄️ Database Schema Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                    SHARED POSTGRESQL DATABASE                   │
└──────────────────────────────────────────────────────────────────┘

users
├─ id (UUID)
├─ email, phone (UNIQUE)
├─ password_hash
├─ role (customer | mechanic | admin | super_admin)
├─ first_name, last_name
├─ profile_image_url
├─ is_verified, is_active
├─ created_at, updated_at
└─ Relationships:
   ├─ vehicles (1:N)
   ├─ bookings_as_customer (1:N)
   ├─ bookings_as_mechanic (1:N)
   ├─ reviews_received (1:N)
   └─ payments (1:N)


vehicles
├─ id (UUID)
├─ customer_id (FK → users.id)
├─ registration_number (UNIQUE)
├─ make, model, year
├─ vin (Vehicle Identification Number)
├─ vehicle_type (car | bike | truck)
├─ health_score, safety_score
├─ last_inspection_date
├─ created_at, updated_at
└─ Relationships:
   ├─ inspections (1:N)
   └─ bookings (1:N)


bookings
├─ id (UUID)
├─ booking_reference (UNIQUE)
├─ customer_id (FK → users.id)
├─ vehicle_id (FK → vehicles.id)
├─ mechanic_id (FK → users.id, nullable)
├─ inspection_type (quick | detailed | premium)
├─ status (pending | accepted | in_progress | completed | cancelled)
├─ scheduled_date, completed_date
├─ price, payment_status
├─ notes
├─ created_at, updated_at
└─ Relationships:
   ├─ inspections (1:1)
   ├─ payments (1:N)
   ├─ reviews (1:N)
   └─ notifications (1:N)


inspections
├─ id (UUID)
├─ booking_id (FK → bookings.id)
├─ vehicle_id (FK → vehicles.id)
├─ mechanic_id (FK → users.id)
├─ health_score, safety_score, performance_score
├─ status (in_progress | completed)
├─ started_at, completed_at
├─ duration_minutes
├─ created_at
└─ Relationships:
   ├─ inspection_items (1:N)
   ├─ inspection_images (1:N)
   ├─ recommendations (1:N)
   └─ health_score_history (1:N)


inspection_items
├─ id (UUID)
├─ inspection_id (FK → inspections.id)
├─ category (engine | brakes | tyres | battery | oil | lights)
├─ component_name
├─ status (good | fair | poor | not_checked)
├─ severity (low | medium | high | critical, if poor)
├─ notes
├─ created_at, updated_at
└─ Relationships:
   └─ images (1:N)


inspection_images
├─ id (UUID)
├─ inspection_item_id (FK → inspection_items.id)
├─ image_url (AWS S3)
├─ uploaded_by (mechanic_id)
├─ created_at
└─ Relationships:
   └─ Parent: inspection_item


payments
├─ id (UUID)
├─ booking_id (FK → bookings.id)
├─ customer_id (FK → users.id)
├─ amount, currency
├─ payment_method (card | wallet | bank_transfer)
├─ razorpay_payment_id, razorpay_order_id
├─ status (pending | completed | failed | refunded)
├─ transaction_details (JSON)
├─ created_at, updated_at
└─ Relationships:
   └─ Parent: booking


reviews
├─ id (UUID)
├─ booking_id (FK → bookings.id)
├─ reviewer_id (customer_id)
├─ reviewee_id (mechanic_id)
├─ rating (1-5)
├─ comment
├─ created_at
└─ Relationships:
   └─ Parents: booking, reviewer (user), reviewee (user)


notifications
├─ id (UUID)
├─ user_id (FK → users.id)
├─ booking_id (FK → bookings.id, nullable)
├─ title, message, type
├─ is_read
├─ action_url (nullable)
├─ created_at, expires_at
└─ Relationships:
   └─ user, booking (optional)


admin_audit_logs
├─ id (UUID)
├─ admin_id (FK → users.id)
├─ action (create | update | delete | suspend)
├─ resource_type (user | mechanic | booking | payment)
├─ resource_id
├─ changes (JSON - before/after)
├─ ip_address, user_agent
├─ created_at
└─ Relationships:
   └─ admin (user)
```

---

## 🚀 Deployment Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    PRODUCTION DEPLOYMENT                  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  LOAD BALANCER (AWS ELB)                                  │
│  ├─ HTTPS termination                                     │
│  ├─ Route traffic to backend instances                   │
│  └─ Health check every 30s                               │
│           │                  │                            │
│           ▼                  ▼                            │
│  ┌──────────────────────────────────────┐               │
│  │ Auto-Scaling Group (Backend API)     │               │
│  │ ├─ Min: 2 instances                  │               │
│  │ ├─ Max: 10 instances                 │               │
│  │ ├─ Node.js + Express in Docker       │               │
│  │ └─ Auto-scale on CPU > 70%           │               │
│  └──────────────────────────────────────┘               │
│           │                                              │
│           ▼                                              │
│  ┌──────────────────────────────────────┐               │
│  │  Database Layer (RDS PostgreSQL)     │               │
│  │  ├─ Multi-AZ failover                │               │
│  │  ├─ Automated backups (daily)        │               │
│  │  ├─ Read replicas for scaling        │               │
│  │  ├─ Encryption at rest               │               │
│  │  └─ Version: PostgreSQL 12+          │               │
│  └──────────────────────────────────────┘               │
│           │                                              │
│           ▼                                              │
│  ┌──────────────────────────────────────┐               │
│  │  Caching Layer (Redis)               │               │
│  │  ├─ Session storage                  │               │
│  │  ├─ Rate limit counters              │               │
│  │  ├─ Temporary data cache             │               │
│  │  └─ Multi-AZ cluster mode            │               │
│  └──────────────────────────────────────┘               │
│                                                            │
│  STATIC ASSETS & APPS                                    │
│  ├─ Admin Panel: CloudFront → S3                        │
│  ├─ Mobile Apps: App Store / Google Play                │
│  └─ CDN for images: CloudFront → S3                     │
│                                                            │
│  MONITORING & LOGGING                                    │
│  ├─ Datadog: Application performance                    │
│  ├─ CloudWatch: AWS metrics                             │
│  ├─ ELK Stack: Log aggregation                          │
│  ├─ Sentry: Error tracking                              │
│  └─ PagerDuty: On-call alerts                           │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## ✅ Integration Checklist

Before going to production, verify:

- [ ] Backend API running on production domain with HTTPS
- [ ] PostgreSQL database initialized with all migrations
- [ ] Redis cache deployed and accessible
- [ ] AWS S3 bucket configured for image uploads
- [ ] Firebase Project ID configured for push notifications
- [ ] Razorpay API keys (prod) configured
- [ ] Twilio SMS credentials configured
- [ ] SendGrid email API key configured
- [ ] JWT secret securely stored (not in code)
- [ ] Rate limiting middleware active
- [ ] CORS headers properly configured
- [ ] SSL certificates installed (Let's Encrypt)
- [ ] Admin Panel deployed and HTTPS enabled
- [ ] Mobile apps submitted to App Store & Google Play
- [ ] WebSocket server running on production
- [ ] Database backups automated
- [ ] Monitoring & alerting configured
- [ ] Audit logging enabled
- [ ] Documentation updated for runbooks

---

This interconnections guide ensures all projects work together seamlessly!
