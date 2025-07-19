import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { getUserBetHistory } from '../utils/apiService';

// Sample data (replace with API data)
const sampleUserData = {
  userId: 'USR001',
  betHistory: [
    { id: 'BET001', date: '2025-04-10', type: 'Sports', gameName: 'Football Match', selectGame: 'Team A vs Team B', amount: 100, outcome: 'Win', status: 'Settled', balanceAfterBet: 5100 },
    { id: 'BET002', date: '2025-04-09', type: 'Casino', gameName: 'Blackjack', selectGame: 'Table 5', amount: 50, outcome: 'Loss', status: 'Settled', balanceAfterBet: 4950 },
    { id: 'BET003', date: '2025-04-08', type: 'Sports', gameName: 'Basketball Game', selectGame: 'Team X vs Team Y', amount: 200, outcome: 'Pending', status: 'Open', balanceAfterBet: 4750 },
  ],
  depositHistory: [
    { id: 'DEP001', date: '2025-04-10', amount: 1000, method: 'PayPal', status: 'Completed' },
    { id: 'DEP002', date: '2025-04-09', amount: 500, method: 'Stripe', status: 'Completed' },
    { id: 'DEP003', date: '2025-04-08', amount: 200, method: 'Bank Transfer', status: 'Pending' },
  ],
  withdrawalHistory: [
    { id: 'WTH001', date: '2025-04-10', amount: 300, method: 'Bank Transfer', status: 'Completed' },
    { id: 'WTH002', date: '2025-04-09', amount: 200, method: 'PayPal', status: 'Processing' },
    { id: 'WTH003', date: '2025-04-08', amount: 100, method: 'USDT', status: 'Completed' },
  ],
  bankDetails: {
    bankName: 'Example Bank',
    accountNumber: '1234567890',
    accountHolder: 'John Doe',
    iban: 'XX12345678901234567890',
    swift: 'EXABUS33XXX',
  },
  usdtDetails: {
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    network: 'ERC20',
    lastUpdated: '2025-04-01',
  },
  transactionHistory: [
    { id: 'TRX001', date: '2025-04-10 14:30:00', type: 'Deposit', amount: 1000, method: 'PayPal', status: 'Completed' },
    { id: 'TRX002', date: '2025-04-09 10:15:00', type: 'Withdrawal', amount: 200, method: 'PayPal', status: 'Processing' },
    { id: 'TRX003', date: '2025-04-08 09:00:00', type: 'Bet', amount: 100, method: 'Sports', status: 'Settled' },
  ],
};

