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
		//console.log("Swiggs created.. ", name);
	}

	// Restaurant registered event
	event RestaurantDeployed(uint256 indexed restaurantId,
		address restaurantAt, address escrowAt);

	// Deploys the restaurant's smart contract
	function deployRestaurant(uint256 restaurantId,
		bytes memory restaurantInitCode, bytes memory escrowInitCode)
	public payable returns (bool success) {

		// Deploy restaurant's smart contract
		address restaurantAt = _deployRestaurantContract(
			restaurantId, restaurantInitCode);

		address escrowAt = _deployRestaurantEscrowContract(
			restaurantId, restaurantAt, escrowInitCode);
		//console.log("Done..");

		emit RestaurantDeployed(restaurantId, restaurantAt, escrowAt);
		return true;
	}

	function _deployRestaurantContract(uint256 restaurantId,
		bytes memory restaurantInitCode)
		internal returns(address) {

		address payable addr;
		bytes32 _salt;
		//bytes memory initCode = type(Restaurant).creationCode;

		_salt = keccak256(abi.encodePacked(restaurantId));

		bytes memory byteCode = abi.encodePacked(restaurantInitCode,
			uint256(restaurantId), abi.encode(address(this)));

		//console.log("creating restaurant contract..:", restaurantId);

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
		address restaurantDeployedAddress,
		bytes memory escrowInitCode) internal
		returns(address) {

		address payable addr;
		bytes32 _salt;
		//bytes memory initCode = type(RestaurantEscrow).creationCode;

		// TODO: Audit the salt hash for leakage
		_salt = keccak256(abi.encodePacked(restaurantId, address(this)));
		//console.log("_salt:", uint256(_salt));

		bytes memory byteCode = abi.encodePacked(escrowInitCode,
			abi.encode(address(restaurantDeployedAddress), address(this)));
		//console.log("creating restaurant escrow contract..:", restaurantId);

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

	// Validate reward against an order
	// TODO: Revist restaruant address creation scheme
	function validateReward(address restaurantAddress, uint256 orderId, uint256 value)
	public view {

		// Fetch restaurant contract and check is retaurant contract exists
		Restaurant restaurant = Restaurant(restaurantAddress);
		assembly {
			if iszero(extcodesize(restaurant)) {
				revert(0, 0)
			}
		}

		RestaurantInfo memory info = restaurant.getInfo();

		// Fetch restaurant escrow contract and check if it exists
		RestaurantEscrow escrow = RestaurantEscrow(info.escrowAddress);
		assembly {
			if iszero(extcodesize(escrow)) {
				revert(0, 0)
			}
		}

		// Get rewards for order id <orderId>
		uint256 _reward = escrow.balanceOf(address(restaurant), orderId);

		// Validate reward amount
		require(value == _reward, "Swiggs#validateReward: rewards not exact");
	}
}