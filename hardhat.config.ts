import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
// import "tsconfig-paths/register";

dotenvConfig({ path: resolve(__dirname, "./.env") });


export const privateKey: string = process.env.PRIVATE_KEY || "";
if (!privateKey) {
  throw new Error("Please set your PRIVATE_KEY in a .env file");
}
export const rpc: string = process.env.RPC || "";
if (!rpc) {
  throw new Error("Please set your RPC in a .env file");
}

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
    },
    goerli: {
      url: `https://rpc.ankr.com/eth_goerli`,
      accounts: [privateKey],
      chainId: 5,
    },
    sepolia: {
      url: `https://rpc.sepolia.org`,
      accounts: [privateKey],
      chainId: 11155111,
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.6.6",
      },
      {
        version: "0.8.20",
      },
      {
        version: "0.7.0",
      },
    ],
  }
};

export default config;
