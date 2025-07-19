import React, { useEffect, useState } from 'react'
import Paypal from './child/Paypal'
import RazorPay from './child/RazorPay'
import { getDepositGateways, getWithdrawalGateways, toggleDepositStatus, toggleWithdrawalStatus, updateDepositLimits } from '../utils/apiService';
import GatewayComponent from './child/Paypal';

const PaymentGatewayLayer = () => {
    const [depositGateways, setDepositGateways] = useState([]);
    const [withdrawalGateways, setWithdrawalGateways] = useState([]);
    const [selectedType, setSelectedType] = useState('deposit');
    const [selectedGateway, setSelectedGateway] = useState('')

    useEffect(() => {
        const fetchGateways = async () => {
            try {
                const deposits = await getDepositGateways();
                const withdrawals = await getWithdrawalGateways();

                setDepositGateways(deposits.gateways);
                setWithdrawalGateways(withdrawals.gateways);

                // Set default selection
                if (deposits.gateways.length > 0) {
                    setSelectedGateway(deposits.gateways[0].gateway_name);
                }
            } catch (error) {
                console.error('Error fetching gateways:', error);
            }
        };

        fetchGateways();
    }, []);

    useEffect(() => {
        const currentGateways = selectedType === 'deposit' ? depositGateways : withdrawalGateways;
        if (currentGateways.length > 0) {
            setSelectedGateway(currentGateways[0].gateway_name);
        }
    }, [selectedType, depositGateways, withdrawalGateways]);

    const handleSaveGateway = (gatewayData) => {
        console.log('Saving gateway data:', gatewayData);
        // Implement your save logic here
    };

    const getCurrentGateways = () => {
        return selectedType === 'deposit' ? depositGateways : withdrawalGateways;
    };

    const getSelectedGatewayData = () => {
        const gateways = getCurrentGateways();
        return gateways.find(gateway => gateway.gateway_name === selectedGateway);
    };

    const handleToggleDeposit = async (id) => {
        try {
            const result = await toggleDepositStatus(id);
            console.log('Deposit toggled:', result);
        } catch (err) {
            alert('Failed to toggle deposit status');
        }
    };

    const handleToggleWithdrawal = async (id) => {
        try {
            const result = await toggleWithdrawalStatus(id);
            console.log('Withdrawal toggled:', result);
        } catch (err) {
            alert('Failed to toggle withdrawal status');
        }
    };

    const handleUpdateLimits = async () => {
        try {
            const result = await updateDepositLimits(1, { min: 200, max: 10000 });
            console.log('Limits updated:', result);
        } catch (err) {
            alert('Failed to update deposit limits');
        }
    };

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-header bg-primary-50 border-bottom py-20 px-24">
                <h5 className="text-xl fw-semibold text-primary-600 mb-0">Payment Gateway Management</h5>
            </div>
            <div className="card-body p-24">
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
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Gateway Configuration */}
                <div className="row gy-4">
                    {selectedGateway && (
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
                        Available {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} Gateways
                    </h6>
                    <div className="row gy-2">
                        {getCurrentGateways().map((gateway, index) => (
                            <div key={index} className="col-md-4 col-sm-6">
                                <div
                                    className={`p-3 border rounded cursor-pointer transition-all ${selectedGateway === gateway.gateway_name
                                            ? 'border-primary bg-primary-50'
                                            : 'border-gray-300 hover:border-primary'
                                        }`}
                                    onClick={() => setSelectedGateway(gateway.gateway_name)}
                                >
                                    <div className="d-flex align-items-center justify-content-between">
                                        <span className="fw-medium text-sm">{gateway.gateway_name}</span>
                                        {selectedType === 'deposit' && gateway.min_amount && (
                                            <span className="text-xs text-muted">
                                                {gateway.min_amount} - {gateway.max_amount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentGatewayLayer

