require('dotenv').config();
const {ethers} = require('ethers');
const {gasData, gasStream, gasByBlock, gasLiveData} = require('./src/gasCalculator.js');
const {readContract} = require('./src/contractReader.js');
const {checkNetwork} = require('./src/networkConfig.js');
const {addrGenerator} = require('./src/addrGenerator.js');
const {initTx} = require('./src/txInitializer.js');

const local = new ethers.providers.JsonRpcProvider('http://localhost:8545');
const localWSS = new ethers.providers.WebSocketProvider('ws://localhost:8545');
const infura = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY_0}`);
const infuraWSS = new ethers.providers.WebSocketProvider(`wss://mainnet.infura.io/ws/v3/${process.env.INFURA_API_KEY_0}`);
const alchemy = new ethers.providers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_0}`);
const alchemyWSS = new ethers.providers.WebSocketProvider(`wss://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_0}`);
const alchemyGoerli = new ethers.providers.JsonRpcProvider(`https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_1}`);
const alchemyGoerliWSS = new ethers.providers.WebSocketProvider(`wss://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_1}`);

const addressUniswapV3 = '0xE592427A0AEce92De3Edee1F18E0157C05861564';
const provider = alchemyGoerli
const providerWSS = alchemyGoerliWSS

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

const addressAzuki = '0xED5AF388653567Af2F388E6224dC7C4b3241C544';

const abiAzuki = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",
]

console.log("Starting MEV bot...");
checkNetwork(provider);
var txHash = initTx(process.env.PRIVATE_KEY_0, process.env.PUBLIC_ADDRESS_1, '0.01', provider);

// readContract(provider, addressAzuki, abiAzuki);
// wallet = addrGenerator(2);
// gasData(provider);
// gasStream(providerWSS);
// gasByBlock(provider);
// gasLiveData(provider)
