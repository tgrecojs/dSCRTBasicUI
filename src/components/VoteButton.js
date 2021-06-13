import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Input,
    LinearProgress,
} from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { useSecret } from '../hooks/useSecret';

const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: 2,
        flex: 1,
    },
    loader: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    modalWrapper: {},
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export default function VoteButton(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [open, setOpen] = React.useState(false);
    const [amount, setAmount] = React.useState(props.min || 1);
    const [loading, setLoading] = useState();
    const { vote, dscrtBalance, dScrtDisabled } = useSecret();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSliderChange = (event, newValue) => {
        setAmount(newValue);
    };

    const handleBlur = () => {
        if (amount > props.balance) {
            setAmount(props.balance);
        }
    };

    const handleInputChange = (event) => {
        if (event.target.value !== '' && Number(event.target.value) >= (props.min || 1)) {
            setAmount(Number(event.target.value));
        }
        //setAmount(event.target.value === '' ? '' : Number(event.target.value));
    };

    return (
        <div className={classes.modalWrapper}>
            <Button
                className={classes.button}
                disabled={props.disabled || isNaN(props?.proposalId)}
                size="large"
                variant="contained"
                color={props.color || 'primary'}
                onClick={handleOpen}
            >
                Vote
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Proposal #{props.proposalId}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{props.proposalTitle}</DialogContentText>

                    <DialogContentText>{props.content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <DialogTitle className={classes.button}>Select Vote</DialogTitle>
                    {loading ? (
                        <div className={classes.loader}>
                            <LinearProgress />
                        </div>
                    ) : (
                        <>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button
                                disabled={amount < props.min}
                                hidden={loading}
                                onClick={async () => {
                                    setLoading(true);
                                    await vote(props.proposalId, 'Abstain');
                                    setLoading(false);
                                    handleClose();
                                }}
                                color="primary"
                            >
                                Abstain
                            </Button>
                            <Button
                                disabled={amount < props.min}
                                hidden={loading}
                                onClick={async () => {
                                    setLoading(true);
                                    await vote(props.proposalId, 'NoWithVeto');
                                    setLoading(false);
                                    handleClose();
                                }}
                                color="primary"
                            >
                                No With Veto
                            </Button>
                            <Button
                                disabled={amount < props.min}
                                hidden={loading}
                                onClick={async () => {
                                    setLoading(true);
                                    await vote(props.proposalId, 'No');
                                    setLoading(false);
                                    handleClose();
                                }}
                                color="primary"
                            >
                                No
                            </Button>
                            <Button
                                disabled={amount < props.min}
                                hidden={loading}
                                onClick={async () => {
                                    setLoading(true);
                                    await vote(props.proposalId, 'Yes');
                                    setLoading(false);
                                    handleClose();
                                }}
                                color="primary"
                            >
                                Yes
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}
