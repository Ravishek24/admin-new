import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Mock data for team summary (replace with API data)
const teamSummary = [
  { level: 1, totalRecharge: "₹50000", totalWithdraw: "₹30000", totalBalance: "₹20000" },
  { level: 2, totalRecharge: "₹40000", totalWithdraw: "₹25000", totalBalance: "₹15000" },
  { level: 3, totalRecharge: "₹30000", totalWithdraw: "₹20000", totalBalance: "₹10000" },
  { level: 4, totalRecharge: "₹20000", totalWithdraw: "₹15000", totalBalance: "₹5000" },
  { level: 5, totalRecharge: "₹10000", totalWithdraw: "₹8000", totalBalance: "₹2000" },
  { level: 6, totalRecharge: "₹5000", totalWithdraw: "₹4000", totalBalance: "₹1000" },
];

// Mock data for level-wise users (Total Report)
const levelUsersTotal = {
  1: {
    users: [
      { userId: "USR001", recharge: "₹20000", withdraw: "₹12000" },
      { userId: "USR002", recharge: "₹30000", withdraw: "₹18000" },
    ],
    directSummary: {
      numberOfRegister: 2,
      depositNumber: 4,
      depositAmount: "₹50000",
      firstDepositCount: 2,
    },
    teamSummary: {
      numberOfRegister: 8,
      depositNumber: 12,
      depositAmount: "₹150000",
      firstDepositCount: 6,
    },
  },
  2: {
    users: [
      { userId: "USR003", recharge: "₹25000", withdraw: "₹15000" },
      { userId: "USR004", recharge: "₹15000", withdraw: "₹10000" },
    ],
    directSummary: {
      numberOfRegister: 2,
      depositNumber: 3,
      depositAmount: "₹40000",
      firstDepositCount: 2,
    },
    teamSummary: {
      numberOfRegister: 6,
      depositNumber: 9,
      depositAmount: "₹100000",
      firstDepositCount: 4,
    },
  },
  3: {
    users: [{ userId: "USR005", recharge: "₹18000", withdraw: "₹12000" }],
    directSummary: {
      numberOfRegister: 1,
      depositNumber: 2,
      depositAmount: "₹18000",
      firstDepositCount: 1,
    },
    teamSummary: {
      numberOfRegister: 3,
      depositNumber: 5,
      depositAmount: "₹50000",
      firstDepositCount: 2,
    },
  },
  4: {
    users: [{ userId: "USR006", recharge: "₹12000", withdraw: "₹9000" }],
    directSummary: {
      numberOfRegister: 1,
      depositNumber: 1,
      depositAmount: "₹12000",
      firstDepositCount: 1,
    },
    teamSummary: {
      numberOfRegister: 2,
      depositNumber: 3,
      depositAmount: "₹30000",
      firstDepositCount: 1,
    },
  },
  5: {
    users: [{ userId: "USR007", recharge: "₹7000", withdraw: "₹5000" }],
    directSummary: {
      numberOfRegister: 1,
      depositNumber: 1,
      depositAmount: "₹7000",
      firstDepositCount: 1,
    },
    teamSummary: {
      numberOfRegister: 1,
      depositNumber: 2,
      depositAmount: "₹15000",
      firstDepositCount: 1,
    },
  },
  6: {
    users: [{ userId: "USR008", recharge: "₹5000", withdraw: "₹4000" }],
    directSummary: {
      numberOfRegister: 1,
      depositNumber: 1,
      depositAmount: "₹5000",
      firstDepositCount: 1,
    },
    teamSummary: {
      numberOfRegister: 1,
      depositNumber: 1,
      depositAmount: "₹5000",
      firstDepositCount: 1,
    },
  },
};

