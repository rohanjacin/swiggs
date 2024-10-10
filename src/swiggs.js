const hre = require("hardhat");
const RESTAURANT = require("./RestaurantABI.js");
const RESTAURANTESCROW = require("./RestaurantEscrowABI.js");

// Swiggs Network Class
class SwiggsNetwork {

	constructor(){
		this.sampleSwiggs = null;
		this.sampleSwiggsAddress = null;
		this.sampleRestaurant = null;
		this.Swiggs = null;
		this.RestaurantAA = null;
		this.RestaurantAddress = null;
		this.EntryPointAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
		this.Paymaster = null;		
		this.admin = null;		
	}
}

// Connect to the Swiggs contract
SwiggsNetwork.prototype.connect = async function () {

	this.Swiggs = await hre.ethers.getContractFactory('Swiggs');
	this.sampleSwiggs = await this.Swiggs.attach('0x5FbDB2315678afecb367f032d93F642f64180aa3');
 	console.log(`Attached to SwiggsNetwork contract`);
	this.sampleSwiggsAddress = await this.sampleSwiggs.getAddress();

 	// Use first signer as admin
 	let _admin = await hre.ethers.getSigners();
 	this.admin = _admin[1];
 	console.log("Admin address:", this.admin.address);

 	this.Paymaster = await hre.ethers.getContractAt(
 		'SwiggsPaymaster', '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9');
 	console.log("paymaster:", this.Paymaster.target);

 	this.registerEvents();
}

// Register a restaurant with the Swiggs network
SwiggsNetwork.prototype.deployRestaurant = async function (restaurantId) {

 	console.log("restaurant a/c:", this.sampleRestaurantAAAddress);

 	let iface = new hre.ethers.Interface(RESTAURANT.ABI);

	// Register restaurant with restaurantId from Swiggy
	await this.sampleSwiggs.connect(this.admin).deployRestaurant(
				restaurantId, RESTAURANT.BYTECODE,
				RESTAURANTESCROW.BYTECODE);
	console.log("Deployed restaurant..");
}

// Deploy restaurant AA with the Swiggs network
SwiggsNetwork.prototype.deployRestaurantAA = async function (restaurantId) {

 	let _address = await hre.ethers.getSigners();
 	let _ownerAddress = _address[2];
 	let _admin = _address[1];

 	//let _oaddr = await _ownerAddress.getAddress();
 	console.log("_oaddr:", _ownerAddress.address);

	// Deploys restaurant account
	this.RestaurantAA = await hre.ethers.getContractFactory('RestaurantAccount');
	this.sampleRestaurantAA = await this.RestaurantAA.deploy(
								_admin.address,
								_ownerAddress.address,
								this.EntryPointAddress);
	await this.sampleRestaurantAA.waitForDeployment();
	this.sampleRestaurantAAAddress = await this.sampleRestaurantAA.getAddress(); 
	console.log(`Restaurant AA deployed to ${this.sampleRestaurantAAAddress}`);

}

SwiggsNetwork.prototype.registerEvents = function () {

	filter = this.sampleSwiggs.filters.RestaurantDeployed(null, null, null);
	this.sampleSwiggs.on(filter, (results) => {

		console.log('Restaurant deploy done..'); 
		console.log('id=' + results.args.restaurantId);
		console.log('restaurantAt=' + results.args.restaurantAt);
		console.log('escrowAt=' + results.args.escrowAt);
		this.RestaurantAddress = results.args.restaurantAt;
	});
}

SwiggsNetwork.prototype.depositGasFees = async function () {
 	// Deposit into entry point
 	let _value = hre.ethers.parseEther('100', 'eth');
 	await this.Paymaster.connect(this.admin).depositEth({value: _value});
}

var swiggsnetwork = new SwiggsNetwork();
(async () => {
	await swiggsnetwork.connect().catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});

	await swiggsnetwork.depositGasFees().catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});

	let id = 0x1234;
	console.log("Trying to deploy the restaurant AA");
	await swiggsnetwork.deployRestaurantAA().catch((error) => {
		console.log(error);
		process.exitCode = 1;
	});		

	setTimeout(async () => {
		console.log("Trying to deploy restaurant with id:", id);
		await swiggsnetwork.deployRestaurant(id).catch((error) => {
			console.error(error);
			process.exitCode = 1;
		});
	}, 1000);

})();
