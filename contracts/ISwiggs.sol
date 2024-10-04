//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

interface ISwiggs {

    // Validate restuarant account and enable operations
    function enableOperations(uint256 restaurantId, 
        address restaurantOwner, address sessionKey)
        external returns (bool success);
}