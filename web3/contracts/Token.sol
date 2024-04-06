// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Define ERC20 token
contract PAPCoin is ERC20, Ownable {
     constructor(uint256 initialSupply) ERC20("PAPCoin", "PAP") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10**decimals());
    }

    mapping(address => bool) public minted;

    function mint(address to, uint256 amount) external {
        require(minted[to] == false, "User already minted");
        minted[to] = true;
        _mint(to, amount * 10**decimals());

    }

    function burn(uint256 amount) external onlyOwner() {
        _burn(address(0), amount * 10**decimals());
    }

}
