const hre = require("hardhat");
const EntryPoint = require("./entryPoint.js");

// Interface to the Swiggs network
class SwiggsNetwork {
	constructor() {
		// Swiggs contract objects
		this.sampleSwiggs = null;
		this.Swiggs = null;
		this.sampleSwiggsAddress = null;
		this.swiggsOwner = null;

		// Swiggs token objects
		this.sampleToken = null;
		this.Token = null;
		this.sampleTokenAddress = null;

		// Swiggs AA EntryPoint objects
		this.sampleEntryPoint = null;
		this.EntryPoint = null;
		this.sampleEntryPointAddress = null;

		// Swiggs paymaster objects
		this.samplePaymaster = null;
		this.Paymaster = null;
		this.samplePaymasterAddress = null;

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
 	let _signers = await hre.ethers.getSigners();
 	this.swiggsOwner = _signers[1];

	// Deploys AA EntryPoint contract
	this.EntryPoint = await hre.ethers.getContractFactory(
							EntryPoint.ABI, EntryPoint.BYTECODE);
	this.sampleEntryPoint = await this.EntryPoint.deploy();
	await this.sampleEntryPoint.waitForDeployment();
	this.sampleEntryPointAddress = await this.sampleEntryPoint.getAddress(); 
	console.log(`AA EntryPoint deployed to ${this.sampleEntryPointAddress}`);

	// Deploys swiggs paymaster contract
	this.Paymaster = await hre.ethers.getContractFactory('SwiggsPaymaster');
	this.samplePaymaster = await this.Paymaster.deploy(
		this.sampleEntryPointAddress, this.swiggsOwner);
	await this.samplePaymaster.waitForDeployment();
	this.samplePaymasterAddress = await this.samplePaymaster.getAddress(); 
	console.log(`Swiggs Paymaster deployed to ${this.samplePaymasterAddress}`);

	// Register for events from Swiggs network.
	this.registerEvents();
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
