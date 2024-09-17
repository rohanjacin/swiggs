const hre = require("hardhat");
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
		this.sampleRestaurant = null;
		this.Restaurant = null;
		this.owner = null;
		this.info = null;		
	}
}

// Connect to the Swiggs contract
SwiggsNetwork.prototype.connect = async function () {

	this.Restaurant = await hre.ethers.getContractFactory('Restaurant');

	this.sampleRestaurant = await this.Restaurant.attach('0xdaF5fa1c65D45367a89c62b49DA5e0245e317F2C');
 	console.log(`Attached to SwiggsNetwork contract`);

 	// Use first signer as owner
 	let _owner = await hre.ethers.getSigners();
 	this.owner = _owner[2];
 	console.log("Owner's address:", this.owner.address);
}

SwiggsNetwork.prototype.getRestaurantId = async function () {

	const id = await this.sampleRestaurant.connect(this.owner).
						getId();
	console.log("Restaurant Id:" + id);
}

SwiggsNetwork.prototype.registerOwner = async function (escrowAddress) {

	let value = hre.ethers.parseEther('1000', 'gwei'); // bid price for room

	this.info = new RestaurantInfo(ID, UUID, FSSAI, URL, escrowAddress);
	console.log("Is Address:", hre.ethers.isAddress(escrowAddress));
	await this.sampleRestaurant.connect(this.owner).
						registerOwner(this.info.id, this.info.uuid,
							this.info.fssai, this.info.url,
							this.info.escrowAddress, {value: value});
	console.log("Registered Restaurant");
}

var swiggsnetwork = new SwiggsNetwork();
(async () => {
	await swiggsnetwork.connect().catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});

	console.log("Getting restaurant id..");
	await swiggsnetwork.getRestaurantId().catch(() => {
		console.log(error);
		process.exitCode = 1;
	});

	console.log("Register restaurant info..");
	await swiggsnetwork.registerOwner("0x89c4975fEb7040aD89AE19fDd80a4331019caF4d").catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});

})();
