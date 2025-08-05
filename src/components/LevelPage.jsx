import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router-dom";
import "../styles/UserReport.css";
import { getRebateEarnings, getTeamLevelStats, getTeamSummary } from "../utils/apiService";

// Mock data for demonstration
const mockLevelUsers = {
  1: {
    users: [
      {
        userId: "USR001",
        mobileNumber: "+91 9876543210",
        totalRecharge: "₹20000",
        totalWithdraw: "₹12000",
        balance: "₹8000",
        level: 1,
        joinDate: "2025-01-10",
        totalCommission: "₹2000",
        referral: "None",
      },
      {
        userId: "USR002",
        mobileNumber: "+91 9123456780",
        totalRecharge: "₹30000",
        totalWithdraw: "₹18000",
        balance: "₹12000",
        level: 1,
        joinDate: "2025-02-12",
        totalCommission: "₹3000",
        referral: "USR001",
      },
    ]
  }
};

const UserReport = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleOpenProfileModal = (user) => {
    setSelectedUser(user);
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
    setSelectedUser(null);
  };

  const users = mockLevelUsers[1]?.users || [];

  return (
    <div className="user-report-wrapper">
      <h2>Level Details: Level 1</h2>

      <table className="user-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Balance</th>
            <th>Total Recharge</th>
            <th>Total Withdrawal</th>
            <th>Total Commission</th>
            <th>Referral</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId} onClick={() => handleOpenProfileModal(user)}>
              <td>{user.userId}</td>
              <td>{user.balance}</td>
              <td>{user.totalRecharge}</td>
              <td>{user.totalWithdraw}</td>
              <td>{user.totalCommission}</td>
              <td>{user.referral}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {isProfileModalOpen && selectedUser && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">User Profile</h3>
              <button
                type="button"
                className="modal-close"
                onClick={closeProfileModal}
                aria-label="Close modal"
              >
                <Icon icon="ic:twotone-close" />
              </button>
            </div>

            <div className="modal-body">
              <p><strong>User ID:</strong> {selectedUser.userId}</p>
              <p><strong>Mobile Number:</strong> {selectedUser.mobileNumber}</p>
              <p><strong>Total Recharge:</strong> {selectedUser.totalRecharge}</p>
              <p><strong>Total Withdraw:</strong> {selectedUser.totalWithdraw}</p>
              <p><strong>Balance:</strong> {selectedUser.balance}</p>
              <p><strong>Level:</strong> {selectedUser.level}</p>
              <p><strong>Join Date:</strong> {selectedUser.joinDate}</p>
              <p><strong>Total Commission:</strong> {selectedUser.totalCommission}</p>
              <p><strong>Referral:</strong> {selectedUser.referral}</p>
            </div>

            <div className="modal-footer">
              <button type="button" className="modal-close-button" onClick={closeProfileModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReport;
