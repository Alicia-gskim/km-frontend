import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Box, Button, Card, Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Page from "../components/Page";
import AxiosModule from "../components/AxiosModule";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddIcon from '@mui/icons-material/Add';
// import CustomSelect from './CustomSelect';
import { cloneDeep, throttle } from 'lodash';
import Pagination from "rc-pagination";


const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3)
}));

const tableHead = {
    rawview: "",
    name: "NAME",
    host: "HOST",
    tags: "TAGS",
    created_at: "CREATED",
    delete: ""
}
export default function ServicesBak() {
    const [svcList, setSvcList] = useState([]);
    useEffect( () => {
        AxiosModule.get('/services', {})
            .then(res => {
                setSvcList(res.data.data);
                console.log('get services list data : ', svcList);
                console.log('length : ', svcList.length);
        });
    }, []);

    const countPerPage = 10;
    const [value, setValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [collection, setCollection] = useState(
        cloneDeep(svcList.slice(0, countPerPage))
    );
    const searchData = useRef(
        throttle(val => {
            setCurrentPage(1);
            const data = cloneDeep(
                svcList.slice(0, countPerPage)
            );
            console.log("=---- ",data);
            setCollection(data);
        }, 400)
    );

    useEffect( () => {
        console.log("useEffect : ", value);
        if( !value ) {
            updatePage(1);
        } else {
            searchData.current(value);
        }
    }, [value]);

    const updatePage = p => {
        setCurrentPage(p);
        const to = currentPage * p;
        const from = to - currentPage;
        setCollection(cloneDeep(svcList.slice(from, to)));
    }

    const tableRows = rowData => {
        const {key, index} = rowData;
        const tableCell = Object.keys(tableHead);
        const columnData = tableCell.map((keyD, i) => {
            return <TableCell key={i}>{key[keyD]}</TableCell>
        })

        return <TableRow key={index}>{columnData}</TableRow>;
    }

    const tableData = () => {
        return collection.map((key, index) => tableRows({key, index}));
    }

    const headRows = () => {
        return Object.values(tableHead).map((title, index) => (
            <TableCell key={index}>{title}</TableCell>
        ))
    }

    return (
        <>
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
                            {/* <CustomSelect value={value} getSelectValue={getSelectValue} /> */}
                        </Box>
                    </RootStyle>

                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table aria-label="services list table">
                            <TableHead>
                                <TableRow>
                                    {/* {headRows()} */}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {/* <Board lists={Object.entries(svcList)} pageSize={value} /> */}
                                {/* {tableData()} */}
                            </TableBody>
                        </Table>
                        {/* <Pagination
                            pageSize={countPerPage}
                            onCHange={updatePage}
                            current={currentPage}
                            total={svcList.length}
                        /> */}
                    </TableContainer>
                </Card>
                <Table>
                    <TableHead>
                        <TableRow>{headRows()}</TableRow>
                    </TableHead>
                    <TableBody className='trhover'>{tableData()}</TableBody>
                </Table>
                <Pagination
                    pageSize={countPerPage}
                    onChange={updatePage}
                    current={currentPage}
                    total={svcList.length}
                />
            </Container>
        </Page>
        </>
    );
};