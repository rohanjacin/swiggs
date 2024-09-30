const ABI = [
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        },
        {
          "internalType": "bytes",
          "name": "ret",
          "type": "bytes"
        }
      ],
      "name": "DelegateAndRevert",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "opIndex",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "reason",
          "type": "string"
        }
      ],
      "name": "FailedOp",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "opIndex",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "reason",
          "type": "string"
        },
        {
          "internalType": "bytes",
          "name": "inner",
          "type": "bytes"
        }
      ],
      "name": "FailedOpWithRevert",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "returnData",
          "type": "bytes"
        }
      ],
      "name": "PostOpReverted",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ReentrancyGuardReentrantCall",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "SenderAddressResult",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "aggregator",
          "type": "address"
        }
      ],
      "name": "SignatureValidationFailed",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "userOpHash",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "factory",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "paymaster",
          "type": "address"
        }
      ],
      "name": "AccountDeployed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "BeforeExecution",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalDeposit",
          "type": "uint256"
        }
      ],
      "name": "Deposited",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "userOpHash",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "nonce",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "revertReason",
          "type": "bytes"
        }
      ],
      "name": "PostOpRevertReason",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "aggregator",
          "type": "address"
        }
      ],
      "name": "SignatureAggregatorChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalStaked",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "unstakeDelaySec",
          "type": "uint256"
        }
      ],
      "name": "StakeLocked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "withdrawTime",
          "type": "uint256"
        }
      ],
      "name": "StakeUnlocked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "withdrawAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "StakeWithdrawn",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "userOpHash",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "paymaster",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "nonce",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "success",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "actualGasCost",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "actualGasUsed",
          "type": "uint256"
        }
      ],
      "name": "UserOperationEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "userOpHash",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "nonce",
          "type": "uint256"
        }
      ],
      "name": "UserOperationPrefundTooLow",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "userOpHash",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "nonce",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bytes",
          "name": "revertReason",
          "type": "bytes"
        }
      ],
      "name": "UserOperationRevertReason",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "withdrawAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdrawn",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "unstakeDelaySec",
          "type": "uint32"
        }
      ],
      "name": "addStake",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "target",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "delegateAndRevert",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "depositTo",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "deposits",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "deposit",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "staked",
          "type": "bool"
        },
        {
          "internalType": "uint112",
          "name": "stake",
          "type": "uint112"
        },
        {
          "internalType": "uint32",
          "name": "unstakeDelaySec",
          "type": "uint32"
        },
        {
          "internalType": "uint48",
          "name": "withdrawTime",
          "type": "uint48"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getDepositInfo",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "deposit",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "staked",
              "type": "bool"
            },
            {
              "internalType": "uint112",
              "name": "stake",
              "type": "uint112"
            },
            {
              "internalType": "uint32",
              "name": "unstakeDelaySec",
              "type": "uint32"
            },
            {
              "internalType": "uint48",
              "name": "withdrawTime",
              "type": "uint48"
            }
          ],
          "internalType": "struct IStakeManager.DepositInfo",
          "name": "info",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint192",
          "name": "key",
          "type": "uint192"
        }
      ],
      "name": "getNonce",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "nonce",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "initCode",
          "type": "bytes"
        }
      ],
      "name": "getSenderAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "nonce",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "initCode",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "callData",
              "type": "bytes"
            },
            {
              "internalType": "bytes32",
              "name": "accountGasLimits",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "preVerificationGas",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "gasFees",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "paymasterAndData",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "signature",
              "type": "bytes"
            }
          ],
          "internalType": "struct PackedUserOperation",
          "name": "userOp",
          "type": "tuple"
        }
      ],
      "name": "getUserOpHash",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "sender",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "nonce",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes",
                  "name": "initCode",
                  "type": "bytes"
                },
                {
                  "internalType": "bytes",
                  "name": "callData",
                  "type": "bytes"
                },
                {
                  "internalType": "bytes32",
                  "name": "accountGasLimits",
                  "type": "bytes32"
                },
                {
                  "internalType": "uint256",
                  "name": "preVerificationGas",
                  "type": "uint256"
                },
                {
                  "internalType": "bytes32",
                  "name": "gasFees",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes",
                  "name": "paymasterAndData",
                  "type": "bytes"
                },
                {
                  "internalType": "bytes",
                  "name": "signature",
                  "type": "bytes"
                }
              ],
              "internalType": "struct PackedUserOperation[]",
              "name": "userOps",
              "type": "tuple[]"
            },
            {
              "internalType": "contract IAggregator",
              "name": "aggregator",
              "type": "address"
            },
            {
              "internalType": "bytes",
              "name": "signature",
              "type": "bytes"
            }
          ],
          "internalType": "struct IEntryPoint.UserOpsPerAggregator[]",
          "name": "opsPerAggregator",
          "type": "tuple[]"
        },
        {
          "internalType": "address payable",
          "name": "beneficiary",
          "type": "address"
        }
      ],
      "name": "handleAggregatedOps",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "nonce",
              "type": "uint256"
            },
            {
              "internalType": "bytes",
              "name": "initCode",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "callData",
              "type": "bytes"
            },
            {
              "internalType": "bytes32",
              "name": "accountGasLimits",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "preVerificationGas",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "gasFees",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "paymasterAndData",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "signature",
              "type": "bytes"
            }
          ],
          "internalType": "struct PackedUserOperation[]",
          "name": "ops",
          "type": "tuple[]"
        },
        {
          "internalType": "address payable",
          "name": "beneficiary",
          "type": "address"
        }
      ],
      "name": "handleOps",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint192",
          "name": "key",
          "type": "uint192"
        }
      ],
      "name": "incrementNonce",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "callData",
          "type": "bytes"
        },
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "sender",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "nonce",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "verificationGasLimit",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "callGasLimit",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "paymasterVerificationGasLimit",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "paymasterPostOpGasLimit",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "preVerificationGas",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "paymaster",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "maxFeePerGas",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "maxPriorityFeePerGas",
                  "type": "uint256"
                }
              ],
              "internalType": "struct EntryPoint.MemoryUserOp",
              "name": "mUserOp",
              "type": "tuple"
            },
            {
              "internalType": "bytes32",
              "name": "userOpHash",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "prefund",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "contextOffset",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "preOpGas",
              "type": "uint256"
            }
          ],
          "internalType": "struct EntryPoint.UserOpInfo",
          "name": "opInfo",
          "type": "tuple"
        },
        {
          "internalType": "bytes",
          "name": "context",
          "type": "bytes"
        }
      ],
      "name": "innerHandleOp",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "actualGasCost",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint192",
          "name": "",
          "type": "uint192"
        }
      ],
      "name": "nonceSequenceNumber",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unlockStake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "withdrawAddress",
          "type": "address"
        }
      ],
      "name": "withdrawStake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "withdrawAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "withdrawAmount",
          "type": "uint256"
        }
      ],
      "name": "withdrawTo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ];

