import { BytesLike, isBytesLike } from "ethers";
import { loadFixture, ethers, expect } from "./setup";
import { Bytes } from "web3";

describe("Privacy", function() {

    async function deploy() {
        const signer = (await ethers.getSigners())[1];

        const factory = await ethers.getContractFactory("Privacy");
        const contract = await factory.deploy([
            ethers.encodeBytes32String("pass1"),
            ethers.encodeBytes32String("pass2"),
            ethers.encodeBytes32String("pass3"),
        ]);

        await contract.waitForDeployment();

        return { contract, signer }
    }

    it("Solve the challenge", async function() {
        let tx;

        const { contract, signer } = await loadFixture(deploy);

        expect(contract.target).to.be.properAddress;

        const password = await ethers.provider.getStorage(contract.target, 5)

        tx = await contract.connect(signer).unlock(password.slice(0, 34));
        await tx.wait();

        const locked = await contract.locked();

        expect(locked).to.eq(false);
    });

});