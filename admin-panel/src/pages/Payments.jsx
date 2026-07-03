import React from 'react'
import { Paper, Typography } from '@mui/material'

export default function Payments(){
  return (
    <Paper sx={{ p:2 }}>
      <Typography variant="h6">Payments</Typography>
      <Typography sx={{ mt:1 }}>View payment transactions, reconciliations and refunds.</Typography>
    </Paper>
  )
}
