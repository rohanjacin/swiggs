//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {ERC1155Holder} from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "./restaurantEscrow.sol";
import "./IRestaurantAccount.sol";
import "hardhat/console.sol";

// Restaurant Owner's context
struct RestaurantInfo {
	address owner; //owner's address
	address payable escrowAddress; // Rewards escrow account address
	uint256 uuid; //universal id
	uint256 fssai; //license (10^14 ~ 2^46)
	uint256 id; //relative id (10^6 ~ 2^20, location specific)
	string url; // city/${city}/${name}-${locality}-${areaName}-rest${restaurantId} 
}

// Main Contract
abstract contract Restaurant is ERC1155Holder {

	uint256 public id;
	address public owner;
	RestaurantInfo info;

	// Restaurant Owner registered event
	event RestaurantOwnerRegistered(uint256 indexed id,
		address escrowAt, address indexed ownerAddress);

	constructor (uint256 _id, address _owner) {

		id = _id; // Restaurant id
		owner = _owner; // Contract owner
		console.log("Restaurant Init:", id);
		console.log("Restaurant Owner:", owner);
		console.log("Restaurant contract address:", address(this));

	}

	// Fetches restaurant information
	function getInfo() external view onlyOwner
		returns(address, address payable, uint256, 
				uint256,uint256, string memory) {

		console.log("Getting restaurant id:", id);
		return (info.owner, info.escrowAddress, info.id,
				info.uuid, info.fssai, info.url);
	}

	// Register restaurant details (other than restaurant id)
	function registerOwner(uint256 _id, uint256 _uuid,
		uint256 _fssai, string memory _url,
		address _restaurantOwner,
		address payable _escrowAddress)
		external payable onlyAdmin {

		console.log("In registerOwner:", _id);
		console.log("In registerOwner id:", id);
		console.log("In registerOwner (_id != id):", (_id != id));

    	require(_restaurantOwner != address(0), "Restaurant a/c address cannot be zero");

		// Check if restaurant id matches
		//if (_id != id) revert();

		// Add restuarant details
		info.owner = _restaurantOwner;
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
		onlyAdmin onlyOwner {
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
		onlyAdmin onlyOwner {
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
		external payable onlyOwner {

		console.log("In depositReward..:", msg.value);
		console.log("value:", value);

		require(value == msg.value, "Value mismatch");
		RestaurantEscrow escrow = RestaurantEscrow(info.escrowAddress);
		
		// TODO: Handle failure condition
		escrow.deposit{value:msg.value}(orderId, value);
		console.log("Reward deposited..");
	}

	// Withdraw order's reward amount in the escrow account  
	function withdrawReward(uint256 orderId) 
		external onlyOwner {

		console.log("In withdrawReward..");

		RestaurantEscrow escrow = RestaurantEscrow(info.escrowAddress);
		
		// TODO: Handle failure condition
		escrow.withdraw(orderId, payable (msg.sender), 100);
		console.log("Reward withdrawn..");
	}

    modifier onlyAdmin {
        if (msg.sender != owner) revert("Not Admin");
        _;
    }

    modifier onlyOwner {
        if (msg.sender != info.owner) revert("Not Owner");
        _;
    }

}