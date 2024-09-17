//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "hardhat/console.sol";
import "./restaurant.sol";
import "./restaurantEscrow.sol";

// Main Contract
contract Swiggs {

	string name;

	constructor (string memory _name) {
		name = _name;
		console.log("Swiggs created.. ", name);
	}

	// Restaurant registered event
	event RestaurantDeployed(uint256 indexed restaurantId,
		address restaurantAt, address escrowAt);

	// Deploys the restaurant's smart contract
	function deployRestaurant(uint256 restaurantId, address ownerAddress)
	public payable returns (bool success) {

		// Deploy restaurant's smart contract
		address restaurantAt = _deployRestaurantContract(
			restaurantId, ownerAddress);

		address escrowAt = _deployRestaurantEscrowContract(
			restaurantId, ownerAddress, restaurantAt);

		console.log("Done..");

		emit RestaurantDeployed(restaurantId, restaurantAt, escrowAt);
		return true;
	}

	function _deployRestaurantContract(uint256 restaurantId,
		address ownerAddress) internal returns(address) {

		address payable addr;
		bytes32 _salt;
		bytes memory initCode = type(Restaurant).creationCode;

		console.log("restaurantId:", restaurantId);
		_salt = keccak256(abi.encodePacked(restaurantId));
		console.log("_salt:", uint256(_salt));

		bytes memory byteCode = abi.encodePacked(initCode,
			uint256(restaurantId), abi.encode(address(ownerAddress)));
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

		return addr;
	}

	function _deployRestaurantEscrowContract(uint256 restaurantId,
		address ownerAddress, address restaurantDeployedAddress) internal
		returns(address) {

		address payable addr;
		bytes32 _salt;
		bytes memory initCode = type(RestaurantEscrow).creationCode;

		console.log("restaurantId:", restaurantId);
		console.log("ownerAddress:", ownerAddress);
		// TODO: Audit the salt hash for leakage
		_salt = keccak256(abi.encodePacked(restaurantId, ownerAddress));
		console.log("_salt:", uint256(_salt));

		bytes memory byteCode = abi.encodePacked(initCode,
			abi.encode(address(restaurantDeployedAddress)));
		console.log("creating restaurant escrow contract..:", restaurantId);

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

		return addr;
	}
} 