import {Address} from "web3";

export interface MasterNodeMemberInfo {
    readonly lockID: number;
    readonly addr: Address;
    readonly amount: number;
    readonly height: number;
}

export interface MasterNodeIncentivePlan {
    readonly creator: number;
    readonly partner: number;
    readonly voter: number;
}

export interface MasterNodeStateInfo {
    readonly state: number;
    readonly height: number;
}

export interface MasterNodeInfo {
    readonly id: number;
    readonly addr: Address;
    readonly creator: Address;
    readonly amount: number;
    readonly enode: string;
    readonly ip: string;
    readonly description: string;
    readonly isOfficial: boolean;
    readonly stateInfo: MasterNodeStateInfo;
    readonly founders: MasterNodeMemberInfo[];
    readonly incentivePlan: MasterNodeIncentivePlan;
    readonly lastRewardHeight: number;
    readonly createHeight: number;
    readonly updateHeight: number;
}