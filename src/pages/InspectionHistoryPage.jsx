import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from '@mui/material';
import { formatDate } from '../utils/formatters';
import { getInspectionHistory } from '../services/apiService';

const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'vehicle', label: 'Vehicle' },
  { id: 'inspector', label: 'Inspector' },
  { id: 'date', label: 'Date' },
  { id: 'result', label: 'Result' },
  { id: 'status', label: 'Status' },
];

function getChipColor(status) {
  const normalized = status?.toLowerCase?.();
  if (normalized?.includes('pass') || normalized?.includes('good')) return 'success';
  if (normalized?.includes('minor') || normalized?.includes('attention')) return 'warning';
  if (normalized?.includes('fail') || normalized?.includes('critical')) return 'error';
  return 'default';
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilized = array.map((el, index) => [el, index]);
  stabilized.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilized.map((el) => el[0]);
}

function InspectionHistoryPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      setError('');
      try {
        const historyData = await getInspectionHistory();
        setRows(Array.isArray(historyData) ? historyData : []);
      } catch (fetchError) {
        setError(fetchError.message || 'Unable to load inspection history.');
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return rows;

    return rows.filter((row) => {
      return [row.id, row.vehicle, row.inspector, row.result, row.status]
        .filter(Boolean)
        .some((value) => value.toString().toLowerCase().includes(query));
    });
  }, [rows, searchQuery]);

  const sortedRows = useMemo(() => {
    return stableSort(filteredRows, getComparator(order, orderBy));
  }, [filteredRows, order, orderBy]);

  const pagedRows = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedRows.slice(start, start + rowsPerPage);
  }, [sortedRows, page, rowsPerPage]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ display: 'grid', gap: 3 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Inspection History
        </Typography>
        <Typography color="text.secondary">Browse completed inspections with search, sorting, and pagination.</Typography>
      </Box>

      <Card elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <CardContent sx={{ display: 'grid', gap: 2 }}>
          <TextField
            label="Search inspections"
            placeholder="Search by vehicle, inspector, result, or ID"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
          />

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <TableContainer component={Paper} variant="outlined">
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    {headCells.map((headCell) => (
                      <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
                        <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : 'asc'}
                          onClick={() => handleRequestSort(headCell.id)}
                        >
                          {headCell.label}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pagedRows.map((record) => (
                    <TableRow key={record.id} hover>
                      <TableCell>{record.id}</TableCell>
                      <TableCell>{record.vehicle}</TableCell>
                      <TableCell>{record.inspector}</TableCell>
                      <TableCell>{formatDate(record.date)}</TableCell>
                      <TableCell>{record.result}</TableCell>
                      <TableCell>
                        <Chip label={record.status || record.result} color={getChipColor(record.status || record.result)} size="small" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      colSpan={6}
                      count={sortedRows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default InspectionHistoryPage;
