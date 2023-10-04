import { loadFixture, ethers, expect } from "./setup";

describe("Elevator", function() {

    async function deploy() {
        const signer = (await ethers.getSigners())[1];

        const factory = await ethers.getContractFactory("Elevator");
        const contract = await factory.deploy();
        
        const attackerFactory = await ethers.getContractFactory("ElevatorAttacker");
        const attacker = await attackerFactory.deploy();

        await contract.waitForDeployment();

        return { contract, attacker, signer }
    }

    it("Solve the challenge", async function() {
        const { contract, attacker, signer } = await loadFixture(deploy);

        expect(contract.target).to.be.properAddress;
        
        const tx = await attacker.connect(signer).attack(contract.target);
        await tx.wait();

        const isTop = await contract.top();

        expect(isTop).to.eq(true);
    });

});