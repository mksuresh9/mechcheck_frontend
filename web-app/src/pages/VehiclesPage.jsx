import { Box, Button, Card, CardContent, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const vehicles = [
  { id: 'VH-001', model: 'Ford Transit', year: 2019, status: 'Active' },
  { id: 'VH-002', model: 'Toyota Corolla', year: 2021, status: 'Due for service' },
  { id: 'VH-003', model: 'Mercedes Actros', year: 2018, status: 'Inspection due' },
];

function VehiclesPage() {
  return (
    <Box sx={{ display: 'grid', gap: 3 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Vehicles
          </Typography>
          <Typography color="text.secondary">Manage the fleet and review inspection status for each vehicle.</Typography>
        </Box>

        <Button component={RouterLink} to="/vehicles/add" variant="contained">
          Add Vehicle
        </Button>
      </Box>

      <Grid container spacing={3}>
        {vehicles.map((vehicle) => (
          <Grid item xs={12} sm={6} key={vehicle.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{vehicle.model}</Typography>
                <Typography color="text.secondary" sx={{ mb: 1 }}>
                  {vehicle.id} • {vehicle.year}
                </Typography>
                <Typography>Status: {vehicle.status}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default VehiclesPage;
