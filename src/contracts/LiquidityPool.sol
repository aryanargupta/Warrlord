// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "./IERC20.sol";

contract LiquidityPool {
    address public gameManager;           
    address public owner;
    IERC20 public goldToken;
    IERC20 public usdcToken;
    uint256 public totalGold;
    uint256 public totalUsdc;

    constructor(address _gameManager, address _goldToken, address _usdcToken) {
        gameManager = _gameManager;
        owner = msg.sender;
        goldToken = IERC20(_goldToken);
        usdcToken = IERC20(_usdcToken);
    }

    function setGameManager(address _gameManager) external {
        require(msg.sender == owner, "Invalid operation");
        gameManager = _gameManager;
    }

    function setGoldToken(address _goldToken) external {
        require(msg.sender == owner, "Invalid operation");
        goldToken = IERC20(_goldToken);
    }

    function setUsdcToken(address _usdcToken) external {
        require(msg.sender == owner, "Invalid operation");
        usdcToken = IERC20(_usdcToken);
    }

    // Function to add liquidity by depositing GOLD and USDC tokens
    function addLiquidity(uint256 goldAmount, uint256 usdcAmount) external {
        require(goldAmount > 0 && usdcAmount > 0, "Amount must be greater than 0");

        goldToken.transferFrom(msg.sender, address(this), goldAmount);
        usdcToken.transferFrom(msg.sender, address(this), usdcAmount);

        totalGold += goldAmount;
        totalUsdc += usdcAmount;
    }

    // Function to swap GOLD for USDC
    function swapGoldForUsdc(uint256 goldAmount) external {
        require(goldAmount > 0, "Amount must be greater than 0");

        uint256 usdcAmount = (goldAmount * totalUsdc) / totalGold;

        goldToken.transferFrom(msg.sender, address(this), goldAmount);
        usdcToken.transfer(msg.sender, usdcAmount);

        totalGold += goldAmount;
        totalUsdc -= usdcAmount;
    }

    // Function to swap USDC for GOLD
    function swapUsdcForGold(uint256 usdcAmount) external {
        require(usdcAmount > 0, "Amount must be greater than 0");

        uint256 goldAmount = (usdcAmount * totalGold) / totalUsdc;

        usdcToken.transferFrom(msg.sender, address(this), usdcAmount);
        goldToken.transfer(msg.sender, goldAmount);

        totalGold -= goldAmount;
        totalUsdc += usdcAmount;
    }

}