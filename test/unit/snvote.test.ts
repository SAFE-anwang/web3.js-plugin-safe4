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
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        let snAddr = "0x8b96c90b86cfdbdc971bb54c263a6d021e7f4894";
        let recordIDs = [13];
        try {
            let result = await web3.safe4.snvote.voteOrApproval(privateKey, true, snAddr, recordIDs);
            console.log("voteOrApproval-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("approval", async() => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        let proxyAddr = "0xa7705a20fa3cf57548acdef5472b0d484db4c973";
        let recordIDs = [14];
        try {
            let result = await web3.safe4.snvote.voteOrApproval(privateKey, false, proxyAddr, recordIDs);
            console.log("voteOrApproval-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("removeVoteOrApproval", async() => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        let recordIDs = [13];
        try {
            let result = await web3.safe4.snvote.removeVoteOrApproval(privateKey, recordIDs);
            console.log("removeVoteOrApproval-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("proxyVote", async() => {
        let privateKey = "0xcfa6ac66802dfd1afd9e8b5b68aa5d65e3f303eaf10b809adefcd71ad524fbc7";
        let snAddr = "0x9d16bb0db8625630f19bc92e74cae910aa050d91";
        try {
            let result = await web3.safe4.snvote.proxyVote(privateKey, snAddr);
            console.log("proxyVote-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("getAmount4Voter", async () => {
        let voterAddr = "0x796c4d7f02b18edc9f78fc82903db79266cb04d6";
        let result = await web3.safe4.snvote.getAmount4Voter(voterAddr);
        console.log(result);
        expect(result).toBeGreaterThanOrEqual(0n);
    });

    test("getVoteNum4Voter", async () => {
        let voterAddr = "0x796c4d7f02b18edc9f78fc82903db79266cb04d6";
        let result = await web3.safe4.snvote.getVoteNum4Voter(voterAddr);
        console.log(result);
        expect(result).toBeGreaterThanOrEqual(0n);
    });
});