import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { getVehicleInspectionHistory } from '../services/apiService';

const HealthScoreTrend = ({ current, previous }) => {
  if (!previous) return <Typography variant="body2">First inspection</Typography>;

  const diff = current - previous;
  const isPositive = diff >= 0;

  return (
    <Stack direction="row" alignItems="center" gap={0.5}>
      {isPositive ? (
        <TrendingUpIcon sx={{ color: '#4CAF50', fontSize: '1.2rem' }} />
      ) : (
        <TrendingDownIcon sx={{ color: '#F44336', fontSize: '1.2rem' }} />
      )}
      <Typography
        variant="body2"
        sx={{ color: isPositive ? '#4CAF50' : '#F44336', fontWeight: 'bold' }}
      >
        {isPositive ? '+' : ''}{diff}
      </Typography>
    </Stack>
  );
};

const ConditionLabel = ({ score }) => {
  let label = 'Fair';
  let color = '#FF9800';

  if (score >= 85) {
    label = 'Excellent';
    color = '#4CAF50';
  } else if (score >= 70) {
    label = 'Good';
    color = '#8BC34A';
  } else if (score >= 50) {
    label = 'Fair';
    color = '#FF9800';
  } else if (score >= 30) {
    label = 'Poor';
    color = '#FF6F6F';
  } else {
    label = 'Critical';
    color = '#F44336';
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: color,
        }}
      />
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        {label}
      </Typography>
    </Box>
  );
};

function VehicleInspectionHistoryPage() {
  const { vehicleId } = useParams();
  const navigate = useNavigate();

  const [inspectionHistory, setInspectionHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'timeline'

  useEffect(() => {
    fetchInspectionHistory();
  }, [vehicleId]);

  const fetchInspectionHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getVehicleInspectionHistory(vehicleId, 20);
      setInspectionHistory(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load inspection history');
    } finally {
      setLoading(false);
    }
  };

  const getHealthTrend = (index) => {
    if (index === 0) return null;
    return inspectionHistory[index - 1];
  };

  const calculateAverageScore = () => {
    if (inspectionHistory.length === 0) return 0;
    const sum = inspectionHistory.reduce((acc, item) => acc + (item.health_score || 0), 0);
    return Math.round(sum / inspectionHistory.length);
  };

  const getLatestScore = () => {
    return inspectionHistory.length > 0 ? inspectionHistory[0].health_score : 0;
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Container>
    );
  }

  const avgScore = calculateAverageScore();
  const latestScore = getLatestScore();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          variant="outlined"
        >
          Back
        </Button>
        <Box flex={1}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            📋 Vehicle Inspection History
          </Typography>
        </Box>
      </Stack>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="caption">
                Latest Health Score
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, mt: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2196F3' }}>
                  {latestScore}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  /100
                </Typography>
              </Box>
              <Box sx={{ mt: 1 }}>
                <ConditionLabel score={latestScore} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="caption">
                Average Score
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, mt: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FF9800' }}>
                  {avgScore}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  /100
                </Typography>
              </Box>
              <Box sx={{ mt: 1 }}>
                <ConditionLabel score={avgScore} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="caption">
                Total Inspections
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4CAF50', mt: 1 }}>
                {inspectionHistory.length}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Over time
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom variant="caption">
                Trend
              </Typography>
              {inspectionHistory.length > 1 ? (
                <Box sx={{ mt: 1 }}>
                  <HealthScoreTrend
                    current={inspectionHistory[0].health_score}
                    previous={inspectionHistory[1].health_score}
                  />
                </Box>
              ) : (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  Need more inspections
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Inspection History */}
      <Paper sx={{ mb: 3 }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Inspection Records
          </Typography>
          <Box>
            <Button
              size="small"
              variant={viewMode === 'table' ? 'contained' : 'outlined'}
              onClick={() => setViewMode('table')}
              sx={{ mr: 1 }}
            >
              Table
            </Button>
            <Button
              size="small"
              variant={viewMode === 'timeline' ? 'contained' : 'outlined'}
              onClick={() => setViewMode('timeline')}
            >
              Timeline
            </Button>
          </Box>
        </Box>

        {inspectionHistory.length === 0 ? (
          <Alert severity="info" sx={{ m: 2 }}>
            <Stack direction="row" alignItems="center" gap={1}>
              <InfoIcon fontSize="small" />
              <Box>
                <strong>No inspections yet.</strong> Start recording inspections to see the history.
              </Box>
            </Stack>
          </Alert>
        ) : viewMode === 'table' ? (
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    Health Score
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    Safety Score
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    Performance
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Condition</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    Trend
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inspectionHistory.map((record, index) => (
                  <TableRow
                    key={record.id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? '#fafafa' : 'white',
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                        cursor: 'pointer',
                      },
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(record.recorded_at).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(record.recorded_at).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={record.health_score || 0}
                          sx={{ width: 40, height: 6, borderRadius: 3 }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 'bold', minWidth: 30 }}>
                          {record.health_score || 0}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {record.safety_score || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {record.performance_score || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <ConditionLabel score={record.health_score || 0} />
                    </TableCell>
                    <TableCell align="center">
                      <HealthScoreTrend
                        current={record.health_score}
                        previous={getHealthTrend(index)?.health_score}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ p: 3 }}>
            <Box sx={{ position: 'relative', pl: 4 }}>
              {inspectionHistory.map((record, index) => (
                <Box key={record.id} sx={{ mb: 3, pb: 3, borderBottom: index !== inspectionHistory.length - 1 ? '1px solid #eee' : 'none' }}>
                  {/* Timeline dot */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: -8,
                      top: 6,
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      backgroundColor: '#2196F3',
                      border: '3px solid white',
                      boxShadow: '0 0 0 2px #2196F3',
                    }}
                  />

                  {/* Content */}
                  <Card>
                    <CardContent>
                      <Stack direction="row" justifyContent="space-between" alignItems="start" sx={{ mb: 2 }}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {new Date(record.recorded_at).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {new Date(record.recorded_at).toLocaleTimeString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </Typography>
                        </Box>
                        <ConditionLabel score={record.health_score || 0} />
                      </Stack>

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                          <Box>
                            <Typography variant="caption" color="textSecondary">
                              Health Score
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2196F3' }}>
                              {record.health_score || 0}/100
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Box>
                            <Typography variant="caption" color="textSecondary">
                              Safety Score
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FF4444' }}>
                              {record.safety_score || '-'}/100
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Box>
                            <Typography variant="caption" color="textSecondary">
                              Performance
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
                              {record.performance_score || '-'}/100
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <Box>
                            <Typography variant="caption" color="textSecondary">
                              Trend
                            </Typography>
                            <Box sx={{ mt: 0.5 }}>
                              <HealthScoreTrend
                                current={record.health_score}
                                previous={getHealthTrend(index)?.health_score}
                              />
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default VehicleInspectionHistoryPage;
