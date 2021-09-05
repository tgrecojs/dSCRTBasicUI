import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import WbIncandescent from '@material-ui/icons/WbIncandescent';
import Brightness2 from '@material-ui/icons/Brightness2';
import { useSecret } from '../hooks/useSecret';
import { truncateAddressString } from '../utils/strings';
import { Container } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(1),
    },
    title: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(2),
    },
    balance: {
        background: 'linear-gradient(136.67deg, #FF409A 8.34%, #C438EF 95.26%)',
        mixBlendMode: 'normal',
        opacity: '0.8',
        boxShadow: '0px 4px 31px #BA1358',
        borderRadius: '14px',
        display: 'flex',
        justifyContent: 'center',
        color: '#FFFFFF',
        backgroundColor: theme.palette.primary.dark,
        padding: theme.spacing(1),
    },
    appBarBalance: {
        flexGrow: 1,
        backgroundColor: theme.palette.background,
        marginLeft: theme.spacing(2),

        display: 'flex',
    },
    appBarItem: {
        //backgroundColor: theme.palette.primary.dark,
        background: 'linear-gradient(136.67deg, #FF409A 8.34%, #C438EF 95.26%)',
        mixBlendMode: 'normal',
        opacity: '0.8',
        boxShadow: '0px 4px 31px #BA1358',
        borderRadius: '14px',
        display: 'flex',
        justifyContent: 'center',
        color: '#FFFFFF',
        marginLeft: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(1),
    },
    iconButton: {
        color: theme.palette.primary,
    },
}));

export default function MenuAppBar(props) {
    const classes = useStyles();
    const { secretLoaded, account, scrtBalance } = useSecret();

    let [selectedAccount, setSelectedAccount] = useState(undefined);

    useEffect(() => {
        const stuff = async () => {
            if (secretLoaded && account) {
                setSelectedAccount(account);
            }
        };

        stuff();
    }, [secretLoaded, account]);

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
                    {/*    <MenuIcon />*/}
                    {/*</IconButton>*/}
                    <>
                        <div className={classes.appBarItem}>
                            {/*<Container className={classes.menuButton}>*/}
                            {/*    <AccountCircle className={classes.menuButton} />*/}
                            {/*</Container>*/}

                            <Typography variant="h6" className={classes.title}>
                                {selectedAccount ? truncateAddressString(selectedAccount) : 'Connect Wallet'}
                            </Typography>
                        </div>
                        <div className={classes.appBarBalance}>
                            <Typography variant="h6" className={classes.balance}>
                                {(Number(scrtBalance) / 1e6).toFixed(3)}
                                {' SCRT'}
                            </Typography>
                        </div>
                    </>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => {}}
                            color="primary"
                        >
                            <WbIncandescent />
                        </IconButton>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => {}}
                            color="primary"
                        >
                            <HelpOutlineIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
