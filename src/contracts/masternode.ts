import {Address, Contract, ContractExecutionError, Web3Context} from "web3";
import {MasterNodeABI} from "../safe4_abi";
import {MasterNodeContractAddr} from "../safe4_address";
import {MasterNodeInfo} from "../types/masternode";

export class MasterNode {
    private readonly _contract: Contract<typeof MasterNodeABI>

    public constructor() {
        this._contract = new Contract(MasterNodeABI, MasterNodeContractAddr);
    }

    public link(parentContext: Web3Context) {
        this._contract.link(parentContext);
    }

    public async register(fromAddr: Address, fromValue: string, isUnion: boolean, addr: Address, lockDay: number, enode: string, description: string, creatorIncentive: number, partnerIncentive: number) {
        if (this._contract.methods.register === undefined) {
            throw new Error("provided MasterNodeABI is missing register method");
        }
        try {
            const receipt = await this._contract.methods.register(isUnion, addr, lockDay, enode, description, creatorIncentive, partnerIncentive).send({
                from: fromAddr,
                value: fromValue
            });
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async appendRegister(fromAddr: Address, fromValue: string, addr: Address, lockDay: number) {
        if (this._contract.methods.appendRegister === undefined) {
            throw new Error("provided MasterNodeABI is missing appendRegister method");
        }
        try {
            const receipt = await this._contract.methods.appendRegister(addr, lockDay).send({
                from: fromAddr,
                value: fromValue
            });
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async turnRegister(fromAddr: Address, addr: Address, lockID: number) {
        if (this._contract.methods.turnRegister === undefined) {
            throw new Error("provided MasterNodeABI is missing turnRegister method");
        }
        try {
            const receipt = await this._contract.methods.turnRegister(addr, lockID).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async changeAddress(fromAddr: Address, addr: Address, newAddr: Address) {
        if (this._contract.methods.changeAddress === undefined) {
            throw new Error("provided MasterNodeABI is missing changeAddress method");
        }
        try {
            const receipt = await this._contract.methods.changeAddress(addr, newAddr).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async changeEnode(fromAddr: Address, addr: Address, enode: string) {
        if (this._contract.methods.changeEnode === undefined) {
            throw new Error("provided MasterNodeABI is missing changeEnode method");
        }
        try {
            const receipt = await this._contract.methods.changeEnode(addr, enode).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async changeDescription(fromAddr: Address, addr: Address, description: string) {
        if (this._contract.methods.changeDescription === undefined) {
            throw new Error("provided MasterNodeABI is missing changeDescription method");
        }
        try {
            const receipt = await this._contract.methods.changeDescription(addr, description).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async changeIsOfficial(fromAddr: Address, addr: Address, flag: boolean) {
        if (this._contract.methods.changeIsOfficial === undefined) {
            throw new Error("provided MasterNodeABI is missing changeIsOfficial method");
        }
        try {
            const receipt = await this._contract.methods.changeIsOfficial(addr, flag).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async getInfo(addr: Address): Promise<MasterNodeInfo> {
        if (this._contract.methods.getInfo === undefined) {
            throw new Error("provided MasterNodeABI is missing getInfo method");
        }
        return this._contract.methods.getInfo(addr).call();
    }

    public async getInfoByID(id: number): Promise<MasterNodeInfo> {
        if (this._contract.methods.getInfoByID === undefined) {
            throw new Error("provided MasterNodeABI is missing getInfoByID method");
        }
        return this._contract.methods.getInfoByID(id).call();
    }

    public async getNext(): Promise<Address> {
        if (this._contract.methods.getNext === undefined) {
            throw new Error("provided MasterNodeABI is missing getNext method");
        }
        return this._contract.methods.getNext().call();
    }

    public async getAll(): Promise<MasterNodeInfo[]> {
        if (this._contract.methods.getAll === undefined) {
            throw new Error("provided MasterNodeABI is missing getAll method");
        }
        return this._contract.methods.getAll().call();
    }

    public async getOfficials(): Promise<MasterNodeInfo[]> {
        if (this._contract.methods.getOfficials === undefined) {
            throw new Error("provided MasterNodeABI is missing getOfficials method");
        }
        return this._contract.methods.getOfficials().call();
    }

    public async getNum(): Promise<number> {
        if (this._contract.methods.getNum === undefined) {
            throw new Error("provided MasterNodeABI is missing getNum method");
        }
        return this._contract.methods.getNum().call();
    }

    public async exist(addr: Address): Promise<boolean> {
        if (this._contract.methods.exist === undefined) {
            throw new Error("provided MasterNodeABI is missing exist method");
        }
        return this._contract.methods.exist(addr).call();
    }

    public async existID(id: number): Promise<boolean> {
        if (this._contract.methods.existID === undefined) {
            throw new Error("provided MasterNodeABI is missing existID method");
        }
        return this._contract.methods.existID(id).call();
    }

    public async existEnode(enode: string): Promise<boolean> {
        if (this._contract.methods.existEnode === undefined) {
            throw new Error("provided MasterNodeABI is missing existEnode method");
        }
        return this._contract.methods.existEnode(enode).call();
    }

    public async existLockID(addr: Address, id: number): Promise<boolean> {
        if (this._contract.methods.existLockID === undefined) {
            throw new Error("provided MasterNodeABI is missing existLockID method");
        }
        return this._contract.methods.existLockID(addr, id).call();
    }
}