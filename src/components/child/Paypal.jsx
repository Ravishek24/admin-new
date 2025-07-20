import { useEffect, useState } from "react";

const GatewayComponent = ({
  gatewayData,
  type, // 'deposit' or 'withdrawal'
  onSave,
  onToggleDeposit, // Parent function for deposit toggle
  onToggleWithdrawal,
  onUpdateLimit
}) => {
  console.log(gatewayData);

  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [payInEnabled, setPayInEnabled] = useState(
    gatewayData?.is_deposit_enabled
  );
  const [payOutEnabled, setPayOutEnabled] = useState(
    gatewayData?.is_withdrawal_enabled
  );
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  // Set initial values when gatewayData changes
  useEffect(() => {
    if (gatewayData) {
      // Set amounts
      setMinAmount(gatewayData.min_amount || "");
      setMaxAmount(gatewayData.max_amount || "");

      // For deposits, check is_deposit_enabled
      if (type === "deposit") {
        setPayInEnabled(gatewayData.is_deposit_enabled !== false);
      }

      // For withdrawals, check is_withdrawal_enabled
      if (type === "withdrawal") {
        setPayOutEnabled(gatewayData.is_withdrawal_enabled !== false);
      }
    }
  }, [gatewayData, type]);

  const handlePayInToggle = async () => {
    const newValue = !payInEnabled;

    try {
      if (onToggleDeposit) {
        setPopupText("Updating deposit status...");
        setShowPopup(true);

        await onToggleDeposit(gatewayData.gateway_id, gatewayData, newValue);

        // Update local state only after successful API call
        setPayInEnabled(newValue);
        setPopupText(newValue ? "Pay In Enabled" : "Pay In Disabled");
      } else {
        // Fallback for local state if no parent function provided
        setPayInEnabled(newValue);
        setPopupText(newValue ? "Pay In Enabled" : "Pay In Disabled");
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Failed to toggle pay in status:", error);
      setPopupText("Failed to update pay in status");
      setShowPopup(true);
    }

    setTimeout(() => setShowPopup(false), 3000);
  };

  const handlePayOutToggle = async () => {
    const newValue = !payOutEnabled;

    try {
      if (onToggleWithdrawal) {
        setPopupText("Updating withdrawal status...");
        setShowPopup(true);

        await onToggleWithdrawal(gatewayData.gateway_id, gatewayData, newValue);

        // Update local state only after successful API call
        setPayOutEnabled(newValue);
        setPopupText(newValue ? "Pay Out Enabled" : "Pay Out Disabled");
      } else {
        // Fallback for local state if no parent function provided
        setPayOutEnabled(newValue);
        setPopupText(newValue ? "Pay Out Enabled" : "Pay Out Disabled");
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Failed to toggle pay out status:", error);
      setPopupText("Failed to update pay out status");
      setShowPopup(true);
    }

    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleSave = () => {   const saveData = {
      min_amount: type === "deposit" ? Number(minAmount) : undefined,
      max_amount: type === "deposit" ? Number(maxAmount) : undefined,
      id: gatewayData?.gateway_id,
    };


    onSave && onUpdateLimit(saveData);

    setPopupText("Settings Saved Successfully");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  if (!gatewayData) return null;

  // Check if gateway is disabled from API
  const isGatewayDisabled = gatewayData.is_active === false;
  const isDepositDisabled =
    type === "deposit" && gatewayData.is_deposit_enabled === false;

  return (
    <div className="col-xxl-6 position-relative mb-4">
      {showPopup && (
        <div
          className="position-absolute top-0 end-0 mt-3 me-3 bg-success text-white px-3 py-2 rounded shadow"
          style={{ zIndex: 10 }}
        >
          {popupText}
        </div>
      )}
      <div
        className={`card radius-12 shadow-none border overflow-hidden ${
          isGatewayDisabled ? "opacity-75" : ""
        }`}
      >
        <div className="card-header bg-neutral-100 border-bottom py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
          <div className="d-flex align-items-center gap-10">
            <span className="text-lg fw-semibold text-primary-light">
              {gatewayData.gateway_name}
            </span>
            <span
              className={`badge text-white text-sm px-2 py-1 rounded ${
                type === "deposit" ? "bg-success" : "bg-info"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
            {isGatewayDisabled && (
              <span className="badge bg-danger text-white text-xs px-2 py-1 rounded">
                Disabled
              </span>
            )}
          </div>
          {/* Removed the main gateway toggle switch */}
        </div>
        <div className="card-body p-24">
          <div className="row gy-3">
            <div className="col-sm-6">
              <label
                htmlFor={`currency-${gatewayData.gateway_name}`}
                className="form-label fw-semibold text-primary-light text-md mb-8"
              >
                Currency
                <span className="text-danger-600">*</span>
              </label>
              <select
                className="form-control radius-8 form-select"
                id={`currency-${gatewayData.gateway_name}`}
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                disabled={isGatewayDisabled}
              >
                {/* <option value="USD">USD</option> */}
                <option value="INR">INR</option>
                {/* <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option> */}
              </select>
            </div>

            {/* Pay In Section - Only for deposits */}
            {type === "deposit" && (
              <div className="col-sm-6">
                <div className="d-flex align-items-center gap-2 mb-8">
                  <div className="form-switch switch-primary d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      checked={payInEnabled}
                      onChange={handlePayInToggle}
                    />
                  </div>
                  <label className="form-label fw-semibold text-primary-light text-md mb-0">
                    Pay In Amount (Min - Max)
                    {isDepositDisabled && (
                      <span className="text-danger text-xs ms-2">
                        (Disabled by API)
                      </span>
                    )}
                  </label>
                </div>
                <div className="d-flex gap-3">
                  <input
                    type="number"
                    className="form-control radius-8"
                    placeholder="Min Amount"
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                    disabled={
                      isGatewayDisabled || !payInEnabled || isDepositDisabled
                    }
                  />
                  <input
                    type="number"
                    className="form-control radius-8"
                    placeholder="Max Amount"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                    disabled={
                      isGatewayDisabled || !payInEnabled || isDepositDisabled
                    }
                  />
                </div>
                {type === "deposit" && minAmount && maxAmount && (
                  <div className="mt-2">
                    <small className="text-muted">
                      Range: ₹{minAmount} - ₹{maxAmount}
                    </small>
                  </div>
                )}
              </div>
            )}

            {/* Pay Out Section - Only for withdrawal */}
            {type === "withdrawal" && (
              <div className="col-sm-6">
                <div className="d-flex align-items-center gap-2 mb-8">
                  <div className="form-switch switch-primary d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      checked={payOutEnabled}
                      onChange={handlePayOutToggle}
                      disabled={isGatewayDisabled}
                    />
                  </div>
                  <label className="form-label fw-semibold text-primary-light text-md mb-0">
                    Pay Out Enabled
                  </label>
                </div>
                <div className="text-muted text-sm">
                  Enable this gateway for withdrawal transactions
                </div>
              </div>
            )}

            {/* Gateway Status Info */}
            <div className="col-sm-12">
              <div className="alert alert-info py-2 px-3 mb-3">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div className="d-flex align-items-center gap-3">
                    <span className="text-sm">
                      <strong>Status:</strong>
                      <span
                        className={`ms-1 ${
                          isGatewayDisabled ? "text-danger" : "text-success"
                        }`}
                      >
                        {isGatewayDisabled ? "Inactive" : "Active"}
                      </span>
                    </span>
                    {type === "deposit" && (
                      <span className="text-sm">
                        <strong>Deposit:</strong>
                        <span
                          className={`ms-1 ${
                            isDepositDisabled ? "text-danger" : "text-success"
                          }`}
                        >
                          {isDepositDisabled ? "Disabled" : "Enabled"}
                        </span>
                      </span>
                    )}
                  </div>
                  {type === "deposit" &&
                    gatewayData.min_amount &&
                    gatewayData.max_amount && (
                      <span className="text-sm text-muted">
                        API Limits: ₹{gatewayData.min_amount} - ₹
                        {gatewayData.max_amount}
                      </span>
                    )}
                </div>
              </div>
            </div>

            {type === "deposit" && (
              <div className="col-sm-6">
                <label className="form-label fw-semibold text-primary-light text-md mb-8">
                  <span className="visibility-hidden">Save</span>
                </label>
                <button
                  type="button"
                  className="btn btn-primary border border-primary-600 text-md px-24 py-8 radius-8 w-100 text-center"
                  onClick={handleSave}
                  disabled={!payInEnabled}
                >
                  {isGatewayDisabled ? "Gateway Disabled" : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GatewayComponent;
