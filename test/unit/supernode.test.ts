import {Web3} from "web3";
import {Safe4Plugin} from "../../src";
import {isUnlocked} from "./test_util";

describe('Safe4Plugin SuperNode Tests', () => {
    let web3: Web3;

    beforeAll(async () => {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        web3.registerPlugin(new Safe4Plugin());
    });

    test("register independent supernode", async () => {
        let fromAddr = "0xac110c0f70867f77d9d230e377043f52480a0b7d";
        let snAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
        let name = "i-sn";
        let enode = "enode://7d9cd0f84db59f040755bb7475fddd5190521db7373e6a3d8bf35b95727851821ab7e8dcb1ad3ea89f6a7d5d2e82e052b23a2a53ea5a9a86d708c7a02d2913c8@10.0.0.103:30303";
        let description = "independent supernode";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.supernode.register(fromAddr, web3.utils.toWei(5000, 'ether'), false, snAddr, 720, name, enode, description, 10, 40, 50);
            console.log("register-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("register union supernode", async () => {
        let fromAddr = "0xac110c0f70867f77d9d230e377043f52480a0b7d";
        let snAddr = "0x26e701eb4369c9892bb45381bc853aa80e5aa6e8";
        let name = "u-sn";
        let enode = "enode://7d9cd0f84db59f040755bb7475fddd5190521db7373e6a3d8bf35b95727851821ab7e8dcb1ad3ea89f6a7d5d2e82e052b23a2a53ea5a9a86d708c7a02d2913c8@10.0.0.104:30303";
        let description = "union supernode";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.supernode.register(fromAddr, web3.utils.toWei(1000, 'ether'), true, snAddr, 720, name, enode, description, 10, 40, 50);
            console.log("register-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("appendRegister", async () => {
        let fromAddr = "0x044f9c93b57efaa547f8461d4fa864eb40558cd0";
        let snAddr = "0x26e701eb4369c9892bb45381bc853aa80e5aa6e8";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.supernode.appendRegister(fromAddr, web3.utils.toWei(4000, 'ether'), snAddr, 360);
            console.log("appendRegister-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("turnRegister", async () => {
        let fromAddr = "0x044f9c93b57efaa547f8461d4fa864eb40558cd0";
        let snAddr = "0xa5cec2b8cda30da3f3170b4505cb44226b6c9dd2";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.supernode.turnRegister(fromAddr, snAddr, 9);
            console.log("turnRegister-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("changeAddress", async () => {
        let fromAddr = "0xac110c0f70867f77d9d230e377043f52480a0b7d";
        let snAddr = "0x26e701eb4369c9892bb45381bc853aa80e5aa6e8";
        let newAddr = "0xa981b5f8d3cdb950243b970a6420e4b703a23006";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.supernode.changeAddress(fromAddr, snAddr, newAddr);
            console.log("changeAddress-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("changeName", async () => {
        let fromAddr = "0xac110c0f70867f77d9d230e377043f52480a0b7d";
        let snAddr = "0xa981b5f8d3cdb950243b970a6420e4b703a23006";
        let name = "test-sn";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.supernode.changeName(fromAddr, snAddr, name);
            console.log("changeName-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("changeEnode", async () => {
        let fromAddr = "0xac110c0f70867f77d9d230e377043f52480a0b7d";
        let snAddr = "0xa981b5f8d3cdb950243b970a6420e4b703a23006";
        let enode = "enode://7d9cd0f84db59f040755bb7475fddd5190521db7373e6a3d8bf35b95727851821ab7e8dcb1ad3ea89f6a7d5d2e82e052b23a2a53ea5a9a86d708c7a02d2913c8@10.0.0.105:30303";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.supernode.changeEnode(fromAddr, snAddr, enode);
            console.log("changeEnode-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("changeDescription", async () => {
        let fromAddr = "0xac110c0f70867f77d9d230e377043f52480a0b7d";
        let snAddr = "0xa981b5f8d3cdb950243b970a6420e4b703a23006";
        let desciription = "this is a test supernode";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.supernode.changeDescription(fromAddr, snAddr, desciription);
            console.log("changeDescription-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("changeIsOfficial", async () => {
        let fromAddr = "0xac110c0f70867f77d9d230e377043f52480a0b7d";
        let snAddr = "0xa981b5f8d3cdb950243b970a6420e4b703a23006";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.supernode.changeIsOfficial(fromAddr, snAddr, true);
            console.log("changeIsOfficial-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("getInfo", async () => {
        let snAddr = "0x26e701eb4369c9892bb45381bc853aa80e5aa6e8";
        let result = await web3.safe4.supernode.getInfo(snAddr);
        console.log(result);
        expect(result.enode.length).not.toEqual(0);
    });

    test("getInfoByID", async () => {
        let result = await web3.safe4.supernode.getInfoByID(6);
        console.log(result);
        expect(result.enode.length).not.toEqual(0);
    });

    test("getAll", async () => {
        let result = await web3.safe4.supernode.getAll();
        console.log(result);
        expect(result.length).toBeGreaterThan(1);
    });

    test("getTops", async () => {
        let result = await web3.safe4.supernode.getTops();
        console.log(result);
        expect(result.length).toBeGreaterThan(4);
    });

    test("getOfficials", async () => {
        let result = await web3.safe4.supernode.getOfficials();
        console.log(result);
        expect(result.length).toBeGreaterThan(1);
    });

    test("getNum", async () => {
        let result = await web3.safe4.supernode.getNum();
        console.log(result);
        expect(result).toBeGreaterThan(4n);
    });

    test("exist", async () => {
        let snAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
        let result = await web3.safe4.supernode.exist(snAddr);
        console.log(result);
        expect(result).toEqual(true);
    });

    test("existID", async () => {
        let result = await web3.safe4.supernode.existID(3);
        console.log(result);
        expect(result).toEqual(true);
    });

    test("existName", async () => {
        let name = "i-sn";
        let result = await web3.safe4.supernode.existName(name);
        console.log(result);
        expect(result).toEqual(true);
    });

    test("existEnode", async () => {
        let enode = "enode://7d9cd0f84db59f040755bb7475fddd5190521db7373e6a3d8bf35b95727851821ab7e8dcb1ad3ea89f6a7d5d2e82e052b23a2a53ea5a9a86d708c7a02d2913c8@10.0.0.103:30303";
        let result = await web3.safe4.supernode.existEnode(enode);
        console.log(result);
        expect(result).toEqual(true);
    });

    test("existLockID", async () => {
        let snAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
        let result = await web3.safe4.supernode.existLockID(snAddr, 10);
        console.log(result);
        expect(result).toEqual(true);
    });

    test("isValid", async () => {
        let snAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
        let result = await web3.safe4.supernode.isValid(snAddr);
        console.log(result);
        expect(result).toEqual(true);
    });

    test("isFormal", async () => {
        let snAddr = "0x0000000000000000000000000000000000000000";
        let result = await web3.safe4.supernode.isFormal(snAddr);
        console.log(result);
        expect(result).toEqual(true);
    });
});