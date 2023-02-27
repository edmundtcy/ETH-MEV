const { ethers } = require("ethers")

var wallet
var isValid = false
const regex = /^0x0000.*$/

while (!isValid) {
    wallet = ethers.Wallet.createRandom()
    isValid = regex.test(wallet.address)
}

console.log(`Public Address: ${wallet.address}`)
console.log(`Private Key: ${wallet._signingKey().privateKey}`)
console.log(`Key Phrase ${wallet.mnemonic.phrase}`)