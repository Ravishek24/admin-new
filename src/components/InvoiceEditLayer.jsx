import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import {
  getPendingRecharge,
  getSuccessfulRecharges,
  processRecharge,
} from "../utils/apiService";
import Pagination from "./comman/Pagination";

const RechargeManagement = () => {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [pendingPagination, setPendingPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    limit: 10,
  });
  const [approvedPagination, setApprovedPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    limit: 10,
  });
  const navigate = useNavigate();
  
  const fetchPendingRecharges = async (page = 1) => {
    try {
      const data = await getPendingRecharge(page);
      setPending(data.recharges || []);
      setPendingPagination(data.pagination || {});
    } catch (err) {}
  };

  const fetchPendingRechargesApproved = async (page = 1) => {
    try {
      const data = await getSuccessfulRecharges(page);
      setApproved(data.recharges || []);
      setApprovedPagination(data.pagination || {});
    } catch (err) {}
  };
  
  useEffect(() => {
    fetchPendingRecharges(pendingPagination.page);
  }, [pendingPagination.page]);

  useEffect(() => {
    fetchPendingRechargesApproved(approvedPagination.page);
  }, [approvedPagination.page]);

  // Handle Success action
  const handleSuccess = async (orderId) => {
    const recharge = pending.find((item) => item.recharge_id === orderId);
    if (recharge) {
      console.log(`Success for Order ID: ${orderId}`);
      let data = await processRecharge(orderId, "approve");
      fetchPendingRecharges(1);
    }
  };

  // Open Reject Modal
  const openRejectModal = (orderId) => {
    setSelectedOrderId(orderId);
    setRejectReason("");
    setIsRejectModalOpen(true);
    // Add class to body to prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
  };

  // Handle Reject action
  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }
    let data = await processRecharge(selectedOrderId, "reject", rejectReason);
    closeRejectModal();
  };

  // Close Reject Modal
  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
    setSelectedOrderId(null);
    setRejectReason("");
    // Restore scrolling when modal is closed
    document.body.style.overflow = "";
  };

  return (
    <>
      <div className="card relative">
        <div className="card-header flex justify-between items-center">
          <h2 className="text-xl font-semibold">Recharge Management</h2>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-sm btn-outline-primary flex items-center gap-1"
          >
            <Icon icon="ic:round-arrow-back" className="text-lg" />
            Back
          </button>
        </div>

        <div
          className={`card-body py-8 ${isRejectModalOpen ? "opacity-50" : ""}`}
        >
          {/* Pending Recharge Section */}
          <div className="mb-12">
            <h3 className="text-lg font-medium mb-4">Pending Recharges</h3>
            <div className="table-responsive scroll-sm">
              <table className="table bordered-table text-sm w-full">
                <thead>
                  <tr>
                    <th className="text-sm">User ID</th>
                    <th className="text-sm">Mobile Number</th>
                    <th className="text-sm">Order ID</th>
                    <th className="text-sm">Amount</th>
                    <th className="text-sm">Create Time</th>
                    <th className="text-sm">Gateway Name</th>
                    <th className="text-sm text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pending.length > 0 ? (
                    pending.map((recharge) => (
                      <tr key={recharge.order_id}>
                        <td>{recharge.user_id}</td>
                        <td>{recharge.mobile_number}</td>
                        <td>{recharge.order_id}</td>
                        <td>{recharge.applied_amount}</td>
                        <td>{recharge.apply_date_time}</td>
                        <td>{recharge.recharge_type}</td>
                        <td className="text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              type="button"
                              className="btn btn-sm btn-success radius-8 d-inline-flex align-items-center gap-1"
                              onClick={() =>
                                handleSuccess(recharge.recharge_id)
                              }
                            >
                              <Icon
                                icon="simple-line-icons:check"
                                className="text-xl"
                              />
                              Success
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-danger radius-8 d-inline-flex align-items-center gap-1"
                              onClick={() =>
                                openRejectModal(recharge.recharge_id)
                              }
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
                      <td colSpan="7" className="text-center py-4">
                        No pending recharges
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Pagination
                pagination={pendingPagination}
                onPageChange={(newPage) =>
                  setPendingPagination((prev) => ({ ...prev, page: newPage }))
                }
              />
            </div>
          </div>

          {/* Approved Recharge Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">Approved Recharges</h3>
            <div className="table-responsive scroll-sm">
              <table className="table bordered-table text-sm w-full">
                <thead>
                  <tr>
                    <th className="text-sm">User ID</th>
                    <th className="text-sm">Mobile Number</th>
                    <th className="text-sm">Order ID</th>
                    <th className="text-sm">Amount</th>
                    <th className="text-sm">Gateway Name</th>
                    <th className="text-sm">Success Time</th>
                  </tr>
                </thead>
                <tbody>
                  {approved.length > 0 ? (
                    approved.map((recharge) => (
                      <tr key={recharge.order_id}>
                        <td>{recharge.user_id}</td>
                        <td>{recharge.mobile_number}</td>
                        <td>{recharge.order_id}</td>
                        <td>{recharge.applied_amount}</td>
                        <td>{recharge.recharge_type}</td>
                        <td>{recharge.apply_date_time}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No approved recharges
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              
              {/* Pagination for Approved Recharges */}
              <Pagination
                pagination={approvedPagination}
                onPageChange={(newPage) =>
                  setApprovedPagination((prev) => ({ ...prev, page: newPage }))
                }
              />
            </div>
          </div>
        </div>

        {/* Reject Modal - Perfectly Centered */}
        {isRejectModalOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
            onClick={closeRejectModal} // Close modal when clicking backdrop
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                width: "100%",
                maxWidth: "500px",
                padding: "2rem",
                position: "relative",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
              onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600", margin: 0 }}>
                  Reject Recharge
                </h3>
                <button
                  type="button"
                  onClick={closeRejectModal}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#6b7280",
                    cursor: "pointer",
                    padding: "4px",
                    borderRadius: "4px",
                    transition: "color 0.2s",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#374151")}
                  onMouseOut={(e) => (e.target.style.color = "#6b7280")}
                >
                  <Icon icon="ic:twotone-close" style={{ fontSize: "1.5rem" }} />
                </button>
              </div>
              
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  htmlFor="rejectReason"
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  Reason for Rejection <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <textarea
                  id="rejectReason"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    outline: "none",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    resize: "vertical",
                    minHeight: "120px",
                  }}
                  placeholder="Enter the reason for rejecting this recharge..."
                  autoFocus
                  onFocus={(e) => {
                    e.target.style.borderColor = "#ef4444";
                    e.target.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.75rem",
                }}
              >
                <button
                  type="button"
                  onClick={closeRejectModal}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#f3f4f6",
                    color: "#374151",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleReject}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#dc2626")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#ef4444")}
                >
                  <Icon icon="ic:twotone-close" style={{ fontSize: "1rem" }} />
                  Confirm Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RechargeManagement;