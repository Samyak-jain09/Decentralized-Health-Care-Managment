/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require('dotenv').config({path:'./.env.local'});

const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
})

module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "polygon",
  gas: 2100000,
  gasPrice: 8000000000,
  networks: {
    hardhat : {},
    polygon: {
      url:process.env.NEXT_PUBLIC_RPC_URL,
      accounts: [privateKey]
    }
  }
};
