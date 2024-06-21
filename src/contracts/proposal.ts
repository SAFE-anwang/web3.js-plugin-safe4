import {Contract, Web3, Web3Context} from "web3";
import {ProposalABI} from "../safe4_abi";
import {ProposalContractAddr} from "../safe4_address";
import {ProposalInfo, ProposalVoteInfo} from "../types/proposal";
import {ContractUitl} from "../utils/ContractUitl";

export class Proposal {
    private readonly _contract: Contract<typeof ProposalABI>

    public constructor() {
        this._contract = new Contract(ProposalABI, ProposalContractAddr);
    }

    public link(parentContext: Web3Context) {
        this._contract.link(parentContext);
    }

    public async create(privateKey: string, title: string, payAmount: string, payTimes: number, startPayTime: number, endPayTime: number, description: string): Promise<string> {
        if (this._contract.methods.create === undefined) {
            throw new Error("provided ProposalABI is missing create method");
        }
        return ContractUitl.invokeContract(this._contract, privateKey, "1000000000000000000", this._contract.methods.create(title, payAmount, payTimes, startPayTime, endPayTime, description).encodeABI());
    }

    public async vote(privateKey: string, id: number, voteResult: number): Promise<string> {
        if (this._contract.methods.vote === undefined) {
            throw new Error("provided ProposalABI is missing vote method");
        }
        return ContractUitl.invokeContract(this._contract, privateKey, 0, this._contract.methods.vote(id, voteResult).encodeABI());
    }

    public async changeTitle(privateKey: string, id: number, title: string): Promise<string> {
        if (this._contract.methods.changeTitle === undefined) {
            throw new Error("provided ProposalABI is missing changeTitle method");
        }
        return ContractUitl.invokeContract(this._contract, privateKey, 0, this._contract.methods.changeTitle(id, title).encodeABI());
    }

    public async changePayAmount(privateKey: string, id: number, payAmount: string): Promise<string> {
        if (this._contract.methods.changePayAmount === undefined) {
            throw new Error("provided ProposalABI is missing changePayAmount method");
        }
        return ContractUitl.invokeContract(this._contract, privateKey, 0, this._contract.methods.changePayAmount(id, payAmount).encodeABI());
    }

    public async changePayTimes(privateKey: string, id: number, payTimes: number): Promise<string> {
        if (this._contract.methods.changePayTimes === undefined) {
            throw new Error("provided ProposalABI is missing changePayTimes method");
        }
        return ContractUitl.invokeContract(this._contract, privateKey, 0, this._contract.methods.changePayTimes(id, payTimes).encodeABI());
    }

    public async changeStartPayTime(privateKey: string, id: number, startPayTime: number): Promise<string> {
        if (this._contract.methods.changeStartPayTime === undefined) {
            throw new Error("provided ProposalABI is missing changeStartPayTime method");
        }
        return ContractUitl.invokeContract(this._contract, privateKey, 0, this._contract.methods.changeStartPayTime(id, startPayTime).encodeABI());
    }

    public async changeEndPayTime(privateKey: string, id: number, endPayTime: number): Promise<string> {
        if (this._contract.methods.changeEndPayTime === undefined) {
            throw new Error("provided ProposalABI is missing changeEndPayTime method");
        }
        return ContractUitl.invokeContract(this._contract, privateKey, 0, this._contract.methods.changeEndPayTime(id, endPayTime).encodeABI());
    }

    public async changeDescription(privateKey: string, id: number, description: string): Promise<string> {
        if (this._contract.methods.changeDescription === undefined) {
            throw new Error("provided ProposalABI is missing changeDescription method");
        }
        return ContractUitl.invokeContract(this._contract, privateKey, 0, this._contract.methods.changeDescription(id, description).encodeABI());
    }

    public async getInfo(id: number): Promise<ProposalInfo> {
        if (this._contract.methods.getInfo === undefined) {
            throw new Error("provided ProposalABI is missing getInfo method");
        }
        return this._contract.methods.getInfo(id).call();
    }

    public async getVoterNum(id: number): Promise<bigint> {
        if (this._contract.methods.getVoterNum === undefined) {
            throw new Error("provided ProposalABI is missing getVoterNum method");
        }
        return this._contract.methods.getVoterNum(id).call();
    }

    public async getVoteInfo(id: number, start: number, count: number): Promise<ProposalVoteInfo[]> {
        if (this._contract.methods.getVoteInfo === undefined) {
            throw new Error("provided ProposalABI is missing getVoteInfo method");
        }
        return this._contract.methods.getVoteInfo(id, start, count).call();
    }

    public async getNum(): Promise<bigint> {
        if (this._contract.methods.getNum === undefined) {
            throw new Error("provided ProposalABI is missing getNum method");
        }
        return this._contract.methods.getNum().call();
    }

    public async getAll(start: number, count: number): Promise<bigint[]> {
        if (this._contract.methods.getAll === undefined) {
            throw new Error("provided ProposalABI is missing getAll method");
        }
        return this._contract.methods.getAll(start, count).call();
    }

    public async getMineNum(privateKey: string): Promise<bigint> {
        if (this._contract.methods.getMineNum === undefined) {
            throw new Error("provided ProposalABI is missing getMineNum method");
        }
        const web3 = new Web3(this._contract.provider);
        const wallet = web3.eth.accounts.privateKeyToAccount(privateKey);
        return this._contract.methods.getMineNum().call({from: wallet.address});
    }

    public async getMines(privateKey: string, start: number, count: number): Promise<bigint[]> {
        if (this._contract.methods.getMines === undefined) {
            throw new Error("provided ProposalABI is missing getMines method");
        }
        const web3 = new Web3(this._contract.provider);
        const wallet = web3.eth.accounts.privateKeyToAccount(privateKey);
        return this._contract.methods.getMines(start, count).call({from: wallet.address});
    }

    public async exist(id: number): Promise<boolean> {
        if (this._contract.methods.exist === undefined) {
            throw new Error("provided ProposalABI is missing exist method");
        }
        return this._contract.methods.exist(id).call();
    }
}