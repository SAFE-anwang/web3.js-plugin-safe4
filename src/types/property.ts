import {Address} from "web3";

export interface PropertyInfo {
    readonly name: string;
    readonly value: number;
    readonly description: string;
    readonly createHeight: number;
    readonly updateHeight: number;
}

export interface UnconfirmedPropertyInfo {
    readonly name: string;
    readonly value: number;
    readonly applicant: Address;
    readonly voters: Address[];
    readonly voteResults: number[];
    readonly reason: string;
    readonly applyHeight: number;
}