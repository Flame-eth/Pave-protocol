// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./UserAccountData.sol"; 
import "./Token.sol";
import "./USDC.sol";

contract LendingPool is Ownable {
    Token public token;
    USDC public usdc;
    UserAccountData public userAccountDataContract;
    uint256 public interestRate = 20;
   

    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);
    event InterestRateChanged(uint256 newRate);
    event Borrow(address indexed user, uint256 amount);
    event Repay(address indexed user, uint256 amount);

    constructor(address _token, address _usdc, address _userAccountDataContract)  Ownable(msg.sender) {
        token = Token(_token);
        usdc = USDC(_usdc);
        userAccountDataContract = UserAccountData(_userAccountDataContract);
        // interestRate = _interestRate;
    }

    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(token.allowance(msg.sender, address(this)) >= amount, "Insufficient allowance");
        
        token.transferFrom(msg.sender, address(this), amount);
        UserAccountData.Account memory account = userAccountDataContract.getAccount(msg.sender);
        account.collateralBalance += amount;
        emit Deposit(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
         UserAccountData.Account memory account = userAccountDataContract.getAccount(msg.sender);
        require(account.collateralBalance >= amount, "Insufficient balance");
        require(account.borrowedAmount <= amount, "Collaterral in use balance");
        token.transfer(msg.sender, amount);
        emit Withdrawal(msg.sender, amount);
    }

    function borrow(uint256 amount) external {
    require(amount > 0, "Amount must be greater than 0");
     UserAccountData.Account memory account = userAccountDataContract.getAccount(msg.sender);
    require(account.collateralBalance >= amount, "Insufficient collateral");

    uint256 poolBalance = usdc.balanceOf(address(this));
    require(poolBalance >= amount, "Insufficient liquidity in the pool");

    account.borrowedAmount += amount;
    account.usdcBalance += amount;

    usdc.transfer(msg.sender, amount);
    emit Borrow(msg.sender, amount);
    }

    function repay(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
         UserAccountData.Account memory account = userAccountDataContract.getAccount(msg.sender);
        require(account.usdcBalance >= amount, "Insufficient balance");
        require(usdc.allowance(msg.sender, address(this)) >= amount, "Insufficient allowance");
        account.borrowedAmount -= amount;
        account.usdcBalance -= amount;
        usdc.transferFrom(msg.sender, address(this), amount);
        emit Repay(msg.sender, amount);

    }

    function repaywithCollateral(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
         UserAccountData.Account memory account = userAccountDataContract.getAccount(msg.sender);
        require(account.collateralBalance >= amount, "Insufficient collateral");
        account.borrowedAmount -= amount;
        account.collateralBalance -= amount;
        token.transferFrom(msg.sender, address(this), amount);
        emit Repay(msg.sender, amount);
    }

    function getUser() external view returns (UserAccountData.Account memory) {
          UserAccountData.Account memory account = userAccountDataContract.getAccount(msg.sender);
         return account;
    }

    function getInterestRate() external view returns (uint256) {
        return interestRate;
    }

    function setInterestRate(uint256 _newRate) public onlyOwner {
        interestRate = _newRate;
         emit InterestRateChanged(_newRate);

    }
}
