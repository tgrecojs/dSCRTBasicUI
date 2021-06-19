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
    dialogContent: {
        marginTop: theme.spacing(-2),
    },
}));

export default function ActionModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [open, setOpen] = React.useState(false);
    const [amount, setAmount] = React.useState(props.min || 1);
    const [loading, setLoading] = useState();

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
        if (event.target.value !== '') {
            setAmount(event.target.value);
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
                color={props.color || 'primary'}
                onClick={handleOpen}
            >
                {props.text}
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{props.text}</DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    {props.dialogContent}
                    <div>
                        <Slider
                            value={typeof amount === 'number' ? amount : props.min || 0}
                            step={0.1}
                            disabled={isNaN(props.balance)}
                            max={Number(props.balance) / 1e6}
                            onChange={handleSliderChange}
                            style={{ maxWidth: '50%' }}
                            aria-labelledby="input-slider"
                        />
                        <Button
                            color={'primary'}
                            style={{ borderRadius: 10 }}
                            onClick={() => {
                                setAmount(Number(props.balance) / 1e6);
                            }}
                        >
                            max
                        </Button>
                    </div>
                    <div>
                        <Input
                            autoFocus
                            id="name"
                            min={0}
                            value={amount}
                            label={props.label}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            style={{ maxWidth: '25%' }}
                            inputProps={{
                                disabled: isNaN(props.balance),
                                max: Number(props.balance) / 1e6,
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                        {props.label}
                    </div>
                    {props.xrate ? <div>~{(Number(props.xrate) * Number(amount)).toFixed(3)} SCRT</div> : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        disabled={amount < props.min}
                        hidden={loading}
                        onClick={async () => {
                            setLoading(true);
                            await props.action(amount);
                            setLoading(false);
                            handleClose();
                        }}
                        color="primary"
                    >
                        {loading ? <CircularProgress /> : props.text}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
