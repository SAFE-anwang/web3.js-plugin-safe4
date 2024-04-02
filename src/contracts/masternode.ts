import {Address, Contract, Web3Context} from "web3";
import {MasterNodeLogicABI, MasterNodeStorageABI} from "../safe4_abi";
import {MasterNodeInfo} from "../types/masternode";
import {MasterNodeLogicContractAddr, MasterNodeStorageContractAddr} from "../safe4_address";
import {ContractUitl} from "../utils/ContractUitl";

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

    public async register(privateKey: string, value: string, isUnion: boolean, addr: Address, lockDay: number, enode: string, description: string, creatorIncentive: number, partnerIncentive: number): Promise<string> {
        if (this._logic_contract.methods.register === undefined) {
            throw new Error("provided MasterNodeLogicABI is missing register method");
        }
        return ContractUitl.invokeContract(this._logic_contract, privateKey, value, this._logic_contract.methods.register(isUnion, addr, lockDay, enode, description, creatorIncentive, partnerIncentive).encodeABI());
    }

    public async appendRegister(privateKey: string, value: string, addr: Address, lockDay: number): Promise<string> {
        if (this._logic_contract.methods.appendRegister === undefined) {
            throw new Error("provided MasterNodeLogicABI is missing appendRegister method");
        }
        return ContractUitl.invokeContract(this._logic_contract, privateKey, value, this._logic_contract.methods.appendRegister(addr, lockDay).encodeABI());
    }

    public async turnRegister(privateKey: string, addr: Address, lockID: number): Promise<string> {
        if (this._logic_contract.methods.turnRegister === undefined) {
            throw new Error("provided MasterNodeLogicABI is missing turnRegister method");
        }
        return ContractUitl.invokeContract(this._logic_contract, privateKey, 0, this._logic_contract.methods.turnRegister(addr, lockID).encodeABI());
    }

    public async changeAddress(privateKey: string, addr: Address, newAddr: Address): Promise<string> {
        if (this._logic_contract.methods.changeAddress === undefined) {
            throw new Error("provided MasterNodeLogicABI is missing changeAddress method");
        }
        return ContractUitl.invokeContract(this._logic_contract, privateKey, 0, this._logic_contract.methods.changeAddress(addr, newAddr).encodeABI());
    }

    public async changeEnode(privateKey: string, addr: Address, enode: string): Promise<string> {
        if (this._logic_contract.methods.changeEnode === undefined) {
            throw new Error("provided MasterNodeLogicABI is missing changeEnode method");
        }
        return ContractUitl.invokeContract(this._logic_contract, privateKey, 0, this._logic_contract.methods.changeEnode(addr, enode).encodeABI());
    }

    public async changeDescription(privateKey: string, addr: Address, description: string): Promise<string> {
        if (this._logic_contract.methods.changeDescription === undefined) {
            throw new Error("provided MasterNodeLogicABI is missing changeDescription method");
        }
        return ContractUitl.invokeContract(this._logic_contract, privateKey, 0, this._logic_contract.methods.changeDescription(addr, description).encodeABI());
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

    public async getNum(): Promise<bigint> {
        if (this._storage_contract.methods.getNum === undefined) {
            throw new Error("provided MasterNodeStorageABI is missing getNum method");
        }
        return this._storage_contract.methods.getNum().call();
    }

    public async getAll(start: number, count: number): Promise<Address[]> {
        if (this._storage_contract.methods.getAll === undefined) {
            throw new Error("provided MasterNodeStorageABI is missing getAll method");
        }
        return this._storage_contract.methods.getAll(start, count).call();
    }

    public async getOfficials(): Promise<Address[]> {
        if (this._storage_contract.methods.getOfficials === undefined) {
            throw new Error("provided MasterNodeStorageABI is missing getOfficials method");
        }
        return this._storage_contract.methods.getOfficials().call();
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

    public async existLockID(addr: Address, lockID: number): Promise<boolean> {
        if (this._storage_contract.methods.existLockID === undefined) {
            throw new Error("provided MasterNodeStorageABI is missing existLockID method");
        }
        return this._storage_contract.methods.existLockID(addr, lockID).call();
    }

    public async isValid(addr: Address): Promise<boolean> {
        if (this._storage_contract.methods.isValid === undefined) {
            throw new Error("provided MasterNodeStorageABI is missing isValid method");
        }
        return this._storage_contract.methods.isValid(addr).call();
    }
}