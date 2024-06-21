import {Web3} from "web3";
import {Safe4Plugin} from "../../src";

describe('Safe4Plugin Proposal Tests', () => {
    let web3: Web3;

    beforeAll(async () => {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        web3.registerPlugin(new Safe4Plugin());
    });

    test("create", async () => {
        // addr: 0xd52114c4071b5bfbd06a657a3db538bfd559a481, privateKey: 0xe171bcc091332eaa8fd76f529f880bd210b3187354706599b033df8155a94d84
        let privateKey = "0xe171bcc091332eaa8fd76f529f880bd210b3187354706599b033df8155a94d84";
        try {
            let result = await web3.safe4.proposal.create(privateKey, "test_proposal", web3.utils.toWei('5', 'ether'), 5, 1702656000, 1702688400, "test proposal, 5 ether, pay 5 times, from 2023-12-16 00:00:00 to 2023-12-16 09:00:00");
            console.log("create-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("vote", async () => {
        // sn: 0x918b8ed234e235a2ea5756fd5d9c80850ba3bb6d, privateKey: 0xfb5ae9ce44b96a5cb71f405806ec90493f18641776b44e9f267bed17c45a7874
        // sn: 0xd57574369a6c90a5622f17fbed30c891b9d70c3b, privateKey: 0x5bd818c9dd4d05351e9c7ff830d9ee7d556181a6473c84363ff7edb1dfc7e34f
        // sn: 0x556b5868919008607ef24f4eb2bde6feda3e42f2, privateKey: 0x73fc4be2c4a1d44f41c09ef138717a7994726461c9c256f25b36c3f3b570d9dd
        let privateKey = "0xfb5ae9ce44b96a5cb71f405806ec90493f18641776b44e9f267bed17c45a7874";
        try {
            let result = await web3.safe4.proposal.vote(privateKey, 1, 1);
            console.log("vote-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changeTitle", async () => {
        let privateKey = "0xe171bcc091332eaa8fd76f529f880bd210b3187354706599b033df8155a94d84";
        try {
            let result = await web3.safe4.proposal.changeTitle(privateKey, 1, "update-test-proposal1");
            console.log("changeTitle-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changePayAmount", async () => {
        let privateKey = "0xe171bcc091332eaa8fd76f529f880bd210b3187354706599b033df8155a94d84";
        try {
            let result = await web3.safe4.proposal.changePayAmount(privateKey, 1, web3.utils.toWei('2', 'ether'));
            console.log("changePayAmount-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changePayTimes", async () => {
        let privateKey = "0xe171bcc091332eaa8fd76f529f880bd210b3187354706599b033df8155a94d84";
        try {
            let result = await web3.safe4.proposal.changePayTimes(privateKey, 1, 3);
            console.log("changePayTimes-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changeStartPayTime", async () => {
        let privateKey = "0xe171bcc091332eaa8fd76f529f880bd210b3187354706599b033df8155a94d84";
        try {
            let result = await web3.safe4.proposal.changeStartPayTime(privateKey, 1, 1702630800);
            console.log("changeStartPayTime-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changeEndPayTime", async () => {
        let privateKey = "0xe171bcc091332eaa8fd76f529f880bd210b3187354706599b033df8155a94d84";
        try {
            let result = await web3.safe4.proposal.changeEndPayTime(privateKey, 1, 1702634400);
            console.log("changeEndPayTime-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changeDescription", async () => {
        let privateKey = "0xe171bcc091332eaa8fd76f529f880bd210b3187354706599b033df8155a94d84";
        try {
            let result = await web3.safe4.proposal.changeDescription(privateKey, 1, "update-test-proposal1, 2 ether, pay 3 times, from 2023-12-15 17:00:00 to 2023-12-15 18:00:00");
            console.log("changeDescription-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("getInfo", async () => {
        let result = await web3.safe4.proposal.getInfo(1);
        console.log(result);
        expect(result.payTimes).toBeGreaterThan(1n);
    });

    test("getVoterNum", async () => {
        let result = await web3.safe4.proposal.getVoterNum(1);
        console.log(result);
        expect(result).toBeGreaterThan(1n);
    });

    test("getVoteInfo", async () => {
        let result = await web3.safe4.proposal.getVoteInfo(1, 0, 100);
        console.log(result);
        expect(result.length).toBeGreaterThan(1);
    });

    test("getNum", async () => {
        let result = await web3.safe4.proposal.getNum();
        console.log(result);
        expect(result).toBeGreaterThan(1n);
    });

    test("getAll", async () => {
        let result = await web3.safe4.proposal.getAll(10, 100);
        console.log(result);
        expect(result.length).toBeGreaterThanOrEqual(1);
    });

    test("getMineNum", async () => {
        let result = await web3.safe4.proposal.getMineNum();
        console.log(result);
        expect(result).toBeGreaterThanOrEqual(0n);
    });

    test("getMines", async () => {
        let privateKey = "0xe171bcc091332eaa8fd76f529f880bd210b3187354706599b033df8155a94d84";
        let result = await web3.safe4.proposal.getMines(privateKey, 0, 100);
        console.log(result);
        expect(result.length).toBeGreaterThanOrEqual(1);
    });

    test("exist", async () => {
        let result = await web3.safe4.proposal.exist(1);
        console.log(result);
        expect(result).toEqual(true);
    });
});