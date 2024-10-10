const hre = require("hardhat");
const ethers = require("ethers");
const UserOp = require("./userOp.js");
const RESTAURANT = require("./RestaurantABI.js");
const publicKeyToAddress = require('ethereum-public-key-to-address')

const ID = "0x1234";
const UUID = "0x23848320";
const FSSAI = "0x20139847";
const URL = "https://thrive.restaurantId.com/api/restaurant/{id}.json";

class RestaurantInfo {
	constructor(id, uuid, fssai, url, escrowAddress) {
		this.id = id;
		this.uuid = uuid;
		this.fssai = fssai;
		this.url = url;
		this.escrowAddress = escrowAddress;
	}
}

// Swiggs Network Class
class SwiggsNetwork {

	constructor(){
		this.entryPoint = null;
		this.entryPointAddress = null;
		this.sampleRestaurant = null;
		this.owner = null;
		this.admin = null;
		this.info = null;
		this.sessionSigner = null;
		this.signerAddress = null;
		this.nonce = null;		
	}
}

// Connect to the Swiggs network (EntryPoint)
SwiggsNetwork.prototype.connect = async function (_id) {

 	// Connect to Restaurant Account
 	this.restaurantAccount = await hre.ethers.getContractAt(
 		'RestaurantAccount', '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9');
 	console.log(`Attached to SwiggsNetwork via Restaurant Account ID:`, _id);
 	console.log("restaurantAccount:", this.restaurantAccount.target);

 	// Get Restaurant
	this.sampleRestaurant = await hre.ethers.getContractAt(
		'Restaurant', '0x8392709b31b4a83ffe4FD0e5264c0A963aB87eFd');
 	console.log("restaurant contract:", this.sampleRestaurant.target);

	// Get EntryPoint
 	this.entryPointAddress = await this.restaurantAccount.entryPoint();
 	this.entryPoint = await hre.ethers.getContractAt(
 		'IEntryPoint', this.entryPointAddress);
 	console.log("EntryPoint:", this.entryPointAddress);

 	this.paymaster = await hre.ethers.getContractAt(
 		'SwiggsPaymaster', '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0');
 	console.log("paymaster:", this.paymaster.target);

 	// Use first signer as owner
 	let _owner = await hre.ethers.getSigners();
 	this.owner = _owner[2];
 	this.admin = _owner[1];
 	console.log("Owner's address:", this.owner.address);

	const signingKey = new hre.ethers.SigningKey(hre.ethers.id("restaurant-secret"))
	console.log("signingKey.privateKey:", signingKey.privateKey);
	console.log("signingKey.publicKey:", signingKey.publicKey);
	console.log("publicKeyToAddress:", publicKeyToAddress(signingKey.publicKey));

	this.sessionSigner = new hre.ethers.Wallet(signingKey);
	this.signerAddress = await this.sessionSigner.getAddress();
	console.log("sessionSigner.address:", this.signerAddress);
	console.log("sessionSigner.privateKey:", this.sessionSigner.privateKey);

}

// Connect to the Swiggs network (EntryPoint)
SwiggsNetwork.prototype.depositReward = async function () {

	const AbiCoder = new hre.ethers.AbiCoder();
	const execSig = this.restaurantAccount.interface.getFunction('executeUserOp').selector;
	let value = hre.ethers.parseEther('10', 'gwei');

	const depositRewardCall = AbiCoder.encode(['address', 'bytes'],
		[ this.sampleRestaurant.target,
		  this.sampleRestaurant.interface.encodeFunctionData(
		  	"depositReward", ["0x1", value])
		]);
	console.log("encodeFunctionData:", this.sampleRestaurant.interface.encodeFunctionData(
		  	"depositReward", ["0x1", value]));

	console.log("depositRewardCall:", depositRewardCall);
	const cdata = hre.ethers.concat([execSig, depositRewardCall]);
	console.log("cdata:", cdata);

    const accounts = hre.config.networks.hardhat.accounts;
    console.log("accounts:", accounts);
    console.log("path:", accounts.path + "/2");
    const wallet = ethers.HDNodeWallet.fromPhrase(accounts.mnemonic, "", accounts.path + `/2`);    
    console.log("wallet.privateKey:", wallet.privateKey);
    console.log("address:", wallet.address);

	let userOp = new UserOp(this.restaurantAccount.target, 1n, "0x",
		cdata, this.paymaster.target);

	let _signature = userOp.signUserOp(wallet, this.entryPoint.target, 31337);
	userOp.signature = _signature;

    const rcpt = await this.entryPoint.connect(this.owner).handleOps([userOp.format()], this.owner.address, {
      gasLimit: 1e7
    }).catch(e => console.log("Error:", e));
}

