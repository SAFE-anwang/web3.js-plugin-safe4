import {Address, Contract, Web3Context} from "web3";
import {AccountManagerABI} from "../safe4_abi";
import {AccountManagerContractAddr} from "../safe4_address";
import {AccountAmountInfo, AccountRecord, RecordUseInfo} from "../types/accountmanager";
import {ContractUitl} from "../utils/ContractUitl";

export class AccountManager {
    private readonly _contract: Contract<typeof AccountManagerABI>

    public constructor() {
        this._contract = new Contract(AccountManagerABI, AccountManagerContractAddr);
    }

    public link(parentContext: Web3Context) {
        this._contract.link(parentContext);
    }

    public async deposit(privateKey: string, value: string, to: Address, lockDay: number): Promise<string> {
        if (this._contract.methods.deposit === undefined) {
            throw new Error("provided AccountManagerABI is missing deposit method");
        }
        return ContractUitl.invokeContract(this._contract, privateKey, value, this._contract.methods.deposit(to, lockDay).encodeABI())
    }

    public async withdraw(privateKey: string): Promise<string> {
        if (this._contract.methods.withdraw === undefined) {
            throw new Error("provided AccountManagerABI is missing withdraw method");
        }
        return ContractUitl.invokeContract(this._contract, privateKey, 0, this._contract.methods.withdraw().encodeABI());
    }

    public async withdrawByID(privateKey: string, ids: number[]): Promise<string> {
        if (this._contract.methods.withdrawByID === undefined) {
            throw new Error("provided AccountManagerABI is missing withdraw method");
        }
        return ContractUitl.invokeContract(this._contract, privateKey, 0, this._contract.methods.withdrawByID(ids).encodeABI());
    }

    public async transfer(privateKey: string, to: Address, amount: string, lockDay: number): Promise<string> {
        if (this._contract.methods.transfer === undefined) {
            throw new Error("provided AccountManagerABI is missing withdraw method");
        }
        return ContractUitl.invokeContract(this._contract, privateKey, 0, this._contract.methods.transfer(to, amount, lockDay).encodeABI());
    }

    public async addLockDay(privateKey: string, id: number, day: number): Promise<string> {
        if (this._contract.methods.addLockDay === undefined) {
            throw new Error("provided AccountManagerABI is missing addLockDay method");
        }
        return ContractUitl.invokeContract(this._contract, privateKey, 0, this._contract.methods.addLockDay(id, day).encodeABI());
    }

    public async getTotalAmount(addr: Address): Promise<AccountAmountInfo> {
        if (this._contract.methods.getTotalAmount === undefined) {
            throw new Error("provided AccountManagerABI is missing getTotalAmount method");
        }
        return this.toAccountAmountInfo(await this._contract.methods.getTotalAmount(addr).call());
    }

    public async getTotalIDs(addr: Address, start: number, count: number): Promise<bigint[]> {
        if (this._contract.methods.getTotalIDs === undefined) {
            throw new Error("provieded AccountManagerABI is missing getTotalIDs method");
        }
        return this._contract.methods.getTotalIDs(addr, start, count).call();
    }

    public async getAvailableAmount(addr: Address): Promise<AccountAmountInfo> {
        if (this._contract.methods.getAvailableAmount === undefined) {
            throw new Error("provided AccountManagerABI is missing getAvailableAmount method");
        }
        return this.toAccountAmountInfo(await this._contract.methods.getAvailableAmount(addr).call());
    }

    public async getAvailableIDs(addr: Address, start: number, count: number): Promise<bigint[]> {
        if (this._contract.methods.getAvailableIDs === undefined) {
            throw new Error("provieded AccountManagerABI is missing getAvailableIDs method");
        }
        return this._contract.methods.getAvailableIDs(addr, start, count).call();
    }

    public async getLockedAmount(addr: Address): Promise<AccountAmountInfo> {
        if (this._contract.methods.getLockedAmount === undefined) {
            throw new Error("provided AccountManagerABI is missing getLockedAmount method");
        }
        return this.toAccountAmountInfo(await this._contract.methods.getLockedAmount(addr).call());
    }

    public async getLockedIDs(addr: Address, start: number, count: number): Promise<bigint[]> {
        if (this._contract.methods.getLockedIDs === undefined) {
            throw new Error("provieded AccountManagerABI is missing getLockedIDs method");
        }
        return this._contract.methods.getLockedIDs(addr, start, count).call();
    }

    public async getUsedAmount(addr: Address): Promise<AccountAmountInfo> {
        if (this._contract.methods.getUsedAmount === undefined) {
            throw new Error("provided AccountManagerABI is missing getUsedAmount method");
        }
        return this.toAccountAmountInfo(await this._contract.methods.getUsedAmount(addr).call());
    }

    public async getUsedIDs(addr: Address, start: number, count: number): Promise<bigint[]> {
        if (this._contract.methods.getUsedIDs === undefined) {
            throw new Error("provieded AccountManagerABI is missing getUsedIDs method");
        }
        return this._contract.methods.getUsedIDs(addr, start, count).call();
    }

    public async getRecord0(addr: Address): Promise<AccountRecord> {
        if (this._contract.methods.getRecord0 === undefined) {
            throw new Error("provided AccountManagerABI is missing getRecord0 method");
        }
        return this._contract.methods.getRecord0(addr).call();
    }

    public async getRecordByID(id: number): Promise<AccountRecord> {
        if (this._contract.methods.getRecordByID === undefined) {
            throw new Error("provided AccountManagerABI is missing getRecordByID method");
        }
        return this._contract.methods.getRecordByID(id).call();
    }

    public async getRecordUseInfo(id: number): Promise<RecordUseInfo> {
        if (this._contract.methods.getRecordUseInfo === undefined) {
            throw new Error("provided AccountManagerABI is missing getRecordUseInfo method");
        }
        return this._contract.methods.getRecordUseInfo(id).call();
    }

    // eslint-disable-next-line class-methods-use-this
    private toAccountAmountInfo(obj: object): AccountAmountInfo {
        return {
            amount: BigInt(obj["0"].valueOf()),
            num: BigInt(obj["1"].valueOf()),
        };
    }
}