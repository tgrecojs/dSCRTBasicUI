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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    title: {
        marginRight: theme.spacing(2),
    },
    balance: {
        flexGrow: 1,
        marginLeft: theme.spacing(2),
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
            <AppBar position="static">
                <Toolbar>
                    {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
                    {/*    <MenuIcon />*/}
                    {/*</IconButton>*/}
                    <>
                        <AccountCircle className={classes.menuButton} />
                        <Typography variant="h6" className={classes.title}>
                            {selectedAccount ? truncateAddressString(selectedAccount) : 'Connect Wallet'}
                        </Typography>
                        <Typography variant="h6" className={classes.balance}>
                            {(Number(scrtBalance) / 1e6).toFixed(3)}
                            {' SCRT'}
                        </Typography>
                    </>
                    <div>
                        {props.isDark ? (
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={props.changeDarkTheme}
                                color="inherit"
                            >
                                <WbIncandescent />
                            </IconButton>
                        ) : (
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={props.changeDarkTheme}
                                color="inherit"
                            >
                                <Brightness2 />
                            </IconButton>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
