import {Address, Contract, ContractExecutionError, Web3Context} from "web3";
import {SuperNodeStateABI} from "../safe4_abi";
import {SuperNodeStateContractAddr} from "../safe4_address";
import {StateEntry, StateInfo} from "../types/nodestate";

export class SuperNodeState {
    private readonly _contract: Contract<typeof SuperNodeStateABI>

    public constructor() {
        this._contract = new Contract(SuperNodeStateABI, SuperNodeStateContractAddr);
    }

    public link(parentContext: Web3Context) {
        this._contract.link(parentContext);
    }
    
    public async uploadState(ids: number[], states: number[], fromAddr: Address) {
        if(this._contract.methods.uploadState === undefined) {
            throw new Error("provided SuperNodeStateABI is missing uploadState method");
        }
        try {
            const receipt = await this._contract.methods.uploadState(ids, states).send({from: fromAddr});
            return receipt.transactionHash;
        } catch (e) {
            const error: ContractExecutionError = e as ContractExecutionError;
            return error.innerError.message;
        }
    }

    public async getAllState(): Promise<StateInfo[]> {
        if(this._contract.methods.getAllState === undefined) {
            throw new Error("provided SuperNodeStateABI is missing getAllState method");
        }
        return this._contract.methods.getAllState().call();
    }

    public async getEntries(id: number): Promise<StateEntry[]> {
        if(this._contract.methods.getEntries === undefined) {
            throw new Error("provided SuperNodeStateABI is missing getEntries method");
        }
        return this._contract.methods.getEntries(id).call();
    }
}