import {Address, Contract, Web3Context} from "web3";
import {SuperNodeLogicABI, SuperNodeStorageABI} from "../safe4_abi";
import {SuperNodeLogicContractAddr, SuperNodeStorageContractAddr} from "../safe4_address";
import {SuperNodeInfo} from "../types/supernode";
import {ContractUitl} from "../utils/ContractUitl";

export class SuperNode {
    private readonly _storage_contract: Contract<typeof SuperNodeStorageABI>
    private readonly _logic_contract: Contract<typeof SuperNodeLogicABI>

    public constructor() {
        this._storage_contract = new Contract(SuperNodeStorageABI, SuperNodeStorageContractAddr);
        this._logic_contract = new Contract(SuperNodeLogicABI, SuperNodeLogicContractAddr);
    }

    public link(parentContext: Web3Context) {
        this._storage_contract.link(parentContext);
        this._logic_contract.link(parentContext);
    }

    public async register(privateKey: string, value: string, isUnion: boolean, addr: Address, lockDay: number, name: string, enode: string, description: string, creatorIncentive: number, partnerIncentive: number, voterIncentive: number): Promise<string> {
        if (this._logic_contract.methods.register === undefined) {
            throw new Error("provided SuperNodeLogicABI is missing register method");
        }
        return ContractUitl.invokeContract(this._logic_contract, privateKey, value, this._logic_contract.methods.register(isUnion, addr, lockDay, name, enode, description, creatorIncentive, partnerIncentive, voterIncentive).encodeABI());
    }

    public async appendRegister(privateKey: string, value: string, addr: Address, lockDay: number): Promise<string> {
        if (this._logic_contract.methods.appendRegister === undefined) {
            throw new Error("provided SuperNodeLogicABI is missing appendRegister method");
        }
        return ContractUitl.invokeContract(this._logic_contract, privateKey, value, this._logic_contract.methods.appendRegister(addr, lockDay).encodeABI());
    }

    public async turnRegister(privateKey: string, addr: Address, lockID: number): Promise<string> {
        if (this._logic_contract.methods.turnRegister === undefined) {
            throw new Error("provided SuperNodeLogicABI is missing turnRegister method");
        }
        return ContractUitl.invokeContract(this._logic_contract, privateKey, 0, this._logic_contract.methods.turnRegister(addr, lockID).encodeABI());
    }

    public async changeAddress(privateKey: string, addr: Address, newAddr: Address): Promise<string> {
        if (this._logic_contract.methods.changeAddress === undefined) {
            throw new Error("provided SuperNodeLogicABI is missing changeAddress method");
        }
        return ContractUitl.invokeContract(this._logic_contract, privateKey, 0, this._logic_contract.methods.changeAddress(addr, newAddr).encodeABI());
    }

    public async changeName(privateKey: string, addr: Address, name: string): Promise<string> {
        if (this._logic_contract.methods.changeName === undefined) {
            throw new Error("provided SuperNodeLogicABI is missing changeName method");
        }
        return ContractUitl.invokeContract(this._logic_contract, privateKey, 0, this._logic_contract.methods.changeName(addr, name).encodeABI());
    }

    public async changeEnode(privateKey: string, addr: Address, enode: string): Promise<string> {
        if (this._logic_contract.methods.changeEnode === undefined) {
            throw new Error("provided SuperNodeLogicABI is missing changeEnode method");
        }
        return ContractUitl.invokeContract(this._logic_contract, privateKey, 0, this._logic_contract.methods.changeEnode(addr, enode).encodeABI());
    }

    public async changeDescription(privateKey: string, addr: Address, description: string): Promise<string> {
        if (this._logic_contract.methods.changeDescription === undefined) {
            throw new Error("provided SuperNodeLogicABI is missing changeDescription method");
        }
        return ContractUitl.invokeContract(this._logic_contract, privateKey, 0, this._logic_contract.methods.changeDescription(addr, description).encodeABI());
    }

    public async getInfo(addr: Address): Promise<SuperNodeInfo> {
        if (this._storage_contract.methods.getInfo === undefined) {
            throw new Error("provided SuperNodeStorageABI is missing getInfo method");
        }
        return this._storage_contract.methods.getInfo(addr).call();
    }

    public async getInfoByID(id: number): Promise<SuperNodeInfo> {
        if (this._storage_contract.methods.getInfoByID === undefined) {
            throw new Error("provided SuperNodeStorageABI is missing getInfoByID method");
        }
        return this._storage_contract.methods.getInfoByID(id).call();
    }

    public async getNum(): Promise<bigint> {
        if (this._storage_contract.methods.getNum === undefined) {
            throw new Error("provided SuperNodeStorageABI is missing getNum method");
        }
        return this._storage_contract.methods.getNum().call();
    }

    public async getAll(start: number, count: number): Promise<SuperNodeInfo[]> {
        if (this._storage_contract.methods.getAll === undefined) {
            throw new Error("provided SuperNodeStorageABI is missing getAll method");
        }
        return this._storage_contract.methods.getAll(start, count).call();
    }

    public async getTops(): Promise<Address[]> {
        if (this._storage_contract.methods.getTops === undefined) {
            throw new Error("provided SuperNodeStorageABI is missing getTops method");
        }
        return this._storage_contract.methods.getTops().call();
    }

    public async getOfficials(): Promise<Address[]> {
        if (this._storage_contract.methods.getOfficials === undefined) {
            throw new Error("provided SuperNodeStorageABI is missing getOfficials method");
        }
        return this._storage_contract.methods.getOfficials().call();
    }

    public async exist(addr: Address): Promise<boolean> {
        if (this._storage_contract.methods.exist === undefined) {
            throw new Error("provided SuperNodeStorageABI is missing exist method");
        }
        return this._storage_contract.methods.exist(addr).call();
    }

    public async existID(id: number): Promise<boolean> {
        if (this._storage_contract.methods.existID === undefined) {
            throw new Error("provided SuperNodeStorageABI is missing existID method");
        }
        return this._storage_contract.methods.existID(id).call();
    }

    public async existName(name: string): Promise<boolean> {
        if (this._storage_contract.methods.existName === undefined) {
            throw new Error("provided SuperNodeStorageABI is missing existName method");
        }
        return this._storage_contract.methods.existName(name).call();
    }

    public async existEnode(enode: string): Promise<boolean> {
        if (this._storage_contract.methods.existEnode === undefined) {
            throw new Error("provided SuperNodeStorageABI is missing existEnode method");
        }
        return this._storage_contract.methods.existEnode(enode).call();
    }

    public async existLockID(addr: Address, lockID: number): Promise<boolean> {
        if (this._storage_contract.methods.existLockID === undefined) {
            throw new Error("provided SuperNodeStorageABI is missing existLockID method");
        }
        return this._storage_contract.methods.existLockID(addr, lockID).call();
    }

    public async isValid(addr: Address): Promise<boolean> {
        if (this._storage_contract.methods.isValid === undefined) {
            throw new Error("provided SuperNodeStorageABI is missing isValid method");
        }
        return this._storage_contract.methods.isValid(addr).call();
    }

    public async isFormal(addr: Address): Promise<boolean> {
        if (this._storage_contract.methods.isFormal === undefined) {
            throw new Error("provided SuperNodeStorageABI is missing isFormal method");
        }
        return this._storage_contract.methods.isFormal(addr).call();
    }
}