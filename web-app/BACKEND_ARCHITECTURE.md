# 🏢 Backend API Server - Architecture & Implementation

## 📋 Project Structure

```
meckcheck-backend/
├── src/
│   ├── app.js                          # Express app setup
│   ├── server.js                       # Server entry point
│   │
│   ├── config/
│   │   ├── database.js                 # PostgreSQL connection
│   │   ├── redis.js                    # Redis cache (optional)
│   │   ├── aws.js                      # AWS S3 config
│   │   ├── payment.js                  # Razorpay config
│   │   └── environment.js              # Env variables
│   │
│   ├── middleware/
│   │   ├── authentication.js           # JWT verification
│   │   ├── authorization.js            # Role-based access
│   │   ├── validation.js               # Input validation
│   │   ├── errorHandler.js             # Global error handling
│   │   ├── logger.js                   # Request logging
│   │   ├── rateLimiter.js              # Rate limiting
│   │   └── cors.js                     # CORS configuration
│   │
│   ├── routes/
│   │   ├── index.js                    # Main router
│   │   ├── auth.js                     # Authentication routes
│   │   ├── users.js                    # User management routes
│   │   ├── vehicles.js                 # Vehicle routes
│   │   ├── bookings.js                 # Booking routes
│   │   ├── inspections.js              # Inspection routes
│   │   ├── payments.js                 # Payment routes
│   │   ├── reviews.js                  # Review routes
│   │   └── notifications.js            # Notification routes
│   │
│   ├── controllers/
│   │   ├── authController.js           # Auth logic
│   │   ├── userController.js           # User logic
│   │   ├── vehicleController.js        # Vehicle logic
│   │   ├── bookingController.js        # Booking logic
│   │   ├── inspectionController.js     # Inspection logic
│   │   ├── paymentController.js        # Payment logic
│   │   ├── reviewController.js         # Review logic
│   │   └── notificationController.js   # Notification logic
│   │
│   ├── services/
│   │   ├── authService.js              # Auth business logic
│   │   ├── userService.js              # User management
│   │   ├── vehicleService.js           # Vehicle management
│   │   ├── bookingService.js           # Booking management
│   │   ├── inspectionService.js        # Inspection logic
│   │   ├── paymentService.js           # Payment processing
│   │   ├── reviewService.js            # Review management
│   │   ├── notificationService.js      # Notification delivery
│   │   ├── emailService.js             # Email sending
│   │   ├── smsService.js               # SMS sending
│   │   └── locationService.js          # Geolocation helpers
│   │
│   ├── models/
│   │   ├── User.js                     # User model
│   │   ├── Vehicle.js                  # Vehicle model
│   │   ├── Booking.js                  # Booking model
│   │   ├── Inspection.js               # Inspection model
│   │   ├── Payment.js                  # Payment model
│   │   ├── Review.js                   # Review model
│   │   └── Notification.js             # Notification model
│   │
│   ├── utils/
│   │   ├── validators.js               # Input validators
│   │   ├── formatters.js               # Response formatters
│   │   ├── helpers.js                  # Helper functions
│   │   ├── jwt.js                      # JWT utilities
│   │   ├── encryption.js               # Password hashing
│   │   ├── errorClasses.js             # Custom error classes
│   │   ├── constants.js                # App constants
│   │   └── logger.js                   # Logging utility
│   │
│   ├── db/
│   │   ├── migrations/                 # Database migrations
│   │   ├── seeds/                      # Seed data
│   │   └── queries/                    # Stored procedures (optional)
│   │
│   ├── events/
│   │   ├── emitter.js                  # Event emitter setup
│   │   ├── bookingEvents.js            # Booking events
│   │   ├── inspectionEvents.js         # Inspection events
│   │   └── paymentEvents.js            # Payment events
│   │
│   └── websocket/
│       ├── socket.js                   # Socket.io setup
│       ├── handlers/
│       │   ├── bookingHandler.js       # Real-time booking updates
│       │   ├── notificationHandler.js  # Real-time notifications
│       │   ├── locationHandler.js      # Real-time location
│       │   └── chatHandler.js          # Real-time chat (optional)
│       └── middlewares/
│           └── socketAuth.js           # Socket authentication
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── mocks/
│
├── migrations/
│   ├── 001_create_tables.sql
│   ├── 002_add_indexes.sql
│   └── 003_add_constraints.sql
│
├── docs/
│   ├── API.md                          # API documentation
│   ├── DATABASE.md                     # Database schema
│   └── DEPLOYMENT.md                   # Deployment guide
│
├── .env.example
├── .env.production
├── Dockerfile
├── docker-compose.yml
├── package.json
├── jest.config.js
├── .eslintrc.js
└── README.md
```

---

## 🔗 API Routes & Endpoints

### Auth Routes

```javascript
// routes/auth.js
router.post('/login', validateInput(loginSchema), authController.login);
router.post('/register', validateInput(registerSchema), authController.register);
router.post('/logout', authenticate(), authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.post('/verify-email/:token', authController.verifyEmail);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
```

