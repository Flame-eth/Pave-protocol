// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Define ERC20 token
contract PAPUSDC is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("PAPUSDC", "PUSDC") Ownable(msg.sender) {
         _mint(msg.sender, initialSupply * 10**decimals());
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount * 10**decimals());
    }
}
