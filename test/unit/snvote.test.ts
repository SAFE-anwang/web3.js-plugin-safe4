import {Web3} from "web3";
import {Safe4Plugin} from "../../src";
import {isUnlocked} from "./test_util";

describe('Safe4Plugin SNVote Tests', () => {
    let web3: Web3;

    beforeAll(async () => {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        web3.registerPlugin(new Safe4Plugin());
    });

    test("vote", async() => {
        let fromAddr = "0x796c4d7f02b18edc9f78fc82903db79266cb04d6";
        let snAddr = "0x8b96c90b86cfdbdc971bb54c263a6d021e7f4894";
        let recordIDs = [13];
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.snvote.voteOrApproval(fromAddr, true, snAddr, recordIDs);
            console.log("voteOrApproval-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("approval", async() => {
        let fromAddr = "0x796c4d7f02b18edc9f78fc82903db79266cb04d6";
        let proxyAddr = "0xa7705a20fa3cf57548acdef5472b0d484db4c973";
        let recordIDs = [14];
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.snvote.voteOrApproval(fromAddr, false, proxyAddr, recordIDs);
            console.log("voteOrApproval-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("removeVoteOrApproval", async() => {
        let fromAddr = "0x796c4d7f02b18edc9f78fc82903db79266cb04d6";
        let recordIDs = [13];
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.snvote.removeVoteOrApproval(fromAddr, recordIDs);
            console.log("removeVoteOrApproval-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("proxyVote", async() => {
        let fromAddr = "0xa7705a20fa3cf57548acdef5472b0d484db4c973";
        let snAddr = "0x9d16bb0db8625630f19bc92e74cae910aa050d91";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.snvote.proxyVote(fromAddr, snAddr);
            console.log("proxyVote-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("getSuperNodes4Voter", async () => {
        let voterAddr = "0x796c4d7f02b18edc9f78fc82903db79266cb04d6";
        let result = await web3.safe4.snvote.getSuperNodes4Voter(voterAddr);
        console.log(result);
        expect(result.addrs.length).toBeGreaterThanOrEqual(1);
    });

    test("getRecordIDs4Voter", async () => {
        let voterAddr = "0x796c4d7f02b18edc9f78fc82903db79266cb04d6";
        let result = await web3.safe4.snvote.getRecordIDs4Voter(voterAddr);
        console.log(result);
        expect(result.length).toBeGreaterThanOrEqual(1);
    });

    test("getVoters4SN", async () => {
        let snAddr = "0x8b96c90b86cfdbdc971bb54c263a6d021e7f4894";
        let result = await web3.safe4.snvote.getVoters4SN(snAddr);
        console.log(result);
        expect(result.addrs.length).toBeGreaterThanOrEqual(1);
    });

    test("getVoteNum4SN", async () => {
        let snAddr = "0x8b96c90b86cfdbdc971bb54c263a6d021e7f4894";
        let result = await web3.safe4.snvote.getVoteNum4SN(snAddr);
        console.log(result);
        expect(result).toBeGreaterThan(1n);
    });

    test("getProxies4Voter", async () => {
        let voterAddr = "0x796c4d7f02b18edc9f78fc82903db79266cb04d6";
        let result = await web3.safe4.snvote.getProxies4Voter(voterAddr);
        console.log(result);
        expect(result.addrs.length).toBeGreaterThanOrEqual(1);
    });

    test("getProxiedRecordIDs4Voter", async () => {
        let voterAddr = "0x796c4d7f02b18edc9f78fc82903db79266cb04d6";
        let result = await web3.safe4.snvote.getProxiedRecordIDs4Voter(voterAddr);
        console.log(result);
        expect(result.length).toBeGreaterThanOrEqual(1);
    });

    test("getVoters4Proxy", async () => {
        let proxyAddr = "0xa7705a20fa3cf57548acdef5472b0d484db4c973";
        let result = await web3.safe4.snvote.getVoters4Proxy(proxyAddr);
        console.log(result);
        expect(result.addrs.length).toBeGreaterThanOrEqual(1);
    });

    test("getVoteNum4Proxy", async () => {
        let proxyAddr = "0xa7705a20fa3cf57548acdef5472b0d484db4c973";
        let result = await web3.safe4.snvote.getVoteNum4Proxy(proxyAddr);
        console.log(result);
        expect(result).toBeGreaterThan(1n);
    });
});