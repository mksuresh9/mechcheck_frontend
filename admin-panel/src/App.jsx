import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Mechanics from './pages/Mechanics'
import Bookings from './pages/Bookings'
import Payments from './pages/Payments'
import Disputes from './pages/Disputes'
import Revenue from './pages/Revenue'

export default function App(){
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>MechCheck Admin</Typography>
          <Button color="inherit" component={Link} to="/">Dashboard</Button>
          <Button color="inherit" component={Link} to="/users">Customers</Button>
          <Button color="inherit" component={Link} to="/mechanics">Mechanics</Button>
          <Button color="inherit" component={Link} to="/bookings">Bookings</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/mechanics" element={<Mechanics/>} />
          <Route path="/bookings" element={<Bookings/>} />
          <Route path="/payments" element={<Payments/>} />
          <Route path="/disputes" element={<Disputes/>} />
          <Route path="/revenue" element={<Revenue/>} />
        </Routes>
      </Container>
    </Box>
  )
}
