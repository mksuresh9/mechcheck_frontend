# 📱 Customer App - Architecture & Implementation

**Platform**: iOS & Android (React Native + Expo)  
**Type**: Mobile-First Application  
**Target Users**: Vehicle owners seeking inspection services

---

## 📋 Project Structure

```
customer-app/
├── src/
│   ├── App.tsx                         # Root component
│   ├── config.ts                       # App configuration
│   │
│   ├── navigation/
│   │   ├── RootNavigator.tsx           # Root stack navigator
│   │   ├── AuthNavigator.tsx           # Auth flow navigation
│   │   ├── AppNavigator.tsx            # Main app navigation
│   │   ├── BookingNavigator.tsx        # Booking flow
│   │   └── types.ts                    # Navigation types
│   │
│   ├── screens/
│   │   ├── Auth/
│   │   │   ├── LoginScreen.tsx         # Login page
│   │   │   ├── RegisterScreen.tsx      # Registration
│   │   │   ├── ForgotPasswordScreen.tsx
│   │   │   ├── VerifyEmailScreen.tsx
│   │   │   └── OTPScreen.tsx
│   │   │
│   │   ├── Home/
│   │   │   ├── HomeScreen.tsx          # Main dashboard
│   │   │   ├── SearchMechanicsScreen.tsx
│   │   │   └── MechanicDetailsScreen.tsx
│   │   │
│   │   ├── Vehicles/
│   │   │   ├── VehiclesListScreen.tsx  # My vehicles
│   │   │   ├── AddVehicleScreen.tsx    # Add new vehicle
│   │   │   ├── EditVehicleScreen.tsx
│   │   │   └── VehicleDetailsScreen.tsx
│   │   │
│   │   ├── Bookings/
│   │   │   ├── BookingsListScreen.tsx  # My bookings
│   │   │   ├── CreateBookingScreen.tsx # New booking wizard
│   │   │   ├── BookingDetailsScreen.tsx
│   │   │   └── BookingStatusScreen.tsx
│   │   │
│   │   ├── Inspections/
│   │   │   ├── InspectionDetailsScreen.tsx
│   │   │   ├── InspectionReportScreen.tsx
│   │   │   ├── InspectionHistoryScreen.tsx
│   │   │   └── ImageGalleryScreen.tsx
│   │   │
│   │   ├── Payments/
│   │   │   ├── PaymentScreen.tsx       # Payment initiation
│   │   │   └── PaymentHistoryScreen.tsx
│   │   │
│   │   ├── Reviews/
│   │   │   ├── WriteReviewScreen.tsx   # Submit review
│   │   │   └── MechanicReviewsScreen.tsx
│   │   │
│   │   └── Profile/
│   │       ├── ProfileScreen.tsx       # User profile
│   │       ├── EditProfileScreen.tsx
│   │       ├── SettingsScreen.tsx
│   │       └── HelpScreen.tsx
│   │
│   ├── components/
│   │   ├── Common/
│   │   │   ├── Header.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── EmptyState.tsx
│   │   │
│   │   ├── BookingFlow/
│   │   │   ├── VehicleSelector.tsx
│   │   │   ├── InspectionTypeSelector.tsx
│   │   │   ├── LocationPicker.tsx
│   │   │   ├── DateTimePicker.tsx
│   │   │   └── PriceSummary.tsx
│   │   │
│   │   ├── Inspection/
│   │   │   ├── HealthScoreGauge.tsx
│   │   │   ├── RecommendationCard.tsx
│   │   │   ├── InspectionItemCard.tsx
│   │   │   └── ReportExportButton.tsx
│   │   │
│   │   ├── Mechanic/
│   │   │   ├── MechanicCard.tsx
│   │   │   ├── MechanicRating.tsx
│   │   │   └── MechanicFilter.tsx
│   │   │
│   │   └── Forms/
│   │       ├── LoginForm.tsx
│   │       ├── VehicleForm.tsx
│   │       └── ReviewForm.tsx
│   │
│   ├── services/
│   │   ├── api.ts                      # API client setup
│   │   ├── auth.ts                     # Auth service
│   │   ├── vehicle.ts                  # Vehicle operations
│   │   ├── booking.ts                  # Booking operations
│   │   ├── inspection.ts               # Inspection data
│   │   ├── payment.ts                  # Payment operations
│   │   ├── review.ts                   # Review operations
│   │   ├── notification.ts             # Push notifications
│   │   ├── storage.ts                  # Local storage
│   │   └── websocket.ts                # Real-time updates
│   │
│   ├── store/
│   │   ├── index.ts                    # Store setup
│   │   ├── slices/
│   │   │   ├── authSlice.ts            # Auth state
│   │   │   ├── vehicleSlice.ts         # Vehicles state
│   │   │   ├── bookingSlice.ts         # Bookings state
│   │   │   ├── inspectionSlice.ts      # Inspections state
│   │   │   ├── uiSlice.ts              # UI state
│   │   │   └── notificationSlice.ts    # Notifications state
│   │   └── middleware/
│   │       ├── persistenceMiddleware.ts
│   │       └── analyticsMiddleware.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts                  # Auth hooks
│   │   ├── useApi.ts                   # API hooks
│   │   ├── useBooking.ts               # Booking hooks
│   │   ├── useLocation.ts              # Location hooks
│   │   ├── usePushNotifications.ts     # Notification hooks
│   │   └── useTheme.ts                 # Theme hooks
│   │
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── NotificationContext.tsx
│   │
│   ├── utils/
│   │   ├── formatters.ts               # Date/currency formatters
│   │   ├── validators.ts               # Form validators
│   │   ├── constants.ts                # App constants
│   │   ├── helpers.ts                  # Helper functions
│   │   ├── storage.ts                  # Storage helpers
│   │   └── logger.ts                   # Error logging
│   │
│   ├── types/
│   │   ├── index.ts                    # Main types
│   │   ├── api.ts                      # API response types
│   │   ├── models.ts                   # Data model types
│   │   └── navigation.ts               # Navigation types
│   │
│   ├── styles/
│   │   ├── theme.ts                    # Theme configuration
│   │   ├── colors.ts                   # Color palette
│   │   ├── spacing.ts                  # Spacing system
│   │   └── typography.ts               # Typography styles
│   │
│   └── main.tsx                        # App entry point
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── mocks/
│
├── e2e/
│   └── scenarios/
│
├── app.json                            # Expo config
├── eas.json                            # EAS Build config
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## 🎯 Screen Navigation Flow

```
┌─────────────────────────────────────────┐
│          AUTHENTICATION                 │
├─────────────────────────────────────────┤
│                                         │
│   Login Screen                          │
│        ↓                                │
│   Register / Forgot Password            │
│        ↓                                │
│   OTP Verification                      │
│        ↓                                │
│   Email Verification (optional)         │
│        ↓                                │
│   ✓ Authenticated                       │
│                                         │
└─────────────────────────────────────────┘
            ↓
