# MechCheck Frontend

A modern, production-ready React application for vehicle inspection management built with Material UI, React Router, and Axios.

## 🚀 Features

- **Authentication**: JWT-based authentication with protected routes
- **Dashboard**: Comprehensive overview with key metrics and recent activity
- **Vehicle Management**: Add, view, and manage fleet vehicles
- **Inspection System**: Create and track vehicle inspections with photo uploads
- **History Tracking**: Paginated, searchable inspection history with sorting
- **Responsive Design**: Mobile-first design that works on all devices
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Loading States**: Smooth loading indicators throughout the app

## 🏗️ Architecture

### Folder Structure
```
src/
├── components/          # Reusable UI components
│   ├── AddVehicleForm.jsx
│   ├── ConfirmationDialog.jsx
│   ├── DataTable.jsx
│   ├── ErrorBoundary.jsx
│   ├── InspectionForm.jsx
│   ├── LoadingSpinner.jsx
│   └── ProtectedRoute.jsx
├── context/             # React Context providers
│   └── AuthContext.jsx
├── hooks/               # Custom React hooks
│   └── useApi.js
├── layouts/             # Layout components
│   └── AppLayout.jsx
├── pages/               # Page components
│   ├── AddVehiclePage.jsx
│   ├── DashboardPage.jsx
│   ├── InspectionHistoryPage.jsx
│   ├── InspectionsPage.jsx
│   ├── LoginPage.jsx
│   ├── NotFoundPage.jsx
│   └── VehiclesPage.jsx
├── services/            # API service layer
│   ├── api.js
│   ├── apiService.js
│   ├── inspectionService.js
│   └── vehicleService.js
├── utils/               # Utility functions
│   ├── formatters.js
│   └── helpers.js
├── constants.js         # Application constants
├── theme.js             # Material UI theme configuration
├── App.jsx              # Main app component
└── main.jsx             # App entry point
```

### Key Technologies

- **React 18**: Modern React with hooks and concurrent features
- **Material UI**: Comprehensive component library with theming
- **React Router**: Client-side routing with protected routes
- **Axios**: HTTP client with interceptors and error handling
- **Vite**: Fast build tool and development server

## 🛠️ Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mechcheck-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## 📱 Usage

### Authentication

1. Navigate to `/login`
2. Enter credentials
3. JWT token is stored in localStorage
4. Protected routes redirect to login if not authenticated

### Dashboard

- View key metrics and recent activity
- Navigate to different sections via the sidebar

### Vehicle Management

- View all vehicles on `/vehicles`
- Add new vehicles via `/vehicles/add`
- Form validation and error handling included

### Inspections

- Create new inspections on `/inspections`
- View inspection history on `/inspections/history`
- Table supports sorting, searching, and pagination

## 🔧 API Integration

The app integrates with a backend API at `http://localhost:3000`. Key endpoints:

- `POST /login` - User authentication
- `GET /vehicles` - Fetch vehicles
- `POST /vehicles` - Add new vehicle
- `GET /inspections` - Fetch inspections
- `POST /inspections` - Create inspection
- `GET /inspections/history` - Fetch inspection history

## 🎨 Theming

Custom Material UI theme with:

- Consistent color palette
- Typography scale
- Component overrides for rounded corners and shadows
- Responsive breakpoints

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests with coverage
npm test -- --coverage
```

## 🚀 Deployment

```bash
# Build for production
npm run build

# The build artifacts will be stored in the `dist/` directory
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, please contact the development team or create an issue in the repository.
