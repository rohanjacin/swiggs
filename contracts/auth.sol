//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@account-abstraction/contracts/core/NonceManager.sol";
import "./IRestaurantAccount.sol";
import { WebAuthn } from "./WebAuthn.sol";

struct AuthCredentials {
	uint256 challenge; // Challenge
	uint256 x; // Public key (x component)
	uint256 y; // Public key (y component)
	uint256 originHash;
	bool valid;
}

// Authorization for adding restaurant accounts
// and session keys
contract Auth is NonceManager {

	address internal admin;
	string name; 

	// Auth credentials (id => AuthCredentials)
	// TODO: free slot once auth is complete
	mapping (uint256 => AuthCredentials) credentials;

	constructor(string memory _name, address _admin) {
		admin = _admin;
		name = _name;
	}

	// Validate account request event
	event validateAccountRequest(uint256 id, address restaurant,
								 address restaurantAccount);

	// Account already exists
	event accountAlreadyExists(uint256 id);

	// Register WebAuthn request event
	event registerAccountRequest(string name, 
					uint256 challenge, uint256 id);

	// Creates account credentials
	function createAccount(uint256 id, address owner)
		external {

		// Check if challenge already exists
		require(credentials[id].challenge == 0, "id-challenge already exists");

		// Create a challenge of id and owner
		// TODO: create here or end of function, check security
		// TODO: Use HOTP in StatusIM message of the account
		//       to verify Out of band and then later prove 
		//       in verifyAccount  
		uint256 _challenge = uint256(keccak256(abi.encodePacked(id, owner)));
		credentials[id].challenge = _challenge;
		address addr = msg.sender;

		// Check if restaurant account is linked to restaurant contract
		assembly {
			if iszero(extcodesize(addr)) {
				revert(0, 0)
			}
		}

		// TODO: static call?
		address restaurant = IRestaurantAccount(addr).getRestaurant();
		require(restaurant != address(0), "Restaurant not linked");

		// Origin hash
		// TODO: move above contract function call?
		credentials[id].originHash = uint256(keccak256(
			abi.encodePacked(name, restaurant)));

		// Check if id already exists
		bool idExists = IRestaurantAccount(addr).accountExists(id);

		if (idExists == true) {
			// Send account already exists event
			// Owner needs to delete and add again with new nonce
			emit accountAlreadyExists(id);
		}

		// Request account validation
		emit validateAccountRequest(id, restaurant, addr);
	}

	// Verify account creation 
	function verifyAccount(/*AccountProof proof,*/ uint256 id)
		external onlyAdmin {

		// Verify account proof

		// Perform Webauthn registration ceremony
		// to create credentials for id
		emit registerAccountRequest(name, credentials[id].challenge, id);
	}

	// Accept the Webauthn register reponse, confirm the id and
	// challenge and then store the public key of the credential 
	function acceptAccountResponse(uint256 id, bytes memory challenge,
		bool requireUV, WebAuthn.WebAuthnAuth memory webAuthnAuth,
		uint256 x, uint256 y) external onlyAdmin {

		// Check for id
		require(id != 0, "Id is zero");

		// Check for corresponding challenge
		// TODO: Make sure challenge <= 32 bytes
		require(credentials[id].challenge == uint256(bytes32(challenge)), 
			"Challenge not existance");

		// Store the public key
		credentials[id].x = x;
		credentials[id].y = y;

		// Verify signature
		credentials[id].valid = WebAuthn.verify(challenge, requireUV,
			webAuthnAuth, credentials[id].x, credentials[id].x);

		// Store new account credentials in restaurant account
		address addr = msg.sender;
		assembly {
			if iszero(extcodesize(addr)) {
				revert(0, 0)
			}
		}
		require(IRestaurantAccount(addr).addAccount(
			id, credentials[id].x, credentials[id].y), "Account not added");
	}

    modifier onlyAdmin {
        if (msg.sender != admin) revert("Not Admin");
        _;
    }

}