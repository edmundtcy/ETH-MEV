const {ethers} = require('ethers');
const {gasData, gasStream, gasByBlock, gasLiveData} = require('./src/gasCalculator.js');
const {readContract} = require('./src/contractReader.js');
//I didn't pay for the API keys, so even if u find them on my github, it doesn't really matter.
const infura = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/2ceada3b03e3484787736c3c832dc070');
const infuraWSS = new ethers.providers.WebSocketProvider('wss://mainnet.infura.io/ws/v3/2ceada3b03e3484787736c3c832dc070');
const alchemy = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/Teorp2u7QRiEQQUfSBknVWp96exuykwG');
const alchemyWSS = new ethers.providers.WebSocketProvider('wss://eth-mainnet.g.alchemy.com/v2/Teorp2u7QRiEQQUfSBknVWp96exuykwG');
const addressUniswapV3 = '0xE592427A0AEce92De3Edee1F18E0157C05861564';
const provider = alchemy
const providerWSS = alchemyWSS

const checkNetwork = async (provider) => {
    let network = await provider.getNetwork();
    console.log(`[${(new Date).toLocaleTimeString()}] Connected to ${ network.name == 'homestead' ? 'Mainnet' : network.name } with chain ID ${network.chainId}`);
};

const abiERC20 = [
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
];

const uniswapTx = async () => {
    providerWSS.on("pending", async (txHash) => {
        try{
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
                    //Log decoded data
                    console.log("");
                    console.log("Open Transaction:", tx.hash);
                    console.log("decoded", decoded);
                    
                    //Interpret data - Contracts
                    const contract0 = new ethers.Contract(decoded[0], abiERC20, provider);
                    const contract1 = new ethers.Contract(decoded[1], abiERC20, provider);
    
                    //Interpret data - Symbols
                    const symbol0 = await contract0.symbol();
                    const symbol1 = await contract1.symbol();
    
                    //Interpret data - Decimals
                    const decimals0 = await contract0.decimals();
                    const decimals1 = await contract1.decimals();
    
                    //Interpret data - Values
                    const amountOut = Number(
                        ethers.utils.formatUnits(decoded[5], decimals1)
                    );
    
                    //Interpret data - Values
                    const amountInMax = Number(
                        ethers.utils.formatUnits(decoded[6], decimals0)
                    );
    
                    // Readout
                    console.log("symbol0", symbol0, decimals0);
                    console.log("symbol1", symbol1, decimals1);
                    console.log("amountOut", amountOut);
                    console.log("amountInMax", amountInMax);
                }
            }
        } catch (error) {
            console.log(error);
        }
    });
};

const allTx = async () => {
    providerWSS.on("pending", async (txHash) => {
        try{
            const start = Date.now();
            const tx = await providerWSS.getTransaction(txHash);
            if (tx) {
                console.log(`${tx.hash} Runtime: ${Date.now() - start} ms`);
                // console.log(tx);
            }
        } catch (error) {
            // console.log(JSON.parse(error.response).error.code);
        }
    });
};

checkNetwork(provider);
// allTx();

const addressAzuki = '0xED5AF388653567Af2F388E6224dC7C4b3241C544';

const abiAzuki = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",
]

readContract(provider, addressAzuki, abiAzuki);
// gasData(provider);
// gasStream(providerWSS);
// gasByBlock(provider);
// gasLiveData(provider)
