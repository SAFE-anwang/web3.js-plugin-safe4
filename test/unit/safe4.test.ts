import {Web3} from "web3";
import {Safe4Plugin} from "../../src";

describe('Safe4Plugin Tests', () => {
    test("pluginNamespace", () => {
        const web3 = new Web3();
        web3.registerPlugin(new Safe4Plugin());
        expect(web3.safe4.pluginNamespace).toBe("safe4");
    })
});