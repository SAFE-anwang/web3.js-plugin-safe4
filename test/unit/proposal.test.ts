import {Web3} from "web3";
import {Safe4Plugin} from "../../src";

describe('Safe4Plugin Proposal Tests', () => {
    let web3: Web3;

    beforeAll(async () => {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        web3.registerPlugin(new Safe4Plugin());
    });

    test("create", async () => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        try {
            let result = await web3.safe4.proposal.create(privateKey, "test_proposal", web3.utils.toWei('5', 'ether'), 5, 1702656000, 1702688400, "test proposal, 5 ether, pay 5 times, from 2023-12-16 00:00:00 to 2023-12-16 09:00:00");
            console.log("create-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("vote", async () => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        try {
            let result = await web3.safe4.proposal.vote(privateKey, 1, 1);
            console.log("vote-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changeTitle", async () => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        try {
            let result = await web3.safe4.proposal.changeTitle(privateKey, 1, "update-test-proposal1");
            console.log("changeTitle-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changePayAmount", async () => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        try {
            let result = await web3.safe4.proposal.changePayAmount(privateKey, 1, web3.utils.toWei('2', 'ether'));
            console.log("changePayAmount-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changePayTimes", async () => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        try {
            let result = await web3.safe4.proposal.changePayTimes(privateKey, 1, 3);
            console.log("changePayTimes-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changeStartPayTime", async () => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        try {
            let result = await web3.safe4.proposal.changeStartPayTime(privateKey, 1, 1702630800);
            console.log("changeStartPayTime-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changeEndPayTime", async () => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        try {
            let result = await web3.safe4.proposal.changeEndPayTime(privateKey, 1, 1702634400);
            console.log("changeEndPayTime-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("changeDescription", async () => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
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
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
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