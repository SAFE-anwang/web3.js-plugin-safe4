import {Address, Contract, ContractExecutionError, Web3Context} from "web3";
import {MasterNodeLogicABI, MasterNodeStorageABI} from "../safe4_abi";
import {MasterNodeInfo} from "../types/masternode";
import {MasterNodeLogicContractAddr, MasterNodeStorageContractAddr} from "../safe4_address";

export class MasterNode {

    private readonly _storage_contract: Contract<typeof MasterNodeStorageABI>
    private readonly _logic_contract: Contract<typeof MasterNodeLogicABI>

    public constructor() {
        this._storage_contract = new Contract(MasterNodeStorageABI, MasterNodeStorageContractAddr);
        this._logic_contract = new Contract(MasterNodeLogicABI, MasterNodeLogicContractAddr);
    }

    public link(parentContext: Web3Context) {
        this._storage_contract.link(parentContext);
        this._logic_contract.link(parentContext);
    }

    public async register(fromAddr: Address, fromValue: string, isUnion: boolean, addr: Address, lockDay: number, enode: string, description: string, creatorIncentive: number, partnerIncentive: number): Promise<string> {
        if (this._logic_contract.methods.register === undefined) {
            throw new Error("provided MasterNodeLogicABI is missing register method");
        }
        try {
            const receipt = await this._logic_contract.methods.register(isUnion, addr, lockDay, enode, description, creatorIncentive, partnerIncentive).send({
                from: fromAddr,
                value: fromValue
            });
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async appendRegister(fromAddr: Address, fromValue: string, addr: Address, lockDay: number): Promise<string> {
        if (this._logic_contract.methods.appendRegister === undefined) {
            throw new Error("provided MasterNodeLogicABI is missing appendRegister method");
        }
        try {
            const receipt = await this._logic_contract.methods.appendRegister(addr, lockDay).send({
                from: fromAddr,
                value: fromValue
            });
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async turnRegister(fromAddr: Address, addr: Address, lockID: number): Promise<string> {
        if (this._logic_contract.methods.turnRegister === undefined) {
            throw new Error("provided MasterNodeLogicABI is missing turnRegister method");
        }
        try {
            const receipt = await this._logic_contract.methods.turnRegister(addr, lockID).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async changeAddress(fromAddr: Address, addr: Address, newAddr: Address): Promise<string> {
        if (this._logic_contract.methods.changeAddress === undefined) {
            throw new Error("provided MasterNodeLogicABI is missing changeAddress method");
        }
        try {
            const receipt = await this._logic_contract.methods.changeAddress(addr, newAddr).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async changeEnode(fromAddr: Address, addr: Address, enode: string): Promise<string> {
        if (this._logic_contract.methods.changeEnode === undefined) {
            throw new Error("provided MasterNodeLogicABI is missing changeEnode method");
        }
        try {
            const receipt = await this._logic_contract.methods.changeEnode(addr, enode).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async changeDescription(fromAddr: Address, addr: Address, description: string): Promise<string> {
        if (this._logic_contract.methods.changeDescription === undefined) {
            throw new Error("provided MasterNodeLogicABI is missing changeDescription method");
        }
        try {
            const receipt = await this._logic_contract.methods.changeDescription(addr, description).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async changeIsOfficial(fromAddr: Address, addr: Address, flag: boolean): Promise<string> {
        if (this._logic_contract.methods.changeIsOfficial === undefined) {
            throw new Error("provided MasterNodeLogicABI is missing changeIsOfficial method");
        }
        try {
            const receipt = await this._logic_contract.methods.changeIsOfficial(addr, flag).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async getInfo(addr: Address): Promise<MasterNodeInfo> {
        if (this._storage_contract.methods.getInfo === undefined) {
            throw new Error("provided MasterNodeStorageABI is missing getInfo method");
        }
        return this._storage_contract.methods.getInfo(addr).call();
    }

    public async getInfoByID(id: number): Promise<MasterNodeInfo> {
        if (this._storage_contract.methods.getInfoByID === undefined) {
            throw new Error("provided MasterNodeStorageABI is missing getInfoByID method");
        }
        return this._storage_contract.methods.getInfoByID(id).call();
    }

    public async getNext(): Promise<Address> {
        if (this._storage_contract.methods.getNext === undefined) {
            throw new Error("provided MasterNodeStorageABI is missing getNext method");
        }
        return this._storage_contract.methods.getNext().call();
    }

    public async getAll(): Promise<MasterNodeInfo[]> {
        if (this._storage_contract.methods.getAll === undefined) {
            throw new Error("provided MasterNodeStorageABI is missing getAll method");
        }
        return this._storage_contract.methods.getAll().call();
    }

    public async getOfficials(): Promise<MasterNodeInfo[]> {
        if (this._storage_contract.methods.getOfficials === undefined) {
            throw new Error("provided MasterNodeStorageABI is missing getOfficials method");
        }
        return this._storage_contract.methods.getOfficials().call();
    }

    public async getNum(): Promise<bigint> {
        if (this._storage_contract.methods.getNum === undefined) {
            throw new Error("provided MasterNodeStorageABI is missing getNum method");
        }
        return this._storage_contract.methods.getNum().call();
    }

    public async exist(addr: Address): Promise<boolean> {
        if (this._storage_contract.methods.exist === undefined) {
            throw new Error("provided MasterNodeStorageABI is missing exist method");
        }
        return this._storage_contract.methods.exist(addr).call();
    }

    public async existID(id: number): Promise<boolean> {
        if (this._storage_contract.methods.existID === undefined) {
            throw new Error("provided MasterNodeStorageABI is missing existID method");
        }
        return this._storage_contract.methods.existID(id).call();
    }

    public async existEnode(enode: string): Promise<boolean> {
        if (this._storage_contract.methods.existEnode === undefined) {
            throw new Error("provided MasterNodeStorageABI is missing existEnode method");
        }
        return this._storage_contract.methods.existEnode(enode).call();
    }

    public async existLockID(addr: Address, id: number): Promise<boolean> {
        if (this._storage_contract.methods.existLockID === undefined) {
            throw new Error("provided MasterNodeStorageABI is missing existLockID method");
        }
        return this._storage_contract.methods.existLockID(addr, id).call();
    }

    public async isValid(addr: Address): Promise<boolean> {
        if (this._storage_contract.methods.isValid === undefined) {
            throw new Error("provided MasterNodeStorageABI is missing isValid method");
        }
        return this._storage_contract.methods.isValid(addr).call();
    }
}