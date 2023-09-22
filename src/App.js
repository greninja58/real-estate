import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material'; // Import Material UI components
import { Input } from '@chakra-ui/react'; // Import Chakra UI components

import HomePage from './HomePage';
import HistoryPage from './HistoryPage';
import Wallet from './Wallet';
import UploadDocumentPage from './UploadDocumentPage';

function App() {
  const [connectedWallet, setConnectedWallet] = useState(null);

  const handleWalletConnect = (wallet) => {
    setConnectedWallet(wallet);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage connectedWallet={connectedWallet} />} />
          <Route path="/history" element={<HistoryPage connectedWallet={connectedWallet} />} />
          <Route path="/upload" element={<UploadDocumentPage connectedWallet={connectedWallet} />} />
          <Route path="/wallet" element={<Wallet connectedWallet={connectedWallet} />} />
        </Routes>

        <TextField
          id="username"
          label="Username"
          variant="outlined"
          sx={{ textAlign: 'center', margin: '3em', background: 'linear-gradient(to right, #ffdd00, #ddcc00)', caretColor: 'lime' }}
        />
        <TextField
          id="password"
          label="Password"
          type="password" // Set the type prop to "password"
          variant="outlined"
          sx={{ Align: 'center', margin: '3em', background: 'linear-gradient(to right, #ffdd00, #ddcc00)', caretColor: 'lime' }}
        />
      </Router>
    </>
  );
}

export default App;
