const ethers = require('ethers');

const checkNetwork = async (provider) => {
    try{
        let network = await provider.getNetwork();
        console.log(`[${(new Date).toLocaleTimeString()}] Connected to ${ network.name == 'homestead' ? 'Mainnet' : network.name } with chain ID ${network.chainId}`);
    }catch (error) {
        console.log('checkNetwork error');
        console.log(error);
    }
};

const getNetwork = async (provider) => {
    try{
        let network = await provider.getNetwork();
        return network;
    }catch (error) {
        console.log('getNetwork error');
        console.log(error);
    }
};

module.exports = {checkNetwork, getNetwork};