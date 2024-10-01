const hre = require("hardhat");
const ethers = require("ethers");
const UserOp = require("./userOp.js");
const RESTAURANT = require("./RestaurantABI.js");

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
		'Restaurant', '0x86dF95508fBdE6045B6958E2DDd044aB05C7F664');
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
}

// Connect to the Swiggs network (EntryPoint)
SwiggsNetwork.prototype.depositReward = async function () {

	const AbiCoder = new hre.ethers.AbiCoder();
	const execSig = this.restaurantAccount.interface.getFunction('executeUserOp').selector;
	let value = hre.ethers.parseEther('1', 'gwei');

	const depositRewardCall = AbiCoder.encode(['address', 'bytes'],
		[ this.sampleRestaurant.target,
		  this.sampleRestaurant.interface.encodeFunctionData(
		  	"depositReward", ["0x1", value])
		]);

	const cdata = hre.ethers.concat([execSig, depositRewardCall]);

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

var swiggsnetwork = new SwiggsNetwork();
(async () => {
	await swiggsnetwork.connect(ID).catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});

	await swiggsnetwork.depositReward(ID).catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});
})();
