import { Box, Card, CardContent, CardHeader, Container, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Page from "../components/Page";

export default function DashboardApp() {
    return (
        <Page title="Dashboard | Minimal-UI">
            <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4">DashBoard</Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Card>
                            <CardHeader title="CONNECTIONS" subheader="Total Requests: " />
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={2}>
                                        <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                                            <strong>ACTIVE</strong>
                                            <Typography variant="h3">1</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item md={2}>
                                        <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                                            <strong>READING</strong>
                                            <Typography variant="h3">1</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                                            <strong>WRITING</strong>
                                            <Typography variant="h3">1</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                                            <strong>WAITING</strong>
                                            <Typography variant="h3">1</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item md={2}>
                                        <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                                            <strong>ACCEPTED</strong>
                                            <Typography variant="h3">1</Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
                                            <strong>HANDLED</strong>
                                            <Typography variant="h3">1</Typography>
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