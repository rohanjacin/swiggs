const hre = require("hardhat");
const RESTAURANT = require("./RestaurantABI.js");
const RESTAURANTESCROW = require("./RestaurantEscrowABI.js");

// Auth Class
class SwiggsAuth {

	constructor(){
		this.Auth = null;
		this.sampleAuth = null;
		this.sampleAuthAddress = null;
		this.admin = null;		
	}
}

// Connect to the Auth contract
SwiggsAuth.prototype.connect = async function () {

	this.Auth = await hre.ethers.getContractFactory('Auth');
	this.sampleAuth = await this.Auth.attach('0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512');
 	console.log(`Attached to Auth contract`);
	this.sampleAuthAddress = await this.sampleAuth.getAddress();

 	// Use first signer as admin
 	let _admin = await hre.ethers.getSigners();
 	this.admin = _admin[1];
 	console.log("Admin address:", this.admin.address);

 	this.registerEvents();
}

SwiggsAuth.prototype.registerEvents = async function () {

	// Account validation request
	filter = this.sampleAuth.filters.validateAccountRequest(null, null, null);
	this.sampleAuth.on(filter, (results) => {

		console.log('Account validation request..'); 
		console.log('id=' + results.args.id);
		console.log('restaurantAddress=' + results.args.restaurant);
		console.log('restaurantAccount=' + results.args.restaurantAccount);
		//let status = await this.validateRestaurantOwner();
	});
}

SwiggsAuth.prototype.validateRestaurantOwner = async function (
	address, restaurantAccount) {
	let Restaurant = await hre.ethers.getContractFactory('Restaurant');
	let restaurant = await Restaurant.attach(address);
	let info = await restaurant.connect(this.admin).getInfo();		

	if (info.owner === restaurantAccount) {
		console.log("Restaurant owner confirmed");
		return true;
	}
	else false;
}

var swiggsauth = new SwiggsAuth();
(async () => {
	await swiggsauth.connect().catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});
})();
