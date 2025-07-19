import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

// Mock data for demonstration (replace with API data in production)
const successWithdrawals = [
  {
    userId: "USR001",
    mobileNumber: "+91 9876543210",
    orderId: "WD12345",
    withdrawType: "USDT",
    appliedAmount: "100 USDT",
    balanceAfterWithdraw: "50 USDT",
    totalRechargeAmount: "200 USDT",
    totalWithdrawAmount: "150 USDT",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    usdtNetwork: "TRC20",
    usdtAddress: "TX123456789",
    addressAlias: "Wallet1",
    appliedDateTime: "2025-04-14 10:30 AM",
    senderGatewayName: "Coinbase",
    successDateTime: "2025-04-14 11:15 AM",
    gatewayOrderId: "GWD98765",
  },
  {
    userId: "USR002",
    mobileNumber: "+91 8765432109",
    orderId: "WD12346",
    withdrawType: "Bank",
    appliedAmount: "₹5000",
    balanceAfterWithdraw: "₹10000",
    totalRechargeAmount: "₹20000",
    totalWithdrawAmount: "₹15000",
    bankName: "HDFC Bank",
    accountNumber: "123456789012",
    ifscCode: "HDFC0001234",
    usdtNetwork: "",
    usdtAddress: "",
    addressAlias: "",
    appliedDateTime: "2025-04-14 11:00 AM",
    senderGatewayName: "Razorpay",
    successDateTime: "2025-04-14 11:45 AM",
    gatewayOrderId: "GWD98766",
  },
];

const SuccessWithdraw = () => {
  const [withdrawals, setWithdrawals] = useState(successWithdrawals);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="card">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h2 className="text-xl font-semibold">Successful Withdraw Requests</h2>
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
                <th className="text-sm">Success Date & Time</th>
                <th className="text-sm">Gateway Order ID</th>
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
                    <td>{withdraw.senderGatewayName}</td>
                    <td>{withdraw.successDateTime}</td>
                    <td>{withdraw.gatewayOrderId}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="18" className="text-center py-4">
                    No successful withdraw requests
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

export default SuccessWithdraw;