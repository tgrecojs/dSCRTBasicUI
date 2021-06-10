import { useEffect, useState, createContext, useContext } from 'react';
import { getFromLS, setToLS } from '../utils/storage';
import { SigningCosmWasmClient } from 'secretjs';
import { getViewingKey, Snip20GetBalance } from '../snip20';
import { deposit, queryClaim, queryExchangeRate, withdraw } from '../cash';

export const stakeSCRT = async (secretjs, amountScrt) => {
    await deposit({
        secretNetwork: secretjs,
        amount: Number(amountScrt) * 1e6,
        stakingContractAddress: 'secret1ajjtydcgzjf8wg9m0y454dq72nk9lajrhkuj85',
    });
};

export const withdrawDSCRT = async (secretjs, amountDscrt) => {
    await withdraw({
        secretNetwork: secretjs,
        amount: Number(amountDscrt) * 1e6,
        contractAddress: 'secret1ajjtydcgzjf8wg9m0y454dq72nk9lajrhkuj85',
        tokenContractAddress: 'secret1y5x6yrc4suagjvd3c6swjnv3r78rkrn2250l2e',
    });
};

export const queryClaims = async (secretjs, account) => {
    return await queryClaim({
        secretNetwork: secretjs,
        contractAddress: 'secret1ajjtydcgzjf8wg9m0y454dq72nk9lajrhkuj85',
        account,
    });
};

const XRATE_REFRESH_TIME = 20000;
const BALANCE_REFRESH_TIME = 10000;

const SecretJSContext = createContext({
    secretjs: undefined,
    secretLoaded: undefined,
    getSnip20Balance: undefined,
    account: undefined,
    exchangeRate: undefined,
});

export const UNLOCK_TOKEN = 'UNLOCK';

export const SecretContext = ({ children }) => {
    const [secretjs, setSecretJS] = useState(undefined);
    const [account, setLocalAccount] = useState('');
    const [secretLoaded, setSecretLoaded] = useState(false);
    const [exchangeRate, setExchangeRate] = useState(undefined);
    const [scrtBalance, setScrtBalance] = useState(undefined);
    const [dscrtBalance, setDScrtBalance] = useState(undefined);
    const [dScrtDisabled, setdScrtDisabled] = useState(true);
    const [claims, setClaims] = useState([]);

    const setAccount = (account) => {
        setToLS('account', account);
        setLocalAccount(account);
    };

    const getAccount = () => {
        return getFromLS('account');
    };

    const getClaims = async () => {
        if (secretjs && account) {
            console.log('getting claims');
            const claims = await queryClaims(secretjs, account);

            setClaims(claims.pending_claims.pending);
        }
    };

    const getDScrtBalance = async () => {
        if (secretjs) {
            const viewingKey = await getViewingKey({
                keplr: window.keplr,
                chainId: 'secret-2',
                address: 'secret1y5x6yrc4suagjvd3c6swjnv3r78rkrn2250l2e',
            });

            if (!viewingKey) {
                setDScrtBalance(UNLOCK_TOKEN);
                return;
            }

            let result = await Snip20GetBalance({
                secretjs: secretjs,
                address: account,
                key: viewingKey,
                token: 'secret1y5x6yrc4suagjvd3c6swjnv3r78rkrn2250l2e',
            });
            setDScrtBalance(result);

            if (!isNaN(result)) {
                if (dScrtDisabled) {
                    setdScrtDisabled(false);
                }
            } else {
                setdScrtDisabled(true);
            }
        }
    };

    const getExchangeRate = async () => {
        if (secretjs) {
            let exchange_rate = await queryExchangeRate(secretjs, 'secret1ajjtydcgzjf8wg9m0y454dq72nk9lajrhkuj85');

            if (exchange_rate?.exchange_rate?.rate && !isNaN(exchange_rate?.exchange_rate?.rate)) {
                setExchangeRate(exchange_rate.exchange_rate.rate);
                console.log(`set xrate ${exchange_rate.exchange_rate.rate}`);
            }
        }
    };

    const getScrtBalance = async () => {
        if (secretjs) {
            let accounts = await secretjs.getAccount(account);

            if (!isNaN(accounts.balance?.length > 0 && accounts?.balance[0]?.amount)) {
                setScrtBalance(accounts.balance[0].amount);
            }
        }
    };

    const refreshBalances = async () => {
        await Promise.all([getScrtBalance(), getDScrtBalance()]);
    };

    useEffect(() => {
        getScrtBalance();
        getExchangeRate();
        getDScrtBalance();
        getClaims();

        const interval = setInterval(getExchangeRate, XRATE_REFRESH_TIME);
        const interval2 = setInterval(getScrtBalance, BALANCE_REFRESH_TIME);
        const interval3 = setInterval(getDScrtBalance, BALANCE_REFRESH_TIME);

        return () => {
            clearInterval(interval);
            clearInterval(interval2);
            clearInterval(interval3);
        };
    }, [secretjs, account]);

    useEffect(() => {
        const setupSecretJS = async () => {
            console.log('hello');
            const sleep = (ms) => new Promise((accept) => setTimeout(accept, ms));

            // Wait for Keplr to be injected to the page
            while (!window.keplr && !window.getOfflineSigner && !window.getEnigmaUtils) {
                await sleep(10);
            }
            await window.keplr.enable('secret-2');

            // Setup SecretJS with Keplr's OfflineSigner
            // This pops-up a window for the user to sign on each tx we sent
            let keplrOfflineSigner = window.getOfflineSigner('secret-2');
            const accounts = await keplrOfflineSigner.getAccounts();

            let secretjs = new SigningCosmWasmClient(
                'https://bridge-api-manager.azure-api.net/',
                accounts[0].address,
                keplrOfflineSigner,
                window.getEnigmaUtils('secret-2'),
                {
                    // 300k - Max gas units we're willing to use for init
                    init: {
                        amount: [{ amount: '1', denom: 'uscrt' }],
                        gas: '1200000',
                    },
                    // 300k - Max gas units we're willing to use for exec
                    exec: {
                        amount: [{ amount: '1', denom: 'uscrt' }],
                        gas: '1200000',
                    },
                },
            );
            setAccount(accounts[0].address);
            setSecretJS(secretjs);
            setSecretLoaded(true);
        };

        setupSecretJS();
    }, []);

    return (
        <SecretJSContext.Provider
            value={{
                secretjs,
                secretLoaded,
                dscrtBalance,
                dScrtDisabled,
                account,
                exchangeRate,
                scrtBalance,
                claims,
                getClaims,
                refreshBalances,
            }}
        >
            {children}
        </SecretJSContext.Provider>
    );
    // return {
    //     secretjs,
    //     secretLoaded,
    //     getSnip20Balance,
    //     account,
    //     exchangeRate,
    // };
};

export const useSecret = () => useContext(SecretJSContext);