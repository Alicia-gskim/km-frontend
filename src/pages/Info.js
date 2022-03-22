import { Card, Container, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import Page from "../components/Page";
import axios from "axios";
import { useEffect, useState } from "react";
import TableList from "../components/TableList";

export default function Info() {
    const [items, setItems] = useState('');
    useEffect( () => {
        axios.get('http://192.168.1.102:8001')
            .then(res => {
                setItems(res.data);

                // Object.keys(res.data).filter( (key) => {
                //     console.log('object key : ', key,', type of : ', typeof res.data[key]);
                //     setDataKey(key);
                // });
             })
    }, []);

    return (
        <Page title="INFO | Cravis-KongManager">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        INFO
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Generic details about the node
                    </Typography>
                </Stack>
                
                <Card>
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                            <TableBody>
                                <TableList lists={Object.entries(items)} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Container>
        </Page>
    );
};
