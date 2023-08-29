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

    public async add(name: string, value: number, description: string, fromAddr: Address) {
        if(this._contract.methods.add === undefined) {
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

    public async applyUpdate(name: string, value: number, reason: string, fromAddr: Address) {
        if(this._contract.methods.applyUpdate === undefined) {
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

    public async vote4Update(name: string, voteResult: number, fromAddr: Address) {
        if(this._contract.methods.vote4Update === undefined) {
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
        if(this._contract.methods.getInfo === undefined) {
            throw new Error("provided PropertyABI is missing getInfo method");
        }
        return this._contract.methods.getInfo(name).call();
    }

    public async getUnconfirmedInfo(name: string): Promise<UnconfirmedPropertyInfo> {
        if(this._contract.methods.getUnconfirmedInfo === undefined) {
            throw new Error("provided PropertyABI is missing getUnconfirmedInfo method");
        }
        return this._contract.methods.getUnconfirmedInfo(name).call();
    }

    public async getValue(name: string): Promise<number> {
        if(this._contract.methods.getValue === undefined) {
            throw new Error('provided propertyABI is missing getValue method');
        }
        return this._contract.methods.getValue(name).call();
    }

    public async getAllConfirmed(): Promise<PropertyInfo[]> {
        if(this._contract.methods.getAllConfirmed === undefined) {
            throw new Error("provided PropertyABI is missing getAllConfirmed method");
        }
        return this._contract.methods.getAllConfirmed().call();
    }

    public async getAllUnConfirmed(): Promise<UnconfirmedPropertyInfo[]> {
        if(this._contract.methods.getAllUnConfirmed === undefined) {
            throw new Error("provided PropertyABI is missing getAllUnConfirmed method");
        }
        return this._contract.methods.getAllUnConfirmed().call();
    }
}