const BYTECODE = "0x60a0604052604051620000129062000055565b604051809103906000f0801580156200002f573d6000803e3d6000fd5b506001600160a01b03166080523480156200004957600080fd5b50600160025562000063565b610233806200523e83390190565b6080516151b862000086600039600081816114d30152613d9801526151b86000f3fe60806040526004361061012c5760003560e01c806370a08231116100a5578063b760faf911610074578063c23a5cea11610059578063c23a5cea146104fe578063dbed18e01461051e578063fc7e286d1461053e57600080fd5b8063b760faf9146104d6578063bb9fe6bf146104e957600080fd5b806370a0823114610433578063765e827f14610476578063850aaf62146104965780639b249f69146104b657600080fd5b80631b2e01b8116100fc57806322cdde4c116100e157806322cdde4c1461022f57806335567e1a1461024f5780635287ce12146102e457600080fd5b80631b2e01b8146101d7578063205c28781461020f57600080fd5b806242dc531461014157806301ffc9a7146101745780630396cb60146101a45780630bd28e3b146101b757600080fd5b3661013c5761013a33610610565b005b600080fd5b34801561014d57600080fd5b5061016161015c366004614425565b610672565b6040519081526020015b60405180910390f35b34801561018057600080fd5b5061019461018f3660046144e5565b610a32565b604051901515815260200161016b565b61013a6101b2366004614527565b610baf565b3480156101c357600080fd5b5061013a6101d2366004614575565b610f45565b3480156101e357600080fd5b506101616101f2366004614590565b600160209081526000928352604080842090915290825290205481565b34801561021b57600080fd5b5061013a61022a3660046145c5565b610f8d565b34801561023b57600080fd5b5061016161024a3660046145f1565b611137565b34801561025b57600080fd5b5061016161026a366004614590565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260016020908152604080832077ffffffffffffffffffffffffffffffffffffffffffffffff8516845290915290819020549082901b7fffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000161792915050565b3480156102f057600080fd5b506103d16102ff36600461462d565b6040805160a0810182526000808252602082018190529181018290526060810182905260808101919091525073ffffffffffffffffffffffffffffffffffffffff1660009081526020818152604091829020825160a0810184528154815260019091015460ff811615159282019290925261010082046dffffffffffffffffffffffffffff16928101929092526f01000000000000000000000000000000810463ffffffff166060830152730100000000000000000000000000000000000000900465ffffffffffff16608082015290565b60405161016b9190600060a082019050825182526020830151151560208301526dffffffffffffffffffffffffffff604084015116604083015263ffffffff606084015116606083015265ffffffffffff608084015116608083015292915050565b34801561043f57600080fd5b5061016161044e36600461462d565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b34801561048257600080fd5b5061013a61049136600461468f565b611179565b3480156104a257600080fd5b5061013a6104b13660046146e6565b6113ee565b3480156104c257600080fd5b5061013a6104d136600461473b565b611493565b61013a6104e436600461462d565b610610565b3480156104f557600080fd5b5061013a61159a565b34801561050a57600080fd5b5061013a61051936600461462d565b611772565b34801561052a57600080fd5b5061013a61053936600461468f565b611a5f565b34801561054a57600080fd5b506105c661055936600461462d565b6000602081905290815260409020805460019091015460ff81169061010081046dffffffffffffffffffffffffffff16906f01000000000000000000000000000000810463ffffffff1690730100000000000000000000000000000000000000900465ffffffffffff1685565b6040805195865293151560208601526dffffffffffffffffffffffffffff9092169284019290925263ffffffff909116606083015265ffffffffffff16608082015260a00161016b565b600061061c8234611f0b565b90508173ffffffffffffffffffffffffffffffffffffffff167f2da466a7b24304f47e87fa2e1e5a81b9831ce54fec19055ce277ca2f39ba42c48260405161066691815260200190565b60405180910390a25050565b6000805a90506106b66040518060400160405280600d81526020017f696e6e657248616e646c654f7000000000000000000000000000000000000000815250611f4b565b333014610724576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f4141393220696e7465726e616c2063616c6c206f6e6c7900000000000000000060448201526064015b60405180910390fd5b8451606081015160408051808201909152600d81527f63616c6c4761734c696d69743a0000000000000000000000000000000000000060208201526107699082611fdd565b6127108260a0015182010160405a603f02816107875761078761477d565b0410156107f6576107cc6040518060400160405280600781526020017f6c6f7720312e3100000000000000000000000000000000000000000000000000815250611f4b565b7fdeaddead0000000000000000000000000000000000000000000000000000000060005260206000fd5b6108346040518060400160405280601081526020017f696e6e657248616e646c654f70312e3100000000000000000000000000000000815250611f4b565b875160009015610957576108816040518060400160405280601181526020017f6265666f726520657865632063616c6c3a0000000000000000000000000000008152508460000151612072565b6000610894846000015160008c86612103565b90506108d56040518060400160405280600881526020017f737563636573733a0000000000000000000000000000000000000000000000008152508261211b565b806109555760006108e76108006121ac565b80519091501561094f57846000015173ffffffffffffffffffffffffffffffffffffffff168a602001517f1c4fada7374c0a9ee8841fc38afe82932dc0f8e69012e927f061a8bae611a20187602001518460405161094692919061481a565b60405180910390a35b60019250505b505b6109956040518060400160405280600381526020017f312e350000000000000000000000000000000000000000000000000000000000815250611f4b565b600088608001515a86030190506109e16040518060400160405280600a81526020017f61637475616c6761733a0000000000000000000000000000000000000000000081525082611fdd565b610a24828a8a8a8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508792506121d8915050565b9a9950505050505050505050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f60fc6b6e000000000000000000000000000000000000000000000000000000001480610ac557507fffffffff0000000000000000000000000000000000000000000000000000000082167f915074d800000000000000000000000000000000000000000000000000000000145b80610b1157507fffffffff0000000000000000000000000000000000000000000000000000000082167fcf28ef9700000000000000000000000000000000000000000000000000000000145b80610b5d57507fffffffff0000000000000000000000000000000000000000000000000000000082167f3e84f02100000000000000000000000000000000000000000000000000000000145b80610ba957507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b33600090815260208190526040902063ffffffff8216610c2b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f6d757374207370656369667920756e7374616b652064656c6179000000000000604482015260640161071b565b600181015463ffffffff6f0100000000000000000000000000000090910481169083161015610cb6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f63616e6e6f7420646563726561736520756e7374616b652074696d6500000000604482015260640161071b565b6001810154600090610cde90349061010090046dffffffffffffffffffffffffffff16614862565b905060008111610d4a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f6e6f207374616b65207370656369666965640000000000000000000000000000604482015260640161071b565b6dffffffffffffffffffffffffffff811115610dc2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f7374616b65206f766572666c6f77000000000000000000000000000000000000604482015260640161071b565b6040805160a08101825283548152600160208083018281526dffffffffffffffffffffffffffff86811685870190815263ffffffff8a811660608801818152600060808a0181815233808352828a52918c90209a518b55965199909801805494519151965165ffffffffffff16730100000000000000000000000000000000000000027fffffffffffffff000000000000ffffffffffffffffffffffffffffffffffffff979094166f0100000000000000000000000000000002969096167fffffffffffffff00000000000000000000ffffffffffffffffffffffffffffff91909516610100027fffffffffffffffffffffffffffffffffff0000000000000000000000000000ff991515999099167fffffffffffffffffffffffffffffffffff00000000000000000000000000000090941693909317979097179190911691909117179055835185815290810192909252917fa5ae833d0bb1dcd632d98a8b70973e8516812898e19bf27b70071ebc8dc52c01910160405180910390a2505050565b33600090815260016020908152604080832077ffffffffffffffffffffffffffffffffffffffffffffffff851684529091528120805491610f8583614875565b919050555050565b3360009081526020819052604090208054821115611007576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f576974686472617720616d6f756e7420746f6f206c6172676500000000000000604482015260640161071b565b80546110149083906148ad565b81556040805173ffffffffffffffffffffffffffffffffffffffff851681526020810184905233917fd1c19fbcd4551a5edfb66d43d2e337c04837afda3482b42bdf569a8fccdae5fb910160405180910390a260008373ffffffffffffffffffffffffffffffffffffffff168360405160006040518083038185875af1925050503d80600081146110c1576040519150601f19603f3d011682016040523d82523d6000602084013e6110c6565b606091505b5050905080611131576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f6661696c656420746f2077697468647261770000000000000000000000000000604482015260640161071b565b50505050565b600061114282612704565b6040805160208101929092523090820152466060820152608001604051602081830303815290604052805190602001209050919050565b61118161271d565b8160008167ffffffffffffffff81111561119d5761119d6141c1565b6040519080825280602002602001820160405280156111d657816020015b6111c361410f565b8152602001906001900390816111bb5790505b5090506112176040518060400160405280600c81526020017f496e2068616e646c654f70730000000000000000000000000000000000000000815250611f4b565b60005b828110156112cb576000828281518110611236576112366148c0565b60200260200101519050600080611271848a8a87818110611259576112596148c0565b905060200281019061126b91906148ef565b8561275e565b915091506112b36040518060400160405280600881526020017f484f50533a312e31000000000000000000000000000000000000000000000000815250611f4b565b6112c08483836000612a3a565b50505060010161121a565b50600061130c6040518060400160405280600f81526020017f4265666f7265457865637574696f6e0000000000000000000000000000000000815250611f4b565b6040517fbb47ee3e183a558b1a2ff0874b079f3fc5478b7454eacf2bfc5af2ff5878f97290600090a160005b838110156113935761138781888884818110611356576113566148c0565b905060200281019061136891906148ef565b85848151811061137a5761137a6148c0565b6020026020010151612c8f565b90910190600101611338565b506113d26040518060400160405280601181526020017f6265666f726520636f6d70656e73617465000000000000000000000000000000815250611f4b565b6113dc8482613217565b5050506113e96001600255565b505050565b6000808473ffffffffffffffffffffffffffffffffffffffff16848460405161141892919061492d565b600060405180830381855af49150503d8060008114611453576040519150601f19603f3d011682016040523d82523d6000602084013e611458565b606091505b509150915081816040517f9941055400000000000000000000000000000000000000000000000000000000815260040161071b92919061493d565b6040517f570e1a3600000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000169063570e1a369061150a90869086906004016149a1565b6020604051808303816000875af1158015611529573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061154d91906149b5565b6040517f6ca7b80600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8216600482015290915060240161071b565b336000908152602081905260408120600181015490916f0100000000000000000000000000000090910463ffffffff169003611632576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f6e6f74207374616b656400000000000000000000000000000000000000000000604482015260640161071b565b600181015460ff166116a0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f616c726561647920756e7374616b696e67000000000000000000000000000000604482015260640161071b565b60018101546000906116cb906f01000000000000000000000000000000900463ffffffff16426149d2565b6001830180547fffffffffffffff000000000000ffffffffffffffffffffffffffffffffffff001673010000000000000000000000000000000000000065ffffffffffff84169081027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169190911790915560405190815290915033907ffa9b3c14cc825c412c9ed81b3ba365a5b459439403f18829e572ed53a4180f0a90602001610666565b336000908152602081905260409020600181015461010090046dffffffffffffffffffffffffffff1680611802576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f4e6f207374616b6520746f207769746864726177000000000000000000000000604482015260640161071b565b6001820154730100000000000000000000000000000000000000900465ffffffffffff1661188c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f6d7573742063616c6c20756e6c6f636b5374616b652829206669727374000000604482015260640161071b565b60018201544273010000000000000000000000000000000000000090910465ffffffffffff16111561191a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f5374616b65207769746864726177616c206973206e6f74206475650000000000604482015260640161071b565b6001820180547fffffffffffffff000000000000000000000000000000000000000000000000ff1690556040805173ffffffffffffffffffffffffffffffffffffffff851681526020810183905233917fb7c918e0e249f999e965cafeb6c664271b3f4317d296461500e71da39f0cbda3910160405180910390a260008373ffffffffffffffffffffffffffffffffffffffff168260405160006040518083038185875af1925050503d80600081146119ef576040519150601f19603f3d011682016040523d82523d6000602084013e6119f4565b606091505b5050905080611131576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f6661696c656420746f207769746864726177207374616b650000000000000000604482015260640161071b565b611a6761271d565b816000805b82811015611c595736868683818110611a8757611a876148c0565b9050602002810190611a9991906149f8565b9050366000611aa88380614a2c565b90925090506000611abf604085016020860161462d565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff73ffffffffffffffffffffffffffffffffffffffff821601611b60576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f4141393620696e76616c69642061676772656761746f72000000000000000000604482015260640161071b565b73ffffffffffffffffffffffffffffffffffffffff811615611c3d5773ffffffffffffffffffffffffffffffffffffffff8116632dd811338484611ba76040890189614a94565b6040518563ffffffff1660e01b8152600401611bc69493929190614c49565b60006040518083038186803b158015611bde57600080fd5b505afa925050508015611bef575060015b611c3d576040517f86a9f75000000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8216600482015260240161071b565b611c478287614862565b95505060019093019250611a6c915050565b5060008167ffffffffffffffff811115611c7557611c756141c1565b604051908082528060200260200182016040528015611cae57816020015b611c9b61410f565b815260200190600190039081611c935790505b5090506000805b84811015611d8b5736888883818110611cd057611cd06148c0565b9050602002810190611ce291906149f8565b9050366000611cf18380614a2c565b90925090506000611d08604085016020860161462d565b90508160005b81811015611d79576000898981518110611d2a57611d2a6148c0565b60200260200101519050600080611d4d8b898987818110611259576112596148c0565b91509150611d5d84838389612a3a565b8a611d6781614875565b9b505060019093019250611d0e915050565b505060019094019350611cb592505050565b506040517fbb47ee3e183a558b1a2ff0874b079f3fc5478b7454eacf2bfc5af2ff5878f97290600090a150600080805b85811015611ec65736898983818110611dd657611dd66148c0565b9050602002810190611de891906149f8565b9050611dfa604082016020830161462d565b73ffffffffffffffffffffffffffffffffffffffff167f575ff3acadd5ab348fe1855e217e0f3678f8d767d7494c9f9fefbee2e17cca4d60405160405180910390a2366000611e498380614a2c565b90925090508060005b81811015611eb557611e9488858584818110611e7057611e706148c0565b9050602002810190611e8291906148ef565b8b8b8151811061137a5761137a6148c0565b611e9e9088614862565b965087611eaa81614875565b985050600101611e52565b505060019093019250611dbb915050565b506040516000907f575ff3acadd5ab348fe1855e217e0f3678f8d767d7494c9f9fefbee2e17cca4d908290a2611efc8682613217565b50505050506113e96001600255565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260208190526040812080548290611f3f908590614862565b91829055509392505050565b611fda81604051602401611f5f9190614d00565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f41304fac0000000000000000000000000000000000000000000000000000000017905261335e565b50565b61206e8282604051602401611ff3929190614d13565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fb60e72cc0000000000000000000000000000000000000000000000000000000017905261335e565b5050565b61206e8282604051602401612088929190614d35565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f319af3330000000000000000000000000000000000000000000000000000000017905261335e565b6000806000845160208601878987f195945050505050565b61206e8282604051602401612131929190614d6d565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fc3b556350000000000000000000000000000000000000000000000000000000017905261335e565b60603d828111156121ba5750815b604051602082018101604052818152816000602083013e9392505050565b6000805a905061221c6040518060400160405280600e81526020017f5f706f7374457865637574696f6e000000000000000000000000000000000000815250611f4b565b84516000908161222b82613367565b60e083015190915073ffffffffffffffffffffffffffffffffffffffff811661225757825193506124a4565b6122966040518060400160405280600c81526020017f7061796d617374657221303a000000000000000000000000000000000000000081525082612072565b8093506000885111156124a45781870295506122e76040518060400160405280600e81526020017f61637475616c476173436f73743a00000000000000000000000000000000000081525087611fdd565b60408051808201909152600581527f6d6f64653a000000000000000000000000000000000000000000000000000000602082015261233a9060028c600281111561233357612333614d91565b141561211b565b60028a600281111561234e5761234e614d91565b146124a4576123966040518060400160405280601881526020017f7061796d6173746572506f73744f704761734c696d69743a00000000000000008152508460a00151611fdd565b60a08301516040517f7c627b2100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff831691637c627b21916123f3908e908d908c908990600401614dc0565b600060405180830381600088803b15801561240d57600080fd5b5087f19350505050801561241f575060015b6124a4576124616040518060400160405280600a81526020017f7265766572746564646400000000000000000000000000000000000000000000815250611f4b565b600061246e6108006121ac565b9050806040517fad7954bc00000000000000000000000000000000000000000000000000000000815260040161071b9190614d00565b5a8503870196506124ea6040518060400160405280600481526020017f312e363a0000000000000000000000000000000000000000000000000000000081525088611fdd565b60a0830151606084015160808b0151910190880380821115612515576064600a828403020498909801975b5050818702955061255b6040518060400160405280601281526020017f312e372061637475616c476173436f73743a000000000000000000000000000081525087611fdd565b604089015186811015612683576125a66040518060400160405280600381526020017f312e380000000000000000000000000000000000000000000000000000000000815250611f4b565b60028b60028111156125ba576125ba614d91565b0361261b576125fd6040518060400160405280600381526020017f312e390000000000000000000000000000000000000000000000000000000000815250611f4b565b8096506126098a613399565b6126168a6000898b6133f5565b6126f6565b6126596040518060400160405280600381526020017f322e300000000000000000000000000000000000000000000000000000000000815250611f4b565b7fdeadaa510000000000000000000000000000000000000000000000000000000060005260206000fd5b6126c16040518060400160405280600381526020017f322e310000000000000000000000000000000000000000000000000000000000815250611f4b565b8681036126ce8682611f0b565b506000808d60028111156126e4576126e4614d91565b1490506126f38c828b8d6133f5565b50505b505050505050949350505050565b600061270f8261347d565b805190602001209050919050565b6002805403612758576040517f3ee5aeb500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60028055565b60008060005a90506127a56040518060400160405280600781526020017f7072654761733a0000000000000000000000000000000000000000000000000081525082611fdd565b83516127b18682613542565b6127ba86611137565b6020860152604081015161012082015161010083015160a08401516080850151606086015160c0870151861717171717176effffffffffffffffffffffffffffff811115612864576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f41413934206761732076616c756573206f766572666c6f770000000000000000604482015260640161071b565b60006128938460c081015160a08201516080830151606084015160408501516101009095015194010101010290565b90506128d46040518060400160405280601081526020017f726571756972656450726546756e643a0000000000000000000000000000000081525082611fdd565b6128e18a8a8a848761368d565b96506128f5846000015185602001516138ce565b61296457896040517f220266b600000000000000000000000000000000000000000000000000000000815260040161071b918152604060208201819052601a908201527f4141323520696e76616c6964206163636f756e74206e6f6e6365000000000000606082015260800190565b825a860311156129d957896040517f220266b600000000000000000000000000000000000000000000000000000000815260040161071b918152604060208201819052601e908201527f41413236206f76657220766572696669636174696f6e4761734c696d69740000606082015260800190565b60e084015160609073ffffffffffffffffffffffffffffffffffffffff1615612a0d57612a088b8b8b85613929565b975090505b604089018290528060608a015260a08a01355a870301896080018181525050505050505050935093915050565b600080612a4685613bf3565b915091508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614612ae857856040517f220266b600000000000000000000000000000000000000000000000000000000815260040161071b9181526040602082018190526014908201527f41413234207369676e6174757265206572726f72000000000000000000000000606082015260800190565b8015612b5957856040517f220266b600000000000000000000000000000000000000000000000000000000815260040161071b9181526040602082018190526017908201527f414132322065787069726564206f72206e6f7420647565000000000000000000606082015260800190565b6000612b6485613bf3565b9250905073ffffffffffffffffffffffffffffffffffffffff811615612bef57866040517f220266b600000000000000000000000000000000000000000000000000000000815260040161071b9181526040602082018190526014908201527f41413334207369676e6174757265206572726f72000000000000000000000000606082015260800190565b8115612c8657866040517f220266b600000000000000000000000000000000000000000000000000000000815260040161071b9181526040602082018190526021908201527f41413332207061796d61737465722065787069726564206f72206e6f7420647560608201527f6500000000000000000000000000000000000000000000000000000000000000608082015260a00190565b50505050505050565b6000805a9050612cd36040518060400160405280600b81526020017f4578656320557365724f70000000000000000000000000000000000000000000815250611f4b565b6000612ce0846060015190565b6040519091506000903682612cf860608a018a614a94565b9150915060606000826003811115612d0f57843591505b50612d4e6040518060400160405280600981526020017f6d6574686f645369670000000000000000000000000000000000000000000000815250611f4b565b7f72288ed1000000000000000000000000000000000000000000000000000000007fffffffff00000000000000000000000000000000000000000000000000000000821601612e8d5760008b8b60200151604051602401612db0929190614e23565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f8dd7712f000000000000000000000000000000000000000000000000000000001790525190915030906242dc5390612e439084908f908d90602401614efa565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050925050612f42565b612ecb6040518060400160405280601481526020017f6265666f726520696e6e657248616e646c654f70000000000000000000000000815250611f4b565b3073ffffffffffffffffffffffffffffffffffffffff166242dc5385858d8b604051602401612efd9493929190614f3a565b604051602081830303815290604052915060e01b6020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505091505b602060008351602085016000305af1955060005198508460405250505050508061320d5760003d80602003612f7d5760206000803e60005191505b507fdeaddead00000000000000000000000000000000000000000000000000000000810361301057876040517f220266b600000000000000000000000000000000000000000000000000000000815260040161071b918152604060208201819052600f908201527f41413935206f7574206f66206761730000000000000000000000000000000000606082015260800190565b7fdeadaa510000000000000000000000000000000000000000000000000000000081036130b657600086608001515a61304990876148ad565b6130539190614862565b6040808901518151808301909252601882527f494e4e45525f5245564552545f4c4f575f50524546554e440000000000000000602083015291925061309790611f4b565b6130a088613399565b6130ad88600083856133f5565b955061320b9050565b6130f46040518060400160405280600481526020017f456c736500000000000000000000000000000000000000000000000000000000815250611f4b565b8551805160208089015192015173ffffffffffffffffffffffffffffffffffffffff90911691907ff62676f440ff169a3a9afdbf812e89e7f95975ee8e5c31214ffdef631c5f4792906131486108006121ac565b60405161315692919061481a565b60405180910390a3600086608001515a61317090876148ad565b61317a9190614862565b90506131bb6040518060400160405280600b81526020017f6161637475616c4761733a00000000000000000000000000000000000000000081525082611fdd565b6131c860028886846121d8565b95506132096040518060400160405280600c81526020017f616161637475616c4761733a000000000000000000000000000000000000000081525082611fdd565b505b505b5050509392505050565b73ffffffffffffffffffffffffffffffffffffffff8216613294576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f4141393020696e76616c69642062656e65666963696172790000000000000000604482015260640161071b565b60008273ffffffffffffffffffffffffffffffffffffffff168260405160006040518083038185875af1925050503d80600081146132ee576040519150601f19603f3d011682016040523d82523d6000602084013e6132f3565b606091505b50509050806113e9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f41413931206661696c65642073656e6420746f2062656e656669636961727900604482015260640161071b565b611fda81613c46565b61010081015161012082015160009190808203613385575092915050565b61339182488301613c67565b949350505050565b805180516020808401519281015160405190815273ffffffffffffffffffffffffffffffffffffffff90921692917f67b4fa9642f42120bf031f3051d1824b0fe25627945b27b8a6a65d5761d5482e910160405180910390a350565b835160e0810151815160208088015193015160405173ffffffffffffffffffffffffffffffffffffffff9384169492909316927f49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f9161346f9189908990899093845291151560208401526040830152606082015260800190565b60405180910390a450505050565b606081356020830135600061349d6134986040870187614a94565b613c7f565b905060006134b16134986060880188614a94565b9050608086013560a087013560c088013560006134d461349860e08c018c614a94565b6040805173ffffffffffffffffffffffffffffffffffffffff9a909a1660208b015289810198909852606089019690965250608087019390935260a086019190915260c085015260e08401526101008084019190915281518084039091018152610120909201905292915050565b61354f602083018361462d565b73ffffffffffffffffffffffffffffffffffffffff168152602082810135908201526fffffffffffffffffffffffffffffffff6080808401358281166060850152811c604084015260a084013560c0808501919091528401359182166101008401521c6101208201523660006135c860e0850185614a94565b9092509050801561367257603481101561363e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f4141393320696e76616c6964207061796d6173746572416e6444617461000000604482015260640161071b565b6136488282613c92565b60a0860152608085015273ffffffffffffffffffffffffffffffffffffffff1660e0840152611131565b600060e084018190526080840181905260a084015250505050565b82518051600091906136ac88876136a760408b018b614a94565b613d03565b60e0820151600073ffffffffffffffffffffffffffffffffffffffff821661370a5773ffffffffffffffffffffffffffffffffffffffff831660009081526020819052604090205487811161370357808803613706565b60005b9150505b60208801516040517f19822f7c00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8516916319822f7c918991613766918e91908790600401614f71565b60206040518083038160008887f1935050505080156137c0575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682019092526137bd91810190614f96565b60015b61380457896137d06108006121ac565b6040517f65c8fd4d00000000000000000000000000000000000000000000000000000000815260040161071b929190614faf565b945073ffffffffffffffffffffffffffffffffffffffff82166138c15773ffffffffffffffffffffffffffffffffffffffff831660009081526020819052604090208054808911156138bb578b6040517f220266b600000000000000000000000000000000000000000000000000000000815260040161071b9181526040602082018190526017908201527f41413231206469646e2774207061792070726566756e64000000000000000000606082015260800190565b88900390555b5050505095945050505050565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260016020908152604080832084821c808552925282208054849167ffffffffffffffff831691908561391b83614875565b909155501495945050505050565b60606000805a855160e081015173ffffffffffffffffffffffffffffffffffffffff8116600090815260208190526040902080549394509192909190878110156139d8578a6040517f220266b600000000000000000000000000000000000000000000000000000000815260040161071b918152604060208201819052601e908201527f41413331207061796d6173746572206465706f73697420746f6f206c6f770000606082015260800190565b8781038255608084015160408051808201909152600a81527f7061796d61737465723a000000000000000000000000000000000000000000006020820152613a209085612072565b613a5f6040518060400160405280601781526020017f706d566572696669636174696f6e4761734c696d69743a00000000000000000081525082611fdd565b8373ffffffffffffffffffffffffffffffffffffffff166352b7512c828d8d602001518d6040518563ffffffff1660e01b8152600401613aa193929190614f71565b60006040518083038160008887f193505050508015613b0057506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052613afd9190810190614ffc565b60015b613b44578b613b106108006121ac565b6040517f65c8fd4d00000000000000000000000000000000000000000000000000000000815260040161071b92919061507d565b9098509650805a87031115613be4578b6040517f220266b600000000000000000000000000000000000000000000000000000000815260040161071b9181526040602082018190526027908201527f41413336206f766572207061796d6173746572566572696669636174696f6e4760608201527f61734c696d697400000000000000000000000000000000000000000000000000608082015260a00190565b50505050505094509492505050565b60008082600003613c0957506000928392509050565b6000613c1484614091565b9050806040015165ffffffffffff16421180613c3b5750806020015165ffffffffffff1642105b905194909350915050565b60006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b6000818310613c765781613c78565b825b9392505050565b6000604051828085833790209392505050565b60008080613ca360148286886150ca565b613cac916150f4565b60601c613cbd6024601487896150ca565b613cc69161513c565b60801c613cd760346024888a6150ca565b613ce09161513c565b9194506fffffffffffffffffffffffffffffffff16925060801c90509250925092565b80156111315782515173ffffffffffffffffffffffffffffffffffffffff81163b15613d9457846040517f220266b600000000000000000000000000000000000000000000000000000000815260040161071b918152604060208201819052601f908201527f414131302073656e64657220616c726561647920636f6e737472756374656400606082015260800190565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663570e1a3686600001516040015186866040518463ffffffff1660e01b8152600401613dfa9291906149a1565b60206040518083038160008887f1158015613e19573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190613e3e91906149b5565b905073ffffffffffffffffffffffffffffffffffffffff8116613ec657856040517f220266b600000000000000000000000000000000000000000000000000000000815260040161071b918152604060208201819052601b908201527f4141313320696e6974436f6465206661696c6564206f72204f4f470000000000606082015260800190565b8173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614613f6357856040517f220266b600000000000000000000000000000000000000000000000000000000815260040161071b91815260406020808301829052908201527f4141313420696e6974436f6465206d7573742072657475726e2073656e646572606082015260800190565b8073ffffffffffffffffffffffffffffffffffffffff163b600003613fec57856040517f220266b600000000000000000000000000000000000000000000000000000000815260040161071b91815260406020808301829052908201527f4141313520696e6974436f6465206d757374206372656174652073656e646572606082015260800190565b6000613ffb60148286886150ca565b614004916150f4565b60601c90508273ffffffffffffffffffffffffffffffffffffffff1686602001517fd51a9c61267aa6196961883ecf5ff2da6619c37dac0fa92122513fb32c032d2d83896000015160e0015160405161408092919073ffffffffffffffffffffffffffffffffffffffff92831681529116602082015260400190565b60405180910390a350505050505050565b60408051606081018252600080825260208201819052918101919091528160a081901c65ffffffffffff81166000036140cd575065ffffffffffff5b6040805160608101825273ffffffffffffffffffffffffffffffffffffffff909316835260d09490941c602083015265ffffffffffff16928101929092525090565b6040518060a0016040528061419c604051806101400160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600081525090565b8152602001600080191681526020016000815260200160008152602001600081525090565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405160a0810167ffffffffffffffff81118282101715614213576142136141c1565b60405290565b604051610140810167ffffffffffffffff81118282101715614213576142136141c1565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715614284576142846141c1565b604052919050565b600067ffffffffffffffff8211156142a6576142a66141c1565b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b73ffffffffffffffffffffffffffffffffffffffff81168114611fda57600080fd5b80356142ff816142d2565b919050565b60008183036101c081121561431857600080fd5b6143206141f0565b91506101408082121561433257600080fd5b61433a614219565b9150614345846142f4565b82526020840135602083015260408401356040830152606084013560608301526080840135608083015260a084013560a083015260c084013560c083015261438f60e085016142f4565b60e0830152610100848101359083015261012080850135908301529082528201356020820152610160820135604082015261018082013560608201526101a0909101356080820152919050565b60008083601f8401126143ee57600080fd5b50813567ffffffffffffffff81111561440657600080fd5b60208301915083602082850101111561441e57600080fd5b9250929050565b600080600080610200858703121561443c57600080fd5b843567ffffffffffffffff8082111561445457600080fd5b818701915087601f83011261446857600080fd5b813561447b6144768261428c565b61423d565b81815289602083860101111561449057600080fd5b8160208501602083013760006020838301015280975050506144b58860208901614304565b94506101e08701359150808211156144cc57600080fd5b506144d9878288016143dc565b95989497509550505050565b6000602082840312156144f757600080fd5b81357fffffffff0000000000000000000000000000000000000000000000000000000081168114613c7857600080fd5b60006020828403121561453957600080fd5b813563ffffffff81168114613c7857600080fd5b803577ffffffffffffffffffffffffffffffffffffffffffffffff811681146142ff57600080fd5b60006020828403121561458757600080fd5b613c788261454d565b600080604083850312156145a357600080fd5b82356145ae816142d2565b91506145bc6020840161454d565b90509250929050565b600080604083850312156145d857600080fd5b82356145e3816142d2565b946020939093013593505050565b60006020828403121561460357600080fd5b813567ffffffffffffffff81111561461a57600080fd5b82016101208185031215613c7857600080fd5b60006020828403121561463f57600080fd5b8135613c78816142d2565b60008083601f84011261465c57600080fd5b50813567ffffffffffffffff81111561467457600080fd5b6020830191508360208260051b850101111561441e57600080fd5b6000806000604084860312156146a457600080fd5b833567ffffffffffffffff8111156146bb57600080fd5b6146c78682870161464a565b90945092505060208401356146db816142d2565b809150509250925092565b6000806000604084860312156146fb57600080fd5b8335614706816142d2565b9250602084013567ffffffffffffffff81111561472257600080fd5b61472e868287016143dc565b9497909650939450505050565b6000806020838503121561474e57600080fd5b823567ffffffffffffffff81111561476557600080fd5b614771858286016143dc565b90969095509350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60005b838110156147c75781810151838201526020016147af565b50506000910152565b600081518084526147e88160208601602086016147ac565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b82815260406020820152600061339160408301846147d0565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b80820180821115610ba957610ba9614833565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036148a6576148a6614833565b5060010190565b81810381811115610ba957610ba9614833565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600082357ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffee183360301811261492357600080fd5b9190910192915050565b8183823760009101908152919050565b821515815260406020820152600061339160408301846147d0565b8183528181602085013750600060208284010152600060207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116840101905092915050565b602081526000613391602083018486614958565b6000602082840312156149c757600080fd5b8151613c78816142d2565b65ffffffffffff8181168382160190808211156149f1576149f1614833565b5092915050565b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa183360301811261492357600080fd5b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112614a6157600080fd5b83018035915067ffffffffffffffff821115614a7c57600080fd5b6020019150600581901b360382131561441e57600080fd5b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112614ac957600080fd5b83018035915067ffffffffffffffff821115614ae457600080fd5b60200191503681900382131561441e57600080fd5b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112614b2e57600080fd5b830160208101925035905067ffffffffffffffff811115614b4e57600080fd5b80360382131561441e57600080fd5b6000610120614b8984614b6f856142f4565b73ffffffffffffffffffffffffffffffffffffffff169052565b60208301356020850152614ba06040840184614af9565b826040870152614bb38387018284614958565b92505050614bc46060840184614af9565b8583036060870152614bd7838284614958565b925050506080830135608085015260a083013560a085015260c083013560c0850152614c0660e0840184614af9565b85830360e0870152614c19838284614958565b92505050610100614c2c81850185614af9565b86840383880152614c3e848284614958565b979650505050505050565b6040808252810184905260006060600586901b830181019083018783805b89811015614ce9577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa087860301845282357ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffee18c3603018112614cc7578283fd5b614cd3868d8301614b5d565b9550506020938401939290920191600101614c67565b505050508281036020840152614c3e818587614958565b602081526000613c7860208301846147d0565b604081526000614d2660408301856147d0565b90508260208301529392505050565b604081526000614d4860408301856147d0565b905073ffffffffffffffffffffffffffffffffffffffff831660208301529392505050565b604081526000614d8060408301856147d0565b905082151560208301529392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600060038610614df9577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b85825260806020830152614e1060808301866147d0565b6040830194909452506060015292915050565b604081526000614d266040830185614b5d565b8051805173ffffffffffffffffffffffffffffffffffffffff1683526020810151602084015260408101516040840152606081015160608401526080810151608084015260a081015160a084015260c081015160c084015260e0810151614eb560e085018273ffffffffffffffffffffffffffffffffffffffff169052565b5061010081810151908401526101209081015190830152602081015161014083015260408101516101608301526060810151610180830152608001516101a090910152565b6000610200808352614f0e818401876147d0565b9050614f1d6020840186614e36565b8281036101e0840152614f3081856147d0565b9695505050505050565b6000610200808352614f4f8184018789614958565b9050614f5e6020840186614e36565b8281036101e0840152614c3e81856147d0565b606081526000614f846060830186614b5d565b60208301949094525060400152919050565b600060208284031215614fa857600080fd5b5051919050565b82815260606020820152600d60608201527f4141323320726576657274656400000000000000000000000000000000000000608082015260a06040820152600061339160a08301846147d0565b6000806040838503121561500f57600080fd5b825167ffffffffffffffff81111561502657600080fd5b8301601f8101851361503757600080fd5b80516150456144768261428c565b81815286602083850101111561505a57600080fd5b61506b8260208301602086016147ac565b60209590950151949694955050505050565b82815260606020820152600d60608201527f4141333320726576657274656400000000000000000000000000000000000000608082015260a06040820152600061339160a08301846147d0565b600080858511156150da57600080fd5b838611156150e757600080fd5b5050820193919092039150565b7fffffffffffffffffffffffffffffffffffffffff00000000000000000000000081358181169160148510156151345780818660140360031b1b83161692505b505092915050565b7fffffffffffffffffffffffffffffffff0000000000000000000000000000000081358181169160108510156151345760109490940360031b84901b169092169291505056fea26469706673582212209d842c7b124a9ee0755abe4fe9b61d6e378b61d844bbf6d53330f21541dab34664736f6c63430008180033608060405234801561001057600080fd5b50610213806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063570e1a3614610030575b600080fd5b61004361003e3660046100f9565b61006c565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b60008061007c601482858761016b565b61008591610195565b60601c90506000610099846014818861016b565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092018290525084519495509360209350849250905082850182875af190506000519350806100f057600093505b50505092915050565b6000806020838503121561010c57600080fd5b823567ffffffffffffffff8082111561012457600080fd5b818501915085601f83011261013857600080fd5b81358181111561014757600080fd5b86602082850101111561015957600080fd5b60209290920196919550909350505050565b6000808585111561017b57600080fd5b8386111561018857600080fd5b5050820193919092039150565b7fffffffffffffffffffffffffffffffffffffffff00000000000000000000000081358181169160148510156101d55780818660140360031b1b83161692505b50509291505056fea26469706673582212201f79c4043c26d16a61e28ea42c1bf937bfdf6c50a5a338b4ffdcdda509de4ede64736f6c63430008180033";

module.exports = {
  ABI: ABI,
  BYTECODE: BYTECODE
}
