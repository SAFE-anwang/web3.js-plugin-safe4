import {Address} from "web3";

export interface ProposalInfo {
    readonly id: bigint;
    readonly creator: Address;
    readonly title: string;
    readonly payAmount: bigint;
    readonly payTimes: bigint;
    readonly startPayTime: bigint;
    readonly endPayTime: bigint;
    readonly description: string;
    readonly state: bigint;
    readonly createHeight: bigint;
    readonly updateHeight: bigint;
}

export interface ProposalVoteInfo {
    readonly voter: Address;
    readonly voteResult: bigint;
}