import {Address, Contract, ContractExecutionError, Web3Context} from "web3";
import {SuperNodeABI} from "../safe4_abi";
import {SuperNodeContractAddr} from "../safe4_address";
import {SuperNodeInfo} from "../types/supernode";

export class SuperNode {
    private readonly _contract: Contract<typeof SuperNodeABI>

    public constructor() {
        this._contract = new Contract(SuperNodeABI, SuperNodeContractAddr);
    }

    public link(parentContext: Web3Context) {
        this._contract.link(parentContext);
    }
    
    public async register(isUnion: boolean, addr: Address, lockDay: number, name: string, enode: string, description: string, creatorIncentive: number, partnerIncentive: number, voterIncentive: number, fromAddr: Address, fromValue: string) {
        if(this._contract.methods.register === undefined) {
            throw new Error("provided SuperNodeABI is missing register method");
        }
        try {
            const receipt = await this._contract.methods.register(isUnion, addr, lockDay, name, enode, description, creatorIncentive, partnerIncentive, voterIncentive).send({from: fromAddr, value: fromValue});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async appendRegister(addr: Address, lockDay: number, fromAddr: Address, fromValue: string) {
        if(this._contract.methods.appendRegister === undefined) {
            throw new Error("provided SuperNodeABI is missing appendRegister method");
        }
        try {
            const receipt = await this._contract.methods.appendRegister(addr, lockDay).send({from: fromAddr, value: fromValue});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async turnRegister(addr: Address, lockID: number, fromAddr: Address) {
        if(this._contract.methods.turnRegister === undefined) {
            throw new Error("provided SuperNodeABI is missing turnRegister method");
        }
        try {
            const receipt = await this._contract.methods.turnRegister(addr, lockID).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async changeAddress(addr: Address, newAddr: Address, fromAddr: Address) {
        if(this._contract.methods.changeAddress === undefined) {
            throw new Error("provided SuperNodeABI is missing changeAddress method");
        }
        try {
            const receipt = await this._contract.methods.changeAddress(addr, newAddr).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async changeEnode(addr: Address, newEnode: string, fromAddr: Address) {
        if(this._contract.methods.changeEnode === undefined) {
            throw new Error("provided SuperNodeABI is missing changeEnode method");
        }
        try {
            const receipt = await this._contract.methods.changeEnode(addr, newEnode).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async changeDescription(addr: Address, newDescription: string, fromAddr: Address) {
        if(this._contract.methods.changeDescription === undefined) {
            throw new Error("provided SuperNodeABI is missing changeDescription method");
        }
        try {
            const receipt = await this._contract.methods.changeDescription(addr, newDescription).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async getInfo(addr: Address): Promise<SuperNodeInfo> {
        if(this._contract.methods.getInfo === undefined) {
            throw new Error("provided SuperNodeABI is missing getInfo method");
        }
        return this._contract.methods.getInfo(addr).call();
    }

    public async getInfoByID(id: number): Promise<SuperNodeInfo> {
        if(this._contract.methods.getInfoByID === undefined) {
            throw new Error("provided SuperNodeABI is missing getInfoByID method");
        }
        return this._contract.methods.getInfoByID(id).call();
    }

    public async getAll(): Promise<SuperNodeInfo[]> {
        if(this._contract.methods.getAll === undefined) {
            throw new Error("provided SuperNodeABI is missing getAll method");
        }
        return this._contract.methods.getAll().call();
    }

    public async getTop(): Promise<SuperNodeInfo[]> {
        if(this._contract.methods.getTop === undefined) {
            throw new Error("provided SuperNodeABI is missing getTop method");
        }
        return this._contract.methods.getTop().call();
    }

    public async getOfficials(): Promise<SuperNodeInfo[]> {
        if(this._contract.methods.getOfficials === undefined) {
            throw new Error("provided SuperNodeABI is missing getOfficials method");
        }
        return this._contract.methods.getOfficials().call();
    }

    public async getNum(): Promise<number> {
        if(this._contract.methods.getNum === undefined) {
            throw new Error("provided SuperNodeABI is missing getNum method");
        }
        return this._contract.methods.getNum().call();
    }
}