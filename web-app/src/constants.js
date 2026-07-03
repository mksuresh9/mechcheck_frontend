// API Endpoints
export const API_ENDPOINTS = {
  LOGIN: '/login',
  VEHICLES: '/vehicles',
  INSPECTIONS: '/inspections',
  INSPECTION_HISTORY: '/inspections/history',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'mechcheck_jwt_token',
  USER_PREFERENCES: 'mechcheck_user_prefs',
};

// Status Options
export const INSPECTION_STATUSES = [
  { value: 'good', label: 'Good', color: 'success' },
  { value: 'needs_attention', label: 'Needs Attention', color: 'warning' },
  { value: 'critical', label: 'Critical', color: 'error' },
];

// Table Pagination Options
export const PAGINATION_OPTIONS = [5, 10, 25, 50];

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
};

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  VEHICLE_ADDED: 'Vehicle added successfully.',
  INSPECTION_SUBMITTED: 'Inspection submitted successfully.',
  LOGIN_SUCCESS: 'Login successful.',
};
