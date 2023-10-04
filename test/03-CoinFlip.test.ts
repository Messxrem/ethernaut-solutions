import { loadFixture, ethers, expect } from "./setup";

describe("CoinFlip", function() {

    async function deploy() {
        const signer = (await ethers.getSigners())[1];

        const factory = await ethers.getContractFactory("CoinFlip");
        const contract = await factory.deploy();
        
        const attackerFactory = await ethers.getContractFactory("CoinFlipAttacker");
        const attacker = await attackerFactory.deploy(contract.target);

        await contract.waitForDeployment();

        return { contract, attacker, signer }
    }

    it("Solve the challenge", async function() {
        const { contract, attacker, signer } = await loadFixture(deploy);

        expect(contract.target).to.be.properAddress;
        
        for (let i = 0; i < 10; i++) {
            const tx = await attacker.connect(signer).attack();
            await tx.wait(1);
        }
    
        const consecutiveWins = await contract.consecutiveWins();
        
        expect(consecutiveWins).to.eq(10);
    });

});