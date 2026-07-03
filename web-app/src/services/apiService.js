import api from './api';

function buildErrorMessage(error) {
  if (error.response) {
    const status = error.response.status;
    const details = error.response.data?.message || error.response.data || error.message;
    return `Request failed with status ${status}: ${details}`;
  }

  if (error.request) {
    return 'No response received from the server. Please check your backend connection.';
  }

  return error.message || 'An unexpected error occurred while making the request.';
}

async function getVehicles() {
  try {
    const response = await api.get('/vehicles');
    return response.data;
  } catch (error) {
    throw new Error(buildErrorMessage(error));
  }
}

async function addVehicle(vehiclePayload) {
  try {
    const response = await api.post('/vehicles', vehiclePayload);
    return response.data;
  } catch (error) {
    throw new Error(buildErrorMessage(error));
  }
}

async function getInspections() {
  try {
    const response = await api.get('/inspections');
    return response.data;
  } catch (error) {
    throw new Error(buildErrorMessage(error));
  }
}

async function getInspectionHistory() {
  try {
    const response = await api.get('/inspections/history');
    return response.data;
  } catch (error) {
    throw new Error(buildErrorMessage(error));
  }
}

// ==================== NEW INSPECTION METHODS ====================

// Get inspection template for a vehicle type
async function getInspectionTemplate(vehicleType) {
  try {
    const response = await api.get(`/inspections/template/${vehicleType}`);
    return response.data;
  } catch (error) {
    throw new Error(buildErrorMessage(error));
  }
}

// Start an inspection
async function startInspection(bookingId) {
  try {
    const response = await api.post(`/inspections/${bookingId}/start`);
    return response.data;
  } catch (error) {
    throw new Error(buildErrorMessage(error));
  }
}

// Add an inspection item/checklist item
async function createInspectionItem(bookingId, itemData) {
  try {
    const response = await api.post(`/inspections/${bookingId}/items`, itemData);
    return response.data;
  } catch (error) {
    throw new Error(buildErrorMessage(error));
  }
}

// Get inspection items for a booking
async function getInspectionItems(bookingId) {
  try {
    const response = await api.get(`/inspections/${bookingId}/items`);
    return response.data;
  } catch (error) {
    throw new Error(buildErrorMessage(error));
  }
}

// Update an inspection item
async function updateInspectionItem(bookingId, itemId, updateData) {
  try {
    const response = await api.put(`/inspections/${bookingId}/items/${itemId}`, updateData);
    return response.data;
  } catch (error) {
    throw new Error(buildErrorMessage(error));
  }
}

// Get inspection details (items + report)
async function getInspectionDetails(bookingId) {
  try {
    const response = await api.get(`/inspections/${bookingId}/details`);
    return response.data;
  } catch (error) {
    throw new Error(buildErrorMessage(error));
  }
}

// Get inspection report
async function getInspectionReport(bookingId) {
  try {
    const response = await api.get(`/inspections/${bookingId}/report`);
    return response.data;
  } catch (error) {
    throw new Error(buildErrorMessage(error));
  }
}

// Complete inspection
async function completeInspection(bookingId, reportData) {
  try {
    const response = await api.post(`/inspections/${bookingId}/complete`, reportData);
    return response.data;
  } catch (error) {
    throw new Error(buildErrorMessage(error));
  }
}

// Get vehicle inspection history
async function getVehicleInspectionHistory(vehicleId, limit = 10) {
  try {
    const response = await api.get(`/inspections/vehicle/${vehicleId}/history?limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error(buildErrorMessage(error));
  }
}

// Add images to inspection item
async function addImages(itemId, formData) {
  try {
    const response = await api.post(`/inspections/items/${itemId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(buildErrorMessage(error));
  }
}

// Legacy inspection creation (for backward compatibility)
async function createInspection(inspectionPayload) {
  try {
    const response = await api.post('/inspections', inspectionPayload);
    return response.data;
  } catch (error) {
    throw new Error(buildErrorMessage(error));
  }
}

async function loginUser(credentials) {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(buildErrorMessage(error));
  }
}

export {
  getVehicles,
  addVehicle,
  getInspections,
  getInspectionHistory,
  createInspection,
  loginUser,
  // New methods
  getInspectionTemplate,
  startInspection,
  createInspectionItem,
  getInspectionItems,
  updateInspectionItem,
  getInspectionDetails,
  getInspectionReport,
  completeInspection,
  getVehicleInspectionHistory,
  addImages,
};
