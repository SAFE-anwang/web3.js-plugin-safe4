import {Web3} from "web3";
import {Safe4Plugin} from "../../src";

describe('Safe4Plugin MasterNode Tests', () => {
    let web3: Web3;

    beforeAll(async () => {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        web3.registerPlugin(new Safe4Plugin());
    });

    test("register independent masternode", async () => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        let mnAddr = "0xa5cec2b8cda30da3f3170b4505cb44226b6c9dd2";
        let enode = "enode://7d9cd0f84db59f040755bb7475fddd5190521db7373e6a3d8bf35b95727851821ab7e8dcb1ad3ea89f6a7d5d2e82e052b23a2a53ea5a9a86d708c7a02d2913c8@10.0.0.203:30303";
        let description = "independent masternode";
        try {
            let result = await web3.safe4.masternode.register(privateKey, web3.utils.toWei(1000, 'ether'), false, mnAddr, 720, enode, description, 100, 0);
            console.log("register-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("register union masternode", async () => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        let mnAddr = "0xd6ebea69f2d81b9ca259c0b6ed3d9ad6aa206ef1";
        let enode = "enode://7d9cd0f84db59f040755bb7475fddd5190521db7373e6a3d8bf35b95727851821ab7e8dcb1ad3ea89f6a7d5d2e82e052b23a2a53ea5a9a86d708c7a02d2913c8@10.0.0.204:30303";
        let description = "union masternode";
        try {
            let result = await web3.safe4.masternode.register(privateKey, web3.utils.toWei(200, 'ether'), true, mnAddr, 720, enode, description, 50, 50);
            console.log("register-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("appendRegister", async () => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        let mnAddr = "0xd6ebea69f2d81b9ca259c0b6ed3d9ad6aa206ef1";
        try {
            let result = await web3.safe4.masternode.appendRegister(privateKey, web3.utils.toWei(100, 'ether'), mnAddr, 360);
            console.log("appendRegister-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("turnRegister", async () => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        let mnAddr = "0xd6ebea69f2d81b9ca259c0b6ed3d9ad6aa206ef1";
        try {
            let result = await web3.safe4.masternode.turnRegister(privateKey, mnAddr, 9);
            console.log("turnRegister-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changeAddress", async () => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        let mnAddr = "0xd6ebea69f2d81b9ca259c0b6ed3d9ad6aa206ef1";
        let newAddr = "0x69a6d725f772e44f11bd6d21ec5a92fdc7eab652";
        try {
            let result = await web3.safe4.masternode.changeAddress(privateKey, mnAddr, newAddr);
            console.log("changeAddress-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changeEnode", async () => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        let mnAddr = "0x69a6d725f772e44f11bd6d21ec5a92fdc7eab652";
        let enode = "enode://7d9cd0f84db59f040755bb7475fddd5190521db7373e6a3d8bf35b95727851821ab7e8dcb1ad3ea89f6a7d5d2e82e052b23a2a53ea5a9a86d708c7a02d2913c8@10.0.0.205:30303";
        try {
            let result = await web3.safe4.masternode.changeEnode(privateKey, mnAddr, enode);
            console.log("changeEnode-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("getInfo", async () => {
        let mnAddr = "0xd6ebea69f2d81b9ca259c0b6ed3d9ad6aa206ef1";
        let result = await web3.safe4.masternode.getInfo(mnAddr);
        console.log(result);
        expect(result.enode.length).not.toEqual(0);
    });

    test("getInfoByID", async () => {
        let result = await web3.safe4.masternode.getInfoByID(1);
        console.log(result);
        expect(result.enode.length).not.toEqual(0);
    });

    test("getNext", async () => {
        let result = await web3.safe4.masternode.getNext();
        console.log(result);
        expect(result).not.toEqual('0x0000000000000000000000000000000000000000');
    });

    test("getNum", async () => {
        let result = await web3.safe4.masternode.getNum();
        console.log(result);
        expect(result).toBeGreaterThan(0n);
    });

    test("getAll", async () => {
        let result = await web3.safe4.masternode.getAll(0, 100);
        console.log(result);
        expect(result.length).toBeGreaterThan(1);
    });

    test("getOfficials", async () => {
        let result = await web3.safe4.masternode.getOfficials();
        console.log(result);
        expect(result.length).toBeGreaterThan(1);
    });

    test("exist", async () => {
        let mnAddr = "0xd6ebea69f2d81b9ca259c0b6ed3d9ad6aa206ef1";
        let result = await web3.safe4.masternode.exist(mnAddr);
        console.log(result);
        expect(result).toEqual(true);
    });

    test("existID", async () => {
        let result = await web3.safe4.masternode.existID(4);
        console.log(result);
        expect(result).toEqual(true);
    });

    test("existEnode", async () => {
        let enode = "enode://7d9cd0f84db59f040755bb7475fddd5190521db7373e6a3d8bf35b95727851821ab7e8dcb1ad3ea89f6a7d5d2e82e052b23a2a53ea5a9a86d708c7a02d2913c8@10.0.0.203:30303";
        let result = await web3.safe4.masternode.existEnode(enode);
        console.log(result);
        expect(result).toEqual(true);
    });

    test("existLockID", async () => {
        let mnAddr = "0xd6ebea69f2d81b9ca259c0b6ed3d9ad6aa206ef1";
        let result = await web3.safe4.masternode.existLockID(mnAddr, 9);
        console.log(result);
        expect(result).toEqual(true);
    });

    test("isValid", async () => {
        let mnAddr = "0xd6ebea69f2d81b9ca259c0b6ed3d9ad6aa206ef1";
        let result = await web3.safe4.masternode.isValid(mnAddr);
        console.log(result);
        expect(result).toEqual(true);
    });
});