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

    public async register(fromAddr: Address, fromValue: string, isUnion: boolean, addr: Address, lockDay: number, name: string, enode: string, description: string, creatorIncentive: number, partnerIncentive: number, voterIncentive: number) {
        if (this._contract.methods.register === undefined) {
            throw new Error("provided SuperNodeABI is missing register method");
        }
        try {
            const receipt = await this._contract.methods.register(isUnion, addr, lockDay, name, enode, description, creatorIncentive, partnerIncentive, voterIncentive).send({
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
            throw new Error("provided SuperNodeABI is missing appendRegister method");
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

    public async changeAddress(fromAddr: Address, addr: Address, newAddr: Address) {
        if (this._contract.methods.changeAddress === undefined) {
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

    public async changeName(fromAddr: Address, addr: Address, name: string) {
        if (this._contract.methods.changeName === undefined) {
            throw new Error("provided SuperNodeABI is missing changeName method");
        }
        try {
            const receipt = await this._contract.methods.changeName(addr, name).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async changeEnode(fromAddr: Address, addr: Address, enode: string) {
        if (this._contract.methods.changeEnode === undefined) {
            throw new Error("provided SuperNodeABI is missing changeEnode method");
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
            throw new Error("provided SuperNodeABI is missing changeDescription method");
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
            throw new Error("provided SuperNodeABI is missing changeIsOfficial method");
        }
        try {
            const receipt = await this._contract.methods.changeIsOfficial(addr, flag).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async getInfo(addr: Address): Promise<SuperNodeInfo> {
        if (this._contract.methods.getInfo === undefined) {
            throw new Error("provided SuperNodeABI is missing getInfo method");
        }
        return this._contract.methods.getInfo(addr).call();
    }

    public async getInfoByID(id: number): Promise<SuperNodeInfo> {
        if (this._contract.methods.getInfoByID === undefined) {
            throw new Error("provided SuperNodeABI is missing getInfoByID method");
        }
        return this._contract.methods.getInfoByID(id).call();
    }

    public async getAll(): Promise<SuperNodeInfo[]> {
        if (this._contract.methods.getAll === undefined) {
            throw new Error("provided SuperNodeABI is missing getAll method");
        }
        return this._contract.methods.getAll().call();
    }

    public async getTops(): Promise<SuperNodeInfo[]> {
        if (this._contract.methods.getTops === undefined) {
            throw new Error("provided SuperNodeABI is missing getTops method");
        }
        return this._contract.methods.getTops().call();
    }

    public async getOfficials(): Promise<SuperNodeInfo[]> {
        if (this._contract.methods.getOfficials === undefined) {
            throw new Error("provided SuperNodeABI is missing getOfficials method");
        }
        return this._contract.methods.getOfficials().call();
    }

    public async getNum(): Promise<number> {
        if (this._contract.methods.getNum === undefined) {
            throw new Error("provided SuperNodeABI is missing getNum method");
        }
        return this._contract.methods.getNum().call();
    }

    public async exist(addr: Address): Promise<boolean> {
        if (this._contract.methods.exist === undefined) {
            throw new Error("provided SuperNodeABI is missing exist method");
        }
        return this._contract.methods.exist(addr).call();
    }

    public async existID(id: number): Promise<boolean> {
        if (this._contract.methods.existID === undefined) {
            throw new Error("provided SuperNodeABI is missing existID method");
        }
        return this._contract.methods.existID(id).call();
    }

    public async existName(name: string): Promise<boolean> {
        if (this._contract.methods.existName === undefined) {
            throw new Error("provided SuperNodeABI is missing existName method");
        }
        return this._contract.methods.existName(name).call();
    }

    public async existEnode(enode: string): Promise<boolean> {
        if (this._contract.methods.existEnode === undefined) {
            throw new Error("provided SuperNodeABI is missing existEnode method");
        }
        return this._contract.methods.existEnode(enode).call();
    }

    public async existLockID(addr: Address, id: number): Promise<boolean> {
        if (this._contract.methods.existLockID === undefined) {
            throw new Error("provided SuperNodeABI is missing existLockID method");
        }
        return this._contract.methods.existLockID(addr, id).call();
    }
}