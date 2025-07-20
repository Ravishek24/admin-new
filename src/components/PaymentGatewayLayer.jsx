import React, { useEffect, useState } from "react";
import Paypal from "./child/Paypal";
import RazorPay from "./child/RazorPay";
import {
  fetchStats,
  getDepositGateways,
  getWithdrawalGateways,
  toggleDepositStatus,
  toggleWithdrawalStatus,
  updateDepositLimits,
} from "../utils/apiService";
import GatewayComponent from "./child/Paypal";

const PaymentGatewayLayer = () => {
  const [depositGateways, setDepositGateways] = useState([]);
  const [withdrawalGateways, setWithdrawalGateways] = useState([]);
  const [gatewayStats, setGatewayStats] = useState([]);
  const [selectedType, setSelectedType] = useState("deposit");
  const [selectedGateway, setSelectedGateway] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch gateway stats
  const fetchGatewayStats = async () => {
    try {
      const response = await fetchStats();
      if (response.success) {
        setGatewayStats(response.stats);
      }
    } catch (error) {
      console.error("Error fetching gateway stats:", error);
    }
  };

  useEffect(() => {
    const fetchGateways = async () => {
      try {
        setLoading(true);
        const deposits = await getDepositGateways();
        const withdrawals = await getWithdrawalGateways();

        setDepositGateways(deposits.gateways);
        setWithdrawalGateways(withdrawals.gateways);

        // Fetch stats

        // Set default selection
        if (deposits.gateways.length > 0) {
          setSelectedGateway(deposits.gateways[0].gateway_name);
        }
      } catch (error) {
        console.error("Error fetching gateways:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGateways();
    fetchGatewayStats();
  }, []);

  useEffect(() => {
    const currentGateways =
      selectedType === "deposit" ? depositGateways : withdrawalGateways;
    if (currentGateways.length > 0) {
      setSelectedGateway(currentGateways[0].gateway_name);
    }
  }, [selectedType, depositGateways, withdrawalGateways]);

  const handleSaveGateway = async (gatewayData) => {
    await toggleDepositStatus(gatewayData?.id, gatewayData);
    // Refresh stats after save
    await fetchGatewayStats();
  };

  const getCurrentGateways = () => {
    return selectedType === "deposit" ? depositGateways : withdrawalGateways;
  };

  const getSelectedGatewayData = () => {
    const gateways = getCurrentGateways();
    return gateways.find((gateway) => gateway.gateway_name === selectedGateway);
  };

  const handleToggleDeposit = async (id, data, value) => {
    data.is_deposit_enabled = value;
    try {
      const result = await toggleDepositStatus(id, data);
      console.log("Deposit toggled:", result);
      // Refresh stats after toggle
      await fetchGatewayStats();
    } catch (err) {
      alert("Failed to toggle deposit status");
    }
  };

  const handleToggleWithdrawal = async (id, data, value) => {
    data.is_withdrawal_enabled = value;
    try {
      const result = await toggleWithdrawalStatus(id, data);
      console.log("Withdrawal toggled:", result);
      // Refresh stats after toggle
      await fetchGatewayStats();
    } catch (err) {
      alert("Failed to toggle withdrawal status");
    }
  };

  const handleUpdateLimits = async (gatewayData) => {
    try {
      const result = await updateDepositLimits(gatewayData?.id, {
        max_deposit_amount: gatewayData?.max_amount,
        min_deposit_amount: gatewayData?.min_amount,
      });
      console.log("Limits updated:", result);
      // Refresh stats after limit update
      await fetchGatewayStats();
    } catch (err) {
      alert("Failed to update deposit limits");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatsForGateway = (gatewayName) => {
    return gatewayStats.find((stat) => stat.gateway_name === gatewayName);
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header bg-primary-50 border-bottom py-20 px-24">
        <h5 className="text-xl fw-semibold text-primary-600 mb-0">
          Payment Gateway Management
        </h5>
      </div>
      <div className="card-body p-24">
        {/* Gateway Stats Overview */}

        {/* Type and Gateway Selection */}
        <div className="row gy-3 mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold text-primary-light text-md mb-8">
              Gateway Type
              <span className="text-danger-600">*</span>
            </label>
            <select
              className="form-control radius-8 form-select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="deposit">Deposit Gateways</option>
              <option value="withdrawal">Withdrawal Gateways</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold text-primary-light text-md mb-8">
              Select Gateway
              <span className="text-danger-600">*</span>
            </label>
            <select
              className="form-control radius-8 form-select"
              value={selectedGateway}
              onChange={(e) => setSelectedGateway(e.target.value)}
            >
              <option value="">Choose Gateway...</option>
              {getCurrentGateways().map((gateway, index) => (
                <option key={index} value={gateway.gateway_name}>
                  {gateway.gateway_name}
                  {getStatsForGateway(gateway.gateway_name) &&
                    ` - Net: ${formatCurrency(
                      getStatsForGateway(gateway.gateway_name).net_amount
                    )}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Gateway Configuration */}
        <div className="row gy-4">
          {selectedGateway && !loading && (
            <GatewayComponent
              key={`${selectedType}-${selectedGateway}`}
              gatewayData={getSelectedGatewayData()}
              type={selectedType}
              onSave={handleSaveGateway}
              onToggleDeposit={handleToggleDeposit}
              onToggleWithdrawal={handleToggleWithdrawal}
              onUpdateLimit={handleUpdateLimits}
            />
          )}
        </div>

        {/* Gateway List Overview */}
        <div className="mt-6">
          <h6 className="text-lg fw-semibold text-primary-600 mb-3">
            Available{" "}
            {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}{" "}
            Gateways
          </h6>
          <div className="row gy-2">
            {getCurrentGateways().map((gateway, index) => {
              const stats = getStatsForGateway(gateway.gateway_name);
              return (
                <div key={index} className="col-md-4 col-sm-6">
                  <div
                    className={`p-3 border rounded cursor-pointer transition-all ${
                      selectedGateway === gateway.gateway_name
                        ? "border-primary bg-primary-50"
                        : "border-gray-300 hover:border-primary"
                    }`}
                    onClick={() => setSelectedGateway(gateway.gateway_name)}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="fw-medium text-sm">
                        {gateway.gateway_name}
                      </span>
                      {selectedType === "deposit" && gateway.min_amount && (
                        <span className="text-xs text-muted">
                          {gateway.min_amount} - {gateway.max_amount}
                        </span>
                      )}
                    </div>
                    {stats && (
                      <div className="text-xs text-muted">
                        <div className="d-flex justify-content-between">
                          <span>
                            Today:{" "}
                            {formatCurrency(
                              selectedType === "deposit"
                                ? stats.today_deposits
                                : stats.today_withdrawals
                            )}
                          </span>
                          <span
                            className={
                              stats.net_amount >= 0
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            Net: {formatCurrency(stats.net_amount)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {gatewayStats.length > 0 && (
          <div className="mb-6">
            <h6 className="text-lg fw-semibold text-primary-600 mb-3">
              Gateway Statistics Overview
            </h6>
            <div className="row gy-3 mb-4">
              {gatewayStats.map((stat, index) => (
                <div key={index} className="col-lg-6 col-xl-4">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body p-3">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <h6 className="text-md fw-semibold text-primary-600 mb-0">
                          {stat.gateway_name}
                        </h6>
                        <span className="badge bg-light text-primary text-xs px-2 py-1">
                          {stat.gateway_code}
                        </span>
                      </div>

                      <div className="row gy-2 text-sm">
                        <div className="col-6">
                          <div className="text-muted">Today Deposits</div>
                          <div className="fw-semibold text-success">
                            {formatCurrency(stat.today_deposits)}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="text-muted">Today Withdrawals</div>
                          <div className="fw-semibold text-warning">
                            {formatCurrency(stat.today_withdrawals)}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="text-muted">Total Deposits</div>
                          <div className="fw-semibold text-success">
                            {formatCurrency(stat.total_deposits)}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="text-muted">Total Withdrawals</div>
                          <div className="fw-semibold text-warning">
                            {formatCurrency(stat.total_withdrawals)}
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="border-top pt-2 mt-1">
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="text-muted">Net Amount</span>
                              <span
                                className={`fw-bold ${
                                  stat.net_amount >= 0
                                    ? "text-success"
                                    : "text-danger"
                                }`}
                              >
                                {formatCurrency(stat.net_amount)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Selected Gateway Stats */}
        {selectedGateway && getStatsForGateway(selectedGateway) && (
          <div className="alert alert-info mb-4">
            <div className="row text-sm">
              <div className="col-md-3">
                <strong>Today's Activity:</strong>
                <br />
                Deposits:{" "}
                {formatCurrency(
                  getStatsForGateway(selectedGateway).today_deposits
                )}
                <br />
                Withdrawals:{" "}
                {formatCurrency(
                  getStatsForGateway(selectedGateway).today_withdrawals
                )}
              </div>
              <div className="col-md-3">
                <strong>Total Activity:</strong>
                <br />
                Deposits:{" "}
                {formatCurrency(
                  getStatsForGateway(selectedGateway).total_deposits
                )}
                <br />
                Withdrawals:{" "}
                {formatCurrency(
                  getStatsForGateway(selectedGateway).total_withdrawals
                )}
              </div>
              <div className="col-md-3">
                <strong>Net Amount:</strong>
                <br />
                <span
                  className={`fw-bold ${
                    getStatsForGateway(selectedGateway).net_amount >= 0
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {formatCurrency(
                    getStatsForGateway(selectedGateway).net_amount
                  )}
                </span>
              </div>
              <div className="col-md-3">
                <strong>Gateway Code:</strong>
                <br />
                <span className="badge bg-primary text-white">
                  {getStatsForGateway(selectedGateway).gateway_code}
                </span>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentGatewayLayer;
