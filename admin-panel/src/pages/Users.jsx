import React from 'react'
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material'

const MOCK = [
  { id: 'u1', name: 'Jane Doe', email: 'jane@example.com' },
  { id: 'u2', name: 'Anil Kumar', email: 'anil@example.com' }
]

export default function Users(){
  return (
    <Paper sx={{ p:2 }}>
      <Typography variant="h6" sx={{ mb:2 }}>Customers</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {MOCK.map(u => (
            <TableRow key={u.id}><TableCell>{u.name}</TableCell><TableCell>{u.email}</TableCell></TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
