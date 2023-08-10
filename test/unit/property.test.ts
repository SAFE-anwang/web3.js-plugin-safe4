import {Web3} from "web3";
import {Safe4Plugin} from "../../src";

describe('Safe4Plugin Property Tests', () => {
    test("getPropertyValue", async () => {
        const web3 = new Web3("http://127.0.0.1:8545");
        web3.registerPlugin(new Safe4Plugin());
        // eslint-disable-next-line no-console
        const result = await web3.safe4.getPropertyValue("block_space");
        expect(Number(result)).toBe(30);
    });
});