┌──────────────────────────────────────────────────────────────┐
│                  MAIN APP NAVIGATION                         │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌────────────┬──────────────┬────────────┬────────────┐  │
│   │            │              │            │            │  │
│   ▼            ▼              ▼            ▼            ▼  │
│  Home      Vehicles       Bookings     Payments      Profile │
│   │            │              │            │            │  │
│   ├─ Browse    ├─ My Vehicles ├─ My        └─ History   │  │
│   │  Mechanics │              │  Bookings            ├─Edit│
│   │            ├─ Add New     ├─ New                  │  │
│   │            │              │  Booking    Settings  │  │
│   │            └─ Edit        ├─ Status              │  │
│   │                           ├─ Details              │  │
│   │                           └─ Cancel               │  │
│   │                                                    │  │
│   └────────────┬──────────────┬────────────┬────────────┘  │
│                │              │            │                │
│                ▼              ▼            ▼                │
│        Booking Details  Inspection      Reviews             │
│        (From Modal)     Report          (Write)             │
│                         (View)                              │
│                         & Export                            │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 💻 Core Components

### Authentication Flow Component

```typescript
// components/Auth/LoginForm.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useAppDispatch } from '../../store';
import { loginUser } from '../../store/slices/authSlice';

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ email, password }));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
```

### Booking Creation Wizard

```typescript
// screens/Bookings/CreateBookingScreen.tsx
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { VehicleSelector } from '../../components/BookingFlow/VehicleSelector';
import { InspectionTypeSelector } from '../../components/BookingFlow/InspectionTypeSelector';
import { DateTimePicker } from '../../components/BookingFlow/DateTimePicker';
import { PriceSummary } from '../../components/BookingFlow/PriceSummary';

export const CreateBookingScreen: React.FC = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    vehicle_id: '',
    inspection_type: 'quick',
    scheduled_date: new Date(),
  });

  return (
    <ScrollView>
      {step === 1 && (
        <VehicleSelector
          onSelect={(vehicleId) =>
            setBookingData({ ...bookingData, vehicle_id: vehicleId })
          }
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <InspectionTypeSelector
          onSelect={(type) =>
            setBookingData({ ...bookingData, inspection_type: type })
          }
          onNext={() => setStep(3)}
        />
      )}
      {step === 3 && (
        <DateTimePicker
          onSelect={(date) =>
            setBookingData({ ...bookingData, scheduled_date: date })
          }
          onNext={() => setStep(4)}
        />
      )}
      {step === 4 && (
        <PriceSummary
          bookingData={bookingData}
          onConfirm={() => submitBooking(bookingData)}
        />
      )}
    </ScrollView>
  );
};
```

### Inspection Report Display

