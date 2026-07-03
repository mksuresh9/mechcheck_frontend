# 🎛️ Admin Panel - Architecture & Implementation

**Platform**: Web (React + TypeScript)  
**Type**: Enterprise Dashboard  
**Target Users**: MechCheck administrators and super-admins

---

## 📋 Project Structure

```
admin-panel/
├── src/
│   ├── App.tsx                         # Root component
│   ├── main.tsx                        # Entry point
│   │
│   ├── config/
│   │   ├── api.ts                      # API configuration
│   │   ├── auth.ts                     # Auth config
│   │   ├── constants.ts                # App constants
│   │   └── environment.ts              # Env setup
│   │
│   ├── layouts/
│   │   ├── MainLayout.tsx              # Main layout wrapper
│   │   ├── AuthLayout.tsx              # Auth pages layout
│   │   ├── DashboardLayout.tsx         # Dashboard layout
│   │   └── Sidebar.tsx                 # Sidebar navigation
│   │
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── LoginPage.tsx           # Admin login
│   │   │   ├── ForgotPasswordPage.tsx
│   │   │   └── MFAPage.tsx             # Multi-factor auth
│   │   │
│   │   ├── Dashboard/
│   │   │   ├── DashboardPage.tsx       # Overview dashboard
│   │   │   ├── KPICards.tsx            # KPI metrics
│   │   │   └── AnalyticsCharts.tsx     # Charts & graphs
│   │   │
│   │   ├── Users/
│   │   │   ├── UsersListPage.tsx       # All users
│   │   │   ├── UserDetailsPage.tsx     # User profile
│   │   │   ├── CreateUserPage.tsx      # New user
│   │   │   └── EditUserPage.tsx        # Edit user
│   │   │
│   │   ├── Mechanics/
│   │   │   ├── MechanicsListPage.tsx   # Mechanics list
│   │   │   ├── MechanicDetailsPage.tsx # Mechanic profile
│   │   │   ├── VerificationPage.tsx    # KYC verification
│   │   │   ├── CertificationsPage.tsx  # Skills/certs
│   │   │   └── SuspensionPage.tsx      # Suspend mechanic
│   │   │
│   │   ├── Bookings/
│   │   │   ├── BookingsListPage.tsx    # All bookings
│   │   │   ├── BookingDetailsPage.tsx  # Booking info
│   │   │   ├── DispatchPage.tsx        # Manual dispatch
│   │   │   └── CancellationPage.tsx    # Handle cancellations
│   │   │
│   │   ├── Inspections/
│   │   │   ├── InspectionsListPage.tsx # All inspections
│   │   │   ├── InspectionReportPage.tsx
│   │   │   ├── QualityReviewPage.tsx   # QA review
│   │   │   └── TemplatesPage.tsx       # Inspection templates
│   │   │
│   │   ├── Payments/
│   │   │   ├── PaymentsListPage.tsx    # All payments
│   │   │   ├── PaymentDetailsPage.tsx
│   │   │   ├── TransactionsPage.tsx    # Transactions
│   │   │   ├── RefundsPage.tsx         # Refund requests
│   │   │   └── PayoutPage.tsx          # Mechanic payouts
│   │   │
│   │   ├── Analytics/
│   │   │   ├── AnalyticsPage.tsx       # Advanced analytics
│   │   │   ├── ReportsPage.tsx         # Generate reports
│   │   │   ├── MetricsPage.tsx         # Performance metrics
│   │   │   └── CustomReportPage.tsx    # Custom report builder
│   │   │
│   │   ├── Settings/
│   │   │   ├── GeneralSettingsPage.tsx # App settings
│   │   │   ├── PaymentSettingsPage.tsx # Payment config
│   │   │   ├── NotificationSettingsPage.tsx
│   │   │   ├── RolesPage.tsx           # Role management
│   │   │   ├── StaffPage.tsx           # Admin staff
│   │   │   └── AuditPage.tsx           # Audit logs
│   │   │
│   │   ├── Support/
│   │   │   ├── SupportTicketsPage.tsx  # Support tickets
│   │   │   ├── TicketDetailsPage.tsx
│   │   │   └── ChatPage.tsx            # Support chat
│   │   │
│   │   └── NotFoundPage.tsx
│   │
│   ├── components/
│   │   ├── Common/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── DataTable.tsx           # Reusable table
│   │   │   ├── Modal.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Alert.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── Pagination.tsx
│   │   │   └── SearchBar.tsx
│   │   │
│   │   ├── Dashboard/
│   │   │   ├── KPICard.tsx             # Single KPI metric
│   │   │   ├── LineChart.tsx           # Revenue chart
│   │   │   ├── BarChart.tsx            # Bookings chart
│   │   │   ├── PieChart.tsx            # Distribution chart
│   │   │   ├── StatusBreakdown.tsx     # Booking status
│   │   │   └── RecentActivity.tsx      # Activity log
│   │   │
│   │   ├── Users/
│   │   │   ├── UserForm.tsx            # User CRUD form
│   │   │   ├── UserCard.tsx
│   │   │   ├── RoleSelector.tsx
│   │   │   └── BulkActionToolbar.tsx
│   │   │
│   │   ├── Mechanics/
│   │   │   ├── VerificationForm.tsx    # KYC form
│   │   │   ├── CertificationUpload.tsx
│   │   │   ├── RatingCard.tsx
│   │   │   └── DocumentViewer.tsx      # View docs
│   │   │
│   │   ├── Inspections/
│   │   │   ├── InspectionViewer.tsx    # View inspection
│   │   │   ├── QAChecklist.tsx         # QA review form
│   │   │   ├── ImageCarousel.tsx       # Photo gallery
│   │   │   └── RecommendationList.tsx
│   │   │
│   │   ├── Analytics/
│   │   │   ├── FilterPanel.tsx         # Date/filters
│   │   │   ├── ExportButton.tsx        # PDF/Excel export
│   │   │   └── DataVisualization.tsx   # Charts
│   │   │
│   │   └── Forms/
│   │       ├── LoginForm.tsx
│   │       ├── SearchForm.tsx
│   │       └── AdvancedFilter.tsx
│   │
│   ├── services/
│   │   ├── api.ts                      # API client
│   │   ├── auth.ts                     # Auth service
│   │   ├── users.ts                    # User management
│   │   ├── mechanics.ts                # Mechanic management
│   │   ├── bookings.ts                 # Booking management
│   │   ├── inspections.ts              # Inspection management
│   │   ├── payments.ts                 # Payment management
│   │   ├── analytics.ts                # Analytics queries
│   │   ├── reports.ts                  # Report generation
│   │   ├── settings.ts                 # Settings management
│   │   ├── audit.ts                    # Audit logging
│   │   └── export.ts                   # Data export (PDF, Excel)
│   │
│   ├── store/
│   │   ├── index.ts                    # Redux store
│   │   ├── slices/
│   │   │   ├── authSlice.ts            # Auth state
│   │   │   ├── usersSlice.ts           # Users state
│   │   │   ├── mechanicsSlice.ts       # Mechanics state
│   │   │   ├── bookingsSlice.ts        # Bookings state
│   │   │   ├── inspectionsSlice.ts     # Inspections state
│   │   │   ├── uiSlice.ts              # UI state (modals, etc.)
│   │   │   └── settingsSlice.ts        # App settings state
│   │   ├── selectors/
│   │   │   ├── authSelectors.ts
│   │   │   ├── userSelectors.ts
│   │   │   └── bookingSelectors.ts
│   │   └── middleware/
│   │       └── persistenceMiddleware.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts                  # Auth hook
│   │   ├── useApi.ts                   # API hook
│   │   ├── useForm.ts                  # Form hook
│   │   ├── useModal.ts                 # Modal hook
│   │   ├── usePagination.ts            # Pagination hook
│   │   ├── useFilters.ts               # Filter hook
│   │   └── useExport.ts                # Export hook
│   │
│   ├── utils/
│   │   ├── formatters.ts               # Date/number formatting
│   │   ├── validators.ts               # Form validators
│   │   ├── helpers.ts                  # Helper functions
│   │   ├── constants.ts                # Constants
│   │   ├── errorHandler.ts             # Error handling
│   │   ├── logger.ts                   # Error logging
│   │   ├── permissions.ts              # Permission checks
│   │   └── storage.ts                  # Local storage
│   │
│   ├── types/
│   │   ├── index.ts                    # Main types
│   │   ├── api.ts                      # API types
│   │   ├── models.ts                   # Data models
│   │   ├── ui.ts                       # UI types
│   │   └── filters.ts                  # Filter types
│   │
│   ├── styles/
│   │   ├── theme.ts                    # Material-UI theme
│   │   ├── colors.ts                   # Color palette
│   │   ├── typography.ts               # Font styles
│   │   └── globals.css
│   │
│   └── middleware/
│       ├── protectedRoute.ts           # Route protection
│       ├── rbac.ts                     # Role checking
│       └── errorBoundary.tsx
│
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── logo.svg
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── vite.config.ts
├── tsconfig.json
├── package.json
├── .env.example
└── README.md
```

