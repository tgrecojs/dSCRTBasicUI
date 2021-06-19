import { useEffect, useState } from 'react';
import axios from 'axios';
import { stakingContract } from '../utils/consts';

const MINUTE_MS = 60000;

export const useTVL = () => {
    const [tvl, setTVL] = useState(undefined);

    useEffect(() => {
        const getTVL = async () => {
            try {
                let result = await axios.get(
                    `https://binance.node.enigma.co/distribution/delegators/${stakingContract}/rewards`,
                );
                if (result.status !== 200) {
                    throw new Error('Failed to get proposal');
                }
                const rewards = result.data.result.total[0].amount;

                console.log(`got rewards: ${rewards}`);

                result = await axios.get(
                    `https://binance.node.enigma.co/staking/delegators/${stakingContract}/delegations`,
                );
                if (result.status !== 200) {
                    throw new Error('Failed to get proposal');
                }

                let balance = result.data.result[0].balance.amount;
                console.log(`got staked balance: ${balance}`);

                balance = Number(balance) + Number(rewards);

                setTVL(String(balance));
            } catch (e) {
                console.log(`Failed to get proposal data ${e}`);
            }
            return null;
        };

        getTVL();
        const interval = setInterval(getTVL, MINUTE_MS);

        return () => clearInterval(interval);
    }, []);

    return [tvl];
};
