import {Address} from "web3";

export interface StateEntry {
    readonly caller: Address;
    readonly state: number;
}

export interface StateInfo {
    readonly addr: Address;
    readonly id: number;
    readonly state: number;
}