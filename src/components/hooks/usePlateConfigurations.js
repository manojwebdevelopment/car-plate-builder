// src/components/hooks/usePlateConfigurations.js
import { useState, useCallback } from "react";

const API_BASE =  "http://localhost:5000";

export const usePlateConfigurations = () => {
  const [configurations, setConfigurations] = useState({});
  const [loading, setLoading] = useState(false);
  const [editingConfig, setEditingConfig] = useState(null);

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("adminToken");
  };

  // Fetch all current configurations
  const fetchConfigurations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/plate-configurations`);
      const result = await response.json();

      if (result.success) {
        setConfigurations(result.data);
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error("Error fetching configurations:", error);
      return { success: false, error: "Failed to fetch configurations" };
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch specific configuration type with previous values
  const fetchConfigurationType = useCallback(async (type) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE}/api/plate-configurations/${type}`
      );
      const result = await response.json();

      if (result.success) {
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error("Error fetching configuration type:", error);
      return { success: false, error: "Failed to fetch configuration" };
    } finally {
      setLoading(false);
    }
  }, []);

  // Update configuration type
  const updateConfiguration = useCallback(async (type, data) => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const response = await fetch(
        `${API_BASE}/api/plate-configurations/${type}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ data }),
        }
      );

      const result = await response.json();

      if (result.success) {
        // Update local state
        setConfigurations((prev) => ({
          ...prev,
          [type]: data,
        }));
        return { success: true, message: result.message };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error("Error updating configuration:", error);
      return { success: false, error: "Failed to update configuration" };
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset configuration to defaults
  const resetToDefaults = useCallback(async (type) => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const response = await fetch(
        `${API_BASE}/api/plate-configurations/${type}/reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        // Update local state with reset data
        setConfigurations((prev) => ({
          ...prev,
          [type]: result.data.data,
        }));
        return { success: true, message: result.message };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error("Error resetting configuration:", error);
      return { success: false, error: "Failed to reset configuration" };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    configurations,
    loading,
    editingConfig,
    setEditingConfig,
    fetchConfigurations,
    fetchConfigurationType,
    updateConfiguration,
    resetToDefaults,
  };
};
