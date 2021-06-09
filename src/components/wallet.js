//import * from 'react';

import { useEffect, useState } from 'react';
import { getViewingKey, Snip20GetBalance } from '../snip20';
import { useSecret } from '../hooks/useSecret';

export const Wallet = () => {
    const { secretjs } = useSecret();
    const [account, setAccount] = useState(undefined);
    const [derivBalance, setDerivBalance] = useState(undefined);
    const [derivBalanceLoading, setderivBalanceLoading] = useState(true);

    useEffect(() => {
        const stuff = async () => {
            const account = await secretjs.getAccount(secretjs.senderAddress);
            setAccount(account);
        };

        if (secretjs) {
            stuff();
        }
    }, [secretjs]);

    useEffect(() => {
        const stuff = async () => {
            const viewingKey = await getViewingKey({
                keplr: window.keplr,
                chainId: 'secret-2',
                address: 'secret1y5x6yrc4suagjvd3c6swjnv3r78rkrn2250l2e',
            });

            if (!viewingKey) {
                await window.keplr.suggestToken('secret-2', 'secret1y5x6yrc4suagjvd3c6swjnv3r78rkrn2250l2e');
            }

            setderivBalanceLoading(true);

            const derivBalance = await Snip20GetBalance({
                secretjs: secretjs,
                address: account.address,
                key: viewingKey,
                token: 'secret1y5x6yrc4suagjvd3c6swjnv3r78rkrn2250l2e',
            });
            console.log(derivBalance);
            setDerivBalance(derivBalance);
            setderivBalanceLoading(false);
        };

        if (secretjs && account) {
            stuff();
        }
    }, [secretjs, account]);

    let accountName = <h1>Account: unknown</h1>;
    if (account) {
        accountName = <h1>Account: {account.address}</h1>;
    }
    let balance = <>Balance: 0 SCRT</>;
    try {
        balance = <>Balance: {new Intl.NumberFormat('en-US', {}).format(+account.balance[0].amount / 1e6)} SCRT</>;
    } catch (e) {}

    let dbalance = <p>Balance: 0 dSCRT</p>;
    if (derivBalanceLoading) {
        dbalance = <p> loading... </p>;
    } else {
        try {
            dbalance = <p>Balance: {new Intl.NumberFormat('en-US', {}).format(+derivBalance / 1e6)} dSCRT</p>;
        } catch (e) {}
    }

    return (
        <>
            {accountName}
            {balance}
            {dbalance}
        </>
    );
};
