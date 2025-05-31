// ===============================
// PlateBuilder.js - Main plate builder component
// ===============================

import React, { useState } from 'react';
import DualPlateView from './DualPlateView';
import { 
    plateStyles, 
    thicknessOptions, 
    colorOptions, 
    shadowOptions, 
    borderOptions, 
    countryOptions, 
    flagOptions 
} from '../../config/PlateJson';

const PlateBuilder = () => {
    // STATE MANAGEMENT - All component state variables
    const [plateText, setPlateText] = useState('GHELLO');
    const [spacing, setSpacing] = useState('own');
    const [selectedStyle, setSelectedStyle] = useState('standard'); // Now includes font
    const [selectedThickness, setSelectedThickness] = useState('5mm');
    const [selectedFontColor, setSelectedFontColor] = useState('#000000');
    const [customColor, setCustomColor] = useState('#000000');
    const [selectedShadow, setSelectedShadow] = useState('none');
    const [selectedBorder, setSelectedBorder] = useState('none');
    const [selectedCountry, setSelectedCountry] = useState('none');
    const [selectedFlag, setSelectedFlag] = useState('none');
    const [badgePosition, setBadgePosition] = useState('left');
    const [badgeBorderColor, setBadgeBorderColor] = useState('#005EB8');
    const [customFlagText, setCustomFlagText] = useState('CUSTOM');
    const [customFlagImage, setCustomFlagImage] = useState(null);
    const [customTextColor, setCustomTextColor] = useState('#FFFFFF');
    const [frontQuantity, setFrontQuantity] = useState(1);
    const [rearQuantity, setRearQuantity] = useState(1);
    const [outlineColor, setOutlineColor] = useState('#000000');

    // CALCULATIONS
    const displayText = spacing === 'legal' ? plateText.split('').join(' ') : plateText;
    const selected = plateStyles.find((s) => s.key === selectedStyle);
    const selectedThicknessObj = thicknessOptions.find((t) => t.key === selectedThickness);
    const selectedColorObj = colorOptions.find((c) => c.color === selectedFontColor);
    const selectedShadowObj = shadowOptions.find((s) => s.key === selectedShadow);
    const selectedBorderObj = borderOptions.find((b) => b.key === selectedBorder);
    const selectedCountryObj = countryOptions.find((c) => c.key === selectedCountry);
    const selectedFlagObj = flagOptions[selectedCountry]?.find((f) => f.key === selectedFlag);

    const finalFontColor = selectedFontColor === 'custom' ? customColor : selectedFontColor;
    const basePrice = (selected?.price || 0) + (selectedThicknessObj?.price || 0) +
        (selectedColorObj?.price || 0) + (selectedShadowObj?.price || 0) +
        (selectedBorderObj?.price || 0) + (selectedFlagObj?.price || 0);
    const totalQuantity = frontQuantity + rearQuantity;
    const totalPrice = basePrice * totalQuantity;

    // EVENT HANDLERS
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('File size must be less than 2MB');
                return;
            }
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                setCustomFlagImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCountryChange = (countryKey) => {
        setSelectedCountry(countryKey);
        setSelectedFlag('none');
        setCustomFlagImage(null);
    };

    const resetAll = () => {
        setPlateText('GHELLO');
        setSpacing('own');
        setSelectedStyle('standard');
        setSelectedThickness('5mm');
        setSelectedFontColor('#000000');
        setCustomColor('#000000');
        setSelectedShadow('none');
        setSelectedBorder('none');
        setSelectedCountry('none');
        setSelectedFlag('none');
        setBadgePosition('left');
        setBadgeBorderColor('#005EB8');
        setCustomFlagText('CUSTOM');
        setCustomFlagImage(null);
        setCustomTextColor('#FFFFFF');
        setFrontQuantity(1);
        setRearQuantity(1);
        setOutlineColor('#000000');
    };

    return (
        <div className="min-vh-100" style={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            <div className="container py-4">
                <div className="row g-4">
                    
                    {/* LEFT PANEL - Controls */}
                    <div className="col-lg-6">
                        
                        {/* TEXT INPUT SECTION */}
                        <div className="card shadow border-0 mb-4" style={{ borderRadius: '15px' }}>
                            <div className="card-header text-white text-center py-3" style={{
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                borderRadius: '15px 15px 0 0'
                            }}>
                                <h5 className="mb-0">
                                    <i className="fas fa-edit me-2"></i>Enter Your Plate Text
                                </h5>
                            </div>
                            <div className="card-body p-4">
                                <input
                                    type="text"
                                    value={plateText}
                                    onChange={(e) => setPlateText(e.target.value.toUpperCase())}
                                    className="form-control form-control-lg text-center fw-bold mb-4"
                                    placeholder="Enter Plate Text"
                                    maxLength="8"
                                    style={{
                                        fontSize: '2.5rem',
                                        letterSpacing: '0.3em',
                                        border: '3px solid #e9ecef',
                                        borderRadius: '15px',
                                        boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)'
                                    }}
                                />

                                <div className="row g-3">
                                    <div className="col-6">
                                        <label className="form-label fw-bold text-success fs-5">
                                            <i className="fas fa-arrows-alt-h me-2"></i>Spacing
                                        </label>
                                        <div className="btn-group w-100">
                                            <button
                                                onClick={() => setSpacing('own')}
                                                className={`btn btn-lg ${spacing === 'own' ? 'btn-success' : 'btn-outline-success'}`}
                                                style={{ borderRadius: '10px 0 0 10px' }}
                                            >
                                                OWN
                                            </button>
                                            <button
                                                onClick={() => setSpacing('legal')}
                                                className={`btn btn-lg ${spacing === 'legal' ? 'btn-success' : 'btn-outline-success'}`}
                                                style={{ borderRadius: '0 10px 10px 0' }}
                                            >
                                                LEGAL
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label fw-bold text-info fs-6">Preview</label>
                                        <div className="form-control text-center fw-bold" style={{ 
                                            fontSize: '1.5rem', 
                                            letterSpacing: spacing === 'legal' ? '0.3em' : '0.1em',
                                            backgroundColor: '#f8f9fa',
                                            borderRadius: '10px'
                                        }}>
                                            {displayText}
                                        </div>
                                    </div>
                                </div>

                                {/* QUANTITY CONTROLS */}
                                <div className="row g-3 mt-2">
                                    <div className="col-6">
                                        <label className="form-label fw-bold text-info fs-6">
                                            <i className="fas fa-plus-circle me-2"></i>Front Plates
                                        </label>
                                        <div className="input-group">
                                            <button
                                                className="btn btn-outline-info"
                                                onClick={() => setFrontQuantity(Math.max(0, frontQuantity - 1))}
                                                style={{ borderRadius: '10px 0 0 10px' }}
                                            >
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <input
                                                type="number"
                                                className="form-control text-center fw-bold"
                                                value={frontQuantity}
                                                onChange={(e) => setFrontQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                                                min="0"
                                                max="10"
                                            />
                                            <button
                                                className="btn btn-outline-info"
                                                onClick={() => setFrontQuantity(Math.min(10, frontQuantity + 1))}
                                                style={{ borderRadius: '0 10px 10px 0' }}
                                            >
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label fw-bold text-warning fs-6">
                                            <i className="fas fa-plus-circle me-2"></i>Rear Plates
                                        </label>
                                        <div className="input-group">
                                            <button
                                                className="btn btn-outline-warning"
                                                onClick={() => setRearQuantity(Math.max(0, rearQuantity - 1))}
                                                style={{ borderRadius: '10px 0 0 10px' }}
                                            >
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <input
                                                type="number"
                                                className="form-control text-center fw-bold"
                                                value={rearQuantity}
                                                onChange={(e) => setRearQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                                                min="0"
                                                max="10"
                                            />
                                            <button
                                                className="btn btn-outline-warning"
                                                onClick={() => setRearQuantity(Math.min(10, rearQuantity + 1))}
                                                style={{ borderRadius: '0 10px 10px 0' }}
                                            >
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* STYLE OPTIONS - COMBINED PLATE STYLE + FONT */}
                        <div className="card shadow border-0 mb-4" style={{ borderRadius: '15px' }}>
                            <div className="card-header text-white py-3" style={{
                                background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                                borderRadius: '15px 15px 0 0'
                            }}>
                                <h5 className="mb-0">
                                    <i className="fas fa-sliders-h me-2"></i>Style Options
                                </h5>
                            </div>
                            <div className="card-body p-4">
                                <div className="row g-4">
                                    
                                    {/* COMBINED PLATE STYLE + FONT */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold fs-5">
                                            <i className="fas fa-layer-group me-2 text-primary"></i>Plate Style & Font
                                        </label>
                                        <select
                                            className="form-select form-select-lg"
                                            value={selectedStyle}
                                            onChange={(e) => setSelectedStyle(e.target.value)}
                                            style={{ borderRadius: '10px', border: '2px solid #dee2e6' }}
                                        >
                                            {plateStyles.map((style) => (
                                                <option key={style.key} value={style.key}>
                                                    {style.label} - £{style.price}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="small text-muted mt-2">
                                            <i className="fas fa-info-circle me-1"></i>
                                            Font style is automatically matched to plate type
                                        </div>
                                    </div>

                                    {/* FONT COLOR */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold fs-5">
                                            <i className="fas fa-palette me-2 text-danger"></i>Font Color
                                        </label>
                                        <select
                                            className="form-select form-select-lg"
                                            value={selectedFontColor}
                                            onChange={(e) => setSelectedFontColor(e.target.value)}
                                            style={{ borderRadius: '10px', border: '2px solid #dee2e6' }}
                                        >
                                            {colorOptions.map((color) => (
                                                <option key={color.color} value={color.color}>
                                                    {color.name} - £{color.price}
                                                </option>
                                            ))}
                                        </select>
                                        {selectedFontColor === 'custom' && (
                                            <div className="mt-3">
                                                <input
                                                    type="color"
                                                    value={customColor}
                                                    onChange={(e) => setCustomColor(e.target.value)}
                                                    className="form-control form-control-color form-control-lg w-100"
                                                    style={{ height: '60px', borderRadius: '10px' }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* THICKNESS & SHADOW */}
                                    <div className="col-6">
                                        <label className="form-label fw-bold fs-6">
                                            <i className="fas fa-expand-arrows-alt me-2 text-secondary"></i>Thickness
                                        </label>
                                        <select
                                            className="form-select form-select-lg"
                                            value={selectedThickness}
                                            onChange={(e) => setSelectedThickness(e.target.value)}
                                            style={{ borderRadius: '10px' }}
                                        >
                                            {thicknessOptions.map((thickness) => (
                                                <option key={thickness.key} value={thickness.key}>
                                                    {thickness.label} +£{thickness.price}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label fw-bold fs-6">
                                            <i className="fas fa-magic me-2" style={{ color: '#ff6b00' }}></i>Text Effects
                                        </label>
                                        <select
                                            className="form-select form-select-lg"
                                            value={selectedShadow}
                                            onChange={(e) => setSelectedShadow(e.target.value)}
                                            style={{ borderRadius: '10px' }}
                                        >
                                            {shadowOptions.map((shadow) => (
                                                <option key={shadow.key} value={shadow.key}>
                                                    {shadow.name} +£{shadow.price}
                                                </option>
                                            ))}
                                        </select>

                                        {/* OUTLINE COLOR PICKER */}
                                        {(selectedShadow === 'colored-outline') && (
                                            <div className="mt-2">
                                                <label className="form-label small fw-bold">Outline Color</label>
                                                <div className="d-flex gap-2">
                                                    <input
                                                        type="color"
                                                        value={outlineColor}
                                                        onChange={(e) => setOutlineColor(e.target.value)}
                                                        className="form-control form-control-color"
                                                        style={{ width: '50px', height: '38px' }}
                                                    />
                                                    <select
                                                        className="form-select"
                                                        value={outlineColor}
                                                        onChange={(e) => setOutlineColor(e.target.value)}
                                                    >
                                                        <option value="#000000">Black</option>
                                                        <option value="#FFFFFF">White</option>
                                                        <option value="#FF0000">Red</option>
                                                        <option value="#0000FF">Blue</option>
                                                        <option value="#00FF00">Green</option>
                                                        <option value="#FFD700">Gold</option>
                                                        <option value="#800080">Purple</option>
                                                    </select>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* BORDER STYLE */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold fs-6">
                                            <i className="fas fa-border-style me-2 text-info"></i>Border Style
                                        </label>
                                        <select
                                            className="form-select form-select-lg"
                                            value={selectedBorder}
                                            onChange={(e) => setSelectedBorder(e.target.value)}
                                            style={{ borderRadius: '10px' }}
                                        >
                                            {borderOptions.map((border) => (
                                                <option key={border.key} value={border.key}>
                                                    {border.name} +£{border.price}
                                                </option>
                                            ))}
                                        </select>

                                        {selectedBorder !== 'none' && (
                                            <div className="mt-2 d-flex align-items-center">
                                                <span className="small me-2">Border Color:</span>
                                                <div
                                                    style={{
                                                        width: '30px',
                                                        height: '20px',
                                                        backgroundColor: borderOptions.find(b => b.key === selectedBorder)?.color || '#000000',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '4px'
                                                    }}
                                                ></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* COUNTRY BADGE OPTIONS */}
                        <div className="card shadow border-0 mt-4" style={{ borderRadius: '15px' }}>
                            <div className="card-header text-white py-3" style={{
                                background: 'linear-gradient(45deg, #28a745, #20c997)',
                                borderRadius: '15px 15px 0 0'
                            }}>
                                <h5 className="mb-0">
                                    <i className="fas fa-flag me-2"></i>Country Badge Options
                                </h5>
                            </div>
                            <div className="card-body p-4">
                                <div className="row g-4">
                                    
                                    <div className="col-12">
                                        <label className="form-label fw-bold fs-5">
                                            <i className="fas fa-globe me-2 text-primary"></i>Country Badge
                                        </label>
                                        <select
                                            className="form-select form-select-lg"
                                            value={selectedCountry}
                                            onChange={(e) => handleCountryChange(e.target.value)}
                                            style={{ borderRadius: '10px', border: '2px solid #dee2e6' }}
                                        >
                                            {countryOptions.map((country) => (
                                                <option key={country.key} value={country.key}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {selectedCountry !== 'none' && flagOptions[selectedCountry] && (
                                        <div className="col-12">
                                            <div className="row g-2">
                                                {flagOptions[selectedCountry].map((flag) => (
                                                    <div key={flag.key} className="col-6">
                                                        <div
                                                            className={`card h-100 cursor-pointer border-2 ${selectedFlag === flag.key ? 'border-primary bg-light' : 'border-secondary'}`}
                                                            onClick={() => setSelectedFlag(flag.key)}
                                                            style={{
                                                                cursor: 'pointer',
                                                                borderRadius: '10px',
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                        >
                                                            <div className="card-body p-3 text-center">
                                                                <div className="mb-2">
                                                                    <div style={{
                                                                        width: '60px',
                                                                        height: '36px',
                                                                        margin: '0 auto',
                                                                        border: '1px solid #ddd',
                                                                        borderRadius: '3px',
                                                                        overflow: 'hidden',
                                                                        position: 'relative'
                                                                    }}>
                                                                        {flag.flagImage ? (
                                                                            <img
                                                                                src={flag.flagImage}
                                                                                alt={flag.name}
                                                                                style={{
                                                                                    width: '100%',
                                                                                    height: '100%',
                                                                                    objectFit: 'cover'
                                                                                }}
                                                                            />
                                                                        ) : (
                                                                            <div style={{
                                                                                width: '100%',
                                                                                height: '100%',
                                                                                backgroundColor: '#f8f9fa',
                                                                                border: '2px dashed #dee2e6',
                                                                                borderRadius: '3px',
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center'
                                                                            }}>
                                                                                <i className="fas fa-upload text-muted"></i>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="small fw-bold">{flag.text}</div>
                                                                <div className="small text-muted">£{flag.price}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {selectedFlag === 'custom-upload' && (
                                        <>
                                            <div className="col-12">
                                                <label className="form-label fw-bold">
                                                    <i className="fas fa-upload me-2 text-primary"></i>Upload Custom Flag Image
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="form-control form-control-lg"
                                                    style={{ borderRadius: '10px' }}
                                                />
                                                <div className="small text-muted mt-2">
                                                    <i className="fas fa-info-circle me-1"></i>Max size: 2MB. Recommended: 240x144px
                                                </div>
                                                {customFlagImage && (
                                                    <div className="mt-3 text-center">
                                                        <img
                                                            src={customFlagImage}
                                                            alt="Custom Flag Preview"
                                                            style={{
                                                                maxWidth: '120px',
                                                                maxHeight: '72px',
                                                                border: '2px solid #dee2e6',
                                                                borderRadius: '5px'
                                                            }}
                                                        />
                                                        <div className="small text-success mt-1">
                                                            <i className="fas fa-check me-1"></i>Image uploaded successfully
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="col-12">
                                                <label className="form-label fw-bold">Custom Flag Text</label>
                                                <input
                                                    type="text"
                                                    value={customFlagText}
                                                    onChange={(e) => setCustomFlagText(e.target.value.toUpperCase())}
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter flag text (max 6 chars)"
                                                    maxLength="6"
                                                    style={{ borderRadius: '10px' }}
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div className="col-6">
                                        <label className="form-label fw-bold fs-6">
                                            <i className="fas fa-crosshairs me-2 text-warning"></i>Badge Position
                                        </label>
                                        <select
                                            className="form-select form-select-lg"
                                            value={badgePosition}
                                            onChange={(e) => setBadgePosition(e.target.value)}
                                            style={{ borderRadius: '10px' }}
                                        >
                                            <option value="left">Left Side</option>
                                            <option value="right">Right Side</option>
                                        </select>
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label fw-bold fs-6">
                                            <i className="fas fa-font me-2 text-success"></i>Badge Text Color
                                        </label>
                                        <div className="row g-1">
                                            <div className="col-8">
                                                <select
                                                    className="form-select form-select-lg"
                                                    value={customTextColor}
                                                    onChange={(e) => setCustomTextColor(e.target.value)}
                                                    style={{ borderRadius: '10px' }}
                                                >
                                                    <option value="#FFFFFF">White</option>
                                                    <option value="#000000">Black</option>
                                                    <option value="#FFD700">Gold</option>
                                                    <option value="#FF0000">Red</option>
                                                    <option value="#0000FF">Blue</option>
                                                    <option value="#008000">Green</option>
                                                </select>
                                            </div>
                                            <div className="col-4">
                                                <input
                                                    type="color"
                                                    value={customTextColor}
                                                    onChange={(e) => setCustomTextColor(e.target.value)}
                                                    className="form-control form-control-color form-control-lg w-100"
                                                    style={{ height: '50px', borderRadius: '10px' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label fw-bold fs-6">
                                            <i className="fas fa-palette me-2 text-secondary"></i>Badge Background Color
                                        </label>
                                        <div className="row g-2">
                                            <div className="col-8">
                                                <select
                                                    className="form-select form-select-lg"
                                                    value={badgeBorderColor}
                                                    onChange={(e) => setBadgeBorderColor(e.target.value)}
                                                    style={{ borderRadius: '10px' }}
                                                >
                                                    <option value="#005EB8">Royal Blue (UK Standard)</option>
                                                    <option value="#003478">Navy Blue</option>
                                                    <option value="#1f4e79">Dark Blue</option>
                                                    <option value="#000000">Black</option>
                                                    <option value="#8B4513">Bronze</option>
                                                    <option value="#FF0000">Red</option>
                                                    <option value="#006600">Green</option>
                                                </select>
                                            </div>
                                            <div className="col-4">
                                                <input
                                                    type="color"
                                                    value={badgeBorderColor}
                                                    onChange={(e) => setBadgeBorderColor(e.target.value)}
                                                    className="form-control form-control-color form-control-lg w-100"
                                                    style={{ height: '50px', borderRadius: '10px' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL - DUAL PREVIEW AND ORDER SUMMARY */}
                    <div className="col-lg-6">
                        <div className="sticky-top" style={{ top: '20px' }}>
                            
                            {/* DUAL PREVIEW */}
                            <div className="card shadow border-0 mb-4" style={{ borderRadius: '15px' }}>
                                <div className="card-header text-white text-center py-3" style={{
                                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                    borderRadius: '15px 15px 0 0'
                                }}>
                                    <h5 className="mb-0">
                                        <i className="fas fa-eye me-2"></i>Live Preview - Both Plates
                                    </h5>
                                </div>
                                <div className="card-body p-4">
                                    <DualPlateView
                                        plateText={displayText}
                                        plateStyle={selectedStyle}
                                        selectedThickness={selectedThickness}
                                        fontColor={finalFontColor}
                                        shadowEffect={selectedShadow}
                                        borderStyle={selectedBorder}
                                        customFontColor={selectedFontColor === 'custom' ? customColor : null}
                                        countryBadge={selectedFlag}
                                        selectedCountry={selectedCountry}
                                        badgePosition={badgePosition}
                                        badgeBorderColor={badgeBorderColor}
                                        customFlagText={customFlagText}
                                        customFlagImage={customFlagImage}
                                        customTextColor={customTextColor}
                                        outlineColor={outlineColor}
                                    />
                                </div>
                            </div>

                            {/* ORDER SUMMARY */}
                            <div className="card shadow border-0 mb-4" style={{ borderRadius: '15px' }}>
                                <div className="card-header bg-success text-white text-center py-3" style={{ borderRadius: '15px 15px 0 0' }}>
                                    <h5 className="mb-0">
                                        <i className="fas fa-shopping-cart me-2"></i>Order Summary
                                    </h5>
                                </div>
                                <div className="card-body p-4">
                                    <div className="row mb-4">
                                        <div className="col-8">
                                            <div className="mb-2"><strong>Text:</strong> {plateText}</div>
                                            <div className="mb-2"><strong>Style:</strong> {selected?.label}</div>
                                            <div className="mb-2"><strong>Color:</strong> {selectedColorObj?.name}</div>
                                            <div className="mb-2"><strong>Thickness:</strong> {selectedThickness}</div>
                                            <div className="mb-2"><strong>Effects:</strong> {selectedShadowObj?.name}</div>
                                            <div className="mb-2"><strong>Border:</strong> {selectedBorderObj?.name}</div>
                                            <div className="mb-2"><strong>Country:</strong> {selectedCountryObj?.name || 'None'}</div>
                                            <div className="mb-2"><strong>Flag:</strong> {selectedFlagObj?.name || 'None'}</div>
                                            <div className="mb-2"><strong>Quantities:</strong> {frontQuantity} Front + {rearQuantity} Rear</div>
                                        </div>
                                        <div className="col-4 text-end">
                                            <h2 className="text-success fw-bold mb-3">£{totalPrice}</h2>
                                            <div className="small text-muted">
                                                <div>Base Price: £{basePrice}</div>
                                                <div>Total Quantity: {totalQuantity}</div>
                                                <div className="border-top pt-1 mt-1">
                                                    <div>Plate: £{selected?.price || 0}</div>
                                                    <div>Thickness: +£{selectedThicknessObj?.price || 0}</div>
                                                    <div>Color: +£{selectedColorObj?.price || 0}</div>
                                                    <div>Effects: +£{selectedShadowObj?.price || 0}</div>
                                                    <div>Border: +£{selectedBorderObj?.price || 0}</div>
                                                    <div>Flag: +£{selectedFlagObj?.price || 0}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-grid gap-3">
                                        <button
                                            className="btn btn-danger btn-lg py-3 fw-bold"
                                            style={{ borderRadius: '15px', fontSize: '1.2rem' }}
                                        >
                                            <i className="fas fa-cart-plus me-2"></i>
                                            ADD TO BASKET - £{totalPrice}
                                        </button>

                                        <div className="row g-2">
                                            <div className="col-4">
                                                <button className="btn btn-outline-primary w-100" style={{ borderRadius: '10px' }}>
                                                    <i className="fas fa-heart me-1"></i>Save
                                                </button>
                                            </div>
                                            <div className="col-4">
                                                <button className="btn btn-outline-info w-100" style={{ borderRadius: '10px' }}>
                                                    <i className="fas fa-share me-1"></i>Share
                                                </button>
                                            </div>
                                            <div className="col-4">
                                                <button className="btn btn-outline-secondary w-100" style={{ borderRadius: '10px' }}>
                                                    <i className="fas fa-copy me-1"></i>Copy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RESET BUTTON */}
                            <div className="text-center mt-4">
                                <button
                                    onClick={resetAll}
                                    className="btn btn-link text-primary fs-5"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <i className="fas fa-redo me-2"></i>Reset All Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlateBuilder;