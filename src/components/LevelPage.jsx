
import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "react-router-dom";

// Mock user profiles (replace with API data)
const userProfiles = {
  USR001: {
    userId: "USR001",
    mobileNumber: "+91 9876543210",
    totalRecharge: "₹20000",
    totalWithdraw: "₹12000",
    balance: "₹8000",
    level: 1,
    joinDate: "2025-01-10",
    totalCommission: "₹2000",
    referral: null,
  },
  USR002: {
    userId: "USR002",
    mobileNumber: "+91 8765432109",
    totalRecharge: "₹30000",
    totalWithdraw: "₹18000",
    balance: "₹12000",
    level: 1,
    joinDate: "2025-01-15",
    totalCommission: "₹3000",
    referral: "USR001",
  },
  USR003: {
    userId: "USR003",
    mobileNumber: "+91 7654321098",
    totalRecharge: "₹25000",
    totalWithdraw: "₹15000",
    balance: "₹10000",
    level: 2,
    joinDate: "2025-02-01",
    totalCommission: "₹2500",
    referral: "USR002",
  },
  USR004: {
    userId: "USR004",
    mobileNumber: "+91 6543210987",
    totalRecharge: "₹15000",
    totalWithdraw: "₹10000",
    balance: "₹5000",
    level: 2,
    joinDate: "2025-02-05",
    totalCommission: "₹1500",
    referral: "USR002",
  },
  USR005: {
    userId: "USR005",
    mobileNumber: "+91 5432109876",
    totalRecharge: "₹18000",
    totalWithdraw: "₹12000",
    balance: "₹6000",
    level: 3,
    joinDate: "2025-02-10",
    totalCommission: "₹1800",
    referral: "USR003",
  },
  USR006: {
    userId: "USR006",
    mobileNumber: "+91 4321098765",
    totalRecharge: "₹12000",
    totalWithdraw: "₹9000",
    balance: "₹3000",
    level: 4,
    joinDate: "2025-02-15",
    totalCommission: "₹1200",
    referral: "USR004",
  },
  USR007: {
    userId: "USR007",
    mobileNumber: "+91 3210987654",
    totalRecharge: "₹7000",
    totalWithdraw: "₹5000",
    balance: "₹2000",
    level: 5,
    joinDate: "2025-02-20",
    totalCommission: "₹700",
    referral: "USR005",
  },
  USR008: {
    userId: "USR008",
    mobileNumber: "+91 2109876543",
    totalRecharge: "₹5000",
    totalWithdraw: "₹4000",
    balance: "₹1000",
    level: 6,
    joinDate: "2025-02-25",
    totalCommission: "₹500",
    referral: "USR006",
  },
};

// Mock data for level-wise users
const levelUsers = {
  1: [
    { userId: "USR001", recharge: "₹20000", withdraw: "₹12000" },
    { userId: "USR002", recharge: "₹30000", withdraw: "₹18000" },
  ],
  2: [
    { userId: "USR003", recharge: "₹25000", withdraw: "₹15000" },
    { userId: "USR004", recharge: "₹15000", withdraw: "₹10000" },
  ],
  3: [
    { userId: "USR005", recharge: "₹18000", withdraw: "₹12000" },
  ],
  4: [
    { userId: "USR006", recharge: "₹12000", withdraw: "₹9000" },
  ],
  5: [
    { userId: "USR007", recharge: "₹7000", withdraw: "₹5000" },
  ],
  6: [
    { userId: "USR008", recharge: "₹5000", withdraw: "₹4000" },
  ],
};

