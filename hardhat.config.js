require("@nomicfoundation/hardhat-toolbox");
require("hardhat-contract-sizer");

const optimizedComilerSettings = {
  version: '0.8.23',
  settings: {
    optimizer: { enabled: true, runs: 1000000 },
    viaIR: true
  }
}
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {

    compilers: [{
      version: '0.8.24',
      settings: {
        optimizer: {enabled: true, runs: 1000000}
      }
    }],

    path: {
      sources: ["./contracts"]
    }
  },

  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    }
  }

};
