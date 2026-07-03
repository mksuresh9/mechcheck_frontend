import React from 'react'
import { Paper, Typography } from '@mui/material'

export default function Bookings(){
  return (
    <Paper sx={{ p:2 }}>
      <Typography variant="h6">Bookings</Typography>
      <Typography sx={{ mt:1 }}>Manage and view booking lifecycle, assign mechanics, resolve disputes.</Typography>
    </Paper>
  )
}
