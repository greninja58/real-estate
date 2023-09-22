import axios from 'axios';

const DatabaseService = {
  uploadDocument: async (documentName, documentFile) => {
    try {
      // Convert the document file to base64
      const documentBase64 = await DatabaseService.readFileAsBase64(documentFile);
      
      // Upload the document to the database
      const response = await axios.post('https://example-database-url.com/documents', {
        name: documentName,
        file: documentBase64,
      });

      console.log('Document uploaded successfully');
      return response.data;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  },

  getDocumentHistory: async () => {
    try {
      // Fetch the document history from the database
      const response = await axios.get('https://example-database-url.com/documents');

      console.log('Document history fetched successfully');
      return response.data;
    } catch (error) {
      console.error('Error fetching document history:', error);
      throw error;
    }
  },

  readFileAsBase64: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },
};

export default DatabaseService;