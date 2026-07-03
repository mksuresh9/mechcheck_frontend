import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Vehicles', path: '/vehicles' },
  { label: 'Inspections', path: '/inspections' },
  { label: 'History', path: '/inspections/history' },
];

function AppLayout() {
  const { logout } = useAuth();

  return (
    <>
      <AppBar position="sticky" color="primary" elevation={2}>
        <Toolbar sx={{ gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6" component={RouterLink} to="/dashboard" sx={{ color: '#fff', textDecoration: 'none', flexGrow: 1 }}>
            MechCheck
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {navItems.map((item) => (
              <Button key={item.path} component={RouterLink} to={item.path} color="inherit" size="small">
                {item.label}
              </Button>
            ))}
            <Button onClick={logout} color="inherit" size="small">
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default AppLayout;
