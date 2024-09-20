//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@account-abstraction/contracts/core/BaseAccount.sol";
import "@account-abstraction/contracts/core/Helpers.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "./restaurant.sol";
import "hardhat/console.sol";

// Main Contract
contract RestaurantAccount is BaseAccount {

	address public owner;
	address private restaurantAddress;
	Restaurant private restaurant;
	IEntryPoint private immutable entryPointAA;

	constructor (address _owner, address _restaurantAddress,
		IEntryPoint _entryPointAA) {

		owner = _owner; // Restaurant _owner
		restaurantAddress = _restaurantAddress;
		Restaurant _restaurant = Restaurant(restaurantAddress);

		assembly {
			if iszero(extcodesize(_restaurant)) {
				revert(0, 0)
			}
		}
		restaurant = _restaurant;	
		entryPointAA = _entryPointAA; // Entry point contract for AA 
		console.log("Restaurant owner address:", owner);

	}

    // Inherited from BaseAccount override here
    // Entry point for restaurant owner operations/transcations
    function entryPoint() public view virtual override returns (IEntryPoint) {
        return entryPointAA;
    }

    // Inherited from BaseAccount override here
    // Validate restaurant owner's operations/transcations
    function _validateSignature(PackedUserOperation calldata userOp,
        bytes32 userOpHash) internal override virtual
    	returns (uint256 validationData) {

		// Convert useropHash to EIP-191 eth signed hash format
		bytes32 hash = MessageHashUtils.toEthSignedMessageHash(userOpHash);

		// Validate signature in userOp
		if(owner != ECDSA.recover(hash, userOp.signature))	
			return SIG_VALIDATION_FAILED;
		// TODO: Time range validation?	
		return SIG_VALIDATION_SUCCESS;	

    }

    // Proxy for restaurant#registerOwner
    function registerOwnerAA(uint256 _id, uint256 _uuid,
		uint256 _fssai, string memory _url,
		address payable _escrowAddress) external onlyOwner {
    	restaurant.registerOwner(_id, _uuid, _fssai,
    		_url, _escrowAddress);
    }

    modifier onlyOwner {
        if ((msg.sender != owner) && (msg.sender != address(entryPointAA))) revert();
        _;
    }    

}