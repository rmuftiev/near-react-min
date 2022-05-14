// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const DerivativeDepositFactory = await hre.ethers.getContractFactory("DerivativeDepositFactory", {
    libraries: {
      LibPosition: "0x0cE1f283ca59C4F7fE7581DDb94e08eBff17869E"
    },
  });
  const depositFactory = await DerivativeDepositFactory.deploy("0xF228cA0a9c1A62C3b69454C6dB35d77f359D7ee1");
  console.log(depositFactory.address);

  await depositFactory.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
