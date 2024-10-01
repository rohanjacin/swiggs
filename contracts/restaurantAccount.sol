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
	address public admin;
	address internal restaurantAddress;
	IEntryPoint private immutable entryPointAA;

	constructor (address _admin, address _owner, IEntryPoint _entryPointAA) {

		console.log("\nIn constructor of RestaurantAccount");
		console.log("_owner:", _owner);
		console.log("_admin:", _admin);

		owner = _owner; // Contract _owner
		admin = _admin; // admin
		entryPointAA = _entryPointAA; // Entry point contract for AA
		restaurantAddress = address(0); 
		console.log("Restaurant owner address:", owner);
	}

    event Executed(PackedUserOperation userOp, bytes innerCallRet);

	// Fallback function 
	receive () external payable {

		// TODO: do we need this? What if the owner wants
		// to topup the reward kitty?
		console.log("Fallback:", msg.value);
		console.log("New balance:", address(this).balance);
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

    	missingAccountFunds; // unused
    	console.log("\n\nvalidateUserOp");
    	// validate the signature
        validationData = _validateSignature(userOp, userOpHash);
        _validateNonce(userOp.nonce);

        // TODO: validate the retaurant contract as destination??

        // TODO: validate the calldata signature (check if possible)
        bytes4 _sel = bytes4(userOp.callData[0:4]);
        require(_validateSelector(_sel), "Not a valid selector");

        // Validate restaurant contract is linked
        address _target = abi.decode(userOp.callData[4:36], (address));
        console.log("_target:", _target);
        if (restaurantAddress == address(0)) {
        	require(_linkToRestaurant(_target), "Restaurant not linked");
        } 
    }

    // Check if userop outer call is executeUserOp (internal function)
	function _validateSelector(bytes4 _selector) internal pure returns (bool ret) {

		ret = false;

		if (this.executeUserOp.selector == _selector) {
			ret = true;
		}
							
        return ret;
    }

    // Check if restaurant contract has us as owner
    function _linkToRestaurant(address __target) internal returns (bool) {
        
        console.log("in _isLinked");
        bool ret = false;

        if (__target != address(0)) {
			assembly {
				if iszero(extcodesize(__target)) {
					revert(0, 0)
				}
			}

			console.log("In middle");
			(address _owner, , , , , ) = IRestaurant(__target).getInfo();
			console.log("_owner:", _owner);
			console.log("address(this):", address(this));

			if(_owner == address(this)) {
				ret = true;
				restaurantAddress = __target;
			}
        }

        return ret;	
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
            bool success;
            (address target, bytes memory data) = abi.decode(innerCall, (address, bytes));
            console.log("target:", target);
            console.log("restaurantAddress:", restaurantAddress);

            (bytes4 _sig, uint256 _orderId, uint256 _value) = abi.decode(data, (bytes4, uint256, uint256));
				console.log("_orderId:", _orderId);
				console.log("_value:", _value);

            require(target == restaurantAddress, "inner call failed");

            console.log("before this.balance:", address(this).balance);
		
/*			if(_sig == IRestaurant.depositReward.selector) {
				console.log("deposit function parsing");
            	(uint256 _orderId, uint256 _value) = abi.decode(innerCall[36:], (uint256, uint256));
	            (success, innerCallRet) = target.call{value: _value}(data);
			}
			else {
*/	            (success, innerCallRet) = target.call(data);				
			//}

            console.log("after this.balance:", address(this).balance);
            require(success, "inner call failed");
        }

        emit Executed(userOp, innerCallRet);
    }

    modifier onlyOwner {
        if (msg.sender != owner) revert();
        _;
    }    

    modifier onlyAdmin {
        if (msg.sender != owner) revert("Not Admin");
        _;
    }

    modifier onlyOwnerOrEntryPoint {
        if ((msg.sender != owner) && (msg.sender != address(entryPointAA))) revert();
        _;
    }
}