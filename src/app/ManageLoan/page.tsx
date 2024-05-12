"use client"
import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loanData, setLoanData] = useState(null);
  const [error, setError] = useState(null);
  const mockLoanData = [
    { id: 1, farmerName: 'John Doe', loanAmount: 5000, status: 'Approved' },
    { id: 2, farmerName: 'Jane Smith', loanAmount: 7000, status: 'Pending' },
    { id: 3, farmerName: 'Alice Johnson', loanAmount: 4000, status: 'Rejected' },
    // Add more mock data as needed
  ];
  // Function to handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to fetch loan data based on wallet address
  const fetchLoanData = async () => {
   console.log("hello")
  };

  // Function to handle form submission (search)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    fetchLoanData(); // Fetch loan data based on search term
  };

  return (
    <div className=''>
        <Navbar/>
    <div className="container max-w-5xl mt-5 mx-auto ">
      <div className="flex justify-center items-center mb-6">
        <input
          type="text"
          placeholder="Enter farmer's wallet address..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-md text-black w-64 focus:outline-none focus:border-blue-400"
        />
        <button
        onClick={handleSubmit}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Search
        </button>
      </div>

      {loanData && (
        <div>
          <h2 className="text-lg font-bold mb-4">Loan Data</h2>
          <ul>
            {mockLoanData.map((loan) => (
              <li key={loan.id}>
                <strong>Loan Amount:</strong> ${loan.loanAmount}, <strong>Status:</strong> {loan.status}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
    </div>
  );
}

export default Page;
