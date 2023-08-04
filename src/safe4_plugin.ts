import { Address, Contract, ContractAbi, Web3PluginBase } from 'web3';
import { PropertyABI } from './safe4_abis/property_abi';
import { PropertyAddress } from './safe4_address';

export class Safe4Plugin extends Web3PluginBase {
    public pluginNamespace: string
    public propertyABI: ContractAbi
    public propertyAddress: Address

    public constructor(options?: {
        pluginNamespace ?: string;
        propertyABI?: ContractAbi;
        propertyAddress?: Address;
    }) {
        super();
        this.pluginNamespace = options?.pluginNamespace ?? 'safe4';
        this.propertyABI = options?.propertyABI ?? PropertyABI;
        this.propertyAddress = options?.propertyAddress ?? PropertyAddress;
    }

    public async getPropertyValue(name: string) {
        const _contract: Contract<typeof this.propertyABI> = new Contract(this.propertyABI, this.propertyAddress);
        _contract.link(this);
        if(_contract.methods.getValue != undefined) {
            return "hello"
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