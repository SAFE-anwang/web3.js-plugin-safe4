import {Address, Contract, ContractExecutionError, Web3Context} from "web3";
import {SuperNodeStateABI} from "../safe4_abi";
import {SuperNodeStateContractAddr} from "../safe4_address";
import {StateEntry} from "../types/nodestate";

export class SuperNodeState {
    private readonly _contract: Contract<typeof SuperNodeStateABI>

    public constructor() {
        this._contract = new Contract(SuperNodeStateABI, SuperNodeStateContractAddr);
    }

    public link(parentContext: Web3Context) {
        this._contract.link(parentContext);
    }

    public async upload(fromAddr: Address, ids: number[], states: number[]): Promise<string> {
        if (this._contract.methods.upload === undefined) {
            throw new Error("provided SuperNodeStateABI is missing upload method");
        }
        return new Promise<string>((resolve, reject) => {
            this._contract.methods.upload(ids, states).send({from: fromAddr})
                .on("transactionHash", hash => {
                    resolve(hash);
                })
                .on("error", e => {
                    reject(e.innerError);
                });
        });
    }

    public async get(id: number): Promise<StateEntry[]> {
        if (this._contract.methods.get === undefined) {
            throw new Error("provided SuperNodeStateABI is missing get method");
        }
        return this._contract.methods.get(id).call();
    }
}