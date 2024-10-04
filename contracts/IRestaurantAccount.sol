//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

interface IRestaurantAccount {

    // Link to restaurant contract
    function linkToRestaurant(address _restaurantAddress) external;

    // Session key added by Swiggs on operations start
    function addSessionKey(address sessionKey) external returns (bool);    
}