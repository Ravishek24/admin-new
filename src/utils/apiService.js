// src/api/apiService.js
import axiosInstance from "./axios";

export const signIn = async (email) => {
  try {
    const response = await axiosInstance.post("/admin/direct-login", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTotalUsers = async () => {
  try {
    const response = await axiosInstance.get("/admin/stats/total-users");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch total users:", error);
    throw error;
  }
};

export const getTodayRegistration = async () => {
  try {
    const response = await axiosInstance.get(
      "/admin/stats/today-registrations"
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch total users:", error);
    throw error;
  }
};
export const getBlockusers = async () => {
  try {
    const response = await axiosInstance.get(
      "/admin/users/block"
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch block users:", error);
    throw error;
  }
};

export const getUserStats = async () => {
  try {
    const response = await axiosInstance.get("/admin/stats/user-stats");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch total users:", error);
    throw error;
  }
};

export const getTodayProfit = async () => {
  try {
    const response = await axiosInstance.get("/admin/stats/profit/today");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch total users:", error);
    throw error;
  }
};

export const getWeeklyProfit = async () => {
  try {
    const response = await axiosInstance.get("/admin/stats/profit/weekly");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch total users:", error);
    throw error;
  }
};

export const getPreviousWeeklyProfit = async () => {
  try {
    const response = await axiosInstance.get("/admin/stats/profit/weekly");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch total users:", error);
    throw error;
  }
};

export const getTodayWithDrawRecharge = async () => {
  try {
    const response = await axiosInstance.get("/admin/stats/financial");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch total users:", error);
    throw error;
  }
};

export const getUsers = async ({ search = "", page = 1 }) => {
  try {
    const response = await axiosInstance.get("/users/admin/users", {
      params: { search, page },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

export const blockUserById = async (userId, reason) => {
  try {
    const response = await axiosInstance.post(`/admin/users/${userId}/block`, {
      reason,
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to block user ${userId}:`, error);
    throw error;
  }
};

export const unblockUserById = async (userId) => {
  try {
    const response = await axiosInstance.post(`/admin/users/${userId}/unblock`);
    return response.data;
  } catch (error) {
    console.error(`Failed to unblock user ${userId}:`, error);
    throw error;
  }
};

export const getPendingWithDrawals = async (page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get("/admin/withdrawals/pending", {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch pending withdrawals:", error);
    throw error;
  }
};

export const processWithdrawal = async ({
  withdrawal_id,
  action,
  gateway,
  notes,
}) => {
  try {
    const payload = {
      withdrawal_id,
      action,
      ...(action === "approve" && { gateway }), // required only for approval
      ...(action === "reject" && { notes }), // required only for rejection
    };

    const response = await axiosInstance.post(
      "/admin/withdrawals/process",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Failed to process withdrawal:", error);
    throw error;
  }
};

export const getPendingRecharge = async (page) => {
  try {
    const response = await axiosInstance.get("/admin/recharges/pending", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch total users:", error);
    throw error;
  }
};
export const getPendingRechargeFirst = async () => {
  try {
    const response = await axiosInstance.get("/admin/recharges/first-time");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch total users:", error);
    throw error;
  }
};

export const getTopWithdrawalsToday = async () => {
  try {
    const response = await axiosInstance.get("/admin/withdrawals/top-today");
    return response.data.withdrawals || [];
  } catch (error) {
    console.error("Failed to fetch top withdrawals:", error);
    throw error;
  }
};

export const getTopDepositsToday = async () => {
  try {
    const response = await axiosInstance.get("/admin/recharges/top-today");
    return response.data.deposits || [];
  } catch (error) {
    console.error("Failed to fetch top deposits:", error);
    throw error;
  }
};

export const createGiftCode = async (numberOfUsers, totalAmount) => {
  try {
    const response = await axiosInstance.post("/admin/gift-codes", {
      number_of_users: numberOfUsers,
      total_amount: totalAmount,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to generate gift code:", error);
    throw error;
  }
};

export const getGiftCode = async (page = 1) => {
  try {
    const response = await axiosInstance.get("/admin/gift-codes", {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch gift codes:", error);
    throw error;
  }
};

export const getGiftCodeClaimedUser = async (code, page = 1) => {
  try {
    const response = await axiosInstance.get(`/admin/gift-codes/${code}`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch gift codes:", error);
    throw error;
  }
};

export const getSuccessfulRecharges = async (page = 1) => {
  try {
    const response = await axiosInstance.get(`/admin/recharges/successful`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch successful recharges:", error);
    throw error;
  }
};

export const setResult = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/admin/games/wingo/set-result`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch successful recharges:", error);
    throw error;
  }
};

// GET /api/payment-gateways/deposit
export const getDepositGateways = async () => {
  try {
    const response = await axiosInstance.get("/admin/payment-gateways/deposit");
    return response.data;
  } catch (error) {
    console.error("Error fetching deposit gateways:", error);
    throw error;
  }
};

// GET /payment-gateways/withdrawal
export const getWithdrawalGateways = async () => {
  try {
    const response = await axiosInstance.get(
      "/admin/payment-gateways/withdrawal"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching withdrawal gateways:", error);
    throw error;
  }
};

// PUT /api/admin/payment-gateways/:id/toggle-deposit
export const toggleDepositStatus = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      `/admin/payment-gateways/${id}/toggle-deposit`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error toggling deposit status for ID ${id}:`,
      error.response?.data || error
    );
    throw error;
  }
};
// PUT /admin/payment-gateways/:id/toggle-withdrawal
export const toggleWithdrawalStatus = async (id, data) => {
  try {
    const response = await axiosInstance.put(
      `/admin/payment-gateways/${id}/toggle-withdrawal`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error toggling withdrawal status for ID ${id}:`,
      error.response?.data || error
    );
    throw error;
  }
};

// PUT /api/admin/payment-gateways/:id/deposit-limits
export const updateDepositLimits = async (id, limits) => {
  try {
    const response = await axiosInstance.put(
      `/admin/payment-gateways/${id}/deposit-limits`,
      limits
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating deposit limits for ID ${id}:`,
      error.response?.data || error
    );
    throw error;
  }
};

export const getUserBetHistory = async (
  userId,
  startDate,
  endDate,
  page = 1,
  limit = 50
) => {
  try {
    const response = await axiosInstance.get(
      `/users/admin/users/${userId}/bet-history`,
      {
        params: {
          start_date: startDate,
          end_date: endDate,
          page: page,
          limit: limit,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch bet history:", error);
    throw error;
  }
};

export const getUserDepositHistory = async (
  userId,
  startDate,
  endDate,
  page = 1,
  limit = 50
) => {
  try {
    const response = await axiosInstance.get(
      `/users/admin/users/${userId}/deposit-history`,
      {
        params: {
          start_date: startDate,
          end_date: endDate,
          page: page,
          limit: limit,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch deposit history:", error);
    throw error;
  }
};

export const getUserWithdrawalHistory = async (
  userId,
  startDate,
  endDate,
  page = 1,
  limit = 50
) => {
  try {
    const response = await axiosInstance.get(
      `/users/admin/users/${userId}/withdrawal-history`,
      {
        params: {
          start_date: startDate,
          end_date: endDate,
          page: page,
          limit: limit,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch withdrawal history:", error);
    throw error;
  }
};

export const getUserBankDetails = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/users/admin/users/${userId}/bank-details`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch bank details:", error);
    throw error;
  }
};

export const getUserTransactionHistory = async (
  userId,
  page = 1,
  limit = 50
) => {
  try {
    const response = await axiosInstance.get(
      `/users/admin/users/${userId}/transaction-history`,
      {
        params: {
          page: page,
          limit: limit,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch transaction history:", error);
    throw error;
  }
};

export const fetchStats = async () => {
  try {
    const response = await axiosInstance.get(`/admin/payment-gateways/stats`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch transaction history:", error);
    throw error;
  }
};

export const getTeamLevelStats = async (userId, period = "total") => {
  try {
    const response = await axiosInstance.get(
      `/users/admin/users/${userId}/team-level-stats?period=${period}`
    );
    console.log("Raw API Response:", response.data);
    return response.data; // Full response with success and data
  } catch (error) {
    console.error(`Failed to fetch team level stats for user ${userId}:`, error);
    throw error;
  }
};

export const getRebateEarnings = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/users/admin/users/${userId}/rebate-earnings`
    );
    return response.data?.data || {};
  } catch (error) {
    console.error(`Failed to fetch rebate earnings for user ${userId}:`, error);
    throw error;
  }
};

export const getTeamSummary = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/users/admin/users/${userId}/team-summary`
    );
    return response.data?.data || {};
  } catch (error) {
    console.error(`Failed to fetch team summary for user ${userId}:`, error);
    throw error;
  }
};

export const processRecharge = async (id, action, notes) => {
  try {
    const payload = {
      recharge_id: id,
      action,
      ...(action === "approve"),
      ...(action === "reject" && { notes }),
    };
    console.log(payload);

    const response = await axiosInstance.post(
      "/admin/recharges/process",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Failed to process recharge:", error);
  }
};

export const adjustUserBalance = async (userId, amount, type, reason, wagering) => {
  try {
    const payload = {
      userId,
      amount,
      type, // 'add' or 'deduct'
      reason,
      wagering,
    };

    const response = await axiosInstance.post(
      `/admin/users/${userId}/balance`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Failed to adjust user balance:", error);
    throw error;
  }
};

export const getFailedWithdrawals = async ({
  page = 1,
  limit = 10,
  user_id,
  start_date,
  end_date,
}) => {
  try {
    const response = await axiosInstance.get(`/admin/withdrawals/failed`, {
      params: {
        page,
        limit,
        user_id,
        start_date,
        end_date,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch failed withdrawals:", error);
    throw error;
  }
};

export const getSuccessWithdrawals = async ({
  page = 1,
  limit = 10,
  user_id,
  start_date,
  end_date,
}) => {
  try {
    const response = await axiosInstance.get(`/admin/withdrawals/successful`, {
      params: {
        page,
        limit,
        start_date,
        end_date,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch failed withdrawals:", error);
    throw error;
  }
};

// gameStatsService.js
export const getSpribeStats = async (period = "today") => {
  try {
    return await axiosInstance.get(
      `/admin/stats/games/spribe?period=${period}`
    );
  } catch (error) {}
};

export const getSeamlessStats = async (period = "week") => {
  try {
    return await axiosInstance.get(
      `/admin/stats/games/seamless?period=${period}`
    );
  } catch (error) {}
};
