import {Web3} from "web3";
import {Safe4Plugin} from "../../src";

describe('Safe4Plugin MasterNode Tests', () => {
    let web3: Web3;

    beforeAll(async () => {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        web3.registerPlugin(new Safe4Plugin());
    });

    test("register", async () => {
        // mn: 0x69a6d725f772e44f11bd6d21ec5a92fdc7eab652, privateKey: 0x40f93c4fb6ea8bcbc5e88c3c213bc86c72e68f5404ef047d6ac3b3e3db2dd816
        let privateKey = "0x40f93c4fb6ea8bcbc5e88c3c213bc86c72e68f5404ef047d6ac3b3e3db2dd816";
        let mnAddr = "0x69a6d725f772e44f11bd6d21ec5a92fdc7eab652";
        let enode = "enode://f687439863fce1ff70dc40bec0fe5ea1ad0833a2672c29590b0aa9001e1488013e42e8adc96a6a9312ed1426d6bea47026d057df57a5856970b207afac771f09@10.0.0.173:30303";
        let description = "masternode3 for test";
        try {
            let result = await web3.safe4.masternode.register(privateKey, web3.utils.toWei(200, 'ether'), true, mnAddr, 720, enode, description, 40, 60);
            console.log("register-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("appendRegister", async () => {
        let privateKey = "0x40f93c4fb6ea8bcbc5e88c3c213bc86c72e68f5404ef047d6ac3b3e3db2dd816";
        let mnAddr = "0x69a6d725f772e44f11bd6d21ec5a92fdc7eab652";
        try {
            let result = await web3.safe4.masternode.appendRegister(privateKey, web3.utils.toWei(800, 'ether'), mnAddr, 360);
            console.log("appendRegister-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("turnRegister", async () => {
        let privateKey = "0x40f93c4fb6ea8bcbc5e88c3c213bc86c72e68f5404ef047d6ac3b3e3db2dd816";
        let mnAddr = "0x69a6d725f772e44f11bd6d21ec5a92fdc7eab652";
        try {
            let result = await web3.safe4.masternode.turnRegister(privateKey, mnAddr, 9);
            console.log("turnRegister-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changeAddress", async () => {
        let privateKey = "0x40f93c4fb6ea8bcbc5e88c3c213bc86c72e68f5404ef047d6ac3b3e3db2dd816";
        let mnAddr = "0x69a6d725f772e44f11bd6d21ec5a92fdc7eab652";
        let newAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
        try {
            let result = await web3.safe4.masternode.changeAddress(privateKey, mnAddr, newAddr);
            console.log("changeAddress-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changeEnode", async () => {
        let privateKey = "0x40f93c4fb6ea8bcbc5e88c3c213bc86c72e68f5404ef047d6ac3b3e3db2dd816";
        let mnAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
        let enode = "enode://f687439863fce1ff70dc40bec0fe5ea1ad0833a2672c29590b0aa9001e1488013e42e8adc96a6a9312ed1426d6bea47026d057df57a5856970b207afac771f09@10.0.0.3:30303";
        try {
            let result = await web3.safe4.masternode.changeEnode(privateKey, mnAddr, enode);
            console.log("changeEnode-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changeDescription", async () => {
        let privateKey = "0x40f93c4fb6ea8bcbc5e88c3c213bc86c72e68f5404ef047d6ac3b3e3db2dd816";
        let mnAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
        let description = "mn-3 for test";
        try {
            let result = await web3.safe4.masternode.changeDescription(privateKey, mnAddr, description);
            console.log("changeDescription-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("getInfo", async () => {
        let mnAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
        let result = await web3.safe4.masternode.getInfo(mnAddr);
        console.log(result);
        expect(result.enode.length).not.toEqual(0);
    });

    test("getInfoByID", async () => {
        let result = await web3.safe4.masternode.getInfoByID(3);
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
        let mnAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
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
        let enode = "enode://f687439863fce1ff70dc40bec0fe5ea1ad0833a2672c29590b0aa9001e1488013e42e8adc96a6a9312ed1426d6bea47026d057df57a5856970b207afac771f09@10.0.0.3:30303";
        let result = await web3.safe4.masternode.existEnode(enode);
        console.log(result);
        expect(result).toEqual(true);
    });

    test("existLockID", async () => {
        let mnAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
        let result = await web3.safe4.masternode.existLockID(mnAddr, 9);
        console.log(result);
        expect(result).toEqual(true);
    });

    test("isValid", async () => {
        let mnAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
        let result = await web3.safe4.masternode.isValid(mnAddr);
        console.log(result);
        expect(result).toEqual(true);
    });
});