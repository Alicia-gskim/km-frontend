import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Box, Button, Card, Container, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { useCallback, useEffect,  useState } from "react";
import Page from "../components/Page";
import AxiosModule from "../components/AxiosModule";
import Board from "../components/layouts/services/Board";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddIcon from '@mui/icons-material/Add';
import CustomSelect from './CustomSelect';
import CustomPagination from '../components/CustomPagination';

const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3)
}));

const headList = [
    {name: ["raws-view"]},
    {name: "name"},
    {name: "host"},
    {name: "tags"},
    {name: "created_at"},
    {name: ["delete"]}
]

export default function Services() {
    const [svcList, setSvcList] = useState([]);
    
    // const [pages, setPages] = useState(1);
    // const handleChange = (e, v) => {
    //     console.log('value : ', v);
    //     setPages(v);
    // }
    // const getSvcList = (svcList) => {
    //     setSvcList(svcList);
    // }

    useEffect( () => {
        AxiosModule.get('/services', {})
        .then(res => {
            setSvcList(res.data.data);
            console.log('get services list data : ', svcList);
            console.log('length : ', svcList.length);
        });
    }, []);

    function handleCallback(tmpData) {
        console.log(tmpData);
    }
    function onDelete(params) {
        console.log("on delete : ", params);
        // setTmpData(tmpData.filter(data => data.id !== params.id));
    };
    function rawsView(params) {
        console.log("raws view : ", params);
    }
    const serviceRawView = useCallback( (params) => () => {
        console.log('raw view : ', params);
    }, [])
    const deleteService = useCallback( (params) => () => {
        console.log('delete services : ', params);
    }, []);


    const [value, setValue] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [listPerPage, setListPerPage] = useState(value);

    const indexOfLast = currentPage * listPerPage;
    const indexOfFirst = indexOfLast - listPerPage;
    function currentSvcLists(tmp) {
        let currentSvcLists = 0;
        currentSvcLists = tmp.slice(indexOfFirst, indexOfLast);
        console.log("services --- ", currentPage);
        return currentSvcLists;
    }

    function changeListPerPage() {
        setListPerPage(value);
        setCurrentPage(1);
    }

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
                            <CustomSelect value={value} lists={changeListPerPage} listPerPage={setListPerPage} onChangeValue={setValue} />
                        </Box>
                    </RootStyle>

                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table aria-label="services list table">
                            <TableHead>
                                {/* <TableRow>
                                    <TableCell>RAWS VIEW</TableCell>
                                    <TableCell>NAME</TableCell>
                                    <TableCell>HOST</TableCell>
                                    <TableCell>TAGS</TableCell>
                                    <TableCell>CREATED</TableCell>
                                    <TableCell>DELETE</TableCell>
                                </TableRow> */}
                                <Board gubun={"head"} lists={headList} />
                            </TableHead>

                            <TableBody>
                                {/* <Board lists={Object.entries(svcList)} pageSize={value} /> */}
                                <Board gubun={"body"} lists={currentSvcLists(svcList)} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
                <Box style={{ height: 400, width: '100%' }}>
                    <Stack spacing={2}>
                        <CustomPagination svcListPerPage={listPerPage} totalSvcList={svcList.length} paginate={setCurrentPage}/>
                        {/* <Pagination count={10} color="secondary" page={pages} onChange={handleChange} /> */}
                    </Stack>
                </Box>
            </Container>
        </Page>
    );
};