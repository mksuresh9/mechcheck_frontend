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

export { getVehicles, addVehicle, getInspections, getInspectionHistory, createInspection, loginUser };
