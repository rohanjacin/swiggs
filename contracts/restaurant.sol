//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

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
contract Restaurant {

	uint256 public id;
	address public owner;
	RestaurantInfo info;

	address constant internal SWIGGS_ADDRESS = address(0x01);  

	constructor (uint256 _id, address _owner) {

		id = _id; // Restaurant id
		owner = _owner; // Restaurant owner's addess
		console.log("Restaurant Init:", id);
	}

	function getId() public view onlyOwner returns(uint256) {

		console.log("Getting restaurant id:", id);
		return id;
	}

	// Register restaurant details (other than restaurant id)
	function registerOwner(uint256 _id, uint256 _uuid,
		uint256 _fssai, string memory _url,
		address payable _escrowAddress)
		public payable onlyOwner {

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
	}

	// Start operations by enabling rewards
	function startOperations() public
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
	function stopOperations() public
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

    modifier onlyOwner {
        if (msg.sender != owner) revert();
        _;
    }

    modifier onlyRegisteredOwner {
        if (msg.sender != info.owner) revert();
        _;
    }

}