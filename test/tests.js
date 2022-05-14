const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DerivativeDepositFactory", function () {
  it("Create contract and fetch AVAX price", async function () {
    const DerivativeDepositFactory = await ethers.getContractFactory("DerivativeDepositFactory", {
      libraries: {
        LibPosition: "0x6384F8070fda183e2b8CE0d521C0a9E7606e30EA",
      },
    });
    const depositFactory = await DerivativeDepositFactory.deploy("0x845a7872d1cDe2B3285dE9f66B1D2EC70307cC6b");
    const contract = await depositFactory.deployed();
    const price = await contract.fetchPrice();

    expect(price).to.be.a('number');
  });
});
