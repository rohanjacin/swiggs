//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
//import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "hardhat/console.sol";

// Restaurant Escrow account
abstract contract RestaurantEscrow is ERC1155 {
	
	address public owner;
	address public restaurantAddess; 
	uint256 internal nOrders = 0;
	uint256 constant NULL_ORDER = 1;

	constructor (address _restaurantAddess, address _owner) 
	ERC1155("https://thrive.restaurantId.com/api/orders/{id}.json") {

		owner = _owner; // Contract owner
		// Add the restaurant as a fixed participant 
		restaurantAddess = _restaurantAddess;
		console.log("Restaurant escrow init: restaurant addr: ",
			restaurantAddess);
		console.log("Escrow Address:", address(this));
	}

	// Fallback function 
	receive () external payable {

		// TODO: do we need this? What if the owner wants
		// to topup the reward kitty?
		_mint(restaurantAddess, NULL_ORDER, msg.value, "");
	}

	// Deposit the rewards for order id <orderId> 
	// orderId => (owner => tokens) 
	function deposit(uint256 orderId, uint256 value) public payable 
		onlyRestaurantOwner {

		console.log("in deposit:", value);
		console.log("msg.value:", msg.value);

		require(msg.value != 0, "RestaurantEscrow#deposit: msg value is 0");
		require(msg.value == value, "RestaurantEscrow#deposit: msg value not same as value");

		nOrders += 1;

		console.log("nOrders:", nOrders);
		_mint(restaurantAddess, orderId, value, "");
		console.log("donee .. balance:", address(this).balance);
	}

	// Withdraw the rewards for order id <orderId>
	function withdraw(uint256 orderId, address payable to, uint256 value)
		public onlyOwner {

		// Reward value in escrow kitty should match requested withdrawal
		uint256 _rewardBalance = balanceOf(restaurantAddess, orderId);
		console.log("_rewardBalance:", _rewardBalance);
		console.log("value:", value);

		// Check allowed withdrawal
		require(value <= _rewardBalance,
			"RestaurantEscrow#withdraw: value > reward balance for order");

		// Burn order
		_burn(restaurantAddess, orderId, value);

		// Check withdrawal is not to self
		require(to != msg.sender, "RestaurantEscrow#withdraw: Cannot withdraw to sender");
		
		// Check if account has sufficient rewards 
		require(address(this).balance >= value, "Insufficient rewards in account");

		// Withdraw
		to.transfer(value);
	}

	// Set approval for operations
	function grantPermission() public onlyOwner {

		// Set Swiggs contract approval to operate on
		// restaurant owner's reward tokens
		setApprovalForAll(owner, true);
	}

	// Set approval for operations
	function revokePermission() public onlyOwner {

		// Revoke Swiggs contract approval to operate on
		// restaurant owner's reward tokens
		setApprovalForAll(owner, false);
	}

    modifier onlyOwner {
        if (msg.sender != owner) revert("NOT OWNER");
        _;
    }

    modifier onlyRestaurantOwner {
        if (msg.sender != restaurantAddess) revert();
        _;
    }
} 