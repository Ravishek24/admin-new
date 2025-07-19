import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { getPendingRecharge, getPendingRechargeFirst, getPendingWithDrawals, getTodayProfit, getTodayRegistration, getTodayWithDrawRecharge, getTopDepositsToday, getTopWithdrawalsToday, getTotalUsers, getUserStats, getWeeklyProfit } from "../../utils/apiService";
import ProfitModal from "../comman/ProfitModal";



// New Component for Top Transactions
const TopTransactions = () => {
  const [topWithdrawals, setTopWithdrawals] = useState([]);
  const [topDeposits, setTopDeposits] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "amount",
    direction: "desc",
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let withRes = await getTopWithdrawalsToday()
        let depositRes = await getTopDepositsToday()
        console.log(depositRes);
        

        // Normalize data structure
        setTopWithdrawals(
          withRes?.data?.map((item) => ({
            userId: item.user_id,
            mobile: item.mobile_number,
            amount: item.applied_amount,
          }))
        );

        setTopDeposits(
          depositRes?.deposits?.map((item) => ({
            userId: item.user_id,
            mobile: item.mobile_number,
            amount: item.applied_amount,
          }))
        );
      } catch (error) {
        console.error("Error loading top transactions:", error);
      }
    };

    fetchTransactions();
  }, []);
  // Sorting function
  const sortData = (data, key, direction) => {
    console.log(data);
    if(data){

      return [...data].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }return null;
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "desc" ? "asc" : "desc",
    }));
  };

  const sortedDeposits = sortData(
    topDeposits,
    sortConfig.key,
    sortConfig.direction
  );
  const sortedWithdrawals = sortData(
    topWithdrawals,
    sortConfig.key,
    sortConfig.direction
  );

  // Table component for reusability
const TransactionTable = ({ title, data, type }) => {
  return (
    <div className="card shadow-none border mt-4">
      <div className="card-body p-20">
        <h6 className="mb-4">{title}</h6>

        {data && data.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="cursor-pointer" onClick={() => handleSort("userId")}>
                    User ID
                    {sortConfig.key === "userId" && (
                      <Icon
                        icon={
                          sortConfig.direction === "asc"
                            ? "bxs:up-arrow"
                            : "bxs:down-arrow"
                        }
                        className="text-xs ms-1"
                      />
                    )}
                  </th>
                  <th className="cursor-pointer" onClick={() => handleSort("mobile")}>
                    Mobile Number
                    {sortConfig.key === "mobile" && (
                      <Icon
                        icon={
                          sortConfig.direction === "asc"
                            ? "bxs:up-arrow"
                            : "bxs:down-arrow"
                        }
                        className="text-xs ms-1"
                      />
                    )}
                  </th>
                  <th className="cursor-pointer" onClick={() => handleSort("amount")}>
                    {type === "deposit" ? "Deposit Amount" : "Withdrawal Amount"}
                    {sortConfig.key === "amount" && (
                      <Icon
                        icon={
                          sortConfig.direction === "asc"
                            ? "bxs:up-arrow"
                            : "bxs:down-arrow"
                        }
                        className="text-xs ms-1"
                      />
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.userId}</td>
                    <td>{item.mobile}</td>
                    <td>${item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-muted py-4">
            <Icon icon="mdi:alert-circle-outline" className="text-2xl mb-2" />
            <div>No {type === 'deposit' ? 'deposits' : 'withdrawals'} found today.</div>
          </div>
        )}
      </div>
    </div>
  );
};


  return (
    <div className="mt-4">
      <TransactionTable
        title="Today Top Deposits"
        data={sortedDeposits}
        type="deposit"
      />
      <TransactionTable
        title="Today Top Withdrawals"
        data={sortedWithdrawals}
        type="withdrawal"
      />
    </div>
  );
};

