import {Web3} from "web3";
import {Safe4Plugin} from "../../src";

describe('Safe4Plugin SuperNode Tests', () => {
    let web3: Web3;

    beforeAll(async () => {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        web3.registerPlugin(new Safe4Plugin());
    });

    test("register", async () => {
        // sn: 0xa5cec2b8cda30da3f3170b4505cb44226b6c9dd2, privateKey: 0x7b281a9ba16001feb62a5929526ef8f69d6550c6acdc3f0579c69199c0b6a010
        let privateKey = "0x7b281a9ba16001feb62a5929526ef8f69d6550c6acdc3f0579c69199c0b6a010";
        let snAddr = "0xa5cec2b8cda30da3f3170b4505cb44226b6c9dd2";
        let name = "supernode-5";
        let enode = "enode://f687439863fce1ff70dc40bec0fe5ea1ad0833a2672c29590b0aa9001e1488013e42e8adc96a6a9312ed1426d6bea47026d057df57a5856970b207afac771f09@10.0.0.165:30303";
        let description = "supernode5 for test";
        try {
            let result = await web3.safe4.supernode.register(privateKey, web3.utils.toWei(5000, 'ether'), false, snAddr, 720, name, enode, description, 10, 40, 50);
            console.log("register-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("appendRegister", async () => {
        // sn: 0xa5cec2b8cda30da3f3170b4505cb44226b6c9dd2, privateKey: 0x7b281a9ba16001feb62a5929526ef8f69d6550c6acdc3f0579c69199c0b6a010
        let privateKey = "0x7b281a9ba16001feb62a5929526ef8f69d6550c6acdc3f0579c69199c0b6a010";
        let snAddr = "0xa5cec2b8cda30da3f3170b4505cb44226b6c9dd2";
        try {
            let result = await web3.safe4.supernode.appendRegister(privateKey, web3.utils.toWei(4000, 'ether'), snAddr, 360);
            console.log("appendRegister-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("turnRegister", async () => {
        // sn: 0xa5cec2b8cda30da3f3170b4505cb44226b6c9dd2, privateKey: 0x7b281a9ba16001feb62a5929526ef8f69d6550c6acdc3f0579c69199c0b6a010
        let privateKey = "0x7b281a9ba16001feb62a5929526ef8f69d6550c6acdc3f0579c69199c0b6a010";
        let snAddr = "0xa5cec2b8cda30da3f3170b4505cb44226b6c9dd2";
        try {
            let result = await web3.safe4.supernode.turnRegister(privateKey, snAddr, 9);
            console.log("turnRegister-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changeAddress", async () => {
        // sn: 0xa5cec2b8cda30da3f3170b4505cb44226b6c9dd2, privateKey: 0x7b281a9ba16001feb62a5929526ef8f69d6550c6acdc3f0579c69199c0b6a010
        let privateKey = "0x7b281a9ba16001feb62a5929526ef8f69d6550c6acdc3f0579c69199c0b6a010";
        let snAddr = "0xa5cec2b8cda30da3f3170b4505cb44226b6c9dd2";
        let newAddr = "0xd6ebea69f2d81b9ca259c0b6ed3d9ad6aa206ef1";
        try {
            let result = await web3.safe4.supernode.changeAddress(privateKey, snAddr, newAddr);
            console.log("changeAddress-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changeName", async () => {
        // sn: 0xa5cec2b8cda30da3f3170b4505cb44226b6c9dd2, privateKey: 0x7b281a9ba16001feb62a5929526ef8f69d6550c6acdc3f0579c69199c0b6a010
        let privateKey = "0x7b281a9ba16001feb62a5929526ef8f69d6550c6acdc3f0579c69199c0b6a010";
        let snAddr = "0xd6ebea69f2d81b9ca259c0b6ed3d9ad6aa206ef1";
        let name = "sn-5";
        try {
            let result = await web3.safe4.supernode.changeName(privateKey, snAddr, name);
            console.log("changeName-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changeEnode", async () => {
        // sn: 0xa5cec2b8cda30da3f3170b4505cb44226b6c9dd2, privateKey: 0x7b281a9ba16001feb62a5929526ef8f69d6550c6acdc3f0579c69199c0b6a010
        let privateKey = "0x7b281a9ba16001feb62a5929526ef8f69d6550c6acdc3f0579c69199c0b6a010";
        let snAddr = "0xd6ebea69f2d81b9ca259c0b6ed3d9ad6aa206ef1";
        let enode = "enode://f687439863fce1ff70dc40bec0fe5ea1ad0833a2672c29590b0aa9001e1488013e42e8adc96a6a9312ed1426d6bea47026d057df57a5856970b207afac771f09@10.0.0.5:30303";
        try {
            let result = await web3.safe4.supernode.changeEnode(privateKey, snAddr, enode);
            console.log("changeEnode-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changeDescription", async () => {
        // sn: 0xa5cec2b8cda30da3f3170b4505cb44226b6c9dd2, privateKey: 0x7b281a9ba16001feb62a5929526ef8f69d6550c6acdc3f0579c69199c0b6a010
        let privateKey = "0x7b281a9ba16001feb62a5929526ef8f69d6550c6acdc3f0579c69199c0b6a010";
        let snAddr = "0xd6ebea69f2d81b9ca259c0b6ed3d9ad6aa206ef1";
        let desciription = "sn-5 for test";
        try {
            let result = await web3.safe4.supernode.changeDescription(privateKey, snAddr, desciription);
            console.log("changeDescription-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("getInfo", async () => {
        let snAddr = "0xd6ebea69f2d81b9ca259c0b6ed3d9ad6aa206ef1";
        let result = await web3.safe4.supernode.getInfo(snAddr);
        console.log(result);
        expect(result.enode.length).not.toEqual(0);
    });

    test("getInfoByID", async () => {
        let result = await web3.safe4.supernode.getInfoByID(5);
        console.log(result);
        expect(result.enode.length).not.toEqual(0);
    });

    test("getNum", async () => {
        let result = await web3.safe4.supernode.getNum();
        console.log(result);
        expect(result).toBeGreaterThan(0n);
    });

    test("getAll", async () => {
        let result = await web3.safe4.supernode.getAll(0, 100);
        console.log(result);
        expect(result.length).toBeGreaterThan(0);
    });

    test("getTops", async () => {
        let result = await web3.safe4.supernode.getTops();
        console.log(result);
        expect(result.length).toBeGreaterThan(0);
    });

    test("getOfficials", async () => {
        let result = await web3.safe4.supernode.getOfficials();
        console.log(result);
        expect(result.length).toBeGreaterThan(0);
    });

    test("exist", async () => {
        let snAddr = "0xd6ebea69f2d81b9ca259c0b6ed3d9ad6aa206ef1";
        let result = await web3.safe4.supernode.exist(snAddr);
        console.log(result);
        expect(result).toEqual(true);
    });

    test("existID", async () => {
        let result = await web3.safe4.supernode.existID(5);
        console.log(result);
        expect(result).toEqual(true);
    });

    test("existName", async () => {
        let name = "sn-5";
        let result = await web3.safe4.supernode.existName(name);
        console.log(result);
        expect(result).toEqual(true);
    });

    test("existEnode", async () => {
        let enode = "enode://f687439863fce1ff70dc40bec0fe5ea1ad0833a2672c29590b0aa9001e1488013e42e8adc96a6a9312ed1426d6bea47026d057df57a5856970b207afac771f09@10.0.0.5:30303";
        let result = await web3.safe4.supernode.existEnode(enode);
        console.log(result);
        expect(result).toEqual(true);
    });

    test("existLockID", async () => {
        let snAddr = "0xd6ebea69f2d81b9ca259c0b6ed3d9ad6aa206ef1";
        let result = await web3.safe4.supernode.existLockID(snAddr, 9);
        console.log(result);
        expect(result).toEqual(true);
    });

    test("isValid", async () => {
        let snAddr = "0xd6ebea69f2d81b9ca259c0b6ed3d9ad6aa206ef1";
        let result = await web3.safe4.supernode.isValid(snAddr);
        console.log(result);
        expect(result).toEqual(true);
    });

    test("isFormal", async () => {
        let snAddr = "0xd6ebea69f2d81b9ca259c0b6ed3d9ad6aa206ef1";
        let result = await web3.safe4.supernode.isFormal(snAddr);
        console.log(result);
        expect(result).toEqual(true);
    });
});