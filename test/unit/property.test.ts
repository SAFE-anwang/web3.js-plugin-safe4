import {Web3} from "web3";
import {Safe4Plugin} from "../../src";

describe('Safe4Plugin Property Tests', () => {
    let web3: Web3;

    beforeAll(async () => {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        web3.registerPlugin(new Safe4Plugin());
    });

    test("applyUpdate", async () => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        try {
            let result = await web3.safe4.sysproperty.applyUpdate(privateKey, "test_name1", "100", "apply update test_name1");
            console.log("applyUpdate-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("vote4Update", async () => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        try {
            let result = await web3.safe4.sysproperty.vote4Update(privateKey, "test_name1", 1);
            console.log("vote4Update-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("getInfo", async () => {
        let result = await web3.safe4.sysproperty.getInfo("gas_price");
        console.log(result);
        expect(result.value).toEqual(10000000n);
    });

    test("getUnconfirmedInfo", async () => {
        let result = await web3.safe4.sysproperty.getUnconfirmedInfo("test_name1");
        console.log(result);
        expect(result.value).toEqual(100n);
    });

    test("getValue", async () => {
        let result = await web3.safe4.sysproperty.getValue("gas_price");
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
        let result = await web3.safe4.sysproperty.exist("gas_price");
        console.log(result);
        expect(result).toEqual(true);
    });

    test("existUnconfirmed", async () => {
        let result = await web3.safe4.sysproperty.existUnconfirmed("test_name1");
        console.log(result);
        expect(result).toEqual(true);
    });
});