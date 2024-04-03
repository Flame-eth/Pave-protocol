// migrations/2_deploy_contracts.js

const UserAccountData = artifacts.require("UserAccountData");
const Token = artifacts.require("Token");
const USDC = artifacts.require("USDC");
const LendingPool = artifacts.require("LendingPool");

module.exports = async function (deployer) {
  // Deploy Token contract
  await deployer.deploy(Token);
  const token = await Token.deployed();

  // Deploy USDC contract
  await deployer.deploy(USDC);
  const usdc = await USDC.deployed();

  // Deploy UserAccountData contract
  await deployer.deploy(UserAccountData, token.address);
  const userAccountData = await UserAccountData.deployed();

  // Deploy LendingPool contract
  const initialInterestRate = 20;
  await deployer.deploy(
    LendingPool,
    token.address,
    usdc.address,
    userAccountData.address,
    initialInterestRate
  );
};
