pragma solidity ^0.8.0;

import './BridgeBase.sol';

contract BridgeFIL is BridgeBase {
  constructor(address token) BridgeBase(token) {}
}