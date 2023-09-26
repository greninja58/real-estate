import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Box } from '@mui/material';
import { Navbar } from './Navbar';
import img1 from './images/download.jpeg';

function HomePage({ connectedWallet, currentAddress }) {
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
      <img src={img1} alt='ML&J' style={{width:'100%', backgroundRepeat:'repeat', height:'220px'}}/>
      <p style={{marginLeft:'42%',fontSize:'xx-large', fontWeight:'600', color:'black'}}>
        WELCOME
      </p>
      {connectedWallet ? (
        <Typography variant="body1" component="p" sx={{ mt: 2 }}>
          Connected Wallet: {currentAddress}
        </Typography>
      ) : (
        <Typography variant="body1" component="p" sx={{ mt: 2 }}>
          Please connect to a wallet
        </Typography>
      )}
      <div style={{color:'white', backgroundColor:'black', fontWeight:'500', padding:'4px', marginTop:'17%'}}>
        <p style={{marginLeft:'25%'}}>Website Policies  |  Terms of Use  |  Help  |  Contact Us  |  Feedback  |  Visitor Analytics  |  Web Information Manager  |   Archives</p>
      </div>
    </Container>
  );
}

export default HomePage;
