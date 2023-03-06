const ethers = require('ethers');
const {gasPredict} = require('./gasCalculator.js');
const {getNetwork} = require('./networkConfig.js');
const {getBalance} = require('./balanceChecker.js');

const initTx = async (privateKey, address, ether, provider) => {
    try{
        const feeData = await gasPredict(provider);
        console.log('feeData', feeData);
        const network = await getNetwork(provider);
        const wallet = new ethers.Wallet(privateKey, provider);
        const nonce = await wallet.getTransactionCount();
        // const nonce = await provider.getTransactionCount(wallet.address);
        const tx = {
            type: 2, //EIP-1159 = type 2
            chainId: network.chainId,
            to: address,
            value: ethers.utils.parseEther(ether),
            nonce: nonce,

            // gasPrice: feeData.gasPrice, for type 1 only
            gasLimit: ethers.BigNumber.from(21000),
            maxFeePerGas: feeData.maxFeePerGas,
            maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
        };

        const senderBalance = await getBalance(wallet.address, provider);
        const receiverBalance = await getBalance(address, provider);

        const signedTx = await wallet.signTransaction(tx);
        const receipt = await provider.sendTransaction(signedTx);
        await receipt.wait();

        console.log(`Sender balance: ${ethers.utils.formatEther(senderBalance)} ETH`);
        console.log(`Receiver balance: ${ethers.utils.formatEther(receiverBalance)} ETH`);

        return receipt;
    } catch (error) {
        console.log('initTx error');
        console.log(error);
    }
}

module.exports = {initTx};