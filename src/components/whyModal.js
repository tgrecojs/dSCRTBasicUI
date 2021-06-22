import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function WhyModal() {
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
                GETTING STARTED
            </Button>
            <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">{'dSCRT 101'}</DialogTitle>
                <DialogContent>
                    <DialogTitle id="responsive-dialog-title">{'How to get dSCRT'}</DialogTitle>
                    <DialogContentText>
                        To get dSCRT you can either stake SCRT directly from this page or trade for it on SecretSwap
                    </DialogContentText>
                    <DialogTitle id="responsive-dialog-title">{'Deposits'}</DialogTitle>
                    <DialogContentText>
                        Depositing SCRT is similar to staking, but when depositing there is a 0.8% deposit fee. This fee
                        will help fund the development of dSCRT, as well as become a source for resources allocated to
                        the governance token holders
                    </DialogContentText>
                    <DialogTitle id="responsive-dialog-title">{'Withdraws'}</DialogTitle>
                    <DialogContentText>
                        the dSCRT contract stakes for you, but when withdrawing it must still account for unbonding. If
                        you wish to withdraw your stake, there is a 21 day unbonding period. After the unbonding period,
                        your staked SCRT will appear in your account. If this did not happen, you can manually trigger a
                        claim, which will transfer the funds to your account.
                    </DialogContentText>

                    <DialogTitle id="responsive-dialog-title">{'Redelegating'}</DialogTitle>
                    <DialogContentText>
                        Unfortunately there is no way to redelegate tokens staked in conventional methods to dSCRT. You
                        must wait the 21 day unbonding period before you can restake your tokens into dSCRT.
                    </DialogContentText>
                    <DialogTitle id="responsive-dialog-title">{'Validators'}</DialogTitle>
                    <DialogContentText>
                        dSCRT is meant to be an inclusive, network-wide solution. The contracts support multiple
                        validators, where the staked amounts automatically balance among the different validators.
                    </DialogContentText>
                    <DialogTitle id="responsive-dialog-title">{'$CASH'}</DialogTitle>
                    <DialogContentText>
                        $CASH is the dSCRT governance token. dSCRT aims to be a community-governed service. The number
                        of validators (and handling mis-behaving validators), developing new features (liqudity pools
                        that allow immediate withdrawals, for example) are all meant to be governed by the community. As
                        such, $CASH, is the dSCRT governance token. It will be distributed amongst dSCRT holders and
                        traders at a later time
                    </DialogContentText>
                    <DialogTitle id="responsive-dialog-title">{'Voting'}</DialogTitle>
                    <DialogContentText>
                        When you stake with dSCRT you do not give up your voting rights. Voting for dSCRT holders is
                        handled by the dSCRT Secret Contract - all holders of dSCRT have a private vote, the result of
                        which will determine how dSCRT votes on-chain for each governance proposal
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
