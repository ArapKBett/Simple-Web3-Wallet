const { ethers } = require('ethers');

// Function to create a new wallet
function createWallet() {
  const wallet = ethers.Wallet.createRandom();
  console.log('New Wallet Address:', wallet.address);
  console.log('Mnemonic:', wallet.mnemonic.phrase);
  console.log('Private Key:', wallet.privateKey);
  return wallet;
}

// Function to import a wallet using a private key
function importWalletFromPrivateKey(privateKey) {
  const wallet = new ethers.Wallet(privateKey);
  console.log('Imported Wallet Address:', wallet.address);
  return wallet;
}

// Function to import a wallet using a mnemonic phrase
function importWalletFromMnemonic(mnemonic) {
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  console.log('Imported Wallet Address:', wallet.address);
  return wallet;
}

// Function to connect a wallet to a provider
function connectToProvider(wallet, network = 'mainnet') {
  const provider = ethers.getDefaultProvider(network);
  return wallet.connect(provider);
}

// Function to check the balance of a wallet
async function checkBalance(wallet) {
  const balance = await wallet.getBalance();
  console.log('Balance:', ethers.utils.formatEther(balance));
}

// Function to send a transaction
async function sendTransaction(wallet, to, amount) {
  try {
    const tx = {
      to: to,
      value: ethers.utils.parseEther(amount), // Amount in ether
    };

    const transactionResponse = await wallet.sendTransaction(tx);
    console.log('Transaction Hash:', transactionResponse.hash);

    // Wait for the transaction to be mined
    await transactionResponse.wait();
    console.log('Transaction Confirmed');
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
}

// Enhanced error handling for sending transactions
async function sendTransactionWithHandling(wallet, to, amount) {
  try {
    const tx = {
      to: to,
      value: ethers.utils.parseEther(amount),
    };

    const transactionResponse = await wallet.sendTransaction(tx);
    console.log('Transaction Hash:', transactionResponse.hash);

    await transactionResponse.wait();
    console.log('Transaction Confirmed');
  } catch (error) {
    if (error.code === ethers.errors.INSUFFICIENT_FUNDS) {
      console.error('Insufficient funds for the transaction.');
    } else if (error.code === ethers.errors.NETWORK_ERROR) {
      console.error('Network error. Please check your connection.');
    } else {
      console.error('An unknown error occurred:', error);
    }
  }
}

// Function to encrypt a wallet
async function encryptWallet(wallet, password) {
  const encryptedJson = await wallet.encrypt(password);
  console.log('Encrypted JSON:', encryptedJson);
  return encryptedJson;
}

// Function to decrypt a wallet
async function decryptWallet(encryptedJson, password) {
  const wallet = await ethers.Wallet.fromEncryptedJson(encryptedJson, password);
  console.log('Decrypted Wallet Address:', wallet.address);
  return wallet;
}

// Function to interact with a smart contract
async function interactWithContract(wallet, contractAddress, abi, methodName, ...args) {
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  try {
    const result = await contractmethodName;
    console.log('Contract Interaction Result:', result);
  } catch (error) {
    console.error('Error interacting with contract:', error);
  }
}

// Example usage
const newWallet = createWallet();
const importedWallet = importWalletFromPrivateKey('your-private-key-here');
const mnemonicWallet = importWalletFromMnemonic('your-mnemonic-phrase-here');
const walletWithProvider = connectToProvider(newWallet, 'ropsten'); // Connect to Ropsten testnet

checkBalance(walletWithProvider);
sendTransactionWithHandling(walletWithProvider, 'recipient-address-here', '0.01');

const password = 'your-password-here';
encryptWallet(newWallet, password).then((encryptedJson) => {
  decryptWallet(encryptedJson, password);
});

const contractAddress = 'contract-address-here';
const abi = [ /* ABI array here */ ];
const methodName = 'methodName';
interactWithContract(walletWithProvider, contractAddress, abi, methodName, 'arg1', 'arg2');
  
