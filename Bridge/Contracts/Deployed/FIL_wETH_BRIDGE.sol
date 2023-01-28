pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.8.1/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.8.1/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts@4.8.1/access/Ownable.sol";

contract FIL_wETH_BRIDGE is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("WRAPPED ETH", "wETH") {}

    function mint(address to, uint256 amount) public{
        _mint(to, amount);
    }
}