# 🏗️ MechCheck Multi-Project Architecture

## 📊 System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         MECHCHECK ECOSYSTEM                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐ │
│  │  CUSTOMER APP    │  │  MECHANIC APP    │  │  ADMIN PANEL     │ │
│  │  (React Native)  │  │  (React Native)  │  │  (React Web)     │ │
│  │  Mobile/Tablet   │  │  Mobile/Tablet   │  │  Web Browser     │ │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘ │
│           │                     │                     │            │
│           └─────────────────────┼─────────────────────┘            │
│                                 │                                   │
│                    REST API / WebSocket                            │
│                    (JWT Authentication)                            │
│                                 │                                   │
│           ┌─────────────────────▼─────────────────────┐            │
│           │      BACKEND API SERVER                  │            │
│           │   (Node.js/Express + PostgreSQL)         │            │
│           │                                           │            │
│           │  ├─ Auth Service                         │            │
│           │  ├─ User Service                         │            │
│           │  ├─ Vehicle Service                      │            │
│           │  ├─ Booking Service                      │            │
│           │  ├─ Inspection Service                   │            │
│           │  ├─ Payment Service                      │            │
│           │  ├─ Notification Service                 │            │
│           │  └─ Review Service                       │            │
│           └─────────────────────────────────────────┘            │
│                         ▲                                          │
│                         │                                          │
│              ┌──────────┼──────────┐                              │
│              │          │          │                              │
│         ┌────▼────┐ ┌──▼────┐ ┌──▼──────┐                        │
│         │PostgreSQL│ │Cache  │ │Storage  │                        │
│         │ Database  │ │ Redis │ │ S3/CDN  │                        │
│         └──────────┘ └───────┘ └─────────┘                        │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  EXTERNAL SERVICES                                         │  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │  • Razorpay (Payments)                                     │  │
│  │  • Firebase/Twilio (Push Notifications)                    │  │
│  │  • Google Maps (Location Services)                         │  │
│  │  • Email Service (SendGrid/SMTP)                           │  │
│  │  • SMS Service (Twilio)                                    │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Project Breakdown

### 1️⃣ BACKEND API SERVER

**Purpose**: Core business logic, data management, and API endpoints

**Technology Stack**:
- Runtime: Node.js 16+
- Framework: Express.js
- Database: PostgreSQL 12+
- Cache: Redis (optional, for sessions)
- Hosting: AWS EC2 / DigitalOcean / Heroku
- Authentication: JWT + OAuth2

**Responsibilities**:
- Authentication & Authorization
- Data persistence
- Business logic
- Third-party integrations
- Payment processing
- Notification delivery
- Report generation

**Key Services**:
```
src/
├── auth/              # Authentication & JWT
├── users/             # User management
├── vehicles/          # Vehicle management
├── bookings/          # Booking management
├── inspections/       # Inspection workflow
├── payments/          # Payment processing
├── notifications/     # Notification service
├── reviews/           # Review management
├── middleware/        # Auth, validation, error handling
├── utils/             # Helpers, validators
└── config/            # Database, environment
```

---

### 2️⃣ CUSTOMER APP (Mobile)

**Purpose**: Customer-facing mobile application for booking inspections and viewing results

**Technology Stack**:
- Framework: React Native (Expo)
- State Management: Redux / Zustand
- Navigation: React Navigation
- UI Library: Native Base / React Native Paper
- API Client: Axios / React Query
- Platform: iOS + Android

**Responsibilities**:
- User authentication
- Vehicle management
- Booking creation & tracking
- Inspection result viewing
- Payment initiation
- Review submission
- Notification display
- Location-based mechanic search

**Folder Structure**:
```
customer-app/
├── src/
│   ├── screens/
│   │   ├── Auth/
│   │   ├── Home/
│   │   ├── Vehicles/
│   │   ├── Bookings/
│   │   ├── Inspections/
│   │   ├── Reviews/
│   │   └── Profile/
│   ├── components/
│   │   ├── Common/
│   │   ├── Auth/
│   │   ├── Cards/
│   │   └── Forms/
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── storage.ts
│   │   └── notifications.ts
│   ├── store/
│   │   ├── auth/
│   │   ├── vehicles/
│   │   ├── bookings/
│   │   └── inspections/
│   ├── navigation/
│   ├── utils/
│   └── App.tsx
├── app.json
└── package.json
```

---

### 3️⃣ MECHANIC APP (Mobile)

**Purpose**: Mechanic-facing mobile application for accepting bookings and conducting inspections