// Start operations, creates a new session and grants permission to the escrow account
SwiggsNetwork.prototype.startOperations = async function () {

	const AbiCoder = new hre.ethers.AbiCoder();
	const execSig = this.restaurantAccount.interface.getFunction('executeUserOp').selector;
	let value = hre.ethers.parseEther('10', 'gwei');

	const startOperationsCall = AbiCoder.encode(['address', 'bytes'],
		[ this.sampleRestaurant.target,
		  this.sampleRestaurant.interface.encodeFunctionData(
		  	"startOperations", [this.signerAddress])
		]);

	console.log("encodeFunctionData:", this.sampleRestaurant.interface.encodeFunctionData(
		  	"startOperations", [this.signerAddress]));

	console.log("startOperations:", startOperationsCall);
	const cdata = hre.ethers.concat([execSig, startOperationsCall]);
	console.log("cdata:", cdata);

    const accounts = hre.config.networks.hardhat.accounts;
    console.log("accounts:", accounts);
    console.log("path:", accounts.path + "/2");
    const wallet = ethers.HDNodeWallet.fromPhrase(accounts.mnemonic, "", accounts.path + `/2`);    
    console.log("wallet.privateKey:", wallet.privateKey);
    console.log("address:", wallet.address);

	this.nonce = await this.restaurantAccount.connect(this.owner).getNonce();
	console.log("this.nonce:", this.nonce);
	this.nonce++;

	let userOp = new UserOp(this.restaurantAccount.target, "0x0", "0x",
		cdata, this.paymaster.target);

	let _signature = userOp.signUserOp(wallet, this.entryPoint.target, 31337);
	userOp.signature = _signature;

    const rcpt = await this.entryPoint.connect(this.owner).handleOps([userOp.format()], this.owner.address, {
      gasLimit: 1e7
    }).catch(e => console.log("Error:", e));

}

// Deposits redwards for a paritcular order id
SwiggsNetwork.prototype.depositRewardWithSessionKey = async function () {

	const AbiCoder = new hre.ethers.AbiCoder();
	const execSig = this.restaurantAccount.interface.getFunction('executeUserOp').selector;
	let value = hre.ethers.parseEther('10', 'gwei');

	const despositRewardsCall = AbiCoder.encode(['address', 'bytes'],
		[ this.sampleRestaurant.target,
		  this.sampleRestaurant.interface.encodeFunctionData(
		  	"depositReward", ["0x1", value])
		]);

	console.log("encodeFunctionData:", this.sampleRestaurant.interface.encodeFunctionData(
		  	"depositReward", ["0x1", value]));

	console.log("depositReward:", despositRewardsCall);
	const cdata = hre.ethers.concat([execSig, despositRewardsCall]);
	console.log("cdata:", cdata);

	this.nonce = await this.restaurantAccount.connect(this.owner).getNonce();
	console.log("this.nonce:", this.nonce);
	this.nonce++;

	let userOp = new UserOp(this.restaurantAccount.target, "0x1", "0x",
		cdata, this.paymaster.target);

	let _signature = userOp.signUserOp(this.sessionSigner, this.entryPoint.target, 31337);
	userOp.signature = _signature;

    const rcpt = await this.entryPoint.connect(this.owner).handleOps([userOp.format()], this.owner.address, {
      gasLimit: 1e7
    }).catch(e => console.log("Error:", e));

}
var swiggsnetwork = new SwiggsNetwork();
(async () => {
	await swiggsnetwork.connect(ID).catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});

	await swiggsnetwork.startOperations(ID).catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});

	setTimeout(async () => {
		await swiggsnetwork.depositRewardWithSessionKey(ID).catch((error) => {
			console.error(error);
			process.exitCode = 1;
		});		
	}, 3000);

/*	await swiggsnetwork.depositReward(ID).catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});
*/})();
