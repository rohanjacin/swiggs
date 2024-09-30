const hre = require("hardhat");
const ID = 0x1234;
const UUID = 0x23848320;
const FSSAI = 0x20139847;
const URL = "https://thrive.restaurantId.com/api/restaurant/{id}.json";
const RESTAURANT = require("./RestaurantABI.js");
const RESTAURANTESCROW = require("./RestaurantEscrowABI.js");

class RestaurantInfo {
	constructor(id, uuid, fssai, url, ownerAddress, escrowAddress) {
		this.id = id;
		this.uuid = uuid;
		this.fssai = fssai;
		this.url = url;
		this.ownerAddress = ownerAddress;
		this.escrowAddress = escrowAddress;
	}
}

// Swiggs Network Class
class SwiggsNetwork {

	constructor(){
		this.sampleRestaurant = null;
		this.sampleRestaurantAddress = null;
		this.owner = null;
		this.info = new RestaurantInfo();
		this.sampleSwiggsAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";		
	}
}

// Connect to the Swiggs contract
SwiggsNetwork.prototype.connect = async function (restaurantId) {

 	// Use first signer as owner
 	let _owner = await hre.ethers.getSigners();
 	this.owner = _owner[2];
 	console.log("Owner's address:", this.owner.address);

	// Connect to restaurant contract
	const _from = this.sampleSwiggsAddress;
	const _salt = hre.ethers.solidityPackedKeccak256(["uint256"], [restaurantId]);
	const AbiCoder = new hre.ethers.AbiCoder();
	let _o = await AbiCoder.encode(["address"], [_from]);

	const _initCode = hre.ethers.solidityPacked(
		["bytes", "uint256", "bytes"],
		[RESTAURANT.BYTECODE, restaurantId, _o]);
	const _initCode2 = await hre.ethers.keccak256(_initCode);

	const _restaurantAddress = await hre.ethers.getCreate2Address(
		_from, _salt, _initCode2);
	console.log("_restaurantAddress:", _restaurantAddress);	

	this.sampleRestaurant = await hre.ethers.getContractAt(
		'Restaurant', _restaurantAddress);
 	console.log(`Attached to SwiggsNetwork contract`);
 	this.sampleRestaurantAddress = _restaurantAddress;

 	this.registerRestaurantEvents(restaurantId);
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

SwiggsNetwork.prototype.registerOwner = async function (info) {

	// Connect to restaurant contract
	const _from = this.sampleSwiggsAddress;
	console.log("_from:", _from);
	const _salt = hre.ethers.solidityPackedKeccak256(["uint256", "address"],
						 [info.id, _from]);
	const AbiCoder = new hre.ethers.AbiCoder();
	let _o = await AbiCoder.encode(["address"], [_from]);
	let _p = await AbiCoder.encode(["address"], [this.sampleRestaurantAddress]);

	const _initCode = hre.ethers.solidityPacked(
		["bytes", "bytes", "bytes"],
		[RESTAURANTESCROW.BYTECODE, _p, _o]);
	const _initCode2 = await hre.ethers.keccak256(_initCode);

	const _restaurantEscrowAddress = await hre.ethers.getCreate2Address(
		_from, _salt, _initCode2);
	console.log("Escrow A/C Is address:", hre.ethers.isAddress(_restaurantEscrowAddress));
	console.log("restaurantEscrowAddress:", _restaurantEscrowAddress);	

	let value = hre.ethers.parseEther('1000', 'gwei');

	//this.info = new RestaurantInfo(ID, UUID, FSSAI, URL, escrowAddress);
	this.info.id = info.id;
	this.info.uuid = info.uuid;
	this.info.fssai = info.fssai;
	this.info.url = info.url;
	this.info.ownerAddress = info.ownerAddress;
	this.info.escrowAddress = _restaurantEscrowAddress;

	await this.sampleRestaurant.connect(this.sampleSwiggsAddress).registerOwner(this.info.id, this.info.uuid,
							this.info.fssai, this.info.url,
							this.info.escrowAddress, {value: value});
	console.log("Registered Restaurant");
}

var swiggsnetwork = new SwiggsNetwork();
(async () => {
	await swiggsnetwork.connect(ID).catch((error) => {
		console.error(error);
		process.exitCode = 1;
	});

	setTimeout(async () => {
		console.log("Register restaurant info..");
		restInfo = new RestaurantInfo(ID, UUID, FSSAI, URL,
						"0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9", "0x0");

		await swiggsnetwork.registerOwner(restInfo).catch((error) => {
			console.error(error);
			process.exitCode = 1;
		});

	}, 2000);
})();
