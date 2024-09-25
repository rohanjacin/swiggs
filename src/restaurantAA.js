const hre = require("hardhat");
const ethers = require("ethers");
const UserOp = require("./userOp.js");
const RESTAURANT = require("./RestaurantABI.js");

const ID = 0x1234;
const UUID = 0x23848320;
const FSSAI = 0x20139847;
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
		this.sampleRestaurant = null;
		this.owner = null;
		this.info = null;		
	}
}

// Connect to the Swiggs network (EntryPoint)
SwiggsNetwork.prototype.connect = async function (_id) {

 	// Connect to Restaurant Account
 	this.restaurantAccount = await hre.ethers.getContractAt(
 		'RestaurantAccount', '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9');
 	console.log(`Attached to SwiggsNetwork via Restaurant Account ID:`, _id);

	// Get EntryPoint
 	this.entryPoint = await this.restaurantAccount.entryPoint();
 	console.log("EntryPoint:", this.entryPoint);

 	// Use first signer as owner
 	let _owner = await hre.ethers.getSigners();
 	this.owner = _owner[2];
 	console.log("Owner's address:", this.owner.address);

 	// Deposit into entry point
 	this.restaurantAccount.connect(this.owner).addDeposit({value: 1000000});
}

// Connect to the Swiggs network (EntryPoint)
SwiggsNetwork.prototype.registerOwner = async function () {

	let abi = ["function registerOwner(uint256 _id, uint256 _uuid, uint256 _fssai, string memory _url, address payable _escrowAddress)"];
	const iface = new ethers.Interface(abi);
	const cdata = iface.encodeFunctionData("registerOwner", 
		[ID, UUID, FSSAI, URL, "0x0FC9bD43Ea8dcA688FCBd84250ffD56F754984a2"]);

	let userOp = new UserOp(this.owner.address, 1n, RESTAURANT.BYTECODE,
		cdata, "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");

	console.log("this.owner.address:", this.owner.address);

    const accounts = hre.config.networks.hardhat.accounts;
    console.log("accounts:", accounts);
    console.log("path:", accounts.path + "/2");
    const wallet = ethers.HDNodeWallet.fromPhrase(accounts.mnemonic, "", accounts.path + `/2`);    
    console.log("wallet.privateKey:", wallet.privateKey);
    console.log("address:", wallet.address);

	let _signature = userOp.signUserOp(wallet, this.entryPoint, 31337);
	//userOp.signature = _signature;

	//console.log("_signature:", _signature);
}

var swiggsnetwork = new SwiggsNetwork();
(async () => {
	await swiggsnetwork.connect(ID).catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});

	await swiggsnetwork.registerOwner(ID).catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});
})();
