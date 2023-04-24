const {
  Auth,
  TEMPLATES,
  Metadata
} = require('@infura/sdk');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const contractABI = require('./Contract_ABI.json');
const fromAddress = '0x8a936dd11171C554A19308662DAfF04E8CDF61C0';
const secretKey = 'd35a8fce6abd4c348256fae7789af970';
const privateKey = 'cfb59f49a631a281e11c7b5970785732acac9a8830140579c036c08ae9942169';
const infuraProjectID = 'f609cd0c1fbb4c74b8df6e19182babc5';
const infuraEndpoint = 'https://polygon-mumbai.infura.io/v3/f609cd0c1fbb4c74b8df6e19182babc5';
const auth = new Auth({
  projectId: infuraProjectID,
  secretId: secretKey,
  privateKey: privateKey,
  rpcUrl: infuraEndpoint,
  chainId: 80001
});
const provider = new Web3.providers.HttpProvider(auth.rpcUrl, {
  headers: [{
    name: 'Access-Control-Allow-Origin',
    value: '*'
  }, {
    name: 'Access-Control-Allow-Headers',
    value: 'Content-Type'
  }, {
    name: 'Access-Control-Allow-Methods',
    value: 'GET, POST, OPTIONS'
  }],
  timeout: 0
});
const web3 = new Web3(provider);
const generateUniqueTokenIds = async amount => {
  const tokenIds = [];
  for (let i = 0; i < amount; i++) {
    let tokenId;
    do {
      tokenId = Math.floor(Math.random() * 100) + 1; // generates random number between 1 and 100
    } while (tokenIds.includes(tokenId));
    tokenIds.push(tokenId);
  }
  return tokenIds;
};
function transfer(tokenAmount, recipientAddress, contractAddress, _data) {
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  return new Promise(async (resolve, reject) => {
    try {
      const tokenIds = await generateUniqueTokenIds(tokenAmount);
      for (let i = 0; i < tokenAmount; i++) {
        const tokenId = tokenIds[i];

        // Build the raw transaction

        const nonce = await web3.eth.getTransactionCount(fromAddress);
        const gasPrice = await web3.eth.getGasPrice();
        const gasLimit = 210000;
        const data = contract.methods.safeTransferFrom(fromAddress, recipientAddress, tokenId, _data).encodeABI();
        const txParams = {
          nonce: web3.utils.toHex(nonce),
          gasPrice: web3.utils.toHex(gasPrice),
          gasLimit: web3.utils.toHex(gasLimit),
          to: contractAddress,
          data: data
        };

        // Sign the raw transaction
        const signedTx = await web3.eth.accounts.signTransaction(txParams, privateKey);

        // Send the raw transaction
        const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      }
      resolve('Transfer successful');
    } catch (error) {
      reject(error);
    }
  });
}
module.exports.transfer = transfer;