### User Routes

```javascript
// routes/users.js
router.get('/profile', authenticate(), userController.getProfile);
router.put('/profile', authenticate(), validateInput(profileSchema), userController.updateProfile);
router.put('/password', authenticate(), validateInput(passwordSchema), userController.changePassword);
router.put('/avatar', authenticate(), upload.single('avatar'), userController.updateAvatar);
router.delete('/account', authenticate(), userController.deleteAccount);
```

### Vehicle Routes

```javascript
// routes/vehicles.js
router.get('/', authenticate(), vehicleController.getVehicles);
router.post('/', authenticate(), validateInput(vehicleSchema), vehicleController.createVehicle);
router.get('/:id', authenticate(), vehicleController.getVehicle);
router.put('/:id', authenticate(), validateInput(vehicleSchema), vehicleController.updateVehicle);
router.delete('/:id', authenticate(), vehicleController.deleteVehicle);
```

### Booking Routes

```javascript
// routes/bookings.js
router.get('/', authenticate(), bookingController.getBookings);
router.post('/', authenticate(), validateInput(bookingSchema), bookingController.createBooking);
router.get('/:id', authenticate(), bookingController.getBooking);
router.put('/:id/status', authenticate(), bookingController.updateStatus);
router.post('/:id/assign-mechanic', authenticate(), authorize('admin'), bookingController.assignMechanic);
router.delete('/:id', authenticate(), bookingController.cancelBooking);
```

### Inspection Routes

```javascript
// routes/inspections.js
router.get('/template/:vehicleType', authenticate(), inspectionController.getTemplate);
router.post('/:bookingId/start', authenticate(), inspectionController.startInspection);
router.post('/:bookingId/items', authenticate(), inspectionController.addItem);
router.get('/:bookingId/items', authenticate(), inspectionController.getItems);
router.put('/:bookingId/items/:itemId', authenticate(), inspectionController.updateItem);
router.get('/:bookingId/details', authenticate(), inspectionController.getDetails);
router.post('/:bookingId/complete', authenticate(), inspectionController.completeInspection);
router.get('/vehicle/:vehicleId/history', authenticate(), inspectionController.getHistory);
```

### Payment Routes

```javascript
// routes/payments.js
router.post('/create-order', authenticate(), paymentController.createOrder);
router.post('/verify-payment', authenticate(), paymentController.verifyPayment);
router.get('/history', authenticate(), paymentController.getPaymentHistory);
router.get('/:paymentId', authenticate(), paymentController.getPayment);
```

### Review Routes

```javascript
// routes/reviews.js
router.post('/', authenticate(), validateInput(reviewSchema), reviewController.createReview);
router.get('/mechanic/:mechanicId', reviewController.getMechanicReviews);
router.put('/:id', authenticate(), reviewController.updateReview);
router.delete('/:id', authenticate(), reviewController.deleteReview);
```

---

## 🔐 Authentication & Authorization

### JWT Strategy

```javascript
// middleware/authentication.js
const authenticate = () => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};
```

### Role-Based Access Control

```javascript
// middleware/authorization.js
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

// Usage
router.post('/approve-mechanic', 
  authenticate(), 
  authorize('admin', 'super_admin'),
  adminController.approveMechanic
);
```

---

## 💾 Database Models

### User Model

```javascript
// models/User.js
const userSchema = {
  id: 'UUID PRIMARY KEY',
  email: 'VARCHAR UNIQUE NOT NULL',
  phone: 'VARCHAR UNIQUE NOT NULL',
  password_hash: 'VARCHAR NOT NULL',
  role: "ENUM('customer', 'mechanic', 'admin') DEFAULT 'customer'",
  first_name: 'VARCHAR NOT NULL',
  last_name: 'VARCHAR NOT NULL',
  profile_image_url: 'VARCHAR',
  bio: 'TEXT',
  rating: 'DECIMAL(3,2) DEFAULT 0',
  total_reviews: 'INTEGER DEFAULT 0',
  is_verified: 'BOOLEAN DEFAULT FALSE',
  is_active: 'BOOLEAN DEFAULT TRUE',
  last_login: 'TIMESTAMP',
  created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
  updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
};
```

### Booking Model

```javascript
// models/Booking.js
const bookingSchema = {
  id: 'UUID PRIMARY KEY',
  booking_reference: 'VARCHAR UNIQUE NOT NULL',
  customer_id: 'UUID NOT NULL REFERENCES users(id)',
  vehicle_id: 'UUID NOT NULL REFERENCES vehicles(id)',
  mechanic_id: 'UUID REFERENCES users(id)',
  inspection_type: "ENUM('quick', 'detailed', 'premium') DEFAULT 'quick'",
  status: "ENUM('pending', 'accepted', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending'",
  scheduled_date: 'TIMESTAMP',
  completed_date: 'TIMESTAMP',
  notes: 'TEXT',
  price: 'DECIMAL(10,2)',
  created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
  updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
};
```

---

## 📨 Service Integration

### Email Service

