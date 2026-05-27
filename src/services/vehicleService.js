import api from './api';

export const fetchVehicles = async () => {
  const response = await api.get('/vehicles');
  return response.data;
};

export const createVehicle = async (vehiclePayload) => {
  const response = await api.post('/vehicles', vehiclePayload);
  return response.data;
};