---

## 🎯 Dashboard Navigation

```
┌──────────────────────────────────────────────────────────────┐
│                      ADMIN LOGIN                             │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Email: ________________________                         │ │
│  │  Password: ________________________                      │ │
│  │  [ ] Remember me                                        │ │
│  │                  [LOGIN] [FORGOT PASSWORD]              │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
                    ↓ (After Authentication)
┌──────────────────────────────────────────────────────────────────────┐
│                  MAIN ADMIN DASHBOARD                               │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Sidebar                  Main Content Area                          │
│  ─────────────────────────────────────────────────────────────────  │
│  │ Dashboard              │  Header: Dashboard > Overview           │ │
│  │ Users                  │                                          │ │
│  │ ├─ All Users          │  ┌────────────────────────────────────┐ │ │
│  │ ├─ Roles              │  │ Quick Stats (KPIs)                 │ │ │
│  │ └─ Permissions         │  │                                    │ │ │
│  │                       │  │ Total Revenue: $45,230 ↑ 12%       │ │ │
│  │ Mechanics             │  │ Active Bookings: 234 ↑ 8%          │ │ │
│  │ ├─ All Mechanics      │  │ Completed Inspections: 1,203 ↑ 15% │ │ │
│  │ ├─ Verification       │  │ Mechanic Rating: 4.8★ ↑ 2%         │ │ │
│  │ └─ Ratings            │  └────────────────────────────────────┘ │ │
│  │                       │                                          │ │
│  │ Bookings              │  ┌────────────────────────────────────┐ │ │
│  │ ├─ All Bookings       │  │ Booking Status Breakdown           │ │ │
│  │ ├─ Active             │  │                                    │ │ │
│  │ ├─ Completed          │  │ [Pending] [In Progress] [Done]     │ │ │
│  │ └─ Cancelled          │  └────────────────────────────────────┘ │ │
│  │                       │                                          │ │
│  │ Inspections           │  ┌────────────────────────────────────┐ │ │
│  │ ├─ All Inspections    │  │ Revenue Trend (Last 30 Days)       │ │ │
│  │ ├─ QA Reviews         │  │                                    │ │ │
│  │ └─ Templates          │  │ [Line Chart]                       │ │ │
│  │                       │  └────────────────────────────────────┘ │ │
│  │ Payments              │                                          │ │
│  │ ├─ Transactions       │  ┌────────────────────────────────────┐ │ │
│  │ ├─ Refunds            │  │ Recent Activity                    │ │ │
│  │ └─ Payouts            │  │                                    │ │ │
│  │                       │  │ • Booking #B123 completed          │ │ │
│  │ Analytics             │  │ • Payment verified $150            │ │ │
│  │ ├─ Reports            │  │ • Mechanic #M45 suspended          │ │ │
│  │ ├─ Metrics            │  └────────────────────────────────────┘ │ │
│  │ └─ Export             │                                          │ │
│  │                       │                                          │ │
│  │ Settings              │                                          │ │
│  │ ├─ General            │                                          │ │
│  │ ├─ Payments           │                                          │ │
│  │ ├─ Notifications      │                                          │ │
│  │ ├─ Roles & Perms      │                                          │ │
│  │ ├─ Staff              │                                          │ │
│  │ └─ Audit Logs         │                                          │ │
│  │                       │                                          │ │
│  │ Support               │                                          │ │
│  │ ├─ Tickets            │                                          │ │
│  │ └─ Chat               │                                          │ │
│  │                       │                                          │ │
│  │ Logout                │                                          │ │
│  │                       │                                          │ │
│  └───────────────────────┴──────────────────────────────────────────┘ │
│                                                                      │
│  Footer: © 2024 MechCheck | Version 1.0 | Help | Privacy          │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 💻 Key Components

### Dashboard Component

```typescript
// pages/Dashboard/DashboardPage.tsx
import React, { useEffect } from 'react';
import { Grid, Container, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchDashboardMetrics } from '../../store/slices/dashboardSlice';
import { KPICard } from '../../components/Dashboard/KPICard';
import { LineChart } from '../../components/Dashboard/LineChart';
import { StatusBreakdown } from '../../components/Dashboard/StatusBreakdown';

