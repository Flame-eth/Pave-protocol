// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Token.sol";

contract UserAccountData is Ownable {
    struct Account {
        uint256 collateralBalance;
        uint256 borrowedAmount;
        uint256 tokenBalance;
        uint256 usdcBalance;
        uint256 interestIndex;
        bool isActive;
    }

    PAPCoin public token;

    mapping(address => Account) public accounts;

    constructor(address _token)  Ownable(msg.sender) {
        token = PAPCoin(_token);
    }

   function registerUser(address user) public {
    require(accounts[user].isActive == false, "User already registered");
    
    Account memory newUser;
    newUser.collateralBalance = 0;
    newUser.borrowedAmount = 0;
    newUser.tokenBalance = 1000;
    newUser.usdcBalance = 0;
    newUser.interestIndex = 0;
    newUser.isActive = true;
    
    accounts[user] = newUser;

    token.mint(user, 1000 * 10**18);
    }


    
    function getAccount(address account) external view returns (Account memory) {
        return accounts[account];
    }

    function activateUser(address user) external onlyOwner {
        accounts[user].isActive = true;
    }

    function deactivateUser(address user) external onlyOwner {
        accounts[user].isActive = false;
    }
}
