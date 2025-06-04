// src/components/PricingTab.jsx
import React from 'react';
import PriceEditModal from './modals/PriceEditModal';
import ConfirmationDialog from './modals/ConfirmationDialog';
import { formatPrice } from './utils/formatters';

const PricingTab = ({
  configurations,
  loadingConfigs,
  editingConfig,
  setEditingConfig,
  bulkOperation,
  setBulkOperation,
  confirmDialog,
  setConfirmDialog,
  fetchConfigurations,
  updateConfiguration,
  bulkUpdateConfigurations,
  toggleBulkMode,
  updateBulkSelection,
  selectAllInType,
  showToast
}) => {

  const onUpdateConfiguration = async (formData) => {
    const result = await updateConfiguration(editingConfig._id, formData);
    if (result.success) {
      setEditingConfig(null);
      showToast(result.message, 'success');
    } else {
      showToast(result.error || 'Failed to update configuration');
    }
  };

  const onBulkUpdate = async () => {
    if (bulkOperation.selectedIds.length === 0) {
      showToast('Please select at least one item for bulk update');
      return;
    }

    const result = await bulkUpdateConfigurations();
    if (result.success) {
      showToast(result.message, 'success');
    } else {
      showToast(result.error || 'Bulk update failed');
    }
  };

  const onRefresh = async () => {
    const result = await fetchConfigurations();
    if (result.success) {
      showToast('Configurations refreshed successfully', 'success');
    } else {
      showToast(result.error || 'Failed to refresh configurations');
    }
  };

  // Calculate statistics
  const totalConfigs = Object.values(configurations).reduce((sum, configs) => sum + configs.length, 0);
  const activeConfigs = Object.values(configurations).reduce((sum, configs) => 
    sum + configs.filter(c => c.isActive).length, 0);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Price Management</h2>
        <div className="d-flex align-items-center gap-3">
          <button 
            className="btn btn-outline-warning"
            onClick={onRefresh}
            disabled={loadingConfigs}
          >
            {loadingConfigs ? 'Refreshing...' : 'Refresh'}
          </button>
          <button
            className={`btn ${bulkOperation.isActive ? 'btn-danger' : 'btn-info'}`}
            onClick={toggleBulkMode}
          >
            {bulkOperation.isActive ? (
              <>
                <i className="bi bi-x-circle me-2"></i>
                Cancel Bulk Edit
              </>
            ) : (
              <>
                <i className="bi bi-check2-square me-2"></i>
                Bulk Edit Mode
              </>
            )}
          </button>
          <span className="badge bg-warning text-dark fs-6">
            Total Items: {totalConfigs}
          </span>
        </div>
      </div>

      {/* Statistics Cards */}
      {totalConfigs > 0 && (
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card bg-primary text-white">
              <div className="card-body text-center">
                <h6 className="card-title">Total Items</h6>
                <h4>{totalConfigs}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-success text-white">
              <div className="card-body text-center">
                <h6 className="card-title">Active Items</h6>
                <h4>{activeConfigs}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-secondary text-white">
              <div className="card-body text-center">
                <h6 className="card-title">Inactive Items</h6>
                <h4>{totalConfigs - activeConfigs}</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-info text-white">
              <div className="card-body text-center">
                <h6 className="card-title">Categories</h6>
                <h4>{Object.keys(configurations).length}</h4>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Operations Panel */}
      {bulkOperation.isActive && (
        <div className="card mb-4 border-info">
          <div className="card-header bg-info text-white">
            <h5 className="mb-0">
              <i className="bi bi-gear me-2"></i>
              Bulk Operations ({bulkOperation.selectedIds.length} selected)
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <label className="form-label">Operation Type</label>
                <select 
                  className="form-select"
                  value={bulkOperation.operation}
                  onChange={(e) => setBulkOperation({...bulkOperation, operation: e.target.value})}
                >
                  <option value="fixed_increase">Fixed Increase (+)</option>
                  <option value="fixed_decrease">Fixed Decrease (-)</option>
                  <option value="percentage_increase">Percentage Increase (%)</option>
                  <option value="percentage_decrease">Percentage Decrease (%)</option>
                  <option value="set_price">Set Fixed Price</option>
                </select>
              </div>
              <div className="col-md-4">
                {bulkOperation.operation.includes('percentage') ? (
                  <div>
                    <label className="form-label">Percentage (%)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={bulkOperation.percentage}
                      onChange={(e) => setBulkOperation({...bulkOperation, percentage: e.target.value})}
                      placeholder="e.g., 10 for 10%"
                      min="0"
                      max="100"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="form-label">Amount (£)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      value={bulkOperation.value}
                      onChange={(e) => setBulkOperation({...bulkOperation, value: e.target.value})}
                      placeholder="e.g., 2.50"
                      min="0"
                    />
                  </div>
                )}
              </div>
              <div className="col-md-4 d-flex align-items-end">
                <button
                  className="btn btn-success w-100"
                  onClick={onBulkUpdate}
                  disabled={bulkOperation.selectedIds.length === 0}
                >
                  <i className="bi bi-check-circle me-2"></i>
                  Apply to {bulkOperation.selectedIds.length} Items
                </button>
              </div>
            </div>
            
            {bulkOperation.selectedIds.length > 0 && (
              <div className="mt-3 p-2 bg-light rounded">
                <small className="text-muted">
                  <i className="bi bi-info-circle me-1"></i>
                  Selected items will be updated based on the operation type above.
                </small>
              </div>
            )}
          </div>
        </div>
      )}
      
      {loadingConfigs ? (
        <div className="text-center p-4">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading configurations...</p>
        </div>
      ) : totalConfigs === 0 ? (
        <div className="text-center p-4">
          <div className="mb-3">
            <i className="bi bi-tags text-muted" style={{ fontSize: '3rem' }}></i>
          </div>
          <h5 className="text-muted">No configurations found</h5>
          <p className="text-muted">Price configurations will appear here when available.</p>
          <button 
            className="btn btn-outline-warning"
            onClick={onRefresh}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Check for Configurations
          </button>
        </div>
      ) : (
        <div className="row">
          {Object.entries(configurations).map(([type, configs]) => (
            <div key={type} className="col-lg-6 mb-4">
              <div className="card">
                <div className="card-header bg-warning d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 text-dark text-capitalize">
                    {type.replace('plateStyle', 'Plate Styles')} ({configs.length})
                  </h5>
                  {bulkOperation.isActive && (
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={(e) => selectAllInType(configs, e.target.checked)}
                        checked={configs.every(c => bulkOperation.selectedIds.includes(c._id))}
                      />
                      <label className="form-check-label text-dark">
                        Select All
                      </label>
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          {bulkOperation.isActive && <th width="30"></th>}
                          <th>Name</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {configs.map(config => (
                          <tr key={config._id}>
                            {bulkOperation.isActive && (
                              <td>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={bulkOperation.selectedIds.includes(config._id)}
                                  onChange={(e) => updateBulkSelection(config._id, e.target.checked)}
                                />
                              </td>
                            )}
                            <td>
                              <div className="d-flex align-items-center">
                                <span className="me-2">{config.label}</span>
                                {!config.isActive && (
                                  <span className="badge bg-secondary badge-sm">Inactive</span>
                                )}
                              </div>
                            </td>
                            <td>
                              <span className="fw-bold text-success">
                                {formatPrice(config.price)}
                              </span>
                            </td>
                            <td>
                              <span className={`badge ${config.isActive ? 'bg-success' : 'bg-secondary'}`}>
                                {config.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => setEditingConfig(config)}
                                disabled={bulkOperation.isActive}
                                title="Edit configuration"
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {editingConfig && (
        <PriceEditModal
          config={editingConfig}
          onSave={onUpdateConfiguration}
          onClose={() => setEditingConfig(null)}
          showConfirmDialog={setConfirmDialog}
        />
      )}

      {confirmDialog && (
        <ConfirmationDialog
          config={confirmDialog.config}
          newPrice={confirmDialog.newPrice}
          onConfirm={confirmDialog.onConfirm}
          onCancel={() => setConfirmDialog(null)}
        />
      )}

      <style jsx>{`
        .badge-sm {
          font-size: 0.7rem;
        }
        .table td {
          vertical-align: middle;
        }
        .card-header .form-check {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default PricingTab;