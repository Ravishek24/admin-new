import React, { useState, useEffect } from "react";
import { getSeamlessStats, getSpribeStats } from "../utils/apiService";

const GamesComponent = () => {
  const [spribeData, setSpribeData] = useState(null);
  const [seamlessData, setSeamlessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [spribePeriod, setSpribePeriod] = useState("today");
  const [seamlessPeriod, setSeamlessPeriod] = useState("week");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [spribeResponse, seamlessResponse] = await Promise.all([
        getSpribeStats(spribePeriod),
        getSeamlessStats(seamlessPeriod),
      ]);

      setSpribeData(spribeResponse?.data || spribeResponse);
      setSeamlessData(seamlessResponse?.data || seamlessResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [spribePeriod, seamlessPeriod]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderStatsCard = (data, title) => {
    if (!data || !data.success) {
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">{title}</h3>
          <p className="text-gray-500">No data available</p>
        </div>
      );
    }

    const { totals, start_date, end_date, period } = data;

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="text-sm text-gray-500">
            <span className="capitalize bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {period}
            </span>
          </div>
        </div>

        <div className="text-xs text-gray-400 mb-4">
          {formatDate(start_date)} - {formatDate(end_date)}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">
              {totals.total_bet_count?.toLocaleString() || 0}
            </div>
            <div className="text-sm text-gray-600">Total Bets</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totals.total_bet_amount)}
            </div>
            <div className="text-sm text-gray-600">Bet Amount</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">
              {totals.total_win_count?.toLocaleString() || 0}
            </div>
            <div className="text-sm text-gray-600">Total Wins</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(totals.total_win_amount)}
            </div>
            <div className="text-sm text-gray-600">Win Amount</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="bg-gray-50 rounded-lg p-4">
            <div
              className={`text-3xl font-bold ${
                (totals.net_profit || 0) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {formatCurrency(totals.net_profit)}
            </div>
            <div className="text-sm text-gray-600">Net Profit</div>
          </div>
        </div>

        {data.providers.map((provider, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg shadow-sm w-full"
          >
            <div className="text-sm font-semibold text-gray-700 mb-2">
              {provider.provider}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div>
                Total Bets:{" "}
                <span className="font-bold text-blue-600">
                  {provider.total_bet_count}
                </span>
              </div>
              <div>
                Bet Amount:{" "}
                <span className="font-bold text-green-600">
                  {formatCurrency(provider.total_bet_amount)}
                </span>
              </div>
              <div>
                Total Wins:{" "}
                <span className="font-bold text-purple-600">
                  {provider.total_win_count}
                </span>
              </div>
              <div>
                Win Amount:{" "}
                <span className="font-bold text-orange-600">
                  {formatCurrency(provider.total_win_amount)}
                </span>
              </div>
              <div>
                Net Profit:{" "}
                <span
                  className={`font-bold ${
                    provider.net_profit >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formatCurrency(provider.net_profit)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Games Statistics</h2>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Games Statistics</h2>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">
            Spribe Period:
          </label>
          <select
            value={spribePeriod}
            onChange={(e) => setSpribePeriod(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Today</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">
            Seamless Period:
          </label>
          <select
            value={seamlessPeriod}
            onChange={(e) => setSeamlessPeriod(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Today</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>

        <button
          onClick={fetchData}
          className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {renderStatsCard(spribeData, "Spribe Stats")}
        {renderStatsCard(seamlessData, "Seamless Stats")}
      </div>
    </div>
  );
};

export default GamesComponent;
