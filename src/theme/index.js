import { CssBaseline } from '@mui/material';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import componentsOverride from './override';
import palette from './palette';
import typography from './typography';
import shadows, { customShadows } from './shadows';

ThemeConfig.propTypes = {
    children: PropTypes.node
};

export default function ThemeConfig({children}) {
    const themeOptions = useMemo(
        () => ({
            palette,
            shape: { borderRadius: 8 },
            typography,
            shadows,
            customShadows
        }),[]
    );

    const theme = createTheme(themeOptions);
    theme.components = componentsOverride(theme);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};
