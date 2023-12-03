// MenuTable.js
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from '@mui/material';

const DLCTable = ({ DLCs }) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedDLCs = DLCs.sort((a, b) => {
        if (order === 'asc') {
            return a[orderBy] < b[orderBy] ? -1 : 1;
        } else {
            return a[orderBy] > b[orderBy] ? -1 : 1;
        }
    });

    return (
        <TableContainer component={Paper}>
            <Table aria-label="DLC table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                        <TableSortLabel
                            active={orderBy === 'DLCName'}
                            direction={orderBy === 'DLCName' ? order : 'asc'}
                            onClick={createSortHandler('DLCName')}
                        >
                            DLC Name
                        </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">
                        <TableSortLabel
                            active={orderBy === 'DLCPrice'}
                            direction={orderBy === 'DLCPrice' ? order : 'asc'}
                            onClick={createSortHandler('DLCPrice')}
                        >
                            Price
                        </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedDLCs.map((row) => (
                        <TableRow key={row.DLCID}>
                            <TableCell component="th" scope="row">
                                {row.DLCName}
                            </TableCell>
                            <TableCell align="right">{`${row.DLCPriceCurrency} ${row.DLCPrice}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        );
    };

    export default DLCTable;