// Mock data for Today Report
const levelUsersToday = {
  1: {
    users: [{ userId: "USR001", recharge: "₹5000", withdraw: "₹3000" }],
    directSummary: {
      numberOfRegister: 1,
      depositNumber: 1,
      depositAmount: "₹5000",
      firstDepositCount: 0,
    },
    teamSummary: {
      numberOfRegister: 2,
      depositNumber: 3,
      depositAmount: "₹10000",
      firstDepositCount: 1,
    },
  },
  2: {
    users: [{ userId: "USR003", recharge: "₹6000", withdraw: "₹4000" }],
    directSummary: {
      numberOfRegister: 1,
      depositNumber: 1,
      depositAmount: "₹6000",
      firstDepositCount: 0,
    },
    teamSummary: {
      numberOfRegister: 1,
      depositNumber: 2,
      depositAmount: "₹8000",
      firstDepositCount: 1,
    },
  },
};

// Mock data for Yesterday Report
const levelUsersYesterday = {
  1: {
    users: [
      { userId: "USR001", recharge: "₹7000", withdraw: "₹4000" },
      { userId: "USR002", recharge: "₹8000", withdraw: "₹5000" },
    ],
    directSummary: {
      numberOfRegister: 2,
      depositNumber: 2,
      depositAmount: "₹15000",
      firstDepositCount: 1,
    },
    teamSummary: {
      numberOfRegister: 3,
      depositNumber: 4,
      depositAmount: "₹20000",
      firstDepositCount: 2,
    },
  },
  3: {
    users: [{ userId: "USR005", recharge: "₹5000", withdraw: "₹3000" }],
    directSummary: {
      numberOfRegister: 1,
      depositNumber: 1,
      depositAmount: "₹5000",
      firstDepositCount: 0,
    },
    teamSummary: {
      numberOfRegister: 1,
      depositNumber: 1,
      depositAmount: "₹5000",
      firstDepositCount: 0,
    },
  },
};

// Mock data for Today Salary Report
const salaryReportToday = [
  { level: 1, activeMembers: 2, totalDepositAmount: "₹10000" },
  { level: 2, activeMembers: 1, totalDepositAmount: "₹6000" },
  { level: 3, activeMembers: 0, totalDepositAmount: "₹0" },
  { level: 4, activeMembers: 0, totalDepositAmount: "₹0" },
  { level: 5, activeMembers: 0, totalDepositAmount: "₹0" },
  { level: 6, activeMembers: 0, totalDepositAmount: "₹0" },
];

// Mock data for Yesterday Salary Report
const salaryReportYesterday = [
  { level: 1, activeMembers: 3, totalDepositAmount: "₹15000" },
  { level: 2, activeMembers: 0, totalDepositAmount: "₹0" },
  { level: 3, activeMembers: 1, totalDepositAmount: "₹5000" },
  { level: 4, activeMembers: 0, totalDepositAmount: "₹0" },
  { level: 5, activeMembers: 0, totalDepositAmount: "₹0" },
  { level: 6, activeMembers: 0, totalDepositAmount: "₹0" },
];

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
  },
  USR002: {
    userId: "USR002",
    mobileNumber: "+91 8765432109",
    totalRecharge: "₹30000",
    totalWithdraw: "₹18000",
    balance: "₹12000",
    level: 1,
    joinDate: "2025-01-15",
  },
  USR003: {
    userId: "USR003",
    mobileNumber: "+91 7654321098",
    totalRecharge: "₹25000",
    totalWithdraw: "₹15000",
    balance: "₹10000",
    level: 2,
    joinDate: "2025-02-01",
  },
  USR004: {
    userId: "USR004",
    mobileNumber: "+91 6543210987",
    totalRecharge: "₹15000",
    totalWithdraw: "₹10000",
    balance: "₹5000",
    level: 2,
    joinDate: "2025-02-05",
  },
  USR005: {
    userId: "USR005",
    mobileNumber: "+91 5432109876",
    totalRecharge: "₹18000",
    totalWithdraw: "₹12000",
    balance: "₹6000",
    level: 3,
    joinDate: "2025-02-10",
  },
  USR006: {
    userId: "USR006",
    mobileNumber: "+91 4321098765",
    totalRecharge: "₹12000",
    totalWithdraw: "₹9000",
    balance: "₹3000",
    level: 4,
    joinDate: "2025-02-15",
  },
  USR007: {
    userId: "USR007",
    mobileNumber: "+91 3210987654",
    totalRecharge: "₹7000",
    totalWithdraw: "₹5000",
    balance: "₹2000",
    level: 5,
    joinDate: "2025-02-20",
  },
  USR008: {
    userId: "USR008",
    mobileNumber: "+91 2109876543",
    totalRecharge: "₹5000",
    totalWithdraw: "₹4000",
    balance: "₹1000",
    level: 6,
    joinDate: "2025-02-25",
  },
};

