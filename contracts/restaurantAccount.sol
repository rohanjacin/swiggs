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

		console.log("\nIn constructor of RestaurantAccount");
		console.log("_owner:", _owner);
		console.log("_restaurantAddress:", _restaurantAddress);

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
    
    // Validate only allowed interaction with restaurant contract
    function validateUserOp(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external override returns (uint256 validationData) {

    	// validate the signature
        validationData = _validateSignature(userOp, userOpHash);
        _validateNonce(userOp.nonce);

        // TODO: validate the retaurant contract as destination??

        // TODO: validate the calldata signature (check if possible)
        bytes4 _sel = bytes4(userOp.callData[0:4]);
        require(_validateSelector(_sel), "Not a valid selector");
    }

	function _validateSelector(bytes4 _selector) 
		internal view returns (bool ret) {

		ret = false;

		if ((restaurant.getInfo.selector == _selector) ||
			(restaurant.registerOwner.selector == _selector) ||
			(restaurant.startOperations.selector == _selector) ||
			(restaurant.stopOperations.selector == _selector) ||
			(restaurant.depositReward.selector == _selector) ||
			(restaurant.withdrawReward.selector == _selector)) {
			ret = true;
		}
							
        return ret;
    }

    // Proxy for restaurant#functions
    function execute(address dest, uint256 value, bytes calldata func)
    	external onlyOwner {
    	_call(dest, value, func);
    }

    function _call(address target, uint256 value, bytes memory data) internal {
        (bool success, bytes memory result) = target.call{value: value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }

     // check current account deposit in the entryPoint
    function getDeposit() public view returns (uint256) {
        return entryPoint().balanceOf(address(this));
    }

    // deposit more funds for this account in the entryPoint
    function addDeposit() public payable {
        entryPoint().depositTo{value: msg.value}(address(this));
    }

    modifier onlyOwner {
        if ((msg.sender != owner) && (msg.sender != address(entryPointAA))) revert();
        _;
    }    

}