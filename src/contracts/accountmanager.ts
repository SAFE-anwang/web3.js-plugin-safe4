import {Address, Contract, ContractExecutionError, Web3Context} from "web3";
import {AccountManagerABI} from "../safe4_abi";
import {AccountManagerContractAddr} from "../safe4_address";
import {AccountRecord, RecordUseInfo} from "../types/accountmanager";

export class AccountManager {
    private readonly _contract: Contract<typeof AccountManagerABI>

    public constructor() {
        this._contract = new Contract(AccountManagerABI, AccountManagerContractAddr);
    }

    public link(parentContext: Web3Context) {
        this._contract.link(parentContext);
    }

    public async deposit(fromAddr: Address, fromValue: string, to: Address, lockDay: number) {
        if (this._contract.methods.deposit === undefined) {
            throw new Error("provided AccountManagerABI is missing deposit method");
        }
        try {
            const receipt = await this._contract.methods.deposit(to, lockDay).send({from: fromAddr, value: fromValue});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async withdraw(fromAddr: Address) {
        if (this._contract.methods.withdraw === undefined) {
            throw new Error("provided AccountManagerABI is missing withdraw method");
        }
        try {
            const receipt = await this._contract.methods.withdraw().send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async withdrawByID(fromAddr: Address, ids: number[]) {
        if (this._contract.methods.withdrawByID === undefined) {
            throw new Error("provided AccountManagerABI is missing withdrawByID method");
        }
        try {
            const receipt = await this._contract.methods.withdrawByID(ids).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async transfer(fromAddr: Address, to: Address, amount: number, lockDay: number) {
        if (this._contract.methods.transfer === undefined) {
            throw new Error("provided AccountManagerABI is missing transfer method");
        }
        try {
            const receipt = await this._contract.methods.transfer(to, amount, lockDay).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async addLockDay(fromAddr: Address, id: number, day: number) {
        if (this._contract.methods.addLockDay === undefined) {
            throw new Error("provided AccountManagerABI is missing addLockDay method");
        }
        try {
            const receipt = await this._contract.methods.addLockDay(id, day).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async getTotalAmount(addr: Address) {
        if (this._contract.methods.getTotalAmount === undefined) {
            throw new Error("provided AccountManagerABI is missing getTotalAmount method");
        }
        return this._contract.methods.getTotalAmount(addr).call();
    }

    public async getAvailableAmount(addr: Address) {
        if (this._contract.methods.getAvailableAmount === undefined) {
            throw new Error("provided AccountManagerABI is missing getAvailableAmount method");
        }
        return this._contract.methods.getAvailableAmount(addr).call();
    }

    public async getLockedAmount(addr: Address) {
        if (this._contract.methods.getLockedAmount === undefined) {
            throw new Error("provided AccountManagerABI is missing getLockedAmount method");
        }
        return this._contract.methods.getLockedAmount(addr).call();
    }

    public async getUsedAmount(addr: Address) {
        if (this._contract.methods.getUsedAmount === undefined) {
            throw new Error("provided AccountManagerABI is missing getUsedAmount method");
        }
        return this._contract.methods.getUsedAmount(addr).call();
    }

    public async getRecords(addr: Address): Promise<AccountRecord[]> {
        if (this._contract.methods.getRecords === undefined) {
            throw new Error("provided AccountManagerABI is missing getRecords method");
        }
        return this._contract.methods.getRecords(addr).call();
    }

    public async getRecord0(addr: Address): Promise<AccountRecord[]> {
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
}