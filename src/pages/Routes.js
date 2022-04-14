import { Box, Button, Card, Container, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useEffect, useState } from "react";
import Page from "../components/Page";
import CustomSelect from "./CustomSelect";
import AxiosModule from "../components/AxiosModule";
import Board from "../components/layouts/services/Board";

const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3)
}));

export default function Routes() {
    const [routeList, setRouteList] = useState([]);
    useEffect( () => {
        AxiosModule.get('/routes')
        .then(res => {
            setRouteList(res.data.data);
        });
    }, []);
    const [value, setValue] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [listPerPage, setListPerPage] = useState(value);

    function changeListPerPage() {
        setListPerPage(value);
        setCurrentPage(1);
    }

    const indexOfLast = currentPage * listPerPage;
    const indexOfFirst = indexOfLast - listPerPage;
    function currentRouteList(tmp) {
        let currentSvcLists = 0;
        currentSvcLists = tmp.slice(indexOfFirst, indexOfLast);
        console.log("routes --- ", currentPage);
        return currentSvcLists;
    }

    return (
         <Page title="ROUTES | Cravis-KongManager">
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Routes
                    </Typography>
                    <Typography variant="inherit" sx={{ color: 'text.secondary' }}>
                        The Route entities defines rules to match client requests. Each Route is associated with a Service, and a Service may have multiple Routes associated to it. Every request matching a given Route will be proxied to its associated Service.
                    </Typography>
                </Stack>

                <Card>
                    <RootStyle>
                        <Button>
                            YOU CAN ONLY CREATE ROUTES FROM A SERVICE PLACE
                        </Button>
                        <Box display={"inline-flex"}>
                            <SearchOutlinedIcon fontSize='large' sx={{ color: 'action.active', mr: 1, marginTop: 2 }} />
                            <TextField id="standard-basic" label="search..." variant="standard" />
                            <CustomSelect value={value} lists={changeListPerPage} listPerPage={setListPerPage} onChangeValue={setValue} />
                        </Box>
                    </RootStyle>

                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table aria-label="routes list table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>STRIP PATH</TableCell>
                                    <TableCell>PRESERVE HOST</TableCell>
                                    <TableCell>RAWS VIEW</TableCell>
                                    <TableCell>NAME / ID</TableCell>
                                    <TableCell>TAGS</TableCell>
                                    <TableCell>HOSTS</TableCell>
                                    <TableCell>SERVICE</TableCell>
                                    <TableCell>PATHS</TableCell>
                                    <TableCell>CREATED</TableCell>
                                    <TableCell>EDIT</TableCell>
                                    <TableCell>DELETE</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <Board lists={currentRouteList(routeList)} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Container>
        </Page>
    );
};
