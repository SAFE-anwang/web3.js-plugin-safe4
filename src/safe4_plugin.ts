import {Web3Context, Web3PluginBase} from 'web3';
import {Property} from "./contracts/property";

export class Safe4Plugin extends Web3PluginBase {
    public pluginNamespace = "safe4";
    public property: Property

    public constructor() {
        super();
        this.property = new Property();
    }

    public link(parentContext: Web3Context) {
        super.link(parentContext);
        this.property.link(parentContext);
    }
}

// Module Augmentation
declare module 'web3' {
    interface Web3Context {
        safe4: Safe4Plugin;
    }
}