const ethers = require('ethers');

const getBalance = async (address, provider) => {
    try{
        const balance = await provider.getBalance(address);
        return balance;
    } catch (error) {
        console.log('getBalance error');
        console.log(error);
    }
}

module.exports = {getBalance};