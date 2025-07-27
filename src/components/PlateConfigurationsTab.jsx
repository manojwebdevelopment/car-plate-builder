// src/components/PlateConfigurationsTab.jsx
import { useEffect, useState } from "react";
import { usePlateConfigurations } from "./hooks/usePlateConfigurations";
import PlateConfigEditor from "./modals/PlateConfigEditor.jsx";

const PlateConfigurationsTab = ({ showToast }) => {
  const {
    configurations,
    loading,
    fetchConfigurations,
    fetchConfigurationType,
    updateConfiguration,
    resetToDefaults,
  } = usePlateConfigurations();

  const [editorConfig, setEditorConfig] = useState({
    isOpen: false,
    type: null,
    label: null,
  });

  const [seeding, setSeeding] = useState(false);

  const handleEditConfig = (type, label) => {
    setEditorConfig({
      isOpen: true,
      type,
      label,
    });
  };

  const handleCloseEditor = () => {
    setEditorConfig({
      isOpen: false,
      type: null,
      label: null,
    });
  };

  const handleSaveConfig = async (type, data) => {
    const result = await updateConfiguration(type, data);
    if (result.success) {
      showToast(result.message, "success");
      // Refresh configurations to update item counts
      fetchConfigurations();
    } else {
      showToast(result.error || "Failed to save configuration", "error");
    }
  };

  useEffect(() => {
    fetchConfigurations();
  }, [fetchConfigurations]);

  const configTypes = [
    {
      key: "plateStyles",
      label: "Plate Styles",
      priority: 1,
      description: "Different plate finishes and effects",
    },
    {
      key: "sizeOptions",
      label: "Plate Sizes",
      priority: 2,
      description: "Available plate dimensions",
    },
    {
      key: "borderOptions",
      label: "Plate Borders",
      priority: 3,
      description: "Border styles and colors",
    },
    {
      key: "flagOptions",
      label: "Plate Badges",
      priority: 4,
      description: "Country flags and badges",
    },
    {
      key: "finishOptions",
      label: "Plate Finishes",
      priority: 5,
      description: "Protective coatings and finishes",
    },
  ];

  const handleReset = async (type, label) => {
    if (
      window.confirm(
        `Are you sure you want to reset ${label} to default values? This will move your current configuration to previous and restore the original defaults.`
      )
    ) {
      const result = await resetToDefaults(type);
      if (result.success) {
        showToast(result.message, "success");
        // Refresh configurations to update item counts
        fetchConfigurations();
      } else {
        showToast(result.error || "Failed to reset configuration", "error");
      }
    }
  };

  const handleSeedData = async () => {
    if (
      window.confirm(
        "This will populate the database with all default plate configurations from PlateJson.jsx. Existing data will not be overwritten. Continue?"
      )
    ) {
      setSeeding(true);
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch(
          "http://localhost:5000/api/plate-configurations/seed",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();

        if (result.success) {
          showToast(
            `Seeding completed! Total items: ${
              result.summary?.totalItems || "N/A"
            }`,
            "success"
          );
          console.log("Seeding results:", result.results);
          console.log("Summary:", result.summary);

          // Refresh configurations to show updated counts
          fetchConfigurations();
        } else {
          showToast(result.error || "Failed to seed data", "error");
          console.error("Seeding error:", result);
        }
      } catch (error) {
        showToast("Error seeding data: " + error.message, "error");
        console.error("Seeding error:", error);
      } finally {
        setSeeding(false);
      }
    }
  };

  const getTotalItems = () => {
    return Object.values(configurations).reduce((total, config) => {
      return total + (Array.isArray(config) ? config.length : 0);
    }, 0);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Plate Configurations</h2>
          <p className="text-muted mb-0">
            Manage all plate configuration options. Total items:{" "}
            {getTotalItems()}
          </p>
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-warning"
            onClick={handleSeedData}
            disabled={seeding || loading}
          >
            {seeding ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Seeding...
              </>
            ) : (
              <>
                <i className="bi bi-database-fill-add me-1"></i>
                Seed Complete Data
              </>
            )}
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={fetchConfigurations}
            disabled={loading || seeding}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Refreshing...
              </>
            ) : (
              <>
                <i className="bi bi-arrow-clockwise me-1"></i>
                Refresh
              </>
            )}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      {loading ? (
        <div className="text-center p-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading configurations...</p>
        </div>
      ) : (
        <>
          {getTotalItems() === 0 && (
            <div className="alert alert-info" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              <strong>No configurations found!</strong> Click "Seed Complete
              Data" to populate with default configurations from PlateJson.jsx.
            </div>
          )}

          <div className="row">
            {configTypes.map(({ key, label, priority, description }) => {
              const itemCount = configurations[key]?.length || 0;
              const hasItems = itemCount > 0;

              return (
                <div key={key} className="col-lg-6 mb-4">
                  <div
                    className={`card h-100 ${
                      !hasItems ? "border-warning" : ""
                    }`}
                  >
                    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="mb-0">
                          <span className="badge bg-light text-dark me-2">
                            {priority}
                          </span>
                          {label}
                        </h5>
                        <small className="opacity-75">{description}</small>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-light"
                        onClick={() => handleReset(key, label)}
                        disabled={loading || seeding || !hasItems}
                        title="Reset to default values"
                      >
                        <i className="bi bi-arrow-counterclockwise me-1"></i>
                        Reset
                      </button>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h6 className="mb-1">
                            <i className="bi bi-collection me-1"></i>
                            Items:
                            <span
                              className={`badge ms-2 ${
                                hasItems ? "bg-success" : "bg-warning"
                              }`}
                            >
                              {itemCount}
                            </span>
                          </h6>
                          {!hasItems && (
                            <small className="text-warning">
                              <i className="bi bi-exclamation-triangle me-1"></i>
                              No items configured
                            </small>
                          )}
                        </div>
                      </div>

                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleEditConfig(key, label)}
                        disabled={loading || seeding}
                      >
                        <i className="bi bi-pencil me-1"></i>
                        {hasItems ? `Edit ${label}` : `Configure ${label}`}
                      </button>

                      {hasItems && (
                        <div className="mt-2">
                          <small className="text-success">
                            <i className="bi bi-check-circle me-1"></i>
                            Ready for use
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Configuration Editor Modal */}
      <PlateConfigEditor
        configType={editorConfig.type}
        configLabel={editorConfig.label}
        isOpen={editorConfig.isOpen}
        onClose={handleCloseEditor}
        onSave={handleSaveConfig}
        fetchConfigurationType={fetchConfigurationType}
        showToast={showToast}
      />
    </div>
  );
};

export default PlateConfigurationsTab;
