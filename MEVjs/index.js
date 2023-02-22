const ethers = require('ethers');
const provider = new ethers.InfuraProvider('mainnet','2ceada3b03e3484787736c3c832dc070', '5629f0ed2fdb49c39324eaf30c7a8447');
const providerWSS = new provider.getWebSocketProvider('mainnet','2ceada3b03e3484787736c3c832dc070');
const addressUniswapV3 = '0xE592427A0AEce92De3Edee1F18E0157C05861564';
const abiERC20 = [
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
];
const main = async () => {
    providerWSS.on("pending", async (txHash) => {
        const tx = await provider.getTransaction(txHash);
        if (tx && tx.to == addressUniswapV3) {
            const dataSlice = ethers.utils.hexDataSlice(tx.data, 4);

            if (tx.data.length === 522){
                const decoded = ethers.utils.defaultAbiCoder.decode(
                [
                    'address',    
                    'address', 
                    'uint24',
                    'address',
                    'uint256', 
                    'uint256', 
                    'uint256',
                    'uint160',
                ],
                    dataSlice
                );
            }
        }
    }
, 1000);}