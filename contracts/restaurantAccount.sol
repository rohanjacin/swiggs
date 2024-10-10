//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@account-abstraction/contracts/core/BaseAccount.sol";
import "@account-abstraction/contracts/interfaces/IAccountExecute.sol";
import "@account-abstraction/contracts/core/Helpers.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./restaurant.sol";
import "./IRestaurant.sol";
import "hardhat/console.sol";

struct AccountInfo {
    uint256 x; // Public key (x component)
    uint256 y; // Public key (y component)
    uint256 key; // Session key
}

// Main Contract
contract RestaurantAccount is BaseAccount, IAccountExecute {

	address public owner;
	address public admin;
	address internal restaurantAddress;
	IEntryPoint private immutable entryPointAA;
    address constant internal SWIGGS_ADDRESS = address(
        0x5FbDB2315678afecb367f032d93F642f64180aa3);    
    address constant internal AUTH_ADDRESS = address(
        0x5FbDB2315678afecb367f032d93F642f64180aa3);    

    mapping (uint256 => AccountInfo) accounts;
    address internal ownerSessionKey;

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

		// Validate signature in userOp, first with owner's wallet
        // second with owner's session key
        address key = ECDSA.recover(hash, userOp.signature);
        console.log("KEY:", key);
		if((owner != key) && (ownerSessionKey != key)) {
			return SIG_VALIDATION_FAILED;
        }	
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

    // Fetches restaurant address if linked
    function getRestaurant() external view onlyAuth returns(address restaurant) {
        
        if(restaurantAddress != address(0))
            restaurant = restaurantAddress;
        else
            restaurant = address(0);
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

        // TODO: Check if restaurant contract hash has not changed

		// Fetch restaurant info to verify owner's account point to us
		// TODO: Check for security vunerabilities, use staticall ? 
		(address _owner, , , , , ) = IRestaurant(_restaurantAddress).getInfo();

		require(_owner == address(this), "Restaurant owner's address not ours");
		
		restaurantAddress = _restaurantAddress;
    }

    // Register staff account with StatusIM chat key
    function registerAccount(bytes memory chatkey) 
        external payable onlyOwner {

/*        // Credential ID is status chat key
        string memory id = Base64.encode(chatkey);
        // Challenge is hash of chatkey 
        bytes32 challenge = keccak256(abi.encodePacked(
                                        info.owner, id));*/
        //createAccount()
    }    

    // Add validated account 
    function addAccount(uint256 id, uint256 x, uint256 y) 
        external onlyAuth returns (bool) {

        accounts[id].x = x;
        accounts[id].y = y;

        return true;
    }

    // Check if account is present 
    function accountExists(uint256 id) 
        external view onlyAuthOrAdminOrOwner returns (bool) {

        if ((accounts[id].x != 0) &&
           (accounts[id].y != 0)) {
            return true;
        }

        return false;
    }

    // Remove account 
    function removeAccount(uint256 id) 
        external onlyOwner returns (bool) {

        // TODO: Very important: Delete slot in mapping
        accounts[id].x = 0;
        accounts[id].y = 0;

        return true;
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

    modifier onlyAuth {
        if (msg.sender != AUTH_ADDRESS) revert("Not Auth contract");
        _;
    }

    modifier onlyAuthOrAdminOrOwner {
        if ((msg.sender != AUTH_ADDRESS) &&
            (msg.sender != admin) &&
            (msg.sender != owner)) revert("Not Auth contract");
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

    modifier onlyRestaurant () {
        if (msg.sender != restaurantAddress) revert("Not restaurant");
        _;
    }

    modifier onlySwiggs {
        if (msg.sender != SWIGGS_ADDRESS) revert("Not Swiggs");
        _;
    }
}