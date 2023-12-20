
export interface Safe3Info {
    readonly addr: string;
    readonly amount: bigint;
    readonly redeemHeight: bigint;
}

export interface Safe3LockInfo {
    readonly addr: string;
    readonly amount: bigint;
    readonly lockHeight: bigint;
    readonly unlockHeight: bigint;
    readonly txid: string;
    readonly isMN: boolean;
    readonly mnState: bigint;
    readonly redeemHeight: bigint;
}