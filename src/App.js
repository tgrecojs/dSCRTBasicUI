import './App.css';
import MainPage from './pages/mainPage';
import { Container, createMuiTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@material-ui/core';
import MenuAppBar from './components/appBar';
import { useState, useMemo } from 'react';
import { deepOrange, deepPurple, lightBlue, orange } from '@material-ui/core/colors';
import { SecretContext } from './hooks/useSecret';

function App() {
    const [darkState, setDarkState] = useState(useMediaQuery('(prefers-color-scheme: dark)'));
    const mainPrimaryColor = darkState ? orange[500] : lightBlue[300];
    const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];

    const theme = useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: darkState ? 'dark' : 'light',
                    primary: {
                        main: mainPrimaryColor,
                    },
                    secondary: {
                        main: mainSecondaryColor,
                    },
                },
                typography: {
                    fontFamily: [
                        '-apple-system',
                        'BlinkMacSystemFont',
                        '"Segoe UI"',
                        'Roboto',
                        '"Helvetica Neue"',
                        'Arial',
                        'sans-serif',
                        '"Apple Color Emoji"',
                        '"Segoe UI Emoji"',
                        '"Segoe UI Symbol"',
                    ].join(','),
                },
            }),
        [darkState, mainPrimaryColor, mainSecondaryColor],
    );

    const handleThemeChange = () => {
        setDarkState(!darkState);
    };
    return (
        <ThemeProvider theme={theme}>
            <SecretContext>
                <>
                    <Container maxWidth="lg">
                        <MenuAppBar isDark={darkState} changeDarkTheme={handleThemeChange} />
                    </Container>
                    <Container maxWidth="lg">
                        <MainPage />
                    </Container>
                </>
            </SecretContext>
            <CssBaseline />
        </ThemeProvider>
    );
}

export default App;
