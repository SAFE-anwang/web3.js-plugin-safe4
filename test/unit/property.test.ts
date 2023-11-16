import {Web3} from "web3";
import {Safe4Plugin} from "../../src";

describe('Safe4Plugin Property Tests', () => {
    let web3: Web3;
    let accounts: string[] = [];

    beforeAll(async () => {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        web3.registerPlugin(new Safe4Plugin());
        accounts = await web3.eth.getAccounts();
    });

    test("add", async () => {
        await web3.eth.personal.unlockAccount(accounts[0], '123', 1000);
        const result = await web3.safe4.sysproperty.add(accounts[0], "test_name2", 2, "test name2");
        console.log(result);
        await web3.eth.personal.lockAccount(accounts[0]);
    });

    test("applyUpdate", async () => {
        await web3.eth.personal.unlockAccount(accounts[3], '123', 10);
        const result = await web3.safe4.sysproperty.applyUpdate(accounts[2], "block_space", 10, "update block space");
        console.log(result);
        await web3.eth.personal.lockAccount(accounts[3]);
    });

    test("vote4Update", async () => {
        await web3.eth.personal.unlockAccount(accounts[4], '123', 10);
        const result = await web3.safe4.sysproperty.vote4Update(accounts[3], "block_space", 1);
        console.log(result);
        await web3.eth.personal.lockAccount(accounts[4]);
    });

    test("getInfo", async () => {
        const result = await web3.safe4.sysproperty.getInfo("block_space");
        console.log(result);
    });

    test("getUnconfirmedInfo", async () => {
        const result = await web3.safe4.sysproperty.getUnconfirmedInfo("block_space");
        console.log(result);
    });

    test("getValue", async () => {
        const result = await web3.safe4.sysproperty.getValue("block_space");
        console.log(result);
        expect(Number(result)).toBe(30);
    });

    test("getAll", async () => {
        const result = await web3.safe4.sysproperty.getAll();
        console.log(result);
    });

    test("getAllUnconfirmed", async () => {
        const result = await web3.safe4.sysproperty.getAllUnconfirmed();
        console.log(result);
    });
});