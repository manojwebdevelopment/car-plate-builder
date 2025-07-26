// src/components/PlateConfigurationsTab.jsx
import { useEffect, useState } from 'react';
import { usePlateConfigurations } from './hooks/usePlateConfigurations';
import PlateConfigEditor from './modals/PlateConfigEditor.jsx';

const PlateConfigurationsTab = ({ showToast }) => {
  const {
    configurations,
    loading,
    fetchConfigurations,
    fetchConfigurationType,
    updateConfiguration,
    resetToDefaults
  } = usePlateConfigurations();

  // Add this state inside the PlateConfigurationsTab component
  const [editorConfig, setEditorConfig] = useState({
    isOpen: false,
    type: null,
    label: null
  });

  // Add this function to handle opening the editor
  const handleEditConfig = (type, label) => {
    setEditorConfig({
      isOpen: true,
      type,
      label
    });
  };

  // Add this function to handle closing the editor
  const handleCloseEditor = () => {
    setEditorConfig({
      isOpen: false,
      type: null,
      label: null
    });
  };

  // Add this function to handle saving configuration
  const handleSaveConfig = async (type, data) => {
    const result = await updateConfiguration(type, data);
    if (result.success) {
      showToast(result.message, 'success');
    } else {
      showToast(result.error || 'Failed to save configuration', 'error');
    }
  };

  useEffect(() => {
    fetchConfigurations();
  }, [fetchConfigurations]);

  const configTypes = [
    { key: 'plateStyles', label: 'Plate Styles', priority: 1 },
    { key: 'sizeOptions', label: 'Plate Sizes', priority: 2 },
    { key: 'borderOptions', label: 'Plate Borders', priority: 3 },
    { key: 'flagOptions', label: 'Plate Badges', priority: 4 },
    { key: 'finishOptions', label: 'Plate Finishes', priority: 5 }
  ];

  const handleReset = async (type, label) => {
    if (window.confirm(`Are you sure you want to reset ${label} to default values?`)) {
      const result = await resetToDefaults(type);
      if (result.success) {
        showToast(result.message, 'success');
      } else {
        showToast(result.error || 'Failed to reset configuration', 'error');
      }
    }
  };

  const handleSeedData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/plate-configurations/seed', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      
      if (result.success) {
        showToast('Data seeded successfully', 'success');
        fetchConfigurations();
      } else {
        showToast('Failed to seed data', 'error');
      }
    } catch (error) {
      showToast('Error seeding data', 'error');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Plate Configurations</h2>
        //TODO: remove this button after testing
        <button 
          className="btn btn-warning me-2"
          onClick={handleSeedData}
        >
          Seed Data (Test Only)
        </button>
        <button 
          className="btn btn-outline-primary"
          onClick={fetchConfigurations}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {loading ? (
        <div className="text-center p-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading configurations...</p>
        </div>
      ) : (
        <div className="row">
          {configTypes.map(({ key, label, priority }) => (
            <div key={key} className="col-lg-6 mb-4">
              <div className="card">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    {priority}. {label}
                  </h5>
                  <button
                    className="btn btn-sm btn-outline-light"
                    onClick={() => handleReset(key, label)}
                    disabled={loading}
                  >
                    Reset to Default
                  </button>
                </div>
                <div className="card-body">
                  <p className="text-muted mb-3">
                    Items: {configurations[key]?.length || 0}
                  </p>
                  <button 
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleEditConfig(key, label)}
                    disabled={loading}
                  >
                    <i className="bi bi-pencil me-1"></i>
                    Edit {label}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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