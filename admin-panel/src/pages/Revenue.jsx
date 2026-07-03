import React from 'react'
import { Paper, Typography } from '@mui/material'

export default function Revenue(){
  return (
    <Paper sx={{ p:2 }}>
      <Typography variant="h6">Revenue</Typography>
      <Typography sx={{ mt:1 }}>Track payouts, fees, and gross/net revenue.</Typography>
    </Paper>
  )
}
