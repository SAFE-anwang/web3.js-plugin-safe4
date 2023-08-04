import {Safe4Plugin} from "../src";
import {Web3} from "web3";

const web3 = new Web3("http://127.0.0.1:8545");
web3.registerPlugin(new Safe4Plugin());
web3.safe4.getPropertyValue("block_space");