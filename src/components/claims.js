//import * from 'react';

import { useEffect, useState } from 'react';
import { queryClaim } from '../cash';
import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import { queryClaims, useSecret } from '../hooks/useSecret';
import { timeDifference } from '../utils/strings';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    listItemRootOverride: {
        flex: 'none',
        paddingRight: 4,
    },
}));

const MINUTE_MS = 120000;

export const Claims = () => {
    const [claims, setClaims] = useState([]);
    const { secretjs, account } = useSecret();

    useEffect(() => {
        const stuff = async () => {
            if (secretjs && account) {
                console.log('getting claims');
                const claims = await queryClaims(secretjs, account);

                setClaims(claims.pending_claims.pending);
            }
        };

        stuff();
        const interval = setInterval(stuff, MINUTE_MS);

        return () => clearInterval(interval);
    }, [account, secretjs]);

    const classes = useStyles();

    return (
        <List className={classes.root}>
            {claims.length > 0 ? (
                claims.map((claim) => {
                    return (
                        <ListItem key={claim.withdraw.available_time}>
                            <ListItemText
                                primary={`${
                                    new Intl.NumberFormat('en-US', {}).format(
                                        +Number(claim.withdraw.coins.amount) / 1e6,
                                    ) +
                                    ' ' +
                                    'SCRT'
                                }`}
                                secondary={new Date(Number(claim.withdraw.available_time) * 1000).toISOString()}
                            />
                            <ListItemText
                                primary={timeDifference(Number(claim.withdraw.available_time) * 1000, Date.now())}
                                secondary={'till available'}
                                classes={{ root: classes.listItemRootOverride }}
                            />
                        </ListItem>
                    );
                })
            ) : (
                <ListItem>No withdraws found</ListItem>
            )}
        </List>
    );
};
