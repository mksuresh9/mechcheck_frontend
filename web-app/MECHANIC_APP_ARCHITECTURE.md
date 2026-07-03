# 🔧 Mechanic App - Architecture & Implementation

**Platform**: iOS & Android (React Native + Expo)  
**Type**: Mobile-First Application  
**Target Users**: Professional mechanics conducting vehicle inspections

---

## 📋 Project Structure

```
mechanic-app/
├── src/
│   ├── App.tsx                         # Root component
│   ├── config.ts                       # App configuration
│   │
│   ├── navigation/
│   │   ├── RootNavigator.tsx           # Root stack navigator
│   │   ├── AuthNavigator.tsx           # Auth flow
│   │   ├── AppNavigator.tsx            # Main app tabs
│   │   ├── InspectionNavigator.tsx     # Inspection flow
│   │   └── types.ts                    # Navigation types
│   │
│   ├── screens/
│   │   ├── Auth/
│   │   │   ├── LoginScreen.tsx         # Mechanic login
│   │   │   ├── RegisterScreen.tsx      # Registration
│   │   │   ├── OnboardingScreen.tsx    # Bank/License info
│   │   │   └── VerificationScreen.tsx
│   │   │
│   │   ├── Dashboard/
│   │   │   ├── DashboardScreen.tsx     # Main dashboard
│   │   │   ├── EarningsScreen.tsx      # Earnings view
│   │   │   └── StatsScreen.tsx         # Performance stats
│   │   │
│   │   ├── Bookings/
│   │   │   ├── PendingBookingsScreen.tsx  # Awaiting acceptance
│   │   │   ├── OngoingBookingsScreen.tsx  # Active bookings
│   │   │   ├── BookingDetailsScreen.tsx   # Booking info
│   │   │   └── CompleteBookingScreen.tsx  # Mark complete
│   │   │
│   │   ├── Inspection/
│   │   │   ├── InspectionStartScreen.tsx
│   │   │   ├── InspectionFormScreen.tsx   # Main inspection form
│   │   │   ├── ImageCaptureScreen.tsx     # Camera for photos
│   │   │   ├── InspectionReviewScreen.tsx # Review before submit
│   │   │   └── InspectionHistoryScreen.tsx
│   │   │
│   │   ├── Earnings/
│   │   │   ├── EarningsDetailScreen.tsx   # Detailed earnings
│   │   │   ├── WithdrawalScreen.tsx       # Withdraw funds
│   │   │   └── TransactionHistoryScreen.tsx
│   │   │
│   │   ├── Profile/
│   │   │   ├── ProfileScreen.tsx          # Mechanic profile
│   │   │   ├── EditProfileScreen.tsx
│   │   │   ├── CertificationsScreen.tsx   # Skills/certs
│   │   │   ├── RatingsScreen.tsx
│   │   │   └── SettingsScreen.tsx
│   │   │
│   │   └── Support/
│   │       ├── SupportScreen.tsx
│   │       └── ChatScreen.tsx
│   │
│   ├── components/
│   │   ├── Common/
│   │   │   ├── Header.tsx
│   │   │   ├── BottomTabNav.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorAlert.tsx
│   │   │
│   │   ├── Inspection/
│   │   │   ├── InspectionChecklistItem.tsx
│   │   │   ├── CategoryCard.tsx
│   │   │   ├── PhotoUploadCard.tsx
│   │   │   ├── StatusSelector.tsx
│   │   │   ├── SeverityPicker.tsx
│   │   │   ├── NotesInput.tsx
│   │   │   └── ProgressIndicator.tsx
│   │   │
│   │   ├── Booking/
│   │   │   ├── BookingCard.tsx
│   │   │   ├── AcceptanceDialog.tsx
│   │   │   ├── LocationMap.tsx
│   │   │   └── EarningsEstimate.tsx
│   │   │
│   │   ├── Payment/
│   │   │   ├── EarningsSummary.tsx
│   │   │   └── WithdrawalForm.tsx
│   │   │
│   │   └── Forms/
│   │       ├── LoginForm.tsx
│   │       └── ProfileForm.tsx
│   │
│   ├── services/
│   │   ├── api.ts                      # API client
│   │   ├── auth.ts                     # Auth service
│   │   ├── booking.ts                  # Booking operations
│   │   ├── inspection.ts               # Inspection operations
│   │   ├── earnings.ts                 # Earnings service
│   │   ├── location.ts                 # GPS location
│   │   ├── camera.ts                   # Camera/photo
│   │   ├── notification.ts             # Push notifications
│   │   ├── storage.ts                  # Local storage
│   │   └── websocket.ts                # Real-time updates
│   │
│   ├── store/
│   │   ├── index.ts                    # Store setup
│   │   ├── slices/
│   │   │   ├── authSlice.ts            # Auth state
│   │   │   ├── bookingSlice.ts         # Bookings state
│   │   │   ├── inspectionSlice.ts      # Inspection state
│   │   │   ├── earningsSlice.ts        # Earnings state
│   │   │   ├── uiSlice.ts              # UI state
│   │   │   └── locationSlice.ts        # Location state
│   │   └── middleware/
│   │       └── persistenceMiddleware.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts                  # Auth hooks
│   │   ├── useBooking.ts               # Booking hooks
│   │   ├── useInspection.ts            # Inspection hooks
│   │   ├── useLocation.ts              # GPS hooks
│   │   ├── useCamera.ts                # Camera hooks
│   │   └── useEarnings.ts              # Earnings hooks
│   │
│   ├── utils/
│   │   ├── formatters.ts               # Formatting utilities
│   │   ├── validators.ts               # Form validators
│   │   ├── constants.ts                # Constants
│   │   ├── helpers.ts                  # Helper functions
│   │   ├── inspectionHelpers.ts        # Inspection logic
│   │   └── logger.ts                   # Error logging
│   │
│   ├── types/
│   │   ├── index.ts                    # Main types
│   │   ├── api.ts                      # API types
│   │   ├── models.ts                   # Data models
│   │   └── inspection.ts               # Inspection types
│   │
│   ├── styles/
│   │   ├── theme.ts                    # Theme
│   │   ├── colors.ts                   # Colors
│   │   └── spacing.ts                  # Spacing
│   │
│   └── main.tsx                        # Entry point
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── videos/
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── app.json                            # Expo config
├── eas.json                            # EAS config
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🎯 Screen Navigation Flow

```
┌──────────────────────────────────────┐
│        AUTHENTICATION                │
├──────────────────────────────────────┤
│                                      │
│  Login Screen                        │
│       ↓                              │
│  Register → Verification             │
│       ↓                              │
│  Bank Details & License              │
│       ↓                              │
│  Profile Verification (Admin)        │
│       ↓                              │
│  ✓ Authenticated                     │
│                                      │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────────────────────────┐
│              MAIN MECHANIC DASHBOARD                     │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────┬──────────────┬──────────┬──────────────┐  │
│  │          │              │          │              │  │
│  ▼          ▼              ▼          ▼              ▼  │
│ Home    Bookings      Inspection   Earnings        Profile│
│  │          │              │          │              │  │
│  ├─Summary  ├─Pending      ├─Start   ├─Today        │  │
│  ├─Quick    ├─Ongoing      ├─Form    ├─This Week    │  │
│  │  Stats   ├─Completed    ├─Review  ├─This Month   │  │
│  │          └─Accept/Deny  └─History ├─Withdraw    │  │
│  │                                    └─History      │  │
│  │                                                    │  │
│  └──────────┬──────────────┬──────────┬──────────────┘  │
│             │              │          │                 │
│             ▼              ▼          ▼                 │
│      Booking Details  Inspection   Rating              │
│      (Accept/Deny)    Form         &                    │
│                       (6 steps)     Reviews             │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 🔍 Inspection Form Flow (Core Feature)

