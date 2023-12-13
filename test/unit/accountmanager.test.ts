import {Web3} from "web3";
import {Safe4Plugin} from "../../src";
import {isUnlocked} from "./test_util";

describe('Safe4Plugin Account-Manager Tests', () => {
    let web3: Web3;

    beforeAll(async () => {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        web3.registerPlugin(new Safe4Plugin());
    });

    test("deposit", async() => {
        let fromAddr = "0x044f9c93b57efaa547f8461d4fa864eb40558cd0";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.account.deposit(fromAddr, web3.utils.toWei(1, 'ether'), fromAddr, 0);
            console.log("deposit-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("withdraw", async() => {
        let fromAddr = "0x044f9c93b57efaa547f8461d4fa864eb40558cd0";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.account.withdraw(fromAddr);
            console.log("withdraw-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("withdrawByID", async() => {
        let fromAddr = "0x044f9c93b57efaa547f8461d4fa864eb40558cd0";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.account.withdrawByID(fromAddr, [0,1,2,3]);
            console.log("withdrawByID-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("transfer", async() => {
        let fromAddr = "0x044f9c93b57efaa547f8461d4fa864eb40558cd0";
        let toAddr = "0x044f9c93b57efaa547f8461d4fa864eb40558cd0";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.account.transfer(fromAddr, toAddr, web3.utils.toWei(1, 'ether'), 1);
            console.log("transfer-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("addLockDay", async() => {
        let fromAddr = "0x044f9c93b57efaa547f8461d4fa864eb40558cd0";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.account.addLockDay(fromAddr, 7, 1);
            console.log("addLockDay-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("getTotalAmount", async () => {
        let fromAddr = "0x044f9c93b57efaa547f8461d4fa864eb40558cd0";
        let result = await web3.safe4.account.getTotalAmount(fromAddr);
        console.log(result);
        expect(result.amount).toBeGreaterThanOrEqual(BigInt(web3.utils.toWei(5000, 'ether')));
    });

    test("getAvailableAmount", async () => {
        let fromAddr = "0x044f9c93b57efaa547f8461d4fa864eb40558cd0";
        let result = await web3.safe4.account.getAvailableAmount(fromAddr);
        console.log(result);
        expect(result.amount).toBeGreaterThanOrEqual(0n);
    });

    test("getLockedAmount", async () => {
        let fromAddr = "0x044f9c93b57efaa547f8461d4fa864eb40558cd0";
        let result = await web3.safe4.account.getLockedAmount(fromAddr);
        console.log(result);
        expect(result.amount).toBeGreaterThanOrEqual(BigInt(web3.utils.toWei(5000, 'ether')));
    });

    test("getUsedAmount", async () => {
        let fromAddr = "0x044f9c93b57efaa547f8461d4fa864eb40558cd0";
        let result = await web3.safe4.account.getUsedAmount(fromAddr);
        console.log(result);
        expect(result.amount).toBeGreaterThanOrEqual(BigInt(web3.utils.toWei(5000, 'ether')));
    });

    test("getRecords", async () => {
        let fromAddr = "0x044f9c93b57efaa547f8461d4fa864eb40558cd0";
        let result = await web3.safe4.account.getRecords(fromAddr);
        console.log(result);
        expect(result.length).toBeGreaterThanOrEqual(1);
    });

    test("getRecord0", async () => {
        let fromAddr = "0x044f9c93b57efaa547f8461d4fa864eb40558cd0";
        let result = await web3.safe4.account.getRecord0(fromAddr);
        console.log(result);
        expect(result.amount).toBeGreaterThanOrEqual(0n);
    });

    test("getRecordByID", async () => {
        let result = await web3.safe4.account.getRecordByID(1);
        console.log(result);
        expect(result.lockDay).toBeGreaterThanOrEqual(720n);
    });

    test("getRecordUseInfo", async () => {
        let result = await web3.safe4.account.getRecordUseInfo(4);
        console.log(result);
        expect(result.frozenAddr).not.toEqual('0x0000000000000000000000000000000000000000');
    });
});