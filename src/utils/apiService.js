// src/api/apiService.js
import axiosInstance from './axios';

export const signIn = async (email) => {
    try {
        const response = await axiosInstance.post('/admin/direct-login', { email });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getTotalUsers = async () => {
    try {
        const response = await axiosInstance.get('/admin/stats/total-users');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch total users:', error);
        throw error;
    }
};

export const getTodayRegistration = async () => {
    try {
        const response = await axiosInstance.get('/admin/stats/today-registrations');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch total users:', error);
        throw error;
    }
};

export const getUserStats = async () => {
    try {
        const response = await axiosInstance.get('/admin/stats/user-stats');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch total users:', error);
        throw error;
    }
};


export const getTodayProfit = async () => {
    try {
        const response = await axiosInstance.get('/admin/stats/profit/today');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch total users:', error);
        throw error;
    }
};

export const getWeeklyProfit = async () => {
    try {
        const response = await axiosInstance.get('/admin/stats/profit/weekly');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch total users:', error);
        throw error;
    }
};

export const getTodayWithDrawRecharge = async () => {
    try {
        const response = await axiosInstance.get('/admin/stats/financial');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch total users:', error);
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
    const response = await axiosInstance.get('/admin/withdrawals/pending', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch pending withdrawals:', error);
    throw error;
  }
};

export const processWithdrawal = async ({ withdrawal_id, action, gateway, notes }) => {
  try {
    const payload = {
      withdrawal_id,
      action,
      ...(action === 'approve' && { gateway }),       // required only for approval
      ...(action === 'reject' && { notes }),          // required only for rejection
    };

    const response = await axiosInstance.post('/admin/withdrawals/process', payload);
    return response.data;
  } catch (error) {
    console.error('Failed to process withdrawal:', error);
    throw error;
  }
};


export const getPendingRecharge = async (page) => {
    try {
        const response = await axiosInstance.get('/admin/recharges/pending', {
            params: { page },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch total users:', error);
        throw error;
    }
};
export const getPendingRechargeFirst = async () => {
    try {
        const response = await axiosInstance.get('/admin/recharges/first-time');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch total users:', error);
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
        const response = await axiosInstance.post('/admin/gift-codes', {
            number_of_users: numberOfUsers,
            total_amount: totalAmount,
        });
        return response.data;
    } catch (error) {
        console.error('Failed to generate gift code:', error);
        throw error;
    }
};

export const getGiftCode = async (page = 1) => {
  try {
    const response = await axiosInstance.get('/admin/gift-codes', {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch gift codes:', error);
    throw error;
  }
};

export const getGiftCodeClaimedUser = async (code,page = 1) => {
  try {
    const response = await axiosInstance.get(`/admin/gift-codes/${code}`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch gift codes:', error);
    throw error;
  }
};

export const getSuccessfulRecharges = async (page = 1) => {
  try {
    const response = await axiosInstance.get(`/api/admin/recharges/successful`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch successful recharges:', error);
    throw error;
  }
};

export const setResult = async (data) => {
  try {
    const response = await axiosInstance.post(`/admin/games/wingo/set-result`,data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch successful recharges:', error);
    throw error;
  }
};

// GET /api/payment-gateways/deposit
export const getDepositGateways = async () => {
  try {
    const response = await axiosInstance.get('/admin/payment-gateways/deposit');
    return response.data;
  } catch (error) {
    console.error('Error fetching deposit gateways:', error);
    throw error;
  }
};

// GET /payment-gateways/withdrawal
export const getWithdrawalGateways = async () => {
  try {
    const response = await axiosInstance.get('/admin/payment-gateways/withdrawal');
    return response.data;
  } catch (error) {
    console.error('Error fetching withdrawal gateways:', error);
    throw error;
  }
};


// PUT /api/admin/payment-gateways/:id/toggle-deposit
export const toggleDepositStatus = async (id) => {
  try {
    const response = await axiosInstance.put(`/admin/payment-gateways/${id}/toggle-deposit`);
    return response.data;
  } catch (error) {
    console.error(`Error toggling deposit status for ID ${id}:`, error.response?.data || error);
    throw error;
  }
};
// PUT /admin/payment-gateways/:id/toggle-withdrawal
export const toggleWithdrawalStatus = async (id) => {
  try {
    const response = await axiosInstance.put(`/admin/payment-gateways/${id}/toggle-withdrawal`);
    return response.data;
  } catch (error) {
    console.error(`Error toggling withdrawal status for ID ${id}:`, error.response?.data || error);
    throw error;
  }
};


// PUT /api/admin/payment-gateways/:id/deposit-limits
export const updateDepositLimits = async (id, limits) => {
  try {
    const response = await axiosInstance.put(`/admin/payment-gateways/${id}/deposit-limits`, limits);
    return response.data;
  } catch (error) {
    console.error(`Error updating deposit limits for ID ${id}:`, error.response?.data || error);
    throw error;
  }
};


export const getUserBetHistory = async (userId, startDate, endDate) => {
  try {
    const response = await axiosInstance.get(
      `/users/admin/users/${userId}/bet-history`,
      {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch bet history:', error);
    throw error;
  }
};

export const getUserDepositHistory = async (userId, startDate, endDate) => {
  const response = await axiosInstance.get(`/users/admin/users/${userId}/deposit-history`, {
    params: { start_date: startDate, end_date: endDate },
  });
  return response.data;
};

export const getUserWithdrawalHistory = async (userId, startDate, endDate) => {
  const response = await axiosInstance.get(`/users/admin/users/${userId}/withdrawal-history`, {
    params: { start_date: startDate, end_date: endDate },
  });
  return response.data;
};

export const getUserBankDetails = async (userId) => {
  const response = await axiosInstance.get(`/users/admin/users/${userId}/bank-detail`);
  return response.data;
};

export const getUserTransactionHistory = async (userId) => {
  const response = await axiosInstance.get(`/users/admin/users/${userId}/transaction-history`);
  return response.data;
};