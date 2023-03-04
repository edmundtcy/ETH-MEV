const ethers = require('ethers');
const {gasPredict} = require('./gasCalculator.js');
const {getNetwork} = require('./networkConfig.js');

const initTx = async (privateKey, address, ether, provider) => {
    try{
        const feeData = await gasPredict(provider);
        const network = await getNetwork(provider);
        console.log(feeData)
        const wallet = new ethers.Wallet(privateKey, provider);
        const nonce = await provider.getTransactionCount(wallet.address);
        const tx = {
            type: 2, //EIP-1159 = type 2
            chainId: network.chainId,
            to: address,
            value: ethers.utils.parseEther(ether),
            nonce: nonce,

            // gasPrice: feeData.gasPrice,
            gasLimit: ethers.BigNumber.from(21000),
            maxFeePerGas: feeData.maxFeePerGas,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
        };
        const signedTx = await wallet.signTransaction(tx);
        const txHash = await provider.sendTransaction(signedTx);
        await txHash.wait();
        console.log(txHash);
        return txHash;
    } catch (error) {
        console.log('initTx error');
        console.log(error);
    }
}

module.exports = {initTx};