import React, { useState } from "react";
import { Navbar } from './Navbar';
import CryptoJS from 'crypto-js';
function UploadDocumentPage({ connectedWallet, currentAddress, contract, web3 }) {
  const [documentLink, setDocumentLink] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  // const [documentId, setDocumentId] = useState("");

  const handleDocumentNameChange = (e) => {
    setDocumentLink(e.target.value);
  };

  const handleDocumentFileChange = (e) => {
    setDocumentFile(e.target.files[0]);
  };

  // const handleDocumentIdChange = (e) => {
  //   setDocumentId(e.target.value);
  // };

  const handleUpload = async () => {
    // console.log("Document Name:", documentName);
    // console.log("Document File:", documentFile);
    // console.log("Document ID:", documentId);
    const documenthash = CryptoJS.SHA256(documentFile).toString();
  console.log(documenthash);
    if(connectedWallet && contract){
      try{
        await contract.methods.addDocument(documenthash,documentLink).send({from:currentAddress})
        .on('transactionHash', function(hash){
          console.log("Confirm transaction with hash ",hash);
      });
      } catch(error){
        alert("Error calling add Document")
        console.log("Error calling add Document",error);
    }
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Upload Document</h2>
      {connectedWallet ? (
        <div style={{ textAlign: 'center' }}>
          <input
            type="text"
            value={documentLink}
            onChange={handleDocumentNameChange}
            placeholder="IPFS document Link"
          />
          <input
            type="file"
            onChange={handleDocumentFileChange}
          />
          {/* <input
            type="text"
            value={documentId}
            onChange={handleDocumentIdChange}
            placeholder="Enter document ID"
          /> */}
          <button onClick={handleUpload}>Upload</button>
        </div>
      ) : (
        <p>Please connect to a wallet</p>
      )}
    </div>
  );
}

export default UploadDocumentPage;