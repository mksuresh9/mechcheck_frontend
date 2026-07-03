import React from 'react'
import { Paper, Typography } from '@mui/material'

export default function Disputes(){
  return (
    <Paper sx={{ p:2 }}>
      <Typography variant="h6">Disputes</Typography>
      <Typography sx={{ mt:1 }}>Handle customer disputes and refunds.</Typography>
    </Paper>
  )
}
