//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@account-abstraction/contracts/core/BaseAccount.sol";
import "@account-abstraction/contracts/interfaces/IAccountExecute.sol";
import "@account-abstraction/contracts/core/Helpers.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "./restaurant.sol";
import "./IRestaurant.sol";
import "hardhat/console.sol";

// Main Contract
contract RestaurantAccount is BaseAccount, IAccountExecute {

	address public owner;
	address internal restaurantAddress;
	IEntryPoint private immutable entryPointAA;

	constructor (address _owner, IEntryPoint _entryPointAA) {

		console.log("\nIn constructor of RestaurantAccount");
		console.log("_owner:", _owner);

		owner = _owner; // Contract _owner
		entryPointAA = _entryPointAA; // Entry point contract for AA 
		console.log("Restaurant owner address:", owner);
	}

    event Executed(PackedUserOperation userOp, bytes innerCallRet);

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

    	missingAccountFunds; // unused
    	console.log("\n\nvalidateUserOp");
    	// validate the signature
        validationData = _validateSignature(userOp, userOpHash);
        _validateNonce(userOp.nonce);

        // TODO: validate the retaurant contract as destination??

        // TODO: validate the calldata signature (check if possible)
        bytes4 _sel = bytes4(userOp.callData[0:4]);
        require(_validateSelector(_sel), "Not a valid selector");
    }

	function _validateSelector(bytes4 _selector) internal pure returns (bool ret) {

		ret = false;

		if (this.executeUserOp.selector == _selector) {
			ret = true;
		}
							
        return ret;
    }

    // Link the restaurant contract on owner registration
    function linkRestaurant(address _restaurantAddress)
    	external payable onlyOwner returns(bool) {

    	console.log("Link restaurant:", _restaurantAddress);
    	require(_restaurantAddress != address(0), "Restaurant address cannot be zero");
    	restaurantAddress = _restaurantAddress;
    	return true;
    } 

    // Proxy for restaurant#functions
    function executeUserOp(PackedUserOperation calldata userOp, bytes32 /*userOpHash*/)
    	external onlyOwnerOrEntryPoint() {

        // read from the userOp.callData, but skip the "magic" prefix (executeUserOp sig),
        // which caused it to call this method.
        bytes calldata innerCall = userOp.callData[4 :];
        bytes memory innerCallRet;
/*
		if ((this.interface.executeUserOp.selector == _selector) ||
			(IRestaurant.registerOwner.selector == _selector) ||
			(IRestaurant.startOperations.selector == _selector) ||
			(IRestaurant.stopOperations.selector == _selector) ||
			(IRestaurant.depositReward.selector == _selector) ||
			(IRestaurant.withdrawReward.selector == _selector)) {
			ret = true;
		}
*/
        console.log("in executeUserOp");
        if (innerCall.length > 0) {
            (address target, bytes memory data) = abi.decode(innerCall, (address, bytes));
            bool success;
            console.log("target:", target);

            require(target == restaurantAddress, "inner call failed");
		
            (success, innerCallRet) = target.call(data);
            require(success, "inner call failed");
        }

        emit Executed(userOp, innerCallRet);
    }

    modifier onlyOwner {
        if (msg.sender != owner) revert();
        _;
    }    

    modifier onlyOwnerOrEntryPoint {
        if ((msg.sender != owner) && (msg.sender != address(entryPointAA))) revert();
        _;
    }
}