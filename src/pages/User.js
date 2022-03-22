import { Label } from "@mui/icons-material";
import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Button, Card, Checkbox, Container, Stack, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { sentenceCase } from "change-case";
import Page from "../components/Page";
import { ListHead, ListToolbar, MoreData } from "../components/boarder";
import SearchNotFound from "../components/SearchNotFound";
import Iconify from '../components/Iconify';
import Scrollbar from "../components/Scrollbar";

import { applySortFilter, getComparator } from "../components/comparator/custom-comparator";

const USERLIST = [];
const TABLE_HEAD = [];

export default function User() {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = page > 0 ? Math.max(0, (1+page) * rowsPerPage - USERLIST.length) : 0;
    const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);
    const isUserNotFound = filteredUsers.length === 0;

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = USERLIST.map((n) => n.name);
            setSelected(newSelecteds);
            return;
          }
          setSelected([]);
    }

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    return (
        <Page title="User | [Co. Cravis] Kong-Manager UI">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    User
                </Typography>
                <Button
                    variant="contained"
                    component={RouterLink}
                    to="#"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                >
                    New User
                </Button>
                </Stack>

                <Card>
                <ListToolbar
                    numSelected={selected.length}
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                />

                <Scrollbar>
                    <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                        <ListHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            rowCount={USERLIST.length}
                            numSelected={selected.length}
                            onRequestSort={handleRequestSort}
                            onSelectAllClick={handleSelectAllClick}
                        />
                        <TableBody>
                        {filteredUsers
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                            const { id, name, role, status, company, avatarUrl, isVerified } = row;
                            const isItemSelected = selected.indexOf(name) !== -1;

                            return (
                                <TableRow
                                hover
                                key={id}
                                tabIndex={-1}
                                role="checkbox"
                                selected={isItemSelected}
                                aria-checked={isItemSelected}
                                >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                    checked={isItemSelected}
                                    onChange={(event) => handleClick(event, name)}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row" padding="none">
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                    <Avatar alt={name} src={avatarUrl} />
                                    <Typography variant="subtitle2" noWrap>
                                        {name}
                                    </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell align="left">{company}</TableCell>
                                <TableCell align="left">{role}</TableCell>
                                <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="left">
                                    <Label
                                        variant="ghost"
                                        color={(status === 'banned' && 'error') || 'success'}
                                    >
                                        {sentenceCase(status)}
                                    </Label>
                                </TableCell>

                                <TableCell align="right">
                                    <MoreData />
                                </TableCell>
                                </TableRow>
                            );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                            </TableRow>
                        )}
                        </TableBody>
                        {isUserNotFound && (
                        <TableBody>
                            <TableRow>
                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                <SearchNotFound searchQuery={filterName} />
                            </TableCell>
                            </TableRow>
                        </TableBody>
                        )}
                    </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={USERLIST.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </Card>
            </Container>
        </Page>
    );
};