// Updated DashboardStats Component (including previous boxes + new tables)
const DashboardStats = () => {
  const [todayRegistration, setTodayRegistration] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [todayProfit, setTodayProfit] = useState(null)
  const [todayWithDrawRecharge, setTodayWithDrawRecharge] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const [pendingWithDrawls, setPendingWithDrawals] = useState(null)
  const [pendingRecharge, setPendingRecharge] = useState(null)
  const [pendingRechargeFirst, setPendingRechargeFirst] = useState(null)
  const fetchTodayRegistration = async () => {
    try {
      const data = await getTodayRegistration();
      setTodayRegistration(data?.data?.today_registrations);
    } catch (error) {
      console.error('Error fetching user stats');
    }
  };
  const fetchTodayUserStats = async () => {
    try {
      const data = await getUserStats();
      setUserStats(data?.data);
    } catch (error) {
      console.error('Error fetching user stats');
    }
  };

  const fetchTodayProfit = async () => {
    try {
      const data = await getTodayProfit();
      setTodayProfit(data?.data);
    } catch (error) {
      console.error('Error fetching user stats');
    }
  };
  


  const fetchTodayWithDrawRecharege = async () => {
    try {
      const data = await getTodayWithDrawRecharge();
      setTodayWithDrawRecharge(data?.data);
    } catch (error) {
      console.error('Error fetching user stats');
    }
  };

  const fetchPendingWithDrawals = async () => {
    try {
      const data = await getPendingWithDrawals();
      setPendingWithDrawals(data);
    } catch (error) {
      console.error('Error fetching user stats');
    }
  };

  const fetchPendingRecharege = async () => {
    try {
      const data = await getPendingRecharge();
      setPendingRecharge(data);
    } catch (error) {
      console.error('Error fetching user stats');
    }
  };
  const fetchPendingRecharegeFirst = async () => {
    try {
      const data = await getPendingRechargeFirst();
      setPendingRechargeFirst(data);
    } catch (error) {
      console.error('Error fetching user stats');
    }
  };


  useEffect(() => {
    fetchTodayRegistration();
    setUserStats()
    fetchTodayUserStats()
    fetchTodayProfit()
    fetchTodayWithDrawRecharege()
    fetchPendingWithDrawals()
    fetchPendingRecharege()
    fetchPendingRecharegeFirst()
  }, []);

  const handleBoxClick = (boxName) => {
    if (boxName === "Profit") {
      setShowModal(true);
    }
  };

  const handleBoxProfitClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <ProfitModal
        showModal={showModal}
        handleClose={handleCloseModal}
        gameWiseProfit={todayProfit?.game_wise_profit}
      />
      <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
        {/* Users Box */}
        <div className="col">
          <Link to="invoice-list" className="text-decoration-none d-block">
            <div
              className="card shadow-none border bg-gradient-start-1 h-100 cursor-pointer"
              onClick={() => handleBoxClick("Users")}
            >
              <div className="card-body p-20">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p className="fw-medium text-primary-light mb-1">Users</p>
                    <h6 className="mb-0">{userStats?.total_users}</h6>
                  </div>
                  <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                    <Icon
                      icon="gridicons:multiple-users"
                      className="text-white text-2xl mb-0"
                    />
                  </div>
                </div>
                <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                  <span className="d-inline-flex align-items-center gap-1 text-success-main">
                    <Icon icon="bxs:up-arrow" className="text-xs" /> +5000
                  </span>
                  Today: {todayRegistration} | Blocked: 25
                </p>
              </div>
            </div>
          </Link>
        </div>
        {/* {User today states} */}
        <div className="col">
          <div
            className="card shadow-none border bg-gradient-start-2 h-100 cursor-pointer"
          // onClick={() => handleBoxClick("Profit")}
          >
            <div className="card-body p-20">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-medium text-primary-light mb-1">Today User Stats</p>
                  <h6 className="mb-0">Registration : {userStats?.today_registrations}</h6>
                </div>
                <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                  <Icon
                    icon="gridicons:multiple-users"
                    className="text-white text-2xl mb-0"
                  />
                </div>
              </div>
              <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                {/* <span className="d-inline-flex align-items-center gap-1 text-success-main">
                  <Icon icon="bxs:up-arrow" className="text-xs" /> +$800
                </span> */}
                Active User : {userStats?.active_users}
              </p>
            </div>
          </div>
        </div>
        {/* Profit Box */}
        <div className="col">
          <div
            className="card shadow-none border bg-gradient-start-2 h-100 cursor-pointer"
            onClick={handleBoxProfitClick}
          >
            <div className="card-body p-20">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-medium text-primary-light mb-1">Profit</p>
                  <h6 className="mb-0">{todayProfit?.total_profit}</h6>
                </div>
                <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                  <Icon
                    icon="fa-solid:chart-line"
                    className="text-white text-2xl mb-0"
                  />
                </div>
              </div>
              <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                {todayProfit?.date}
              </p>
              <Link to={'/weekly-profit'}>Weekly Profit</Link>
            </div>
          </div>
        </div>



        {/* Live Active Users */}
        <div className="col">
          <Link to="invoice-list" className="text-decoration-none d-block">
            <div
              className="card shadow-none border bg-gradient-start-3 h-100 cursor-pointer"
              onClick={() => handleBoxClick("Live Active Users")}
            >
              <div className="card-body p-20">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p className="fw-medium text-primary-light mb-1">
                      Live Active Users
                    </p>
                    <h6 className="mb-0">2,500</h6>
                  </div>
                  <div className="w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center">
                    <Icon
                      icon="fluent:people-20-filled"
                      className="text-white text-2xl mb-0"
                    />
                  </div>
                </div>
                <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                  <span className="d-inline-flex align-items-center gap-1 text-success-main">
                    <Icon icon="bxs:up-arrow" className="text-xs" /> +200
                  </span>
                  Last hour: 1,200
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Today Bets */}
        <div className="col">
          <Link to="invoice-add" className="text-decoration-none d-block">
            <div
              className="card shadow-none border bg-gradient-start-4 h-100 cursor-pointer"
              onClick={() => handleBoxClick("Today Bets")}
            >
              <div className="card-body p-20">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p className="fw-medium text-primary-light mb-1">
                      Today Bets
                    </p>
                    <h6 className="mb-0">{todayWithDrawRecharge?.today?.bets}</h6>
                  </div>
                  <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                    <Icon
                      icon="mdi:casino-chip"
                      className="text-white text-2xl mb-0"
                    />
                  </div>
                </div>
                <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                  <span className="d-inline-flex align-items-center gap-1 text-success-main">
                    {/* <Icon icon="bxs:up-arrow" className="text-xs" /> +150 */}
                  </span>
                  {todayWithDrawRecharge?.today?.date}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Today Recharges */}
        <div className="col">
          <Link to="invoice-edit" className="text-decoration-none d-block">
            <div
              className="card shadow-none border bg-gradient-start-5 h-100 cursor-pointer"
              onClick={() => handleBoxClick("Today Recharges")}
            >
              <div className="card-body p-20">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p className="fw-medium text-primary-light mb-1">
                      Today Recharges
                    </p>
                    <h6 className="mb-0">{todayWithDrawRecharge?.today?.recharge}</h6>
                  </div>
                  <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center">
                    <Icon
                      icon="mdi:credit-card-plus"
                      className="text-white text-2xl mb-0"
                    />
                  </div>
                </div>
                <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                  <span className="d-inline-flex align-items-center gap-1 text-success-main">
                    {/* <Icon icon="bxs:up-arrow" className="text-xs" /> +$1,000 */}
                  </span>
                  {/* PayPal: $2K | Stripe: $3K */}
                  {todayWithDrawRecharge?.today?.date}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Total Recharges */}
        <div className="col">
          <Link to="invoice-edit" className="text-decoration-none d-block">
            <div
              className="card shadow-none border bg-gradient-start-1 h-100 cursor-pointer"
              onClick={() => handleBoxClick("Total Recharges")}
            >
              <div className="card-body p-20">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p className="fw-medium text-primary-light mb-1">
                      Total Recharges
                    </p>
                    <h6 className="mb-0">{todayWithDrawRecharge?.total?.recharge || 0}</h6>
                  </div>
                  <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                    <Icon
                      icon="mdi:credit-card"
                      className="text-white text-2xl mb-0"
                    />
                  </div>
                </div>
                <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                  <span className="d-inline-flex align-items-center gap-1 text-success-main">
                    {/* <Icon icon="bxs:up-arrow" className="text-xs" /> +$5,000 */}
                  </span>
                  {/* PayPal: $20K | Stripe: $30K */}
                  Till -  {todayWithDrawRecharge?.today?.date}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Today Withdrawals */}
        <div className="col">
          <Link to="/new-withdraw" className="text-decoration-none d-block">
            <div
              className="card shadow-none border bg-gradient-start-2 h-100 cursor-pointer"
              onClick={() => handleBoxClick("Today Withdrawals")}
            >
              <div className="card-body p-20">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p className="fw-medium text-primary-light mb-1">
                      Today Withdrawals
                    </p>
                    <h6 className="mb-0">{todayWithDrawRecharge?.today?.withdrawals || 0}</h6>
                  </div>
                  <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                    <Icon
                      icon="mdi:bank-transfer-out"
                      className="text-white text-2xl mb-0"
                    />
                  </div>
                </div>
                <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                  <span className="d-inline-flex align-items-center gap-1 text-danger-main">
                    {/* <Icon icon="bxs:down-arrow" className="text-xs" /> -$500 */}
                  </span>
                  {/* Bank: $2K | PayPal: $1K */}
                  Till - {todayWithDrawRecharge?.today?.date}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Total Withdrawals */}
        <div className="col">
          <Link to="/success-withdraw" className="text-decoration-none d-block">
            <div
              className="card shadow-none border bg-gradient-start-3 h-100 cursor-pointer"
              onClick={() => handleBoxClick("Total Withdrawals")}
            >
              <div className="card-body p-20">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p className="fw-medium text-primary-light mb-1">
                      Total Withdrawals
                    </p>
                    <h6 className="mb-0">{todayWithDrawRecharge?.total?.withdrawals || 0}</h6>
                  </div>
                  <div className="w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center">
                    <Icon
                      icon="mdi:bank-transfer"
                      className="text-white text-2xl mb-0"
                    />
                  </div>
                </div>
                <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                  <span className="d-inline-flex align-items-center gap-1 text-danger-main">
                    {/* <Icon icon="bxs:down-arrow" className="text-xs" /> -$3,000 */}
                  </span>
                  {/* Bank: $20K | PayPal: $10K */}
                  Till - {todayWithDrawRecharge?.today?.date}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Pending Recharge */}
        <div className="col">
          <Link to="invoice-edit" className="text-decoration-none d-block">
            <div
              className="card shadow-none border bg-gradient-start-4 h-100 cursor-pointer"
              onClick={() => handleBoxClick("Pending Recharge")}
            >
              <div className="card-body p-20">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p className="fw-medium text-primary-light mb-1">
                      Pending Recharge
                    </p>
                    <h6 className="mb-0">{pendingRecharge?.pagination?.total || 0}</h6>
                  </div>
                  <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                    <Icon
                      icon="mdi:clock-outline"
                      className="text-white text-2xl mb-0"
                    />
                  </div>
                </div>
                <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                  <span className="d-inline-flex align-items-center gap-1 text-danger-main">
                    {/* <Icon icon="bxs:down-arrow" className="text-xs" /> -5 */}
                  </span>
                  {/* Total: $1,500 */}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Pending Withdrawal */}
        <div className="col">
          <Link to="/submitted-withdraw" className="text-decoration-none d-block">
            <div
              className="card shadow-none border bg-gradient-start-5 h-100 cursor-pointer"
              onClick={() => handleBoxClick("Pending Withdrawal")}
            >
              <div className="card-body p-20">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p className="fw-medium text-primary-light mb-1">
                      Pending Withdrawal
                    </p>
                    <h6 className="mb-0">{pendingWithDrawls?.pagination?.total || 0}</h6>
                  </div>
                  <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center">
                    <Icon
                      icon="mdi:clock-outline"
                      className="text-white text-2xl mb-0"
                    />
                  </div>
                </div>
                <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                  <span className="d-inline-flex align-items-center gap-1 text-danger-main">
                    {/* <Icon icon="bxs:down-arrow" className="text-xs" /> -2 */}
                  </span>
                  {/* Processing: 5 | Pending: 5 */}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Today First Recharges */}
        <div className="col">
          <div
            className="card shadow-none border bg-gradient-start-1 h-100 cursor-pointer"
            onClick={() => handleBoxClick("First Recharges")}
          >
            <div className="card-body p-20">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <p className="fw-medium text-primary-light mb-1">
                    First Recharges
                  </p>
                  <h6 className="mb-0">{pendingRechargeFirst?.pagination?.total || 0}</h6>
                </div>
                <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                  <Icon icon="mdi:star" className="text-white text-2xl mb-0" />
                </div>
              </div>
              <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                <span className="d-inline-flex align-items-center gap-1 text-success-main">
                  {/* <Icon icon="bxs:up-arrow" className="text-xs" /> +10 */}
                </span>
                {/* Total: $2,000 */}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Transactions Tables */}
      <TopTransactions />

    </>
  );
};

export default DashboardStats;
