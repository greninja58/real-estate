import React, { useState } from 'react';
import { Navbar } from './Navbar';
function Wallet({ handleWalletConnect }) {
  const [walletAddress, setWalletAddress] = useState('');

  const handleConnect = () => {
    // Connect to wallet logic here
    // Set the connected wallet address
    handleWalletConnect(walletAddress);
  };

  return (
    <div>
      <Navbar />
      <h2>Connect to Wallet</h2>
      <input
        type="text"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        placeholder="Enter wallet address"
      />
      <button onClick={handleConnect}>Connect</button>
    </div>
  );
}

export default Wallet;

