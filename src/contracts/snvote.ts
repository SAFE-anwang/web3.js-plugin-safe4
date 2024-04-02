import {Address, Contract, Web3Context} from "web3";
import {SNVoteABI} from "../safe4_abi";
import {SNVoteContractAddr} from "../safe4_address";
import {SNVoteRetInfo} from "../types/snvote";
import {ContractUitl} from "../utils/ContractUitl";

export class SNVote {
    private readonly _contract: Contract<typeof SNVoteABI>

    public constructor() {
        this._contract = new Contract(SNVoteABI, SNVoteContractAddr);
    }

    public link(parentContext: Web3Context) {
        this._contract.link(parentContext);
    }

    public async voteOrApproval(privateKey: string, isVote: boolean, dstAddr: Address, recordIDs: number[]): Promise<string> {
        if (this._contract.methods.voteOrApproval === undefined) {
            throw new Error("provided SNVoteABI is missing voteOrApproval method");
        }
        return ContractUitl.invokeContract(this._contract, privateKey, 0, this._contract.methods.voteOrApproval(isVote, dstAddr, recordIDs).encodeABI());
    }

    public async voteOrApprovalWithAmount(privateKey: string, value: string, isVote: boolean, dstAddr: Address): Promise<string> {
        if (this._contract.methods.voteOrApprovalWithAmount === undefined) {
            throw new Error("provided SNVoteABI is missing voteOrApprovalWithAmount method");
        }
        return ContractUitl.invokeContract(this._contract, privateKey, value, this._contract.methods.voteOrApprovalWithAmount(isVote, dstAddr).encodeABI());
    }

    public async removeVoteOrApproval(privateKey: string, recordIDs: number[]): Promise<string> {
        if (this._contract.methods.removeVoteOrApproval === undefined) {
            throw new Error("provided SNVoteABI is missing removeVoteOrApproval method");
        }
        return ContractUitl.invokeContract(this._contract, privateKey, 0, this._contract.methods.removeVoteOrApproval(recordIDs).encodeABI());
    }

    public async proxyVote(privateKey: string, snAddr: Address): Promise<string> {
        if (this._contract.methods.proxyVote === undefined) {
            throw new Error("provided SNVoteABI is missing proxyVote method");
        }
        return ContractUitl.invokeContract(this._contract, privateKey, 0, this._contract.methods.proxyVote(snAddr).encodeABI());
    }

    public async getAmount4Voter(voterAddr: Address): Promise<bigint> {
        if (this._contract.methods.getAmount4Voter === undefined) {
            throw new Error("provided SNVoteABI is missing getAmount4Voter method");
        }
        return this._contract.methods.getAmount4Voter(voterAddr).call();
    }

    public async getVoteNum4Voter(voterAddr: Address): Promise<bigint> {
        if (this._contract.methods.getVoteNum4Voter === undefined) {
            throw new Error("provided SNVoteABI is missing getVoteNum4Voter method");
        }
        return this._contract.methods.getVoteNum4Voter(voterAddr).call();
    }

    public async getSNNum4Voter(voterAddr: Address): Promise<bigint> {
        if (this._contract.methods.getSNNum4Voter === undefined) {
            throw new Error("provided SNVoteABI is missing getSNNum4Voter method");
        }
        return this._contract.methods.getSNNum4Voter(voterAddr).call();
    }

    public async getSNs4Voter(voterAddr: Address, start: number, count: number): Promise<SNVoteRetInfo> {
        if (this._contract.methods.getSNs4Voter === undefined) {
            throw new Error("provided SNVoteABI is missing getSNs4Voter method");
        }
        return this.toSNVoteRetInfo(await this._contract.methods.getSNs4Voter(voterAddr, start, count).call());
    }

    public async getProxyNum4Voter(voterAddr: Address): Promise<bigint> {
        if (this._contract.methods.getProxyNum4Voter === undefined) {
            throw new Error("provided SNVoteABI is missing getProxyNum4Voter method");
        }
        return this._contract.methods.getProxyNum4Voter(voterAddr).call();
    }

