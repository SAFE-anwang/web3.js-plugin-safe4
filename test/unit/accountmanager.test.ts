import {Web3} from "web3";
import {Safe4Plugin} from "../../src";

describe('Safe4Plugin Account-Manager Tests', () => {
    let web3: Web3;

    beforeAll(async () => {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        web3.registerPlugin(new Safe4Plugin());
    });

    test("deposit", async () => {
        // 0xa5cec2b8cda30da3f3170b4505cb44226b6c9dd2: privateKey: 0x7b281a9ba16001feb62a5929526ef8f69d6550c6acdc3f0579c69199c0b6a010
        let privateKey = "0x7b281a9ba16001feb62a5929526ef8f69d6550c6acdc3f0579c69199c0b6a010";
        let toAddr = "0xa5cec2b8cda30da3f3170b4505cb44226b6c9dd2";
        try {
            let result = await web3.safe4.account.deposit(privateKey, web3.utils.toWei(100, 'ether'), toAddr, 0);
            console.log("deposit-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("withdraw", async () => {
        let privateKey = "0x7b281a9ba16001feb62a5929526ef8f69d6550c6acdc3f0579c69199c0b6a010";
        try {
            let result = await web3.safe4.account.withdraw(privateKey);
            console.log("withdraw-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("withdrawByID", async () => {
        let privateKey = "0x7b281a9ba16001feb62a5929526ef8f69d6550c6acdc3f0579c69199c0b6a010";
        try {
            let result = await web3.safe4.account.withdrawByID(privateKey, [8,9]);
            console.log("withdrawByID-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("transfer", async () => {
        let privateKey = "0x7b281a9ba16001feb62a5929526ef8f69d6550c6acdc3f0579c69199c0b6a010";
        try {
            let result = await web3.safe4.account.transfer(privateKey, "0x64ae0d18085d0c3ec202a208e96bc2fc24e4a7e8", web3.utils.toWei(1, 'ether'), 1);
            console.log("transfer-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("addLockDay", async () => {
        let privateKey = "0x7b281a9ba16001feb62a5929526ef8f69d6550c6acdc3f0579c69199c0b6a010";
        try {
            let result = await web3.safe4.account.addLockDay(privateKey, 7, 1);
            console.log("addLockDay-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("getTotalAmount", async () => {
        let addr = "0x64ae0d18085d0c3ec202a208e96bc2fc24e4a7e8";
        let result = await web3.safe4.account.getTotalAmount(addr);
        console.log(result);
        expect(result.amount).toBeGreaterThanOrEqual(BigInt(web3.utils.toWei(1, 'ether')));
    });

    test("getTotalIDs", async () => {
        let addr = "0x64ae0d18085d0c3ec202a208e96bc2fc24e4a7e8";
        let result = await web3.safe4.account.getTotalIDs(addr, 0, 100);
        console.log(result);
        expect(result.length).toBeGreaterThan(0);
    });

    test("getAvailableAmount", async () => {
        let addr = "0x64ae0d18085d0c3ec202a208e96bc2fc24e4a7e8";
        let result = await web3.safe4.account.getAvailableAmount(addr);
        console.log(result);
        expect(result.amount).toBeGreaterThanOrEqual(BigInt(web3.utils.toWei(1, 'ether')));
    });

    test("getAvailableIDs", async () => {
        let addr = "0x64ae0d18085d0c3ec202a208e96bc2fc24e4a7e8";
        let result = await web3.safe4.account.getAvailableIDs(addr, 0, 100);
        console.log(result);
        expect(result.length).toBeGreaterThan(0);
    });

    test("getLockedAmount", async () => {
        let addr = "0x64ae0d18085d0c3ec202a208e96bc2fc24e4a7e8";
        let result = await web3.safe4.account.getLockedAmount(addr);
        console.log(result);
        expect(result.amount).toBeGreaterThanOrEqual(BigInt(web3.utils.toWei(1, 'ether')));
    });

    test("getLockedIDs", async () => {
        let addr = "0x64ae0d18085d0c3ec202a208e96bc2fc24e4a7e8";
        let result = await web3.safe4.account.getLockedIDs(addr, 0, 100);
        console.log(result);
        expect(result.length).toBeGreaterThan(0);
    });

    test("getUsedAmount", async () => {
        let addr = "0x64ae0d18085d0c3ec202a208e96bc2fc24e4a7e8";
        let result = await web3.safe4.account.getUsedAmount(addr);
        console.log(result);
        expect(result.amount).toBeGreaterThanOrEqual(BigInt(web3.utils.toWei(1, 'ether')));
    });

    test("getUsedIDs", async () => {
        let addr = "0x64ae0d18085d0c3ec202a208e96bc2fc24e4a7e8";
        let result = await web3.safe4.account.getUsedIDs(addr, 0, 100);
        console.log(result);
        expect(result.length).toBeGreaterThan(0);
    });

    test("getRecord0", async () => {
        let addr = "0x64ae0d18085d0c3ec202a208e96bc2fc24e4a7e8";
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