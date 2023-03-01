const {ethers} = require('ethers');

const gasData = async (provider) => {
    try{
        const start = Date.now();
        feeData = await provider.getFeeData();
        console.log(`----------------------------[${(new Date).toLocaleTimeString()}]----------------------------`);
        console.log(`Gas Price: ${ethers.utils.formatUnits(feeData.gasPrice, "gwei")} Gwei`);
        console.log(`Latest Base Fee Per Gas: ${ethers.utils.formatUnits(feeData.lastBaseFeePerGas, "gwei")} Gwei`);
        console.log(`Max Fee Per Gas: ${ethers.utils.formatUnits(feeData.maxFeePerGas, "gwei")} Gwei`);
        console.log(`Max Priority Fee Per Gas: ${ethers.utils.formatUnits(feeData.maxPriorityFeePerGas, "gwei")} Gwei`);
        console.log(`Gas Data Runtime: ${Date.now() - start} ms`);
        console.log(`--------------------------------------------------------------------`);
    } catch (error) {
        console.log(error);
    }
};

const gasStream = async (provider) => {
    provider.on("block", async (blockNumber) => {
        try{
            const start = Date.now();
            feeData = await provider.getFeeData();
            console.log(`----------------------------[${(new Date).toLocaleTimeString()}]----------------------------`);
            console.log(`Gas Price: ${ethers.utils.formatUnits(feeData.gasPrice, "gwei")} Gwei`);
            console.log(`Latest Base Fee Per Gas: ${ethers.utils.formatUnits(feeData.lastBaseFeePerGas, "gwei")} Gwei`);
            console.log(`Max Fee Per Gas: ${ethers.utils.formatUnits(feeData.maxFeePerGas, "gwei")} Gwei`);
            console.log(`Max Priority Fee Per Gas: ${ethers.utils.formatUnits(feeData.maxPriorityFeePerGas, "gwei")} Gwei`);
            console.log(`Gas Data Runtime: ${Date.now() - start} ms`);
            console.log(`--------------------------------------------------------------------`);
        } catch (error) {
            console.log(error);
        }
    });
};

module.exports = {gasData, gasStream};