import { Claims } from '../components/claims';
import { BottomNavigation, Card, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TokenBalance from '../components/tokenBalance';
import Xrate from '../components/x_rate';
import { Voting } from '../components/voting';
import { stakingContract, tokenContract } from '../utils/consts';
import { truncateAddressString } from '../utils/strings';
import CardContent from '@material-ui/core/CardContent';
import React from 'react';
import { useTVL } from '../hooks/useTVL';
import { useOracle } from '../hooks/useOracle';

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
    subtitle: {
        color: theme.palette.primary,
    },
    card: {
        minWidth: 275,
    },
    titleText: {
        fontSize: 14,
    },
}));

function MainPage() {
    const classes = useStyles();
    const [tvl] = useTVL();
    const [scrtPrice] = useOracle();

    // className="App"
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Typography variant="h2">
                        {'Convert'} {<span color="red">SCRT</span>} to {<span>dSCRT</span>}
                    </Typography>
                    <Typography variant="subtitle1">
                        Liquid staking with dSCRT! Stake your SCRT, get dSCRT, and accumulate automatically!
                    </Typography>
                    <Typography style={{ paddingTop: 10 }} variant={'body2'}>
                        Cashmaney takes absolutely no responsibility for any funds gained, lost, disappeared, or
                        bamboozeled as a result of usage of this software. USE AT YOUR OWN RISK.
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
                    <>
                        <Xrate />
                    </>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Typography variant={'h4'}>Want to earn $CASH?</Typography>
                            <Typography variant={'body2'} color={'textSecondary'} style={{ marginTop: 5 }}>
                                Acquire dSCRT and you will be eligible to get $CASH!
                            </Typography>
                            <Typography variant={'body2'} color={'textSecondary'} style={{ marginTop: 5 }}>
                                CASH governance DAO will govern dSCRT, manage validators and develop the ecosystem using
                                contract fees. COMING SOON
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card>
                        <CardContent>
                            <Typography variant={'body2'}>
                                Staking Contract:{' '}
                                {
                                    <a
                                        href={`https://secretnodes.com/secret/chains/secret-2/contracts/${stakingContract}`}
                                        target={'_blank'}
                                        rel={'noreferrer'}
                                    >
                                        {truncateAddressString(stakingContract)}
                                    </a>
                                }
                            </Typography>
                            <Typography variant={'body2'}>
                                dSCRT Contract:{' '}
                                {
                                    <a
                                        href={`https://secretnodes.com/secret/chains/secret-2/contracts/${tokenContract}`}
                                        target={'_blank'}
                                        rel={'noreferrer'}
                                    >
                                        {' '}
                                        {truncateAddressString(tokenContract)}{' '}
                                    </a>
                                }
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card>
                        <CardContent>
                            <Typography className={classes.titleText} color="textSecondary" gutterBottom>
                                Currently staked{' '}
                            </Typography>
                            <Typography variant={'h4'}>
                                {' '}
                                {new Intl.NumberFormat('en-US', {}).format(+Number(tvl) / 1e6)} SCRT{' '}
                            </Typography>
                            <Typography color="textSecondary">
                                ${new Intl.NumberFormat('en-US', {}).format((+Number(tvl) * Number(scrtPrice)) / 1e6)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Typography variant={'h5'}>Withdraws</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <Claims />
                    </Card>
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Typography variant={'h5'}>Voting</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <Voting />
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
