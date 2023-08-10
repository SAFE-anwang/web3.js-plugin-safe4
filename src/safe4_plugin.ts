import { Address, Contract, ContractAbi, Web3PluginBase, Web3Context } from 'web3';
import { PropertyAbi } from './safe4_abis/property_abi';
import { PropertyAddress } from './safe4_address';

export class Safe4Plugin extends Web3PluginBase {
    public pluginNamespace: string
    public propertyAbi: ContractAbi
    public propertyAddress: Address
    public _contract: Contract<typeof PropertyAbi>

    public constructor(options?: {
        pluginNamespace?: string;
        propertyABI?: ContractAbi;
        propertyAddress?: Address;
    }) {
        super();
        this.pluginNamespace = options?.pluginNamespace ?? 'safe4';
        this.propertyAbi = options?.propertyABI ?? PropertyAbi;
        this.propertyAddress = options?.propertyAddress ?? PropertyAddress;
        this._contract = new Contract(this.propertyAbi, this.propertyAddress)
    }

    public link(parentContext: Web3Context) {
        super.link(parentContext);
        this._contract.link(parentContext);
    }

    public async getPropertyValue(name: string) {
        // eslint-disable-next-line eqeqeq
        if(this._contract.methods.getValue != undefined) {
            return this._contract.methods.getValue(name).call();
        }
        throw new Error(
            'Unable to get property value, provided propertyABI is missing getValue method',
        );
    }
}

// Module Augmentation
declare module 'web3' {
    interface Web3Context {
        safe4: Safe4Plugin;
    }
}