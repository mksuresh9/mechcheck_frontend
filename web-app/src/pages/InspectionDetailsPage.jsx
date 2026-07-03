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
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import { getInspectionDetails } from '../services/apiService';
import InspectionReport from '../components/InspectionReport';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const STATUS_COLORS = {
  good: { bg: '#C8E6C9', color: '#2E7D32' },
  fair: { bg: '#FFE0B2', color: '#E65100' },
  poor: { bg: '#FFCDD2', color: '#C62828' },
  'not-checked': { bg: '#EEEEEE', color: '#424242' },
};

const CATEGORY_ICONS = {
  engine: '⚙️',
  brakes: '🛑',
  tyres: '🛞',
  battery: '🔋',
  oil: '🛢️',
  lights: '💡',
  general: '🔧',
};

function InspectionDetailsPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [inspectionDetails, setInspectionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchInspectionDetails();
  }, [bookingId]);

  const fetchInspectionDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getInspectionDetails(bookingId);
      setInspectionDetails(data);
    } catch (err) {
      setError(err.message || 'Failed to load inspection details');
    } finally {
      setLoading(false);
    }
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

  if (!inspectionDetails) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="info">No inspection details available.</Alert>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Container>
    );
  }

  const { items = [], report } = inspectionDetails;

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
            Inspection Details
          </Typography>
        </Box>
      </Stack>

      {/* Tab Navigation */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          aria-label="inspection tabs"
        >
          <Tab label={`📋 Items (${items.length})`} id="tab-0" aria-controls="tabpanel-0" />
          <Tab label="📊 Report" id="tab-1" aria-controls="tabpanel-1" />
        </Tabs>
      </Paper>

      {/* Items Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={2}>
          {items.length === 0 ? (
            <Grid item xs={12}>
              <Alert severity="info">No inspection items recorded.</Alert>
            </Grid>
          ) : (
            items.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item.id || index}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: 1 }}>
                    {/* Header */}
                    <Stack direction="row" justifyContent="space-between" alignItems="start" sx={{ mb: 1 }}>
                      <Box>
                        <Typography variant="subtitle2" color="textSecondary">
                          Category
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {CATEGORY_ICONS[item.item_type] || '🔧'} {item.category}
                        </Typography>
                      </Box>
                      <Chip
                        label={item.status}
                        sx={{
                          backgroundColor: STATUS_COLORS[item.status]?.bg,
                          color: STATUS_COLORS[item.status]?.color,
                          fontWeight: 'bold',
                        }}
                      />
                    </Stack>

                    {/* Status */}
                    <Box sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                      <Typography variant="caption" color="textSecondary">
                        Status
                      </Typography>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                        {item.status}
                      </Typography>
                    </Box>

                    {/* Severity Level */}
                    {item.severity_level && item.severity_level !== 'none' && (
                      <Box sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                        <Typography variant="caption" color="textSecondary">
                          Severity
                        </Typography>
                        <Typography variant="body2" sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                          {item.severity_level}
                        </Typography>
                      </Box>
                    )}

                    {/* Comments */}
                    {item.comments && (
                      <Box sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                        <Typography variant="caption" color="textSecondary">
                          Comments
                        </Typography>
                        <Typography variant="body2">{item.comments}</Typography>
                      </Box>
                    )}

                    {/* Recommended Action */}
                    {item.recommended_action && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" color="textSecondary">
                          Recommended Action
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                          {item.recommended_action}
                        </Typography>
                      </Box>
                    )}

                    {/* Images */}
                    {item.inspection_images && item.inspection_images.length > 0 && (
                      <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #eee' }}>
                        <Typography variant="caption" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <ImageIcon sx={{ fontSize: '0.9rem' }} />
                          Images ({item.inspection_images.length})
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                          {item.inspection_images.map((img, imgIndex) => (
                            <Box
                              key={imgIndex}
                              sx={{
                                width: 60,
                                height: 60,
                                borderRadius: 1,
                                overflow: 'hidden',
                                cursor: 'pointer',
                                border: '1px solid #ddd',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                  transform: 'scale(1.05)',
                                },
                              }}
                              onClick={() => setSelectedImage(img)}
                            >
                              <img
                                src={img.image_url}
                                alt={`inspection-${imgIndex}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </TabPanel>

      {/* Report Tab */}
      <TabPanel value={tabValue} index={1}>
        {report ? (
          <InspectionReport report={report} />
        ) : (
          <Alert severity="info">Inspection report not yet generated.</Alert>
        )}
      </TabPanel>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1300,
            cursor: 'pointer',
          }}
          onClick={() => setSelectedImage(null)}
        >
          <Box
            sx={{
              maxWidth: '90%',
              maxHeight: '90%',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image_url}
              alt="inspection-full"
              style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 8 }}
            />
            {selectedImage.description && (
              <Typography
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  left: 10,
                  right: 10,
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  p: 1,
                  borderRadius: 1,
                  fontSize: '0.9rem',
                }}
              >
                {selectedImage.description}
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default InspectionDetailsPage;
