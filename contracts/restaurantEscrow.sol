//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "hardhat/console.sol";

// Restaurant Escrow account
contract RestaurantEscrow is ERC1155 {
	
	address internal RESTAURANT_ADDESS; 
	uint256 internal nOrders = 0;
	address constant internal SWIGGS_ADDRESS = address(0x01);  
	uint256 NULL_ORDER = 1;

	constructor (address restaurantAddess) 
	ERC1155("https://thrive.restaurantId.com/api/orders/{id}.json") {

		// Add the restaurant as a fixed participant 
		RESTAURANT_ADDESS = restaurantAddess;
		console.log("Restaurant escrow init: restaurant addr: ",
			RESTAURANT_ADDESS);
		console.log("Escrow Address:", address(this));
	}

	// Fallback function 
	receive () external payable {

		// TODO: do we need this? What if the owner wants
		// to topup the reward kitty?
		_mint(RESTAURANT_ADDESS, NULL_ORDER, msg.value, "");
	}

	// Deposit the rewards for order id <orderId> 
	// orderId => (owner => tokens) 
	function deposit(uint256 orderId, uint256 value) public payable 
	onlyRestaurantOwner {
		require(msg.value != 0, "RestaurantEscrow#deposit: msg value is 0");
		require(msg.value == value, "RestaurantEscrow#deposit: msg value not same as value");

		nOrders += 1;
		_mint(RESTAURANT_ADDESS, orderId, value, "");
	}

	// Withdraw the rewards for order id <orderId>
	function withdraw(uint256 orderId, address payable to, uint256 value)
		public onlySwiggs {

		// Reward value in escrow kitty should match requested withdrawal
		uint256 _value = balanceOf(RESTAURANT_ADDESS, orderId);

		// Check allowed withdrawal
		require(value == _value, "RestaurantEscrow#withdraw: Reward value mismatch");

		// Burn order
		_burn(RESTAURANT_ADDESS, orderId, value);

		// Check withdrawal is not to self
		require(to != msg.sender, "RestaurantEscrow#withdraw: Cannot withdraw to sender");
		
		// Check if account has sufficient rewards 
		require(address(this).balance >= value, "Insufficient rewards in account");

		// Withdraw
		to.transfer(value);
	}

	// Set approval for operations
	function grantPermission() public onlySwiggs {

		// Set Swiggs contract approval to operate on
		// restaurant owner's reward tokens
		setApprovalForAll(SWIGGS_ADDRESS, true);
	}

	// Set approval for operations
	function revokePermission() public onlySwiggs {

		// Revoke Swiggs contract approval to operate on
		// restaurant owner's reward tokens
		setApprovalForAll(SWIGGS_ADDRESS, false);
	}

    modifier onlyRestaurantOwner {
        if (msg.sender != RESTAURANT_ADDESS) revert();
        _;
    }

    modifier onlySwiggs {
        if (msg.sender != SWIGGS_ADDRESS) revert();
        _;
    }    
} 