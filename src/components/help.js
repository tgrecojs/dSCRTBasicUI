import {Typography} from "@material-ui/core";

export const Help = (props) => {
    return (<>
        <Typography variant="h4" component="h1" gutterBottom>
            What is dSCRT?
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
            dSCRT is a staking derivative for the Secret Network.
            The purpose is to provide a liquid, fungible token for a user, representing his stake in the network.
            This token will accrue value, in a similar fashion to PoS staking which will unlock farming, and yield compounding opportunities.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
            The goal is not to optimize APYs for users, but rather:
            <li> Automatic compounding of rewards </li>
            <li>Compounding of rewards without triggering a taxable event (if relevant)</li>
            <li>Minimizing validator risk by spreading delegations out to multiple validators</li>
            <li>Creating a mechanism for private governance voting</li>
            <li>Creating a fungible token which allows double-dipping in DeFi applications while still accruing network-level staking rewards</li>
            <li>Creating an asset class that accrues network-level staking rewards while still remaining liquid</li>
            <li>Allow “private staking”, whereby you can buy dSCRT on the market in a privacy preserving way without leaving a traceable transaction</li>
        </Typography>
        </>);
}
