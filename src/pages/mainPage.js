import { useState } from 'react';
import { Wallet } from '../components/wallet';
import { Claims } from '../components/claims';
import { Card, Grid, Hidden, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TokenBalance from '../components/tokenBalance';
import Xrate from '../components/x_rate';
import { useSecret } from '../hooks/useSecret';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 20,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    scrtColor: {
        color: theme.palette.primary,
    },
}));

function MainPage() {
    const classes = useStyles();

    // className="App"
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Typography variant="h2">
                        {'Convert'} {<span color="red">SCRT</span>} to {<span>dSCRT</span>}
                    </Typography>
                </Grid>
                {/*<Grid item xs={6}>*/}
                {/*    <TextField id="standard-basic" label="SCRT" value={depositAmount} onChange={(event) => {*/}
                {/*        setDepositAmount(event.target.value)*/}
                {/*    }} />*/}
                {/*</Grid>*/}
                {/*<Grid item xs={6}>*/}
                {/*<TextField id="standard-basic" label="dSCRT" value={depositAmount} onChange={(event) => {*/}
                {/*        setDepositAmount(event.target.value)*/}
                {/*    }} />*/}
                {/*</Grid>*/}
                <Grid item xs={9}>
                    <TokenBalance />
                </Grid>
                <Grid item xs={3}>
                    <Xrate />
                </Grid>
                {/*<Hidden mdUp>*/}
                {/*    <Grid item xs={12}>*/}
                {/*        <Wallet />*/}
                {/*    </Grid>*/}
                {/*</Hidden>*/}
                <Grid item xs={12}>
                    <Card>
                        <Claims />
                    </Card>
                </Grid>
            </Grid>

            {/*<Hidden mdUp>*/}
            {/*  <APY />*/}
            {/*  <Help />*/}
            {/*</Hidden>*/}
        </div>
    );
}

export default MainPage;
