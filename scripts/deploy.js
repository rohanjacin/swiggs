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
	this.Restaurant = await hre.ethers.getContractFactory('Restaurant');
	this.sampleRestaurant = await this.Restaurant.deploy(1234);
	await this.sampleRestaurant.waitForDeployment();
	this.sampleRestaurantAddress = await this.sampleRestaurant.getAddress(); 
	console.log(`Restaurant template deployed to ${this.sampleRestaurantAddress}`);
	
	//console.log("this.sampleSwiggs:",Object.keys(this.sampleSwiggs.runner.provider._hardhatProvider._emitter._events));
	// Register for events from Swiggs network.
	//this.registerEvents();
}

/*LockNetwork.prototype.registerEvents = async function () {

	// Bidding open after Owner registers
	let filter = this.samplelock.filters.BidRoomNow(null, null);
	this.samplelock.on(filter, (result) => {

		console.log("Onwer has registered..");
		console.log("Onwer:" + result.args.owner);
		console.log("Price:" + result.args.price);
		return;
	});

	// Guest registers after after winning bid
	filter = this.samplelock.filters.GuestRegistered(null, null);
	this.samplelock.on(filter, (result) => {

		console.log("Guest has registered and bid..");
		console.log("Guest:" + result.args.guest);
		console.log("Owner:" + result.args.owner);
		return;
	});

	// Guest approved by owner
	filter = this.samplelock.filters.GuestApproved(null, null, null);
	this.samplelock.on(filter, (result) => {

		console.log("Guest has been approved by owner..");
		console.log("Guest:" + result.args.guest);
		console.log("Owner:" + result.args.owner);
		console.log("Nonce:" + result.args.nonce);
		return;
	});

	filter = this.samplelock.filters.RespondAuth(null, null, null, null);
	this.samplelock.on(filter, (result) => {

		console.log("Guest have been approved by owner..");
		console.log("Guest:" + result.args.guest);
		console.log("Owner:" + result.args.owner);
		console.log("Owner verified?:" + result.args.isOwnerVerfied);
		console.log("Nonce:" + result.args.nonce);
		return;
	});			
}*/

var swiggsnet = new SwiggsNetwork();

swiggsnet.deploy().catch((error) => {
	console.error(error);
	process.exitCode = 1;	
});
