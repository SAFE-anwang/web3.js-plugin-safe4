import {Web3} from "web3";
import {Safe4Plugin} from "../../src";

describe('Safe4Plugin SNVote Tests', () => {
    let web3: Web3;

    beforeAll(async () => {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        web3.registerPlugin(new Safe4Plugin());
    });

    test("voteOrApproval", async() => {
        // addr: 0xd52114c4071b5bfbd06a657a3db538bfd559a481, privateKey: 0xe171bcc091332eaa8fd76f529f880bd210b3187354706599b033df8155a94d84
        let privateKey = "0xe171bcc091332eaa8fd76f529f880bd210b3187354706599b033df8155a94d84";
        let snAddr = "0xd57574369a6c90a5622f17fbed30c891b9d70c3b";
        let recordIDs = [13];
        try {
            let result = await web3.safe4.snvote.voteOrApproval(privateKey, true, snAddr, recordIDs);
            console.log("voteOrApproval-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("voteOrApprovalWithAmount", async() => {
        // addr: 0xd52114c4071b5bfbd06a657a3db538bfd559a481, privateKey: 0xe171bcc091332eaa8fd76f529f880bd210b3187354706599b033df8155a94d84
        let privateKey = "0xe171bcc091332eaa8fd76f529f880bd210b3187354706599b033df8155a94d84";
        let snAddr = "0xd57574369a6c90a5622f17fbed30c891b9d70c3b";
        try {
            let result = await web3.safe4.snvote.voteOrApprovalWithAmount(privateKey, web3.utils.toWei(10, 'ether'), true, snAddr);
            console.log("voteOrApproval-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("removeVoteOrApproval", async() => {
        // addr: 0xd52114c4071b5bfbd06a657a3db538bfd559a481, privateKey: 0xe171bcc091332eaa8fd76f529f880bd210b3187354706599b033df8155a94d84
        let privateKey = "0xe171bcc091332eaa8fd76f529f880bd210b3187354706599b033df8155a94d84";
        let recordIDs = [13];
        try {
            let result = await web3.safe4.snvote.removeVoteOrApproval(privateKey, recordIDs);
            console.log("removeVoteOrApproval-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("proxyVote", async() => {
        // mn: 0x64ae0d18085d0c3ec202a208e96bc2fc24e4a7e8, privateKey: 0x02b0f66ceddcf16601dfc462ee3dfcc9adca7bf76b872fc23ca88d0b82f2550f
        let privateKey = "0x02b0f66ceddcf16601dfc462ee3dfcc9adca7bf76b872fc23ca88d0b82f2550f";
        let snAddr = "0xd57574369a6c90a5622f17fbed30c891b9d70c3b";
        try {
            let result = await web3.safe4.snvote.proxyVote(privateKey, snAddr);
            console.log("proxyVote-txid: ", result);
        } catch (e) {
            console.log(e.message);
        }
    });

    test("getAmount4Voter", async () => {
        let voterAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
        let result = await web3.safe4.snvote.getAmount4Voter(voterAddr);
        console.log(result);
        expect(result).toBeGreaterThanOrEqual(0n);
    });

    test("getVoteNum4Voter", async () => {
        let voterAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
        let result = await web3.safe4.snvote.getVoteNum4Voter(voterAddr);
        console.log(result);
        expect(result).toBeGreaterThanOrEqual(0n);
    });

    test("getSNNum4Voter", async () => {
        let voterAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
        let result = await web3.safe4.snvote.getSNNum4Voter(voterAddr);
        console.log(result);
        expect(result).toBeGreaterThanOrEqual(0n);
    });

    test("getSNs4Voter", async () => {
        let voterAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
        let result = await web3.safe4.snvote.getSNs4Voter(voterAddr, 0, 100);
        console.log(result);
        expect(result.addrs.length).toBeGreaterThanOrEqual(0n);
    });

    test("getProxyNum4Voter", async () => {
        let voterAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
        let result = await web3.safe4.snvote.getProxyNum4Voter(voterAddr);
        console.log(result);
        expect(result).toBeGreaterThanOrEqual(0n);
    });

    test("getProxies4Voter", async () => {
        let voterAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
        let result = await web3.safe4.snvote.getProxies4Voter(voterAddr, 0, 100);
        console.log(result);
        expect(result.addrs.length).toBeGreaterThanOrEqual(0n);
    });

    test("getVotedIDNum4Voter", async () => {
        let voterAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
        let result = await web3.safe4.snvote.getVotedIDNum4Voter(voterAddr);
        console.log(result);
        expect(result).toBeGreaterThanOrEqual(0n);
    });

    test("getVotedIDs4Voter", async () => {
        let voterAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
        let result = await web3.safe4.snvote.getVotedIDs4Voter(voterAddr, 0, 100);
        console.log(result);
        expect(result.length).toBeGreaterThanOrEqual(0n);
    });

    test("getProxiedIDNum4Voter", async () => {
        let voterAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
        let result = await web3.safe4.snvote.getProxiedIDNum4Voter(voterAddr);
        console.log(result);
        expect(result).toBeGreaterThanOrEqual(0n);
    });

    test("getProxiedIDs4Voter", async () => {
        let voterAddr = "0xd52114c4071b5bfbd06a657a3db538bfd559a481";
        let result = await web3.safe4.snvote.getProxiedIDs4Voter(voterAddr, 0, 100);
        console.log(result);
        expect(result.length).toBeGreaterThanOrEqual(0n);
    });

    test("getTotalAmount", async () => {
        let addr = "0xd57574369a6c90a5622f17fbed30c891b9d70c3b";
        let result = await web3.safe4.snvote.getTotalAmount(addr);
        console.log(result);
        expect(result).toBeGreaterThanOrEqual(0n);
    });

    test("getTotalVoteNum", async () => {
        let addr = "0xd57574369a6c90a5622f17fbed30c891b9d70c3b";
        let result = await web3.safe4.snvote.getTotalVoteNum(addr);
        console.log(result);
        expect(result).toBeGreaterThanOrEqual(0n);
    });

    test("getVoterNum", async () => {
        let addr = "0xd57574369a6c90a5622f17fbed30c891b9d70c3b";
        let result = await web3.safe4.snvote.getVoterNum(addr);
        console.log(result);
        expect(result).toBeGreaterThanOrEqual(0n);
    });

    test("getVoters", async () => {
        let addr = "0xd57574369a6c90a5622f17fbed30c891b9d70c3b";
        let result = await web3.safe4.snvote.getVoters(addr, 0, 100);
        console.log(result);
        expect(result.addrs.length).toBeGreaterThanOrEqual(0n);
    });

    test("getIDNum", async () => {
        let addr = "0xd57574369a6c90a5622f17fbed30c891b9d70c3b";
        let result = await web3.safe4.snvote.getIDNum(addr);
        console.log(result);
        expect(result).toBeGreaterThanOrEqual(0n);
    });

    test("getIDs", async () => {
        let addr = "0xd57574369a6c90a5622f17fbed30c891b9d70c3b";
        let result = await web3.safe4.snvote.getIDs(addr, 0, 100);
        console.log(result);
        expect(result.length).toBeGreaterThanOrEqual(0n);
    });
});