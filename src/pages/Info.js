import { Card, Container, Stack, Table, TableBody, TableContainer, Typography } from "@mui/material";
import Page from "../components/Page";
import { useEffect, useState } from "react";
import TableList from "../components/TableList";
import AxiosModule from "../components/AxiosModule";

// const GW_URL = 'http://192.168.1.102:8001';

export default function Info() {
    const [infoList, setInfoList] = useState('');
    useEffect( () => {
        // axios.get(GW_URL)
        //     .then(res => {
        //         setItems(res.data);
        //     })

        // CommonAxios.getDef().then(res =>  {
        //     setItems(res.data);}
        // )

        AxiosModule.get('/', {})
            .then(res => {
                setInfoList(res.data);
            });
    }, []);

    return (
        <Page title="INFO | Cravis-KongManager">
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Node Info
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Generic details about the node
                    </Typography>
                </Stack>
                
                <Card>
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                            <TableBody>
                                <TableList lists={Object.entries(infoList)} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Container>
        </Page>
    );
};
