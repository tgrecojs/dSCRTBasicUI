const {
    SigningCosmWasmClient,
    Secp256k1Pen,
    pubkeyToAddress,
    encodeSecp256k1Pubkey,
    CosmWasmClient,
} = require('secretjs');
const fs = require('fs');

const { Snip20GetBalance, Snip20SetViewingKey, GetSnip20Params } = require('./snip20');

const axios = require('axios');

require('dotenv').config();

const { Bip39, Random } = require('@iov/crypto');

require('dotenv').config();

const createAccount = async () => {
    // Create random address and mnemonic
    const mnemonic = Bip39.encode(Random.getBytes(16)).toString();

    // This wraps a single keypair and allows for signing.
    const signingPen = await Secp256k1Pen.fromMnemonic(mnemonic);

    // Get the public key
    const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey);

    // Get the wallet address
    const accAddress = pubkeyToAddress(pubkey, 'secret');

    // Query the account
    const client = new CosmWasmClient(process.env.SECRET_REST_URL);
    const account = await client.getAccount(accAddress);

    console.log('mnemonic: ', mnemonic);
    console.log('address: ', accAddress);
    console.log('account: ', account);

    return [mnemonic, accAddress, account];
};

const customFees = {
    exec: {
        amount: [{ amount: '250000', denom: 'uscrt' }],
        gas: '1000000',
    },
    init: {
        amount: [{ amount: '500000', denom: 'uscrt' }],
        gas: '2000000',
    },
    upload: {
        amount: [{ amount: '1000000', denom: 'uscrt' }],
        gas: '4000000',
    },
};

const sleep = async (ms) => new Promise((r) => setTimeout(r, ms));

const Instantiate = async (client, initMsg, codeId) => {
    const contract = await client.instantiate(codeId, initMsg, 'My Counter' + Math.ceil(Math.random() * 10000));
    console.log('contract: ', contract);

    const contractAddress = contract.contractAddress;

    console.log(`Address: ${contractAddress}`);

    return contractAddress;
};

const storeCode = async (path, client) => {
    const wasm = fs.readFileSync(path);
    console.log('Uploading contract');
    const uploadReceipt = await client.upload(wasm, {});
    const codeId = uploadReceipt.codeId;
    console.log('codeId: ', codeId);

    const contractCodeHash = await client.restClient.getCodeHashByCodeId(codeId);
    console.log(`Contract hash: ${contractCodeHash}`);

    return [codeId, contractCodeHash];
};

const createCli = async (mnemonic) => {
    const signingPen = await Secp256k1Pen.fromMnemonic(mnemonic || process.env.MNEMONIC);
    const pubkey = encodeSecp256k1Pubkey(signingPen.pubkey);
    const accAddress = pubkeyToAddress(pubkey, 'secret');
    return new SigningCosmWasmClient(
        process.env.SECRET_REST_URL,
        accAddress,
        (data) => signingPen.sign(data),
        signingPen.privkey,
        customFees,
    );
};

export const queryClaim = async ({ secretNetwork, contractAddress, account }) => {
    try {
        return secretNetwork.queryContractSmart(contractAddress, {
            claims: {
                address: account,
                current_time: Math.trunc(Date.now() / 1000),
            },
        });
    } catch (e) {
        console.log(`Failed to query claim ${e}`);
    }
    return null;
};

export const claim = async ({ secretNetwork, contractAddress }) => {
    try {
        return secretNetwork.execute(contractAddress, {
            claim: {},
        });
    } catch (e) {
        console.log(`Failed to claim ${e}`);
    }
    return null;
};

export const deposit = async ({ secretNetwork, amount, stakingContractAddress }) => {
    try {
        return secretNetwork.execute(
            stakingContractAddress,
            {
                stake: {},
            },
            '',
            [{ amount: String(amount), denom: 'uscrt' }],
        );
    } catch (e) {
        console.log(`Failed to deposit ${e}`);
    }
    return null;
};

export const withdraw = async ({ secretNetwork, amount, contractAddress, tokenContractAddress }) => {
    try {
        return secretNetwork.execute(tokenContractAddress, {
            send: {
                recipient: contractAddress,
                amount: String(amount),
                msg: 'eyJ3aXRoZHJhdyI6IHt9fQ',
            },
        });
    } catch (e) {
        console.log(`Failed to withdraw ${e}`);
    }
    return null;
};

