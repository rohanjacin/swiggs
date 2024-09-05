const hre = require("hardhat");

// Swiggs Network Class
class SwiggsNetwork {

	constructor(){
		this.sampleRestaurant = null;
		this.Restaurant = null;
		this.owner = null;
		this.id = null;		
	}
}

// Connect to the Swiggs contract
SwiggsNetwork.prototype.connect = async function () {

	this.Restaurant = await hre.ethers.getContractFactory('Restaurant');

	this.sampleRestaurant = await this.Restaurant.attach('0x4F206ddF0Dcf9364fCea37D3d558b8A946A37a16');
 	console.log(`Attached to SwiggsNetwork contract`);

 	// Use first signer as owner
 	let _owner = await hre.ethers.getSigners();
 	this.owner = _owner[2];
 	console.log("Owner's address:", this.owner.address);
}

SwiggsNetwork.prototype.getRestaurantId = async function () {

	const id = await this.sampleRestaurant.connect(this.owner).getId();
	console.log("Restaurant Id:" + id);
}

var swiggsnetwork = new SwiggsNetwork();
(async () => {
	await swiggsnetwork.connect().catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});

	console.log("Trying to fetch restaurant id..");
	await swiggsnetwork.getRestaurantId().catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});

})();
