import {Address} from "web3";

export interface StateEntry {
    readonly caller: Address;
    readonly state: number;
}