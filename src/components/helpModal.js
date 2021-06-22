import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function HelpModal() {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button color="primary" onClick={handleClickOpen}>
                What is dSCRT?
            </Button>
            <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">{'General'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        dSCRT is a variable exchange rate (VXR) derivative for staked Secret (SCRT). What this means is
                        that there is a contract that handles staking and compounding staking rewards for you, giving
                        you an amount of dSCRT that equals your stake. The ratio between dSCRT and SCRT changes, which
                        will reflect your staking rewards.
                        <p>
                            Example: You stake 100 SCRT, which is equal to 95 dSCRT. After 1 year, your 95 dSCRT will be
                            worth 130 SCRT, which is a 30% APY.
                        </p>
                        <p>
                            dSCRT includes automatic compounding & private voting for governance. A governance token
                            will be distributed amongst dSCRT users as well
                        </p>
                    </DialogContentText>
                    <DialogTitle id="responsive-dialog-title">{'Purpose'}</DialogTitle>
                    <DialogContentText>
                        dSCRT's purpose is to provide a liquid, fungible token for a user, representing his stake in the
                        network. This token will accrue value, in a similar fashion to PoS staking which will unlock
                        farming, and yield compounding opportunities. The goal is not to optimize APYs for users, but
                        rather:
                        {
                            <p>
                                <li>Automatic compounding of rewards</li>
                                <li>Compounding of rewards without triggering a taxable event (if relevant)</li>
                                <li>
                                    Creating a fungible token which allows double-dipping in DeFi applications while
                                    still accruing network-level staking rewards
                                </li>
                                <li>Minimizing validator risk by spreading delegations out to multiple validators </li>
                                <li>Creating a mechanism for private & secret governance voting</li>
                                <li>
                                    Creating an asset class that accrues network-level staking rewards while still
                                    remaining liquid
                                </li>
                                <li>
                                    Enabling "private staking", where buying dSCRT on secretswap effectively creates
                                    anonymous staking
                                </li>
                            </p>
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Got it!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
