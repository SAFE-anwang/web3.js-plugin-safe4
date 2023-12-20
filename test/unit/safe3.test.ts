import {Web3} from "web3";
import {Safe4Plugin} from "../../src";
import {isUnlocked} from "./test_util";
import * as crypto from "crypto";

describe('Safe4Plugin Safe3 Tests', () => {
    let web3: Web3;

    beforeAll(async () => {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        web3.registerPlugin(new Safe4Plugin());
    });

    test("redeemAvailable", async () => {
        let fromAddr = "0xF225616719B6216A586dce7C3D546bD607BFb427";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            console.log(await web3.eth.personal.unlockAccount(fromAddr, '123', 1000));
        }
        try {
            let safe3Addr = "XpSpsdR1GfJPneu8UdjouwdAzhgUwYza62";
            let hash = crypto.createHash('sha256').update(safe3Addr).digest('hex');
            console.log('address hash: ', hash);
            let sig = await web3.eth.sign("0x" + hash, fromAddr);
            console.log('sig: ', sig);
            let pubkey = "0x0494581fa5729caf680ab4b0218adfa0053bf31d3c6f08d8a2c7c113eaeb4e73aae26834da9855abe01b2109a56be670c4e51e0ee5136bcedba68f090e4bce413f";
            let result = await web3.safe4.safe3.redeemAvailable(fromAddr, pubkey, typeof sig === "string" ? sig : "");
            console.log("redeemAvailable-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("redeemLocked", async () => {
        let fromAddr = "0xF225616719B6216A586dce7C3D546bD607BFb427";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            console.log(await web3.eth.personal.unlockAccount(fromAddr, '123', 1000));
        }
        try {
            let safe3Addr = "XpSpsdR1GfJPneu8UdjouwdAzhgUwYza62";
            let hash = crypto.createHash('sha256').update(safe3Addr).digest('hex');
            console.log('address hash: ', hash);
            let sig = await web3.eth.sign("0x" + hash, fromAddr);
            console.log('sig: ', sig);
            let pubkey = "0x0494581fa5729caf680ab4b0218adfa0053bf31d3c6f08d8a2c7c113eaeb4e73aae26834da9855abe01b2109a56be670c4e51e0ee5136bcedba68f090e4bce413f";
            let result = await web3.safe4.safe3.redeemLocked(fromAddr, pubkey, typeof sig === "string" ? sig : "", "enode://7d9cd0f84db59f040755bb7475fddd5190521db7373e6a3d8bf35b95727851821ab7e8dcb1ad3ea89f6a7d5d2e82e052b23a2a53ea5a9a86d708c7a02d2913c8@10.0.0.2:30303");
            console.log("redeemLocked-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("getAvailable", async () => {
        let safe3Addr = "XpSpsdR1GfJPneu8UdjouwdAzhgUwYza62";
        let result = await web3.safe4.safe3.getAvailable(safe3Addr);
        console.log(result);
        expect(result.amount).toBeGreaterThan(0n);
    });

    test("getLocked", async () => {
        let safe3Addr = "XpSpsdR1GfJPneu8UdjouwdAzhgUwYza62";
        let result = await web3.safe4.safe3.getLocked(safe3Addr);
        console.log(result);
        expect(result.length).toBeGreaterThan(0);
    });

    test("getAllAvailable", async () => {
        let result = await web3.safe4.safe3.getAllAvailable();
        console.log(result);
        expect(result.length).toBeGreaterThan(1);
    });

    test("getAllLocked", async () => {
        let result = await web3.safe4.safe3.getAllLocked();
        console.log(result);
        expect(result.length).toBeGreaterThan(1);
    });

    test("getKeyIDFromPubkey", async () => {
        let pubkey = "0x0494581fa5729caf680ab4b0218adfa0053bf31d3c6f08d8a2c7c113eaeb4e73aae26834da9855abe01b2109a56be670c4e51e0ee5136bcedba68f090e4bce413f";
        let result = await web3.safe4.safe3.getKeyIDFromPubkey(pubkey);
        console.log(result);
        expect(result).toEqual("0x4c96eb230e21a718dfe1c4da36d3722b4449f174a8e598c29f");
    });

    test("getKeyIDFromAddress", async () => {
        let safe3Addr = "XpSpsdR1GfJPneu8UdjouwdAzhgUwYza62";
        let result = await web3.safe4.safe3.getKeyIDFromAddress(safe3Addr);
        console.log(result);
        expect(result).toEqual("0x4c96eb230e21a718dfe1c4da36d3722b4449f174a8e598c29f");
    });

    test("getSafe3Addr", async () => {
        let pubkey = "0x0494581fa5729caf680ab4b0218adfa0053bf31d3c6f08d8a2c7c113eaeb4e73aae26834da9855abe01b2109a56be670c4e51e0ee5136bcedba68f090e4bce413f";
        let result = await web3.safe4.safe3.getSafe3Addr(pubkey);
        console.log(result);
        expect(result).toEqual("XpSpsdR1GfJPneu8UdjouwdAzhgUwYza62");
    });

    test("getSafe4Addr", async () => {
        let pubkey = "0x0494581fa5729caf680ab4b0218adfa0053bf31d3c6f08d8a2c7c113eaeb4e73aae26834da9855abe01b2109a56be670c4e51e0ee5136bcedba68f090e4bce413f";
        let result = await web3.safe4.safe3.getSafe4Addr(pubkey);
        console.log(result);
        expect(result).toEqual("0xF225616719B6216A586dce7C3D546bD607BFb427");
    });
});