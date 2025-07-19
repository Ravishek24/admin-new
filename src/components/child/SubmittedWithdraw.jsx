
import React, { useState } from "react";

// Mock data for demonstration (replace with API data in production)
const submittedWithdrawals = [
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
    submitDateTime: "2025-04-14 11:00 AM",
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
    submitDateTime: "2025-04-14 11:30 AM",
    gatewayOrderId: "GWD98766",
  },
];

const SubmittedWithdraw = () => {
  const [withdrawals, setWithdrawals] = useState(submittedWithdrawals);

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
        <div className="card-header">
          <h2 className="text-xl font-semibold">Submitted Withdraw Requests</h2>
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
                  <th className="text-sm">Applied Date & Time</th>
                  <th className="text-sm">Sender Gateway</th>
                  <th className="text-sm">Submit Date & Time</th>
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
                      <td>{withdraw.submitDateTime}</td>
                      <td>{withdraw.gatewayOrderId}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="18" className="text-center py-4">
                      No submitted withdraw requests
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmittedWithdraw;