```javascript
// services/emailService.js
class EmailService {
  async sendBookingConfirmation(booking) {
    // Send to customer
    await sendEmail({
      to: booking.customer_email,
      subject: 'Booking Confirmed',
      template: 'bookingConfirmation',
      data: booking
    });
  }

  async sendInspectionReport(inspection) {
    // Send report to customer
    await sendEmail({
      to: inspection.customer_email,
      subject: 'Your Vehicle Inspection Report',
      template: 'inspectionReport',
      data: inspection,
      attachments: [inspection.report_pdf]
    });
  }
}
```

### SMS Service

```javascript
// services/smsService.js
class SMSService {
  async sendBookingAlert(booking) {
    // Send to mechanic
    await sendSMS({
      phone: booking.mechanic_phone,
      message: `New booking: ${booking.booking_reference}. Tap to view details.`
    });
  }

  async sendOTP(phone) {
    const otp = generateOTP();
    await sendSMS({
      phone,
      message: `Your MechCheck verification code is: ${otp}`
    });
    return otp;
  }
}
```

### Push Notification Service

```javascript
// services/notificationService.js
class NotificationService {
  async sendPushNotification(userId, payload) {
    const tokens = await getUserFCMTokens(userId);
    
    await admin.messaging().sendMulticast({
      tokens,
      notification: {
        title: payload.title,
        body: payload.message,
      },
      data: payload.data,
    });
  }
}
```

---

## 🎯 Controller Example

```javascript
// controllers/bookingController.js
class BookingController {
  async createBooking(req, res, next) {
    try {
      const { vehicle_id, inspection_type } = req.body;
      const customer_id = req.user.id;

      // Validate vehicle ownership
      const vehicle = await vehicleService.getVehicle(vehicle_id);
      if (vehicle.customer_id !== customer_id) {
        throw new UnauthorizedError('Vehicle not found');
      }

      // Create booking
      const booking = await bookingService.createBooking({
        customer_id,
        vehicle_id,
        inspection_type,
      });

      // Send notification
      await notificationService.notifyAvailableMechanics(booking);

      // Emit event
      eventEmitter.emit('booking:created', booking);

      res.status(201).json({
        success: true,
        data: booking,
        message: 'Booking created successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const booking = await bookingService.updateStatus(id, status);

      // Notify relevant parties
      await notificationService.notifyBookingStatusChange(booking);

      // Emit real-time event
      ioSocket.to(`booking:${id}`).emit('booking:status-updated', booking);

      res.json({
        success: true,
        data: booking,
        message: 'Booking status updated'
      });
    } catch (error) {
      next(error);
    }
  }
}
```

---

## 🧪 Testing Strategy

### Unit Tests

```javascript
// tests/unit/services/bookingService.test.js
describe('BookingService', () => {
  describe('createBooking', () => {
    it('should create a booking successfully', async () => {
      const bookingData = {
        customer_id: 'user123',
        vehicle_id: 'vehicle456',
        inspection_type: 'detailed'
      };

      const result = await bookingService.createBooking(bookingData);

      expect(result).toHaveProperty('id');
      expect(result.status).toBe('pending');
    });
  });
});
```

### Integration Tests

```javascript
// tests/integration/bookings.test.js
describe('Booking API Integration', () => {
  it('should create booking and send notification', async () => {
    const response = await request(app)
      .post('/api/v1/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send(bookingData);

    expect(response.status).toBe(201);
    expect(notificationService.sendNotification).toHaveBeenCalled();
  });
});
```

---

## 🚀 Deployment

### Docker Setup

```dockerfile
# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY src/ ./src/
COPY db/ ./db/

EXPOSE 3000

CMD ["npm", "start"]
```

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:pass@db:5432/mechcheck
DATABASE_MAX_POOL_SIZE=20

# Redis (optional caching)
REDIS_URL=redis://cache:6379

# JWT
JWT_SECRET=your_secret_here
JWT_EXPIRY=24h

# External Services
RAZORPAY_KEY_ID=xxx
RAZORPAY_KEY_SECRET=xxx
SENDGRID_API_KEY=xxx
TWILIO_ACCOUNT_SID=xxx
FIREBASE_PROJECT_ID=xxx

# AWS
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_S3_BUCKET=mechcheck-uploads

# Environment
NODE_ENV=production
PORT=3000
LOG_LEVEL=info
```

---

## 📊 Performance Monitoring

### Key Metrics

- API Response Time (p50, p95, p99)
- Database Query Performance
- Error Rates by Endpoint
- Active Connections
- Memory & CPU Usage
- Third-party Service Latency

### Monitoring Tools

- **Datadog** or **New Relic** for APM
- **CloudWatch** or **ELK Stack** for logging
- **Sentry** for error tracking
- **PagerDuty** for alerts

---

This backend architecture ensures:
✅ **Scalability** - Microservices-ready structure
✅ **Maintainability** - Clear separation of concerns
✅ **Security** - JWT + Role-based access
✅ **Reliability** - Error handling and validation
✅ **Performance** - Optimized queries and caching
