import { loadFixture, ethers, expect } from "./setup";

describe("King", function() {

    async function deploy() {
        const signer = (await ethers.getSigners())[0];

        const factory = await ethers.getContractFactory("King");
        const contract = await factory.deploy();

        const prize = await contract.prize();
        
        const attackerFactory = await ethers.getContractFactory("KingAttacker");
        const attacker = await attackerFactory.deploy({ value: prize + BigInt(1) });

        await contract.waitForDeployment();

        return { contract, attacker, signer }
    }

    it("Solve the challenge", async function() {
        let tx;
        const { contract, attacker, signer } = await loadFixture(deploy);

        expect(contract.target).to.be.properAddress;
        
        tx = await attacker.connect(signer).attack(contract.target);
        await tx.wait();

        const king = await contract._king();
        expect(king).to.be.equal(attacker.target);

        const prize = await contract.prize();
        expect(signer.sendTransaction({
            to: contract.target,
            value: prize + BigInt(1), 
        })).to.be.reverted;
    });

});