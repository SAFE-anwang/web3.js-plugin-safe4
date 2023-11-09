import {Address} from "web3";

export interface SNVoteRetInfo {
    readonly addrs: Address[];
    readonly voteNums: number[];
}