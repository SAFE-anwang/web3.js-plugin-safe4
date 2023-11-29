import {Address, Contract, ContractExecutionError, Web3Context} from "web3";
import {SNVoteABI} from "../safe4_abi";
import {SNVoteContractAddr} from "../safe4_address";
import {SNVoteRetInfo} from "../types/snvote";

export class SNVote {
    private readonly _contract: Contract<typeof SNVoteABI>

    public constructor() {
        this._contract = new Contract(SNVoteABI, SNVoteContractAddr);
    }

    public link(parentContext: Web3Context) {
        this._contract.link(parentContext);
    }

    public async voteOrApproval(fromAddr: Address, isVote: boolean, dstAddr: Address, recordIDs: number[]): Promise<string> {
        if (this._contract.methods.voteOrApproval === undefined) {
            throw new Error("provided SNVoteABI is missing voteOrApproval method");
        }
        try {
            const receipt = await this._contract.methods.voteOrApproval(isVote, dstAddr, recordIDs).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async removeVoteOrApproval(fromAddr: Address, recordIDs: number[]): Promise<string> {
        if (this._contract.methods.removeVoteOrApproval === undefined) {
            throw new Error("provided SNVoteABI is missing removeVoteOrApproval method");
        }
        try {
            const receipt = await this._contract.methods.removeVoteOrApproval(recordIDs).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async proxyVote(fromAddr: Address, snAddr: Address): Promise<string> {
        if (this._contract.methods.proxyVote === undefined) {
            throw new Error("provided SNVoteABI is missing proxyVote method");
        }
        try {
            const receipt = await this._contract.methods.proxyVote(snAddr).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async getSuperNodes4Voter(voterAddr: Address): Promise<SNVoteRetInfo> {
        if (this._contract.methods.getSuperNodes4Voter === undefined) {
            throw new Error("provided SNVoteABI is missing getSuperNodes4Voter method");
        }
        return this._contract.methods.getSuperNodes4Voter(voterAddr).call();
    }

    public async getRecordIDs4Voter(voterAddr: Address): Promise<number[]> {
        if (this._contract.methods.getRecordIDs4Voter === undefined) {
            throw new Error("provided SNVoteABI is missing getRecordIDs4Voter method");
        }
        return this._contract.methods.getRecordIDs4Voter(voterAddr).call();
    }

    public async getVoters4SN(snAddr: Address): Promise<SNVoteRetInfo> {
        if (this._contract.methods.getVoters4SN === undefined) {
            throw new Error("provided SNVoteABI is missing getVoters4SN method");
        }
        return this._contract.methods.getVoters4SN(snAddr).call();
    }

    public async getVoteNum4SN(snAddr: Address): Promise<number> {
        if (this._contract.methods.getVoteNum4SN === undefined) {
            throw new Error("provided SNVoteABI is missing getVoteNum4SN method");
        }
        return this._contract.methods.getVoteNum4SN(snAddr).call();
    }

    public async getProxies4Voter(voterAddr: Address): Promise<SNVoteRetInfo> {
        if (this._contract.methods.getProxies4Voter === undefined) {
            throw new Error("provided SNVoteABI is missing getProxies4Voter method");
        }
        return this._contract.methods.getProxies4Voter(voterAddr).call();
    }

    public async getProxiedRecordIDs4Voter(voterAddr: Address): Promise<number[]> {
        if (this._contract.methods.getProxiedRecordIDs4Voter === undefined) {
            throw new Error("provided SNVoteABI is missing getProxiedRecordIDs4Voter method");
        }
        return this._contract.methods.getProxiedRecordIDs4Voter(voterAddr).call();
    }

    public async getVoters4Proxy(proxyAddr: Address): Promise<SNVoteRetInfo> {
        if (this._contract.methods.getVoters4Proxy === undefined) {
            throw new Error("provided SNVoteABI is missing getVoters4Proxy method");
        }
        return this._contract.methods.getVoters4Proxy(proxyAddr).call();
    }

    public async getVoteNum4Proxy(proxyAddr: Address): Promise<number> {
        if (this._contract.methods.getVoteNum4Proxy === undefined) {
            throw new Error("provided SNVoteABI is missing getVoteNum4Proxy method");
        }
        return this._contract.methods.getVoteNum4Proxy(proxyAddr).call();
    }
}