import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material'; // Import Material UI components
import { Input } from '@chakra-ui/react'; // Import Chakra UI components

import HomePage from './HomePage';
import HistoryPage from './HistoryPage';
import Wallet from './Wallet';
import UploadDocumentPage from './UploadDocumentPage';
//Web3 library
import Web3 from 'web3';
import contractabi from './abi/DocumentVault.json';

function App() {
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [web3Provider,setWeb3Provider]= useState(null);
  const [currentAddress,setCurrentAddress] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract,setContract] = useState({});
  const [allright,setAllRight] = useState(0);

  const handleWalletConnect = async () => {
    try {
      if (web3Provider!== null) {

        const accounts = await web3Provider.request({
          method: "eth_requestAccounts",
        });
        setCurrentAddress(accounts[0]);
        setConnectedWallet(1);
      }
    } catch (error) {
      console.log(error);
    }
    //log for current Address
    console.log("Current Address: ", currentAddress);
  };

  const getContract = async() =>{
    if(web3Provider != null && web3 != null){
      const contractAddress = '0xaabD39AEA22583911FF0BeF46D2b9666Af646DA2';
      const contractABI = contractabi.abi;
      const cs = new web3.eth.Contract(contractABI,contractAddress);
      setContract(cs);
      //log for contract
      console.log(cs);
      setAllRight(1);
    }
    else{
      setAllRight(0);
      console.error("error fetching contract");
    }
  };

  useEffect(() => {

      const web3provider = window.ethereum; // Use the browser's Web3 provider
      setWeb3Provider(web3provider);
      console.log('Using MetaMask provider');
    if(web3Provider!= null) setWeb3(new Web3(web3Provider));

    if (web3 != null) {
      getContract();
    }
// eslint-disable-next-line
  }, [connectedWallet, web3Provider]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage connectedWallet={connectedWallet} currentAddress={currentAddress} />} />
          <Route path="/history" element={<HistoryPage connectedWallet={connectedWallet} currentAddress={currentAddress} contract={contract} web3={web3} allright={allright} />} />
          <Route path="/upload" element={<UploadDocumentPage connectedWallet={connectedWallet} currentAddress={currentAddress} contract={contract} web3={web3} />} />
          {/* <Route path="/wallet" element={<Wallet connectedWallet={connectedWallet} />} /> */}
        </Routes>

        {/* <TextField
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
        /> */}
      </Router>
      {!connectedWallet? <button style={{display:'block', position:'absolute', marginTop:'-18%',marginLeft:'20px', padding:'6px', color:'white', backgroundColor:'black', borderRadius:'10px'}} onClick={handleWalletConnect}>Connect Wallet</button> :<span></span> }
      
    </>
  );
}

export default App;
