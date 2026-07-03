import { Paper, Typography } from '@mui/material';
import AddVehicleForm from '../components/AddVehicleForm';

function AddVehiclePage() {
  return (
    <Paper sx={{ p: 4, borderRadius: 3 }} elevation={2}>
      <Typography variant="h4" gutterBottom>
        Add Vehicle
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Create a new vehicle record for inspection tracking.
      </Typography>

      <AddVehicleForm />
    </Paper>
  );
}

export default AddVehiclePage;
