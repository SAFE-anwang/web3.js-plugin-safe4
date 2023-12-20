import {Address, Contract, Web3Context} from "web3";
import {PropertyABI} from "../safe4_abi";
import {PropertyContractAddr} from "../safe4_address";
import {PropertyInfo, UnconfirmedPropertyInfo} from "../types/property";

export class Property {
    private readonly _contract: Contract<typeof PropertyABI>

    public constructor() {
        this._contract = new Contract(PropertyABI, PropertyContractAddr);
    }

    public link(parentContext: Web3Context) {
        this._contract.link(parentContext);
    }

    public async add(fromAddr: Address, name: string, value: string, description: string): Promise<string> {
        if (this._contract.methods.add === undefined) {
            throw new Error("provided PropertyABI is missing add method");
        }
        return new Promise<string>((resolve, reject) => {
            this._contract.methods.add(name, value, description).send({from: fromAddr})
                .on("transactionHash", hash => {
                    resolve(hash);
                })
                .on("error", e => {
                    reject(e.innerError);
                });
        });
    }

    public async applyUpdate(fromAddr: Address, name: string, value: string, reason: string): Promise<string> {
        if (this._contract.methods.applyUpdate === undefined) {
            throw new Error("provided PropertyABI is missing applyUpdate method");
        }
        return new Promise<string>((resolve, reject) => {
            this._contract.methods.applyUpdate(name, value, reason).send({from: fromAddr})
                .on("transactionHash", hash => {
                    resolve(hash);
                })
                .on("error", e => {
                    reject(e.innerError);
                });
        });
    }

    public async vote4Update(fromAddr: Address, name: string, voteResult: number): Promise<string> {
        if (this._contract.methods.vote4Update === undefined) {
            throw new Error("provided PropertyABI is missing vote4Update method");
        }
        return new Promise<string>((resolve, reject) => {
            this._contract.methods.vote4Update(name, voteResult).send({from: fromAddr})
                .on("transactionHash", hash => {
                    resolve(hash);
                })
                .on("error", e => {
                    reject(e.innerError);
                });
        });
    }

    public async getInfo(name: string): Promise<PropertyInfo> {
        if (this._contract.methods.getInfo === undefined) {
            throw new Error("provided PropertyABI is missing getInfo method");
        }
        return this._contract.methods.getInfo(name).call();
    }

    public async getUnconfirmedInfo(name: string): Promise<UnconfirmedPropertyInfo> {
        if (this._contract.methods.getUnconfirmedInfo === undefined) {
            throw new Error("provided PropertyABI is missing getUnconfirmedInfo method");
        }
        return this._contract.methods.getUnconfirmedInfo(name).call();
    }

    public async getValue(name: string): Promise<bigint> {
        if (this._contract.methods.getValue === undefined) {
            throw new Error('provided PropertyABI is missing getValue method');
        }
        return this._contract.methods.getValue(name).call();
    }

    public async getAll(): Promise<PropertyInfo[]> {
        if (this._contract.methods.getAll === undefined) {
            throw new Error("provided PropertyABI is missing getAll method");
        }
        return this._contract.methods.getAll().call();
    }

    public async getAllUnconfirmed(): Promise<UnconfirmedPropertyInfo[]> {
        if (this._contract.methods.getAllUnconfirmed === undefined) {
            throw new Error("provided PropertyABI is missing getAllUnconfirmed method");
        }
        return this._contract.methods.getAllUnconfirmed().call();
    }

    public async exist(name: string): Promise<boolean> {
        if (this._contract.methods.exist === undefined) {
            throw new Error('provided PropertyABI is missing exist method');
        }
        return this._contract.methods.exist(name).call();
    }

    public async existUnconfirmed(name: string): Promise<boolean> {
        if (this._contract.methods.existUnconfirmed === undefined) {
            throw new Error('provided PropertyABI is missing existUnconfirmed method');
        }
        return this._contract.methods.existUnconfirmed(name).call();
    }
}