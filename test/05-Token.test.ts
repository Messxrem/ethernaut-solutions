import { loadFixture, ethers, expect } from "./setup";

describe("Token", function() {

    async function deploy() {
        const [ signer1, signer2 ] = await ethers.getSigners();

        const factory = await ethers.getContractFactory("Token");
        const contract = await factory.deploy(20);

        await contract.waitForDeployment();

        return { contract, signer1, signer2 }
    }

    it("Solve the challenge", async function() {
        const { contract, signer1, signer2 } = await loadFixture(deploy);

        expect(contract.target).to.be.properAddress;

        const amount = 100;
        
        const tx = await contract.connect(signer1).transfer(signer2.address, amount);
        await tx.wait();
        
        const balance = await contract.balanceOf(signer2.address);

        expect(balance).to.eq(amount);
    });

});