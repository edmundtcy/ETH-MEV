const { ethers } = require("ethers")

const addrGenerator = (num_zeros) => {
    var wallet
    var isValid = false
    var i = 0;
    // const regex = /^0x0.*$/
    const regex = new RegExp(`^0x${'0'.repeat(num_zeros)}.*$`)
    const start = Date.now();
    while (!isValid) {
        i++;
        wallet = ethers.Wallet.createRandom()
        isValid = regex.test(wallet.address)
        process.stdout.write(`Attempt: ${i} Hash Rate: ${(i / (Date.now() - start) * 1000).toFixed(3)} H/s\r`);
    }
    return wallet
};

module.exports = {addrGenerator};