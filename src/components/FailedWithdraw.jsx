import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getFailedWithdrawals } from "../utils/apiService";
import Pagination from "./comman/Pagination";

const FailedWithdraw = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    limit: 10,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchWithdrawals();
  }, [pagination.page]);

  const fetchWithdrawals = async () => {
    setIsLoading(true);
    try {
      const data = await getFailedWithdrawals({
        page: pagination.page,
        limit: pagination.limit,
        start_date: filters.start_date || undefined,
        end_date: filters.end_date || undefined,
      });
      setWithdrawals(data.withdrawals || []);
      setPagination(data.pagination || pagination);
    } catch (error) {
      console.error("Failed to fetch withdrawals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchWithdrawals();
  };

  const handleClearFilters = () => {
    setFilters({
      start_date: "",
      end_date: "",
    });
    setPagination(prev => ({ ...prev, page: 1 }));
    // Trigger fetch after clearing filters
    setTimeout(() => {
      fetchWithdrawals();
    }, 0);
  };

  const handleBackClick = () => {
    navigate(-1);
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
        {/* Filters Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium mb-4">Filters</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Start Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="datetime-local"
                className="form-control"
                value={filters.start_date}
                onChange={(e) => handleFilterChange('start_date', e.target.value)}
              />
            </div>
            
            {/* End Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="datetime-local"
                className="form-control"
                value={filters.end_date}
                onChange={(e) => handleFilterChange('end_date', e.target.value)}
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-end gap-2">
              <button
                onClick={handleSearch}
                className="btn btn-primary flex items-center gap-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icon icon="mdi:loading" className="animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:magnify" />
                    Search
                  </>
                )}
              </button>
              <button
                onClick={handleClearFilters}
                className="btn btn-outline-secondary flex items-center gap-1"
                disabled={isLoading}
              >
                <Icon icon="mdi:refresh" />
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {withdrawals.length} of {pagination.total} results 
            (Page {pagination.page} of {pagination.pages})
          </p>
        </div>

        {/* Table */}
        <div
          className="table-responsive scroll-sm"
          style={{
            overflowX: "auto",
            scrollbarWidth: "10px",
            scrollbarColor: "#6b7280 transparent",
          }}
        >
          <style>
            {`
              .table-responsive.scroll-sm::-webkit-scrollbar {
                height: 10px;
              }
              .table-responsive.scroll-sm::-webkit-scrollbar-track {
                background: transparent;
              }
              .table-responsive.scroll-sm::-webkit-scrollbar-thumb {
                background: #6b7280;
                border-radius: 5px;
              }
              .table-responsive.scroll-sm::-webkit-scrollbar-thumb:hover {
                background: #4b5563;
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
              {isLoading ? (
                <tr>
                  <td colSpan="18" className="text-center py-8">
                    <Icon icon="mdi:loading" className="animate-spin text-2xl mb-2" />
                    <div>Loading withdrawals...</div>
                  </td>
                </tr>
              ) : withdrawals.length > 0 ? (
                withdrawals.map((withdraw) => (
                  <tr key={withdraw.order_id}>
                    <td>{withdraw.user_id}</td>
                    <td>{withdraw.phone_no}</td>
                    <td>{withdraw.order_id}</td>
                    <td>{withdraw.withdrawal_type}</td>
                    <td>{withdraw.amount}</td>
                    <td>{withdraw.wallet_balance}</td>
                    <td>{withdraw.totalRechargeAmount}</td>
                    <td>{withdraw.totalWithdrawAmount}</td>
                    <td>{withdraw.bank_name || "-"}</td>
                    <td>{withdraw.account_number || "-"}</td>
                    <td>{withdraw.ifsc_code || "-"}</td>
                    <td>{withdraw.usdtNetwork || "-"}</td>
                    <td>{withdraw.usdtAddress || "-"}</td>
                    <td>{withdraw.addressAlias || "-"}</td>
                    <td>{withdraw.created_at}</td>
                    <td>{withdraw.senderGatewayName || "-"}</td>
                    <td>
                      <span className="text-red-600 font-medium">
                        {withdraw.failure_reason || "-"}
                      </span>
                    </td>
                    <td>{withdraw.failed_at || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="18" className="text-center py-4">
                    No failed withdraw requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="mt-4">
            <Pagination
              pagination={pagination}
              onPageChange={(newPage) =>
                setPagination((prev) => ({ ...prev, page: newPage }))
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FailedWithdraw;