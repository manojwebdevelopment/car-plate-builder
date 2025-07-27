// OrdersTab.jsx - Enhanced version with advanced filtering, sorting, and quick actions
import React, { useState, useEffect } from "react";
import { useOrders } from "./hooks/useOrders";
import OrderViewModal from "./modals/OrderViewModal";

const OrdersTab = ({ showToast }) => {
  const {
    orders,
    viewingOrder,
    orderStatistics,
    loading,
    loadingOrderDetails,
    exporting,
    error,
    filters,
    pagination,
    updateFilters,
    clearFilters,
    updatePagination,
    handleSort,
    refreshOrders,
    handleViewOrder,
    closeOrderView,
    updateOrderStatus,
    exportOrders,
  } = useOrders();

  // UI state
  const [showFilters, setShowFilters] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  // Utility functions
  const formatRupees = (amount) => `${parseFloat(amount).toFixed(2)}`;
  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = d.getDate().toString().padStart(2, "0");
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-success";
      case "Pending":
        return "bg-warning text-dark";
      case "Shipped":
        return "bg-info";
      case "Cancelled":
        return "bg-danger";
      case "Failed":
        return "bg-secondary";
      case "Processing":
        return "bg-primary";
      default:
        return "bg-secondary";
    }
  };

  // Handle row click (but not on status column)
  const handleRowClick = async (order, event) => {
    // Don't open modal if clicking on status column
    if (event.target.closest(".status-dropdown")) {
      return;
    }

    const result = await handleViewOrder(order);
    if (!result.success) {
      showToast(result.error || "Failed to fetch order details", "error");
    }
  };

  const handleQuickStatusUpdate = async (order, newStatus) => {
    const result = await updateOrderStatus(order.orderId, newStatus);
    if (result.success) {
      showToast(result.message, "success");
      refreshOrders();
    } else {
      showToast(result.error || "Failed to update order status", "error");
    }
  };

  // Handle export
  // Update the handleExport function
  // Update the handleExport function
  const handleExport = async (exportType) => {
    setShowExportDropdown(false);

    // Build query parameters based on export type
    const params = new URLSearchParams({
      exportType,
      format: "csv",
      sortBy: pagination.sortBy,
      sortOrder: pagination.sortOrder,
    });

    // Only add pagination for 'current' export type
    if (exportType === "current") {
      params.append("page", pagination.currentPage);
      params.append("limit", pagination.itemsPerPage);
    }

    // Add filters for 'current' and 'filtered' types
    if (exportType === "current" || exportType === "filtered") {
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "all" && value !== "") {
          params.append(key, value);
        }
      });
    }

    const result = await exportOrders(exportType, params.toString());
    if (result.success) {
      showToast(result.message, "success");
    } else {
      showToast(result.error || "Export failed", "error");
    }
  };

  // Add this useEffect to handle clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the dropdown container
      if (showExportDropdown && !event.target.closest(".dropdown")) {
        setShowExportDropdown(false);
      }
    };

    // Only add listener when dropdown is open
    if (showExportDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showExportDropdown]);

  // Handle filter change
  const handleFilterChange = (field, value) => {
    updateFilters({ [field]: value });
  };

  // Handle pagination change
  const handlePageChange = (newPage) => {
    updatePagination({ currentPage: newPage });
  };

  const handleItemsPerPageChange = (itemsPerPage) => {
    updatePagination({
      itemsPerPage: parseInt(itemsPerPage),
      currentPage: 1,
    });
  };

  return (
    <div className="container-fluid p-0">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Order Management</h2>
        <div className="d-flex align-items-center gap-3">
          {/* Refresh Button */}
          <button
            className="btn btn-outline-primary"
            onClick={refreshOrders}
            disabled={loading}
            title="Refresh orders"
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            {loading ? "Refreshing..." : "Refresh"}
          </button>

          {/* Filters Toggle */}
          <button
            className={`btn ${
              showFilters ? "btn-warning" : "btn-outline-warning"
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <i className="bi bi-funnel me-2"></i>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {/* Export Button */}
          {/* Export Dropdown - Replace the existing Export Button */}
          <div className="dropdown">
            <button
              className="btn btn-success dropdown-toggle"
              onClick={() => setShowExportDropdown(!showExportDropdown)}
              disabled={exporting}
              title="Export orders"
            >
              {exporting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Exporting...
                </>
              ) : (
                <>
                  <i className="bi bi-download me-2"></i>
                  Export
                </>
              )}
            </button>

            {showExportDropdown && (
              <div
                className="dropdown-menu show"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  zIndex: 1000,
                }}
              >
                <button
                  className="dropdown-item"
                  onClick={() => {
                    handleExport("current");
                    setShowExportDropdown(false);
                  }}
                  disabled={exporting}
                >
                  <i className="bi bi-eye me-2"></i>
                  Export Current View ({orders.length} orders)
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    handleExport("filtered");
                    setShowExportDropdown(false);
                  }}
                  disabled={exporting}
                >
                  <i className="bi bi-funnel me-2"></i>
                  Export All Filtered ({pagination.totalOrders} orders)
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    handleExport("all");
                    setShowExportDropdown(false);
                  }}
                  disabled={exporting}
                >
                  <i className="bi bi-database me-2"></i>
                  Export All Orders
                </button>
              </div>
            )}
          </div>

          <span className="badge bg-warning text-dark fs-6">
            Showing: {orders.length} of {pagination.totalOrders}
          </span>
        </div>
      </div>

      {/* Filters Section */}
      {showFilters && (
        <div className="card mb-4">
          <div className="card-header bg-light">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0">
                <i className="bi bi-funnel me-2"></i>
                Filter Orders
              </h6>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="row g-3">
              {/* Status Filter */}
              <div className="col-md-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select form-select-sm"
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>

              {/* Date Range Filter */}
              <div className="col-md-3">
                <label className="form-label">Date Range</label>
                <select
                  className="form-select form-select-sm"
                  value={filters.dateRange}
                  onChange={(e) =>
                    handleFilterChange("dateRange", e.target.value)
                  }
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              {/* Payment Method Filter */}
              <div className="col-md-3">
                <label className="form-label">Payment Method</label>
                <select
                  className="form-select form-select-sm"
                  value={filters.paymentMethod}
                  onChange={(e) =>
                    handleFilterChange("paymentMethod", e.target.value)
                  }
                >
                  <option value="all">All Methods</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              {/* Items Per Page */}
              <div className="col-md-3">
                <label className="form-label">Items Per Page</label>
                <select
                  className="form-select form-select-sm"
                  value={pagination.itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(e.target.value)}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              {/* Custom Date Range */}
              {filters.dateRange === "custom" && (
                <>
                  <div className="col-md-3">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={filters.customStartDate}
                      onChange={(e) =>
                        handleFilterChange("customStartDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      value={filters.customEndDate}
                      onChange={(e) =>
                        handleFilterChange("customEndDate", e.target.value)
                      }
                    />
                  </div>
                </>
              )}

              {/* Search Filters */}
              <div className="col-md-3">
                <label className="form-label">Customer Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search by customer..."
                  value={filters.customer}
                  onChange={(e) =>
                    handleFilterChange("customer", e.target.value)
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Product</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search by product..."
                  value={filters.product}
                  onChange={(e) =>
                    handleFilterChange("product", e.target.value)
                  }
                />
              </div>

              {/* Amount Range */}
              <div className="col-md-3">
                <label className="form-label">Min Amount</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="0"
                  value={filters.amountMin}
                  onChange={(e) =>
                    handleFilterChange("amountMin", e.target.value)
                  }
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Max Amount</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="999999"
                  value={filters.amountMax}
                  onChange={(e) =>
                    handleFilterChange("amountMax", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="card">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center p-4">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading orders...</p>
            </div>
          ) : error ? (
            <div className="text-center p-4">
              <div className="alert alert-danger">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
              </div>
              <button
                className="btn btn-outline-primary"
                onClick={refreshOrders}
              >
                Try Again
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center p-4">
              <div className="mb-3">
                <i
                  className="bi bi-box-seam text-muted"
                  style={{ fontSize: "3rem" }}
                ></i>
              </div>
              <h5 className="text-muted">No orders found</h5>
              <p className="text-muted">
                {Object.values(filters).some((f) => f && f !== "all")
                  ? "Try adjusting your filters to see more results."
                  : "Orders will appear here when customers make purchases."}
              </p>
              {Object.values(filters).some((f) => f && f !== "all") && (
                <button
                  className="btn btn-outline-warning"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-warning sticky-top">
                    <tr>
                      {[
                        { key: "orderId", label: "Order ID" },
                        { key: "customer", label: "Customer" },
                        { key: "product", label: "Product" },
                        { key: "amount", label: "Amount (in £)" },
                        { key: "status", label: "Status" },
                        { key: "date", label: "Date" },
                      ].map(({ key, label }) => (
                        <th
                          key={key}
                          className="cursor-pointer user-select-none"
                          onClick={() => handleSort(key)}
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            {label}
                            <div className="d-flex flex-column">
                              <i
                                className={`bi bi-caret-up-fill ${
                                  pagination.sortBy === key &&
                                  pagination.sortOrder === "asc"
                                    ? "text-primary"
                                    : "text-muted"
                                }`}
                                style={{
                                  fontSize: "0.6rem",
                                  lineHeight: "0.5",
                                }}
                              ></i>
                              <i
                                className={`bi bi-caret-down-fill ${
                                  pagination.sortBy === key &&
                                  pagination.sortOrder === "desc"
                                    ? "text-primary"
                                    : "text-muted"
                                }`}
                                style={{
                                  fontSize: "0.6rem",
                                  lineHeight: "0.5",
                                }}
                              ></i>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id || order.orderId}
                        className="cursor-pointer"
                        onClick={(e) => handleRowClick(order, e)}
                        style={{ cursor: "pointer" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#fff3cd";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "";
                        }}
                        title="Click to view order details"
                      >
                        <td>
                          <span className="font-monospace fw-bold text-primary">
                            {order.orderId}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar-circle bg-primary text-white me-2">
                              {order.customer.charAt(0).toUpperCase()}
                            </div>
                            {order.customer}
                          </div>
                        </td>
                        <td>
                          <div className="product-info">
                            <div className="fw-bold">{order.product}</div>
                            <small className="text-muted">
                              via {order.paymentMethod}
                            </small>
                          </div>
                        </td>
                        <td>
                          <span className="fw-bold text-success">
                            {formatRupees(order.amount)}
                          </span>
                        </td>
                        <td>
                          <div className="status-dropdown position-relative">
                            <div className="dropdown">
                              <span
                                className={`badge ${getStatusBadgeClass(
                                  order.status
                                )} dropdown-toggle`}
                                data-bs-toggle="dropdown"
                                data-bs-auto-close="true"
                                aria-expanded="false"
                                style={{ cursor: "pointer" }}
                                title="Click to change status"
                              >
                                {order.status}
                              </span>
                              <ul className="dropdown-menu">
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() =>
                                      handleQuickStatusUpdate(order, "shipped")
                                    }
                                  >
                                    <i className="bi bi-truck me-2"></i>
                                    Mark as Shipped
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() =>
                                      handleQuickStatusUpdate(
                                        order,
                                        "completed"
                                      )
                                    }
                                  >
                                    <i className="bi bi-check-circle me-2"></i>
                                    Mark as Completed
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="date-info">
                            <div>{formatDate(order.date)}</div>
                            <small className="text-muted">{order.time}</small>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="card-footer bg-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-muted small">
                      Showing{" "}
                      {(pagination.currentPage - 1) * pagination.itemsPerPage +
                        1}{" "}
                      to{" "}
                      {Math.min(
                        pagination.currentPage * pagination.itemsPerPage,
                        pagination.totalOrders
                      )}{" "}
                      of {pagination.totalOrders} orders
                    </div>

                    <nav>
                      <ul className="pagination pagination-sm mb-0">
                        <li
                          className={`page-item ${
                            pagination.currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() =>
                              handlePageChange(pagination.currentPage - 1)
                            }
                            disabled={pagination.currentPage === 1}
                          >
                            Previous
                          </button>
                        </li>

                        {Array.from(
                          { length: Math.min(5, pagination.totalPages) },
                          (_, i) => {
                            let pageNumber;
                            if (pagination.totalPages <= 5) {
                              pageNumber = i + 1;
                            } else if (pagination.currentPage <= 3) {
                              pageNumber = i + 1;
                            } else if (
                              pagination.currentPage >=
                              pagination.totalPages - 2
                            ) {
                              pageNumber = pagination.totalPages - 4 + i;
                            } else {
                              pageNumber = pagination.currentPage - 2 + i;
                            }

                            return (
                              <li
                                key={pageNumber}
                                className={`page-item ${
                                  pagination.currentPage === pageNumber
                                    ? "active"
                                    : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => handlePageChange(pageNumber)}
                                >
                                  {pageNumber}
                                </button>
                              </li>
                            );
                          }
                        )}

                        <li
                          className={`page-item ${
                            pagination.currentPage === pagination.totalPages
                              ? "disabled"
                              : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() =>
                              handlePageChange(pagination.currentPage + 1)
                            }
                            disabled={
                              pagination.currentPage === pagination.totalPages
                            }
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Order View Modal */}
      {(viewingOrder || loadingOrderDetails) && (
        <OrderViewModal
          order={viewingOrder}
          loading={loadingOrderDetails}
          onClose={closeOrderView}
          showToast={showToast}
        />
      )}

      {/* CSS Styles */}
      <style jsx>{`
        .cursor-pointer {
          cursor: pointer;
        }
        .avatar-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
        }
        .product-info {
          line-height: 1.3;
        }
        .date-info {
          line-height: 1.3;
        }
        .table td {
          vertical-align: middle;
        }
        .sticky-top {
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .status-dropdown .dropdown-toggle::after {
          margin-left: 0.5em;
        }
      `}</style>
    </div>
  );
};

export default OrdersTab;
