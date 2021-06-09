import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { ActionButton } from './actionButton';
import Button from '@material-ui/core/Button';
import { Backdrop, Fade, Grid, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    button: {
        flexGrow: '1',
        width: '100%',
    },
    modalWrapper: {
        flexGrow: '1',
        width: '100%',
    },
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

export default function ActionModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [open, setOpen] = React.useState(false);
    const [amount, setAmount] = React.useState(undefined);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <Fade in={open}>
            <div className={classes.paper}>
                <h2 id="simple-modal-title">{props.text}</h2>
                <p id="simple-modal-description">Select an amount</p>

                <TextField
                    id="standard-basic"
                    label="SCRT"
                    value={amount}
                    onChange={(event) => {
                        setAmount(event.target.value);
                    }}
                />
                <Button color="primary" onClick={() => props.action(amount)}>
                    {props.text}
                </Button>
            </div>
        </Fade>
    );

    return (
        <div className={classes.modalWrapper}>
            <Button
                className={classes.button}
                disabled={props.disabled}
                size="large"
                variant="contained"
                color="primary"
                onClick={handleOpen}
            >
                {props.text}
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {body}
            </Modal>
        </div>
    );
}