const viewVote = async (secretNetwork, proposalId, viewingKey, address, tokenContract) => {
    try {
        return secretNetwork.queryContractSmart(tokenContract, {
            view_vote: { proposal: proposalId, key: viewingKey, address },
        });
    } catch (e) {
        console.log(`Failed to vote ${e}`);
    }
    return null;
};

const vote = async (secretNetwork, proposalId, voteOption, tokenContract) => {
    try {
        return secretNetwork.execute(tokenContract, {
            vote: { proposal: proposalId, vote: voteOption },
        });
    } catch (e) {
        console.log(`Failed to vote ${e}`);
    }
    return null;
};

const KillSwitchUnbond = async (secretNetwork, stakingContractAddress) => {
    try {
        return secretNetwork.execute(stakingContractAddress, {
            kill_switch_unbond: {},
        });
    } catch (e) {
        console.log(`Failed to withdraw ${e}`);
    }
    return null;
};

const KillSwitchOpenWithdraws = async (secretNetwork, stakingContractAddress) => {
    try {
        return secretNetwork.execute(stakingContractAddress, {
            kill_switch_open_withdraws: {},
        });
    } catch (e) {
        console.log(`Failed to withdraw ${e}`);
    }
    return null;
};

const tallyVote = async (secretNetwork, proposalId, votingContractAddress) => {
    try {
        return secretNetwork.execute(votingContractAddress, {
            tally: { proposal: proposalId },
        });
    } catch (e) {
        console.log(`Failed to withdraw ${e}`);
    }
    return null;
};

const createVote = async (secretNetwork, proposalId, votingContractAddress) => {
    try {
        return secretNetwork.execute(votingContractAddress, {
            init_vote: { voting_time: 1_000_000, proposal: proposalId },
        });
    } catch (e) {
        console.log(`Failed to withdraw ${e}`);
    }
    return null;
};

const set_voting_contract = async (secretNetwork, contractAddress, votingContractAddress, votingContractHash) => {
    try {
        return secretNetwork.execute(contractAddress, {
            set_voting_contract: {
                voting_contract: {
                    address: votingContractAddress,
                    hash: votingContractHash,
                },
                gov_token: false,
            },
        });
    } catch (e) {
        console.log(`Failed to set voting contract ${e}`);
    }
    return null;
};

export const queryExchangeRate = async (secretNetwork, stakingContractAddress) => {
    try {
        return secretNetwork.queryContractSmart(stakingContractAddress, {
            exchange_rate: {},
        });
    } catch (e) {
        console.log('Fail to get rate from proxy contract');
        console.log(e);
    }
    return null;
};
//
// const validateTx = async (secretNetwork, txHash) => {
//     let max_retry = 30;
//     while (max_retry > 0) {
//         await sleep(1000);
//         max_retry--;
//         try {
//             process.stdout.clearLine();
//             process.stdout.cursorTo(0);
//             process.stdout.write('polling: ' + (30 - max_retry));
//             const tx = await secretNetwork.restClient.txById(txHash);
//
//             return tx;
//         } catch (err) {
//             if (err.isAxiosError && err.response && err.response.status !== 404) {
//                 console.error(err.response.data);
//             } else if (!err.isAxiosError) {
//                 console.error(err.message);
//             }
//         }
//     }
//     return null;
// };
//
// const getTokenAddresses = async (secretNetwork, tokenCodeId) => {
//     const result = await secretNetwork.getContracts(tokenCodeId);
//
//     console.log(result);
//
//     let gTokenAddress;
//     let tokenAddress;
//
//     if (result[0].label.includes('-gov')) {
//         tokenAddress = result[1].address;
//         gTokenAddress = result[0].address;
//     } else {
//         tokenAddress = result[0].address;
//         gTokenAddress = result[1].address;
//     }
//
//     return [tokenAddress, gTokenAddress];
// };
//
// const getValidator = async () => {
//     const result = await axios.get(`${process.env.SECRET_REST_URL}/staking/validators`);
//
//     if (result.status !== 200) {
//         throw new Error('Failed to get validators');
//     }
//
//     return result.data.result[0].operator_address;
// };
