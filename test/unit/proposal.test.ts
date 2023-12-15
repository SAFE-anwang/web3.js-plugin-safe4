import {Web3} from "web3";
import {Safe4Plugin} from "../../src";
import {isUnlocked} from "./test_util";

describe('Safe4Plugin Proposal Tests', () => {
    let web3: Web3;

    beforeAll(async () => {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        web3.registerPlugin(new Safe4Plugin());
    });

    test("create", async () => {
        let fromAddr = "0xac110c0f70867f77d9d230e377043f52480a0b7d";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.proposal.create(fromAddr, "test_proposal", web3.utils.toWei('1', 'ether'), 5, 1702656000, 1702688400, "test proposal, 5 ether, pay 5 times, from 2023-12-16 00:00:00 to 2023-12-16 09:00:00");
            console.log("create-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("vote", async () => {
        let fromAddr = "0xc0dac1e1544ee3531d8b78ea1d56613779868b1d";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.proposal.vote(fromAddr, 1, 1);
            console.log("vote-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("changeTitle", async () => {
        let fromAddr = "0xac110c0f70867f77d9d230e377043f52480a0b7d";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.proposal.changeTitle(fromAddr, 1, "update-test-proposal1");
            console.log("changeTitle-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("changePayAmount", async () => {
        let fromAddr = "0xac110c0f70867f77d9d230e377043f52480a0b7d";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.proposal.changePayAmount(fromAddr, 1, web3.utils.toWei('2', 'ether'));
            console.log("changePayAmount-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("changePayTimes", async () => {
        let fromAddr = "0xac110c0f70867f77d9d230e377043f52480a0b7d";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.proposal.changePayTimes(fromAddr, 1, 3);
            console.log("changePayTimes-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("changeStartPayTime", async () => {
        let fromAddr = "0xac110c0f70867f77d9d230e377043f52480a0b7d";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.proposal.changeStartPayTime(fromAddr, 1, 1702630800);
            console.log("changeStartPayTime-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("changeEndPayTime", async () => {
        let fromAddr = "0xac110c0f70867f77d9d230e377043f52480a0b7d";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.proposal.changeEndPayTime(fromAddr, 1, 1702634400);
            console.log("changeEndPayTime-txid: ", result);
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
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.proposal.changeDescription(fromAddr, 1, "update-test-proposal1, 2 ether, pay 3 times, from 2023-12-15 17:00:00 to 2023-12-15 18:00:00");
            console.log("changeDescription-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("getInfo", async () => {
        let result = await web3.safe4.proposal.getInfo(1);
        console.log(result);
        expect(result.payTimes).toBeGreaterThan(1n);
    });

    test("getAll", async () => {
        let result = await web3.safe4.proposal.getAll();
        console.log(result);
        expect(result.length).toBeGreaterThanOrEqual(1);
    });

    test("getMines", async () => {
        let fromAddr = "0xac110c0f70867f77d9d230e377043f52480a0b7d";
        let result = await web3.safe4.proposal.getMines(fromAddr);
        console.log(result);
        expect(result.length).toBeGreaterThanOrEqual(1);
    });

    test("exist", async () => {
        let result = await web3.safe4.proposal.exist(1);
        console.log(result);
        expect(result).toEqual(true);
    });
});