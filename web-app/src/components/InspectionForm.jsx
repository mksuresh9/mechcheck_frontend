import { useState, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  LinearProgress,
  Grid,
  IconButton,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  InfoOutlined as InfoIcon,
} from '@mui/icons-material';
import { createInspectionItem, addImages, completeInspection } from '../services/apiService';
import imageCompression from 'browser-image-compression';

const INSPECTION_CATEGORIES = {
  engine: {
    label: 'Engine',
    icon: '⚙️',
    color: '#FF6B6B',
    checks: [
      'Engine oil level',
      'Engine coolant level',
      'Engine noise',
      'Smoke/emissions',
      'Oil leaks',
    ],
  },
  brakes: {
    label: 'Brakes',
    icon: '🛑',
    color: '#FF4444',
    checks: [
      'Brake pads thickness',
      'Brake fluid level',
      'Brake response',
      'Brake noise',
    ],
  },
  tyres: {
    label: 'Tyres',
    icon: '🛞',
    color: '#4CAF50',
    checks: [
      'Tyre pressure',
      'Tyre tread depth',
      'Tyre wear pattern',
      'Wheel damage',
    ],
  },
  battery: {
    label: 'Battery',
    icon: '🔋',
    color: '#2196F3',
    checks: [
      'Battery voltage',
      'Battery terminal condition',
      'Battery age',
      'Corrosion check',
    ],
  },
  oil: {
    label: 'Oil Condition',
    icon: '🛢️',
    color: '#FF9800',
    checks: ['Oil color', 'Oil viscosity', 'Oil change interval', 'Oil filter condition'],
  },
  lights: {
    label: 'Lights',
    icon: '💡',
    color: '#FFEB3B',
    checks: ['Headlights', 'Tail lights', 'Brake lights', 'Turn signals'],
  },
};

const STATUS_OPTIONS = [
  { value: 'good', label: 'Good ✓', color: '#4CAF50' },
  { value: 'fair', label: 'Fair ⚠️', color: '#FF9800' },
  { value: 'poor', label: 'Poor ✗', color: '#F44336' },
  { value: 'not-checked', label: 'Not Checked', color: '#9E9E9E' },
];

