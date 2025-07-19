import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getPendingWithDrawals, processWithdrawal } from "../../utils/apiService";

// Mock data for demonstration
// const withdrawRequests = [
//   {
//     userId: "USR001",
//     mobileNumber: "+91 9876543210",
//     orderId: "WD12345",
//     withdrawType: "USDT",
//     appliedAmount: "100 USDT",
//     balanceAfterWithdraw: "50 USDT",
//     totalRechargeAmount: "200 USDT",
//     totalWithdrawAmount: "150 USDT",
//     bankName: "",
//     accountNumber: "",
//     ifscCode: "",
//     usdtNetwork: "TRC20",
//     usdtAddress: "TX123456789",
//     addressAlias: "Wallet1",
//     applyDateTime: "2025-04-14 10:30 AM",
//   },
//   {
//     userId: "USR002",
//     mobileNumber: "+91 8765432109",
//     orderId: "WD12346",
//     withdrawType: "Bank",
//     appliedAmount: "₹5000",
//     balanceAfterWithdraw: "₹10000",
//     totalRechargeAmount: "₹20000",
//     totalWithdrawAmount: "₹15000",
//     bankName: "HDFC Bank",
//     accountNumber: "123456789012",
//     ifscCode: "HDFC0001234",
//     usdtNetwork: "",
//     usdtAddress: "",
//     addressAlias: "",
//     applyDateTime: "2025-04-14 11:00 AM",
//   },
// ];

// Mock gateway list
const gateways = ["Paytm", "Razorpay", "Coinbase", "Bank Transfer"];

