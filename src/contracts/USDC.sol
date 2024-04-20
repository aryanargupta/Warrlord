// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "./IERC20.sol";

contract USDC is IERC20 {

    uint256 constant private MAX_UINT256 = 2**256 - 1;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    uint256 public totalSupply;
    string public name;                   
    uint8 public decimals;                
    string public symbol;   
    address public admin;

    constructor() {
        balances[msg.sender] = 10000;               
        totalSupply = 10000;                        
        name = "USD coin";                                   
        decimals = 18;                           
        symbol = "USDC";   
        admin = msg.sender;                              
    }

    function transfer(address _to, uint256 _value) public override returns (bool success) {
        require(balances[msg.sender] >= _value, "token balance is lower than the value requested");
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public override returns (bool success) {
        uint256 _allowance = allowed[_from][msg.sender];
        require(balances[_from] >= _value && _allowance >= _value, "token balance or allowance is lower than amount requested");
        balances[_to] += _value;
        balances[_from] -= _value;
        if (_allowance < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
        }
        emit Transfer(_from, _to, _value); 
        return true;
    }

    function balanceOf(address _owner) public override view returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public override returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value); 
        return true;
    }

    function allowance(address _owner, address _spender) public override view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }

    function mint(address to, uint256 value) external returns(bool) {
        require(msg.sender == admin, "Unauthorized");
        totalSupply += value;
        balances[to] += value;
        return true;
    }

    function burn(address from, uint256 value) external returns(bool){
        require(msg.sender == admin, "Unauthorized");
        require(balances[from] >= value);
        balances[from] -= value;
        totalSupply -= value;
        return true;
    }

}