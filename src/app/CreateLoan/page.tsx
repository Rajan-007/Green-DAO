"use client"
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { uploadFileToPinata, uploadJSONToPinata, viewIPFSData } from '../../../config/PintoIPFS';

function FarmerLoanForm() {
  const [formData, setFormData] = useState({
    farmerName: '',
    loanAmount: '',
    loanReason: '',
    latitude: '',
    longitude: '',
    loanDocument: '' ,
    ipfs: ''
  });
  const [fileInputKey, setFileInputKey] = useState(0);

   
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const ipfsfile = await uploadFileToPinata(file)
    const formdata = {
        "farmerName": formData.farmerName,
        "loanAmount": formData.loanAmount,
        "loanReason": formData.loanReason,
        "latitude": formData.latitude,
        "longitude": formData.longitude,
        "ipfs": ipfsfile?.IpfsHash,
    }
    const ipfs = await uploadJSONToPinata(formdata)
    console.log("ipfs", ipfs?.IpfsHash)
    setFormData({
        ...formData,
        ipfs: ipfs?.IpfsHash
    })
    setFormData({
      ...formData,
      loanDocument: file
    });
  };

  
  //
  const handleFileRemove = () => {  
    setFormData({
      ...formData,
      loanDocument: null
    });
    
    setFileInputKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white text-black rounded-lg shadow-xl">

        <h2 className="text-xl font-semibold mb-4">Farmer Loan Application</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="farmerName" className="block text-sm   font-medium text-gray-600">Farmer Name</label>
            <input
              type="text"
              id="farmerName"
              className="w-full border border-gray-600 rounded-md h-10 focus:outline-none px-1 text-lg "
              onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-600">Loan Amount</label>
            <input
              type="number"
              id="loanAmount"
              className="w-full border border-gray-600 rounded-md h-10 focus:outline-none px-1 text-lg "
              
              onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="loanReason" className="block text-sm font-medium text-gray-600">Reason for Loan</label>
            <textarea
              id="loanReason"
              className="w-full border border-gray-600 rounded-md h-10 pt-1 focus:outline-none px-1 text-lg "
              rows="3"
              onChange={(e) => setFormData({ ...formData, loanReason: e.target.value })}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-600">Location (Latitude, Longitude)</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                id="latitude"
                className="w-full border border-gray-600 rounded-md h-10 focus:outline-none px-1 text-lg "
                placeholder="Latitude"
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                required
              />
              <input
                type="number"
                id="longitude"
                className="w-full border border-gray-600 rounded-md h-10 focus:outline-none px-1 text-lg "
              
                placeholder="Longitude"
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="loanDocument" className="block text-sm font-medium text-gray-600">Loan Document (Upload)</label>
            <div className="flex items-center space-x-2">
              {formData.loanDocument ? (
                <div className="flex items-center space-x-2">
                  <span className='pt-3'>{formData.loanDocument.name}</span>
                  <button
                    type="button"
                    className="text-red-600 pt-3 hover:text-red-800"
                    onClick={handleFileRemove}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <input
                    key={fileInputKey}
                    type="file"
                    id="loanDocument"
                    className="hidden "
                    onChange={handleFileChange}
                  />
                  <label htmlFor="loanDocument" className="input-style mt-2 cursor-pointer border border-gray-300 rounded-md px-4 py-2 flex items-center space-x-2">
                    <span>Upload Document</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5  w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a1 1 0 0 1 1 1v6a1 1 0 0 0 2 0V3a3 3 0 0 0-3-3 3 3 0 0 0-3 3v6a1 1 0 0 0 2 0V3a1 1 0 0 1 1-1zM8 11a1 1 0 0 1-1 1H5a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3h-2a1 1 0 0 1-1-1v-.379a2 2 0 0 1 2-2c.73 0 1.353.4 1.723 1H18a5 5 0 0 0-5-5h-2.414A2 2 0 0 1 8 8.62V11z" clipRule="evenodd" />
                    </svg>
                  </label>
                </>
              )}
            </div>
          </div>

          
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default FarmerLoanForm;
