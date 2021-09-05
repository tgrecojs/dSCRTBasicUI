import './App.css';
import MainPage from './pages/mainPage';
import { Container, createMuiTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@material-ui/core';
import MenuAppBar from './components/appBar';
import { useState, useMemo } from 'react';
// import { deepOrange, deepPurple, lightBlue, orange } from '@material-ui/core/colors';
import { SecretContext } from './hooks/useSecret';
import MenuBar from './components/menuBar';
import { BrowserRouter } from 'react-router-dom';

function App() {
    const [darkState, setDarkState] = useState(useMediaQuery('(prefers-color-scheme: dark)'));
    // const mainPrimaryColor = darkState ? orange[500] : lightBlue[300];
    // const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];

    const theme = useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: darkState ? 'dark' : 'light',
                    primary: {
                        main: '#ffffff', // mainPrimaryColor,
                    },
                    // backgroundRepeat: 'no-repeat',
                    // backgroundAttachment: 'fixed',
                    // background: {
                    //     default: '',
                    //     //radial-gradient(123.22% 129.67% at 100.89% -5.6%, #201D47 0%, #17153A 100%)
                    //     //linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)
                    //     paper: '#242151',
                    // },
                    secondary: {
                        main: '#40DDFF',
                    },
                    light: {
                        text: {
                            color: '#979797',
                        },
                    },
                    background: 'linear-gradient(#e66465, #9198e5)',
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
                overrides: {
                    MuiButton: {
                        // Name of the rule
                        text: {
                            // Some CSS
                            background:
                                'linear-gradient(135deg, #40DDFF 0%, #14BAE3 19.24%, #13B1E6 68.64%, #11AADF 81.77%, #0B98C5 100%)',
                            borderRadius: '10px',
                            border: 0,
                            color: 'white',
                            height: 48,
                            padding: '0 30px',
                            //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                        },
                    },
                    MuiTypography: {
                        colorTextPrimary: {
                            color: '#ffffff',
                        },
                        colorTextSecondary: {
                            color: '#979797',
                        },
                    },
                    MuiCard: {
                        root: {
                            background:
                                'linear-gradient(210.96deg, rgba(36, 33, 81, 0.74) 0.01%, rgba(38, 35, 83, 0.78) 42.05%, rgba(28, 26, 64, 0.51) 104.81%)',
                            boxShadow: '-29px 60px 90px rgba(23, 18, 43, 0.55)',
                            backdropFilter: 'blur(25px)',
                            // /* Note: backdrop-filter has minimal browser support */
                            borderRadius: '10px',
                        },
                    },
                    '@global': {
                        body: {
                            //background: 'radial-gradient(123.22% 129.67% at 100.89% -5.6%, #201D47 0%, #17153A 100%)',
                            background: '', // 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)',
                            backgroundRepeat: 'no-repeat',
                            backgroundAttachment: 'fixed',
                            //paper: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        },
                    },
                },
            }),
        [darkState], //, mainPrimaryColor, mainSecondaryColor
    );

    const handleThemeChange = () => {
        setDarkState(!darkState);
    };
    return (
        <ThemeProvider theme={theme}>
            <SecretContext>
                <div
                    style={{
                        background: 'radial-gradient(123.22% 129.67% at 100.89% -5.6%, #201D47 0%, #17153A 100%)',
                    }}
                >
                    <BrowserRouter>
                        <MenuBar />
                    </BrowserRouter>
                    <Container maxWidth="lg">
                        <MenuAppBar isDark={darkState} changeDarkTheme={handleThemeChange} />
                    </Container>
                    <Container maxWidth="lg">
                        <MainPage />
                    </Container>
                </div>
            </SecretContext>
            <CssBaseline />
        </ThemeProvider>
    );
}

export default App;
