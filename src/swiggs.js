const hre = require("hardhat");

// Swiggs Network Class
class SwiggsNetwork {

	constructor(){
		this.sampleSwiggs = null;
		this.Swiggs = null;
		this.admin = null;		
	}
}

// Connect to the Swiggs contract
SwiggsNetwork.prototype.connect = async function () {

	this.Swiggs = await hre.ethers.getContractFactory('Swiggs');

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

	// Register restaurant with restaurantId from Swiggy
	await this.sampleSwiggs.connect(this.admin).deployRestaurant(
		restaurantId, _ownerAddress);
	console.log("Deployed restaurant..");
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

})();
