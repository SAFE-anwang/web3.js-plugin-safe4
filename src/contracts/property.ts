import {Web3Context, Contract} from "web3";
import {PropertyAbi} from "../safe4_abi";
import {PropertyAddress} from "../safe4_address";

export class Property {
    private readonly _contract: Contract<typeof PropertyAbi>

    public constructor() {
        this._contract = new Contract(PropertyAbi, PropertyAddress);
    }

    public link(parentContext: Web3Context) {
        this._contract.link(parentContext);
    }

    public async getValue(name: string) {
        if(this._contract.methods.getValue !== undefined) {
            return this._contract.methods.getValue(name).call();
        }
        throw new Error(
            'Unable to get property value, provided propertyABI is missing getValue method',
        );
    }
}