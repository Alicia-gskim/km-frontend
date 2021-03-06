import React from 'react';
import Router from './routes';
import ScrollToTop from './components_bak/ScrollToTop';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';

export default function App() {
    return (
        <ThemeConfig>
            <ScrollToTop />
            <GlobalStyles />
            <Router />
        </ThemeConfig>
    );
};