import {Address} from "web3";

export interface MasterNodeMemberInfo {
    readonly lockID: bigint;
    readonly addr: Address;
    readonly amount: bigint;
    readonly height: bigint;
}

export interface MasterNodeIncentivePlan {
    readonly creator: bigint;
    readonly partner: bigint;
    readonly voter: bigint;
}

export interface MasterNodeStateInfo {
    readonly state: bigint;
    readonly height: bigint;
}

export interface MasterNodeInfo {
    readonly id: bigint;
    readonly addr: Address;
    readonly creator: Address;
    readonly enode: string;
    readonly description: string;
    readonly isOfficial: boolean;
    readonly stateInfo: MasterNodeStateInfo;
    readonly founders: MasterNodeMemberInfo[];
    readonly incentivePlan: MasterNodeIncentivePlan;
    readonly lastRewardHeight: bigint;
    readonly createHeight: bigint;
    readonly updateHeight: bigint;
}