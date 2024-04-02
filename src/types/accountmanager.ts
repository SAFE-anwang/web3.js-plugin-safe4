import {Address} from "web3";

export interface AccountRecord {
    readonly id: bigint;
    readonly addr: Address;
    readonly amount: bigint;
    readonly lockDay: bigint;
    readonly startHeight: bigint;
    readonly unlockHeight: bigint;
}

export interface RecordUseInfo {
    readonly frozenAddr: Address;
    readonly freezeHeight: bigint;
    readonly unfreezeHeight: bigint;
    readonly votedAddr: Address;
    readonly voteHeight: bigint;
    readonly releaseHeight: bigint;
}

export interface AccountAmountInfo {
    amount: bigint;
    num: bigint;
}