**Technology Stack**:
- Framework: React Native (Expo)
- State Management: Redux / Zustand
- Navigation: React Navigation
- UI Library: Native Base / React Native Paper
- Camera: React Native Camera / Expo Camera
- Location: Expo Location
- Platform: iOS + Android

**Responsibilities**:
- Mechanic authentication
- Booking acceptance/rejection
- Inspection form submission
- Image capture & upload
- Real-time location tracking (optional)
- Earnings/payment tracking
- Ratings management
- Schedule management

**Folder Structure**:
```
mechanic-app/
├── src/
│   ├── screens/
│   │   ├── Auth/
│   │   ├── Dashboard/
│   │   ├── Bookings/
│   │   ├── Inspections/
│   │   ├── Earnings/
│   │   ├── Reviews/
│   │   └── Profile/
│   ├── components/
│   │   ├── Common/
│   │   ├── InspectionForm/
│   │   ├── ImageUploader/
│   │   └── BookingCard/
│   ├── services/
│   │   ├── api.ts
│   │   ├── camera.ts
│   │   ├── location.ts
│   │   └── notifications.ts
│   ├── store/
│   │   ├── auth/
│   │   ├── bookings/
│   │   ├── inspections/
│   │   └── earnings/
│   ├── navigation/
│   ├── utils/
│   └── App.tsx
├── app.json
└── package.json
```

---

### 4️⃣ ADMIN PANEL (Web)

**Purpose**: Admin dashboard for system management, monitoring, and analytics

**Technology Stack**:
- Framework: React 18+
- UI Library: Material-UI / Chakra UI
- State Management: Redux / Zustand
- Charts: Chart.js / Recharts
- Forms: React Hook Form / Formik
- Data Tables: MUI DataGrid / React Table
- Hosting: Vercel / Netlify / AWS S3

**Responsibilities**:
- User management
- Mechanic approval/verification
- Booking oversight
- Inspection quality control
- Payment processing
- Report generation
- Analytics & monitoring
- System configuration
- Customer support
- Issue resolution

**Folder Structure**:
```
admin-panel/
├── src/
│   ├── pages/
│   │   ├── Dashboard/
│   │   ├── Users/
│   │   ├── Mechanics/
│   │   ├── Bookings/
│   │   ├── Inspections/
│   │   ├── Payments/
│   │   ├── Analytics/
│   │   ├── Support/
│   │   └── Settings/
│   ├── components/
│   │   ├── Layout/
│   │   ├── Sidebar/
│   │   ├── DataTables/
│   │   ├── Charts/
│   │   ├── Modals/
│   │   └── Forms/
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── analytics.ts
│   │   └── export.ts
│   ├── store/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── mechanics/
│   │   └── analytics/
│   ├── hooks/
│   ├── utils/
│   ├── App.tsx
│   └── index.tsx
├── public/
├── package.json
└── tsconfig.json
```

---

## 🔗 Interconnections & Data Flow

### API Contract (Backend to All Clients)

```
┌─────────────────────────────────────────┐
│       UNIFIED REST API ENDPOINTS        │
├─────────────────────────────────────────┤
│                                         │
│  /api/v1/auth                           │
│  ├─ POST   /login                       │
│  ├─ POST   /register                    │
│  ├─ POST   /logout                      │
│  ├─ POST   /refresh-token               │
│  └─ POST   /verify-email                │
│                                         │
│  /api/v1/users                          │
│  ├─ GET    /profile                     │
│  ├─ PUT    /profile                     │
│  ├─ PUT    /password                    │
│  └─ DELETE /account                     │
│                                         │
│  /api/v1/vehicles                       │
│  ├─ GET    /                            │
│  ├─ POST   /                            │
│  ├─ GET    /:id                         │
│  ├─ PUT    /:id                         │
│  └─ DELETE /:id                         │
│                                         │
│  /api/v1/bookings                       │
│  ├─ GET    /                            │
│  ├─ POST   /                            │
│  ├─ GET    /:id                         │
│  ├─ PUT    /:id/status                  │
│  └─ DELETE /:id                         │
│                                         │
│  /api/v1/inspections                    │
│  ├─ GET    /:bookingId/template         │
│  ├─ POST   /:bookingId/start            │
│  ├─ POST   /:bookingId/items            │
│  ├─ GET    /:bookingId/details          │
│  ├─ POST   /:bookingId/complete         │
│  └─ GET    /vehicle/:vehicleId/history  │
│                                         │
│  /api/v1/payments                       │
│  ├─ POST   /create-order                │
│  ├─ POST   /verify-payment              │
│  └─ GET    /history                     │
│                                         │
│  /api/v1/reviews                        │
│  ├─ POST   /                            │
│  ├─ GET    /:mechanicId                 │
│  └─ PUT    /:id                         │
│                                         │
│  /api/v1/notifications                  │
│  ├─ GET    /                            │
│  ├─ PUT    /:id/read                    │
│  └─ DELETE /:id                         │
│                                         │
└─────────────────────────────────────────┘
```

