import api from './api';

export const fetchInspections = async () => {
  const response = await api.get('/inspections');
  return response.data;
};

export const fetchInspectionHistory = async () => {
  const response = await api.get('/inspections/history');
  return response.data;
};
