const hre = require("hardhat");

async function main(){
    await hre.run("compile");
    // We get the contract to deploy
    const SimpleStore = await hre.ethers.getContractFactory("SimpleStorage");
    // We deploy the contract to the network
    const simpleStore = await SimpleStore.deploy();
    // We wait until the contract is deployed
    await simpleStore.deployed();
    const transcationResponse = await simpleStore.store(1);
    const transactionReceipt = await transcationResponse.wait();
    console.log("Transaction receipt: ", transactionReceipt);
    console.log("Events: ", transactionReceipt.events[0].args);
    console.log("Events: ", transactionReceipt.events[0].args.oldNumber.toNumber());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});