export const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { metrics, loading } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardMetrics());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* KPI Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Total Revenue"
            value={`$${metrics?.totalRevenue || 0}`}
            change={metrics?.revenueChange || 0}
            icon="💰"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Active Bookings"
            value={metrics?.activeBookings || 0}
            change={metrics?.bookingChange || 0}
            icon="📅"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Completed Inspections"
            value={metrics?.completedInspections || 0}
            change={metrics?.inspectionChange || 0}
            icon="✓"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Avg Mechanic Rating"
            value={`${metrics?.avgRating || 0} ★`}
            change={metrics?.ratingChange || 0}
            icon="⭐"
          />
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <LineChart
            title="Revenue Trend"
            data={metrics?.revenueTrend || []}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StatusBreakdown data={metrics?.statusBreakdown || []} />
        </Grid>
      </Grid>
    </Container>
  );
};
```

### Data Table Component

```typescript
// components/Common/DataTable.tsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TablePagination,
} from '@mui/material';

interface DataTableProps<T> {
  columns: Array<{
    id: keyof T;
    label: string;
    render?: (value: any) => React.ReactNode;
  }>;
  data: T[];
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  onSelectionChange?: (selected: T[]) => void;
  pagination?: boolean;
}

export const DataTable = React.forwardRef<HTMLDivElement, DataTableProps<any>>(
  (props, ref) => {
    const {
      columns,
      data,
      onRowClick,
      selectable = false,
      onSelectionChange,
      pagination = true,
    } = props;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selected, setSelected] = React.useState<Set<string>>(new Set());

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const displayData = pagination
      ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : data;

    return (
      <TableContainer component={Paper} ref={ref}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              {selectable && <TableCell padding="checkbox">✓</TableCell>}
              {columns.map((col) => (
                <TableCell key={String(col.id)} sx={{ fontWeight: 'bold' }}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData.map((row, idx) => (
              <TableRow
                key={idx}
                hover
                onClick={() => onRowClick?.(row)}
                sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                {selectable && (
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell key={String(col.id)}>
                    {col.render
                      ? col.render(row[col.id])
                      : String(row[col.id])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {pagination && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>
    );
  }
);
```

### Mechanic Verification Form

```typescript
// components/Mechanics/VerificationForm.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Alert,
} from '@mui/material';
import { DocumentViewer } from './DocumentViewer';

interface VerificationFormProps {
  mechanic: Mechanic;
  onSubmit: (decision: 'approved' | 'rejected', notes: string) => Promise<void>;
}

export const VerificationForm: React.FC<VerificationFormProps> = ({
  mechanic,
  onSubmit,
}) => {
  const [decision, setDecision] = useState<'approved' | 'rejected' | null>(null);
  const [notes, setNotes] = useState('');
  const [verified, setVerified] = useState({
    license: false,
    insurance: false,
    background: false,
    experience: false,
  });

  const handleSubmit = async () => {
    if (!decision) return;
    await onSubmit(decision, notes);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Alert severity="info">
        Review all documents before making a decision
      </Alert>

      {/* Document Review Section */}
      <Box sx={{ mt: 3 }}>
        <h3>Document Verification</h3>
        <DocumentViewer
          documents={[
            { type: 'license', url: mechanic.license_url },
            { type: 'insurance', url: mechanic.insurance_url },
            { type: 'background_check', url: mechanic.background_check_url },
          ]}
        />
      </Box>

      {/* Verification Checklist */}
      <Box sx={{ mt: 3 }}>
        <h3>Verification Checklist</h3>
        <FormControlLabel
          control={
            <Checkbox
              checked={verified.license}
              onChange={(e) =>
                setVerified({ ...verified, license: e.target.checked })
              }
            />
          }
          label="Driving License Verified"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={verified.insurance}
              onChange={(e) =>
                setVerified({ ...verified, insurance: e.target.checked })
              }
            />
          }
          label="Insurance Documents Verified"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={verified.background}
              onChange={(e) =>
                setVerified({ ...verified, background: e.target.checked })
              }
            />
          }
          label="Background Check Passed"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={verified.experience}
              onChange={(e) =>
                setVerified({ ...verified, experience: e.target.checked })
              }
            />
          }
          label="Experience Verified"
        />
      </Box>

      {/* Decision Section */}
      <Box sx={{ mt: 3 }}>
        <h3>Decision</h3>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Add notes for approval/rejection..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </Box>

      {/* Action Buttons */}
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setDecision('approved');
            handleSubmit();
          }}
        >
          Approve Mechanic
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setDecision('rejected');
            handleSubmit();
          }}
        >
          Reject Application
        </Button>
      </Box>
    </Box>
  );
};
```

---

## 📊 Analytics Engine

### Analytics Service

```typescript
// services/analytics.ts
import api from './api';

