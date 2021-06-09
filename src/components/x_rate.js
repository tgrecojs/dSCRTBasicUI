import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useSecret } from '../hooks/useSecret';
import { useOracle } from '../hooks/useOracle';

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
        marginBottom: 4,
        marginTop: 4,
    },
});

export default function Xrate() {
    const classes = useStyles();
    const { exchangeRate } = useSecret();

    let [exchRate, setExchRate] = useState(undefined);
    let [scrtPrice] = useOracle();

    useEffect(() => {
        const stuff = async () => {
            if (exchangeRate) {
                setExchRate(Number(exchangeRate).toFixed(7));
            }
        };

        stuff();
    }, [exchangeRate]);
    // const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Exchange Rate
                </Typography>
                <Typography variant="h3" component="h2">
                    {exchRate}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    1 dSCRT = {exchRate} SCRT
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    1 dSCRT = ${(exchRate * scrtPrice).toFixed(3)}
                </Typography>
            </CardContent>
            {/*<CardActions>*/}
            {/*    <Button size="small">Learn More</Button>*/}
            {/*</CardActions>*/}
        </Card>
    );
}
