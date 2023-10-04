import { loadFixture, ethers, expect } from "./setup";

describe("Telephone", function() {

    async function deploy() {
        const signer = (await ethers.getSigners())[1];

        const factory = await ethers.getContractFactory("Telephone");
        const contract = await factory.deploy();
        
        const attackerFactory = await ethers.getContractFactory("TelephoneAttacker");
        const attacker = await attackerFactory.deploy();

        await contract.waitForDeployment();

        return { contract, attacker, signer }
    }

    it("Solve the challenge", async function() {
        const { contract, attacker, signer } = await loadFixture(deploy);

        expect(contract.target).to.be.properAddress;
        
        const tx = await attacker.connect(signer).attack(contract.target, signer);
        await tx.wait();
    
        const owner = await contract.owner();

        expect(owner).to.eq(signer.address);
    });

});