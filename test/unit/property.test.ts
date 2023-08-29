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
        const result = await web3.safe4.property.add("test_name2", 2, "test name2", accounts[0]);
        console.log(result);
        await web3.eth.personal.lockAccount(accounts[0]);
    });

    test("applyUpdate", async () => {
        await web3.eth.personal.unlockAccount(accounts[3], '123', 10);
        const result = await web3.safe4.property.applyUpdate("block_space", 10, "update block space", accounts[2]);
        console.log(result);
        await web3.eth.personal.lockAccount(accounts[3]);
    });

    test("vote4Update", async () => {
        await web3.eth.personal.unlockAccount(accounts[4], '123', 10);
        const result = await web3.safe4.property.vote4Update("block_space", 1, accounts[3]);
        console.log(result);
        await web3.eth.personal.lockAccount(accounts[4]);
    });

    test("getInfo", async () => {
        const result = await web3.safe4.property.getInfo("block_space");
        console.log(result);
    });

    test("getUnconfirmedInfo", async () => {
        const result = await web3.safe4.property.getUnconfirmedInfo("block_space");
        console.log(result);
    });

    test("getValue",  async () => {
        const result = await web3.safe4.property.getValue("block_space");
        console.log(result);
        expect(Number(result)).toBe(30);
    });

    test("getAllConfirmed", async () => {
        const result = await web3.safe4.property.getAllConfirmed();
        console.log(result);
    });

    test("getAllUnConfirmed", async () => {
        const result = await web3.safe4.property.getAllUnConfirmed();
        console.log(result);
    });
});