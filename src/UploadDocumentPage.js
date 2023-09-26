import React, { useState } from "react";
import { Navbar } from './Navbar';
import CryptoJS from 'crypto-js';
import img2 from './images/images.jpeg';
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
    <img src={img2} alt='ML&J2' style={{position:'absolute',display:'block',opacity:'0.4',marginLeft:'40%',marginTop:'9%',zIndex:'-1'}}/>
      {connectedWallet ? (
        <div style={{ textAlign: 'center', backgroundColor:'bisque',display:'flex', flexDirection:'column', padding:'30px' }}>
          <input
            type="text"
            value={documentLink}
            onChange={handleDocumentNameChange}
            placeholder="IPFS document Link"
            style={{width:'15%',padding:'4px', marginLeft:'38%', marginTop:'10px'}}
          />
          <input
            type="file"
            onChange={handleDocumentFileChange}
            style={{width:'fit-content',padding:'4px', marginLeft:'38%', marginTop:'5px'}}
          />
          {/* <input
            type="text"
            value={documentId}
            onChange={handleDocumentIdChange}
            placeholder="Enter document ID"
          /> */}
          <button onClick={handleUpload} style={{width:'15%',padding:'4px', margin:'5px', marginLeft:'38%', cursor:'pointer'}}>Upload</button>
        </div>
      ) : (
        <p>Please connect to a wallet</p>
      )}
      <div style={{color:'white', backgroundColor:'black', fontWeight:'500', padding:'4px', marginTop:'24%'}}>
        <p style={{marginLeft:'25%'}}>Website Policies  |  Terms of Use  |  Help  |  Contact Us  |  Feedback  |  Visitor Analytics  |  Web Information Manager  |   Archives</p>
      </div>
    </div>
  );
}

export default UploadDocumentPage;