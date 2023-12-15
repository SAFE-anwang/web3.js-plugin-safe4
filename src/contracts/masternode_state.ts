import {Address, Contract, ContractExecutionError, Web3Context} from "web3";
import {MasterNodeStateABI} from "../safe4_abi";
import {MasterNodeStateContractAddr} from "../safe4_address";
import {StateEntry} from "../types/nodestate";

export class MasterNodeState {
    private readonly _contract: Contract<typeof MasterNodeStateABI>

    public constructor() {
        this._contract = new Contract(MasterNodeStateABI, MasterNodeStateContractAddr);
    }

    public link(parentContext: Web3Context) {
        this._contract.link(parentContext);
    }

    public async upload(fromAddr: Address, ids: number[], states: number[]): Promise<string> {
        if (this._contract.methods.upload === undefined) {
            throw new Error("provided MasterNodeStateABI is missing upload method");
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
            throw new Error("provided MasterNodeStateABI is missing get method");
        }
        return this._contract.methods.get(id).call();
    }
}