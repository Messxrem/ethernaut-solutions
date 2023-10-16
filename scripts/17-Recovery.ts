import { ethers } from "hardhat";
import { SimpleToken__factory } from '../typechain-types';
import { privateKey, rpc } from "../hardhat.config";

const tokenAddress = ''

const main = async () =>  {
    let tx;
  
    const provider = new ethers.JsonRpcProvider(rpc);
    const signer = new ethers.Wallet(privateKey, provider);

    const contract = SimpleToken__factory.connect(tokenAddress, signer);

    console.log("Recovering...");

    tx = await contract.connect(signer).destroy(signer.address);
    await tx.wait();

    console.log("Successfully recover!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});