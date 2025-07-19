import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react';
import { createGiftCode, getGiftCode, getGiftCodeClaimedUser } from '../utils/apiService';
import Pagination from './comman/Pagination';

// Sample gift claim history data (replace with API data)
const sampleClaimHistory = [
  {
    userId: 'USR001',
    mobile: '+1234567890',
    claimIp: '192.168.1.1',
    claimedTime: '2025-04-13 10:30:00',
    claimAmount: 10,
  },
  {
    userId: 'USR002',
    mobile: '+1234567891',
    claimIp: '192.168.1.2',
    claimedTime: '2025-04-13 09:15:00',
    claimAmount: 10,
  },
  {
    userId: 'USR003',
    mobile: '+1234567892',
    claimIp: '192.168.1.3',
    claimedTime: '2025-04-12 14:45:00',
    claimAmount: 10,
  },
];

// Sample gift code history data (replace with API data)
const sampleGiftCodeHistory = [
  {
    code: 'GIFT-ABC123',
    amount: 10,
    userCount: 100,
    generatedTime: '2025-04-13 08:00:00',
  },
  {
    code: 'GIFT-XYZ789',
    amount: 20,
    userCount: 50,
    generatedTime: '2025-04-12 12:30:00',
  },
];

const InvoicePreviewLayer = () => {
  // State for gift creation form
  const [giftAmount, setGiftAmount] = useState('');
  const [userCount, setUserCount] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [formError, setFormError] = useState('');

  // State for claim history table
  const [giftCodeHistory, setGiftCodeHistory] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'claimedTime', direction: 'desc' });
  const [giftSortConfig, setGiftSortConfig] = useState({ key: 'generatedTime', direction: 'desc' });
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    records_per_page: 20,
    total_records: 0,
  });
  const [selectedGiftCode, setSelectedGiftCode] = useState(null);
  const [claimHistory, setClaimHistory] = useState([]);
  const [claimPagination, setClaimPagination] = useState({
    current_page: 1,
    total_pages: 1,
    records_per_page: 20,
    total_records: 0,
  });

  // State for active tab
  const [activeTab, setActiveTab] = useState('history');

  const fetchGiftHistory = async (page = 1) => {
    let data = await getGiftCode(page)
    setGiftCodeHistory(data?.data?.gift_codes);
    setPagination(data?.data?.pagination)
  }
  const fetchClaimHistory = async (code, page = 1) => {
    try {
      const data = await getGiftCodeClaimedUser(code, page);
       console.log(data);
       
      setClaimHistory(data?.data || []);
      // setClaimPagination(data.pagination || {});
    } catch (error) {
      console.error("Error fetching claim history:", error);
    }
  };
  useEffect(() => {
    fetchGiftHistory(pagination.current_page);
  }, [pagination.current_page]);
  useEffect(() => {
  if (activeTab === 'claimHistory' && selectedGiftCode) {
    fetchClaimHistory(selectedGiftCode, claimPagination.current_page);
  }
}, [claimPagination.current_page]);

  // Handle gift code creation
  const handleCreateGift = async (e) => {
    e.preventDefault();
    setFormError('');

    const amount = parseFloat(giftAmount);
    const users = parseInt(userCount);

    if (!amount || !users || amount <= 0 || users <= 0) {
      setFormError('Please enter valid positive numbers for both fields.');
      return;
    }

    try {
      const result = await createGiftCode(users, amount);
      setGiftAmount('');
      setUserCount('');
      fetchGiftHistory(1)
    } catch (error) {
      setFormError(error.response?.data?.message || 'Something went wrong.');
    }
  };

  // Handle copy code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.write(generatedCode);
    alert('Gift code copied to clipboard!');
  };

  // Sorting function
  const sortData = (data, key, direction) => {
    return [...data].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      // Handle date sorting
      if (key === 'claimedTime' || key === 'generatedTime') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  // Handle sorting for claim history
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  // Handle sorting for gift code history
  const handleGiftSort = (key) => {
    setGiftSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  // Sorted data
  // const sortedClaimHistory = sortData(claimHistory, sortConfig.key, sortConfig.direction);
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Gift Management</h5>
      </div>
      <div className="card-body py-4">
        <div className="row">
          {/* Create Gift Code Section */}
          <div className="col-lg-6 mb-4">
            <div className="p-4 bg-base rounded shadow-4">
              <h6 className="mb-3">Create Gift Code</h6>
              <form onSubmit={handleCreateGift}>
                <div className="mb-3">
                  <label className="form-label">Gift Amount (INR)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={giftAmount}
                    onChange={(e) => setGiftAmount(e.target.value)}
                    placeholder="e.g., 10"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Number of Users</label>
                  <input
                    type="number"
                    className="form-control"
                    value={userCount}
                    onChange={(e) => setUserCount(e.target.value)}
                    placeholder="e.g., 100"
                    min="1"
                    required
                  />
                </div>
                {formError && (
                  <div className="alert alert-danger py-2" role="alert">
                    {formError}
                  </div>
                )}
                <button type="submit" className="btn btn-primary-600 radius-8">
                  <Icon icon="ri:gift-line" className="me-1" />
                  Generate Gift Code
                </button>
              </form>
              {generatedCode && (
                <div className="mt-4">
                  <h6>Generated Code:</h6>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={generatedCode}
                      readOnly
                    />
                    <button
                      className="btn btn-success-600"
                      onClick={handleCopyCode}
                    >
                      <Icon icon="mdi:content-copy" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tabs and History Section */}
          <div className="col-lg-12">
            <div className="p-4 bg-base rounded shadow-4">
              {/* Tab Navigation */}
              <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'claimHistory' ? 'active' : ''}`}
                    onClick={() => setActiveTab('claimHistory')}
                  >
                    Gift Claim History
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
                    onClick={() => setActiveTab('history')}
                  >
                    History
                  </button>
                </li>
              </ul>

              {/* Tab Content */}
              {activeTab === 'claimHistory' && (
                <div>
                  <h6 className="mb-3">Gift Claim History</h6>
                  <div className="table-responsive" style={{ overflowX: 'auto' }}>
                    <table className="table bordered-table mb-0" style={{ minWidth: '800px' }}>
                      <thead>
                        <tr>
                          <th
                            className="cursor-pointer"
                            onClick={() => handleSort('userId')}
                          >
                            User ID
                            {sortConfig.key === 'userId' && (
                              <Icon
                                icon={
                                  sortConfig.direction === 'asc'
                                    ? 'bxs:up-arrow'
                                    : 'bxs:down-arrow'
                                }
                                className="text-xs ms-1"
                              />
                            )}
                          </th>
                          <th
                            className="cursor-pointer"
                            onClick={() => handleSort('mobile')}
                          >
                            Mobile Number
                            {sortConfig.key === 'mobile' && (
                              <Icon
                                icon={
                                  sortConfig.direction === 'asc'
                                    ? 'bxs:up-arrow'
                                    : 'bxs:down-arrow'
                                }
                                className="text-xs ms-1"
                              />
                            )}
                          </th>
                          <th
                            className="cursor-pointer"
                            onClick={() => handleSort('claimIp')}
                          >
                            Claim IP
                            {sortConfig.key === 'claimIp' && (
                              <Icon
                                icon={
                                  sortConfig.direction === 'asc'
                                    ? 'bxs:up-arrow'
                                    : 'bxs:down-arrow'
                                }
                                className="text-xs ms-1"
                              />
                            )}
                          </th>
                          <th
                            className="cursor-pointer"
                            onClick={() => handleSort('claimedTime')}
                          >
                            Claimed Time
                            {sortConfig.key === 'claimedTime' && (
                              <Icon
                                icon={
                                  sortConfig.direction === 'asc'
                                    ? 'bxs:up-arrow'
                                    : 'bxs:down-arrow'
                                }
                                className="text-xs ms-1"
                              />
                            )}
                          </th>
                          <th
                            className="cursor-pointer"
                            onClick={() => handleSort('claimAmount')}
                          >
                            Claim Amount (INR)
                            {sortConfig.key === 'claimAmount' && (
                              <Icon
                                icon={
                                  sortConfig.direction === 'asc'
                                    ? 'bxs:up-arrow'
                                    : 'bxs:down-arrow'
                                }
                                className="text-xs ms-1"
                              />
                            )}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {claimHistory?.claimants?.length > 0 ? (
                          claimHistory?.claimants.map((claim, index) => (
                            <tr key={index}>
                              <td>{claim.user_id}</td>
                              <td>{claim.phone_no}</td>
                              <td>{claim.claimed_ip ?? "-"}</td>
                              <td>{claim.claimed_at.toLocaleString()}</td>
                              <td>₹{claimHistory?.total_amount}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center">
                              No gift claims found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div>
                  <h6 className="mb-3">Gift Code Generation History</h6>
                  <div className="table-responsive" style={{ overflowX: 'auto', maxHeight: '400px' }}>
                    <table className="table bordered-table mb-0" style={{ minWidth: '600px' }}>
                      <thead>
                        <tr>
                          <th
                            className="cursor-pointer"
                            onClick={() => handleGiftSort('code')}
                          >
                            Gift Code
                            {giftSortConfig.key === 'code' && (
                              <Icon
                                icon={
                                  giftSortConfig.direction === 'asc'
                                    ? 'bxs:up-arrow'
                                    : 'bxs:down-arrow'
                                }
                                className="text-xs ms-1"
                              />
                            )}
                          </th>
                          <th
                            className="cursor-pointer"
                            onClick={() => handleGiftSort('amount')}
                          >
                            Amount (INR)
                            {giftSortConfig.key === 'amount' && (
                              <Icon
                                icon={
                                  giftSortConfig.direction === 'asc'
                                    ? 'bxs:up-arrow'
                                    : 'bxs:down-arrow'
                                }
                                className="text-xs ms-1"
                              />
                            )}
                          </th>
                          <th
                            className="cursor-pointer"
                            onClick={() => handleGiftSort('userCount')}
                          >
                            Number of Users
                            {/* {giftSortConfig.key === 'userCount' && (
                              <Icon
                                icon={
                                  giftSortConfig.direction === 'asc'
                                    ? 'bxs:up-arrow'
                                    : 'bxs:down-arrow'
                                }
                                className="text-xs ms-1"
                              />
                            )} */}
                          </th>
                          <th>
                            Claimed
                          </th>
                          <th
                            className="cursor-pointer"
                            onClick={() => handleGiftSort('generatedTime')}
                          >
                            Generated Time
                            {giftSortConfig.key === 'generatedTime' && (
                              <Icon
                                icon={
                                  giftSortConfig.direction === 'asc'
                                    ? 'bxs:up-arrow'
                                    : 'bxs:down-arrow'
                                }
                                className="text-xs ms-1"
                              />
                            )}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {giftCodeHistory.length > 0 ? (
                          giftCodeHistory.map((gift, index) => (
                            <tr key={index}
                              onClick={() => {
                                setSelectedGiftCode(gift.code);
                                setActiveTab('claimHistory');
                                setClaimPagination((prev) => ({ ...prev, current_page: 1 }));
                                fetchClaimHistory(gift.code, 1);
                                
                              }}
                              style={{cursor:'pointer'}}
                            >
                              <td>{gift.code}</td>
                              <td>₹{String(gift.amount_per_user).toLocaleString()}</td>
                              <td>{gift.max_claims}</td>
                              <td>{gift.claimed_count}</td>
                              <td>{gift.created_at}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No gift codes generated
                            </td>
                          </tr>
                        )}
                        <Pagination
                          pagination={{
                            page: pagination.current_page,
                            pages: pagination.total_pages,
                            limit: pagination.records_per_page,
                            total: pagination.total_records,
                          }}
                          onPageChange={(newPage) =>
                            setPagination((prev) => ({ ...prev, current_page: newPage }))
                          }
                        />
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreviewLayer;