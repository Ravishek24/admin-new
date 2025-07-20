import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { 
  getUserBetHistory, 
  getUserDepositHistory, 
  getUserWithdrawalHistory, 
  getUserBankDetails, 
  getUserTransactionHistory 
} from '../utils/apiService';
  const transactionTypes = [
    { value: '', label: 'All Types' },
    { value: 'deposit', label: 'Deposit' },
    { value: 'withdrawal', label: 'Withdrawal' },
    { value: 'admin_credit', label: 'Admin Credit' },
    { value: 'admin_debit', label: 'Admin Debit' },
    { value: 'game_win', label: 'Game Win' },
    { value: 'game_loss', label: 'Game Loss' },
    { value: 'gift_code', label: 'Gift Code' },
    { value: 'referral_bonus', label: 'Referral Bonus' },
    { value: 'rebate', label: 'Rebate' },
    { value: 'vip_reward', label: 'VIP Reward' },
    { value: 'transfer_in', label: 'Transfer In' },
    { value: 'transfer_out', label: 'Transfer Out' },
    { value: 'refund', label: 'Refund' }
  ];
const UserDetails = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('betHistory');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State for each data type
  const [betHistory, setBetHistory] = useState([]);
  const [depositHistory, setDepositHistory] = useState([]);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [bankDetails, setBankDetails] = useState({});
  const [transactionHistory, setTransactionHistory] = useState([]);

  // Pagination state for each tab
  const [pagination, setPagination] = useState({
    betHistory: { page: 1, limit: 50, total: 0, totalPages: 0, hasNextPage: false, hasPrevPage: false },
    depositHistory: { page: 1, limit: 50, total: 0, totalPages: 0, hasNextPage: false, hasPrevPage: false },
    withdrawalHistory: { page: 1, limit: 50, total: 0, totalPages: 0, hasNextPage: false, hasPrevPage: false },
    transactionHistory: { page: 1, limit: 50, total: 0, totalPages: 0, hasNextPage: false, hasPrevPage: false }
  });

  // Date range for API calls
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });

  // Get current pagination for active tab
  const getCurrentPagination = () => {
    if (activeTab === 'bankDetails') return null;
    return pagination[activeTab];
  };

  // Update pagination for specific tab
  const updatePagination = (tab, paginationData) => {
    setPagination(prev => ({
      ...prev,
      [tab]: { ...prev[tab], ...paginationData }
    }));
  };

  // Change page for current tab
  const handlePageChange = (newPage) => {
    if (activeTab === 'bankDetails') return;
    
    updatePagination(activeTab, { page: newPage });
  };

  // API fetch functions with pagination
  const fetchBetHistory = async (page = pagination.betHistory.page) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserBetHistory(userId, dateRange.startDate, dateRange.endDate, page, pagination.betHistory.limit);
      setBetHistory(response?.data || []);
      if (response?.pagination) {
        updatePagination('betHistory', response.pagination);
      }
    } catch (error) {
      console.error('Error fetching bet history:', error);
      setError('Failed to fetch bet history');
    } finally {
      setLoading(false);
    }
  };

  const fetchDepositHistory = async (page = pagination.depositHistory.page) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserDepositHistory(userId, dateRange.startDate, dateRange.endDate, page, pagination.depositHistory.limit);
      setDepositHistory(response?.data || []);
      if (response?.pagination) {
        updatePagination('depositHistory', response.pagination);
      }
    } catch (error) {
      console.error('Error fetching deposit history:', error);
      setError('Failed to fetch deposit history');
    } finally {
      setLoading(false);
    }
  };

  const fetchWithdrawalHistory = async (page = pagination.withdrawalHistory.page) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserWithdrawalHistory(userId, dateRange.startDate, dateRange.endDate, page, pagination.withdrawalHistory.limit);
      setWithdrawalHistory(response?.data || []);
      if (response?.pagination) {
        updatePagination('withdrawalHistory', response.pagination);
      }
    } catch (error) {
      console.error('Error fetching withdrawal history:', error);
      setError('Failed to fetch withdrawal history');
    } finally {
      setLoading(false);
    }
  };

  const fetchBankDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserBankDetails(userId);
      setBankDetails(response?.data || {});
    } catch (error) {
      console.error('Error fetching bank details:', error);
      setError('Failed to fetch bank details');
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionHistory = async (page = pagination.transactionHistory.page) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserTransactionHistory(userId, page, pagination.transactionHistory.limit);
      setTransactionHistory(response?.data || []);
      if (response?.pagination) {
        updatePagination('transactionHistory', response.pagination);
      }
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      setError('Failed to fetch transaction history');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data based on active tab
  useEffect(() => {
    if (!userId) return;

    switch (activeTab) {
      case 'betHistory':
        fetchBetHistory();
        break;
      case 'depositHistory':
        fetchDepositHistory();
        break;
      case 'withdrawalHistory':
        fetchWithdrawalHistory();
        break;
      case 'bankDetails':
        fetchBankDetails();
        break;
      case 'transactionHistory':
        fetchTransactionHistory();
        break;
      default:
        break;
    }
  }, [userId, activeTab, dateRange]);

  // Handle pagination changes
  useEffect(() => {
    if (!userId || activeTab === 'bankDetails') return;

    const currentPage = pagination[activeTab]?.page;
    if (currentPage > 1) {
      switch (activeTab) {
        case 'betHistory':
          fetchBetHistory(currentPage);
          break;
        case 'depositHistory':
          fetchDepositHistory(currentPage);
          break;
        case 'withdrawalHistory':
          fetchWithdrawalHistory(currentPage);
          break;
        case 'transactionHistory':
          fetchTransactionHistory(currentPage);
          break;
        default:
          break;
      }
    }
  }, [pagination.betHistory.page, pagination.depositHistory.page, pagination.withdrawalHistory.page, pagination.transactionHistory.page]);

  // Loading component
  const LoadingSpinner = () => (
    <div className="text-center py-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  // Error component
  const ErrorMessage = () => (
    <div className="alert alert-danger text-center" role="alert">
      {error}
    </div>
  );

  // Pagination component
  const PaginationComponent = () => {
    const currentPagination = getCurrentPagination();
    if (!currentPagination || currentPagination.totalPages <= 1) return null;

    const { page, totalPages, hasNextPage, hasPrevPage, total, limit } = currentPagination;
    
    // Calculate page numbers to show
    const getPageNumbers = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
        range.push(i);
      }

      if (page - delta > 2) {
        rangeWithDots.push(1, '...');
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (page + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages);
      } else {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    const startItem = (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, total);

    return (
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="text-muted">
          Showing {startItem} to {endItem} of {total} entries
        </div>
        <nav aria-label="Page navigation">
          <ul className="pagination mb-0">
            <li className={`page-item ${!hasPrevPage ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(page - 1)}
                disabled={!hasPrevPage}
              >
                <Icon icon="ep:arrow-left" className="me-1" />
                Previous
              </button>
            </li>
            
            {getPageNumbers().map((pageNum, index) => (
              <li key={index} className={`page-item ${pageNum === page ? 'active' : ''} ${pageNum === '...' ? 'disabled' : ''}`}>
                {pageNum === '...' ? (
                  <span className="page-link">...</span>
                ) : (
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                )}
              </li>
            ))}
            
            <li className={`page-item ${!hasNextPage ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(page + 1)}
                disabled={!hasNextPage}
              >
                Next
                <Icon icon="ep:arrow-right" className="ms-1" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  };

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
              className={`nav-link ${activeTab === 'transactionHistory' ? 'active' : ''}`}
              onClick={() => setActiveTab('transactionHistory')}
            >
              Transaction History
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content">
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage />}

          {/* Bet History */}
          {activeTab === 'betHistory' && !loading && !error && (
            <>
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
                    {betHistory?.length > 0 ? (
                      betHistory.map((bet) => (
                        <tr key={bet.bet_id}>
                          <td>{bet.bet_id}</td>
                          <td>{bet.created_at}</td>
                          <td>{bet.type}</td>
                          <td>{bet.game_type}</td>
                          <td>{bet.game_type}</td>
                          <td>{Number(bet.bet_amount).toFixed(2)}</td>
                          <td>
                            <span
                              className={`px-2 py-1 rounded-pill text-sm ${
                                bet.outcome === 'win'
                                  ? 'bg-success-focus text-success-main'
                                  : bet.outcome === 'lost'
                                  ? 'bg-danger-focus text-danger-main'
                                  : 'bg-warning-focus text-warning-main'
                              }`}
                            >
                              {Number(bet.win_amount).toFixed(2)}
                            </span>
                          </td>
                          <td>{bet.status}</td>
                          <td>{Number(bet.wallet_balance_after)}</td>
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
              <PaginationComponent />
            </>
          )}

          {/* Deposit History */}
          {activeTab === 'depositHistory' && !loading && !error && (
            <>
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
                    {depositHistory?.length > 0 ? (
                      depositHistory.map((deposit) => (
                        <tr key={deposit.deposit_id}>
                          <td>{deposit.deposit_id}</td>
                          <td>{deposit.date}</td>
                          <td>{Number(deposit.amount).toFixed(2)}</td>
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
              <PaginationComponent />
            </>
          )}

          {/* Withdrawal History */}
          {activeTab === 'withdrawalHistory' && !loading && !error && (
            <>
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
                    {withdrawalHistory?.length > 0 ? (
                      withdrawalHistory.map((withdrawal) => (
                        <tr key={withdrawal.withdrawal_id}>
                          <td>{withdrawal.withdrawal_id}</td>
                          <td>{withdrawal.date}</td>
                          <td>{Number(withdrawal.amount).toFixed(2)}</td>
                          <td>{withdrawal.method}</td>
                          <td>
                            <span
                              className={`px-2 py-1 rounded-pill text-sm ${
                                withdrawal.status === 'completed'
                                  ? 'bg-success-focus text-success-main'
                                  : withdrawal.status === 'pending'
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
              <PaginationComponent />
            </>
          )}

          {/* Bank Details */}
   {activeTab === 'bankDetails' && !loading && !error && (
            <div>
              {/* Bank Accounts Section */}
              <div className="p-3 bg-base rounded mb-4">
                <h6 className="mb-3">Bank Accounts</h6>
                {bankDetails?.bank_accounts?.length > 0 ? (
                  <div className="row">
                    {bankDetails.bank_accounts.map((account, index) => (
                      <div key={account.account_id} className="col-md-6 mb-3">
                        <div className="card border">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h6 className="card-title mb-0">Account #{index + 1}</h6>
                              {account.is_primary && (
                                <span className="badge bg-primary">Primary</span>
                              )}
                            </div>
                            <dl className="row mb-0">
                              <dt className="col-sm-5">Bank Name</dt>
                              <dd className="col-sm-7">{account.bank_name || 'N/A'}</dd>
                              <dt className="col-sm-5">Account Number</dt>
                              <dd className="col-sm-7">{account.account_number || 'N/A'}</dd>
                              <dt className="col-sm-5">Account Holder</dt>
                              <dd className="col-sm-7">{account.account_holder || 'N/A'}</dd>
                              <dt className="col-sm-5">IFSC Code</dt>
                              <dd className="col-sm-7">{account.ifsc_code || 'N/A'}</dd>
                              <dt className="col-sm-5">Created At</dt>
                              <dd className="col-sm-7">
                                {account.created_at ? new Date(account.created_at).toLocaleDateString() : 'N/A'}
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted py-3">
                    No bank accounts found
                  </div>
                )}
              </div>

              {/* USDT Accounts Section */}
              <div className="p-3 bg-base rounded">
                <h6 className="mb-3">USDT Accounts</h6>
                {bankDetails?.usdt_accounts?.length > 0 ? (
                  <div className="row">
                    {bankDetails.usdt_accounts.map((account, index) => (
                      <div key={account.account_id} className="col-md-6 mb-3">
                        <div className="card border">
                          <div className="card-body">
                            <h6 className="card-title mb-3">USDT Account #{index + 1}</h6>
                            <dl className="row mb-0">
                              <dt className="col-sm-4">Network</dt>
                              <dd className="col-sm-8">
                                <span className="badge bg-info">{account.network || 'N/A'}</span>
                              </dd>
                              <dt className="col-sm-4">Address</dt>
                              <dd className="col-sm-8">
                                <code className="text-break">{account.address || 'N/A'}</code>
                              </dd>
                              <dt className="col-sm-4">Remark</dt>
                              <dd className="col-sm-8">{account.remark || 'N/A'}</dd>
                              <dt className="col-sm-4">Created At</dt>
                              <dd className="col-sm-8">
                                {account.created_at ? new Date(account.created_at).toLocaleDateString() : 'N/A'}
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted py-3">
                    No USDT accounts found
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Transaction History */}
          {activeTab === 'transactionHistory' && !loading && !error && (
            <>
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
                    {transactionHistory?.length > 0 ? (
                      transactionHistory.map((transaction) => (
                        <tr key={transaction.transaction_id}>
                          <td>{transaction.transaction_id}</td>
                          <td>{transaction.date}</td>
                          <td>{transaction.type}</td>
                          <td>{Number(transaction.amount).toFixed(2)}</td>
                          <td>{transaction.method}</td>
                          <td>
                            <span
                              className={`px-2 py-1 rounded-pill text-sm ${
                                transaction.status === 'completed'
                                  ? 'bg-success-focus text-success-main'
                                  : transaction.status === 'pending'
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
              <PaginationComponent />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;