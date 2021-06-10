import { Claims } from '../components/claims';
import { Card, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TokenBalance from '../components/tokenBalance';
import Xrate from '../components/x_rate';

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
                    <Typography variant="subtitle1">
                        Liquid staking with dSCRT! Stake your SCRT, get dSCRT, and accumulate automatically!
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
