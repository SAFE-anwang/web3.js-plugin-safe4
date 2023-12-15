import {Web3} from "web3";

export async function isUnlocked(web3: Web3, address: string) {
    try {
        await web3.eth.sign("0x01", address);
    } catch (e) {
        return false;
    }
    return true;
}
