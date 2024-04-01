// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Define ERC20 token
contract Token is ERC20, Ownable {
    constructor() ERC20("MyToken", "MTK") {}

    mapping(address => bool) public ninted;

    function mint(address to, uint256 amount) external {
        require(ninted[to] == false, "User already minted");
        ninted[to] = true;
        _mint(to, amount);

    }
}
