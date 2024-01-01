const hre = require('hardhat');

async function main(){

    const Records = await hre.ethers.getContractFactory("HealthDetails")
    const records = await Records.deploy();

    await records.deployed();

    console.log("Factory deployed to:",records.address);

}
main()
    .then(() => process.exit(0))
    .catch((error) =>{
        console.log(error);
        process.exit(1);
    });