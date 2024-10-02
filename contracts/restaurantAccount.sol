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

		console.log("RestaurantAccount");
		console.log("owner:", _owner);
		console.log("admin:", _admin);

		owner = _owner; // Contract _owner
		admin = _admin; // admin
		entryPointAA = _entryPointAA; // Entry point contract for AA
		restaurantAddress = address(0); 
	}

    event Executed(PackedUserOperation userOp, bytes innerCallRet);

	// Fallback function 
	receive () external payable {

		// TODO: do we need this? What if the owner wants
		// to topup the reward kitty?
		console.log("Fallback:", msg.value);
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
    }

    // Check if userop outer call is executeUserOp (internal function)
	function _validateSelector(bytes4 _selector) internal pure returns (bool ret) {

		ret = false;

		if (this.executeUserOp.selector == _selector) {
			ret = true;
		}
							
        return ret;
    }

    // Link to restaurant contract
    function linkToRestaurant(address _restaurantAddress)
    	external onlyAdmin {
        
        require(_restaurantAddress != address(0), "Not a valid restaurant address");

        // Check if restaurant contract exists
		assembly {
			if iszero(extcodesize(_restaurantAddress)) {
				revert(0, 0)
			}
		}

		// Fetch restaurant info to verify owner's account point to us
		// TODO: Check for security vunerabilities, use staticall ? 
		(address _owner, , , , , ) = IRestaurant(_restaurantAddress).getInfo();

		require(_owner == address(this), "Restaurant owner's address not ours");
		
		restaurantAddress = _restaurantAddress;
    }

    // Proxy for restaurant#functions
    function executeUserOp(PackedUserOperation calldata userOp, bytes32 /*userOpHash*/)
    	external onlyOwnerOrEntryPoint() onlyIfLinked() {

        // read from the userOp.callData, but skip the "magic" prefix (executeUserOp sig),
        // which caused it to call this method.
        bytes calldata innerCall = userOp.callData[4 :];
        bytes memory innerCallRet;

        if (innerCall.length > 0) {
            bool success;
           
            (address target, bytes memory data) = abi.decode(innerCall,
            										(address, bytes));
            
            require(target == restaurantAddress, "Userop target invalid");
            
            bytes4 sel;

            assembly {
            	// loads 32 bytes of inner call selector into sel
            	// skips the first 32 bytes of offset data
            	sel := mload(add(data, 32))
            }

            if(sel == IRestaurant.depositReward.selector) {
            	uint256 orderId;
            	uint256 value;

            	//depositReward(uint256, uint256)
            	assembly {
            		// loads the 32 bytes of the inner call function 1st argument
            		// skips the first 32 bytes of offset data
            		// plus the 4 byte selector data
            		orderId := mload(add(data, 36))

            		// loads the 32 bytes of the inner call function 2nd argument
            		// skips the first 32 bytes of offset data
            		// plus the 4 byte selector data
            		value := mload(add(data, 68))
            	}

            	(success, innerCallRet) = target.call{value: value}(data);
            }
			else {
	            (success, innerCallRet) = target.call(data);				
			}		

            require(success, "Userop target execution not successfull");
        }

        emit Executed(userOp, innerCallRet);
    }

    modifier onlyOwner {
        if (msg.sender != owner) revert();
        _;
    }    

    modifier onlyAdmin {
        if (msg.sender != admin) revert("Not Admin");
        _;
    }

    modifier onlyOwnerOrEntryPoint {
        if ((msg.sender != owner) && 
        	(msg.sender != address(entryPointAA))) revert();
        _;
    }

    modifier onlyIfLinked {
        if (restaurantAddress == address(0)) revert("Restaurant not linked");
        _;
    }    
}