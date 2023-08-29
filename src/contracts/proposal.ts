import {Address, Contract, ContractExecutionError, Web3Context} from "web3";
import {ProposalABI} from "../safe4_abi";
import {ProposalContractAddr} from "../safe4_address";
import {ProposalInfo} from "../types/proposal";

export class Proposal {
    private readonly _contract: Contract<typeof ProposalABI>

    public constructor() {
        this._contract = new Contract(ProposalABI, ProposalContractAddr);
    }

    public link(parentContext: Web3Context) {
        this._contract.link(parentContext);
    }

    public async create(title: string, payAmount: number, payTimes: number, startPayTime: number, endPayTime: number, description: string, detail: string, fromAddr: Address) {
        if(this._contract.methods.create === undefined) {
            throw new Error("provided ProposalABI is missing create method");
        }
        try {
            const receipt = await this._contract.methods.create(title, payAmount, payTimes, startPayTime, endPayTime, description, detail).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async vote(id: number, voteResult: number, fromAddr: Address) {
        if(this._contract.methods.vote === undefined) {
            throw new Error("provided ProposalABI is missing vote method");
        }
        try {
            const receipt = await this._contract.methods.vote(id, voteResult).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async changeTitle(id: number, title: string, fromAddr: Address) {
        if(this._contract.methods.changeTitle === undefined) {
            throw new Error("provided ProposalABI is missing changeTitle method");
        }
        try {
            const receipt = await this._contract.methods.changeTitle(id, title).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async changePayAmount(id: number, payAmount: number, fromAddr: Address) {
        if(this._contract.methods.changePayAmount === undefined) {
            throw new Error("provided ProposalABI is missing changePayAmount method");
        }
        try {
            const receipt = await this._contract.methods.changePayAmount(id, payAmount).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async changePayTimes(id: number, payTimes: number, fromAddr: Address) {
        if(this._contract.methods.changePayTimes === undefined) {
            throw new Error("provided ProposalABI is missing changePayTimes method");
        }
        try {
            const receipt = await this._contract.methods.changePayTimes(id, payTimes).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async changeStartPayTime(id: number, startPayTime: number, fromAddr: Address) {
        if(this._contract.methods.changeStartPayTime === undefined) {
            throw new Error("provided ProposalABI is missing changeStartPayTime method");
        }
        try {
            const receipt = await this._contract.methods.changeStartPayTime(id, startPayTime).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async changeEndPayTime(id: number, endPayTime: number, fromAddr: Address) {
        if(this._contract.methods.changeEndPayTime === undefined) {
            throw new Error("provided ProposalABI is missing changeEndPayTime method");
        }
        try {
            const receipt = await this._contract.methods.changeEndPayTime(id, endPayTime).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async changeDescription(id: number, description: string, fromAddr: Address) {
        if(this._contract.methods.changeDescription === undefined) {
            throw new Error("provided ProposalABI is missing changeDescription method");
        }
        try {
            const receipt = await this._contract.methods.changeDescription(id, description).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async changeDetail(id: number, detail: string, fromAddr: Address) {
        if(this._contract.methods.changeDetail === undefined) {
            throw new Error("provided ProposalABI is missing changeDetail method");
        }
        try {
            const receipt = await this._contract.methods.changeDetail(id, detail).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async getInfo(id: number): Promise<ProposalInfo> {
        if(this._contract.methods.getInfo === undefined) {
            throw new Error("provided ProposalABI is missing getInfo method");
        }
        return this._contract.methods.getInfo(id).call();
    }

    public async getAll(): Promise<ProposalInfo[]> {
        if(this._contract.methods.getAll === undefined) {
            throw new Error("provided ProposalABI is missing getAll method");
        }
        return this._contract.methods.getAll().call();
    }

    public async getMine(fromAddr: Address): Promise<ProposalInfo[]> {
        if(this._contract.methods.getAll === undefined) {
            throw new Error("provided ProposalABI is missing getAll method");
        }
        return this._contract.methods.getAll().call({from: fromAddr});
    }
}