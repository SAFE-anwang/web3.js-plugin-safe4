import {Web3} from "web3";
import {Safe4Plugin} from "../../src";
import {isUnlocked} from "./test_util";

describe('Safe4Plugin Property Tests', () => {
    let web3: Web3;

    beforeAll(async () => {
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        web3.registerPlugin(new Safe4Plugin());
    });

    test("add", async () => {
        let fromAddr = "0xac110c0f70867f77d9d230e377043f52480a0b7d";
        let flag = await isUnlocked(web3, fromAddr);
        if (!flag) {
            await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
        }
        try {
            let result = await web3.safe4.sysproperty.add(fromAddr, "test_name1", "2", "test name1");
            console.log("add-txid: ", result);
        } catch (e) {
            console.log(e.message);
        } finally {
            if (!flag) {
                await web3.eth.personal.lockAccount(fromAddr);
            }
        }
    });

    test("applyUpdate", async () => {
        let fromAddr = "0x044f9c93b57efaa547f8461d4fa864eb40558cd0";
        let names = ["block_space", "gas_price"];
        let values = ["15", "15000000"];
        for (let i = 0; i < names.length; i++) {
            let flag = await isUnlocked(web3, fromAddr);
            if (!flag) {
                await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
            }
            try {
                let result = await web3.safe4.sysproperty.applyUpdate(fromAddr, names[i], values[i], "apply update " + names[i]);
                console.log("applyUpdate-txid: ", result);
            } catch (e) {
                console.log(e.message);
            } finally {
                if (!flag) {
                    await web3.eth.personal.lockAccount(fromAddr);
                }
            }
        }
    });

    test("vote4Update", async () => {
        let fromAddrs: string[] = ["0xc0dac1e1544ee3531d8b78ea1d56613779868b1d", "0x9d16bb0db8625630f19bc92e74cae910aa050d91"];
        for (let i = 0; i < fromAddrs.length; i++) {
            let fromAddr = fromAddrs[i];
            let flag = await isUnlocked(web3, fromAddr);
            if (!flag) {
                await web3.eth.personal.unlockAccount(fromAddr, '123', 1000);
            }
            try {
                let result = await web3.safe4.sysproperty.vote4Update(fromAddr, "block_space", 1);
                console.log("vote4Update-txid: ", result);
            } catch (e) {
                console.log(e.message);
            } finally {
                if (!flag) {
                    await web3.eth.personal.lockAccount(fromAddr);
                }
            }
        }
    });

    test("getInfo", async () => {
        let result = await web3.safe4.sysproperty.getInfo("gas_price");
        console.log(result);
        expect(result.value).toEqual(10000000n);
    });

    test("getUnconfirmedInfo", async () => {
        let result = await web3.safe4.sysproperty.getUnconfirmedInfo("block_space");
        console.log(result);
        expect(result.value).toEqual(15n);
    });

    test("getValue", async () => {
        let result = await web3.safe4.sysproperty.getValue("block_space");
        console.log(result);
        expect(result).toEqual(3n);
    });

    test("getAll", async () => {
        let result = await web3.safe4.sysproperty.getAll();
        console.log(result);
        expect(result.length).toBeGreaterThanOrEqual(1);
    });

    test("getAllUnconfirmed", async () => {
        let result = await web3.safe4.sysproperty.getAllUnconfirmed();
        console.log(result);
        expect(result.length).toBeGreaterThanOrEqual(0);
    });
});