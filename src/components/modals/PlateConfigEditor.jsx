// src/components/modals/PlateConfigEditor.jsx
import { useState, useEffect } from "react";
import "../styles/PlateConfigEditor.css";

const PlateConfigEditor = ({
  configType,
  configLabel,
  isOpen,
  onClose,
  onSave,
  fetchConfigurationType,
  showToast,
}) => {
  const [configData, setConfigData] = useState(null);
  const [editedData, setEditedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen && configType) {
      loadConfigData();
    }
  }, [isOpen, configType]);

  const loadConfigData = async () => {
    setLoading(true);
    try {
      const result = await fetchConfigurationType(configType);
      if (result.success) {
        setConfigData(result.data);
        setEditedData([...result.data.current]);
      } else {
        showToast(result.error || "Failed to load configuration", "error");
      }
    } catch (error) {
      showToast("Error loading configuration", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (index, field, value) => {
    const newData = [...editedData];
    newData[index] = {
      ...newData[index],
      [field]: value,
    };
    setEditedData(newData);
    setHasUnsavedChanges(true);

    // Clear any existing errors for this field
    if (errors[`${index}-${field}`]) {
      const newErrors = { ...errors };
      delete newErrors[`${index}-${field}`];
      setErrors(newErrors);
    }
  };

  const validateData = () => {
    const newErrors = {};

    editedData.forEach((item, index) => {
      if (!item.label || item.label.trim() === "") {
        newErrors[`${index}-label`] = "Label is required";
      }

      if (item.price < 0) {
        newErrors[`${index}-price`] = "Price cannot be negative";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateData()) {
      showToast("Please fix the errors before saving", "error");
      return;
    }

    if (!hasUnsavedChanges) {
      showToast("No changes to save", "info");
      onClose();
      return;
    }

    setSaving(true);
    try {
      await onSave(configType, editedData);
      setHasUnsavedChanges(false);
      onClose();
    } catch (error) {
      showToast("Error saving configuration", "error");
    } finally {
      setSaving(false);
    }
  };

  // Add confirmation for closing with unsaved changes
  const handleClose = () => {
    if (hasUnsavedChanges) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to close?"
        )
      ) {
        setHasUnsavedChanges(false);
        onClose();
      }
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block config-editor-modal"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit {configLabel}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            {loading ? (
              <div className="text-center p-4">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered config-editor-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Label</th>
                      <th>Price (£)</th>
                      <th>Previous Values</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editedData.map((item, index) => (
                      <tr key={item.key || index}>
                        <td>
                          <span className="config-item-index">{index + 1}</span>
                        </td>
                        <td>
                          <input
                            type="text"
                            className={`form-control form-control-sm config-editor-input ${
                              errors[`${index}-label`] ? "is-invalid" : ""
                            }`}
                            value={item.label || ""}
                            onChange={(e) =>
                              handleFieldChange(index, "label", e.target.value)
                            }
                          />
                          {errors[`${index}-label`] && (
                            <div className="invalid-feedback d-block">
                              {errors[`${index}-label`]}
                            </div>
                          )}
                          {configData?.previous[index]?.label && (
                            <div className="previous-value">
                              Previous: {configData.previous[index].label}
                            </div>
                          )}
                        </td>
                        <td>
                          <input
                            type="number"
                            step="0.01"
                            className={`form-control form-control-sm config-editor-input ${
                              errors[`${index}-price`] ? "is-invalid" : ""
                            }`}
                            value={item.price || 0}
                            onChange={(e) =>
                              handleFieldChange(
                                index,
                                "price",
                                parseFloat(e.target.value) || 0
                              )
                            }
                          />
                          {errors[`${index}-price`] && (
                            <div className="invalid-feedback d-block">
                              {errors[`${index}-price`]}
                            </div>
                          )}
                          {configData?.previous[index]?.price && (
                            <div className="previous-value">
                              Previous: £{configData.previous[index].price}
                            </div>
                          )}
                        </td>
                        <td>
                          <small className="text-muted">
                            {configData?.previous[index] ? (
                              <>
                                Label: {configData.previous[index].label}
                                <br />
                                Price: £{configData.previous[index].price}
                              </>
                            ) : (
                              "No previous data"
                            )}
                          </small>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              disabled={loading || saving || Object.keys(errors).length > 0}
            >
              {saving ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-1"></i>
                  Save Changes
                </>
              )}
            </button>

            {hasUnsavedChanges && (
              <small className="text-muted ms-2">
                <i className="bi bi-exclamation-triangle me-1"></i>
                You have unsaved changes
              </small>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlateConfigEditor;
