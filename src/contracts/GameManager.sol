// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { IERC20 } from "./IERC20.sol";

contract GameManager {
    IERC20 goldContract;
    address public admin;
    uint64 DEFAULT_MINING_RATE = 10;
    uint64 MINE_BASE_PRICE = 100;

    constructor ()  {
        admin = msg.sender;
    }

    struct State {
        uint8 hall;
        uint8 camp;
        uint8 cannon;
        uint8 mine;
        uint8 gold_storage;
        uint256 last_mined;
        uint256 balance;
    }

    mapping (address => State) public gameStates;
    mapping (address => bool)  public isPlayerExist;

    modifier onlyAdmin()  {
        require(msg.sender == admin,"You do not have permission");
        _;
    }

    function initialize() external {
        require(isPlayerExist[msg.sender] == false, "Player already exists");
        gameStates[msg.sender] = State(
            1,
            0, 
            1, 
            1,
            0,
            block.timestamp,
            50
        );
        isPlayerExist[msg.sender] = true ;
    }

    function mine() external {
        require(isPlayerExist[msg.sender], "Player does not exist");
        uint8 mine_level = gameStates[msg.sender].mine;
        uint256 amount = ((gameStates[msg.sender].last_mined - block.timestamp) * (DEFAULT_MINING_RATE * mine_level)) / 3600;
        goldContract.mint(msg.sender, amount);
        gameStates[msg.sender].balance += amount;
        gameStates[msg.sender].last_mined = block.timestamp;
    }

    function buy_or_upgrade_storage() external {
        require(isPlayerExist[msg.sender], "Player does not exist");
        require(gameStates[msg.sender].balance >= MINE_BASE_PRICE, "Not enough gold");
        
        uint8 storage_level = gameStates[msg.sender].gold_storage;
        uint256 amount = (1 + storage_level) * MINE_BASE_PRICE;
        goldContract.burn(msg.sender, amount);
        gameStates[msg.sender].balance -= amount;
        gameStates[msg.sender].gold_storage = storage_level + 1;
    }

    function setGoldAddress(address goldAddress) external onlyAdmin {
        goldContract = IERC20(goldAddress);
    }

    function setMiningRate(uint64 _rate) external onlyAdmin {
        DEFAULT_MINING_RATE = _rate;
    }

    function getPlayerState(address player) external view returns(State memory) {
        return gameStates[player];
    }

    function doesPlayerExist(address player) external view returns(bool) {
        return isPlayerExist[player];
    }
    
}