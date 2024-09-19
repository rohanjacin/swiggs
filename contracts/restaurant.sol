//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {ERC1155Holder} from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "./restaurantEscrow.sol";
import "hardhat/console.sol";

// Restaurant Owner's context
struct RestaurantInfo {
	address owner; //owner's address
	uint256 uuid; //universal id
	uint256 fssai; //license (10^14 ~ 2^46)
	uint256 id; //relative id (10^6 ~ 2^20, location specific)
	string url; // city/${city}/${name}-${locality}-${areaName}-rest${restaurantId} 
	address payable escrowAddress; // Rewards escrow account address
}

// Main Contract
contract Restaurant is ERC1155Holder {

	uint256 public id;
	address public owner;
	RestaurantInfo info;

	address constant internal SWIGGS_ADDRESS = address(0x01);  

	// Restaurant Owner registered event
	event RestaurantOwnerRegistered(uint256 indexed id,
		address escrowAt, address indexed ownerAddress);

	constructor (uint256 _id, address _owner) {

		id = _id; // Restaurant id
		owner = _owner; // Restaurant owner's addess
		console.log("Restaurant Init:", id);
		console.log("Restaurant Owner:", owner);
		console.log("Restaurant contract address:", address(this));

	}

	// Fetches restuaurant information
	function getInfo() external view onlyOwner
		returns(RestaurantInfo memory) {

		console.log("Getting restaurant id:", id);
		return info;
	}

	// Register restaurant details (other than restaurant id)
	function registerOwner(uint256 _id, uint256 _uuid,
		uint256 _fssai, string memory _url,
		address payable _escrowAddress)
		external payable onlyOwner {

		console.log("In registerOwner:", _id);
		console.log("In registerOwner id:", id);

		// Check if restaurant id matches
		if (_id != id) revert();

		// Add restuarant details
		info.owner = msg.sender;
		info.uuid = _uuid;
		info.fssai = _fssai;
		info.url = _url;
		info.escrowAddress = _escrowAddress;
		console.log("register Owner done.");

		emit RestaurantOwnerRegistered(id, info.escrowAddress,
			info.owner);
	}

	// Start operations by enabling rewards
	function startOperations() external
		onlyRegisteredOwner {
		RestaurantEscrow escrow = RestaurantEscrow(info.escrowAddress);

		assembly {
			if iszero(extcodesize(escrow)) {
				revert(0, 0)
			}
		}

		escrow.grantPermission();
	}

	// Stop or halt operations by disabling rewards
	function stopOperations() external
		onlyRegisteredOwner {
		RestaurantEscrow escrow = RestaurantEscrow(info.escrowAddress);

		assembly {
			if iszero(extcodesize(escrow)) {
				revert(0, 0)
			}
		}

		// TODO: Check that no rewards are pending
		escrow.revokePermission();
	}

	// Deposit order's reward amount in the escrow account  
	function depositReward(uint256 orderId, uint256 value) 
		external payable onlyRegisteredOwner {

		console.log("In depositReward..");

		RestaurantEscrow escrow = RestaurantEscrow(info.escrowAddress);
		
		// TODO: Handle failure condition
		escrow.deposit{value:msg.value}(orderId, value);
		console.log("Reward deposited..");
	}

	// Withdraw order's reward amount in the escrow account  
	function withdrawReward(uint256 orderId) 
		external onlyRegisteredOwner {

		console.log("In withdrawReward..");

		RestaurantEscrow escrow = RestaurantEscrow(info.escrowAddress);
		
		// TODO: Handle failure condition
		escrow.withdraw(orderId, payable (msg.sender), 100);
		console.log("Reward withdrawn..");
	}

    modifier onlyOwner {
        if (msg.sender != owner) revert();
        _;
    }

    modifier onlyRegisteredOwner {
        if (msg.sender != info.owner) revert();
        _;
    }

}