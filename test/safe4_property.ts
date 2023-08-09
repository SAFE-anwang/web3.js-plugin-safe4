import {Safe4Plugin} from "../src";
import {Web3} from "web3";
import {expect} from "chai";

describe('ChainlinkPlugin Tests', () => {
    test("getPropertyValue", async function () {
        const web3 = new Web3("http://127.0.0.1:8545");
        web3.registerPlugin(new Safe4Plugin());
        const result = await web3.safe4.getPropertyValue();
        console.log("=============" + result);
        expect(result).equal("hello");
    });
});