### Authentication Flow

```
CLIENT                      BACKEND
  │                           │
  ├─ POST /api/v1/auth/login ─┼──┐
  │        (credentials)       │  │ Validate
  │                            │  │ Hash check
  │                            │  │ Generate JWT
  │  ◄─ JWT Token + Refresh ─┤  │
  │     (in response)          │  │
  │                            │  │
  ├─ GET /api/v1/users/profile ┼──┐
  │    (Authorization: Bearer JWT) │ Verify JWT
  │                            │  │ Check permissions
  │  ◄─ Protected Data ────────┼──┘
  │                            │
  ├─ Token Expires ────────────┼──┐
  │                            │  │
  ├─ POST /api/v1/auth/refresh ┼──┐
  │    (refresh_token)          │  │ Issue new JWT
  │                            │  │
  │  ◄─ New JWT Token ─────────┼──┘
  │                            │
```

### Data Flow: Booking to Inspection

```
CUSTOMER APP              BACKEND              DATABASE
    │                        │                    │
    ├─ Create Booking ───────┼─────────────┐      │
    │                        │             │ Create
    │                        │             │ Booking
    │  ◄─ Booking Created ───┼──────────────┤     │
    │                        │             └─────▶│
    │                        │                    │
    │ [Customer waits]       │                    │
    │                        │                    │
    │                  MECHANIC APP               │
    │                        │                    │
    │                    ◀───┼─ New Booking      │
    │                        │                    │
    │                    ├─ Accept/Reject        │
    │  ◄─ Status Updated ─┤  │                    │
    │                        │  Update Booking ───▶│
    │                        │                    │
    │ [Mechanic inspects] ───┼──────────────┐     │
    │                        │              │     │
    │  ◄─ Inspection Data ───┼──────────────┤     │
    │                        │              │     │
    │                        │              Create │
    │                        │              Report│
    │                        │              └─────▶│
    │                        │                    │
    ├─ View Report ────────────┼────────────┐    │
    │                        │             │     │
    │  ◄─ Report + Health ───┼─────────────┤     │
    │     Score              │             └──┬──│
    │                        │                │  │
    │                 ADMIN PANEL             │  │
    │                        │                │  │
    │                    ◀───┼─ Alert        │  │
    │                        │ (if issues)   │  │
    │                        │                │  │
    │                        └─────────────────▶│
```

---

## 🔐 Role-Based Access Control (RBAC)

### Roles & Permissions Matrix

```
ROLE          | LOGIN | VIEW_PROFILE | BOOK_SERVICE | CONDUCT_INSPECTION | APPROVE_MECHANICS | VIEW_ANALYTICS |
──────────────┼───────┼──────────────┼──────────────┼────────────────────┼──────────────────┼────────────────┤
Customer      |   ✓   |      ✓       |      ✓       |         ✗          |        ✗         |       ✗        │
Mechanic      |   ✓   |      ✓       |      ✗       |         ✓          |        ✗         |       ✗        │
Admin         |   ✓   |      ✓       |      ✗       |         ✗          |        ✓         |       ✓        │
Super Admin   |   ✓   |      ✓       |      ✗       |         ✗          |        ✓         |       ✓        │
```

### Middleware Protection

```javascript
// Backend Express Middleware Stack
app.post('/api/v1/bookings', 
  authenticate(),           // Verify JWT
  authorize('customer'),    // Check role
  validate(bookingSchema),  // Validate input
  rateLimiter(),           // Prevent abuse
  createBooking            // Controller
);
```

---

## 📱 Platform-Specific Features

### CUSTOMER APP (Mobile)
- ✅ One-click booking
- ✅ Real-time booking status
- ✅ Inspection report viewing
- ✅ Payment history
- ✅ Review submission
- ✅ Push notifications
- ✅ Vehicle management
- ✅ Favorite mechanics

### MECHANIC APP (Mobile)
- ✅ Real-time booking alerts
- ✅ Booking acceptance/rejection
- ✅ Navigation to customer location
- ✅ Inspection form with images
- ✅ Earnings dashboard
- ✅ Rating tracking
- ✅ Schedule management
- ✅ Income analytics

