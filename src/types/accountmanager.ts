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
    readonly specialAddr: Address;
    readonly freezeHeight: number;
    readonly unfreezeHeight: number;
    readonly voteAddr: Address;
    readonly voteHeight: number;
    readonly releaseHeight: number;
}