import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Box } from '@mui/material';
import { Navbar } from './Navbar';

function HomePage({ connectedWallet }) {
  const handleWalletConnect = async (walletAddress) => {
    try {
      // Make a request to the wallet connection API
      const response = await fetch('https://example.com/connect-wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress }),
      });
  
      if (response.ok) {
        // Wallet connection successful
        const data = await response.json();
        // Perform any necessary actions with the connected wallet data
        console.log('Connected wallet:', data);
      } else {
        // Wallet connection failed
        console.error('Failed to connect wallet');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };
  return (
    <Container maxWidth="mt">
      <Navbar />
      <Typography variant="h2" component="h2" sx={{ mt: 4 }}>
        Home Page
      </Typography>
      {connectedWallet ? (
        <Typography variant="body1" component="p" sx={{ mt: 2 }}>
          Connected Wallet: {connectedWallet}
        </Typography>
      ) : (
        <Typography variant="body1" component="p" sx={{ mt: 2 }}>
          Please connect to a wallet
          
        </Typography>

      )}
    </Container>
  );
}

export default HomePage;
