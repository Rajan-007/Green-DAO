"use client"
import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function Page() {
  // Mock loan data
  const mockLoanData = [
    { id: 1, farmerName: 'John Doe', loanAmount: 5000, status: 'Approved' },
    { id: 2, farmerName: 'Jane Smith', loanAmount: 7000, status: 'Pending' },
    { id: 3, farmerName: 'Alice Johnson', loanAmount: 4000, status: 'Rejected' },
    // Add more mock data as needed
  ];

  const [loanData, setLoanData] = useState(mockLoanData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);

  // Function to handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle sorting by loan amount
  const handleSort = () => {
    const sortedData = [...loanData];
    sortedData.sort((a, b) => a.loanAmount - b.loanAmount);
    setLoanData(sortedData);
    setSortBy('loanAmount');
  };

  // Filter and sort loan data based on search term and sorting criteria
  const filteredData = loanData.filter((loan) =>
    loan.farmerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortBy === 'loanAmount') {
    filteredData.sort((a, b) => a.loanAmount - b.loanAmount);
  }

  return (
    <div>
        <Navbar />
    <div className="container max-w-5xl mt-5 mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-md w-64 text-black focus:outline-none focus:border-blue-400"
          placeholder="Search by farmer name..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleSort}
        >
          Sort by Loan Amount
        </button>
      </div>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-800">
            <th className="py-3 px-6 text-left">Farmer Name</th>
            <th className="py-3 px-6 text-left">Loan Amount</th>
            <th className="py-3 px-6 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((loan) => (
            <tr key={loan.id} className="border-b border-gray-200">
              <td className="py-3 px-6">{loan.farmerName}</td>
              <td className="py-3 px-6">${loan.loanAmount}</td>
              <td className="py-3 px-6">{loan.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Page;
