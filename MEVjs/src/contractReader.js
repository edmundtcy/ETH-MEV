const {ethers} = require("ethers");

const readContract = async (provider, contractAddress, abi) => {
    try {
        const contractAzuki = new ethers.Contract(contractAddress, abi, provider);
        const nameAzuki = await contractAzuki.name();
        const symbolAzuki = await contractAzuki.symbol();
        const totalSupplyAzuki = await contractAzuki.totalSupply();
        const balanceNFT = await contractAzuki.balanceOf('0x4199F2400fb5Ad164A065815B1ab386fD09016a0')
        console.log("nameAzuki", nameAzuki);
        console.log("symbolAzuki", symbolAzuki);
        console.log("totalSupplyAzuki", ethers.utils.formatUnits(totalSupplyAzuki, 0));
        console.log(`0x4199F2400fb5Ad164A065815B1ab386fD09016a0 Balance of Azuki, ${ethers.utils.formatUnits(balanceNFT, 0)}`);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {readContract}