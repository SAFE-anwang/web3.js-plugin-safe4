import {Address, Contract, Web3Context} from "web3";
import {Safe3ABI} from "../safe4_abi";
import {Safe3ContractAddr} from "../safe4_address";
import {Safe3Info, Safe3LockInfo} from "../types/safe3";

export class Safe3 {
    private readonly _contract: Contract<typeof Safe3ABI>

    public constructor() {
        this._contract = new Contract(Safe3ABI, Safe3ContractAddr);
    }

    public link(parentContext: Web3Context) {
        this._contract.link(parentContext);
    }

    public async redeemAvailable(fromAddr: Address, pubkey: string, sig: string): Promise<string> {
        if (this._contract.methods.redeemAvailable === undefined) {
            throw new Error("provided Safe3ABI is missing redeemAvailable method");
        }
        return new Promise<string>((resolve, reject) => {
            this._contract.methods.redeemAvailable(pubkey, sig).send({from: fromAddr})
                .on("transactionHash", hash => {
                    resolve(hash);
                })
                .on("error", e => {
                    reject(e.innerError);
                });
        });
    }

    public async redeemLocked(fromAddr: Address, pubkey: string, sig: string, enode: string): Promise<string> {
        if (this._contract.methods.redeemLocked === undefined) {
            throw new Error("provided Safe3ABI is missing redeemLocked method");
        }
        return new Promise<string>((resolve, reject) => {
            this._contract.methods.redeemLocked(pubkey, sig, enode).send({from: fromAddr})
                .on("transactionHash", hash => {
                    resolve(hash);
                })
                .on("error", e => {
                    reject(e.innerError);
                });
        });
    }

    public async getAvailable(safe3Addr: string): Promise<Safe3Info> {
        if (this._contract.methods.getAvailable === undefined) {
            throw new Error("provided Safe3ABI is missing getAvailable method");
        }
        return this._contract.methods.getAvailable(safe3Addr).call();
    }

    public async getLocked(safe3Addr: string): Promise<Safe3LockInfo[]> {
        if (this._contract.methods.getLocked === undefined) {
            throw new Error("provided Safe3ABI is missing getLocked method");
        }
        return this._contract.methods.getLocked(safe3Addr).call();
    }

    public async getAllAvailable(): Promise<Safe3Info[]> {
        if (this._contract.methods.getAllAvailable === undefined) {
            throw new Error('provided Safe3ABI is missing getAllAvailable method');
        }
        return this._contract.methods.getAllAvailable().call();
    }

    public async getAllLocked(): Promise<Safe3LockInfo[]> {
        if (this._contract.methods.getAllLocked === undefined) {
            throw new Error("provided Safe3ABI is missing getAllLocked method");
        }
        return this._contract.methods.getAllLocked().call();
    }

    public async getKeyIDFromPubkey(pubkey: string): Promise<string> {
        if (this._contract.methods.getKeyIDFromPubkey === undefined) {
            throw new Error("provided Safe3ABI is missing getKeyIDFromPubkey method");
        }
        return this._contract.methods.getKeyIDFromPubkey(pubkey).call();
    }

    public async getKeyIDFromAddress(safe3Addr: string): Promise<string> {
        if (this._contract.methods.getKeyIDFromAddress === undefined) {
            throw new Error("provided Safe3ABI is missing getKeyIDFromAddress method");
        }
        return this._contract.methods.getKeyIDFromAddress(safe3Addr).call();
    }

    public async getSafe3Addr(pubkey: string): Promise<string> {
        if (this._contract.methods.getSafe3Addr === undefined) {
            throw new Error("provided Safe3ABI is missing getSafe3Addr method");
        }
        return this._contract.methods.getSafe3Addr(pubkey).call();
    }

    public async getSafe4Addr(pubkey: string): Promise<string> {
        if (this._contract.methods.getSafe4Addr === undefined) {
            throw new Error("provided Safe3ABI is missing getSafe4Addr method");
        }
        return this._contract.methods.getSafe4Addr(pubkey).call();
    }
}