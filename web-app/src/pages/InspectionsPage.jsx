import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import InspectionForm from '../components/InspectionForm';

const inspections = [
  { id: 'INSP-101', vehicle: 'Ford Transit', dueDate: '2026-06-12', type: 'Brake check' },
  { id: 'INSP-102', vehicle: 'Toyota Corolla', dueDate: '2026-06-20', type: 'Engine review' },
  { id: 'INSP-103', vehicle: 'Mercedes Actros', dueDate: '2026-06-25', type: 'Safety audit' },
];

function InspectionsPage() {
  return (
    <Box sx={{ display: 'grid', gap: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Inspections
          </Typography>
          <Typography color="text.secondary">Track upcoming inspections and capture current vehicle status.</Typography>
        </Box>
        <Button component={RouterLink} to="/inspections/history" variant="outlined">
          View History
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <InspectionForm />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card elevation={3} sx={{ p: 2, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Inspections
              </Typography>
              <Grid container spacing={2}>
                {inspections.map((inspection) => (
                  <Grid item xs={12} key={inspection.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {inspection.vehicle}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 1 }}>
                          {inspection.type}
                        </Typography>
                        <Typography variant="body2">ID: {inspection.id}</Typography>
                        <Typography variant="body2">Due: {inspection.dueDate}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default InspectionsPage;
