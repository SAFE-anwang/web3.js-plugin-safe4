import {Web3} from "web3";
import {Safe4Plugin} from "../../src";

describe('Safe4Plugin Property Tests', () => {
    let web3: Web3;

    beforeAll(async () => {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        web3.registerPlugin(new Safe4Plugin());
    });

    test("applyUpdate", async () => {
        // sn: 0x556b5868919008607ef24f4eb2bde6feda3e42f2, privateKey: 0x73fc4be2c4a1d44f41c09ef138717a7994726461c9c256f25b36c3f3b570d9dd
        let privateKey = "0x73fc4be2c4a1d44f41c09ef138717a7994726461c9c256f25b36c3f3b570d9dd";
        try {
            let result = await web3.safe4.sysproperty.applyUpdate(privateKey, "block_space", "2", "this is a test");
            console.log("applyUpdate-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("vote4Update", async () => {
        // sn: 0x918b8ed234e235a2ea5756fd5d9c80850ba3bb6d, privateKey: 0xfb5ae9ce44b96a5cb71f405806ec90493f18641776b44e9f267bed17c45a7874
        // sn: 0xd57574369a6c90a5622f17fbed30c891b9d70c3b, privateKey: 0x5bd818c9dd4d05351e9c7ff830d9ee7d556181a6473c84363ff7edb1dfc7e34f
        let privateKey = "0xfb5ae9ce44b96a5cb71f405806ec90493f18641776b44e9f267bed17c45a7874";
        try {
            let result = await web3.safe4.sysproperty.vote4Update(privateKey, "block_space", 1);
            console.log("vote4Update-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("getInfo", async () => {
        let result = await web3.safe4.sysproperty.getInfo("block_space");
        console.log(result);
        expect(result.value).toEqual(10000000n);
    });

    test("getUnconfirmedInfo", async () => {
        let result = await web3.safe4.sysproperty.getUnconfirmedInfo("block_space");
        console.log(result);
        expect(result.value).toEqual(100n);
    });

    test("getValue", async () => {
        let result = await web3.safe4.sysproperty.getValue("block_space");
        console.log(result);
        expect(result).toEqual(10000000n);
    });

    test("getNum", async () => {
        let result = await web3.safe4.sysproperty.getNum();
        console.log(result);
        expect(result).toBeGreaterThan(0n);
    });

    test("getAll", async () => {
        let result = await web3.safe4.sysproperty.getAll(0, 100);
        console.log(result);
        expect(result.length).toBeGreaterThanOrEqual(1);
    });

    test("getUnconfirmedNum", async () => {
        let result = await web3.safe4.sysproperty.getUnconfirmedNum();
        console.log(result);
        expect(result).toBeGreaterThan(0n);
    });

    test("getAllUnconfirmed", async () => {
        let result = await web3.safe4.sysproperty.getAllUnconfirmed(0, 100);
        console.log(result);
        expect(result.length).toBeGreaterThanOrEqual(0);
    });

    test("exist", async () => {
        let result = await web3.safe4.sysproperty.exist("block_space");
        console.log(result);
        expect(result).toEqual(true);
    });

    test("existUnconfirmed", async () => {
        let result = await web3.safe4.sysproperty.existUnconfirmed("block_space");
        console.log(result);
        expect(result).toEqual(true);
    });
});