### ADMIN PANEL (Web)
- ✅ User management dashboard
- ✅ Mechanic verification
- ✅ Booking oversight
- ✅ Inspection quality review
- ✅ Payment reconciliation
- ✅ Advanced analytics & reporting
- ✅ System health monitoring
- ✅ Customer support tools

---

## 🚀 Deployment Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                  PRODUCTION DEPLOYMENT                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  FRONTEND LAYER (CDN)                                        │
│  ├─ Customer App  → Apple App Store / Google Play Store     │
│  ├─ Mechanic App  → Apple App Store / Google Play Store     │
│  └─ Admin Panel   → Vercel / Netlify (vercel.com)           │
│                                                              │
│  API GATEWAY (Load Balancer)                                │
│  └─ AWS ELB / Nginx Reverse Proxy                           │
│                                                              │
│  APPLICATION LAYER (Containers)                             │
│  └─ Docker Containers (Kubernetes / Docker Swarm)           │
│     ├─ API Server Pod 1                                     │
│     ├─ API Server Pod 2                                     │
│     ├─ API Server Pod 3                                     │
│     ├─ Notification Service Pod                             │
│     └─ Payment Processing Pod                               │
│                                                              │
│  PERSISTENCE LAYER                                          │
│  ├─ Primary DB: PostgreSQL (AWS RDS)                        │
│  ├─ Read Replicas: PostgreSQL Standby                       │
│  ├─ Cache: Redis Cluster                                    │
│  └─ Files: S3 / CloudFront                                  │
│                                                              │
│  MONITORING & LOGGING                                       │
│  ├─ Datadog / New Relic                                     │
│  ├─ CloudWatch / ELK Stack                                  │
│  └─ Sentry Error Tracking                                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 📊 Database Schema (Unified)

```
USERS TABLE
├─ id (PK)
├─ email (UNIQUE)
├─ phone (UNIQUE)
├─ password_hash
├─ role (customer | mechanic | admin)
├─ first_name
├─ last_name
├─ profile_image_url
├─ is_active
├─ created_at
└─ updated_at

VEHICLES TABLE
├─ id (PK)
├─ user_id (FK → Users)
├─ vehicle_type (car | bike)
├─ brand
├─ model
├─ year
├─ registration_number (UNIQUE)
├─ vin
├─ color
├─ fuel_type
├─ health_score
├─ last_inspection_date
└─ created_at

BOOKINGS TABLE
├─ id (PK)
├─ vehicle_id (FK → Vehicles)
├─ customer_id (FK → Users)
├─ mechanic_id (FK → Users, nullable)
├─ inspection_type (quick | detailed | premium)
├─ status (pending | accepted | in-progress | completed | cancelled)
├─ booking_reference
├─ created_at
├─ completed_at
└─ updated_at

INSPECTIONS TABLE
├─ id (PK)
├─ booking_id (FK → Bookings)
├─ health_score
├─ safety_score
├─ performance_score
├─ overall_condition
├─ maintenance_urgency
├─ estimated_repair_cost
├─ notes
├─ created_at
└─ updated_at

PAYMENTS TABLE
├─ id (PK)
├─ booking_id (FK → Bookings)
├─ amount
├─ currency
├─ status (pending | completed | failed)
├─ razorpay_order_id
├─ razorpay_payment_id
├─ created_at
└─ updated_at

REVIEWS TABLE
├─ id (PK)
├─ booking_id (FK → Bookings)
├─ customer_id (FK → Users)
├─ mechanic_id (FK → Users)
├─ rating (1-5)
├─ comment
├─ created_at
└─ updated_at
```

---

## 🔄 API Communication Patterns

### Request/Response Format

```javascript
// REQUEST
{
  "method": "POST",
  "url": "/api/v1/bookings",
  "headers": {
    "Authorization": "Bearer JWT_TOKEN",
    "Content-Type": "application/json",
    "X-Client-Version": "1.0.0",
    "X-Platform": "iOS|Android|Web"
  },
  "body": {
    "vehicle_id": 123,
    "inspection_type": "detailed",
    "notes": "Engine sounds weird"
  }
}

// RESPONSE (Success)
{
  "success": true,
  "status": 201,
  "data": {
    "id": 456,
    "booking_reference": "BK-20240703-001",
    "status": "pending",
    "created_at": "2024-07-03T10:30:00Z"
  },
  "message": "Booking created successfully"
}

// RESPONSE (Error)
{
  "success": false,
  "status": 400,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Vehicle ID is required",
    "details": {
      "field": "vehicle_id",
      "reason": "Missing required field"
    }
  }
}
```

