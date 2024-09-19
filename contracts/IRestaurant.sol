//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

interface IRestaurant {

    // Fetches restuaurant information
    function getInfo() external view returns(address owner,
        uint256 uuid, uint256 fssai, uint256 id,
        string memory url, address payable escrowAddress);

    // Register restaurant details (other than restaurant id)
    function registerOwner(uint256 _id, uint256 _uuid,
        uint256 _fssai, string memory _url,
        address payable _escrowAddress) external payable;

    // Start operations by enabling rewards
    function startOperations() external;

    // Stop or halt operations by disabling rewards
    function stopOperations() external;

    // Deposit order's reward amount in the escrow account  
    function depositReward(uint256 orderId, uint256 value) external payable;

    // Withdraw order's reward amount in the escrow account  
    function withdrawReward(uint256 orderId) external;        
}