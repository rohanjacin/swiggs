const ethers = require("hardhat").ethers;
const ethjs_util = require("ethereumjs-util");

class UserOperation {

	constructor(sender, nonce, initCode, callData, paymaster) {
	  this.sender = sender; //string
	  this.nonce = nonce; //BigNumber
	  this.initCode = "" + initCode; //bytes
	  //console.log("initCode:", this.initCode);
	  this.callData = callData; //bytes
	  this.paymaster = paymaster; //string
	  this.signature = 0; //bytes
	  this.callGasLimit = 100000;
	  this.verificationGasLimit = 500000;
	  this.preVerificationGas = '0x5208';//21000;
	  this.maxFeePerGas = 1;
	  this.maxPriorityFeePerGas = 10000;
	  this.paymasterData = '0x';
	  this.paymasterVerificationGasLimit = 300000;
	  this.paymasterPostOpGasLimit = 200000;
	  this.accountGasLimits = 0;
	  this.gasFees = 0;
	  this.paymasterAndData = 0;
	}
}

UserOperation.prototype.packUserOp = async function () {
	const accountGasLimits = ethers.concat([
		ethers.zeroPadValue(ethers.toBeHex(this.verificationGasLimit), 16),
		ethers.zeroPadValue(ethers.toBeHex(this.callGasLimit), 16)]);

	const gasFees = ethers.concat([
		ethers.zeroPadValue(ethers.toBeHex(this.maxPriorityFeePerGas), 16),
		ethers.zeroPadValue(ethers.toBeHex(this.maxFeePerGas), 16)]);

	const paymasterAndData = ethers.concat([this.paymaster,
		ethers.zeroPadValue(ethers.toBeHex(this.paymasterVerificationGasLimit), 16),
		ethers.zeroPadValue(ethers.toBeHex(this.paymasterPostOpGasLimit), 16)]);

	this.accountGasLimits = accountGasLimits;
	this.gasFees = gasFees;
	this.paymasterAndData = paymasterAndData;
} 

UserOperation.prototype.encodeUserOp = function(forSignature) {
  this.packUserOp();
  if (forSignature) {

    return ethers.AbiCoder.defaultAbiCoder().encode(
      ['address', 'uint256', 'bytes32', 'bytes32',
        'bytes32', 'uint256', 'bytes32', 'bytes32'],
      [this.sender, this.nonce, ethers.keccak256(this.initCode),
      	ethers.keccak256(this.callData), this.accountGasLimits,
      	this.preVerificationGas, this.gasFees,
        ethers.keccak256(this.paymasterAndData)]);
  } else {
    // for the purpose of calculating gas cost encode also signature (and no keccak of bytes)
    return ethers.AbiCoder.defaultAbiCoder().encode(
      ['address', 'uint256', 'bytes', 'bytes',
        'bytes32', 'uint256', 'bytes32', 'bytes', 'bytes'],
      [this.sender, this.nonce, this.initCode, this.callData,
        this.accountGasLimits, this.preVerificationGas, this.gasFees,
        this.paymasterAndData, this.signature])
  }
}

UserOperation.prototype.getUserOpHash = function(entryPoint, chainId) {
  const userOpHash = ethers.keccak256(this.encodeUserOp(true));
  console.log("userOpHash:", userOpHash);
  const enc = ethers.AbiCoder.defaultAbiCoder().encode(
    ['bytes32', 'address', 'uint256'],
    [userOpHash, entryPoint, chainId])
  return ethers.keccak256(enc)
}

UserOperation.prototype.signUserOp = function(signer, entryPoint, chainId) {
  const message = this.getUserOpHash(entryPoint, chainId)
  console.log("message:", message);
  const msg1 = Buffer.concat([
    Buffer.from('\x19Ethereum Signed Message:\n32', 'ascii'),
    Buffer.from(ethers.getBytes(message))
  ])

  console.log("msg1:", msg1);
  console.log("ethers.keccak256(msg1):", Buffer.from(ethers.keccak256(msg1)));
  console.log("signer.privateKey", Buffer.from(ethers.getBytes(signer.privateKey)));

  const sig = ethjs_util.ecsign(Buffer.from(ethers.keccak256(msg1).slice('0x'.length), 'hex'),
  				Buffer.from(ethers.getBytes(signer.privateKey)))
  // that's equivalent of:  await signer.signMessage(message);
  // (but without "async"
  const signedMessage1 = ethjs_util.toRpcSig(sig.v, sig.r, sig.s)
  console.log("signedMessage1:", signedMessage1);
  return signedMessage1;
}

UserOperation.prototype.format = function() {
	console.log("CALLDATA:", this.callData);
	return {
		sender: this.sender,
		nonce: this.nonce,
		initCode: this.initCode,
		callData: this.callData,
		accountGasLimits: this.accountGasLimits,
		preVerificationGas: this.preVerificationGas,
		gasFees: this.gasFees,
		paymasterAndData: this.paymasterAndData,
		signature: this.signature
	}
}

module.exports = UserOperation;