import { Box, Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from '../../../components_bak/logo';
import useResponsive from '../../../hooks/useResponsive';
import Scrollbar from './Scrollbar';
import NavSection from '../../NavSection';
import sidebarConfig from './SidebarConfig';

const DRAWER_WIDTH = 280;
const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH
    }
}));
DashboardSidebar.propTypes = {
    isOpenSidebar: PropTypes.bool,
    onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({isOpenSidebar, onCloseSidebar}) {
    const { pathname } = useLocation();
    const isDesktop = useResponsive('up', 'lg');

    useEffect(() => {
        if (isOpenSidebar) {
        onCloseSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const renderContent = (
        <Scrollbar
            sx={{
                height: 1,
                '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' }
            }}
        >
            <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
                <Logo />
            </Box>

            <NavSection navConfig={sidebarConfig} />

            <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
    );

    return (
        <RootStyle>
            {!isDesktop && (
                <Drawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    PaperProps={{
                        sx: { width: DRAWER_WIDTH }
                    }}
                >
                    {renderContent}
              </Drawer>
            )}

            {isDesktop && (
                <Drawer
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                        width: DRAWER_WIDTH,
                        bgcolor: 'background.default',
                        borderRightStyle: 'dashed'
                        }
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </RootStyle>
    );
};
