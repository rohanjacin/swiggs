//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

interface IRestaurantAccount {

    // Link the restaurant contract on owner registration
    function linkRestaurant(address _restaurantAddress)
        external payable returns(bool);
}