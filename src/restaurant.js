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

	this.sampleRestaurant = await this.Restaurant.attach('0x42B249BCeC98A6775085f1f209B66A9F106A1C2b');
 	console.log(`Attached to SwiggsNetwork contract`);

 	// Use first signer as owner
 	let _owner = await hre.ethers.getSigners();
 	this.owner = _owner[2];
 	console.log("Owner's address:", this.owner.address);
}

SwiggsNetwork.prototype.getRestaurantInfo = async function () {

	const info = await this.sampleRestaurant.connect(this.owner).
						getInfo();
	console.log("Restaurant Id:" + info.id);
	console.log("Restaurant uuid:" + info.uuid);
	console.log("Restaurant fssai:" + info.fssai);
	console.log("Restaurant owner:" + info.owner);
	console.log("Restaurant url:" + info.url);
	console.log("Restaurant escrowAddress:" + info.escrowAddress);
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

SwiggsNetwork.prototype.depositReward = async function (orderId, value) {

	let _value = hre.ethers.parseEther(value, 'eth'); // bid price for room

	await this.sampleRestaurant.connect(this.owner).
						depositReward(orderId, _value, {value: _value});
	console.log("Deposited Reward");

	let _balance = await hre.ethers.provider.getBalance(this.owner);
	console.log("_balance:", hre.ethers.formatEther(_balance));
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
	await swiggsnetwork.registerOwner("0xb69b9afaB8195aC88cFEF7aFC67f6CC396f6fCD7").catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});

	await swiggsnetwork.depositReward(1, '100').catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});	
})();
