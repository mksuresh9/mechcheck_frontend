import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function NotFoundPage() {
  return (
    <Box sx={{ textAlign: 'center', py: 12 }}>
      <Typography variant="h3" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Page not found.
      </Typography>
      <Button component={RouterLink} to="/dashboard" variant="contained">
        Go back to dashboard
      </Button>
    </Box>
  );
}

export default NotFoundPage;