    public async getProxies4Voter(voterAddr: Address, start: number, count: number): Promise<SNVoteRetInfo> {
        if (this._contract.methods.getProxies4Voter === undefined) {
            throw new Error("provided SNVoteABI is missing getProxies4Voter method");
        }
        return this.toSNVoteRetInfo(await this._contract.methods.getProxies4Voter(voterAddr, start, count).call());
    }

    public async getVotedIDNum4Voter(voterAddr: Address): Promise<bigint> {
        if (this._contract.methods.getVotedIDNum4Voter === undefined) {
            throw new Error("provided SNVoteABI is missing getVotedIDNum4Voter method");
        }
        return this._contract.methods.getVotedIDNum4Voter(voterAddr).call();
    }

    public async getVotedIDs4Voter(voterAddr: Address, start: number, count: number): Promise<bigint[]> {
        if (this._contract.methods.getVotedIDs4Voter === undefined) {
            throw new Error("provided SNVoteABI is missing getVotedIDs4Voter method");
        }
        return this._contract.methods.getVotedIDs4Voter(voterAddr, start, count).call();
    }

    public async getProxiedIDNum4Voter(voterAddr: Address): Promise<bigint> {
        if (this._contract.methods.getProxiedIDNum4Voter === undefined) {
            throw new Error("provided SNVoteABI is missing getProxiedIDNum4Voter method");
        }
        return this._contract.methods.getProxiedIDNum4Voter(voterAddr).call();
    }

    public async getProxiedIDs4Voter(voterAddr: Address, start: number, count: number): Promise<bigint[]> {
        if (this._contract.methods.getProxiedIDs4Voter === undefined) {
            throw new Error("provided SNVoteABI is missing getProxiedIDs4Voter method");
        }
        return this._contract.methods.getProxiedIDs4Voter(voterAddr, start, count).call();
    }

    public async getTotalAmount(addr: Address): Promise<bigint> {
        if (this._contract.methods.getTotalAmount === undefined) {
            throw new Error("provided SNVoteABI is missing getTotalAmount method");
        }
        return this._contract.methods.getTotalAmount(addr).call();
    }

    public async getTotalVoteNum(addr: Address): Promise<bigint> {
        if (this._contract.methods.getTotalVoteNum === undefined) {
            throw new Error("provided SNVoteABI is missing getTotalVoteNum method");
        }
        return this._contract.methods.getTotalVoteNum(addr).call();
    }

    public async getVoterNum(addr: Address): Promise<bigint> {
        if (this._contract.methods.getVoterNum === undefined) {
            throw new Error("provided SNVoteABI is missing getVoterNum method");
        }
        return this._contract.methods.getVoterNum(addr).call();
    }

    public async getVoters(snAddr: Address, start: number, count: number): Promise<SNVoteRetInfo> {
        if (this._contract.methods.getVoters === undefined) {
            throw new Error("provided SNVoteABI is missing getVoters method");
        }
        return this.toSNVoteRetInfo(await this._contract.methods.getVoters(snAddr, start, count).call());
    }

    public async getIDNum(addr: Address): Promise<bigint> {
        if (this._contract.methods.getIDNum === undefined) {
            throw new Error("provided SNVoteABI is missing getIDNum method");
        }
        return this._contract.methods.getIDNum(addr).call();
    }

    public async getIDs(addr: Address, start: number, count: number): Promise<bigint[]> {
        if (this._contract.methods.getIDs === undefined) {
            throw new Error("provided SNVoteABI is missing getIDs method");
        }
        return this._contract.methods.getIDs(addr, start, count).call();
    }

    // eslint-disable-next-line class-methods-use-this
    private toSNVoteRetInfo(obj: object): SNVoteRetInfo {
        const info: SNVoteRetInfo = {
            addrs: [],
            voteNums: []
        };
        obj["0"].forEach((e: Address) => {
            info.addrs.push(e);
        });
        obj["1"].forEach((e: bigint) => {
            info.voteNums.push(e)
        })
        return info;
    }
}