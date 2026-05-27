import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { createInspection } from '../services/apiService';

const statusOptions = [
  { value: 'good', label: 'Good' },
  { value: 'needs_attention', label: 'Needs Attention' },
  { value: 'critical', label: 'Critical' },
];

const initialState = {
  brakesStatus: '',
  engineStatus: '',
  tyresStatus: '',
  comments: '',
  inspectionDate: '',
  photo: null,
};

function InspectionForm() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const validationErrors = {};

    if (!values.brakesStatus) {
      validationErrors.brakesStatus = 'Brakes status is required.';
    }
    if (!values.engineStatus) {
      validationErrors.engineStatus = 'Engine status is required.';
    }
    if (!values.tyresStatus) {
      validationErrors.tyresStatus = 'Tyres status is required.';
    }
    if (!values.inspectionDate) {
      validationErrors.inspectionDate = 'Inspection date is required.';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: name === 'photo' ? files?.[0] || null : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const payload = new FormData();
      payload.append('brakesStatus', values.brakesStatus);
      payload.append('engineStatus', values.engineStatus);
      payload.append('tyresStatus', values.tyresStatus);
      payload.append('comments', values.comments);
      payload.append('inspectionDate', values.inspectionDate);
      if (values.photo) {
        payload.append('photo', values.photo);
      }

      await createInspection(payload);
      setSuccessMessage('Inspection submitted successfully.');
      setValues(initialState);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to submit inspection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom>
        Vehicle Inspection Form
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Record the current inspection status and upload a photo if needed.
      </Typography>

      {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
      {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <FormControl fullWidth error={Boolean(errors.brakesStatus)}>
            <InputLabel id="brakes-status-label">Brakes Status</InputLabel>
            <Select
              labelId="brakes-status-label"
              id="brakes-status"
              name="brakesStatus"
              value={values.brakesStatus}
              label="Brakes Status"
              onChange={handleChange}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth error={Boolean(errors.engineStatus)}>
            <InputLabel id="engine-status-label">Engine Status</InputLabel>
            <Select
              labelId="engine-status-label"
              id="engine-status"
              name="engineStatus"
              value={values.engineStatus}
              label="Engine Status"
              onChange={handleChange}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth error={Boolean(errors.tyresStatus)}>
            <InputLabel id="tyres-status-label">Tyres Status</InputLabel>
            <Select
              labelId="tyres-status-label"
              id="tyres-status"
              name="tyresStatus"
              value={values.tyresStatus}
              label="Tyres Status"
              onChange={handleChange}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <TextField
          label="Comments"
          name="comments"
          value={values.comments}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-end">
          <TextField
            label="Inspection Date"
            name="inspectionDate"
            type="date"
            value={values.inspectionDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            error={Boolean(errors.inspectionDate)}
            helperText={errors.inspectionDate}
            fullWidth
          />
          <Button variant="outlined" component="label" fullWidth sx={{ minWidth: 180 }}>
            Upload Photo
            <input name="photo" type="file" hidden accept="image/*" onChange={handleChange} />
          </Button>
        </Stack>
        {values.photo && (
          <Typography variant="body2" color="text.secondary">
            Selected file: {values.photo.name}
          </Typography>
        )}

        <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ alignSelf: 'flex-start', minWidth: 170 }}>
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Submit Inspection'}
        </Button>
      </Box>
    </Paper>
  );
}

export default InspectionForm;
