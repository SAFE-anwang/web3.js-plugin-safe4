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

export interface SuperNodeInfo {
    readonly id: bigint;
    readonly name: string;
    readonly addr: Address;
    readonly creator: Address;
    readonly enode: string;
    readonly description: string;
    readonly isOfficial: boolean;
    readonly state: bigint;
    readonly founders: SuperNodeMemberInfo[];
    readonly incentivePlan: SuperNodeIncentivePlan;
    readonly lastRewardHeight: bigint;
    readonly createHeight: bigint;
    readonly updateHeight: bigint;
}