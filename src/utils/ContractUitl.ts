import {Contract, HexString, Transaction, Web3} from "web3";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ContractUitl {
    public static async invokeContract(contract: Contract<never>, privateKey: string, value: string | number, data: HexString) {
        const web3 = new Web3(contract.provider);
        const wallet = web3.eth.accounts.privateKeyToAccount(privateKey);
        const from = wallet.address;
        const nonce = await web3.eth.getTransactionCount(from, 'pending');
        const transactionObj: Transaction = {
            "from": from,
            "to": contract.options.address,
            "value": value,
            "nonce": nonce,
            "gasPrice": await web3.eth.getGasPrice(),
            "data": data,
        };
        try {
            transactionObj.gas = await web3.eth.estimateGas(transactionObj, 'pending');
            const signedTx = await web3.eth.accounts.signTransaction(transactionObj, privateKey)
            return new Promise<string>((resolve, reject) => {
                web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                    .on("transactionHash", hash => {
                        resolve(hash);
                    })
                    .on("error", e => {
                        reject(e);
                    });
            });
        } catch (e) {
            if (e.innerError === undefined) {
                throw Error(e.message)
            } else {
                throw Error(e.innerError.message)
            }
        }
    }
}
