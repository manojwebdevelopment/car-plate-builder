// src/components/SettingsTab.jsx
import React, { useState } from 'react';
import { validateLength, validateRequired } from './utils/validators';

const SettingsTab = ({ settings, onUpdateSettings, showToast }) => {
  const [formData, setFormData] = useState(settings);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('seo');

  const validateForm = () => {
    const newErrors = {};

    // Title validation
    const titleValidation = validateLength(formData.title, 1, 100, 'Site title');
    if (!titleValidation.isValid) {
      newErrors.title = titleValidation.error;
    }

    // Description validation
    const descValidation = validateLength(formData.description, 10, 500, 'Site description');
    if (!descValidation.isValid) {
      newErrors.description = descValidation.error;
    }

    // Canonical URL validation
    if (formData.canonical && formData.canonical.trim()) {
      try {
        new URL(formData.canonical);
      } catch {
        newErrors.canonical = 'Please enter a valid URL';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onUpdateSettings(formData);
      showToast('Settings saved successfully!', 'success');
    } catch (error) {
      showToast('Failed to save settings', 'danger');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleReset = () => {
    setFormData(settings);
    setErrors({});
    showToast('Settings reset to last saved values', 'info');
  };

  const isModified = JSON.stringify(formData) !== JSON.stringify(settings);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Site Settings</h2>
        <div className="d-flex align-items-center gap-2">
          {isModified && (
            <span className="badge bg-warning text-dark">
              <i className="bi bi-exclamation-triangle me-1"></i>
              Unsaved Changes
            </span>
          )}
          <button 
            className="btn btn-outline-secondary"
            onClick={handleReset}
            disabled={!isModified || saving}
          >
            <i className="bi bi-arrow-counterclockwise me-2"></i>
            Reset
          </button>
          <button 
            className="btn btn-warning"
            onClick={handleSave}
            disabled={!isModified || saving}
          >
            {saving ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Saving...
              </>
            ) : (
              <>
                <i className="bi bi-check2 me-2"></i>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Settings Navigation */}
      <div className="row">
        <div className="col-md-3">
          <div className="list-group">
            <button
              className={`list-group-item list-group-item-action ${activeSection === 'seo' ? 'active' : ''}`}
              onClick={() => setActiveSection('seo')}
            >
              <i className="bi bi-search me-2"></i>
              SEO & Meta
            </button>
            <button
              className={`list-group-item list-group-item-action ${activeSection === 'theme' ? 'active' : ''}`}
              onClick={() => setActiveSection('theme')}
            >
              <i className="bi bi-palette me-2"></i>
              Theme Settings
            </button>
            <button
              className={`list-group-item list-group-item-action ${activeSection === 'email' ? 'active' : ''}`}
              onClick={() => setActiveSection('email')}
            >
              <i className="bi bi-envelope me-2"></i>
              Email Settings
            </button>
            <button
              className={`list-group-item list-group-item-action ${activeSection === 'security' ? 'active' : ''}`}
              onClick={() => setActiveSection('security')}
            >
              <i className="bi bi-shield-check me-2"></i>
              Security
            </button>
          </div>
        </div>

        <div className="col-md-9">
          {/* SEO & Meta Settings */}
          {activeSection === 'seo' && (
            <div className="card">
              <div className="card-header bg-warning">
                <h5 className="mb-0 text-dark">
                  <i className="bi bi-search me-2"></i>
                  SEO & Site Configuration
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label fw-bold">Site Title *</label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Enter your site title"
                    maxLength={100}
                  />
                  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                  <div className="form-text">
                    {formData.title.length}/100 characters. This appears in browser tabs and search results.
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-bold">Site Description *</label>
                  <textarea
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    rows="3"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Enter a brief description of your site"
                    maxLength={500}
                  />
                  {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                  <div className="form-text">
                    {formData.description.length}/500 characters. This appears in search engine results.
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-bold">Canonical URL</label>
                  <input
                    type="url"
                    className={`form-control ${errors.canonical ? 'is-invalid' : ''}`}
                    value={formData.canonical}
                    onChange={(e) => handleChange('canonical', e.target.value)}
                    placeholder="https://yoursite.com"
                  />
                  {errors.canonical && <div className="invalid-feedback">{errors.canonical}</div>}
                  <div className="form-text">
                    The primary URL for your website. Used for SEO purposes.
                  </div>
                </div>

                {/* SEO Preview */}
                <div className="mt-4">
                  <h6 className="text-warning mb-3">Search Engine Preview</h6>
                  <div className="border p-3 rounded bg-light">
                    <div className="text-primary text-decoration-underline">
                      {formData.title || 'Your Site Title'}
                    </div>
                    <div className="text-success small">
                      {formData.canonical || 'https://yoursite.com'}
                    </div>
                    <div className="text-muted small">
                      {formData.description || 'Your site description will appear here...'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Theme Settings */}
          {activeSection === 'theme' && (
            <div className="card">
              <div className="card-header bg-warning">
                <h5 className="mb-0 text-dark">
                  <i className="bi bi-palette me-2"></i>
                  Theme Settings
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Primary Color</label>
                    <div className="d-flex align-items-center mb-3">
                      <div className="color-preview me-3" style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: '#ffc107',
                        border: '2px solid #000',
                        borderRadius: '8px'
                      }}></div>
                      <div>
                        <span className="badge bg-warning text-dark">Yellow Theme Active</span>
                        <div className="small text-muted">#ffc107</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Color Scheme</label>
                    <div className="btn-group d-block" role="group">
                      <input type="radio" className="btn-check" name="colorScheme" id="light" defaultChecked />
                      <label className="btn btn-outline-secondary" htmlFor="light">
                        <i className="bi bi-sun me-2"></i>Light
                      </label>
                      
                      <input type="radio" className="btn-check" name="colorScheme" id="dark" />
                      <label className="btn btn-outline-secondary" htmlFor="dark">
                        <i className="bi bi-moon me-2"></i>Dark
                      </label>
                      
                      <input type="radio" className="btn-check" name="colorScheme" id="auto" />
                      <label className="btn btn-outline-secondary" htmlFor="auto">
                        <i className="bi bi-circle-half me-2"></i>Auto
                      </label>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-bold">Logo Upload</label>
                      <input className="form-control" type="file" accept="image/*" />
                      <div className="form-text">Recommended size: 200x60px, PNG or SVG format</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-bold">Favicon</label>
                      <input className="form-control" type="file" accept="image/*" />
                      <div className="form-text">Recommended size: 32x32px, ICO or PNG format</div>
                    </div>
                  </div>
                </div>

                <div className="alert alert-info">
                  <i className="bi bi-info-circle me-2"></i>
                  <strong>Note:</strong> Theme changes will be applied after saving and may take a few minutes to reflect across the site.
                </div>
              </div>
            </div>
          )}

          {/* Email Settings */}
          {activeSection === 'email' && (
            <div className="card">
              <div className="card-header bg-warning">
                <h5 className="mb-0 text-dark">
                  <i className="bi bi-envelope me-2"></i>
                  Email Configuration
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-bold">SMTP Server</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="smtp.gmail.com"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-bold">SMTP Port</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="587"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-bold">Email Username</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="your-email@domain.com"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-bold">Email Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-check mb-3">
                  <input className="form-check-input" type="checkbox" id="enableSSL" defaultChecked />
                  <label className="form-check-label" htmlFor="enableSSL">
                    Enable SSL/TLS encryption
                  </label>
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-outline-info">
                    <i className="bi bi-envelope-check me-2"></i>
                    Test Email Connection
                  </button>
                  <button className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Reset to Default
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeSection === 'security' && (
            <div className="card">
              <div className="card-header bg-warning">
                <h5 className="mb-0 text-dark">
                  <i className="bi bi-shield-check me-2"></i>
                  Security Settings
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <h6 className="text-warning">Authentication Settings</h6>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="twoFactor" />
                    <label className="form-check-label" htmlFor="twoFactor">
                      Enable Two-Factor Authentication
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="sessionTimeout" defaultChecked />
                    <label className="form-check-label" htmlFor="sessionTimeout">
                      Auto logout after 30 minutes of inactivity
                    </label>
                  </div>
                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" id="loginNotifications" defaultChecked />
                    <label className="form-check-label" htmlFor="loginNotifications">
                      Send email notifications for admin logins
                    </label>
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="text-warning">Data Protection</h6>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="dataEncryption" defaultChecked />
                    <label className="form-check-label" htmlFor="dataEncryption">
                      Encrypt sensitive data at rest
                    </label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="auditLog" defaultChecked />
                    <label className="form-check-label" htmlFor="auditLog">
                      Enable audit logging for admin actions
                    </label>
                  </div>
                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" id="backupEncryption" />
                    <label className="form-check-label" htmlFor="backupEncryption">
                      Encrypt database backups
                    </label>
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="text-warning">Access Control</h6>
                  <div className="mb-3">
                    <label className="form-label">Maximum Failed Login Attempts</label>
                    <select className="form-select">
                      <option value="3">3 attempts</option>
                      <option value="5" selected>5 attempts</option>
                      <option value="10">10 attempts</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Account Lockout Duration</label>
                    <select className="form-select">
                      <option value="15">15 minutes</option>
                      <option value="30" selected>30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="1440">24 hours</option>
                    </select>
                  </div>
                </div>

                <div className="alert alert-warning">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  <strong>Warning:</strong> Changes to security settings will affect all admin users and may require re-authentication.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .list-group-item.active {
          background-color: #ffc107;
          border-color: #ffc107;
          color: #000;
        }
        .color-preview {
          cursor: pointer;
          transition: transform 0.2s;
        }
        .color-preview:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default SettingsTab;