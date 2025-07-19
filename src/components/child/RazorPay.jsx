import React, { useState } from 'react';

const RazorPay = () => {
    const [isEnabled, setIsEnabled] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [popupText, setPopupText] = useState('');
    const [payInEnabled, setPayInEnabled] = useState(true);
    const [payOutEnabled, setPayOutEnabled] = useState(true);

    const handleToggle = () => {
        const newValue = !isEnabled;
        setIsEnabled(newValue);
        setPopupText(newValue ? 'Enabled' : 'Disabled');
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
    };

    const handlePayInToggle = () => {
        setPayInEnabled(!payInEnabled);
    };

    const handlePayOutToggle = () => {
        setPayOutEnabled(!payOutEnabled);
    };

    return (
        <div className="col-xxl-6 position-relative">
            {showPopup && (
                <div className="position-absolute top-0 end-0 mt-3 me-3 bg-success text-white px-3 py-2 rounded shadow" style={{ zIndex: 10 }}>
                    {popupText}
                </div>
            )}
            <div className="card radius-12 shadow-none border overflow-hidden">
                <div className="card-header bg-neutral-100 border-bottom py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                    <div className="d-flex align-items-center gap-10">
                        <span className="text-lg fw-semibold text-primary-light">
                            RazorPay
                        </span>
                    </div>
                    <div className="form-switch switch-primary d-flex align-items-center justify-content-center">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked={isEnabled}
                            onChange={handleToggle}
                        />
                    </div>
                </div>
                <div className="card-body p-24">
                    <div className="row gy-3">
                        <div className="col-sm-6">
                            <label htmlFor="currencyTwo" className="form-label fw-semibold text-primary-light text-md mb-8">
                                Currency <span className="text-danger-600">*</span>
                            </label>
                            <select
                                className="form-control radius-8 form-select"
                                id="currencyTwo"
                                defaultValue="USD"
                            >
                                <option value="USD" disabled>USD</option>
                                
                                <option value="Rupee">Rupee</option>
                            </select>
                        </div>

                        {/* Pay In Section */}
                        <div className="col-sm-6">
                            <div className="d-flex align-items-center gap-2 mb-8">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={payInEnabled}
                                    onChange={handlePayInToggle}
                                />
                                <label className="form-label fw-semibold text-primary-light text-md mb-0">
                                    Pay In Amount (Min - Max)
                                </label>
                            </div>
                            <div className="d-flex gap-3">
                                <input
                                    type="number"
                                    className="form-control radius-8"
                                    placeholder="Min"
                                    disabled={!payInEnabled}
                                />
                                <input
                                    type="number"
                                    className="form-control radius-8"
                                    placeholder="Max"
                                    disabled={!payInEnabled}
                                />
                            </div>
                        </div>

                        {/* Pay Out Section */}
                        <div className="col-sm-6">
                            <div className="d-flex align-items-center gap-2 mb-8">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={payOutEnabled}
                                    onChange={handlePayOutToggle}
                                />
                                <label className="form-label fw-semibold text-primary-light text-md mb-0">
                                    Pay Out Amount (Min - Max)
                                </label>
                            </div>
                            <div className="d-flex gap-3">
                                <input
                                    type="number"
                                    className="form-control radius-8"
                                    placeholder="Min"
                                    disabled={!payOutEnabled}
                                />
                                <input
                                    type="number"
                                    className="form-control radius-8"
                                    placeholder="Max"
                                    disabled={!payOutEnabled}
                                />
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <label className="form-label fw-semibold text-primary-light text-md mb-8">
                                <span className="visibility-hidden">Save</span>
                            </label>
                            <button
                                type="submit"
                                className="btn btn-primary border border-primary-600 text-md px-24 py-8 radius-8 w-100 text-center"
                            >
                                Save Change
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RazorPay;