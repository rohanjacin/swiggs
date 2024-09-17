const hre = require("hardhat");

// Interface to the Swiggs network
class SwiggsNetwork {
	constructor() {
		// Swiggs contract objects
		this.sampleSwiggs = null;
		this.Swiggs = null;
		this.sampleSwiggsAddress = null;

		// Restaurant contract objects
		this.sampleRestaurant = null;
		this.Restaurant = null;
		this.sampleRestaurantAddress = null;

		console.log("Swiggs net init.");
	}
}

// Connects to the Swiggs contract
SwiggsNetwork.prototype.deploy = async function () {

	// Deploys swiggs contract
	this.Swiggs = await hre.ethers.getContractFactory('Swiggs');
	this.sampleSwiggs = await this.Swiggs.deploy('sampleSwiggs');
	await this.sampleSwiggs.waitForDeployment();
	this.sampleSwiggsAddress = await this.sampleSwiggs.getAddress(); 
	console.log(`Swiggs deployed to ${this.sampleSwiggsAddress}`);

	// Deploys resutaurant contract
/*	this.Restaurant = await hre.ethers.getContractFactory('Restaurant');
	this.sampleRestaurant = await this.Restaurant.deploy(1234);
	await this.sampleRestaurant.waitForDeployment();
	this.sampleRestaurantAddress = await this.sampleRestaurant.getAddress(); 
	console.log(`Restaurant template deployed to ${this.sampleRestaurantAddress}`);
*/	
	//console.log("this.sampleSwiggs:",Object.keys(this.sampleSwiggs.runner.provider._hardhatProvider._emitter._events));
	// Register for events from Swiggs network.
	//this.registerEvents();
}

SwiggsNetwork.prototype.registerEvents = async function () {

	// Restaurant registration event
	filter = this.sampleSwiggs.filters.RestaurantDeployed(null, null, null);
	this.sampleSwiggs.on(filter, (results) => {

		console.log('Restaurant deploy done..'); 
		console.log('id=' + results.args.restaurantId);
		console.log('restaurantAt=' + results.args.restaurantAt);
		console.log('escrowAt=' + results.args.escrowAt);
	});			
}

var swiggsnet = new SwiggsNetwork();

swiggsnet.deploy().catch((error) => {
	console.error(error);
	process.exitCode = 1;	
});