```
Step 1: Inspection Start
├─ Select Booking
├─ View Vehicle Details
└─ Start Timer

        ↓

Step 2: Vehicle Check
├─ Exterior Inspection
│  ├─ Condition Photos
│  ├─ Damage Assessment
│  └─ Notes
├─ Interior Check
│  ├─ Cabin Condition
│  └─ Cleanliness
└─ Documents Verification

        ↓

Step 3: Engine & Drivetrain
├─ Engine Condition
├─ Oil Level & Color
├─ Coolant Level
├─ Battery Status
├─ Belts & Hoses
├─ Air Filter
└─ Test Drive Notes

        ↓

Step 4: Brakes & Suspension
├─ Brake Pads Thickness
├─ Disc/Drum Condition
├─ Fluid Level & Color
├─ Shock Absorbers
├─ Suspension Components
└─ Alignment Issues

        ↓

Step 5: Tyres & Wheels
├─ Tyre Condition
├─ Tread Depth
├─ Pressure Check
├─ Alignment
└─ Rust/Corrosion

        ↓

Step 6: Electrical & Lights
├─ Headlights
├─ Brake Lights
├─ Indicators
├─ Wipers
├─ Windows
└─ All Switches

        ↓

Step 7: Final Review
├─ Health Score Review
├─ Recommendations
├─ Cost Estimate
└─ Submit & Sync
```

