import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSecret, stakeSCRT, withdrawDSCRT, UNLOCK_TOKEN } from '../hooks/useSecret';
import { useOracle } from '../hooks/useOracle';
import ActionModal from './ActionModal';
import { Grid } from '@material-ui/core';
import { UnlockToken } from './unlockToken';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 2,
    },
});

export const TokenBalance = () => {
    const classes = useStyles();
    const { secretjs, dscrtBalance, dScrtDisabled, secretLoaded, account, exchangeRate } = useSecret();
    // const bull = <span className={classes.bullet}>•</span>;
    let [snip20Balance, setSnip20Balance] = useState(undefined);
    let [exchRate, setExchRate] = useState(undefined);
    let [scrtPrice] = useOracle();

    useEffect(() => {
        const stuff = async () => {
            if (!dScrtDisabled && !isNaN(dscrtBalance)) {
                setSnip20Balance(Number(dscrtBalance) / 1e6);
            }
        };

        stuff();
    }, [dscrtBalance, dScrtDisabled]);

    useEffect(() => {
        const stuff = async () => {
            if (exchangeRate) {
                setExchRate(Number(exchangeRate).toFixed(7));
            }
        };

        stuff();
    }, [exchangeRate]);

    // let balance = await getSnip20Balance(
    //   "secret1y5x6yrc4suagjvd3c6swjnv3r78rkrn2250l2e"
    // );
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    dSCRT Balance
                </Typography>
                <Typography variant="h3" component="h2">
                    {dScrtDisabled ? `... dSCRT` : `${snip20Balance} dSCRT`}
                </Typography>
                {!dScrtDisabled && exchRate ? (
                    <Typography className={classes.pos} color="textSecondary">
                        {(Number(snip20Balance) * Number(exchRate)).toFixed(7)} SCRT
                    </Typography>
                ) : (
                    <Typography className={classes.pos} color="textSecondary">
                        Unlock wallet to start staking!{' '}
                    </Typography>
                )}
                {!dScrtDisabled && scrtPrice ? (
                    <Typography className={classes.pos} color="textSecondary">
                        ~$
                        {(Number(snip20Balance) * Number(exchRate) * Number(scrtPrice)).toFixed(3)}
                    </Typography>
                ) : null}
            </CardContent>
            <CardActions>
                {/*<Button*/}
                {/*  size="large"*/}
                {/*  variant="contained"*/}
                {/*  color="primary"*/}
                {/*  style={{ flexGrow: "1" }}*/}
                {/*>*/}
                {/*  Stake*/}
                {/*</Button>*/}
                {!dScrtDisabled ? (
                    <>
                        <ActionModal
                            text={'Stake'}
                            disabled={!account || dScrtDisabled}
                            action={(amt) => stakeSCRT(secretjs, amt)}
                        />

                        <ActionModal
                            text={'Withdraw'}
                            disabled={!account || dScrtDisabled}
                            action={(amt) => withdrawDSCRT(secretjs, amt)}
                        />
                    </>
                ) : (
                    <UnlockToken />
                )}
            </CardActions>
        </Card>
    );
};

export default TokenBalance;
