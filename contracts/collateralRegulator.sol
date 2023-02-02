/// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import {FINA} from "./FianansuToken.sol";
import {ERC20} from "./ERC20.sol";

contract collateralRegulator is ERC20, FINA {

    address tokenAddress;
    mapping(address => uint256) public Vault;
    mapping(address => uint256) public Debt;

    struct UserStatus {
        uint id;
        address userAddress;
        uint256 debtValue;
        uint256 dcr; 
        //debt collateralization ratio - dcr
    }

    UserStatus userStatus;
    mapping(uint => UserStatus) public positionUser;
    uint public positionsCount;

    constructor(address FINATokenAddress) {
        tokenAddress = FINATokenAddress;
        positionsCount = 0;
    }

  
    event SuccessfullERC20Valuation(address account, uint256 amount);
   
    event SuccessfullERC20Withdrawal(address account, uint256 amount);

    event SuccessfullFINAMint(address account, uint256 amount);

    event SuccessfullFINABurn(address account, uint256 amount);

    function collateralValuation(
        address _account,
        uint256 _amount,
        uint256 _collateralPrice
    ) public returns (uint256) {
      
        uint256 collateralValue = _collateralPrice * _amount;

        uint256 FINAVal = (collateralValue * 65) / 100;

        uint256 collateralAmount = FINAVal / 10**6;

        Vault[_account] += collateralAmount;

        emit SuccessfullERC20Valuation(_account, collateralAmount);
        return collateralValue;
    }

    function withdrawTokenCollateral(
        address _account,
        address collateralAddress,
        uint256 _amount
    ) public returns (bool) {

        uint256 collateralWithdrawal = (_amount * 100) / 65;

        FINA(collateralAddress).transferFrom(
            address(this),
            _account,
            collateralWithdrawal
        );

        FINA(tokenAddress).burnFINA(_account, _amount);

        emit SuccessfullERC20Withdrawal(_account, _amount);
        return true;
    }

    function calculateUserStatus(address _account, uint256 collateralPrice)
        public
        returns (uint256)
    {
        uint256 currentDebt = Debt[_account];

        uint256 collateralAmount = (Vault[_account] * 100) / 65;

        uint256 collateralValue = collateralAmount * collateralPrice;

        uint256 debtRatio = (currentDebt / collateralValue) * 100;

        positionUser[positionsCount] = UserStatus( positionsCount, _account, currentDebt, debtRatio);

        positionsCount++;

        return debtRatio;
    }

    function getPositionUser(uint id)
        public
        view
        returns (
            UserStatus memory
        )
    {
        return positionUser[id];
    }

    function initiateMint(address _account, uint256 _amount)
        public
        returns (bool)
    {
        uint256 VaultAmount = Vault[_account];

        require(VaultAmount > _amount, "Cannot mint whats more than in the vault");

        FINA(tokenAddress).mintFINA(_account, _amount);

        emit SuccessfullFINAMint(_account, _amount);

        uint256 newVaultBalance = VaultAmount - _amount;

        Debt[_account] += _amount;

        Vault[_account] = newVaultBalance;

        return true;
    }


    function initiateBurn(address _account, uint256 _amount)
        public
        returns (bool)
    {
        uint256 VaultAmount = Vault[_account];

        require(VaultAmount >= _amount, "Cannot mint whats more than in the vault");

        FINA(tokenAddress).burnFINA(_account, _amount);

        emit SuccessfullFINABurn(_account, _amount);

        uint256 newVaultBalance = VaultAmount - _amount;

        Vault[_account] = newVaultBalance;

        Debt[_account] -= _amount;

        return true;
    }

    function liquidatePosition(address _owner, address _liquidator)
        public
        returns (bool)
    {
        if (userStatus.userAddress == _owner) {
            uint256 debtStatus = userStatus.dcr;

            require(80 >= debtStatus, "Position still valid"); 

            uint256 vaultBalance = Vault[_owner];

            uint256 liquidationReward = (vaultBalance / 100) * 10;

            ERC20(tokenAddress).transfer(_liquidator, liquidationReward);

            Debt[_owner] = 0;
            Vault[_owner] = 0;

            return true;
        } 
        else {
            return false;
        }
    }
}