const UserDetails = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('betHistory');
let user = []
  const [userBetHisotry,setUserBetHistory]= useState([])
      const fetchBetHistory = async () => {
      try {
        const history = await getUserBetHistory(userId);
        setUserBetHistory(history?.data || []);
      } catch (error) {
        console.error('Error fetching bet history:', error);
      }
    };
    useEffect(() => {


    if (activeTab === 'betHistory') {
      fetchBetHistory();
    }
  }, [userId, activeTab]);

  return (
    <div className="card">
      <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
        <h5 className="mb-0">User Details: {userId}</h5>
        <Link to="/users" className="btn btn-sm btn-primary-600">
          <Icon icon="ep:arrow-left" className="me-1" /> Back to Users
        </Link>
      </div>
      <div className="card-body">
        {/* Tabs Navigation */}
        <ul className="nav nav-tabs mb-4" role="tablist">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'betHistory' ? 'active' : ''}`}
              onClick={() => setActiveTab('betHistory')}
            >
              Bet History
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'depositHistory' ? 'active' : ''}`}
              onClick={() => setActiveTab('depositHistory')}
            >
              Deposit History
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'withdrawalHistory' ? 'active' : ''}`}
              onClick={() => setActiveTab('withdrawalHistory')}
            >
              Withdrawal History
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'bankDetails' ? 'active' : ''}`}
              onClick={() => setActiveTab('bankDetails')}
            >
              Bank Details
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'usdtDetails' ? 'active' : ''}`}
              onClick={() => setActiveTab('usdtDetails')}
            >
              USDT Details
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'transactionHistory' ? 'active' : ''}`}
              onClick={() => setActiveTab('transactionHistory')}
            >
              Transaction History
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Bet History */}
          {activeTab === 'betHistory' && (
            <div className="table-responsive" style={{ overflowX: 'auto' }}>
              <table className="table bordered-table mb-0" style={{ minWidth: '1000px' }}>
                <thead>
                  <tr>
                    <th>Bet ID</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Game Name</th>
                    <th>Select Game</th>
                    <th>Amount</th>
                    <th>Outcome</th>
                    <th>Status</th>
                    <th>Balance After Bet</th>
                  </tr>
                </thead>
                <tbody>
                  {user?.betHistory?.length > 0 ? (
                    user?.betHistory?.map((bet) => (
                      <tr key={bet.id}>
                        <td>{bet.id}</td>
                        <td>{bet.date}</td>
                        <td>{bet.type}</td>
                        <td>{bet.gameName}</td>
                        <td>{bet.selectGame}</td>
                        <td>${bet.amount.toLocaleString()}</td>
                        <td>
                          <span
                            className={`px-2 py-1 rounded-pill text-sm ${
                              bet.outcome === 'Win'
                                ? 'bg-success-focus text-success-main'
                                : bet.outcome === 'Loss'
                                ? 'bg-danger-focus text-danger-main'
                                : 'bg-warning-focus text-warning-main'
                            }`}
                          >
                            {bet.outcome}
                          </span>
                        </td>
                        <td>{bet.status}</td>
                        <td>${bet.balanceAfterBet.toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No bet history available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Deposit History */}
          {activeTab === 'depositHistory' && (
            <div className="table-responsive" style={{ overflowX: 'auto' }}>
              <table className="table bordered-table mb-0" style={{ minWidth: '800px' }}>
                <thead>
                  <tr>
                    <th>Deposit ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {user.depositHistory.length > 0 ? (
                    user.depositHistory.map((deposit) => (
                      <tr key={deposit.id}>
                        <td>{deposit.id}</td>
                        <td>{deposit.date}</td>
                        <td>${deposit.amount.toLocaleString()}</td>
                        <td>{deposit.method}</td>
                        <td>
                          <span
                            className={`px-2 py-1 rounded-pill text-sm ${
                              deposit.status === 'Completed'
                                ? 'bg-success-focus text-success-main'
                                : 'bg-warning-focus text-warning-main'
                            }`}
                          >
                            {deposit.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No deposit history available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Withdrawal History */}
          {activeTab === 'withdrawalHistory' && (
            <div className="table-responsive" style={{ overflowX: 'auto' }}>
              <table className="table bordered-table mb-0" style={{ minWidth: '800px' }}>
                <thead>
                  <tr>
                    <th>Withdrawal ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {user.withdrawalHistory.length > 0 ? (
                    user.withdrawalHistory.map((withdrawal) => (
                      <tr key={withdrawal.id}>
                        <td>{withdrawal.id}</td>
                        <td>{withdrawal.date}</td>
                        <td>${withdrawal.amount.toLocaleString()}</td>
                        <td>{withdrawal.method}</td>
                        <td>
                          <span
                            className={`px-2 py-1 rounded-pill text-sm ${
                              withdrawal.status === 'Completed'
                                ? 'bg-success-focus text-success-main'
                                : withdrawal.status === 'Processing'
                                ? 'bg-warning-focus text-warning-main'
                                : 'bg-danger-focus text-danger-main'
                            }`}
                          >
                            {withdrawal.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No withdrawal history available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Bank Details */}
          {activeTab === 'bankDetails' && (
            <div className="p-3 bg-base rounded">
              <h6 className="mb-3">Bank Details</h6>
              <dl className="row mb-0">
                <dt className="col-sm-4">Bank Name</dt>
                <dd className="col-sm-8">{user.bankDetails.bankName || 'N/A'}</dd>
                <dt className="col-sm-4">Account Number</dt>
                <dd className="col-sm-8">{user.bankDetails.accountNumber || 'N/A'}</dd>
                <dt className="col-sm-4">Account Holder</dt>
                <dd className="col-sm-8">{user.bankDetails.accountHolder || 'N/A'}</dd>
                <dt className="col-sm-4">IBAN</dt>
                <dd className="col-sm-8">{user.bankDetails.iban || 'N/A'}</dd>
                <dt className="col-sm-4">SWIFT</dt>
                <dd className="col-sm-8">{user.bankDetails.swift || 'N/A'}</dd>
              </dl>
            </div>
          )}

          {/* USDT Details */}
          {activeTab === 'usdtDetails' && (
            <div className="p-3 bg-base rounded">
              <h6 className="mb-3">USDT Details</h6>
              <dl className="row mb-0">
                <dt className="col-sm-4">Wallet Address</dt>
                <dd className="col-sm-8">{user.usdtDetails.walletAddress || 'N/A'}</dd>
                <dt className="col-sm-4">Network</dt>
                <dd className="col-sm-8">{user.usdtDetails.network || 'N/A'}</dd>
                <dt className="col-sm-4">Last Updated</dt>
                <dd className="col-sm-8">{user.usdtDetails.lastUpdated || 'N/A'}</dd>
              </dl>
            </div>
          )}

          {/* Transaction History */}
          {activeTab === 'transactionHistory' && (
            <div className="table-responsive" style={{ overflowX: 'auto' }}>
              <table className="table bordered-table mb-0" style={{ minWidth: '800px' }}>
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Date & Time</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {user.transactionHistory.length > 0 ? (
                    user.transactionHistory.map((transaction) => (
                      <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.date}</td>
                        <td>{transaction.type}</td>
                        <td>${transaction.amount.toLocaleString()}</td>
                        <td>{transaction.method}</td>
                        <td>
                          <span
                            className={`px-2 py-1 rounded-pill text-sm ${
                              transaction.status === 'Completed'
                                ? 'bg-success-focus text-success-main'
                                : transaction.status === 'Processing'
                                ? 'bg-warning-focus text-warning-main'
                                : 'bg-danger-focus text-danger-main'
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No transaction history available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;