import { Box, Divider, Drawer, Link, useMediaQuery } from '@mui/material';
import { Logo } from '../logo';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import useResponsive from '../../hooks/useResponsive';

export default function DashboardSidebar({isOpenSidebar, onCloseSidebar}) {
    const { pathname } = useLocation();
    const isDesktop = useResponsive('up', 'lg');

    const [menu, setMenu] = useState([]);

    // const fetchMenu = async () => {
    //     const response = await axios.get('/common/navidt');
    //     setMenu(response.data);
    // }

    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
        defaultMatches: true,
        noSsr: false
    });

    useEffect(() => {
        if( isOpenSidebar ) {
            onCloseSidebar();
        }

        // fetchMenu();
      }, [pathname]);

    const content = (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}
            >
                <Box sx={{ p: 3 }}>
                    <RouterLink to="/">
                    <Logo
                        sx={{
                        height: 42,
                        width: 42
                        }}
                    />
                    </RouterLink>
                </Box>

                <Divider sx={{ borderColor: '#2D3748' }} />

                <Box sx={{ flexGrow: 1 }}>
                    {/* <Box><RouterLink to="/application/users">Hello</RouterLink></Box> */}
                    <Box>
                        {menu.map((item, idx) => {
                            return (
                                <Box><Link key={idx} to={item.href} component={RouterLink}>{item.name}</Link></Box>
                            );
                        })}
                    </Box>
                    {/* <Box>
                    {menu.map(menu => (
                        <Link key={menu.id} to={menu.href}>{menu.name}</Link>
                    ))}
                    </Box> */}
                </Box>

                <Divider sx={{ borderColor: '#2D3748' }} />
            </Box>
        </>
    );
    
    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                    backgroundColor: 'neutral.900',
                    color: '#FFFFFF',
                    width: 280
                    }
                }}
                >
                {content}
            </Drawer>
        );
    }

    return (
        <>
            <Drawer
                anchor="left"
                onClose={onCloseSidebar}
                open={isOpenSidebar}
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.900',
                        color: '#FFFFFF',
                        width: 280
                    }
                }}
                sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
                variant="persistent"
            >
            {content}
            </Drawer>
        </>
    );
}