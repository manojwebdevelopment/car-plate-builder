// src/components/OrdersTab.jsx
import React from 'react';
import OrderViewModal from './modals/OrderViewModal';
import { formatDate, formatRupees } from './utils/formatters';

const OrdersTab = ({
  orders,
  loading,
  viewingOrder,
  loadingOrderDetails,
  fetchOrders,
  handleViewOrder,
  closeOrderView,
  showToast
}) => {

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-success';
      case 'Pending':
        return 'bg-warning text-dark';
      case 'Shipped':
        return 'bg-info';
      case 'Cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  const onViewOrder = async (order) => {
    const result = await handleViewOrder(order);
    if (!result.success) {
      showToast(result.error || 'Failed to fetch order details');
    }
  };

  const onRefresh = async () => {
    const result = await fetchOrders();
    if (result.success) {
      showToast('Orders refreshed successfully', 'success');
    } else {
      showToast(result.error || 'Failed to refresh orders');
    }
  };

  // Calculate order statistics
  const orderStats = {
    total: orders.length,
    completed: orders.filter(o => o.status === 'Completed').length,
    pending: orders.filter(o => o.status === 'Pending').length,
    shipped: orders.filter(o => o.status === 'Shipped').length,
    cancelled: orders.filter(o => o.status === 'Cancelled').length,
    totalValue: orders.reduce((sum, order) => sum + (order.amount || 0), 0)
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Order Management</h2>
        <div className="d-flex align-items-center gap-3">
          <button 
            className="btn btn-outline-warning"
            onClick={onRefresh}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Refreshing...
              </>
            ) : (
              <>
                <i className="bi bi-arrow-clockwise me-2"></i>
                Refresh
              </>
            )}
          </button>
          <span className="badge bg-warning text-dark fs-6">
            Total Orders: {orderStats.total}
          </span>
        </div>
      </div>

      {/* Order Statistics Cards */}
      {orders.length > 0 && (
        <div className="row mb-4">
          <div className="col-md-2 col-sm-6 mb-3">
            <div className="card bg-success text-white">
              <div className="card-body text-center">
                <h6 className="card-title">Completed</h6>
                <h4>{orderStats.completed}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-6 mb-3">
            <div className="card bg-warning text-dark">
              <div className="card-body text-center">
                <h6 className="card-title">Pending</h6>
                <h4>{orderStats.pending}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-6 mb-3">
            <div className="card bg-info text-white">
              <div className="card-body text-center">
                <h6 className="card-title">Shipped</h6>
                <h4>{orderStats.shipped}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-sm-6 mb-3">
            <div className="card bg-danger text-white">
              <div className="card-body text-center">
                <h6 className="card-title">Cancelled</h6>
                <h4>{orderStats.cancelled}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 mb-3">
            <div className="card bg-dark text-white">
              <div className="card-body text-center">
                <h6 className="card-title">Total Value</h6>
                <h4>{formatRupees(orderStats.totalValue)}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="card">
        <div className="card-body">
          {loading ? (
            <div className="text-center p-4">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center p-4">
              <div className="mb-3">
                <i className="bi bi-box-seam text-muted" style={{ fontSize: '3rem' }}></i>
              </div>
              <h5 className="text-muted">No orders found</h5>
              <p className="text-muted">Orders will appear here when customers make purchases.</p>
              <button 
                className="btn btn-outline-warning"
                onClick={onRefresh}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Check for Orders
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-warning">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Payment Status</th>
                    <th>Date of Order</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id || order.orderId}>
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
                          {order.productCode && (
                            <small className="text-muted">Code: {order.productCode}</small>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="fw-bold text-success">
                          {formatRupees(order.amount)}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <div className="date-info">
                          <div>{formatDate(order.date)}</div>
                          {order.time && (
                            <small className="text-muted">{order.time}</small>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-sm btn-outline-info"
                            onClick={() => onViewOrder(order)}
                            title="View order details"
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => navigator.clipboard.writeText(order.orderId)}
                            title="Copy order ID"
                          >
                            <i className="bi bi-clipboard"></i>
                          </button>
                          {order.status === 'Pending' && (
                            <button
                              className="btn btn-sm btn-outline-warning"
                              onClick={() => {/* Handle status update */}}
                              title="Update status"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Quick Filters */}
      {orders.length > 0 && (
        <div className="card mt-4">
          <div className="card-header bg-light">
            <h6 className="mb-0">Quick Filters</h6>
          </div>
          <div className="card-body">
            <div className="btn-group" role="group">
              <button className="btn btn-outline-secondary btn-sm active">
                All Orders ({orderStats.total})
              </button>
              <button className="btn btn-outline-warning btn-sm">
                Pending ({orderStats.pending})
              </button>
              <button className="btn btn-outline-info btn-sm">
                Shipped ({orderStats.shipped})
              </button>
              <button className="btn btn-outline-success btn-sm">
                Completed ({orderStats.completed})
              </button>
              <button className="btn btn-outline-danger btn-sm">
                Cancelled ({orderStats.cancelled})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order View Modal */}
      {(viewingOrder || loadingOrderDetails) && (
        <OrderViewModal
          order={viewingOrder}
          loading={loadingOrderDetails}
          onClose={closeOrderView}
        />
      )}

      <style jsx>{`
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
        .btn-group .btn {
          border-radius: 4px !important;
          margin-right: 2px;
        }
        .btn-group .btn:last-child {
          margin-right: 0;
        }
        .table td {
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
};

export default OrdersTab;