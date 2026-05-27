import { useState } from 'react';
import { Box, Button, TextField, Stack, Alert, CircularProgress } from '@mui/material';
import { addVehicle } from '../services/apiService';

const initialValues = {
  vehicleName: '',
  model: '',
  registrationNumber: '',
  ownerName: '',
};

function AddVehicleForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = (fieldValues = values) => {
    const validationErrors = {};

    if (!fieldValues.vehicleName.trim()) {
      validationErrors.vehicleName = 'Vehicle name is required.';
    }
    if (!fieldValues.model.trim()) {
      validationErrors.model = 'Model is required.';
    }
    if (!fieldValues.registrationNumber.trim()) {
      validationErrors.registrationNumber = 'Registration number is required.';
    }
    if (!fieldValues.ownerName.trim()) {
      validationErrors.ownerName = 'Owner name is required.';
    }

    setErrors(validationErrors);
    return validationErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await addVehicle({
        name: values.vehicleName,
        model: values.model,
        registrationNumber: values.registrationNumber,
        ownerName: values.ownerName,
      });
      setSuccessMessage('Vehicle added successfully.');
      setValues(initialValues);
    } catch (error) {
      setErrorMessage(error.message || 'Unable to add vehicle.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Stack spacing={2}>
        <TextField
          label="Vehicle Name"
          name="vehicleName"
          value={values.vehicleName}
          onChange={handleChange}
          error={Boolean(errors.vehicleName)}
          helperText={errors.vehicleName}
          fullWidth
          required
        />
        <TextField
          label="Model"
          name="model"
          value={values.model}
          onChange={handleChange}
          error={Boolean(errors.model)}
          helperText={errors.model}
          fullWidth
          required
        />
        <TextField
          label="Registration Number"
          name="registrationNumber"
          value={values.registrationNumber}
          onChange={handleChange}
          error={Boolean(errors.registrationNumber)}
          helperText={errors.registrationNumber}
          fullWidth
          required
        />
        <TextField
          label="Owner Name"
          name="ownerName"
          value={values.ownerName}
          onChange={handleChange}
          error={Boolean(errors.ownerName)}
          helperText={errors.ownerName}
          fullWidth
          required
        />
      </Stack>

      <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ alignSelf: 'flex-start', minWidth: 160 }}>
        {loading ? <CircularProgress size={20} color="inherit" /> : 'Submit Vehicle'}
      </Button>
    </Box>
  );
}

export default AddVehicleForm;
