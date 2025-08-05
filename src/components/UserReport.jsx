import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router-dom";
import { getRebateEarnings, getTeamLevelStats, getTeamSummary } from "../utils/apiService";

// Mock data for fallback
const mockTeamSummary = [
  { level: 1, member_count: "₹50000", total_recharge: "₹50000", total_withdraw: "₹30000", total_team_balance: "₹20000" },
  { level: 2, member_count: "₹50000", total_recharge: "₹40000", total_withdraw: "₹25000", total_team_balance: "₹15000" },
  { level: 3, member_count: "₹50000", total_recharge: "₹30000", total_withdraw: "₹20000", total_team_balance: "₹10000" },
  { level: 4, member_count: "₹50000", total_recharge: "₹20000", total_withdraw: "₹15000", total_team_balance: "₹5000" },
  { level: 5, member_count: "₹50000", total_recharge: "₹10000", total_withdraw: "₹8000", total_team_balance:  "₹2000" },
  { level: 6, member_count: "₹50000", total_recharge: "₹5000",  total_withdraw: "₹4000", total_team_balance:  "₹1000" },
];

const mockRebateEarnings = [
  { level: 1, activeMembers: 2, totalDepositAmount: "₹10000", date: new Date().toISOString().split('T')[0] },
  { level: 2, activeMembers: 1, totalDepositAmount: "₹6000", date: new Date().toISOString().split('T')[0] },
  { level: 1, activeMembers: 3, totalDepositAmount: "₹15000", date: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
  { level: 3, activeMembers: 1, totalDepositAmount: "₹5000", date: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
];

const mockLevelUsers = {
  all: {
    1: { registered: 27, deposit_number: 0, deposit_amount: 0, first_deposit_number: 0 },
    2: { registered: 9, deposit_number: 0, deposit_amount: 0, first_deposit_number: 0 },
    3: { registered: 42, deposit_number: 0, deposit_amount: 0, first_deposit_number: 0 },
    4: { registered: 3, deposit_number: 0, deposit_amount: 0, first_deposit_number: 0 },
    5: { registered: 4, deposit_number: 0, deposit_amount: 0, first_deposit_number: 0 },
    6: { registered: 8, deposit_number: 0, deposit_amount: 0, first_deposit_number: 0 },
  },
  today: {
    1: { registered: 1, deposit_number: 1, deposit_amount: 5000, first_deposit_number: 0 },
    2: { registered: 0, deposit_number: 0, deposit_amount: 0, first_deposit_number: 0 },
    3: { registered: 0, deposit_number: 0, deposit_amount: 0, first_deposit_number: 0 },
    4: { registered: 0, deposit_number: 0, deposit_amount: 0, first_deposit_number: 0 },
    5: { registered: 0, deposit_number: 0, deposit_amount: 0, first_deposit_number: 0 },
    6: { registered: 1, deposit_number: 0, deposit_amount: 0, first_deposit_number: 0 },
  },
  yesterday: {
    1: { registered: 2, deposit_number: 2, deposit_amount: 15000, first_deposit_number: 1 },
    2: { registered: 0, deposit_number: 0, deposit_amount: 0, first_deposit_number: 0 },
    3: { registered: 0, deposit_number: 0, deposit_amount: 0, first_deposit_number: 0 },
    4: { registered: 0, deposit_number: 0, deposit_amount: 0, first_deposit_number: 0 },
    5: { registered: 0, deposit_number: 0, deposit_amount: 0, first_deposit_number: 0 },
    6: { registered: 1, deposit_number: 0, deposit_amount: 0, first_deposit_number: 0 },
  },
};

const UserReport = () => {
  const [userIdInput, setUserIdInput] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTabLoading, setIsTabLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [teamSummary, setTeamSummary] = useState([]);
  const [levelUsersData, setLevelUsersData] = useState({});
  const [rebateEarnings, setRebateEarnings] = useState(mockRebateEarnings);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedUserId) {
      fetchData(selectedUserId);
    }
  }, [selectedUserId]);

  const fetchData = async (userId) => {
    setIsLoading(true);
    setApiError("");
    try {
      const teamSummaryData = await getTeamSummary(userId);
      setTeamSummary(teamSummaryData || mockTeamSummary);
      const rebateEarningsData = await getRebateEarnings(userId);
      setRebateEarnings(Array.isArray(rebateEarningsData) ? rebateEarningsData : mockRebateEarnings);
      await loadTabData("all", userId);
    } catch (error) {
      setApiError("Failed to fetch data. Please try again.");
      setTeamSummary(mockTeamSummary);
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTabData = async (tabType, userId = selectedUserId) => {
    if (!userId) return;
    setIsTabLoading(true);
    try {
      const period = tabType === "all" ? "all" : tabType;
      const teamLevelData = await getTeamLevelStats(userId, period);
      if (teamLevelData?.success && Array.isArray(teamLevelData?.data)) {
        const formattedData = teamLevelData.data.reduce((acc, item) => {
          acc[item.level] = { 
            registered: item.registered || 0, 
            deposit_number: item.deposit_number || 0, 
            deposit_amount: item.deposit_amount || 0, 
            first_deposit_number: item.first_deposit_number || 0 
          };
          return acc;
        }, {});
        setLevelUsersData((prev) => {
          const newData = { ...prev, [tabType]: formattedData };
          console.log("Updated levelUsersData:", newData); // Debug log
          return newData;
        });
      } else {
        console.log("API response issue:", teamLevelData);
        setLevelUsersData((prev) => ({ ...prev, [tabType]: mockLevelUsers[tabType] || {} }));
      }
    } catch (error) {
      console.error(`Failed to fetch ${tabType} data:`, error);
      setLevelUsersData((prev) => ({ ...prev, [tabType]: mockLevelUsers[tabType] || {} }));
    } finally {
      setIsTabLoading(false);
    }
  };

  const handleTabChange = async (newTab) => {
    setActiveTab(newTab);
    await loadTabData(newTab);
  };

  const handleUserIdSubmit = async () => {
    if (!userIdInput.trim()) {
      setApiError("Please enter a valid User ID");
      return;
    }
    setSelectedUserId(userIdInput.trim());
  };

  const handleReset = () => {
    setSelectedUserId("");
    setUserIdInput("");
    setTeamSummary([]);
    setLevelUsersData({});
    setRebateEarnings(mockRebateEarnings);
    setApiError("");
    setActiveTab("all");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleUserIdSubmit();
  };

  const renderSubordinateReport = () => {
    const levelData = levelUsersData[activeTab] || {};
    const directData = levelData[1] || { registered: 0, deposit_number: 0, deposit_amount: 0, first_deposit_number: 0 };
    const teamLevels = [2, 3, 4, 5, 6];
    const teamData = teamLevels.reduce((acc, level) => {
      const levelInfo = levelData[level] || { registered: 0, deposit_number: 0, deposit_amount: 0, first_deposit_number: 0 };
      acc.registered += levelInfo.registered || 0;
      acc.deposit_number += levelInfo.deposit_number || 0;
      acc.deposit_amount += levelInfo.deposit_amount || 0;
      acc.first_deposit_number += levelInfo.first_deposit_number || 0;
      return acc;
    }, { registered: 0, deposit_number: 0, deposit_amount: 0, first_deposit_number: 0 });

    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl w-full">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-stretch">
          {/* Direct Subordinate */}
          <div className="flex-1">
            <h4 className="text-center text-sm font-medium text-gray-600 mb-3">
              Direct Subordinate
            </h4>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-blue-100 p-2 rounded">
                <p className="text-sm font-semibold">Register</p>
                <p className="text-md">{directData.registered}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded">
                <p className="text-sm font-semibold">Deposit No.</p>
                <p className="text-md">{directData.deposit_number}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded">
                <p className="text-sm font-semibold">Deposit Amt.</p>
                <p className="text-md">₹{directData.deposit_amount}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded">
                <p className="text-sm font-semibold">First Deposit</p>
                <p className="text-md">{directData.first_deposit_number}</p>
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block w-px bg-gray-300"></div>

          {/* Team Subordinate */}
          <div className="flex-1">
            <h4 className="text-center text-sm font-medium text-gray-600 mb-3">
              Team Subordinate
            </h4>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-green-100 p-2 rounded">
                <p className="text-sm font-semibold">Register</p>
                <p className="text-md">{teamData.registered}</p>
              </div>
              <div className="bg-green-100 p-2 rounded">
                <p className="text-sm font-semibold">Deposit No.</p>
                <p className="text-md">{teamData.deposit_number}</p>
              </div>
              <div className="bg-green-100 p-2 rounded">
                <p className="text-sm font-semibold">Deposit Amt.</p>
                <p className="text-md">₹{teamData.deposit_amount}</p>
              </div>
              <div className="bg-green-100 p-2 rounded">
                <p className="text-sm font-semibold">First Deposit</p>
                <p className="text-md">{teamData.first_deposit_number}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

  const renderSalaryReport = (reportType) => {
    let salaryData = Array.isArray(rebateEarnings) ? rebateEarnings : [];
    if (reportType === "todaySalary") {
      const today = new Date().toISOString().split("T")[0];
      salaryData = salaryData.filter((item) => item.date === today);
    } else if (reportType === "yesterdaySalary") {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      salaryData = salaryData.filter((item) => item.date === yesterday);
    }
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
            {salaryData.length > 0 ? (
              salaryData.map((level) => (
                <tr key={level.level}>
                  <td>
                    <Link to={`/level-details/${level.level}`} className="text-blue-600 hover:underline">
                      Level {level.level}
                    </Link>
                  </td>
                  <td>{level.activeMembers || 0}</td>
                  <td>{level.totalDepositAmount || "₹0"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">No salary data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  if (!selectedUserId) {
    return (
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold">User Report</h2>
        </div>
        <div className="card-body py-8">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-sm btn-outline-primary flex items-center gap-1 mb-6"
          >
            <Icon icon="ic:round-arrow-back" className="text-lg" />
            Back
          </button>
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-medium mb-4 text-center">Enter User ID to View Report</h3>
            {apiError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
                {apiError}
              </div>
            )}
            <div className="mb-4">
              <div className="input-group">
                <span className="input-group-text">
                  <Icon icon="mdi:account" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter User ID"
                  value={userIdInput}
                  onChange={(e) => setUserIdInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUserIdSubmit}
                  disabled={isLoading || !userIdInput.trim()}
                >
                  {isLoading ? (
                    <>
                      <Icon icon="mdi:loading" className="animate-spin mr-2" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:magnify" className="mr-2" />
                      Search
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">User Report - {selectedUserId}</h2>
          <button onClick={handleReset} className="btn btn-sm btn-outline-secondary">
            <Icon icon="mdi:refresh" className="mr-1" />
            Change User
          </button>
        </div>
      </div>
      <div className="card-body py-8">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-sm btn-outline-primary flex items-center gap-1 mb-4"
        >
          <Icon icon="ic:round-arrow-back" className="text-lg" />
          Back
        </button>
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Team Summary (Level-Wise)</h3>
          <div className="table-responsive scroll-sm">
            <table className="table bordered-table text-sm w-full">
              <thead>
                <tr>
                  <th>Level</th>
                  <th>User Count</th>
                  <th>Total Recharge</th>
                  <th>Total Withdraw</th>
                  <th>Total Team Balance</th>
                  <th>Earned Commission</th>
                </tr>
              </thead>
              <tbody>
                {teamSummary.length > 0 ? (
                  teamSummary.map((level) => (
                    <tr key={level.level}>
                      <td>
                        <Link to={`/level-details/${level.level}`} className="text-blue-600 hover:underline">
                          Level {level.level}
                        </Link>
                      </td>
                      <td>{level.member_count || "₹0"}</td>
                      <td>{level.total_recharge || "₹0"}</td>
                      <td>{level.total_withdraw || "₹0"}</td>
                      <td>{level.total_team_balance || "₹0"}</td>
                      <td>{level.total_team_balance || "₹0"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No team summary data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4">Level-Wise User Report</h3>
          <div className="mb-4">
            <ul className="nav nav-tabs">
              {["today", "all", "yesterday", "todaySalary", "yesterdaySalary"].map((tab) => (
                <li key={tab} className="nav-item">
                  <button
                    className={`nav-link ${activeTab === tab ? "active" : ""}`}
                    onClick={() => handleTabChange(tab)}
                    disabled={isTabLoading}
                  >
                    {isTabLoading && activeTab === tab ? (
                      <>
                        <Icon icon="mdi:loading" className="animate-spin mr-1" />
                        Loading...
                      </>
                    ) : (
                      `${tab.replace(/([A-Z])/g, " $1")} Report`
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {isTabLoading ? (
            <div className="text-center py-8">
              <Icon icon="mdi:loading" className="animate-spin text-2xl mb-2" />
              <p>Loading data...</p>
            </div>
          ) : (
            <>
              {["today", "all", "yesterday"].includes(activeTab) && renderSubordinateReport()}
              {["todaySalary", "yesterdaySalary"].includes(activeTab) && renderSalaryReport(activeTab)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserReport;