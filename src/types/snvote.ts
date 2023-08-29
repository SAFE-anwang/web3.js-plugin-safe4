import {Address} from "web3";

export interface SuperNodeMemberInfo {
    readonly lockID: number;
    readonly addr: Address;
    readonly amount: number;
    readonly height: number;
}

export interface SuperNodeIncentivePlan {
    readonly creator: number;
    readonly partner: number;
    readonly voter: number;
}

export interface SuperNodeStateInfo {
    readonly state: number;
    readonly height: number;
}

export interface SuperNodeVoteInfo {
    readonly Voters: SuperNodeMemberInfo[];
    readonly totalAmount: number;
    readonly totalNum: number;
    readonly height: number;
}

export interface SuperNodeInfo {
    readonly id: number;
    readonly name: string;
    readonly addr: Address;
    readonly creator: Address;
    readonly amount: number;
    readonly enode: string;
    readonly ip: string;
    readonly description: string;
    readonly isOfficial: boolean;
    readonly stateInfo: SuperNodeStateInfo;
    readonly founders: SuperNodeMemberInfo[];
    readonly incentivePlan: SuperNodeIncentivePlan;
    readonly voteInfo: SuperNodeVoteInfo;
    readonly lastRewardHeight: number;
    readonly createHeight: number;
    readonly updateHeight: number;
}