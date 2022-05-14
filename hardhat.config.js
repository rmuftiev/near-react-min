require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config = {};

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.5.16",
  networks: {
    aurora_testnet: {
      url: config.AURORA_TESTNET_URL || 'https://testnet.aurora.dev',
      accounts: ['0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'],
    },
    aurora: {
      url: config.AURORA_MAINNET_URL || 'https://mainnet.aurora.dev',
      accounts: ['0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'],
    },
    mainnet: {
      url: config.MAINNET_URL || 'https://testnet.aurora.dev',
      accounts: ['0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'],
    },
    polygon_testnet: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: ["ef40ad1d3c7368b2fce051cfc34d73df7393e29bb4b9324146d034e496aa64fb"]
    }
  },
};