---

## 💻 Core Components

### Inspection Form Screen

```typescript
// screens/Inspection/InspectionFormScreen.tsx
import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateInspectionStep } from '../../store/slices/inspectionSlice';

interface InspectionStep {
  id: number;
  name: string;
  category: string;
  status: 'good' | 'fair' | 'poor' | 'not_checked';
  severity?: 'low' | 'medium' | 'high' | 'critical';
  notes?: string;
  images: string[];
}

export const InspectionFormScreen: React.FC = ({ route }) => {
  const { bookingId } = route.params;
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [inspectionItems, setInspectionItems] = useState<InspectionStep[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleItemUpdate = (itemId: string, updates: Partial<InspectionStep>) => {
    setInspectionItems((items) =>
      items.map((item) =>
        item.id === parseInt(itemId) ? { ...item, ...updates } : item
      )
    );
  };

  const handleAddPhoto = async (itemId: string) => {
    try {
      const photo = await cameraService.capturePhoto();
      const compressed = await imageCompressionService.compress(photo);
      
      handleItemUpdate(itemId, {
        images: [...inspectionItems[parseInt(itemId)].images, compressed],
      });
    } catch (error) {
      errorHandler.log('Photo capture failed', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const inspection = {
        booking_id: bookingId,
        items: inspectionItems,
        completed_at: new Date(),
        duration: calculateDuration(),
      };

      await inspectionService.completeInspection(inspection);
      dispatch(updateInspectionStep({ status: 'submitted' }));
    } catch (error) {
      errorHandler.log('Inspection submission failed', error);
    }
  };

  return (
    <ScrollView>
      {/* Progress Bar */}
      <ProgressIndicator step={currentStep} totalSteps={6} />

      {/* Current Step Content */}
      {currentStep === 1 && (
        <VehicleCheckSection
          onItemUpdate={handleItemUpdate}
          onPhotoCaptured={handleAddPhoto}
        />
      )}

      {/* Navigation Buttons */}
      <NavigationButtons
        onPrevious={() => setCurrentStep(currentStep - 1)}
        onNext={() => setCurrentStep(currentStep + 1)}
        onSubmit={handleSubmit}
        disablePrevious={currentStep === 1}
        disableNext={currentStep === 6}
      />
    </ScrollView>
  );
};
```

### Inspection Item Component

```typescript
// components/Inspection/InspectionChecklistItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusSelector } from './StatusSelector';
import { PhotoUploadCard } from './PhotoUploadCard';

interface InspectionChecklistItemProps {
  item: InspectionItem;
  onUpdate: (updates: Partial<InspectionItem>) => void;
  onPhotoCaptured: () => void;
}

export const InspectionChecklistItem: React.FC<InspectionChecklistItemProps> = ({
  item,
  onUpdate,
  onPhotoCaptured,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return '#4CAF50';
      case 'fair':
        return '#FFC107';
      case 'poor':
        return '#FF9800';
      case 'not_checked':
        return '#9E9E9E';
      default:
        return '#E0E0E0';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.name}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>

      <StatusSelector
        value={item.status}
        onChange={(status) => onUpdate({ status })}
      />

      {item.status === 'poor' && (
        <SeverityPicker
          value={item.severity}
          onChange={(severity) => onUpdate({ severity })}
        />
      )}

      <NotesInput
        value={item.notes || ''}
        onChange={(notes) => onUpdate({ notes })}
        placeholder={`Add notes for ${item.name}...`}
      />

      <PhotoUploadCard
        photos={item.images || []}
        onAddPhoto={onPhotoCaptured}
      />
    </View>
  );
};
```

---

## 📡 Real-Time Booking Management

### WebSocket Integration

