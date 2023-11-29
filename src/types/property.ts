import {Address} from "web3";

export interface PropertyInfo {
    readonly name: string;
    readonly value: bigint;
    readonly description: string;
    readonly createHeight: bigint;
    readonly updateHeight: bigint;
}

export interface UnconfirmedPropertyInfo {
    readonly name: string;
    readonly value: bigint;
    readonly applicant: Address;
    readonly voters: Address[];
    readonly voteResults: bigint[];
    readonly reason: string;
    readonly applyHeight: bigint;
}