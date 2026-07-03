import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Collapse,
  Divider,
  Grid,
  IconButton,
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
  Alert,
  Button,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
} from '@mui/icons-material';

const ScoreGauge = ({ score, label, color }) => {
  let scoreColor = color;
  if (score >= 80) scoreColor = '#4CAF50';
  else if (score >= 60) scoreColor = '#FF9800';
  else if (score >= 40) scoreColor = '#FF6F6F';
  else scoreColor = '#F44336';

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 1 }}>
        <CircularProgress variant="determinate" value={100} sx={{ color: '#e0e0e0' }} size={100} />
        <CircularProgress
          variant="determinate"
          value={score}
          sx={{
            position: 'absolute',
            left: 0,
            color: scoreColor,
          }}
          size={100}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: scoreColor }}>
            {score}
          </Typography>
          <Typography variant="caption">/100</Typography>
        </Box>
      </Box>
      <Typography variant="subtitle2" sx={{ mt: 1 }}>
        {label}
      </Typography>
    </Box>
  );
};

const PriorityBadge = ({ priority }) => {
  const colors = {
    critical: { bg: '#F44336', text: 'white' },
    high: { bg: '#FF9800', text: 'white' },
    medium: { bg: '#FFC107', text: 'black' },
    low: { bg: '#4CAF50', text: 'white' },
  };

  const color = colors[priority] || colors.low;

  return (
    <Chip
      label={priority.toUpperCase()}
      sx={{
        backgroundColor: color.bg,
        color: color.text,
        fontWeight: 'bold',
        fontSize: '0.7rem',
      }}
    />
  );
};

const ConditionBadge = ({ condition }) => {
  const colors = {
    excellent: { icon: '✓✓', color: '#4CAF50', label: 'Excellent' },
    good: { icon: '✓', color: '#8BC34A', label: 'Good' },
    fair: { icon: '⚠', color: '#FF9800', label: 'Fair' },
    poor: { icon: '✗', color: '#FF6F6F', label: 'Poor' },
    critical: { icon: '✗✗', color: '#F44336', label: 'Critical' },
  };

  const cond = colors[condition] || colors.fair;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        padding: '8px 16px',
        borderRadius: '8px',
        backgroundColor: cond.color + '20',
        borderLeft: `4px solid ${cond.color}`,
      }}
    >
      <Typography sx={{ fontSize: '1.5rem' }}>{cond.icon}</Typography>
      <Typography sx={{ fontWeight: 'bold', color: cond.color }}>{cond.label}</Typography>
    </Box>
  );
};

function InspectionReport({ report, loading = false, onDownloadPDF, onPrint }) {
  const [expandedRecommendations, setExpandedRecommendations] = useState(true);
  const [expandedDetails, setExpandedDetails] = useState({});

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!report) {
    return (
      <Alert severity="info">No inspection report available. Complete an inspection first.</Alert>
    );
  }

  const recommendations = Array.isArray(report.recommendations)
    ? report.recommendations
    : JSON.parse(report.recommendations || '[]');

  const handleToggleRecommendation = (index) => {
    setExpandedDetails((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      {/* Header with Actions */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          📊 Inspection Report
        </Typography>
        <Stack direction="row" gap={1}>
          {onDownloadPDF && (
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={onDownloadPDF}
            >
              Download PDF
            </Button>
          )}
          {onPrint && (
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={onPrint}
            >
              Print
            </Button>
          )}
        </Stack>
      </Stack>

      {/* Overall Condition Alert */}
      {report.maintenance_urgency === 'immediate' && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <strong>⚠️ Immediate Action Required!</strong> Your vehicle needs urgent attention. Please schedule
          a service as soon as possible.
        </Alert>
      )}
      {report.maintenance_urgency === 'urgent' && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <strong>⚠️ Urgent Maintenance Needed.</strong> Schedule service within the next few days.
        </Alert>
      )}

      {/* Score Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <ScoreGauge score={report.health_score || 0} label="Overall Health" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ScoreGauge score={report.safety_score || 0} label="Safety Score" color="#FF4444" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ScoreGauge score={report.performance_score || 0} label="Performance" color="#2196F3" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="caption" color="text.secondary">
              Overall Condition
            </Typography>
            <Box sx={{ mt: 1 }}>
              <ConditionBadge condition={report.overall_condition || 'fair'} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Key Metrics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Estimated Repair Cost
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FF6F6F' }}>
                ₹{(report.estimated_repair_cost || 0).toLocaleString('en-IN')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Items Inspected
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {report.items_count || 0} Components
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Maintenance Urgency
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color:
                    report.maintenance_urgency === 'immediate'
                      ? '#F44336'
                      : report.maintenance_urgency === 'urgent'
                        ? '#FF9800'
                        : '#4CAF50',
                }}
              >
                {report.maintenance_urgency?.toUpperCase() || 'ROUTINE'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Recommendations Section */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            p: 1,
          }}
          onClick={() => setExpandedRecommendations(!expandedRecommendations)}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
            💡 Recommendations ({recommendations.length})
          </Typography>
          <IconButton>
            <ExpandMoreIcon
              sx={{
                transform: expandedRecommendations ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s',
              }}
            />
          </IconButton>
        </Box>

        <Collapse in={expandedRecommendations}>
          <Box sx={{ mt: 2 }}>
            {recommendations.length === 0 ? (
              <Alert severity="success">✓ No major issues found. Vehicle is in good condition!</Alert>
            ) : (
              <Stack spacing={1}>
                {recommendations.map((rec, index) => (
                  <Card key={index} sx={{ backgroundColor: '#f9f9f9' }}>
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          cursor: 'pointer',
                          gap: 2,
                        }}
                        onClick={() => handleToggleRecommendation(index)}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                              {rec.category}
                            </Typography>
                            <PriorityBadge priority={rec.priority} />
                          </Stack>
                          <Typography variant="body2">{rec.recommendation}</Typography>
                        </Box>
                        <IconButton size="small">
                          <ExpandMoreIcon
                            sx={{
                              transform: expandedDetails[index] ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.3s',
                            }}
                          />
                        </IconButton>
                      </Box>

                      <Collapse in={expandedDetails[index]} timeout="auto" unmountOnExit>
                        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #ddd' }}>
                          {rec.estimated_cost && (
                            <Box sx={{ mb: 1 }}>
                              <Typography variant="caption" color="textSecondary">
                                Estimated Cost:
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                ₹{rec.estimated_cost.toLocaleString('en-IN')}
                              </Typography>
                            </Box>
                          )}

                          {rec.urgency_days && (
                            <Box sx={{ mb: 1 }}>
                              <Typography variant="caption" color="textSecondary">
                                Action Required Within:
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                {rec.urgency_days} days
                              </Typography>
                            </Box>
                          )}

                          {rec.parts_required && rec.parts_required.length > 0 && (
                            <Box>
                              <Typography variant="caption" color="textSecondary">
                                Parts Required:
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                                {rec.parts_required.map((part, i) => (
                                  <Chip
                                    key={i}
                                    label={part}
                                    size="small"
                                    variant="outlined"
                                  />
                                ))}
                              </Box>
                            </Box>
                          )}
                        </Box>
                      </Collapse>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            )}
          </Box>
        </Collapse>
      </Paper>

      {/* Inspection Notes */}
      {report.notes && (
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            📝 Additional Notes
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
            {report.notes}
          </Typography>
        </Paper>
      )}

      {/* Report Metadata */}
      <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #ddd', color: 'text.secondary' }}>
        <Typography variant="caption">
          Report Generated: {new Date(report.generated_at).toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
}

export default InspectionReport;