---

## 🔌 WebSocket Events (Real-time)

```javascript
// Booking Status Updates
io.emit('booking:created', { bookingId, customerId, details })
io.emit('booking:accepted', { bookingId, mechanicId })
io.emit('booking:in-progress', { bookingId })
io.emit('booking:completed', { bookingId, inspectionId })

// Mechanic Location (Real-time)
io.emit('mechanic:location-updated', { mechanicId, lat, lng })

// Notification Events
io.emit('notification:new', { userId, message, type })
io.emit('notification:read', { notificationId })

// Chat Messages (Optional)
io.emit('message:new', { senderId, receiverId, message, timestamp })
```

---

## 🛠️ Development Workflow

### Local Development Setup

```bash
# Backend
git clone <backend-repo>
cd meckcheck-backend
npm install
cp .env.example .env
npm run dev

# Customer App
git clone <customer-app-repo>
cd customer-app
npm install
expo start

# Mechanic App
git clone <mechanic-app-repo>
cd mechanic-app
npm install
expo start

# Admin Panel
git clone <admin-panel-repo>
cd admin-panel
npm install
npm start
```

### CI/CD Pipeline

```
Git Push
    │
    ▼
GitHub Actions
    │
    ├─ Run Tests
    ├─ Lint Code
    ├─ Build Project
    │
    ▼
Code Review (PR)
    │
    ├─ Approval Required
    │
    ▼
Merge to Main
    │
    ├─ Build Docker Image
    ├─ Push to Registry
    │
    ▼
Deploy to Staging
    │
    ├─ Run Integration Tests
    │
    ▼
Deploy to Production
    │
    ├─ Blue-Green Deployment
    ├─ Health Checks
    │
    ▼
Monitor & Alert
```

---

## 📋 Environment Configuration

### Backend (.env)

```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/mechcheck
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY=24h
REFRESH_TOKEN_EXPIRY=7d

# Payments
RAZORPAY_KEY_ID=xxx
RAZORPAY_KEY_SECRET=xxx

# AWS
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_S3_BUCKET=mechcheck-bucket
AWS_REGION=ap-south-1

# Third-party Services
FIREBASE_PROJECT_ID=xxx
SENDGRID_API_KEY=xxx
TWILIO_ACCOUNT_SID=xxx
```

### Mobile Apps (.env / config)

```env
# API
API_BASE_URL=https://api.mechcheck.com
API_VERSION=v1

# Firebase
FIREBASE_API_KEY=xxx
FIREBASE_PROJECT_ID=xxx

# Google Maps
GOOGLE_MAPS_API_KEY=xxx

# Razorpay
RAZORPAY_KEY_ID=xxx
```

### Admin Panel (.env)

```env
# API
REACT_APP_API_BASE_URL=https://api.mechcheck.com
REACT_APP_API_VERSION=v1

# Analytics
REACT_APP_GOOGLE_ANALYTICS_ID=xxx

# Sentry
REACT_APP_SENTRY_DSN=xxx
```

---

## 🎯 Success Metrics

### Backend
- ✅ API Response Time < 200ms (p95)
- ✅ Uptime: 99.9%
- ✅ Error Rate < 0.1%
- ✅ Database Query Time < 100ms

### Customer App
- ✅ App Load Time < 3s
- ✅ Crash Rate < 0.01%
- ✅ User Retention > 70%
- ✅ App Rating > 4.5/5

### Mechanic App
- ✅ Booking Acceptance Rate > 60%
- ✅ Inspection Completion Rate > 95%
- ✅ Mechanic Retention > 80%
- ✅ Quality Rating > 4.2/5

### Admin Panel
- ✅ Dashboard Load < 2s
- ✅ Report Generation < 30s
- ✅ Data Accuracy: 100%
- ✅ Admin Support Response < 1hr

---

## 📞 Support & Documentation

Each project should have:
- ✅ README.md with setup instructions
- ✅ ARCHITECTURE.md with component details
- ✅ API_DOCUMENTATION.md (Backend)
- ✅ CONTRIBUTING.md with dev guidelines
- ✅ DEPLOYMENT.md with production steps
- ✅ TROUBLESHOOTING.md with common issues

---

**This architecture ensures:**
- ✅ **Scalability** - Each service independently scalable
- ✅ **Maintainability** - Clear separation of concerns
- ✅ **Reliability** - Redundancy and failover
- ✅ **Security** - Role-based access control
- ✅ **Performance** - Optimized for each platform
- ✅ **Flexibility** - Easy to add/modify features
