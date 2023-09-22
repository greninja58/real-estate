import React, { useState } from "react";
import { Navbar } from './Navbar';
function UploadDocumentPage({ connectedWallet }) {
  const [documentName, setDocumentName] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [documentId, setDocumentId] = useState("");

  const handleDocumentNameChange = (e) => {
    setDocumentName(e.target.value);
  };

  const handleDocumentFileChange = (e) => {
    setDocumentFile(e.target.files[0]);
  };

  const handleDocumentIdChange = (e) => {
    setDocumentId(e.target.value);
  };

  const handleUpload = () => {
    console.log("Document Name:", documentName);
    console.log("Document File:", documentFile);
    console.log("Document ID:", documentId);
  };

  return (
    <div>
      <Navbar />
      <h2>Upload Document</h2>
      {connectedWallet ? (
        <div style={{ textAlign: 'center' }}>
          <input
            type="text"
            value={documentName}
            onChange={handleDocumentNameChange}
            placeholder="Enter document name"
          />
          <input
            type="file"
            onChange={handleDocumentFileChange}
          />
          <input
            type="text"
            value={documentId}
            onChange={handleDocumentIdChange}
            placeholder="Enter document ID"
          />
          <button onClick={handleUpload}>Upload</button>
        </div>
      ) : (
        <p>Please connect to a wallet</p>
      )}
    </div>
  );
}

export default UploadDocumentPage;