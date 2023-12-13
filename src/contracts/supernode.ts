import {Address, Contract, Web3Context} from "web3";
import {SuperNodeLogicABI, SuperNodeStorageABI} from "../safe4_abi";
import {SuperNodeLogicContractAddr, SuperNodeStorageContractAddr} from "../safe4_address";
import {SuperNodeInfo} from "../types/supernode";

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

    public async register(fromAddr: Address, fromValue: string, isUnion: boolean, addr: Address, lockDay: number, name: string, enode: string, description: string, creatorIncentive: number, partnerIncentive: number, voterIncentive: number): Promise<string> {
        if (this._logic_contract.methods.register === undefined) {
            throw new Error("provided SuperNodeLogicABI is missing register method");
        }
        return new Promise<string>((resolve, reject) => {
            this._logic_contract.methods.register(isUnion, addr, lockDay, name, enode, description, creatorIncentive, partnerIncentive, voterIncentive).send({from: fromAddr, value: fromValue})
                .on("transactionHash", hash => {
                    resolve(hash);
                })
                .on("error", e => {
                    reject(e.innerError);
                });
        });
    }

    public async appendRegister(fromAddr: Address, fromValue: string, addr: Address, lockDay: number): Promise<string> {
        if (this._logic_contract.methods.appendRegister === undefined) {
            throw new Error("provided SuperNodeLogicABI is missing appendRegister method");
        }
        return new Promise<string>((resolve, reject) => {
            this._logic_contract.methods.appendRegister(addr, lockDay).send({from: fromAddr, value: fromValue})
                .on("transactionHash", hash => {
                    resolve(hash);
                })
                .on("error", e => {
                    reject(e.innerError);
                });
        });
    }

    public async turnRegister(fromAddr: Address, addr: Address, lockID: number): Promise<string> {
        if (this._logic_contract.methods.turnRegister === undefined) {
            throw new Error("provided SuperNodeLogicABI is missing turnRegister method");
        }
        return new Promise<string>((resolve, reject) => {
            this._logic_contract.methods.turnRegister(addr, lockID).send({from: fromAddr})
                .on("transactionHash", hash => {
                    resolve(hash);
                })
                .on("error", e => {
                    reject(e.innerError);
                });
        });
    }

    public async changeAddress(fromAddr: Address, addr: Address, newAddr: Address): Promise<string> {
        if (this._logic_contract.methods.changeAddress === undefined) {
            throw new Error("provided SuperNodeLogicABI is missing changeAddress method");
        }
        return new Promise<string>((resolve, reject) => {
            this._logic_contract.methods.changeAddress(addr, newAddr).send({from: fromAddr})
                .on("transactionHash", hash => {
                    resolve(hash);
                })
                .on("error", e => {
                    reject(e.innerError);
                });
        });
    }

    public async changeName(fromAddr: Address, addr: Address, name: string): Promise<string> {
        if (this._logic_contract.methods.changeName === undefined) {
            throw new Error("provided SuperNodeLogicABI is missing changeName method");
        }
        return new Promise<string>((resolve, reject) => {
            this._logic_contract.methods.changeName(addr, name).send({from: fromAddr})
                .on("transactionHash", hash => {
                    resolve(hash);
                })
                .on("error", e => {
                    reject(e.innerError);
                });
        });
    }

    public async changeEnode(fromAddr: Address, addr: Address, enode: string): Promise<string> {
        if (this._logic_contract.methods.changeEnode === undefined) {
            throw new Error("provided SuperNodeLogicABI is missing changeEnode method");
        }
        return new Promise<string>((resolve, reject) => {
            this._logic_contract.methods.changeEnode(addr, enode).send({from: fromAddr})
                .on("transactionHash", hash => {
                    resolve(hash);
                })
                .on("error", e => {
                    reject(e.innerError);
                });
        });
    }

    public async changeDescription(fromAddr: Address, addr: Address, description: string): Promise<string> {
        if (this._logic_contract.methods.changeDescription === undefined) {
            throw new Error("provided SuperNodeLogicABI is missing changeDescription method");
        }
        return new Promise<string>((resolve, reject) => {
            this._logic_contract.methods.changeDescription(addr, description).send({from: fromAddr})
                .on("transactionHash", hash => {
                    resolve(hash);
                })
                .on("error", e => {
                    reject(e.innerError);
                });
        });
    }

    public async changeIsOfficial(fromAddr: Address, addr: Address, flag: boolean): Promise<string> {
        if (this._logic_contract.methods.changeIsOfficial === undefined) {
            throw new Error("provided SuperNodeLogicABI is missing changeIsOfficial method");
        }
        return new Promise<string>((resolve, reject) => {
            this._logic_contract.methods.changeIsOfficial(addr, flag).send({from: fromAddr})
                .on("transactionHash", hash => {
                    resolve(hash);
                })
                .on("error", e => {
                    reject(e.innerError);
                });
        });
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

    public async getAll(): Promise<SuperNodeInfo[]> {
        if (this._storage_contract.methods.getAll === undefined) {
            throw new Error("provided SuperNodeStorageABI is missing getAll method");
        }
        return this._storage_contract.methods.getAll().call();
    }

    public async getTops(): Promise<SuperNodeInfo[]> {
        if (this._storage_contract.methods.getTops === undefined) {
            throw new Error("provided SuperNodeStorageABI is missing getTops method");
        }
        return this._storage_contract.methods.getTops().call();
    }

    public async getOfficials(): Promise<SuperNodeInfo[]> {
        if (this._storage_contract.methods.getOfficials === undefined) {
            throw new Error("provided SuperNodeStorageABI is missing getOfficials method");
        }
        return this._storage_contract.methods.getOfficials().call();
    }

    public async getNum(): Promise<bigint> {
        if (this._storage_contract.methods.getNum === undefined) {
            throw new Error("provided SuperNodeStorageABI is missing getNum method");
        }
        return this._storage_contract.methods.getNum().call();
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

    public async existLockID(addr: Address, id: number): Promise<boolean> {
        if (this._storage_contract.methods.existLockID === undefined) {
            throw new Error("provided SuperNodeStorageABI is missing existLockID method");
        }
        return this._storage_contract.methods.existLockID(addr, id).call();
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