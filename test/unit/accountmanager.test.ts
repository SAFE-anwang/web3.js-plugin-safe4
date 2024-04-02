import {Web3} from "web3";
import {Safe4Plugin} from "../../src";

describe('Safe4Plugin Account-Manager Tests', () => {
    let web3: Web3;

    beforeAll(async () => {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        web3.registerPlugin(new Safe4Plugin());
    });

    test("deposit", async () => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        let toAddr = "0x80d8b8f308770ce14252173abb00075cc9082d03";
        try {
            let result = await web3.safe4.account.deposit(privateKey, web3.utils.toWei(100, 'ether'), toAddr, 0);
            console.log("deposit-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("withdraw", async () => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        try {
            let result = await web3.safe4.account.withdraw(privateKey);
            console.log("withdraw-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("withdrawByID", async () => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        try {
            let result = await web3.safe4.account.withdrawByID(privateKey, [0, 1, 2, 3]);
            console.log("withdrawByID-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("getTotalAmount", async () => {
        let addr = "0x044f9c93b57efaa547f8461d4fa864eb40558cd0";
        let result = await web3.safe4.account.getTotalAmount(addr);
        console.log(result);
        expect(result.amount).toBeGreaterThanOrEqual(BigInt(web3.utils.toWei(5000, 'ether')));
    });

    test("getTotalIDs", async () => {
        let addr = "0x044f9c93b57efaa547f8461d4fa864eb40558cd0";
        let result = await web3.safe4.account.getTotalIDs(addr, 0, 100);
        console.log(result);
        expect(result.length).toBeGreaterThan(0);
    });

    test("getRecord0", async () => {
        let addr = "0x044f9c93b57efaa547f8461d4fa864eb40558cd0";
        let result = await web3.safe4.account.getRecord0(addr);
        console.log(result);
        expect(result.amount).toBeGreaterThanOrEqual(0n);
    });

    test("getRecordByID", async () => {
        let result = await web3.safe4.account.getRecordByID(1);
        console.log(result);
        expect(result.lockDay).toBeGreaterThanOrEqual(720n);
    });

    test("getRecordUseInfo", async () => {
        let result = await web3.safe4.account.getRecordUseInfo(1);
        console.log(result);
        expect(result.frozenAddr).not.toEqual('0x0000000000000000000000000000000000000000');
    });
});