import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {
    Backdrop,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fade,
    Input,
    TextField,
} from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { useSecret } from '../hooks/useSecret';

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
    const [amount, setAmount] = React.useState(props.min || 1);
    const { scrtBalance } = useSecret();

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
        if (amount < 1) {
            setAmount(1);
        } else if (amount > scrtBalance) {
            setAmount(scrtBalance);
        }
    };

    const handleInputChange = (event) => {
        if (event.target.value !== '' && Number(event.target.value) >= 1) {
            setAmount(Number(event.target.value));
        }
        //setAmount(event.target.value === '' ? '' : Number(event.target.value));
    };

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

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{props.text}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Select an amount</DialogContentText>
                    <Slider
                        value={typeof amount === 'number' ? amount : 1}
                        min={props.min || 1}
                        step={0.1}
                        disabled={isNaN(scrtBalance)}
                        max={Number(scrtBalance) / 1e6}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                    />
                    <Input
                        autoFocus
                        margin="dense"
                        id="name"
                        value={amount}
                        label={props.label}
                        fullWidth
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 0.1,
                            min: props.min || 1,
                            disabled: isNaN(scrtBalance),
                            max: Number(scrtBalance) / 1e6,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={async () => {
                            await props.action(amount);
                            handleClose();
                        }}
                        color="primary"
                    >
                        {props.text}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
