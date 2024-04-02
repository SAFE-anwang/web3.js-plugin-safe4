import {privateKeyVerify, publicKeyCreate} from "secp256k1";
import {ripemd160, sha256} from "bitcoinjs-lib/src/crypto";
import {encode} from "bs58";
import keccak256 from "keccak256";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Safe3Util {
    private static removePrefix(data: string) {
        if (data.startsWith("0x")) {
            return data.substring(2);
        }
        return data
    }

    public static getUncompressedPublicKey(privateKey: string) {
        const arr = Uint8Array.from(Buffer.from(this.removePrefix(privateKey), 'hex'));
        if (!privateKeyVerify(arr)) {
            throw Error("invalid private key");
        }
        return publicKeyCreate(arr, false);
    }

    public static getCompressedPublicKey(privateKey: string) {
        const arr = Uint8Array.from(Buffer.from(privateKey, 'hex'));
        if (!privateKeyVerify(arr)) {
            throw Error("invalid private key");
        }
        return publicKeyCreate(arr, true);
    }

    public static getSafe3Address(privateKey: string) {
        const pubkeys: Uint8Array[] = [];
        const privkey = this.removePrefix(privateKey)
        pubkeys.push(this.getUncompressedPublicKey(privkey));
        pubkeys.push(this.getCompressedPublicKey(privkey));
        const safe3Addrs: string[] = [];
        pubkeys.forEach((pubkey) => {
            console.log("pubkey: " + Buffer.from(pubkey).toString('hex'));
            let h = sha256(Buffer.from(pubkey));
            let r = ripemd160(h);
            let temp = "4c";
            temp += r.toString('hex');
            h = sha256(Buffer.from(temp, 'hex'));
            h = sha256(h);
            temp = temp.concat(h.subarray(0, 4).toString('hex'));
            console.log(temp);
            console.log(encode(Buffer.from(temp, 'hex')))
            safe3Addrs.push(encode(Buffer.from(temp, 'hex')));
        });
        return safe3Addrs;
    }

    public static getSafe4Address(privateKey: string) {
        const pubkey = this.getUncompressedPublicKey(this.removePrefix(privateKey))
        console.log(Buffer.from(pubkey.subarray((1))).toString("hex"));
        const h = keccak256(Buffer.from(pubkey.subarray(1)))
        console.log(h.toString("hex"));
        const addr = "0x" + h.toString('hex').substring(24);
        console.log(addr);
        return addr;
    }
}