const NewWithdraw = () => {
  const [withdraws, setWithdraws] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0
  });
  const [loading, setLoading] = useState(true);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedGateway, setSelectedGateway] = useState("");
  const [rejectRemark, setRejectRemark] = useState("");
  const navigate = useNavigate();

  const fetchWithdrawals = async (page = 1) => {
    setLoading(true);
    try {
      const data = await getPendingWithDrawals(page, pagination.limit);
      console.log('API Response:', data);

      if (data.success) {
        setWithdraws(data.withdrawals);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching withdrawals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals(1);
  }, []);

  // Mount modal container to body
  useEffect(() => {
    const modalContainer = document.createElement("div");
    modalContainer.id = "modal-root";
    document.body.appendChild(modalContainer);
    console.log("Modal container mounted to body");
    return () => {
      document.body.removeChild(modalContainer);
    };


  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchWithdrawals(newPage);
    }
  };

  const handleLimitChange = (newLimit) => {
    setPagination(prev => ({ ...prev, limit: newLimit, page: 1 }));
    fetchWithdrawals(1);
  };

  // Open Modals
  const openAcceptModal = (orderId) => {
    setSelectedOrderId(orderId);
    setSelectedGateway("");
    setIsAcceptModalOpen(true);
  };

  const openRejectModal = (orderId) => {
    setSelectedOrderId(orderId);
    setRejectRemark("");
    setIsRejectModalOpen(true);
  };

  // Handle Gateway Selection
  const handleGatewaySelect = () => {
    if (!selectedGateway) {
      alert("Please select a gateway.");
      return;
    }
    console.log(
      `Accepted Order ID: ${selectedOrderId} via Gateway: ${selectedGateway}`
    );
    setWithdraws(withdraws.filter((item) => item.orderId !== selectedOrderId));
    setIsAcceptModalOpen(false);
    setSelectedOrderId(null);
    setSelectedGateway("");
  };

  // Handle Reject Submission
    const handleRejectSubmit = async () => {
    if (!rejectRemark.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }
    
    
    try {
      const withdrawalData = {
        withdrawal_id: selectedOrderId,
        action: "reject",
        notes: rejectRemark.trim()
      };
      
      const result = await processWithdrawal(withdrawalData);
      
      if (result.success) {
        alert(result.message || 'Withdrawal rejected successfully');
        
        // Refresh data after successful action
        await fetchWithdrawals(pagination.page);
        
        // Close modal and reset state
    setIsRejectModalOpen(false);
    setSelectedOrderId(null);
    setRejectRemark("");
      }
    } catch (error) {
      console.error('Error rejecting withdrawal:', error);
      alert(error.message || 'Failed to reject withdrawal');
    } 
  };
  // Close Modals
  const closeAcceptModal = () => {
    setIsAcceptModalOpen(false);
    setSelectedOrderId(null);
    setSelectedGateway("");
  };

  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
    setSelectedOrderId(null);
    setRejectRemark("");
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  const Pagination = () => {
    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;
      let start = Math.max(1, pagination.page - Math.floor(maxVisiblePages / 2));
      let end = Math.min(pagination.pages, start + maxVisiblePages - 1);

      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    };

    return (
      <div className="d-flex justify-content-between align-items-center mt-4">
        <div className="d-flex align-items-center gap-3">
          <span className="text-sm text-muted">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
            {pagination.total} entries
          </span>
        </div>

        <nav aria-label="Pagination">
          <ul className="pagination pagination-sm mb-0">
            <li className={`page-item ${pagination.page === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
              >
                <Icon icon="heroicons:chevron-left" />
              </button>
            </li>

            {getPageNumbers().map(pageNum => (
              <li key={pageNum} className={`page-item ${pagination.page === pageNum ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              </li>
            ))}

            <li className={`page-item ${pagination.page === pagination.pages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
              >
                <Icon icon="heroicons:chevron-right" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  };

  return (
    <>
      <style>
        {`
          .table-responsive.scroll-sm::-webkit-scrollbar {
            width: 12px;  /* Vertical scrollbar width */
            height: 12px; /* Horizontal scrollbar height */
          }
          .table-responsive.scroll-sm::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 6px;
          }
          .table-responsive.scroll-sm::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 6px;
          }
          .table-responsive.scroll-sm::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
          .table-responsive.scroll-sm {
            scrollbar-width: auto; /* Firefox */
            scrollbar-color: #888 #f1f1f1; /* Firefox */
          }
        `}
      </style>
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h2 className="text-xl font-semibold">New Withdraw Requests</h2>
          <button
            className="btn btn-sm btn-primary-600 d-flex align-items-center gap-1"
            onClick={handleBackClick}
          >
            <Icon icon="ep:arrow-left" className="text-sm" />
            Back
          </button>
        </div>
        <div className="card-body py-8">
          <div className="table-responsive scroll-sm">
            <table className="table bordered-table text-sm w-full">
              <thead>
                <tr>
                  <th className="text-sm">User ID</th>
                  <th className="text-sm">Mobile Number</th>
                  <th className="text-sm">Order ID</th>
                  <th className="text-sm">Withdraw Type</th>
                  <th className="text-sm">Applied Amount</th>
                  <th className="text-sm">Balance After</th>
                  <th className="text-sm">Total Recharge</th>
                  <th className="text-sm">Total Withdraw</th>
                  <th className="text-sm">Bank Name</th>
                  <th className="text-sm">Account Number</th>
                  <th className="text-sm">IFSC Code</th>
                  <th className="text-sm">USDT Network</th>
                  <th className="text-sm">USDT Address</th>
                  <th className="text-sm">Address Alias</th>
                  <th className="text-sm">Apply Date & Time</th>
                  <th className="text-sm text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {withdraws.length > 0 ? (
                  withdraws.map((withdraw) => (
                    <tr key={withdraw.withdrawal_id}>
                      <td>{withdraw.user_id}</td>
                      <td>{withdraw.phone_no}</td>
                      <td>{withdraw.order_id}</td>
                      <td>{withdraw.withdrawal_type}</td>
                      <td>{withdraw.amount}</td>
                      <td>{withdraw.wallet_balance}</td>
                      <td>-</td> {/* Placeholder for totalRechargeAmount */}
                      <td>-</td> {/* Placeholder for totalWithdrawAmount */}
                      <td>{withdraw.bank_name || '-'}</td>
                      <td>{withdraw.account_number || '-'}</td>
                      <td>{withdraw.ifsc_code || '-'}</td>
                      <td>{withdraw.usdt_network || '-'}</td>
                      <td>{withdraw.usdt_address || '-'}</td>
                      <td>{withdraw.address_alias || '-'}</td>
                      <td>{new Date(withdraw.created_at).toLocaleString()}</td>
                      <td className="text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-success radius-8 d-inline-flex align-items-center gap-1"
                            onClick={() => openAcceptModal(withdraw.order_id)}
                          >
                            <Icon
                              icon="simple-line-icons:check"
                              className="text-xl"
                            />
                            Accept
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-danger radius-8 d-inline-flex align-items-center gap-1"
                            onClick={() => openRejectModal(withdraw.order_id)}
                          >
                            <Icon
                              icon="ic:twotone-close"
                              className="text-xl"
                            />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="16" className="text-center py-4">
                      No withdraw requests
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {pagination.total > 0 && <Pagination />}
          </div>

          {/* Accept Gateway Modal */}
          {isAcceptModalOpen && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  width: "100%",
                  maxWidth: "28rem",
                  padding: "1.5rem",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                    Select Gateway
                  </h3>
                  <button
                    type="button"
                    onClick={closeAcceptModal}
                    style={{ color: "#6b7280", fontSize: "1.25rem" }}
                  >
                    <Icon icon="ic:twotone-close" />
                  </button>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label
                    htmlFor="gateway"
                    style={{
                      display: "block",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#1f2937",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Payment Gateway
                  </label>
                  <select
                    id="gateway"
                    value={selectedGateway}
                    onChange={(e) => setSelectedGateway(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                    }}
                  >
                    <option value="">Select a gateway</option>
                    {gateways.map((gateway) => (
                      <option key={gateway} value={gateway}>
                        {gateway}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                  <button
                    type="button"
                    onClick={closeAcceptModal}
                    className="btn btn-sm btn-secondary radius-8 px-3 py-1.5"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleGatewaySelect}
                    className="btn btn-sm btn-success radius-8 px-3 py-1.5"
                  >
                    <Icon icon="simple-line-icons:check" style={{ fontSize: "1rem" }} />
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reject Remark Modal */}
          {isRejectModalOpen && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  width: "100%",
                  maxWidth: "28rem",
                  overflow: "hidden",
                  position: "absolute",
                  transform: "translate(-50%, -50%)",
                  top: "50%",
                  left: "50%",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    background: "linear-gradient(to right, #ef4444, #b91c1c)",
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3 style={{ color: "white", fontSize: "1.25rem", fontWeight: "600" }}>
                    Reject Withdrawal
                  </h3>
                  <button
                    type="button"
                    onClick={closeRejectModal}
                    style={{ color: "white", fontSize: "1.5rem" }}
                  >
                    <Icon icon="ic:twotone-close" />
                  </button>
                </div>
                {/* Body */}
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ marginBottom: "1rem" }}>
                    <label
                      htmlFor="rejectRemark"
                      style={{
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        color: "#1f2937",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Reason for Rejection
                    </label>
                    <textarea
                      id="rejectRemark"
                      value={rejectRemark}
                      onChange={(e) => setRejectRemark(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        minHeight: "100px",
                        resize: "none",
                        transition: "box-shadow 0.2s",
                      }}
                      placeholder="Enter reason for rejection..."
                      aria-label="Reason for rejecting withdrawal"
                      onFocus={(e) =>
                        (e.target.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.2)")
                      }
                      onBlur={(e) => (e.target.style.boxShadow = "none")}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
                    <button
                      type="button"
                      onClick={closeRejectModal}
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#e5e7eb",
                        color: "#374151",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        transition: "background-color 0.2s",
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#d1d5db")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleRejectSubmit}
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#ef4444",
                        color: "white",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        transition: "background-color 0.2s",
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#b91c1c")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#ef4444")}
                    >
                      <Icon icon="ic:twotone-close" style={{ fontSize: "1rem" }} />
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NewWithdraw;