import { loadFixture, ethers, expect } from "./setup";

describe("Force", function() {

    async function deploy() {
        const signer = (await ethers.getSigners())[1];

        const factory = await ethers.getContractFactory("Force");
        const contract = await factory.deploy();
        
        const attackerFactory = await ethers.getContractFactory("ForceAttacker");
        const attacker = await attackerFactory.deploy(contract.target, { value: 1});

        await contract.waitForDeployment();

        return { contract }
    }

    it("Solve the challenge", async function() {
        const { contract } = await loadFixture(deploy);

        expect(contract.target).to.be.properAddress;
        
        const balance = await ethers.provider.getBalance(contract.target);

        expect(balance).to.eq(1);
    });

});