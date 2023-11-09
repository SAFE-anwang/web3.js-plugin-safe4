import {Address} from "web3";

export interface AccountRecord {
    readonly id: number;
    readonly addr: Address;
    readonly amount: number;
    readonly lockDay: number;
    readonly startHeight: number;
    readonly unlockHeight: number;
}

export interface RecordUseInfo {
    readonly frozenAddr: Address;
    readonly freezeHeight: number;
    readonly unfreezeHeight: number;
    readonly voteAddr: Address;
    readonly voteHeight: number;
    readonly releaseHeight: number;
}

export interface AccountAmountInfo {
    readonly amount: number;
    readonly ids: number[];
}