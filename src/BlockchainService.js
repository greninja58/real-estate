import Web3 from 'web3';
import { readFileAsBytes } from './utils';

const BlockchainService = {
  readFileAsBytes: async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        const bytes = new Uint8Array(arrayBuffer);
        resolve(bytes);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  },

  uploadDocument: async (documentName, documentFile, connectedWallet) => {
    try {
      // Connect to the blockchain network
      const web3 = new Web3('https://example-blockchain-url.com');

      // Get the connected wallet address
      const walletAddress = connectedWallet;

      // Convert the document file to bytes
      const documentBytes = await BlockchainService.readFileAsBytes(documentFile);

      // Upload the document to the blockchain database
      const transaction = await web3.eth.sendTransaction({
        from: walletAddress,
        to: '0xBlockchainDatabaseAddress',
        data: web3.utils.asciiToHex(documentBytes),
      });

      // Store the transaction details in the history
      BlockchainService.storeTransactionDetails(transaction, documentName, connectedWallet);

      console.log('Document uploaded successfully');
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  },

  storeTransactionDetails: (transaction, documentName, connectedWallet) => {
    // Implement the logic to store transaction details
  },
};

export default BlockchainService;