export const analyticsService = {
  async getDashboardMetrics(dateRange: { from: Date; to: Date }) {
    const response = await api.get('/analytics/dashboard-metrics', {
      params: {
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
      },
    });
    return response.data;
  },

  async getRevenueBreakdown(period: 'day' | 'week' | 'month' | 'year') {
    const response = await api.get(`/analytics/revenue?period=${period}`);
    return response.data;
  },

  async getMechanicPerformance(limit: number = 20) {
    const response = await api.get(`/analytics/mechanics?limit=${limit}`);
    return response.data;
  },

  async getCustomerSegmentation() {
    const response = await api.get('/analytics/customer-segments');
    return response.data;
  },

  async getRetentionMetrics() {
    const response = await api.get('/analytics/retention');
    return response.data;
  },

  async getQualityMetrics() {
    const response = await api.get('/analytics/quality-metrics');
    return response.data;
  },
};
```

---

## 🔒 Role-Based Access Control

### RBAC Middleware

```typescript
// middleware/rbac.ts
import { Role, Permission } from '../types';

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    'view_dashboard',
    'manage_users',
    'manage_mechanics',
    'view_all_bookings',
    'view_payments',
    'view_reports',
  ],
  super_admin: [
    'view_dashboard',
    'manage_users',
    'manage_mechanics',
    'manage_admins',
    'view_all_bookings',
    'view_payments',
    'manage_settings',
    'view_reports',
    'suspend_accounts',
  ],
  support: [
    'view_dashboard',
    'view_all_bookings',
    'view_user_details',
    'manage_support_tickets',
  ],
};

export const requirePermission = (permission: Permission) => {
  return (req: any, res: any, next: any) => {
    const userRole = req.user.role;
    const userPermissions = ROLE_PERMISSIONS[userRole];

    if (!userPermissions.includes(permission)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};
```

---

## 🚀 Deployment

### Docker Setup

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist/ ./dist/

EXPOSE 3000

CMD ["npm", "start"]
```

### Environment Variables

```env
REACT_APP_API_URL=https://api.mechcheck.com
REACT_APP_WS_URL=wss://api.mechcheck.com
REACT_APP_AUTH_DOMAIN=auth.mechcheck.com
REACT_APP_CLIENT_ID=xxx
REACT_APP_SENTRY_DSN=xxx

VITE_API_URL=https://api.mechcheck.com
VITE_ENV=production
```

---

This admin panel provides:
✅ Comprehensive dashboard with real-time metrics
✅ Multi-user management with RBAC
✅ Mechanic verification & onboarding workflow
✅ Payment and payout management
✅ Advanced analytics and reporting
✅ Quality assurance review system
✅ Support ticket management
