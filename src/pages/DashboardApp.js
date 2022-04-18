import { Box, Card, CardContent, CardHeader, Container, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Page from "../components/Page";
import AxiosModule from "../components/AxiosModule";

export default function DashboardApp() {
    const [connData, setConnData] = useState([]);
    useEffect(() => {
        AxiosModule.get('/status').then( (res) => {
            setConnData(res.data.server);
            console.log('get dashboard connection data : ', connData);
        });

    }, []);
    return (
        <Page title="Dashboard | Minimal-UI">
            <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4">DashBoard</Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Card>
                            <CardHeader title="CONNECTIONS" subheader={"Total Requests: "+connData.total_requests} />
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={2}>
                                        <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                                            <strong>ACTIVE</strong>
                                            <Typography variant="h3">{connData.connections_active}</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item md={2}>
                                        <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                                            <strong>READING</strong>
                                            <Typography variant="h3">{connData.connections_reading}</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                                            <strong>WRITING</strong>
                                            <Typography variant="h3">{connData.connections_writing}</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                                            <strong>WAITING</strong>
                                            <Typography variant="h3">{connData.connections_waiting}</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item md={2}>
                                        <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                                            <strong>ACCEPTED</strong>
                                            <Typography variant="h3">{connData.connections_accepted}</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                                            <strong>HANDLED</strong>
                                            <Typography variant="h3">{connData.connections_handled}</Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
};