import {Address} from "web3";

export interface SuperNodeMemberInfo {
    readonly lockID: bigint;
    readonly addr: Address;
    readonly amount: bigint;
    readonly height: bigint;
}

export interface SuperNodeIncentivePlan {
    readonly creator: bigint;
    readonly partner: bigint;
    readonly voter: bigint;
}

export interface SuperNodeStateInfo {
    readonly state: bigint;
    readonly height: bigint;
}

export interface SuperNodeVoteInfo {
    readonly voters: SuperNodeMemberInfo[];
    readonly totalAmount: bigint;
    readonly totalNum: bigint;
    readonly height: bigint;
}

export interface SuperNodeInfo {
    readonly id: bigint;
    readonly name: string;
    readonly addr: Address;
    readonly creator: Address;
    readonly enode: string;
    readonly description: string;
    readonly isOfficial: boolean;
    readonly stateInfo: SuperNodeStateInfo;
    readonly founders: SuperNodeMemberInfo[];
    readonly incentivePlan: SuperNodeIncentivePlan;
    readonly voteInfo: SuperNodeVoteInfo;
    readonly lastRewardHeight: bigint;
    readonly createHeight: bigint;
    readonly updateHeight: bigint;
}