// // migrations/2_deploy_contracts.js

// const UserAccountData = artifacts.require('UserAccountData');
// const Token = artifacts.require('Token');
// const USDC = artifacts.require('USDC');
// const LendingPool = artifacts.require('LendingPool');

// module.exports = async function (deployer) {
//     // Deploy Token contract
//     await deployer.deploy(Token);
//     const token = await Token.deployed();

//     // Deploy USDC contract
//     await deployer.deploy(USDC);
//     const usdc = await USDC.deployed();

//     // Deploy UserAccountData contract
//     await deployer.deploy(UserAccountData, token.address);
//     const userAccountData = await UserAccountData.deployed();

//     // Deploy LendingPool contract
//     await deployer.deploy(LendingPool, token.address, usdc.address, userAccountData.address);
//     const lendingPool = await LendingPool.deployed();
// };

// scripts/deploy.js

const hre = require('hardhat');

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log('Deploying contracts with the account:', deployer.address);

    // Deploy Token contract
    // const Token = await hre.ethers.getContractFactory('PAPCoin');
    // const token = await Token.deploy(1000000);
    // await token.deployed();

    // // Deploy USDC contract
    // const USDC = await hre.ethers.getContractFactory('PAPUSDC');
    // const usdc = await USDC.deploy(1000000);
    // await usdc.deployed();

    // Deploy UserAccountData contract
    // const UserAccountData = await hre.ethers.getContractFactory('UserAccountData');
    // const userAccountData = await UserAccountData.deploy(token.address);
    // await userAccountData.deployed();

    // // Deploy LendingPool contract
    // const LendingPool = await hre.ethers.getContractFactory('LendingPool');
    // const lendingPool = await LendingPool.deploy(token.address, usdc.address, userAccountData.address);
    // await lendingPool.deployed();

    const UserAccountData = await hre.ethers.getContractFactory('UserAccountData');
    const userAccountData = await UserAccountData.deploy('0xC1CFB0eaF74729014E78c8cD90c52Be1922480D8');
    await userAccountData.deployed();

    // Deploy LendingPool contract
    const LendingPool = await hre.ethers.getContractFactory('LendingPool');
    const lendingPool = await LendingPool.deploy(
        '0xC1CFB0eaF74729014E78c8cD90c52Be1922480D8',
        '0x0a0E99796f9671DB4Df676dE32189bda60951ab1',
        userAccountData.address
    );
    await lendingPool.deployed();

    // console.log('Token deployed to:', token.address);
    // console.log('USDC deployed to:', usdc.address);
    console.log('UserAccountData deployed to:', userAccountData.address);
    console.log('LendingPool deployed to:', lendingPool.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
