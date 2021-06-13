//import * from 'react';

import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import { useSecret } from '../hooks/useSecret';
import VoteButton from './VoteButton';

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

export const Voting = () => {
    const { proposals, votes, dScrtDisabled } = useSecret();

    const classes = useStyles();
    return (
        <List className={classes.root}>
            {proposals.length > 0 ? (
                proposals.map((proposal) => {
                    return (
                        <ListItem key={proposal}>
                            <ListItemText primary={proposal.content.value.title} secondary={proposal.voting_end_time} />
                            {/*<ListItemText*/}
                            {/*    primary={timeDifference(Number(claim.withdraw.available_time) * 1000, Date.now())}*/}
                            {/*    secondary={'till available'}*/}
                            {/*    classes={{ root: classes.listItemRootOverride }}*/}
                            {/*/>*/}
                            {dScrtDisabled ? (
                                <ListItemText primary="Unlock to see your vote" secondary={'Your vote'} />
                            ) : votes && votes[Number(proposal.id)] ? (
                                <ListItemText
                                    primary={votes[Number(proposal.id)].view_vote.vote}
                                    secondary={'Your vote'}
                                />
                            ) : (
                                <ListItemText primary="Not voted" secondary={'Your vote'} />
                            )}
                            <div className={classes.listItemRootOverride}>
                                <VoteButton
                                    proposalId={proposal.id}
                                    proposalTitle={proposal.content.value.title}
                                    content={proposal.content.value.description}
                                />
                            </div>
                        </ListItem>
                    );
                })
            ) : (
                <ListItem>No proposals found</ListItem>
            )}
        </List>
    );
};
