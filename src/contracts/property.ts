import {Address, Contract, ContractExecutionError, Web3Context} from "web3";
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

    public async add(fromAddr: Address, name: string, value: number, description: string): Promise<string> {
        if (this._contract.methods.add === undefined) {
            throw new Error("provided PropertyABI is missing add method");
        }
        try {
            const receipt = await this._contract.methods.add(name, value, description).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async applyUpdate(fromAddr: Address, name: string, value: number, reason: string): Promise<string> {
        if (this._contract.methods.applyUpdate === undefined) {
            throw new Error("provided PropertyABI is missing applyUpdate method");
        }
        try {
            const receipt = await this._contract.methods.applyUpdate(name, value, reason).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async vote4Update(fromAddr: Address, name: string, voteResult: number): Promise<string> {
        if (this._contract.methods.vote4Update === undefined) {
            throw new Error("provided PropertyABI is missing vote4Update method");
        }
        try {
            const receipt = await this._contract.methods.vote4Update(name, voteResult).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
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

    public async getValue(name: string): Promise<number> {
        if (this._contract.methods.getValue === undefined) {
            throw new Error('provided propertyABI is missing getValue method');
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
            throw new Error('provided propertyABI is missing exist method');
        }
        return this._contract.methods.exist(name).call();
    }

    public async existUnconfirmed(name: string): Promise<boolean> {
        if (this._contract.methods.existUnconfirmed === undefined) {
            throw new Error('provided propertyABI is missing existUnconfirmed method');
        }
        return this._contract.methods.existUnconfirmed(name).call();
    }
}