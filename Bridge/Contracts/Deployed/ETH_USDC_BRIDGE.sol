// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.8.1/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.8.1/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts@4.8.1/access/Ownable.sol";

contract ETH_USDC_BRIDGE is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("ETH USDC BRIDGE", "USDC") {}

    event eth(address from,uint amount);

    function mint(address to, uint256 amount) public{
        _mint(to, amount);
    }

    fallback() external payable{
        emit eth(msg.sender,msg.value);
    }

    receive() external payable{
       emit eth(msg.sender,msg.value);
    }

}
