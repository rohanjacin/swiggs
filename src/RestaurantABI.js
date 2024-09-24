const ABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "escrowAt",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "ownerAddress",
          "type": "address"
        }
      ],
      "name": "RestaurantOwnerRegistered",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "depositReward",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getInfo",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "uuid",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "fssai",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "url",
              "type": "string"
            },
            {
              "internalType": "address payable",
              "name": "escrowAddress",
              "type": "address"
            }
          ],
          "internalType": "struct RestaurantInfo",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "id",
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
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        },
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        },
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "name": "onERC1155BatchReceived",
      "outputs": [
        {
          "internalType": "bytes4",
          "name": "",
          "type": "bytes4"
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
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "name": "onERC1155Received",
      "outputs": [
        {
          "internalType": "bytes4",
          "name": "",
          "type": "bytes4"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_uuid",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_fssai",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_url",
          "type": "string"
        },
        {
          "internalType": "address payable",
          "name": "_escrowAddress",
          "type": "address"
        }
      ],
      "name": "registerOwner",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "startOperations",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "stopOperations",
      "outputs": [],
      "stateMutability": "nonpayable",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "orderId",
          "type": "uint256"
        }
      ],
      "name": "withdrawReward",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
];

const BYTECODE = "0x60806040523480156200001157600080fd5b50604051620015b8380380620015b88339810160408190526200003491620001e7565b6000829055600180546001600160a01b0319166001600160a01b03831617905560408051808201909152601081526f2932b9ba30bab930b73a1024b734ba1d60811b60208201526200008790836200010f565b6040805180820190915260118152702932b9ba30bab930b73a1027bbb732b91d60791b6020820152600154620000c791906001600160a01b031662000160565b60408051808201909152601c81527f52657374617572616e7420636f6e747261637420616464726573733a00000000602082015262000107903062000160565b5050620002be565b6200015c8282604051602401620001289291906200026e565b60408051601f198184030181529190526020810180516001600160e01b03908116632d839cb360e21b17909152620001ad16565b5050565b6200015c82826040516024016200017992919062000292565b60408051601f198184030181529190526020810180516001600160e01b0390811663319af33360e01b17909152620001ad16565b620001c381620001c660201b62000a901760201c565b50565b60006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b60008060408385031215620001fb57600080fd5b825160208401519092506001600160a01b03811681146200021b57600080fd5b809150509250929050565b6000815180845260005b818110156200024e5760208185018101518683018201520162000230565b506000602082860101526020601f19601f83011685010191505092915050565b60408152600062000283604083018562000226565b90508260208301529392505050565b604081526000620002a7604083018562000226565b905060018060a01b03831660208301529392505050565b6112ea80620002ce6000396000f3fe6080604052600436106100bc5760003560e01c80638da5cb5b11610074578063bc197c811161004e578063bc197c81146101ed578063d428d9d614610263578063f23a6e611461027657600080fd5b80638da5cb5b14610162578063af640d0f146101b4578063bb8b911d146101d857600080fd5b8063523a3f08116100a5578063523a3f081461010b5780635a9b0b891461012b57806374b5af571461014d57600080fd5b806301ffc9a7146100c157806334ed9630146100f6575b600080fd5b3480156100cd57600080fd5b506100e16100dc366004610be7565b6102bb565b60405190151581526020015b60405180910390f35b610109610104366004610d46565b610354565b005b34801561011757600080fd5b50610109610126366004610dc9565b610521565b34801561013757600080fd5b50610140610658565b6040516100ed9190610e46565b34801561015957600080fd5b50610109610821565b34801561016e57600080fd5b5060015461018f9073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100ed565b3480156101c057600080fd5b506101ca60005481565b6040519081526020016100ed565b3480156101e457600080fd5b506101096108cc565b3480156101f957600080fd5b50610232610208366004610f5a565b7fbc197c810000000000000000000000000000000000000000000000000000000095945050505050565b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681526020016100ed565b610109610271366004611008565b61095c565b34801561028257600080fd5b5061023261029136600461102a565b7ff23a6e610000000000000000000000000000000000000000000000000000000095945050505050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f4e2312e000000000000000000000000000000000000000000000000000000000148061034e57507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b60015473ffffffffffffffffffffffffffffffffffffffff16331461037857600080fd5b6103b76040518060400160405280601181526020017f496e2072656769737465724f776e65723a00000000000000000000000000000081525086610ab1565b6103f86040518060400160405280601481526020017f496e2072656769737465724f776e65722069643a000000000000000000000000815250600054610ab1565b600054851461040657600080fd5b600280547fffffffffffffffffffffffff000000000000000000000000000000000000000016331790556003849055600483905560066104468382611136565b50600780547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff831617905560408051808201909152601481527f7265676973746572204f776e657220646f6e652e00000000000000000000000060208201526104c490610b42565b60025460005460075460405173ffffffffffffffffffffffffffffffffffffffff91821681529216917ff9d8b581050884574a811d04dd733705f89dc2d2bf32b612886d0f1ae8f3acf09060200160405180910390a35050505050565b60025473ffffffffffffffffffffffffffffffffffffffff16331461054557600080fd5b6105836040518060400160405280601381526020017f496e2077697468647261775265776172642e2e00000000000000000000000000815250610b42565b6007546040517fe63697c80000000000000000000000000000000000000000000000000000000081526004810183905233602482015260646044820181905273ffffffffffffffffffffffffffffffffffffffff90921691829163e63697c89101600060405180830381600087803b1580156105fe57600080fd5b505af1158015610612573d6000803e3d6000fd5b505050506106546040518060400160405280601281526020017f5265776172642077697468647261776e2e2e0000000000000000000000000000815250610b42565b5050565b6106bd6040518060c00160405280600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600081526020016000815260200160608152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b60015473ffffffffffffffffffffffffffffffffffffffff1633146106e157600080fd5b6107226040518060400160405280601681526020017f47657474696e672072657374617572616e742069643a00000000000000000000815250600054610ab1565b6040805160c0810182526002805473ffffffffffffffffffffffffffffffffffffffff16825260035460208301526004549282019290925260055460608201526006805491929160808401919061077890611093565b80601f01602080910402602001604051908101604052809291908181526020018280546107a490611093565b80156107f15780601f106107c6576101008083540402835291602001916107f1565b820191906000526020600020905b8154815290600101906020018083116107d457829003601f168201915b50505091835250506005919091015473ffffffffffffffffffffffffffffffffffffffff16602090910152905090565b60025473ffffffffffffffffffffffffffffffffffffffff16331461084557600080fd5b60075473ffffffffffffffffffffffffffffffffffffffff16803b61086957600080fd5b8073ffffffffffffffffffffffffffffffffffffffff1663b8bc835c6040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156108b157600080fd5b505af11580156108c5573d6000803e3d6000fd5b5050505050565b60025473ffffffffffffffffffffffffffffffffffffffff1633146108f057600080fd5b60075473ffffffffffffffffffffffffffffffffffffffff16803b61091457600080fd5b8073ffffffffffffffffffffffffffffffffffffffff16634debb5a86040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156108b157600080fd5b60025473ffffffffffffffffffffffffffffffffffffffff16331461098057600080fd5b6109be6040518060400160405280601281526020017f496e206465706f7369745265776172642e2e0000000000000000000000000000815250610b42565b6007546040517fe2bbb158000000000000000000000000000000000000000000000000000000008152600481018490526024810183905273ffffffffffffffffffffffffffffffffffffffff90911690819063e2bbb1589034906044016000604051808303818588803b158015610a3457600080fd5b505af1158015610a48573d6000803e3d6000fd5b5050505050610a8b6040518060400160405280601281526020017f526577617264206465706f73697465642e2e0000000000000000000000000000815250610b42565b505050565b60006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b6106548282604051602401610ac7929190611250565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fb60e72cc00000000000000000000000000000000000000000000000000000000179052610bd4565b610bd181604051602401610b569190611272565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f41304fac00000000000000000000000000000000000000000000000000000000179052610bd4565b50565b610bd181610a90565b610be5611285565b565b600060208284031215610bf957600080fd5b81357fffffffff0000000000000000000000000000000000000000000000000000000081168114610c2957600080fd5b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715610ca657610ca6610c30565b604052919050565b600067ffffffffffffffff831115610cc857610cc8610c30565b610cf960207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f86011601610c5f565b9050828152838383011115610d0d57600080fd5b828260208301376000602084830101529392505050565b73ffffffffffffffffffffffffffffffffffffffff81168114610bd157600080fd5b600080600080600060a08688031215610d5e57600080fd5b853594506020860135935060408601359250606086013567ffffffffffffffff811115610d8a57600080fd5b8601601f81018813610d9b57600080fd5b610daa88823560208401610cae565b9250506080860135610dbb81610d24565b809150509295509295909350565b600060208284031215610ddb57600080fd5b5035919050565b6000815180845260005b81811015610e0857602081850181015186830182015201610dec565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b60208152600073ffffffffffffffffffffffffffffffffffffffff808451166020840152602084015160408401526040840151606084015260608401516080840152608084015160c060a0850152610ea160e0850182610de2565b90508160a08601511660c0850152809250505092915050565b600082601f830112610ecb57600080fd5b8135602067ffffffffffffffff821115610ee757610ee7610c30565b8160051b610ef6828201610c5f565b9283528481018201928281019087851115610f1057600080fd5b83870192505b84831015610f2f57823582529183019190830190610f16565b979650505050505050565b600082601f830112610f4b57600080fd5b610c2983833560208501610cae565b600080600080600060a08688031215610f7257600080fd5b8535610f7d81610d24565b94506020860135610f8d81610d24565b9350604086013567ffffffffffffffff80821115610faa57600080fd5b610fb689838a01610eba565b94506060880135915080821115610fcc57600080fd5b610fd889838a01610eba565b93506080880135915080821115610fee57600080fd5b50610ffb88828901610f3a565b9150509295509295909350565b6000806040838503121561101b57600080fd5b50508035926020909101359150565b600080600080600060a0868803121561104257600080fd5b853561104d81610d24565b9450602086013561105d81610d24565b93506040860135925060608601359150608086013567ffffffffffffffff81111561108757600080fd5b610ffb88828901610f3a565b600181811c908216806110a757607f821691505b6020821081036110e0577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b601f821115610a8b576000816000526020600020601f850160051c8101602086101561110f5750805b601f850160051c820191505b8181101561112e5782815560010161111b565b505050505050565b815167ffffffffffffffff81111561115057611150610c30565b6111648161115e8454611093565b846110e6565b602080601f8311600181146111b757600084156111815750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b17855561112e565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b82811015611204578886015182559484019460019091019084016111e5565b508582101561124057878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b01905550565b6040815260006112636040830185610de2565b90508260208301529392505050565b602081526000610c296020830184610de2565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052605160045260246000fdfea2646970667358221220c78b6d39cf2488f8ba753cf7fbd7c6a90ab9764359768658c549bbea27c26ede64736f6c63430008180033";

module.exports = {
  ABI: ABI,
  BYTECODE: BYTECODE
}