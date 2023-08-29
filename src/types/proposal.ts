import {Address} from "web3";

export interface ProposalInfo {
    readonly id: number;
    readonly creator: Address;
    readonly title: string;
    readonly payAmount: number;
    readonly payTimes: number;
    readonly startPayTime: number;
    readonly endPayTime: number;
    readonly description: string;
    readonly detail: string;
    readonly voters: Address[];
    readonly state: number;
    readonly createHeight: number;
    readonly updateHeight: number;
}