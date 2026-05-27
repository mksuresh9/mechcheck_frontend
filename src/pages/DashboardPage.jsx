import { Box, Card, CardContent, Grid, Typography, Stack, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ScheduleIcon from '@mui/icons-material/Schedule';

const stats = [
  {
    title: 'Total Vehicles',
    value: '124',
    description: 'Fleet size under management',
    icon: <DirectionsCarIcon fontSize="large" color="primary" />,
  },
  {
    title: 'Completed Inspections',
    value: '98',
    description: 'Finished this month',
    icon: <AssignmentTurnedInIcon fontSize="large" color="success" />,
  },
  {
    title: 'Pending Inspections',
    value: '26',
    description: 'Awaiting completion',
    icon: <ScheduleIcon fontSize="large" color="warning" />,
  },
];

const recentActivity = [
  { title: 'Inspection completed', subtitle: 'Ford Transit · Brake system', time: '12 min ago' },
  { title: 'New vehicle added', subtitle: 'Toyota Hiace · 2024 model', time: '45 min ago' },
  { title: 'Inspection scheduled', subtitle: 'Mercedes Actros · Safety audit', time: '2 hrs ago' },
  { title: 'Vehicle status updated', subtitle: 'Nissan Navara · Maintenance due', time: 'Yesterday' },
];

function DashboardPage() {
  return (
    <Box sx={{ display: 'grid', gap: 4 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          MechCheck Dashboard
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 680 }}>
          Monitor your vehicle fleet and inspection workflow from one clean, responsive dashboard.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} md={4} key={stat.title}>
            <Card elevation={3} sx={{ minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Avatar sx={{ bgcolor: 'background.default', width: 52, height: 52 }}>
                    {stat.icon}
                  </Avatar>
                </Stack>

                <Typography variant="h3" component="p" sx={{ mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography color="text.secondary">{stat.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Card elevation={3} sx={{ minHeight: 320 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Box>
                  <Typography variant="h6">Recent Activity</Typography>
                  <Typography color="text.secondary" variant="body2">
                    Latest fleet and inspection events.
                  </Typography>
                </Box>
                <Chip icon={<TrendingUpIcon />} label="Live" color="primary" />
              </Stack>

              <List disablePadding>
                {recentActivity.map((item, index) => (
                  <Box key={item.title}>
                    <ListItem alignItems="flex-start" disableGutters>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                          {item.title.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.secondary">
                              {item.subtitle}
                            </Typography>
                            {' — '}
                            <Typography component="span" variant="caption" color="text.secondary">
                              {item.time}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider component="li" />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Card elevation={3} sx={{ minHeight: 320 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Inspection snapshot
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Keep the most important metrics visible across your inspection pipeline.
              </Typography>

              <Stack spacing={2}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Next inspection due
                  </Typography>
                  <Typography variant="h6">Mercedes Actros</Typography>
                  <Typography color="text.secondary">Scheduled for 2026-06-12</Typography>
                </Card>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Most recent result
                  </Typography>
                  <Typography variant="h6">Ford Transit</Typography>
                  <Typography color="text.secondary">Brake system inspection passed</Typography>
                </Card>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardPage;
