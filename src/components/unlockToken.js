import { useSecret } from '../hooks/useSecret';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
    button: {
        flexGrow: 1,
    },
});

export const UnlockToken = () => {
    const classes = useStyles();
    const { refreshBalances } = useSecret();
    const [loading, setLoading] = useState(false);

    return (
        <>
            <Button
                color={'primary'}
                variant={'contained'}
                className={classes.button}
                onClick={async () => {
                    await window.keplr.suggestToken('secret-2', 'secret1y5x6yrc4suagjvd3c6swjnv3r78rkrn2250l2e');
                    setLoading(true);
                    await refreshBalances();
                    setLoading(false);
                }}
            >
                {!loading ? 'Unlock dSCRT' : <CircularProgress color={'secondary'} />}
            </Button>
        </>
    );
};
