//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "hardhat/console.sol";
import "./restaurant.sol";

// Main Contract
contract Swiggs {

	string name;

	constructor (string memory _name) {
		name = _name;
		console.log("Swiggs created.. ", name);
	}

	// Restaurant registered event
	event RestaurantRegistered(uint256 indexed restaurantId,
		address restaurantAddress);

	// Registers and deploys the restaurant's smart contract
	function registerRestaurant(uint256 restaurantId)
	public returns (bool success) {
		address payable addr;
		bytes32 _salt;
		bytes memory initCode = type(Restaurant).creationCode;

		console.log("restaurantId:", restaurantId);
		_salt = keccak256(abi.encodePacked(restaurantId));
		console.log("_salt:", uint256(_salt));

		bytes memory byteCode = abi.encodePacked(initCode, uint256(restaurantId));
		console.log("creating restaurant contract..:", restaurantId);

		// Deploy restaurant's contract
		assembly {
			addr := create2(
				0,
				add(byteCode, 0x20),
				mload(byteCode),
				_salt
			)

			if iszero(extcodesize(addr)) {
				revert(0, 0)
			}
		}

		console.log("Done..");
		emit RestaurantRegistered(restaurantId, addr);
		return true;
	}
} 