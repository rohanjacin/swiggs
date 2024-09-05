//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "hardhat/console.sol";

// Restaurant Owner's context
struct RestaurantInfo {
	uint128 uuid; //universal id
	uint64 fssai; //license (10^14 ~ 2^46)
	uint24 id; //relative id (10^6 ~ 2^20, location specific)
	string url; // city/${city}/${name}-${locality}-${areaName}-rest${restaurantId} 
}

// Main Contract
contract Restaurant {

	uint256 public id;

	constructor (uint256 _id) {

		id = _id;
		console.log("Restaurant Init:", id);
	}

	function getId() public view returns(uint256) {

		console.log("Getting restaurant id:", id);
		return id;
	}
} 