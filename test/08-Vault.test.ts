import { loadFixture, ethers, expect } from "./setup";

describe("Vault", function() {

    async function deploy() {
        const signer = (await ethers.getSigners())[1];

        const factory = await ethers.getContractFactory("Vault");
        const contract = await factory.deploy(ethers.encodeBytes32String("secret"));

        await contract.waitForDeployment();

        return { contract, signer }
    }

    it("Solve the challenge", async function() {
        let tx;

        const { contract, signer } = await loadFixture(deploy);

        expect(contract.target).to.be.properAddress;
        
        const password = await ethers.provider.getStorage(contract.target, 1)

        tx = await contract.connect(signer).unlock(password);
        await tx.wait();

        const locked = await contract.locked();

        expect(locked).to.eq(false);
    });

});