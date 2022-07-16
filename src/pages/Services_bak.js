import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Box, Button, Card, Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import Page from "../components/Page";
import AxiosModule from "../components/AxiosModule";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddIcon from '@mui/icons-material/Add';
import MaterialReactTable from 'material-react-table';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid } from '@mui/x-data-grid';

const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3)
}));

const headList = [
    {id: ["raw-view"], name: ""},
    {id: "name", name: "NAME"},
    {id: "host", name: "HOST"},
    {id: "tags", name: "TAGS"},
    {id: "created_at", name: "CREATED"},
    {id: ["delete"], name: ""}
]

const ServicesBak = () => {
    const [svcList, setSvcList] = useState([]);
    useEffect( () => {
        const fetchData = async () => {
            AxiosModule.get('/services', {})
            .then(res => {
                const resData = res.data.data;
                console.log('length : ', resData.length);
                let tmpDataList = [];
                if( res.data.data.length > 0 ) {
                    // setSvcList(res.data.data);
                    resData.map((items, idx) => {
                        console.log("id: ", idx, ", items:", items);
                        return tmpDataList.push(items);
                    })
                    console.log(tmpDataList);
                    setSvcList(tmpDataList);
                } else {
                    setSvcList([]);
                }
                console.log('get services list data : ', svcList);
            });
        };
        fetchData();
    }, []);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'raw-view'
            },
            {
                accessorKey: 'name',
                header: 'NAME'
            },
            {
                accessorKey: 'host',
                header: 'HOST'
            },
            {
                accessorKey: 'tags',
                header: 'TAGS'
            },
            {
                accessorKey: 'created_at',
                header: 'CREATED'
            },
            {
                accessorKey: 'delete'
            }
        ], []
    )

    return (
        <Page title="SERVICES | Cravis-KongManager">
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Services
                    </Typography>
                    <Typography variant="inherit" sx={{ color: 'text.secondary' }}>
                        Service entities, as the name implies, are abstractions of each of your own upstream services. Examples of Services would be a data transformation microservice, a billing API, etc.
                    </Typography>
                </Stack>

                <Card>
                    <RootStyle>
                        <Button>
                            <AddIcon />add new service
                        </Button>
                        <Box display={"inline-flex"}>
                            <SearchOutlinedIcon fontSize='large' sx={{ color: 'action.active', mr: 1, marginTop: 2 }} />
                            <TextField id="standard-basic" label="search..." variant="standard" />
                        </Box>
                    </RootStyle>

                    <TableContainer sx={{ minWidth: 800 }}>
                        {/* <MaterialReactTable
                            columns={columns}
                            data={svcList}
                        /> */}
                        <Table>
                            <TableHead>
                                <TableRow key={'header'}>
                                    {
                                        columns.map((column) => {
                                            return (
                                                <TableCell key={column.accessorKey}>
                                                    {column.header}
                                                </TableCell>
                                            )
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {svcList.map((row) => {
                                    return (
                                        <TableRow key={row.id}>
                                            {
                                                columns.map((column) => {
                                                    const value = row[column.accessorKey];
                                                    return (
                                                        <TableCell key={column.accessorKey}>
                                                            {value}
                                                        </TableCell>
                                                    )
                                                })
                                            }
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Container>
        </Page>
    );
};

export default ServicesBak;