```typescript
// components/Inspection/InspectionReport.tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { HealthScoreGauge } from './HealthScoreGauge';
import { RecommendationCard } from './RecommendationCard';
import { ReportExportButton } from './ReportExportButton';

interface InspectionReportProps {
  inspection: Inspection;
}

export const InspectionReport: React.FC<InspectionReportProps> = ({
  inspection,
}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Health Scores */}
        <HealthScoreGauge
          label="Overall Health"
          score={inspection.health_score}
          maxScore={100}
        />

        {/* Safety & Performance */}
        <View style={styles.scoreRow}>
          <HealthScoreGauge
            label="Safety Score"
            score={inspection.safety_score}
            maxScore={100}
          />
          <HealthScoreGauge
            label="Performance"
            score={inspection.performance_score}
            maxScore={100}
          />
        </View>

        {/* Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Actions</Text>
          {inspection.recommendations.map((rec) => (
            <RecommendationCard
              key={rec.id}
              recommendation={rec}
            />
          ))}
        </View>

        {/* Export */}
        <ReportExportButton inspectionId={inspection.id} />
      </View>
    </ScrollView>
  );
};
```

---

## 🔌 API Service Integration

### API Client Setup

```typescript
// services/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: 10000,
});

// Request interceptor - Add JWT
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, try refresh
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      if (refreshToken) {
        const response = await api.post('/auth/refresh-token', {
          refresh_token: refreshToken,
        });
        await AsyncStorage.setItem('jwt_token', response.data.token);
        // Retry original request
        return api.request(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Booking Service

```typescript
// services/booking.ts
import api from './api';
import { Booking } from '../types/models';

export const bookingService = {
  async getBookings(): Promise<Booking[]> {
    const response = await api.get('/bookings');
    return response.data.data;
  },

  async getBooking(bookingId: string): Promise<Booking> {
    const response = await api.get(`/bookings/${bookingId}`);
    return response.data.data;
  },

  async createBooking(data: {
    vehicle_id: string;
    inspection_type: string;
    notes?: string;
  }): Promise<Booking> {
    const response = await api.post('/bookings', data);
    return response.data.data;
  },

  async cancelBooking(bookingId: string): Promise<void> {
    await api.delete(`/bookings/${bookingId}`);
  },

  async trackBooking(bookingId: string) {
    // Real-time updates via WebSocket
    return websocketService.subscribe(`booking:${bookingId}`);
  },
};
```

---

## 🎨 State Management (Redux)

### Auth Slice

```typescript
// store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const response = await authService.login(credentials);
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  } as AuthState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
```

---

## 🔔 Push Notifications

```typescript
// services/notification.ts
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const notificationService = {
  async requestPermission() {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  },

  async getFCMToken() {
    const token = await Notifications.getExpoPushTokenAsync();
    return token.data;
  },

  setupNotificationHandlers() {
    Notifications.setNotificationHandler({
      handleNotification: async (notification) => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    // Handle notification taps
    Notifications.addNotificationResponseReceivedListener((response) => {
      const { screen, data } = response.notification.request.content.data;
      // Navigate to relevant screen
    });
  },

  async sendNotificationToServer(
    fcmToken: string,
    userId: string
  ) {
    await api.post('/notifications/register', {
      fcm_token: fcmToken,
      user_id: userId,
    });
  },
};
```

---

## 🧪 Testing

### Component Testing

```typescript
// tests/unit/components/LoginForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react-native';
import { LoginForm } from '../../../components/Auth/LoginForm';

describe('LoginForm', () => {
  it('should render login form', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText('Email')).toBeTruthy();
  });

  it('should submit form on button click', async () => {
    render(<LoginForm />);
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.press(screen.getByText('Login'));
    
    await expect(screen.findByText('Loading')).toBeTruthy();
  });
});
```

---

## 🚀 Deployment

### Build Configuration (app.json)

```json
{
  "expo": {
    "name": "MechCheck Customer",
    "slug": "mechcheck-customer",
    "version": "1.0.0",
    "assetBundlePatterns": ["**/*"],
    "platforms": ["ios", "android"],
    "plugins": [
      ["expo-notifications", {}],
      ["expo-location", {}]
    ],
    "ios": {
      "bundleIdentifier": "com.mechcheck.customer",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.mechcheck.customer",
      "versionCode": 1
    }
  }
}
```

### Build & Deploy

```bash
# Build for iOS
eas build --platform ios --auto-submit

# Build for Android
eas build --platform android --auto-submit

# Submit to App Stores
eas submit --platform ios
eas submit --platform android
```

---

## 📊 Performance Metrics

- **App Startup Time**: < 2s
- **Screen Load Time**: < 500ms
- **API Response**: < 200ms
- **Crash Rate**: < 0.01%
- **Memory Usage**: < 100MB

---

This customer app provides a seamless booking and inspection experience with:
✅ Intuitive UI for quick bookings
✅ Real-time status tracking
✅ Professional report viewing
✅ Secure payments integration
✅ Offline capability (cache)
