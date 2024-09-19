const hre = require("hardhat");

// Swiggs Network Class
class SwiggsNetwork {

	constructor(){
		this.sampleSwiggs = null;
		this.sampleRestaurant = null;
		this.Swiggs = null;
		this.Restaurant = null;
		this.admin = null;		
	}
}

// Connect to the Swiggs contract
SwiggsNetwork.prototype.connect = async function () {

	this.Swiggs = await hre.ethers.getContractFactory('Swiggs');
	this.Restaurant = await hre.ethers.getContractFactory('Restaurant');

	this.sampleSwiggs = await this.Swiggs.attach('0x5FbDB2315678afecb367f032d93F642f64180aa3');
 	console.log(`Attached to SwiggsNetwork contract`);

 	// Use first signer as admin
 	let _admin = await hre.ethers.getSigners();
 	this.admin = _admin[1];
 	console.log("Admin address:", this.admin.address);

 	this.registerEvents();
}

// Register a restaurant with the Swiggs network
SwiggsNetwork.prototype.deployRestaurant = async function (restaurantId) {

 	let _address = await hre.ethers.getSigners();
 	let _ownerAddress = _address[2];
 	//let _oaddr = await _ownerAddress.getAddress();
 	console.log("_oaddr:", _ownerAddress.address);

	// Register restaurant with restaurantId from Swiggy
	await this.sampleSwiggs.connect(this.admin).deployRestaurant(
		restaurantId, _ownerAddress);
	console.log("Deployed restaurant..");
}

// Connects to the restaurant contract
SwiggsNetwork.prototype.connectToRestaurant = async function (restaurantId) {

 	let _address = await hre.ethers.getSigners();
 	let _ownerAddress = _address[2];

	// Connect to restaurant contract
	const _from = await this.sampleSwiggs.getAddress();
	console.log("_from:", _from);
	const _salt = hre.ethers.solidityPackedKeccak256(["uint256"], [restaurantId]);
	console.log("_salt:", _salt);
	const AbiCoder = new hre.ethers.AbiCoder();
	let _o = await AbiCoder.encode(["address"], [_ownerAddress.address]);

	const _initCode = hre.ethers.solidityPacked(
		["bytes", "uint256", "bytes"],
		[this.Restaurant.bytecode, restaurantId, _o]);
	const _initCode2 = await hre.ethers.keccak256(_initCode);

	const _restaurantAddress = await hre.ethers.getCreate2Address(_from, _salt, _initCode2);
	console.log("_restaurantAddress:", _restaurantAddress);

	this.sampleRestaurant = await this.Restaurant.attach(_restaurantAddress);
 	console.log(`Attached to SwiggsNetwork contract`);

 	this.registerRestaurantEvents(restaurantId);
}

SwiggsNetwork.prototype.registerEvents = function () {

	filter = this.sampleSwiggs.filters.RestaurantDeployed(null, null, null);
	this.sampleSwiggs.on(filter, (results) => {

		console.log('Restaurant deploy done..'); 
		console.log('id=' + results.args.restaurantId);
		console.log('restaurantAt=' + results.args.restaurantAt);
		console.log('escrowAt=' + results.args.escrowAt);

	});
}

SwiggsNetwork.prototype.registerRestaurantEvents = function (restaurantId) {

	filter = this.sampleRestaurant.filters.RestaurantOwnerRegistered(
				restaurantId, null, null);
	this.sampleRestaurant.on(filter, (results) => {

		console.log('Restaurant owner register done..'); 
		console.log('id=' + results.args.id);
		console.log('escrowAt=' + results.args.escrowAt);
		console.log('ownerAddress=' + results.args.ownerAddress);

	});
}

var swiggsnetwork = new SwiggsNetwork();
(async () => {
	await swiggsnetwork.connect().catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});

	let id = 0x1234;
	console.log("Trying to register a restaurant with id:", id);
	await swiggsnetwork.deployRestaurant(id).catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});

	await swiggsnetwork.connectToRestaurant(id).catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});

})();
