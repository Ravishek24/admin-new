import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  adjustUserBalance,
  blockUserById,
  getUsers,
  unblockUserById,
} from "../utils/apiService";

const AllUsersLayer = () => {
  const [users, setUsers] = useState([]);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showUnblockModal, setShowUnblockModal] = useState(false);
  const [blockUserId, setBlockUserId] = useState(null);
  const [unblockUserId, setUnblockUserId] = useState(null);
  const [blockReason, setBlockReason] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [editAction, setEditAction] = useState("add");
  const [editAmount, setEditAmount] = useState("");
  const [editWageringAmount, setEditWageringAmount] = useState("");
  const [editReason, setEditReason] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); // for debouncing
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_users: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers({ search: debouncedSearch, page });
      setUsers(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [debouncedSearch, page]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= pagination.total_pages) {
      setPage(pageNum);
    }
  };

  // Handle block
  const handleBlockClick = (userId) => {
    setBlockUserId(userId);
    setShowBlockModal(true);
    setBlockReason("");
  };

  const handleBlockSubmit = async () => {
    try {
      let data = await blockUserById(blockUserId, blockReason);
      if (data?.success) {
        setShowBlockModal(false);
        setBlockUserId(null);
        setBlockReason("");
        fetchUsers();
      }
    } catch (err) {
      // show error message
    }
  };

  // Handle unblock
  const handleUnblockClick = (userId) => {
    console.log(userId);

    setUnblockUserId(userId);
    setShowUnblockModal(true);
  };

  const handleUnblockConfirm = async () => {
    try {
      let data = await unblockUserById(unblockUserId);
      if (data?.success) {
        setShowUnblockModal(false);
        setUnblockUserId(null);
        fetchUsers();
      }
    } catch (err) {
      // show error message
    }
  };

  // Handle edit balance modal
  const handleEditClick = (userId) => {
    setEditUserId(userId);
    setShowEditModal(true);
    setEditAction("add");
    setEditAmount("");
    setEditReason("");
    setEditWageringAmount("")
  };

  const handleEditSubmit = async () => {
    const amount = parseFloat(editAmount);
    const wagering = parseFloat(editWageringAmount);
    const reason = editReason.trim();
    
    // Validation
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    
    if (wagering < 0) {
      alert("Wagering amount cannot be negative.");
      return;
    }
    
    if (!reason) {
      alert("Please enter a reason.");
      return;
    }

    try {
      let data = await adjustUserBalance(
        editUserId,
        amount,
        editAction,
        reason,       
        wagering,    
      );

      fetchUsers();
      setShowEditModal(false);
      setEditUserId(null);
      setEditAmount("");
      setEditReason("");
      setEditWageringAmount("");
    } catch (error) {
      console.error("Error adjusting balance:", error);
      alert("Failed to update balance. Please try again.");
    }
};

  return (
    <div className="card">
      {/* Card Header */}
      <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div className="d-flex flex-wrap align-items-center gap-3">
          <div className="icon-field">
            <input
              type="text"
              className="form-control form-control-sm w-auto"
              placeholder="Search by User ID or Mobile"
              onChange={handleSearchChange}
              value={search}
            />
            <span className="icon">
              <Icon icon="ion:search-outline" />
            </span>
          </div>
        </div>
        <div className="d-flex flex-wrap align-items-center gap-3">
          <select
            className="form-select form-select-sm w-auto"
            defaultValue="All"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Blocked">Blocked</option>
          </select>
          <Link to="/users/add" className="btn btn-sm btn-primary-600">
            <i className="ri-add-line" /> Add User
          </Link>
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body">
        {/* Scrollable Table Wrapper */}
        <div className="table-responsive" style={{ overflowX: "auto" }}>
          <table
            className="table bordered-table mb-0"
            style={{ minWidth: "1200px" }}
          >
            <thead>
              <tr>
                <th scope="col">
                  <div className="form-check style-check d-flex align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkAll"
                    />
                    <label className="form-check-label" htmlFor="checkAll">
                      S.L
                    </label>
                  </div>
                </th>
                <th scope="col">User ID</th>
                <th scope="col">Mobile Number</th>
                <th scope="col">Balance</th>
                <th scope="col">Status</th>
                <th scope="col">Login IP</th>
                <th scope="col">Register IP</th>
                <th scope="col">Total Deposit</th>
                <th scope="col">Total Withdrawal</th>
                <th scope="col">Commission Detail</th>
                <th scope="col">Available Wagering</th>
                <th scope="col">Referal Code</th>
                <th scope="col">Refered By</th>
                <th scope="col">Registration Time</th>
                <th scope="col">Block/Unblock</th>
                <th scope="col">Block Reason</th>
                <th scope="col">More Info</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <div className="text-center my-4">
                  <span>Loading users...</span>
                </div>
              ) : (
                users.map((user, index) => (
                  <tr key={user.userId}>
                    <td>
                      <div className="form-check style-check d-flex align-items-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`check${index}`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`check${index}`}
                        >
                          {String(user?.sl).padStart(2, "0")}
                        </label>
                      </div>
                    </td>
                    <td>
                      <Link to="#" className="text-primary-600">
                        {user?.user_id}
                      </Link>
                    </td>
                    <td>{user?.mobile_number}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        {String(user.balance).toLocaleString()}
                        <button
                          className="btn btn-sm btn-primary-light p-0"
                          onClick={() => handleEditClick(user.user_id)}
                        >
                          <Icon icon="lucide:edit" className="text-sm" />
                        </button>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`d-inline-block w-12-px h-12-px rounded-circle ${user?.status == "Verified"
                            ? "bg-success-main"
                            : "bg-danger-main"
                          }`}
                      ></span>
                    </td>
                    <td>{user?.login_ip || "-"}</td>
                    <td>{user?.register_ip || "-"}</td>
                    <td>
                      {String(user?.total_deposit).toLocaleString() || "-"}
                    </td>
                    <td>
                      {String(user?.total_withdrawal).toLocaleString() || "-"}
                    </td>
                    <td>
                      {String(user?.total_commission || 0)?.toLocaleString()}
                    </td>
                    <td>
                      {String(user?.wagering || 0)?.toLocaleString()}
                    </td>
                    <td>
                      {String(user?.ref_code || 0)?.toLocaleString()}
                    </td>
                    <td>
                      {String(user?.refby_code || 0)?.toLocaleString()}
                    </td>
                    <td>
  {(user?.registered_at || "")
    .replace("T", " ")
    .replace(".000Z", "")}
</td>

                    <td>
                      {user?.is_blocked ? (
                        <button
                          className="btn btn-sm btn-success-600"
                          onClick={() => handleUnblockClick(user.user_id)}
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-danger-600"
                          onClick={() => handleBlockClick(user.user_id)}
                        >
                          Block
                        </button>
                      )}
                    </td>
                    <td>
                      {String(user?.block_reason || "Active")?.toLocaleString()}
                    </td>
                    <td>
                      <Link
                        to={`/user/${user.user_id}`}
                        className="btn btn-sm btn-primary-600"
                      >
                        More Info
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-24">
          <span>
            Showing page {pagination.current_page} of {pagination.total_pages} |
            Total: {pagination.total_users}
          </span>
          <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
            <li className="page-item">
              <button
                className="page-link bg-base text-secondary-light"
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
              >
                <Icon icon="ep:d-arrow-left" className="text-xl" />
              </button>
            </li>
            {[...Array(pagination.total_pages)].map((_, idx) => (
              <li key={idx} className="page-item">
                <button
                  className={`page-link ${pagination.current_page === idx + 1
                      ? "bg-primary-600 text-white"
                      : "bg-base text-secondary-light"
                    }`}
                  onClick={() => goToPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link bg-base text-secondary-light"
                onClick={() => goToPage(page + 1)}
                disabled={page === pagination.total_pages}
              >
                <Icon icon="ep:d-arrow-right" className="text-xl" />
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Block Reason Modal */}
      {showBlockModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Block User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowBlockModal(false);
                    setBlockUserId(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Reason for Blocking</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={blockReason}
                    onChange={(e) => setBlockReason(e.target.value)}
                    placeholder="Enter the reason for blocking this user"
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowBlockModal(false);
                    setBlockUserId(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger-600"
                  onClick={handleBlockSubmit}
                  disabled={!blockReason.trim()}
                >
                  Block User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unblock Confirmation Modal */}
      {showUnblockModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Unblock User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowUnblockModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to unblock this user?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowUnblockModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success-600"
                  onClick={handleUnblockConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Balance Modal */}
      {showEditModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Balance</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Action</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="editAction"
                        id="add"
                        value="add"
                        checked={editAction === "add"}
                        onChange={() => setEditAction("add")}
                      />
                      <label className="form-check-label" htmlFor="add">
                        Add
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="editAction"
                        id="deduct"
                        value="deduct"
                        checked={editAction === "deduct"}
                        onChange={() => setEditAction("deduct")}
                      />
                      <label className="form-check-label" htmlFor="deduct">
                        Deduct
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label"> Wagering Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editWageringAmount}
                    onChange={(e) => setEditWageringAmount(e.target.value)}
                    placeholder="Enter Wagering amount"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Reason</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={editReason}
                    onChange={(e) => setEditReason(e.target.value)}
                    placeholder="Enter the reason for this adjustment"
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary-600"
                  onClick={handleEditSubmit}
                  disabled={
                    (!editAmount && !editWageringAmount) ||
                    (editAmount && !editReason.trim())
                  }
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsersLayer;