function InspectionForm({ bookingId, vehicleType, onComplete }) {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [inspectionItems, setInspectionItems] = useState({});
  const [uploadedImages, setUploadedImages] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [overallNotes, setOverallNotes] = useState('');
  const [completionProgress, setCompletionProgress] = useState(0);

  // Initialize inspection items structure
  useEffect(() => {
    const items = {};
    Object.keys(INSPECTION_CATEGORIES).forEach((category) => {
      items[category] = {
        status: 'not-checked',
        comments: '',
        images: [],
        severity_level: 'none',
        recommended_action: '',
      };
    });
    setInspectionItems(items);
    // Expand all categories by default
    const expanded = {};
    Object.keys(INSPECTION_CATEGORIES).forEach((cat) => {
      expanded[cat] = true;
    });
    setExpandedCategories(expanded);
  }, []);

  // Calculate completion progress
  useEffect(() => {
    const completed = Object.values(inspectionItems).filter((item) => item.status !== 'not-checked').length;
    const total = Object.keys(inspectionItems).length;
    setCompletionProgress(Math.round((completed / total) * 100));
  }, [inspectionItems]);

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const updateInspectionItem = (category, field, value) => {
    setInspectionItems((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const compressImage = async (file) => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      return await imageCompression(file, options);
    } catch (error) {
      console.warn('Image compression failed, using original:', error);
      return file;
    }
  };

  const handleImageUpload = async (e, category) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      const compressedFiles = await Promise.all(files.map(compressImage));

      setUploadedImages((prev) => ({
        ...prev,
        [category]: [...(prev[category] || []), ...compressedFiles],
      }));

      updateInspectionItem(category, 'images', [...(inspectionItems[category].images || []), ...compressedFiles]);
    } catch (error) {
      setErrorMessage('Failed to upload images. Please try again.');
    }
  };

  const removeImage = (category, index) => {
    setUploadedImages((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }));
    updateInspectionItem(
      category,
      'images',
      inspectionItems[category].images.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Validate at least one item is checked
      const hasChecked = Object.values(inspectionItems).some((item) => item.status !== 'not-checked');
      if (!hasChecked) {
        setErrorMessage('Please inspect at least one category before submitting.');
        setLoading(false);
        return;
      }

      // Submit each inspection item
      for (const [category, itemData] of Object.entries(inspectionItems)) {
        if (itemData.status !== 'not-checked') {
          // Create inspection item
          const itemPayload = {
            category: INSPECTION_CATEGORIES[category].label,
            item_type: category,
            status: itemData.status,
            comments: itemData.comments,
            severity_level: itemData.severity_level,
            recommended_action: itemData.recommended_action,
          };

          const response = await createInspectionItem(bookingId, itemPayload);

          // Upload images if any
          if (uploadedImages[category] && uploadedImages[category].length > 0) {
            const formData = new FormData();
            uploadedImages[category].forEach((file) => {
              formData.append('images', file);
            });
            await addImages(response.id, formData);
          }
        }
      }

      // Complete inspection with overall notes
      await completeInspection(bookingId, {
        notes: overallNotes,
      });

      setSuccessMessage('Inspection completed successfully!');
      if (onComplete) {
        setTimeout(() => onComplete(), 1500);
      }
    } catch (error) {
      setErrorMessage(error.message || 'Failed to submit inspection. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            🔍 Vehicle Inspection Form
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Conduct a comprehensive inspection of your vehicle. Fill in each category and upload images for
            documentation.
          </Typography>

          {/* Progress bar */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Inspection Progress</Typography>
              <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                {completionProgress}%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={completionProgress} sx={{ height: 8, borderRadius: 4 }} />
          </Box>
        </Box>

        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
        {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {Object.entries(INSPECTION_CATEGORIES).map(([categoryKey, categoryData]) => (
              <Grid item xs={12} key={categoryKey}>
                <Card
                  sx={{
                    borderLeft: `4px solid ${categoryData.color}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      boxShadow: 2,
                      transform: 'translateY(-2px)',
                    },
                  }}
                  onClick={() => toggleCategory(categoryKey)}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                        <Typography variant="h6" sx={{ fontSize: '1.5rem' }}>
                          {categoryData.icon}
                        </Typography>
                        <Box>
                          <Typography variant="h6">{categoryData.label}</Typography>
                          {inspectionItems[categoryKey]?.status !== 'not-checked' && (
                            <Chip
                              icon={<CheckCircleIcon />}
                              label={inspectionItems[categoryKey].status}
                              size="small"
                              sx={{
                                backgroundColor: STATUS_OPTIONS.find((s) => s.value === inspectionItems[categoryKey].status)?.color,
                                color: 'white',
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                      <IconButton size="small">
                        <ExpandMoreIcon
                          sx={{
                            transform: expandedCategories[categoryKey] ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s',
                          }}
                        />
                      </IconButton>
                    </Box>

                    <Collapse in={expandedCategories[categoryKey]} timeout="auto" unmountOnExit>
                      <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #eee' }}>
                        {/* Status Selection */}
                        <FormControl fullWidth sx={{ mb: 2 }}>
                          <InputLabel>Status</InputLabel>
                          <Select
                            value={inspectionItems[categoryKey]?.status || 'not-checked'}
                            label="Status"
                            onChange={(e) => updateInspectionItem(categoryKey, 'status', e.target.value)}
                          >
                            {STATUS_OPTIONS.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        {/* Severity Level */}
                        {inspectionItems[categoryKey]?.status === 'poor' && (
                          <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Severity Level</InputLabel>
                            <Select
                              value={inspectionItems[categoryKey]?.severity_level || 'high'}
                              label="Severity Level"
                              onChange={(e) => updateInspectionItem(categoryKey, 'severity_level', e.target.value)}
                            >
                              <MenuItem value="low">Low</MenuItem>
                              <MenuItem value="medium">Medium</MenuItem>
                              <MenuItem value="high">High</MenuItem>
                              <MenuItem value="critical">Critical</MenuItem>
                            </Select>
                          </FormControl>
                        )}

                        {/* Comments */}
                        <TextField
                          label="Comments"
                          multiline
                          rows={2}
                          fullWidth
                          placeholder="Add any observations or notes..."
                          value={inspectionItems[categoryKey]?.comments || ''}
                          onChange={(e) => updateInspectionItem(categoryKey, 'comments', e.target.value)}
                          sx={{ mb: 2 }}
                        />

                        {/* Recommended Action */}
                        <TextField
                          label="Recommended Action"
                          multiline
                          rows={1}
                          fullWidth
                          placeholder="What action is recommended?"
                          value={inspectionItems[categoryKey]?.recommended_action || ''}
                          onChange={(e) => updateInspectionItem(categoryKey, 'recommended_action', e.target.value)}
                          sx={{ mb: 2 }}
                        />

                        {/* Image Upload */}
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            📸 Upload Images
                          </Typography>
                          <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                            startIcon={<CloudUploadIcon />}
                          >
                            Upload Images
                            <input
                              type="file"
                              hidden
                              multiple
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, categoryKey)}
                            />
                          </Button>

                          {/* Uploaded Images Preview */}
                          {uploadedImages[categoryKey] && uploadedImages[categoryKey].length > 0 && (
                            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {uploadedImages[categoryKey].map((file, index) => (
                                <Box
                                  key={index}
                                  sx={{
                                    position: 'relative',
                                    width: 80,
                                    height: 80,
                                    borderRadius: 1,
                                    overflow: 'hidden',
                                    backgroundColor: '#f5f5f5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={`upload-${index}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                  />
                                  <IconButton
                                    size="small"
                                    onClick={() => removeImage(categoryKey, index)}
                                    sx={{
                                      position: 'absolute',
                                      top: -8,
                                      right: -8,
                                      backgroundColor: 'rgba(255, 0, 0, 0.7)',
                                      color: 'white',
                                      '&:hover': {
                                        backgroundColor: 'rgba(255, 0, 0, 0.9)',
                                      },
                                    }}
                                  >
                                    <CloseIcon fontSize="small" />
                                  </IconButton>
                                </Box>
                              ))}
                            </Box>
                          )}
                        </Box>

                        {/* Subchecks */}
                        {categoryData.checks && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', gap: 0.5 }}>
                              <InfoIcon sx={{ fontSize: '0.9rem' }} /> Verify:{' '}
                              {categoryData.checks.join(', ')}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Collapse>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Overall Notes */}
          <TextField
            label="Overall Notes"
            multiline
            rows={4}
            fullWidth
            placeholder="Add any overall observations, recommendations, or additional comments..."
            value={overallNotes}
            onChange={(e) => setOverallNotes(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* Submit Button */}
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
            <Button variant="outlined" size="large" disabled={loading}>
              Save as Draft
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ minWidth: 200 }}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
              ) : (
                '✓ Complete Inspection'
              )}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

export default InspectionForm;
