import React from 'react';
import { Navbar } from './Navbar';
function HistoryPage({ connectedWallet, currentAddress }) {
  return (
    <div>
      <Navbar />
      <h2>History Page</h2>
      {connectedWallet ? (
        <p>Connected Wallet: {currentAddress}</p>
      ) : (
        <p>Please connect to a wallet</p>
      )}
      <p>List of all documents viewed/uploaded by the user</p>
    </div>
  );
}

export default HistoryPage;
