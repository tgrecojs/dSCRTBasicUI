import { useSecret } from '../hooks/useSecret';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { tokenContract } from '../utils/consts';

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
                    await window.keplr.suggestToken('secret-2', tokenContract);
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
