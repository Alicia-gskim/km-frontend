import { Box, Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Budget from './budget';

const DashboardLayoutRoot = styled('div')(({theme}) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 280
    }
}));

export default function DashboardApp() {
    return (
        <DashboardLayoutRoot>
            <Box
                sx={{
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    width: '100%'
                }}
            >
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 8
                    }}
                >
                    <Container maxWidth={false}>
                        <Grid
                            container spacing={3}
                        >
                            <Grid
                                item
                                lg={3}
                                sm={6}
                                xl={3}
                                xs={12}
                            >
                                <Budget />
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </DashboardLayoutRoot>
    );
};