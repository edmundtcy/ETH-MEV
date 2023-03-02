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
            console.log(`Block Number: ${blockNumber}`);
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

const gasByBlock = async (provider) => {
    try{
        const start = Date.now();
        const blockNumber = await provider.getBlockNumber();
        const block = await provider.getBlock(blockNumber);
        console.log(block);
        console.log(`----------------------------[${(new Date).toLocaleTimeString()}]----------------------------`);
        console.log(`Block Number: ${blockNumber}`);
        console.log(`Latest Base Fee Per Gas: ${ethers.utils.formatUnits(block.baseFeePerGas, "gwei")} Gwei`);
        console.log(`Gas Used: ${ethers.utils.formatUnits(block.gasUsed, "gwei")} Gwei`);
        console.log(`Gas Limit: ${ethers.utils.formatUnits(block.gasLimit, "gwei")} Gwei`);
        console.log(`Gas Data Runtime: ${Date.now() - start} ms`);
        console.log(`--------------------------------------------------------------------`);
    } catch (error) {
        console.log(error);
    }
};

const gasLiveData = async (provider) => {
    var latestBaseFee = 0;
    while (true) {
        const start = Date.now();
        try{
            const blockNumber = await provider.getBlockNumber();
            const block = await provider.getBlock(blockNumber);
            if (block.baseFeePerGas != latestBaseFee) {
                latestBaseFee = block.baseFeePerGas;
            }
        } catch (error) {
            console.log(error);
        }
        console.log(`[${(new Date).toLocaleTimeString()}] Latest Base Fee Per Gas: ${ethers.utils.formatUnits(latestBaseFee, "gwei")} Gwei [Runtime: ${Date.now() - start} ms]`);
    }
}



module.exports = {gasData, gasStream, gasByBlock, gasLiveData};