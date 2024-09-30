//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@account-abstraction/contracts/interfaces/IEntryPoint.sol";
import "@account-abstraction/contracts/core/BasePaymaster.sol";
import "@account-abstraction/contracts/core/Helpers.sol";

import "./restaurant.sol";
import "./restaurantEscrow.sol";
import "hardhat/console.sol";

// Main Contract
// Paymaster config taken from account-abstraction/contracts/samples/TokenPaymaster.sol

contract SwiggsPaymaster is BasePaymaster {

    using UserOperationLib for PackedUserOperation;

    event UserOperationSponsored(address indexed user, uint256 actualChargeNative, uint256 actualGasCost);

    event Received(address indexed sender, uint256 value);

    uint256 private constant COST_OF_POST = 40000;

    /// @notice Initializes the TokenPaymaster contract with the given parameters.
    /// @param _entryPoint The EntryPoint contract used in the Account Abstraction infrastructure.
    /// @param _owner The address that will be set as the owner of the contract.
    constructor(
        IEntryPoint _entryPoint,
        address _owner
    )
    BasePaymaster(
    _entryPoint
    )
    {
        transferOwnership(_owner);
    }

    /// @notice Allows the contract owner to withdraw a specified amount of tokens from the contract.
    /// @param to The address to transfer the tokens to.
    /// @param amount The amount of tokens to transfer.
    function withdrawToken(address to, uint256 amount) external onlyOwner {
        //SafeERC20.safeTransfer(token, to, amount);
    }

    /// @notice Validates a paymaster user operation and calculates the required 
    /// native token amount for the transaction.
    /// @param userOp The user operation data.
    /// @param requiredPreFund The maximum cost (in native token) the paymaster has to prefund.
    /// @return context The context containing the native token amount and user sender address (if applicable).
    /// @return validationResult A uint256 value indicating the result of the validation (always 0 in this implementation).
    function _validatePaymasterUserOp(PackedUserOperation calldata userOp, bytes32 userOpHash, uint256 requiredPreFund)
    internal override view
    returns (bytes memory context, uint256 validationResult) {unchecked {
            // calculated cost of the postOp

            userOpHash; // unused
            console.log("In swiggs _validatePaymasterUserOp:", requiredPreFund);
            uint256 maxFeePerGas = userOp.unpackMaxFeePerGas();
            console.log("maxFeePerGas:", maxFeePerGas);
            uint256 totalPreFund  = requiredPreFund + (COST_OF_POST * maxFeePerGas);
            console.log("totalPreFund:", totalPreFund);
            console.log("address(this).balance:", address(this).balance);

            //require (address(this).balance > totalPreFund, "Paymaster balance too low");
            console.log("after return");
            //TODO: Check this again
            //entryPoint.depositTo{value: totalPreFund}(address(this));
            console.log("after deposit");

            context = abi.encode(totalPreFund, userOp.sender);
            console.log("context:");
            validationResult = _packValidationData(
                false,
                0,
                0
            );
            //console.log("validationResult:", validationResult);
        }
    }

    /// @notice Performs post-operation tasks, refunding excess native tokens.
    /// @dev This function is called after a user operation has been executed or reverted.
    /// @param context The context containing the token amount and user sender address.
    /// @param actualGasCost The actual gas cost of the transaction.
    /// @param actualUserOpFeePerGas - the gas price this UserOp pays. This value is based on the UserOp's maxFeePerGas
    //      and maxPriorityFee (and basefee)
    //      It is not the same as tx.gasprice, which is what the bundler pays.
    function _postOp(PostOpMode _mode, bytes calldata context, uint256 actualGasCost, uint256 actualUserOpFeePerGas) internal override {
        console.log("In swiggs _postOp:actualGasCost:", actualGasCost);
        console.log("_actualUserOpFeePerGas:", actualUserOpFeePerGas);

        _mode; // unused
        unchecked {
            (
                uint256 preCharge,
                address userOpSender
            ) = abi.decode(context, (uint256, address));

            console.log("preCharge:", preCharge);
            console.log("userOpSender:", userOpSender);

            // Refund tokens based on actual gas cost
            uint256 actualChargeNative = actualGasCost + COST_OF_POST * actualUserOpFeePerGas;
            console.log("actualChargeNative:", actualChargeNative);

            if (preCharge > actualChargeNative) {
                console.log("preCharge>:");

                // If the initially provided amount is greater than the actual amount needed, refund the difference
                //payable(userOpSender).transfer(preCharge - actualChargeNative);

            } else if (preCharge < actualChargeNative) {

                console.log("preCharge<:");
                // Attempt to cover Paymaster's gas expenses by withdrawing the 'overdraft' from the client
                // If the transfer reverts also revert the 'postOp' to remove the incentive to cheat
            }

            emit UserOperationSponsored(userOpSender, actualChargeNative, actualGasCost);
            //refillEntryPointDeposit(_cachedPrice);
        }
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
    
    // Deposits eth required to pay for userop gas
    function depositEth() external payable onlyOwner {
        entryPoint.depositTo{value: msg.value}(address(this));
    }

    // Fetches balance deposit
    function getBalance() external view onlyOwner returns(uint256) {
        return entryPoint.balanceOf(address(this));
    }

    // Withdraw deposited eth  
    function withdrawEth(address payable recipient, uint256 amount) external onlyOwner {
        entryPoint.withdrawTo(recipient, amount);
    }

}