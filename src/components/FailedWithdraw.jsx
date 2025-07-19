import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

// Mock data for demonstration (replace with API data in production)
const failedWithdrawals = [
  {
    userId: "USR001",
    mobileNumber: "+91 9876543210",
    orderId: "WD12347",
    withdrawType: "USDT",
    appliedAmount: "200 USDT",
    balanceAfterWithdraw: "250 USDT",
    totalRechargeAmount: "450 USDT",
    totalWithdrawAmount: "200 USDT",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    usdtNetwork: "TRC20",
    usdtAddress: "TX987654321",
    addressAlias: "Wallet2",
    appliedDateTime: "2025-04-14 09:00 AM",
    senderGatewayName: "",
    rejectRemark: "Invalid USDT address",
    rejectDateTime: "2025-04-14 09:30 AM",
  },
  {
    userId: "USR002",
    mobileNumber: "+91 8765432109",
    orderId: "WD12348",
    withdrawType: "Bank",
    appliedAmount: "₹3000",
    balanceAfterWithdraw: "₹12000",
    totalRechargeAmount: "₹18000",
    totalWithdrawAmount: "₹6000",
    bankName: "SBI",
    accountNumber: "987654321098",
    ifscCode: "SBIN0001234",
    usdtNetwork: "",
    usdtAddress: "",
    addressAlias: "",
    appliedDateTime: "2025-04-14 10:00 AM",
    senderGatewayName: "Razorpay",
    rejectRemark: "Incorrect account details",
    rejectDateTime: "2025-04-14 10:15 AM",
  },
  {
    userId: "USR003",
    mobileNumber: "+91 7654321098",
    orderId: "WD12349",
    withdrawType: "Bank",
    appliedAmount: "₹5000",
    balanceAfterWithdraw: "₹8000",
    totalRechargeAmount: "₹15000",
    totalWithdrawAmount: "₹7000",
    bankName: "ICICI Bank",
    accountNumber: "123123123123",
    ifscCode: "ICIC0005678",
    usdtNetwork: "",
    usdtAddress: "",
    addressAlias: "",
    appliedDateTime: "2025-04-14 11:00 AM",
    senderGatewayName: "",
    rejectRemark: "Gateway processing error",
    rejectDateTime: "2025-04-14 11:20 AM",
  },
];

const FailedWithdraw = () => {
  const [withdrawals, setWithdrawals] = useState(failedWithdrawals);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="card">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h2 className="text-xl font-semibold">Failed Withdraw Requests</h2>
        <button
          className="btn btn-sm btn-primary-600 d-flex align-items-center gap-1"
          onClick={handleBackClick}
        >
          <Icon icon="ep:arrow-left" className="text-sm" />
          Back
        </button>
      </div>
      <div className="card-body py-8">
        <div
          className="table-responsive scroll-sm"
          style={{
            overflowX: "auto",
            scrollbarWidth: "10px", // For Firefox
            scrollbarColor: "#6b7280 transparent", // For Firefox
          }}
        >
          <style>
            {`
              .table-responsive.scroll-sm::-webkit-scrollbar {
                height: 10px; /* Thicker scrollbar */
              }
              .table-responsive.scroll-sm::-webkit-scrollbar-track {
                background: transparent; /* Track background */
              }
              .table-responsive.scroll-sm::-webkit-scrollbar-thumb {
                background: #6b7280; /* Scrollbar color */
                border-radius: 5px; /* Rounded corners */
              }
              .table-responsive.scroll-sm::-webkit-scrollbar-thumb:hover {
                background: #4b5563; /* Darker on hover */
              }
            `}
          </style>
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
                <th className="text-sm">Applied Date & Time</th>
                <th className="text-sm">Sender Gateway</th>
                <th className="text-sm">Reject Remark</th>
                <th className="text-sm">Reject Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.length > 0 ? (
                withdrawals.map((withdraw) => (
                  <tr key={withdraw.orderId}>
                    <td>{withdraw.userId}</td>
                    <td>{withdraw.mobileNumber}</td>
                    <td>{withdraw.orderId}</td>
                    <td>{withdraw.withdrawType}</td>
                    <td>{withdraw.appliedAmount}</td>
                    <td>{withdraw.balanceAfterWithdraw}</td>
                    <td>{withdraw.totalRechargeAmount}</td>
                    <td>{withdraw.totalWithdrawAmount}</td>
                    <td>{withdraw.bankName || "-"}</td>
                    <td>{withdraw.accountNumber || "-"}</td>
                    <td>{withdraw.ifscCode || "-"}</td>
                    <td>{withdraw.usdtNetwork || "-"}</td>
                    <td>{withdraw.usdtAddress || "-"}</td>
                    <td>{withdraw.addressAlias || "-"}</td>
                    <td>{withdraw.appliedDateTime}</td>
                    <td>{withdraw.senderGatewayName || "-"}</td>
                    <td>{withdraw.rejectRemark || "-"}</td>
                    <td>{withdraw.rejectDateTime || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="18" className="text-center py-4">
                    No failed withdraw requests
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FailedWithdraw;