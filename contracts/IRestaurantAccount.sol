//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

interface IRestaurantAccount {

    // Link to restaurant contract
    function linkToRestaurant(address _restaurantAddress) external;

    // Fetches restaurant address if linked
    function getRestaurant() external returns(address restaurant);

    // Add validated account 
    function addAccount(uint256 id, uint256 x, uint256 y) 
        external returns (bool);

    // Remove account 
    function removeAccount(uint256 id) external returns (bool);
    
    // Check if account is present     
    function accountExists(uint256 id) external returns (bool);
}