const LevelDetails = () => {
  const { level } = useParams();
  const [sortConfig, setSortConfig] = useState({ key: "userId", direction: "asc" });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Get users for the specified level or all levels
  const users = level === "all"
    ? Object.values(userProfiles)
    : Object.values(userProfiles).filter((user) => user.level === parseInt(level));

  // Sorting function
  const sortData = (data, key, direction) => {
    return [...data].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      // Convert currency strings to numbers for sorting
      if (["totalRecharge", "totalWithdraw", "balance", "totalCommission"].includes(key)) {
        aValue = parseFloat(aValue.replace("₹", "").replace(",", ""));
        bValue = parseFloat(bValue.replace("₹", "").replace(",", ""));
      }

      // Handle null referral
      if (key === "referral") {
        aValue = aValue || "";
        bValue = bValue || "";
      }

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  // Handle sort
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Sorted users
  const sortedUsers = sortData(users, sortConfig.key, sortConfig.direction);

  // Open user profile modal
  const openProfileModal = (userId) => {
    setSelectedUser(userProfiles[userId]);
    setIsProfileModalOpen(true);
  };

  // Close profile modal
  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-xl font-semibold">
          Level Details: {level === "all" ? "All Levels" : `Level ${level}`}
        </h2>
      </div>
      <div className="card-body py-8">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table text-sm w-full">
            <thead>
              <tr>
                <th className="text-sm cursor-pointer" onClick={() => handleSort("userId")}>
                  User ID
                  {sortConfig.key === "userId" && (
                    <Icon
                      icon={sortConfig.direction === "asc" ? "bxs:up-arrow" : "bxs:down-arrow"}
                      className="text-xs ms-1"
                    />
                  )}
                </th>
                <th className="text-sm cursor-pointer" onClick={() => handleSort("balance")}>
                  Balance
                  {sortConfig.key === "balance" && (
                    <Icon
                      icon={sortConfig.direction === "asc" ? "bxs:up-arrow" : "bxs:down-arrow"}
                      className="text-xs ms-1"
                    />
                  )}
                </th>
                <th className="text-sm cursor-pointer" onClick={() => handleSort("totalRecharge")}>
                  Total Recharge
                  {sortConfig.key === "totalRecharge" && (
                    <Icon
                      icon={sortConfig.direction === "asc" ? "bxs:up-arrow" : "bxs:down-arrow"}
                      className="text-xs ms-1"
                    />
                  )}
                </th>
                <th className="text-sm cursor-pointer" onClick={() => handleSort("totalWithdraw")}>
                  Total Withdrawal
                  {sortConfig.key === "totalWithdraw" && (
                    <Icon
                      icon={sortConfig.direction === "asc" ? "bxs:up-arrow" : "bxs:down-arrow"}
                      className="text-xs ms-1"
                    />
                  )}
                </th>
                <th className="text-sm cursor-pointer" onClick={() => handleSort("totalCommission")}>
                  Total Commission
                  {sortConfig.key === "totalCommission" && (
                    <Icon
                      icon={sortConfig.direction === "asc" ? "bxs:up-arrow" : "bxs:down-arrow"}
                      className="text-xs ms-1"
                    />
                  )}
                </th>
                <th className="text-sm cursor-pointer" onClick={() => handleSort("referral")}>
                  Referral
                  {sortConfig.key === "referral" && (
                    <Icon
                      icon={sortConfig.direction === "asc" ? "bxs:up-arrow" : "bxs:down-arrow"}
                      className="text-xs ms-1"
                    />
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.length > 0 ? (
                sortedUsers.map((user) => (
                  <tr key={user.userId}>
                    <td>
                      <button
                        type="button"
                        className="text-blue-600 hover:underline focus:outline-none"
                        onClick={() => openProfileModal(user.userId)}
                      >
                        {user.userId}
                      </button>
                    </td>
                    <td>{user.balance}</td>
                    <td>{user.totalRecharge}</td>
                    <td>{user.totalWithdraw}</td>
                    <td>{user.totalCommission}</td>
                    <td>{user.referral || "None"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No users found for {level === "all" ? "any level" : `Level ${level}`}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* User Profile Modal */}
        {isProfileModalOpen && selectedUser && (
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
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "50%",
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
                <h3 style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                  User Profile
                </h3>
                <button
                  type="button"
                  onClick={closeProfileModal}
                  style={{ color: "#6b7280", fontSize: "1.5rem" }}
                >
                  <Icon icon="ic:twotone-close" />
                </button>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <p style={{ fontSize: "0.875rem", color: "#1f2937", marginBottom: "0.5rem" }}>
                  <strong>User ID:</strong> {selectedUser.userId}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#1f2937", marginBottom: "0.5rem" }}>
                  <strong>Mobile Number:</strong> {selectedUser.mobileNumber}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#1f2937", marginBottom: "0.5rem" }}>
                  <strong>Total Recharge:</strong> {selectedUser.totalRecharge}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#1f2937", marginBottom: "0.5rem" }}>
                  <strong>Total Withdraw:</strong> {selectedUser.totalWithdraw}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#1f2937", marginBottom: "0.5rem" }}>
                  <strong>Balance:</strong> {selectedUser.balance}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#1f2937", marginBottom: "0.5rem" }}>
                  <strong>Level:</strong> {selectedUser.level}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#1f2937", marginBottom: "0.5rem" }}>
                  <strong>Join Date:</strong> {selectedUser.joinDate}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#1f2937", marginBottom: "0.5rem" }}>
                  <strong>Total Commission:</strong> {selectedUser.totalCommission}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#1f2937", marginBottom: "0.5rem" }}>
                  <strong>Referral:</strong> {selectedUser.referral || "None"}
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={closeProfileModal}
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
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LevelDetails;