```typescript
// services/websocket.ts
import io from 'socket.io-client';
import { notificationService } from './notification';

class WebSocketService {
  private socket: any;

  connect(userId: string, token: string) {
    this.socket = io(Config.WS_URL, {
      auth: {
        token,
        userId,
      },
      reconnection: true,
    });

    // Listen for new booking notifications
    this.socket.on('booking:new', (booking) => {
      notificationService.showBookingAlert(booking);
      // Update Redux store
      store.dispatch(addPendingBooking(booking));
    });

    // Listen for booking cancellations
    this.socket.on('booking:cancelled', (bookingId) => {
      store.dispatch(removeBooking(bookingId));
    });

    // Real-time status updates
    this.socket.on('booking:customer_nearby', (booking) => {
      notificationService.showAlert('Customer arriving soon');
    });

    return this.socket;
  }

  acceptBooking(bookingId: string) {
    this.socket.emit('booking:accept', { booking_id: bookingId });
  }

  rejectBooking(bookingId: string, reason: string) {
    this.socket.emit('booking:reject', { booking_id: bookingId, reason });
  }

  updateLocation(lat: number, lng: number, bookingId: string) {
    this.socket.emit('location:update', {
      latitude: lat,
      longitude: lng,
      booking_id: bookingId,
    });
  }

  completeInspection(bookingId: string, inspectionData: any) {
    this.socket.emit('inspection:completed', {
      booking_id: bookingId,
      data: inspectionData,
    });
  }
}

export const websocketService = new WebSocketService();
```

---

## 💰 Earnings & Payments

### Earnings Service

```typescript
// services/earnings.ts
import api from './api';

export const earningsService = {
  async getEarnings(period: 'day' | 'week' | 'month'): Promise<{
    total: number;
    breakdown: { inspections: number; bonuses: number; penalties: number };
  }> {
    const response = await api.get(`/earnings?period=${period}`);
    return response.data.data;
  },

  async getTransactionHistory(limit: number = 20) {
    const response = await api.get(`/earnings/transactions?limit=${limit}`);
    return response.data.data;
  },

  async requestWithdrawal(amount: number) {
    const response = await api.post('/earnings/withdraw', { amount });
    return response.data.data;
  },

  async getBankDetails() {
    const response = await api.get('/mechanic/bank-details');
    return response.data.data;
  },

  async updateBankDetails(bankData: any) {
    const response = await api.put('/mechanic/bank-details', bankData);
    return response.data.data;
  },
};
```

---

## 🧪 Testing Strategies

### Inspection Form Testing

```typescript
// tests/unit/screens/InspectionFormScreen.test.tsx
import { render, screen, fireEvent } from '@testing-library/react-native';
import { InspectionFormScreen } from '../../../screens/Inspection/InspectionFormScreen';

describe('InspectionFormScreen', () => {
  it('should render inspection form', () => {
    render(
      <InspectionFormScreen route={{ params: { bookingId: '123' } }} />
    );
    expect(screen.getByText(/exterior inspection/i)).toBeTruthy();
  });

  it('should update item status when selected', async () => {
    render(
      <InspectionFormScreen route={{ params: { bookingId: '123' } }} />
    );

    const statusButton = screen.getByText('GOOD');
    fireEvent.press(statusButton);

    expect(screen.getByText(/good/i)).toBeTruthy();
  });

  it('should disable severity picker for good items', () => {
    render(
      <InspectionFormScreen route={{ params: { bookingId: '123' } }} />
    );

    const goodButton = screen.getByText('GOOD');
    fireEvent.press(goodButton);

    // Severity picker should not appear
    expect(screen.queryByTestId('severity-picker')).toBeNull();
  });
});
```

---

## 🚀 Deployment Configuration

### app.json

```json
{
  "expo": {
    "name": "MechCheck Mechanic",
    "slug": "mechcheck-mechanic",
    "version": "1.0.0",
    "platforms": ["ios", "android"],
    "plugins": [
      ["expo-notifications", {}],
      ["expo-location", {}],
      ["expo-camera", {}],
      ["expo-media-library", {}]
    ],
    "ios": {
      "bundleIdentifier": "com.mechcheck.mechanic",
      "buildNumber": "1",
      "permissions": ["CAMERA", "PHOTO_LIBRARY", "LOCATION"]
    },
    "android": {
      "package": "com.mechcheck.mechanic",
      "versionCode": 1,
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "ACCESS_FINE_LOCATION"
      ]
    }
  }
}
```

---

## 📊 Key Metrics

- **Form Completion Time**: < 10 minutes
- **Photo Upload Success**: > 99%
- **Real-time Sync**: < 500ms
- **App Performance**: 60 FPS
- **Battery Usage**: Optimized for 12+ hours

---

This mechanic app provides:
✅ Streamlined inspection workflow (6 clear steps)
✅ Real-time booking notifications
✅ Photo capture with compression
✅ Earnings tracking & withdrawals
✅ Offline inspection capability (sync on reconnect)
