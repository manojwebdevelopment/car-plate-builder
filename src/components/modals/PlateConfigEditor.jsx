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

  // Add new item function
  const handleAddItem = () => {
    const newItem = getDefaultItemStructure(configType);
    setEditedData([...editedData, newItem]);
    setHasUnsavedChanges(true);
  };

  // Delete item function
  const handleDeleteItem = (index) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const newData = editedData.filter((_, i) => i !== index);
      setEditedData(newData);
      setHasUnsavedChanges(true);

      // Clear any errors for deleted item
      const newErrors = { ...errors };
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith(`${index}-`)) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);
    }
  };

  // Get default structure for new items based on config type
  const getDefaultItemStructure = (type) => {
    const baseStructure = {
      key: `new-item-${Date.now()}`,
      label: "New Item",
      price: 0,
      image: "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
    };

    switch (type) {
      case "plateStyles":
        return {
          ...baseStructure,
          description: "New plate style",
          font: "Arial",
          fontUrl: "fonts/Charles Wright_Bold (1).json",
          fontSize: 0.65,
          outlineColor: null,
          thickness: 0.01,
        };

      case "sizeOptions":
        return {
          ...baseStructure,
          dimensions: "533mm x 152mm",
          description: "New size option",
        };

      case "borderOptions":
        return {
          ...baseStructure,
          name: "New Border",
          color: "#000000",
          type: "standard",
          borderWidth: 2,
        };

      case "flagOptions":
        return {
          ...baseStructure,
          name: "New Flag",
          text: "NEW",
          flagImage: null,
        };

      case "finishOptions":
        return {
          ...baseStructure,
          description: "New finish option",
        };

      default:
        return baseStructure;
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

      // Additional validation based on config type
      if (
        configType === "borderOptions" &&
        (!item.name || item.name.trim() === "")
      ) {
        newErrors[`${index}-name`] = "Border name is required";
      }

      if (
        configType === "flagOptions" &&
        (!item.name || item.name.trim() === "")
      ) {
        newErrors[`${index}-name`] = "Flag name is required";
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

  // Render fields based on configuration type
  const renderItemFields = (item, index) => {
    const commonFields = (
      <>
        <td>
          <input
            type="text"
            className={`form-control form-control-sm config-editor-input ${
              errors[`${index}-label`] ? "is-invalid" : ""
            }`}
            value={item.label || ""}
            onChange={(e) => handleFieldChange(index, "label", e.target.value)}
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
              handleFieldChange(index, "price", parseFloat(e.target.value) || 0)
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
      </>
    );

    // Add specific fields based on config type
    switch (configType) {
      case "borderOptions":
        return (
          <>
            <td>
              <input
                type="text"
                className={`form-control form-control-sm config-editor-input ${
                  errors[`${index}-name`] ? "is-invalid" : ""
                }`}
                value={item.name || ""}
                onChange={(e) =>
                  handleFieldChange(index, "name", e.target.value)
                }
              />
              {errors[`${index}-name`] && (
                <div className="invalid-feedback d-block">
                  {errors[`${index}-name`]}
                </div>
              )}
            </td>
            {commonFields}
            <td>
              <input
                type="color"
                className="form-control form-control-sm"
                value={item.color || "#000000"}
                onChange={(e) =>
                  handleFieldChange(index, "color", e.target.value)
                }
              />
            </td>
          </>
        );

      case "flagOptions":
        return (
          <>
            <td>
              <input
                type="text"
                className={`form-control form-control-sm config-editor-input ${
                  errors[`${index}-name`] ? "is-invalid" : ""
                }`}
                value={item.name || ""}
                onChange={(e) =>
                  handleFieldChange(index, "name", e.target.value)
                }
              />
              {errors[`${index}-name`] && (
                <div className="invalid-feedback d-block">
                  {errors[`${index}-name`]}
                </div>
              )}
            </td>
            {commonFields}
            <td>
              <input
                type="text"
                className="form-control form-control-sm config-editor-input"
                value={item.text || ""}
                onChange={(e) =>
                  handleFieldChange(index, "text", e.target.value)
                }
                placeholder="Flag text"
              />
            </td>
          </>
        );

      default:
        return commonFields;
    }
  };

  // Get table headers based on config type
  const getTableHeaders = () => {
    const baseHeaders = ["Item", "Label", "Price (£)", "Actions"];

    switch (configType) {
      case "borderOptions":
        return [
          "Item",
          "Border Name",
          "Label",
          "Price (£)",
          "Color",
          "Actions",
        ];
      case "flagOptions":
        return ["Item", "Flag Name", "Label", "Price (£)", "Text", "Actions"];
      default:
        return baseHeaders;
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
              onClick={handleClose}
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
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0">
                    Configuration Items ({editedData.length})
                  </h6>
                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={handleAddItem}
                    disabled={saving}
                  >
                    <i className="bi bi-plus-circle me-1"></i>
                    Add New Item
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="table table-bordered config-editor-table">
                    <thead>
                      <tr>
                        {getTableHeaders().map((header, idx) => (
                          <th key={idx}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {editedData.map((item, index) => (
                        <tr key={item.key || index}>
                          <td>
                            <span className="config-item-index">
                              {index + 1}
                            </span>
                          </td>
                          {renderItemFields(item, index)}
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDeleteItem(index)}
                              disabled={saving}
                              title="Delete this item"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                      {editedData.length === 0 && (
                        <tr>
                          <td
                            colSpan={getTableHeaders().length}
                            className="text-center text-muted py-4"
                          >
                            No items found. Click "Add New Item" to get started.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
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
