import {Web3Context, Web3PluginBase} from 'web3';
import {Property} from "./contracts/property";
import {AccountManager} from "./contracts/accountmanager";
import {MasterNode} from "./contracts/masternode";
import {SuperNode} from "./contracts/supernode";
import {SNVote} from "./contracts/snvote";
import {Proposal} from "./contracts/proposal";
import {Safe3} from "./contracts/safe3";

export class Safe4Plugin extends Web3PluginBase {
    public pluginNamespace = "safe4";
    public sysproperty: Property;
    public account: AccountManager;
    public masternode: MasterNode;
    public supernode: SuperNode;
    public snvote: SNVote;
    public proposal: Proposal;
    public safe3: Safe3;

    public constructor() {
        super();
        this.sysproperty = new Property();
        this.account = new AccountManager();
        this.masternode = new MasterNode();
        this.supernode = new SuperNode();
        this.snvote = new SNVote();
        this.proposal = new Proposal();
        this.safe3 = new Safe3();
    }

    public link(parentContext: Web3Context) {
        super.link(parentContext);
        this.sysproperty.link(parentContext);
        this.account.link(parentContext);
        this.masternode.link(parentContext);
        this.supernode.link(parentContext);
        this.snvote.link(parentContext);
        this.proposal.link(parentContext);
        this.safe3.link(parentContext);
    }
}

// Module Augmentation
declare module 'web3' {
    interface Web3Context {
        safe4: Safe4Plugin;
    }
}