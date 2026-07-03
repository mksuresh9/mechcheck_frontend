import React from 'react'
import { Paper, Typography, Button } from '@mui/material'

export default function Mechanics(){
  return (
    <Paper sx={{ p:2 }}>
      <Typography variant="h6">Mechanics</Typography>
      <Typography sx={{ mt:1 }}>List, approve/disable mechanics here.</Typography>
      <Button sx={{ mt:2 }} variant="contained">Approve Selected</Button>
    </Paper>
  )
}