const UserReport = () => {
  const [summary] = useState(teamSummary);
  const [activeTab, setActiveTab] = useState("total");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();


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

  // Handle search input change
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  // Select data based on active tab
  const getUsersByLevel = () => {
    switch (activeTab) {
      case "today":
        return levelUsersToday;
      case "yesterday":
        return levelUsersYesterday;
      case "total":
        return levelUsersTotal;
      default:
        return {};
    }
  };

  // Filter users based on search query
  const filteredUsersByLevel = Object.keys(getUsersByLevel()).reduce((acc, level) => {
    const filteredUsers = getUsersByLevel()[level].users.filter((user) => {
      const userProfile = userProfiles[user.userId];
      return (
        user.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        userProfile.mobileNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    if (filteredUsers.length > 0 || activeTab === "total") {
      acc[level] = { ...getUsersByLevel()[level], users: filteredUsers };
    }
    return acc;
  }, {});

  // Render subordinate report (Today/Total/Yesterday)
  const renderSubordinateReport = () => {
    return (
      <div>
        {Object.keys(filteredUsersByLevel).length > 0 ? (
          Object.keys(filteredUsersByLevel).map((level) => (
            <div key={level} className="mb-6">
              <h4 className="text-base font-semibold mb-2">
                <Link
                  to={`/level-details/${level}`}
                  className="text-blue-600 hover:underline"
                >
                  Level {level}
                </Link>
              </h4>
              {/* Direct Subordinate */}
              <h5 className="text-sm font-medium mb-2">Direct Subordinate</h5>
              <div className="table-responsive scroll-sm">
                <table className="table bordered-table text-sm w-full">
                  <thead>
                    <tr>
                      <th className="text-sm">Number of Register</th>
                      <th className="text-sm">Deposit Number</th>
                      <th className="text-sm">Deposit Amount</th>
                      <th className="text-sm">Number of People Making First Deposit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{filteredUsersByLevel[level].directSummary.numberOfRegister}</td>
                      <td>{filteredUsersByLevel[level].directSummary.depositNumber}</td>
                      <td>{filteredUsersByLevel[level].directSummary.depositAmount}</td>
                      <td>{filteredUsersByLevel[level].directSummary.firstDepositCount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Team Subordinate */}
              <h5 className="text-sm font-medium mb-2 mt-4">Team Subordinate</h5>
              <div className="table-responsive scroll-sm">
                <table className="table bordered-table text-sm w-full">
                  <thead>
                    <tr>
                      <th className="text-sm">Number of Register</th>
                      <th className="text-sm">Deposit Number</th>
                      <th className="text-sm">Deposit Amount</th>
                      <th className="text-sm">Number of People Making First Deposit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{filteredUsersByLevel[level].teamSummary.numberOfRegister}</td>
                      <td>{filteredUsersByLevel[level].teamSummary.depositNumber}</td>
                      <td>{filteredUsersByLevel[level].teamSummary.depositAmount}</td>
                      <td>{filteredUsersByLevel[level].teamSummary.firstDepositCount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* User List */}
              <h5 className="text-sm font-medium mb-2 mt-4">Users</h5>
              <div className="table-responsive scroll-sm">
                <table className="table bordered-table text-sm w-full">
                  <thead>
                    <tr>
                      <th className="text-sm">User ID</th>
                      <th className="text-sm">Recharge</th>
                      <th className="text-sm">Withdraw</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsersByLevel[level].users.map((user) => (
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
                        <td>{user.recharge}</td>
                        <td>{user.withdraw}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            No data found for the selected report
          </div>
        )}
      </div>
    );
  };

  // Render salary report (Today/Yesterday)
  const renderSalaryReport = (reportData) => {
    return (
      <div className="table-responsive scroll-sm">
        <table className="table bordered-table text-sm w-full">
          <thead>
            <tr>
              <th className="text-sm">Level</th>
              <th className="text-sm">Active Members</th>
              <th className="text-sm">Total Deposit Amount</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((level) => (
              <tr key={level.level}>
                <td>
                  <Link
                    to={`/level-details/${level.level}`}
                    className="text-blue-600 hover:underline"
                  >
                    Level {level.level}
                  </Link>
                </td>
                <td>{level.activeMembers}</td>
                <td>{level.totalDepositAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-xl font-semibold">User Report</h2>
      </div>
      <div className="card-body py-8">
        <button
            onClick={() => navigate(-1)}
            className="btn btn-sm btn-outline-primary flex items-center gap-1 mb-4"
          >
            <Icon icon="ic:round-arrow-back" className="text-lg mb-4" />
            Back
          </button>
        {/* Search Bar with Button */}
        <div className="mb-6">
          <div className="input-group">
            <span className="input-group-text">
              <Icon icon="mdi:magnify" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by User ID or Mobile Number"
              value={searchInput}
              onChange={handleSearchInput}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {/* Team Summary Report */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Team Summary (Level-Wise)</h3>
          <div className="table-responsive scroll-sm">
            <table className="table bordered-table text-sm w-full">
              <thead>
                <tr>
                  <th className="text-sm">Level</th>
                  <th className="text-sm">Total Recharge</th>
                  <th className="text-sm">Total Withdraw</th>
                  <th className="text-sm">Total Team Balance</th>
                </tr>
              </thead>
              <tbody>
                {summary.length > 0 ? (
                  summary.map((level) => (
                    <tr key={level.level}>
                      <td>
                        <Link
                          to={`/level-details/${level.level}`}
                          className="text-blue-600 hover:underline"
                        >
                          Level {level.level}
                        </Link>
                      </td>
                      <td>{level.totalRecharge}</td>
                      <td>{level.totalWithdraw}</td>
                      <td>{level.totalBalance}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No team summary data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <Link
              to="/level-details/all"
              className="text-blue-600 hover:underline text-sm"
            >
              View All Levels
            </Link>
          </div>
        </div>

        {/* Level-Wise User Report */}
        <div>
          <h3 className="text-lg font-medium mb-4">Level-Wise User Report</h3>
          
          <div className="mb-4">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "today" ? "active" : ""}`}
                  onClick={() => setActiveTab("today")}
                >
                  Today Report
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "total" ? "active" : ""}`}
                  onClick={() => setActiveTab("total")}
                >
                  Total Report
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "yesterday" ? "active" : ""}`}
                  onClick={() => setActiveTab("yesterday")}
                >
                  Yesterday Report
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "todaySalary" ? "active" : ""}`}
                  onClick={() => setActiveTab("todaySalary")}
                >
                  Today Salary Report
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "yesterdaySalary" ? "active" : ""}`}
                  onClick={() => setActiveTab("yesterdaySalary")}
                >
                  Yesterday Salary Report
                </button>
              </li>
            </ul>
          </div>

          {/* Tab Content */}
          {activeTab === "today" && renderSubordinateReport()}
          {activeTab === "total" && renderSubordinateReport()}
          {activeTab === "yesterday" && renderSubordinateReport()}
          {activeTab === "todaySalary" && renderSalaryReport(salaryReportToday)}
          {activeTab === "yesterdaySalary" && renderSalaryReport(salaryReportYesterday)}
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

export default UserReport;