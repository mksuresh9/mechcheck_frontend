import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Container, Paper, TextField, Typography, Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/apiService';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser({ username, password });
      const token = response?.token || response?.accessToken || response;
      if (!token) {
        throw new Error('Invalid authentication response from server.');
      }
      login(token);
      navigate(from, { replace: true });
    } catch (authError) {
      setError(authError.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', py: 6 }}>
      <Paper elevation={3} sx={{ width: '100%', p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          MechCheck Login
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Sign in to manage inspections, vehicles, and reports.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
          <TextField
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            fullWidth
            autoFocus
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" size="large" disabled={loading}>
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Sign In'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginPage;
