import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PlatePreview from './PlatePreview';
import { ChevronLeft, ChevronRight, Car, ShoppingCart, Eye, Move, Camera, Palette, Flag, Star, CheckCircle } from 'lucide-react';
import { 
    plateStyles, 
    thicknessOptions, 
    colorOptions, 
    shadowOptions, 
    borderOptions, 
    countryOptions, 
    flagOptions,
    sizeOptions,
    finishOptions
} from '../../config/PlateJson';
import { addToCart, getCartItemCount } from '../Cart/cartUtils';

const PlateBuilder = () => {
    // Current active tab and preview type
    const [activeTab, setActiveTab] = useState('style');
    const [previewType, setPreviewType] = useState('front');
    const [cartItemCount, setCartItemCount] = useState(0);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    
    const location = useLocation();
    const navigate = useNavigate();

    // State management - all plate configuration
    const [plateText, setPlateText] = useState('REG1234');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const reg = params.get('reg');
        if (reg) {
            setPlateText(reg);
        }
        
        // Load cart count on component mount
        setCartItemCount(getCartItemCount());
        
        // Listen for cart updates
        const handleCartUpdate = (event) => {
            setCartItemCount(getCartItemCount());
        };
        
        window.addEventListener('cartUpdated', handleCartUpdate);
        
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, [location.search]);

    const [spacing, setSpacing] = useState('own');
    const [selectedStyle, setSelectedStyle] = useState('standard');
    const [selectedFontColor, setSelectedFontColor] = useState('#000000');
    const [customColor, setCustomColor] = useState('#000000');
    const [selectedBorder, setSelectedBorder] = useState('none');
    const [selectedCountry, setSelectedCountry] = useState('none');
    const [selectedFlag, setSelectedFlag] = useState('none');
    const [badgePosition, setBadgePosition] = useState('left');
    const [badgePlacement, setBadgePlacement] = useState('outside');
    const [badgeBorderColor, setBadgeBorderColor] = useState('#005EB8');
    const [customFlagText, setCustomFlagText] = useState('CUSTOM');
    const [customFlagImage, setCustomFlagImage] = useState(null);
    const [customTextColor, setCustomTextColor] = useState('#FFFFFF');
    const [frontQuantity, setFrontQuantity] = useState(1);
    const [rearQuantity, setRearQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('18-oblong');
    const [selectedFinish, setSelectedFinish] = useState('standard');
    const [isLegalCheckboxChecked, setIsLegalCheckboxChecked] = useState(false);

    // Tab configuration
    const tabs = [
        { id: 'start', label: 'START', icon: Car },
        { id: 'style', label: 'STYLE', icon: Palette },
        { id: 'size', label: 'SIZE', icon: Move },
        { id: 'border', label: 'BORDER', icon: Eye },
        { id: 'badge', label: 'BADGE', icon: Flag },
        { id: 'finish', label: 'FINISH', icon: Star }
    ];

    // Helper functions for data retrieval
    const getSelectedOption = (options, selectedId) => options.find(opt => opt.id === selectedId || opt.key === selectedId) || options[0];

    // Price calculations
    const selected = getSelectedOption(plateStyles, selectedStyle);
    const selectedColorObj = getSelectedOption(colorOptions, selectedFontColor);
    const selectedBorderObj = getSelectedOption(borderOptions, selectedBorder);
    const selectedFlagObj = flagOptions[selectedCountry]?.find((f) => f.key === selectedFlag);
    const selectedSizeObj = getSelectedOption(sizeOptions, selectedSize);
    const selectedFinishObj = getSelectedOption(finishOptions, selectedFinish);

    const finalFontColor = selectedFontColor === 'custom' ? customColor : selectedFontColor;
    const basePrice = (selected?.price || 0) + (selectedColorObj?.price || 0) + 
        (selectedBorderObj?.price || 0) + (selectedFlagObj?.price || 0) + 
        (selectedSizeObj?.price || 0) + (selectedFinishObj?.price || 0);
    const totalQuantity = frontQuantity + rearQuantity;
    const totalPrice = basePrice * totalQuantity;
    const displayText = spacing === 'legal' ? plateText.split('').join(' ') : plateText;

    // Dynamic order summary function
    const getSelectedFeatures = () => {
        const features = [];
        
        // Always show plate style (base item)
        features.push({
            name: selected?.label || 'Standard Plate',
            price: selected?.price || 0,
            type: 'base'
        });

        // Show size if not default
        if (selectedSize !== '18-oblong' && selectedSizeObj?.price > 0) {
            features.push({
                name: `Size: ${selectedSizeObj?.label}`,
                price: selectedSizeObj.price,
                type: 'addon'
            });
        }

        // Show font color if has price
        if (selectedColorObj?.price > 0) {
            features.push({
                name: `Font Color: ${selectedColorObj?.name}`,
                price: selectedColorObj.price,
                type: 'addon'
            });
        }

        // Show border if selected
        if (selectedBorder !== 'none' && selectedBorderObj?.price > 0) {
            features.push({
                name: `Frame Border: ${selectedBorderObj?.name}`,
                price: selectedBorderObj.price,
                type: 'addon'
            });
        }

        // Show badge if selected
        if (selectedFlag !== 'none' && selectedFlagObj?.price > 0) {
            features.push({
                name: `Badge: ${selectedFlagObj?.name}`,
                price: selectedFlagObj.price,
                type: 'addon'
            });
        }

        // Show finish if not default
        if (selectedFinish !== 'standard' && selectedFinishObj?.price > 0) {
            features.push({
                name: `Finish: ${selectedFinishObj?.label}`,
                price: selectedFinishObj.price,
                type: 'addon'
            });
        }

        return features;
    };

    // Add to cart function
    const handleAddToCart = () => {
        try {
            // Check if legal checkbox is checked
            if (!isLegalCheckboxChecked) {
                alert('Please confirm that you understand the plates may not be road legal by checking the checkbox.');
                return;
            }

            // Check if at least one quantity is selected
            if (frontQuantity === 0 && rearQuantity === 0) {
                alert('Please select at least one front or rear plate.');
                return;
            }

            let addedItems = 0;
            let totalSuccess = true;
            
            // Add Front Plates if quantity > 0
            if (frontQuantity > 0) {
                const frontPlateData = {
                    // Basic info
                    text: plateText,
                    plateType: 'front',
                    styleLabel: selected?.label || 'Standard Plate',
                    plateStyle: selectedStyle,
                    price: basePrice,
                    quantity: frontQuantity,
                    
                    // Style details
                    fontColor: finalFontColor,
                    borderStyle: selectedBorder,
                    selectedSize: selectedSize,
                    sizeLabel: selectedSizeObj?.label || 'Standard Oblong',
                    
                    // Badge details
                    countryBadge: selectedFlag,
                    selectedCountry: selectedCountry,
                    badgePosition: badgePosition,
                    customTextColor: customTextColor,
                    
                    // Additional info
                    roadLegal: 'No', // Since most customizations make plates non-road legal
                    spacing: spacing === 'legal' ? 'Legal spacing' : "As I've typed"
                };

                const frontResult = addToCart(frontPlateData);
                if (frontResult.success) {
                    addedItems += frontQuantity;
                } else {
                    totalSuccess = false;
                }
            }

            // Add Rear Plates if quantity > 0
            if (rearQuantity > 0) {
                const rearPlateData = {
                    // Basic info
                    text: plateText,
                    plateType: 'rear',
                    styleLabel: selected?.label || 'Standard Plate',
                    plateStyle: selectedStyle,
                    price: basePrice,
                    quantity: rearQuantity,
                    
                    // Style details
                    fontColor: finalFontColor,
                    borderStyle: selectedBorder,
                    selectedSize: selectedSize,
                    sizeLabel: selectedSizeObj?.label || 'Standard Oblong',
                    
                    // Badge details
                    countryBadge: selectedFlag,
                    selectedCountry: selectedCountry,
                    badgePosition: badgePosition,
                    customTextColor: customTextColor,
                    
                    // Additional info
                    roadLegal: 'No', // Since most customizations make plates non-road legal
                    spacing: spacing === 'legal' ? 'Legal spacing' : "As I've typed"
                };

                const rearResult = addToCart(rearPlateData);
                if (rearResult.success) {
                    addedItems += rearQuantity;
                } else {
                    totalSuccess = false;
                }
            }

            // Show appropriate message
            if (addedItems > 0) {
                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 3000);
                
                if (!totalSuccess) {
                    alert('Some items were added to cart, but there were errors with others.');
                }
            } else {
                alert('Please select at least one front or rear plate.');
            }
            
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('An error occurred while adding to cart');
        }
    };

    // Navigate to cart page
    const goToCart = () => {
        navigate('/cart');
    };

    // Event handlers
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
            reader.onload = (e) => setCustomFlagImage(e.target.result);
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
        setSelectedFontColor('#000000');
        setCustomColor('#000000');
        setSelectedBorder('none');
        setSelectedCountry('none');
        setSelectedFlag('none');
        setBadgePosition('left');
        setBadgePlacement('outside');
        setBadgeBorderColor('#005EB8');
        setCustomFlagText('CUSTOM');
        setCustomFlagImage(null);
        setCustomTextColor('#FFFFFF');
        setFrontQuantity(1);
        setRearQuantity(1);
        setSelectedSize('18-oblong');
        setSelectedFinish('standard');
        setIsLegalCheckboxChecked(false);
    };

    // Navigation functions
    const nextTab = () => {
        const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
        if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1].id);
        }
    };

    const prevTab = () => {
        const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
        if (currentIndex > 0) {
            setActiveTab(tabs[currentIndex - 1].id);
        }
    };

    // Get preview images for plate styles
    const getStylePreviewImage = (styleKey) => {
        const styleImages = {
            '4d-crystal-green': 'KRYSTAL',
            '4d-crystal-red': 'KRYSTAL', 
            '4d-crystal-blue': 'KRYSTAL',
            '4d-crystal-orange': 'KRYSTAL',
            '4d-crystal-white': 'KRYSTAL',
            '4d-neon-gel-green': 'NEON GEL',
            '4d-neon-gel-red': 'NEON GEL',
            '4d-neon-gel-blue': 'NEON GEL',
            '4d-neon-gel-orange': 'NEON GEL',
            '4d-neon-gel-white': 'NEON GEL'
        };
        return styleImages[styleKey] || 'STYLE';
    };

    const getStyleColor = (styleKey) => {
        const colorMap = {
            '4d-crystal-green': '#00FF00',
            '4d-crystal-red': '#FF0000',
            '4d-crystal-blue': '#0066CC',
            '4d-crystal-orange': '#FF8C00',
            '4d-crystal-white': '#FFFFFF',
            '4d-neon-gel-green': '#00FF00',
            '4d-neon-gel-red': '#FF0000',
            '4d-neon-gel-blue': '#0066CC',
            '4d-neon-gel-orange': '#FF8C00',
            '4d-neon-gel-white': '#FFFFFF'
        };
        return colorMap[styleKey] || '#000000';
    };

    // Tab content rendering
    const renderTabContent = () => {
        switch (activeTab) {
            case 'start':
                return (
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="card border-warning">
                                <div className="card-header bg-warning text-dark fw-bold">
                                    <Car className="me-2" size={20} />
                                    Enter Your Plate Text
                                </div>
                                <div className="card-body">
                                    <input
                                        type="text"
                                        value={plateText}
                                        onChange={(e) => setPlateText(e.target.value.toUpperCase())}
                                        className="form-control form-control-lg text-center fw-bold border-warning"
                                        placeholder="GHELLO"
                                        maxLength="8"
                                        style={{ fontSize: '2rem', letterSpacing: '0.3em' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-6">
                            <label className="form-label fw-bold">
                                <Move className="me-2" size={16} />
                                Spacing
                            </label>
                            <div className="btn-group w-100">
                                <button
                                    onClick={() => setSpacing('own')}
                                    className={`btn ${spacing === 'own' ? 'btn-warning text-dark' : 'btn-outline-warning'}`}
                                >
                                    OWN
                                </button>
                                <button
                                    onClick={() => setSpacing('legal')}
                                    className={`btn ${spacing === 'legal' ? 'btn-warning text-dark' : 'btn-outline-warning'}`}
                                >
                                    LEGAL
                                </button>
                            </div>
                        </div>

                        <div className="col-6">
                            <label className="form-label fw-bold">Preview</label>
                            <div className="form-control text-center fw-bold border-warning" style={{ 
                                fontSize: '1rem', 
                                letterSpacing: spacing === 'legal' ? '0.2em' : '0.1em'
                            }}>
                                {displayText}
                            </div>
                        </div>

                        <div className="col-6">
                            <label className="form-label fw-bold">Front Plates</label>
                            <div className="input-group">
                                <button
                                    className="btn btn-outline-warning"
                                    onClick={() => setFrontQuantity(Math.max(0, frontQuantity - 1))}
                                >
                                    <ChevronLeft size={10} />
                                </button>
                                <input
                                    type="number"
                                    className="form-control text-center fw-bold border-warning"
                                    value={frontQuantity}
                                    onChange={(e) => setFrontQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                                    min="0" max="10"
                                />
                                <button
                                    className="btn btn-outline-warning"
                                    onClick={() => setFrontQuantity(Math.min(10, frontQuantity + 1))}
                                >
                                    <ChevronRight size={10} />
                                </button>
                            </div>
                        </div>

                        <div className="col-6">
                            <label className="form-label fw-bold">Rear Plates</label>
                            <div className="input-group">
                                <button
                                    className="btn btn-outline-warning"
                                    onClick={() => setRearQuantity(Math.max(0, rearQuantity - 1))}
                                >
                                    <ChevronLeft size={10} />
                                </button>
                                <input
                                    type="number"
                                    className="form-control text-center fw-bold border-warning"
                                    value={rearQuantity}
                                    onChange={(e) => setRearQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                                    min="0" max="10"
                                />
                                <button
                                    className="btn btn-outline-warning"
                                    onClick={() => setRearQuantity(Math.min(10, rearQuantity + 1))}
                                >
                                    <ChevronRight size={10} />
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'style':
                return (
                    <div className="row g-4">
                        <div className="col-12" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {plateStyles.map((style) => (
                                <div key={style.key} className="mb-3">
                                    <div
                                        onClick={() => setSelectedStyle(style.key)}
                                        className={`card border-2 cursor-pointer ${
                                            selectedStyle === style.key ? 'border-warning bg-warning bg-opacity-25' : 'border-light'
                                        }`}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="card-body p-3">
                                            <div className="d-flex align-items-center">
                                                <div 
                                                    className="me-3 d-flex align-items-center justify-content-center text-white fw-bold position-relative"
                                                    style={{
                                                        width: '80px',
                                                        height: '40px',
                                                        background: style.outlineColor 
                                                            ? `linear-gradient(45deg, ${style.outlineColor}, ${style.outlineColor}aa)` 
                                                            : 'linear-gradient(45deg, #666, #999)',
                                                        borderRadius: '4px',
                                                        fontSize: '8px',
                                                        color: style.outlineColor === '#FFFFFF' || style.outlineColor === '#FFD700' ? '#000' : '#fff'
                                                    }}
                                                >
                                                    <span className="position-absolute top-0 start-0 bg-warning text-dark px-1" 
                                                          style={{ fontSize: '6px', borderRadius: '0 0 4px 0' }}>
                                                        NOT ROAD LEGAL
                                                    </span>
                                                    {getStylePreviewImage(style.key)}
                                                </div>
                                                
                                                <div className="flex-grow-1">
                                                    <h6 className="fw-bold mb-1">{style.label}</h6>
                                                    <p className="small text-muted mb-0">
                                                        Pair: £{(style.price * 2).toFixed(2)} / Single: £{style.price}
                                                    </p>
                                                    <p className="small text-primary mb-0">Thickness: {style.thickness === 0.15 ? '3mm' : '5mm'}</p>
                                                    {style.outlineColor && (
                                                        <p className="small text-success mb-0">
                                                            Includes {style.outlineColor} outline
                                                        </p>
                                                    )}
                                                </div>
                                                
                                                {selectedStyle === style.key && (
                                                    <div className="bg-success text-white px-2 py-1 rounded me-2">
                                                        <span className="small fw-bold">SELECTED ✓</span>
                                                    </div>
                                                )}
                                                
                                                <button className="btn btn-sm btn-outline-secondary">?</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="col-12">
                            <label className="form-label fw-bold">Font Color</label>
                            <select
                                className="form-select form-select-lg border-warning"
                                value={selectedFontColor}
                                onChange={(e) => setSelectedFontColor(e.target.value)}
                            >
                                {colorOptions.map((color) => (
                                    <option key={color.color} value={color.color}>
                                        {color.name} - £{color.price}
                                    </option>
                                ))}
                            </select>
                            {selectedFontColor === 'custom' && (
                                <input
                                    type="color"
                                    value={customColor}
                                    onChange={(e) => setCustomColor(e.target.value)}
                                    className="form-control form-control-color mt-2 w-100"
                                    style={{ height: '50px' }}
                                />
                            )}
                        </div>
                    </div>
                );

            case 'size':
                return (
                    <div className="row g-3">
                        <div className="col-12">
                            <h6 className="fw-bold mb-3">Select Plate Size</h6>
                            {sizeOptions.map((size) => (
                                <div key={size.key} className="mb-2">
                                    <div
                                        onClick={() => setSelectedSize(size.key)}
                                        className={`card border-2 cursor-pointer ${
                                            selectedSize === size.key ? 'border-warning bg-warning bg-opacity-25' : 'border-light'
                                        }`}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="card-body p-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h6 className="fw-bold mb-1">{size.label}</h6>
                                                    <p className="small text-muted mb-0">{size.dimensions}</p>
                                                    <p className="small text-info mb-0">{size.description}</p>
                                                </div>
                                                <span className="fw-bold fs-5">£{size.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'border':
                return (
                    <div className="row g-3">
                        <div className="col-12">
                            <h6 className="fw-bold mb-3">Select Plate Frame Border</h6>
                            <p className="small text-muted mb-3">
                                <i className="fas fa-info-circle me-1"></i>
                                Frame borders surround the entire plate with margins, like a picture frame
                            </p>
                            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {borderOptions.map((border) => (
                                    <div key={border.key} className="mb-2">
                                        <div
                                            onClick={() => setSelectedBorder(border.key)}
                                            className={`card border-2 cursor-pointer ${
                                                selectedBorder === border.key ? 'border-warning bg-warning bg-opacity-25' : 'border-light'
                                            }`}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="card-body p-3">
                                                <div className="d-flex align-items-center">
                                                    {/* Frame Border Preview */}
                                                    <div 
                                                        className="me-3 position-relative d-flex align-items-center justify-content-center"
                                                        style={{ 
                                                            width: '80px',
                                                            height: '40px',
                                                            backgroundColor: border.key === 'none' ? '#FFD700' : border.color,
                                                            borderRadius: '4px',
                                                            border: border.key === 'none' ? 'none' : `3px solid ${border.color}`
                                                        }}
                                                    >
                                                        {/* Inner plate area */}
                                                        <div
                                                            className="position-relative d-flex align-items-center justify-content-center fw-bold"
                                                            style={{
                                                                width: border.key === 'none' ? '80px' : '64px',
                                                                height: border.key === 'none' ? '40px' : '28px',
                                                                backgroundColor: '#FFD700',
                                                                borderRadius: '2px',
                                                                fontSize: '8px',
                                                                color: '#000',
                                                                boxShadow: border.type === 'crystal' ? 
                                                                          `0 0 8px ${border.color}66` : 
                                                                          border.type === '4d' ? 
                                                                          `2px 2px 4px ${border.color}88` : 'none'
                                                            }}
                                                        >
                                                            ABC
                                                        </div>
                                                        
                                                        {/* Crystal glow effect */}
                                                        {border.type === 'crystal' && border.key !== 'none' && (
                                                            <div 
                                                                className="position-absolute"
                                                                style={{
                                                                    width: '90px',
                                                                    height: '50px',
                                                                    borderRadius: '6px',
                                                                    background: `radial-gradient(ellipse, ${border.color}20, transparent)`,
                                                                    filter: 'blur(3px)',
                                                                    zIndex: -1
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                    
                                                    <div className="flex-grow-1">
                                                        <h6 className="fw-bold mb-1">{border.name}</h6>
                                                        <p className="small text-muted mb-0">
                                                            {border.price === 0 ? 'Free' : `+£${border.price}`}
                                                        </p>
                                                        <div className="d-flex gap-1 mt-1 flex-wrap">
                                                            {border.borderWidth && border.key !== 'none' && (
                                                                <span className="badge bg-primary">{border.borderWidth}mm Frame</span>
                                                            )}
                                                            {border.type === 'crystal' && (
                                                                <span className="badge bg-info text-dark">CRYSTAL FRAME</span>
                                                            )}
                                                            {border.type === '4d' && (
                                                                <span className="badge bg-success">4D RAISED FRAME</span>
                                                            )}
                                                            {border.type === 'printed' && (
                                                                <span className="badge bg-secondary">PRINTED FRAME</span>
                                                            )}
                                                            {border.type === 'standard' && (
                                                                <span className="badge bg-light text-dark">STANDARD FRAME</span>
                                                            )}
                                                            {border.key !== 'none' && (
                                                                <span className="badge bg-warning text-dark">NOT ROAD LEGAL</span>
                                                            )}
                                                        </div>
                                                        
                                                        {/* Color indicator for non-transparent borders */}
                                                        {border.key !== 'none' && border.color !== 'transparent' && (
                                                            <div className="d-flex align-items-center mt-1">
                                                                <div 
                                                                    className="me-2 border rounded"
                                                                    style={{
                                                                        width: '12px',
                                                                        height: '12px',
                                                                        backgroundColor: border.color,
                                                                        border: border.color === '#FFFFFF' ? '1px solid #ccc' : 'none'
                                                                    }}
                                                                />
                                                                <span className="small text-muted">
                                                                    Frame Color: {border.color}
                                                                </span>
                                                            </div>
                                                        )}
                                                        
                                                        {/* Special descriptions for different border types */}
                                                        {border.type === '4d' && (
                                                            <p className="small text-info mb-0 mt-1">
                                                                <i className="fas fa-info-circle me-1"></i>
                                                                Physical raised frame around entire plate with {border.borderWidth}mm thickness
                                                            </p>
                                                        )}
                                                        {border.type === 'crystal' && (
                                                            <p className="small text-info mb-0 mt-1">
                                                                <i className="fas fa-gem me-1"></i>
                                                                Luminous crystal frame with glow effects around plate edges
                                                            </p>
                                                        )}
                                                        {border.type === 'printed' && (
                                                            <p className="small text-info mb-0 mt-1">
                                                                <i className="fas fa-print me-1"></i>
                                                                High-quality printed frame border around plate
                                                            </p>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Selection indicator */}
                                                    {selectedBorder === border.key && (
                                                        <div className="bg-success text-white px-2 py-1 rounded">
                                                            <span className="small fw-bold">SELECTED ✓</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Frame Border Information Panel */}
                            {selectedBorder !== 'none' && (
                                <div className="mt-4 p-3 bg-light rounded">
                                    <h6 className="fw-bold text-primary mb-2">
                                        <i className="fas fa-info-circle me-2"></i>
                                        Frame Border Information
                                    </h6>
                                    <div className="row g-3">
                                        <div className="col-6">
                                            <div className="small">
                                                <strong>Frame Type:</strong> {selectedBorderObj?.type?.toUpperCase() || 'Standard'}
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="small">
                                                <strong>Frame Width:</strong> {selectedBorderObj?.borderWidth || 2}mm
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="small">
                                                <strong>Frame Color:</strong> {selectedBorderObj?.color || 'None'}
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="small">
                                                <strong>Price:</strong> {selectedBorderObj?.price === 0 ? 'Free' : `£${selectedBorderObj?.price}`}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Special features description */}
                                    <div className="mt-2">
                                        {selectedBorderObj?.type === '4d' && (
                                            <div className="alert alert-info py-2 mb-0 small">
                                                <strong>4D Frame Feature:</strong> This creates a physical raised frame around the entire plate edges with actual {selectedBorderObj.borderWidth}mm thickness. The frame surrounds the whole plate like a picture frame with margins.
                                            </div>
                                        )}
                                        {selectedBorderObj?.type === 'crystal' && (
                                            <div className="alert alert-info py-2 mb-0 small">
                                                <strong>Crystal Frame Effect:</strong> Features luminous glow effects around the plate edges with crystal-like reflection properties for premium frame appearance.
                                            </div>
                                        )}
                                        {selectedBorderObj?.type === 'printed' && (
                                            <div className="alert alert-info py-2 mb-0 small">
                                                <strong>Printed Frame Border:</strong> High-resolution printed frame design applied around the plate edges with margins.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'badge':
                return (
                    <div className="row g-4">
                        <div className="col-12">
                            <label className="form-label fw-bold">Country Badge</label>
                            <select
                                className="form-select form-select-lg border-warning"
                                value={selectedCountry}
                                onChange={(e) => handleCountryChange(e.target.value)}
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
                                <label className="form-label fw-bold">Flag Options</label>
                                <div className="row g-2">
                                    {flagOptions[selectedCountry].map((flag) => (
                                        <div key={flag.key} className="col-6">
                                            <div
                                                className={`card cursor-pointer border-2 h-100 ${
                                                    selectedFlag === flag.key ? 'border-warning bg-warning bg-opacity-25' : 'border-light'
                                                }`}
                                                onClick={() => setSelectedFlag(flag.key)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="card-body p-3 text-center">
                                                    <div className="mb-2">
                                                        <div className="mx-auto border rounded overflow-hidden" style={{
                                                            width: '50px',
                                                            height: '30px'
                                                        }}>
                                                            {flag.flagImage ? (
                                                                <img
                                                                    src={flag.flagImage}
                                                                    alt={flag.name}
                                                                    className="w-100 h-100"
                                                                    style={{ objectFit: 'cover' }}
                                                                />
                                                            ) : (
                                                                <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-light">
                                                                    <Camera size={16} className="text-muted" />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="small fw-bold mb-1">{flag.text || flag.name}</div>
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
                                    <label className="form-label fw-bold">Upload Custom Flag Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="form-control form-control-lg border-warning"
                                    />
                                    <div className="form-text">Max size: 2MB. Recommended: 240x144px</div>
                                    {customFlagImage && (
                                        <div className="mt-3 text-center">
                                            <img
                                                src={customFlagImage}
                                                alt="Custom Flag Preview"
                                                className="border border-warning rounded"
                                                style={{ maxWidth: '120px', maxHeight: '72px' }}
                                            />
                                            <div className="small text-success mt-1 fw-bold">
                                                Image uploaded successfully
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
                                        className="form-control form-control-lg border-warning"
                                        placeholder="Enter flag text (max 6 chars)"
                                        maxLength="6"
                                    />
                                </div>
                            </>
                        )}

                        {selectedFlag !== 'none' && (
                            <div className="col-12">
                                <div className="row g-3">
                                    <div className="col-6">
                                        <label className="form-label fw-bold">Badge Position</label>
                                        <select
                                            className="form-select border-warning"
                                            value={badgePosition}
                                            onChange={(e) => setBadgePosition(e.target.value)}
                                        >
                                            <option value="left">Left Side</option>
                                            <option value="right">Right Side</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label fw-bold">Badge Text Color</label>
                                        <select
                                            className="form-select border-warning"
                                            value={customTextColor}
                                            onChange={(e) => setCustomTextColor(e.target.value)}
                                        >
                                            <option value="#FFFFFF">White</option>
                                            <option value="#000000">Black</option>
                                            <option value="#FFD700">Gold</option>
                                            <option value="#FF0000">Red</option>
                                            <option value="#0000FF">Blue</option>
                                            <option value="#008000">Green</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-bold">Badge Background Color</label>
                                        <div className="row g-2">
                                            <div className="col-8">
                                                <select
                                                    className="form-select border-warning"
                                                    value={badgeBorderColor}
                                                    onChange={(e) => setBadgeBorderColor(e.target.value)}
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
                                                    className="form-control form-control-color w-100"
                                                    style={{ height: '42px' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 'finish':
                return (
                    <div className="row g-3">
                        <div className="col-12">
                            <h6 className="fw-bold mb-3">Plate Finish</h6>
                            {finishOptions.map((finish) => (
                                <div key={finish.key} className="mb-2">
                                    <div
                                        onClick={() => setSelectedFinish(finish.key)}
                                        className={`card border-2 cursor-pointer ${
                                            selectedFinish === finish.key ? 'border-warning bg-warning bg-opacity-25' : 'border-light'
                                        }`}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="card-body p-3">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <h6 className="fw-bold mb-1">{finish.label}</h6>
                                                    <p className="small text-muted mb-0">{finish.description}</p>
                                                </div>
                                                <span className="fw-bold fs-5">
                                                    {finish.price === 0 ? 'Free' : `£${finish.price}`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="text-center py-5">
                        <h5 className="text-muted">Select a tab to configure your plates</h5>
                    </div>
                );
        }
    };

    return (
        <div className="container-fluid bg-light min-vh-100">
            {/* Top Tab Navigation */}
            <div className="row g-0 bg-white shadow-sm">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <div key={tab.id} className="col">
                            <button
                                onClick={() => setActiveTab(tab.id)}
                                className={`btn w-100 py-3 fw-bold border-0 ${
                                    activeTab === tab.id 
                                        ? 'bg-warning text-dark' 
                                        : 'bg-light text-dark hover:bg-gray-100'
                                }`}
                                style={{ borderRadius: 0 }}
                            >
                                <div className="d-flex flex-column align-items-center">
                                    <Icon size={20} className="mb-1" />
                                    <span className="small">{tab.label}</span>
                                </div>
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Main Content */}
            <div className="row g-3 p-3">
                {/* Left Panel - Controls */}
                <div className="col-lg-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-warning text-dark fw-bold">
                            <h5 className="mb-0">{activeTab.toUpperCase()}</h5>
                        </div>
                        <div className="card-body">
                            {renderTabContent()}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="d-flex gap-2 mt-3">
                        <button
                            onClick={prevTab}
                            disabled={activeTab === 'start'}
                            className="btn btn-outline-secondary flex-fill"
                        >
                            <ChevronLeft size={16} className="me-1" />
                            BACK
                        </button>
                        <button
                            onClick={nextTab}
                            disabled={activeTab === 'finish'}
                            className="btn btn-warning text-dark flex-fill fw-bold"
                        >
                            NEXT
                            <ChevronRight size={16} className="ms-1" />
                        </button>
                    </div>
                </div>

                {/* Center Panel - Preview */}
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-warning text-dark fw-bold">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <Eye className="me-2" size={20} />
                                    <span>Live Preview</span>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            {/* Preview Type Tabs */}
                            <div className="row g-0 mb-3">
                                <div className="col-6">
                                    <button
                                        onClick={() => setPreviewType('front')}
                                        className={`btn w-100 fw-bold ${
                                            previewType === 'front' ? 'btn-warning text-dark' : 'btn-outline-secondary'
                                        }`}
                                    >
                                        FRONT PREVIEW
                                    </button>
                                </div>
                                <div className="col-6">
                                    <button
                                        onClick={() => setPreviewType('rear')}
                                        className={`btn w-100 fw-bold ${
                                            previewType === 'rear' ? 'btn-warning text-dark' : 'btn-outline-secondary'
                                        }`}
                                    >
                                        REAR PREVIEW
                                    </button>
                                </div>
                            </div>

                            {/* 3D Plate Preview */}
                            <PlatePreview
                                text={displayText}
                                plateType={previewType}
                                plateStyle={selectedStyle}
                                fontColor={finalFontColor}
                                borderStyle={selectedBorder}
                                customFontColor={selectedFontColor === 'custom' ? customColor : null}
                                countryBadge={selectedFlag}
                                selectedCountry={selectedCountry}
                                badgePosition={badgePosition}
                                badgePlacement={badgePlacement}
                                badgeBorderColor={badgeBorderColor}
                                customFlagText={customFlagText}
                                customFlagImage={customFlagImage}
                                customTextColor={customTextColor}
                                selectedSize={selectedSize}
                            />

                            <p className="text-center text-muted small mt-3">
                                Click & drag to rotate. Use mouse wheel to zoom. Frame borders surround the entire plate.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Order Summary */}
                <div className="col-lg-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-warning text-dark fw-bold">
                            <div className="d-flex align-items-center">
                                <ShoppingCart className="me-2" size={20} />
                                <span>Your Plates</span>
                            </div>
                        </div>
                        <div className="card-body">
                            {/* Order Details */}
                            <div className="mb-4">
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="fw-bold">Registration:</span>
                                    <span className="fw-bold text-primary">{plateText}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Spacing:</span>
                                    <span>{spacing === 'own' ? "As I've typed" : 'Legal spacing'}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Quantity:</span>
                                    <span className="fw-bold">{frontQuantity} Front + {rearQuantity} Rear</span>
                                </div>
                            </div>

                            {/* Dynamic Features List */}
                            <div className="mb-4">
                                <h6 className="fw-bold mb-3 text-primary">Selected Features:</h6>
                                {getSelectedFeatures().map((feature, index) => (
                                    <div key={index} className={`d-flex justify-content-between align-items-center mb-2 p-2 rounded ${
                                        feature.type === 'base' ? 'bg-primary bg-opacity-10 border border-primary border-opacity-25' : 'bg-light'
                                    }`}>
                                        <div className="d-flex align-items-center">
                                            {feature.type === 'base' && (
                                                <span className="badge bg-primary me-2">BASE</span>
                                            )}
                                            {feature.type === 'addon' && (
                                                <span className="badge bg-success me-2">+</span>
                                            )}
                                            <span className={feature.type === 'base' ? 'fw-bold' : ''}>{feature.name}</span>
                                        </div>
                                        <span className={`fw-bold ${feature.type === 'base' ? 'text-primary' : 'text-success'}`}>
                                            £{feature.price.toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Price Breakdown */}
                            <div className="bg-warning bg-opacity-25 p-3 rounded mb-3">
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Base price per plate:</span>
                                    <span className="fw-bold">£{basePrice.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Total plates:</span>
                                    <span className="fw-bold">{totalQuantity}</span>
                                </div>
                                <hr className="my-2" />
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="fw-bold fs-5">TOTAL:</span>
                                    <span className="fw-bold fs-4 text-success">£{totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Legal Checkbox */}
                            <div className="form-check mb-3">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    id="legalCheck"
                                    checked={isLegalCheckboxChecked}
                                    onChange={(e) => setIsLegalCheckboxChecked(e.target.checked)}
                                />
                                <label className="form-check-label small" htmlFor="legalCheck">
                                    I understand that my plates may not be road legal and that they may be sold as show plates
                                </label>
                            </div>

                            {/* Success Message */}
                            {showSuccessMessage && (
                                <div className="alert alert-success mb-3" role="alert">
                                    <CheckCircle className="me-2" size={20} />
                                    <strong>Added to cart!</strong> Your plate has been added successfully.
                                </div>
                            )}

                            {/* Add to Basket */}
                            <button 
                                className={`btn btn-lg fw-bold w-100 text-white mb-3 ${
                                    isLegalCheckboxChecked ? 'btn-success' : 'btn-secondary'
                                }`}
                                onClick={handleAddToCart}
                                disabled={!isLegalCheckboxChecked}
                                style={{
                                    opacity: isLegalCheckboxChecked ? 1 : 0.6,
                                    cursor: isLegalCheckboxChecked ? 'pointer' : 'not-allowed',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <ShoppingCart className="me-2" size={20} />
                                {isLegalCheckboxChecked ? (
                                    <>ADD TO BASKET - £{totalPrice.toFixed(2)}</>
                                ) : (
                                    <>PLEASE ACCEPT TERMS ABOVE</>
                                )}
                            </button>

                            {/* Cart Link */}
                            {cartItemCount > 0 && (
                                <div className="text-center mb-3">
                                    <button 
                                        className="btn btn-outline-warning"
                                        onClick={goToCart}
                                    >
                                        View Cart ({cartItemCount} items)
                                    </button>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="row g-2">
                                <div className="col-4">
                                    <button className="btn btn-outline-primary btn-sm w-100">Save</button>
                                </div>
                                <div className="col-4">
                                    <button className="btn btn-outline-info btn-sm w-100">Share</button>
                                </div>
                                <div className="col-4">
                                    <button onClick={resetAll} className="btn btn-outline-secondary btn-sm w-100">
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlateBuilder;


// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import PlatePreview from './PlatePreview';
// import { ChevronLeft, ChevronRight, Car, ShoppingCart, Eye, Move, Camera, Palette, Flag, Star, CheckCircle } from 'lucide-react';
// import { 
//     plateStyles, 
//     thicknessOptions, 
//     colorOptions, 
//     shadowOptions, 
//     borderOptions, 
//     countryOptions, 
//     flagOptions,
//     sizeOptions,
//     finishOptions
// } from '../../config/PlateJson';
// import { addToCart, getCartItemCount } from '../Cart/cartUtils';
// import { useConfigurations } from '../../components/hooks/useConfigurations';

// const PlateBuilder = () => {
//     // Load configurations from API
//     const { configurations, loading: configLoading, error: configError, refetch } = useConfigurations();
    
//     // Current active tab and preview type
//     const [activeTab, setActiveTab] = useState('style');
//     const [previewType, setPreviewType] = useState('front');
//     const [cartItemCount, setCartItemCount] = useState(0);
//     const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    
//     const location = useLocation();
//     const navigate = useNavigate();

//     // State management - all plate configuration
//     const [plateText, setPlateText] = useState('REG1234');

//     useEffect(() => {
//         const params = new URLSearchParams(location.search);
//         const reg = params.get('reg');
//         if (reg) {
//             setPlateText(reg);
//         }
        
//         // Load cart count on component mount
//         setCartItemCount(getCartItemCount());
        
//         // Listen for cart updates
//         const handleCartUpdate = (event) => {
//             setCartItemCount(getCartItemCount());
//         };
        
//         window.addEventListener('cartUpdated', handleCartUpdate);
        
//         return () => {
//             window.removeEventListener('cartUpdated', handleCartUpdate);
//         };
//     }, [location.search]);

//     const [spacing, setSpacing] = useState('own');
//     const [selectedStyle, setSelectedStyle] = useState('4d-neon-gel');
//     const [selectedThickness, setSelectedThickness] = useState('5mm');
//     const [selectedFontColor, setSelectedFontColor] = useState('#000000');
//     const [customColor, setCustomColor] = useState('#000000');
//     const [selectedShadow, setSelectedShadow] = useState('none');
//     const [selectedBorder, setSelectedBorder] = useState('orange-krystal');
//     const [selectedCountry, setSelectedCountry] = useState('none');
//     const [selectedFlag, setSelectedFlag] = useState('none');
//     const [badgePosition, setBadgePosition] = useState('left');
//     const [badgeBorderColor, setBadgeBorderColor] = useState('#005EB8');
//     const [customFlagText, setCustomFlagText] = useState('CUSTOM');
//     const [customFlagImage, setCustomFlagImage] = useState(null);
//     const [customTextColor, setCustomTextColor] = useState('#FFFFFF');
//     const [frontQuantity, setFrontQuantity] = useState(1);
//     const [rearQuantity, setRearQuantity] = useState(1);
//     const [outlineColor, setOutlineColor] = useState('#000000');
//     const [selectedSize, setSelectedSize] = useState('18-oblong');
//     const [isLegalCheckboxChecked, setIsLegalCheckboxChecked] = useState(false);

//     // Tab configuration - removed finish tab
//     const tabs = [
//         { id: 'start', label: 'START', icon: Car },
//         { id: 'style', label: 'STYLE', icon: Palette },
//         { id: 'size', label: 'SIZE', icon: Move },
//         { id: 'border', label: 'BORDER', icon: Eye },
//         { id: 'badge', label: 'BADGE', icon: Flag }
//     ];

//     // Loading state for configurations
//     if (configLoading) {
//         return (
//             <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
//                 <div className="text-center">
//                     <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
//                         <span className="visually-hidden">Loading...</span>
//                     </div>
//                     <h4 className="mt-3 text-warning">Loading Plate Configurations...</h4>
//                     <p className="text-muted">Please wait while we fetch the latest pricing and options.</p>
//                 </div>
//             </div>
//         );
//     }
    
//     if (configError) {
//         return (
//             <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
//                 <div className="text-center">
//                     <div className="alert alert-danger shadow-lg" style={{ maxWidth: '500px' }}>
//                         <h4 className="alert-heading">Configuration Error</h4>
//                         <p className="mb-3">{configError}</p>
//                         <div className="d-flex gap-2 justify-content-center">
//                             <button 
//                                 className="btn btn-warning" 
//                                 onClick={refetch}
//                             >
//                                 Retry Loading
//                             </button>
//                             <button 
//                                 className="btn btn-outline-secondary" 
//                                 onClick={() => window.location.reload()}
//                             >
//                                 Refresh Page
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Extract configurations
//     const {
//         plateStyles,
//         thicknessOptions,
//         colorOptions,
//         shadowOptions,
//         borderOptions,
//         countryOptions,
//         flagOptions,
//         sizeOptions,
//         finishOptions
//     } = configurations;

//     // Helper functions for data retrieval
//     const getSelectedOption = (options, selectedId) => options?.find(opt => opt.id === selectedId || opt.key === selectedId) || options?.[0];

//     // Price calculations
//     const selected = getSelectedOption(plateStyles, selectedStyle);
//     const selectedThicknessObj = getSelectedOption(thicknessOptions, selectedThickness);
//     const selectedColorObj = getSelectedOption(colorOptions, selectedFontColor);
//     const selectedShadowObj = getSelectedOption(shadowOptions, selectedShadow);
//     const selectedBorderObj = getSelectedOption(borderOptions, selectedBorder);
//     const selectedFlagObj = flagOptions?.[selectedCountry]?.find((f) => f.key === selectedFlag);
//     const selectedSizeObj = getSelectedOption(sizeOptions, selectedSize);

//     const finalFontColor = selectedFontColor === 'custom' ? customColor : selectedFontColor;
//     const basePrice = (selected?.price || 0) + (selectedThicknessObj?.price || 0) +
//         (selectedColorObj?.price || 0) + (selectedShadowObj?.price || 0) +
//         (selectedBorderObj?.price || 0) + (selectedFlagObj?.price || 0) +
//         (selectedSizeObj?.price || 0);
//     const totalQuantity = frontQuantity + rearQuantity;
//     const totalPrice = basePrice * totalQuantity;
//     const displayText = spacing === 'legal' ? plateText.split('').join(' ') : plateText;

//     // Function to get plate style image - using local file path
//     const getPlateStyleImage = (styleKey) => {
//         // Map style keys to local image paths
//         const styleImages = {
//             'standard': '/images/4D-3mm-Main-Image-Pair-Web-v2-white-640x360.jpg',
//             '3d': '/images/4D-3mm-Main-Image-Pair-Web-v2-white-640x360.jpg',
//             '4d': '/images/4D-3mm-Main-Image-Pair-Web-v2-white-640x360.jpg',
//             '4d-neon-gel': '/images/4D-3mm-Main-Image-Pair-Web-v2-white-640x360.jpg',
//             '5d-gel': '/images/4D-3mm-Main-Image-Pair-Web-v2-white-640x360.jpg',
//             'laser': '/images/4D-3mm-Main-Image-Pair-Web-v2-white-640x360.jpg',
//             'carbon-fiber': '/images/4D-3mm-Main-Image-Pair-Web-v2-white-640x360.jpg'
//         };
        
//         return styleImages[styleKey] || '/images/plates/default-plate.jpg';
//     };

//     // Dynamic order summary function
//     const getSelectedFeatures = () => {
//         const features = [];
        
//         // Always show plate style (base item)
//         features.push({
//             name: selected?.label || 'Standard Plate',
//             price: selected?.price || 0,
//             type: 'base'
//         });

//         // Show size if not default
//         if (selectedSize !== '18-oblong' && selectedSizeObj?.price > 0) {
//             features.push({
//                 name: `Size: ${selectedSizeObj?.label}`,
//                 price: selectedSizeObj.price,
//                 type: 'addon'
//             });
//         }

//         // Show thickness if not default
//         if (selectedThickness !== '3mm' && selectedThicknessObj?.price > 0) {
//             features.push({
//                 name: `Thickness: ${selectedThicknessObj?.label}`,
//                 price: selectedThicknessObj.price,
//                 type: 'addon'
//             });
//         }

//         // Show font color if has price
//         if (selectedColorObj?.price > 0) {
//             features.push({
//                 name: `Font Color: ${selectedColorObj?.name}`,
//                 price: selectedColorObj.price,
//                 type: 'addon'
//             });
//         }

//         // Show shadow effect if selected
//         if (selectedShadow !== 'none' && selectedShadowObj?.price > 0) {
//             features.push({
//                 name: `Effect: ${selectedShadowObj?.name}`,
//                 price: selectedShadowObj.price,
//                 type: 'addon'
//             });
//         }

//         // Show border if selected
//         if (selectedBorder !== 'none' && selectedBorderObj?.price > 0) {
//             features.push({
//                 name: `Border: ${selectedBorderObj?.name}`,
//                 price: selectedBorderObj.price,
//                 type: 'addon'
//             });
//         }

//         // Show badge if selected
//         if (selectedFlag !== 'none' && selectedFlagObj?.price > 0) {
//             features.push({
//                 name: `Badge: ${selectedFlagObj?.name}`,
//                 price: selectedFlagObj.price,
//                 type: 'addon'
//             });
//         }

//         return features;
//     };

//     // Add to cart function
//     const handleAddToCart = () => {
//         try {
//             // Check if legal checkbox is checked
//             if (!isLegalCheckboxChecked) {
//                 alert('Please confirm that you understand the plates may not be road legal by checking the checkbox.');
//                 return;
//             }

//             // Check if at least one quantity is selected
//             if (frontQuantity === 0 && rearQuantity === 0) {
//                 alert('Please select at least one front or rear plate.');
//                 return;
//             }

//             let addedItems = 0;
//             let totalSuccess = true;
            
//             // Add Front Plates if quantity > 0
//             if (frontQuantity > 0) {
//                 const frontPlateData = {
//                     text: plateText,
//                     plateType: 'front',
//                     styleLabel: selected?.label || 'Standard Plate',
//                     plateStyle: selectedStyle,
//                     thickness: selectedThickness,
//                     price: basePrice,
//                     quantity: frontQuantity,
//                     fontColor: finalFontColor,
//                     shadowEffect: selectedShadow,
//                     borderStyle: selectedBorder,
//                     selectedSize: selectedSize,
//                     sizeLabel: selectedSizeObj?.label || 'Standard Oblong',
//                     countryBadge: selectedFlag,
//                     selectedCountry: selectedCountry,
//                     badgePosition: badgePosition,
//                     customTextColor: customTextColor,
//                     outlineColor: outlineColor,
//                     roadLegal: 'No',
//                     spacing: spacing === 'legal' ? 'Legal spacing' : "As I've typed"
//                 };

//                 const frontResult = addToCart(frontPlateData);
//                 if (frontResult.success) {
//                     addedItems += frontQuantity;
//                 } else {
//                     totalSuccess = false;
//                 }
//             }

//             // Add Rear Plates if quantity > 0
//             if (rearQuantity > 0) {
//                 const rearPlateData = {
//                     text: plateText,
//                     plateType: 'rear',
//                     styleLabel: selected?.label || 'Standard Plate',
//                     plateStyle: selectedStyle,
//                     thickness: selectedThickness,
//                     price: basePrice,
//                     quantity: rearQuantity,
//                     fontColor: finalFontColor,
//                     shadowEffect: selectedShadow,
//                     borderStyle: selectedBorder,
//                     selectedSize: selectedSize,
//                     sizeLabel: selectedSizeObj?.label || 'Standard Oblong',
//                     countryBadge: selectedFlag,
//                     selectedCountry: selectedCountry,
//                     badgePosition: badgePosition,
//                     customTextColor: customTextColor,
//                     outlineColor: outlineColor,
//                     roadLegal: 'No',
//                     spacing: spacing === 'legal' ? 'Legal spacing' : "As I've typed"
//                 };

//                 const rearResult = addToCart(rearPlateData);
//                 if (rearResult.success) {
//                     addedItems += rearQuantity;
//                 } else {
//                     totalSuccess = false;
//                 }
//             }

//             // Show appropriate message
//             if (addedItems > 0) {
//                 setShowSuccessMessage(true);
//                 setTimeout(() => setShowSuccessMessage(false), 3000);
                
//                 if (!totalSuccess) {
//                     alert('Some items were added to cart, but there were errors with others.');
//                 }
//             } else {
//                 alert('Please select at least one front or rear plate.');
//             }
            
//         } catch (error) {
//             console.error('Error adding to cart:', error);
//             alert('An error occurred while adding to cart');
//         }
//     };

//     // Navigate to cart page
//     const goToCart = () => {
//         navigate('/cart');
//     };

//     // Event handlers
//     const handleImageUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             if (file.size > 2 * 1024 * 1024) {
//                 alert('File size must be less than 2MB');
//                 return;
//             }
//             if (!file.type.startsWith('image/')) {
//                 alert('Please select an image file');
//                 return;
//             }
//             const reader = new FileReader();
//             reader.onload = (e) => setCustomFlagImage(e.target.result);
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleCountryChange = (countryKey) => {
//         setSelectedCountry(countryKey);
//         setSelectedFlag('none');
//         setCustomFlagImage(null);
//     };

//     const resetAll = () => {
//         setPlateText('GHELLO');
//         setSpacing('own');
//         setSelectedStyle('4d-neon-gel');
//         setSelectedThickness('5mm');
//         setSelectedFontColor('#000000');
//         setCustomColor('#000000');
//         setSelectedShadow('none');
//         setSelectedBorder('orange-krystal');
//         setSelectedCountry('none');
//         setSelectedFlag('none');
//         setBadgePosition('left');
//         setBadgeBorderColor('#005EB8');
//         setCustomFlagText('CUSTOM');
//         setCustomFlagImage(null);
//         setCustomTextColor('#FFFFFF');
//         setFrontQuantity(1);
//         setRearQuantity(1);
//         setOutlineColor('#000000');
//         setSelectedSize('18-oblong');
//         setIsLegalCheckboxChecked(false);
//     };

//     // Navigation functions
//     const nextTab = () => {
//         const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
//         if (currentIndex < tabs.length - 1) {
//             setActiveTab(tabs[currentIndex + 1].id);
//         }
//     };

//     const prevTab = () => {
//         const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
//         if (currentIndex > 0) {
//             setActiveTab(tabs[currentIndex - 1].id);
//         }
//     };

//     // Tab content rendering
//     const renderTabContent = () => {
//         switch (activeTab) {
//             case 'start':
//                 return (
//                     <div className="row g-4">
//                         <div className="col-12">
//                             <div className="card border-warning">
//                                 <div className="card-header bg-warning text-dark fw-bold">
//                                     <Car className="me-2" size={20} />
//                                     Enter Your Plate Text
//                                 </div>
//                                 <div className="card-body">
//                                     <input
//                                         type="text"
//                                         value={plateText}
//                                         onChange={(e) => setPlateText(e.target.value.toUpperCase())}
//                                         className="form-control form-control-lg text-center fw-bold border-warning"
//                                         placeholder="GHELLO"
//                                         maxLength="8"
//                                         style={{ fontSize: '2rem', letterSpacing: '0.3em' }}
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="col-6">
//                             <label className="form-label fw-bold">
//                                 <Move className="me-2" size={16} />
//                                 Spacing
//                             </label>
//                             <div className="btn-group w-100">
//                                 <button
//                                     onClick={() => setSpacing('own')}
//                                     className={`btn ${spacing === 'own' ? 'btn-warning text-dark' : 'btn-outline-warning'}`}
//                                 >
//                                     OWN
//                                 </button>
//                                 <button
//                                     onClick={() => setSpacing('legal')}
//                                     className={`btn ${spacing === 'legal' ? 'btn-warning text-dark' : 'btn-outline-warning'}`}
//                                 >
//                                     LEGAL
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="col-6">
//                             <label className="form-label fw-bold">Preview</label>
//                             <div className="form-control text-center fw-bold border-warning" style={{ 
//                                 fontSize: '1rem', 
//                                 letterSpacing: spacing === 'legal' ? '0.2em' : '0.1em'
//                             }}>
//                                 {displayText}
//                             </div>
//                         </div>

//                         <div className="col-6">
//                             <label className="form-label fw-bold">Front Plates</label>
//                             <div className="input-group">
//                                 <button
//                                     className="btn btn-outline-warning"
//                                     onClick={() => setFrontQuantity(Math.max(0, frontQuantity - 1))}
//                                 >
//                                     <ChevronLeft size={10} />
//                                 </button>
//                                 <input
//                                     type="number"
//                                     className="form-control text-center fw-bold border-warning"
//                                     value={frontQuantity}
//                                     onChange={(e) => setFrontQuantity(Math.max(0, parseInt(e.target.value) || 0))}
//                                     min="0" max="10"
//                                 />
//                                 <button
//                                     className="btn btn-outline-warning"
//                                     onClick={() => setFrontQuantity(Math.min(10, frontQuantity + 1))}
//                                 >
//                                     <ChevronRight size={10} />
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="col-6">
//                             <label className="form-label fw-bold">Rear Plates</label>
//                             <div className="input-group">
//                                 <button
//                                     className="btn btn-outline-warning"
//                                     onClick={() => setRearQuantity(Math.max(0, rearQuantity - 1))}
//                                 >
//                                     <ChevronLeft size={10} />
//                                 </button>
//                                 <input
//                                     type="number"
//                                     className="form-control text-center fw-bold border-warning"
//                                     value={rearQuantity}
//                                     onChange={(e) => setRearQuantity(Math.max(0, parseInt(e.target.value) || 0))}
//                                     min="0" max="10"
//                                 />
//                                 <button
//                                     className="btn btn-outline-warning"
//                                     onClick={() => setRearQuantity(Math.min(10, rearQuantity + 1))}
//                                 >
//                                     <ChevronRight size={10} />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 );

//             case 'style':
//                 return (
//                     <div className="row g-4">
//                         <div className="col-12" style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                             {plateStyles?.slice(0, 8).map((style) => (
//                                 <div key={style.key} className="mb-3">
//                                     <div
//                                         onClick={() => setSelectedStyle(style.key)}
//                                         className={`card border-2 cursor-pointer ${
//                                             selectedStyle === style.key ? 'border-warning bg-warning bg-opacity-25' : 'border-light'
//                                         }`}
//                                         style={{ cursor: 'pointer' }}
//                                     >
//                                         <div className="card-body p-3">
//                                             <div className="d-flex align-items-center">
//                                                 {/* Plate Style Image */}
//                                                 <div className="me-3 position-relative">
//                                                     <img
//                                                         src={getPlateStyleImage(style.key)}
//                                                         alt={style.label}
//                                                         className="rounded border"
//                                                         style={{
//                                                             width: '80px',
//                                                             height: '40px',
//                                                             objectFit: 'cover'
//                                                         }}
//                                                         onError={(e) => {
//                                                             // Fallback to gradient if image not found
//                                                             e.target.style.display = 'none';
//                                                             e.target.nextSibling.style.display = 'flex';
//                                                         }}
//                                                     />
//                                                     <div 
//                                                         className="d-none align-items-center justify-content-center text-white fw-bold position-relative"
//                                                         style={{
//                                                             width: '80px',
//                                                             height: '40px',
//                                                             background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
//                                                             borderRadius: '4px',
//                                                             fontSize: '10px'
//                                                         }}
//                                                     >
//                                                         {style.key.toUpperCase()}
//                                                     </div>
//                                                     <span className="position-absolute top-0 start-0 bg-warning text-dark px-1" 
//                                                           style={{ fontSize: '6px', borderRadius: '0 0 4px 0' }}>
//                                                         NOT ROAD LEGAL
//                                                     </span>
//                                                 </div>
                                                
//                                                 <div className="flex-grow-1">
//                                                     <h6 className="fw-bold mb-1">{style.label}</h6>
//                                                     <p className="small text-muted mb-0">
//                                                         Pair: £{(style.price * 2).toFixed(2)} / Single: £{style.price}
//                                                     </p>
//                                                     <p className="small text-primary mb-0">Font: {style.font}</p>
//                                                 </div>
                                                
//                                                 {selectedStyle === style.key && (
//                                                     <div className="bg-success text-white px-2 py-1 rounded me-2">
//                                                         <span className="small fw-bold">SELECTED ✓</span>
//                                                     </div>
//                                                 )}
                                                
//                                                 <button className="btn btn-sm btn-outline-secondary">?</button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="col-12">
//                             <label className="form-label fw-bold">Font Color</label>
//                             <select
//                                 className="form-select form-select-lg border-warning"
//                                 value={selectedFontColor}
//                                 onChange={(e) => setSelectedFontColor(e.target.value)}
//                             >
//                                 {colorOptions?.map((color) => (
//                                     <option key={color.color} value={color.color}>
//                                         {color.name} - £{color.price}
//                                     </option>
//                                 ))}
//                             </select>
//                             {selectedFontColor === 'custom' && (
//                                 <input
//                                     type="color"
//                                     value={customColor}
//                                     onChange={(e) => setCustomColor(e.target.value)}
//                                     className="form-control form-control-color mt-2 w-100"
//                                     style={{ height: '50px' }}
//                                 />
//                             )}
//                         </div>

//                         <div className="col-6">
//                             <label className="form-label fw-bold">Thickness</label>
//                             <select
//                                 className="form-select border-warning"
//                                 value={selectedThickness}
//                                 onChange={(e) => setSelectedThickness(e.target.value)}
//                             >
//                                 {thicknessOptions?.map((thickness) => (
//                                     <option key={thickness.key} value={thickness.key}>
//                                         {thickness.label} +£{thickness.price}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div className="col-6">
//                             <label className="form-label fw-bold">Text Effects</label>
//                             <select
//                                 className="form-select border-warning"
//                                 value={selectedShadow}
//                                 onChange={(e) => setSelectedShadow(e.target.value)}
//                             >
//                                 {shadowOptions?.map((shadow) => (
//                                     <option key={shadow.key} value={shadow.key}>
//                                         {shadow.name} - £{shadow.price}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {selectedShadow === 'colored-outline' && (
//                             <div className="col-12">
//                                 <label className="form-label fw-bold">Outline Color</label>
//                                 <div className="row g-2">
//                                     <div className="col-3">
//                                         <input
//                                             type="color"
//                                             value={outlineColor}
//                                             onChange={(e) => setOutlineColor(e.target.value)}
//                                             className="form-control form-control-color w-100"
//                                             style={{ height: '40px' }}
//                                         />
//                                     </div>
//                                     <div className="col-9">
//                                         <select
//                                             className="form-select"
//                                             value={outlineColor}
//                                             onChange={(e) => setOutlineColor(e.target.value)}
//                                         >
//                                             <option value="#000000">Black</option>
//                                             <option value="#FFFFFF">White</option>
//                                             <option value="#FF0000">Red</option>
//                                             <option value="#0000FF">Blue</option>
//                                             <option value="#00FF00">Green</option>
//                                             <option value="#FFD700">Gold</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 );

//             case 'size':
//                 return (
//                     <div className="row g-3">
//                         <div className="col-12">
//                             <h6 className="fw-bold mb-3">Select Plate Size</h6>
//                             {sizeOptions?.map((size) => (
//                                 <div key={size.key} className="mb-2">
//                                     <div
//                                         onClick={() => setSelectedSize(size.key)}
//                                         className={`card border-2 cursor-pointer ${
//                                             selectedSize === size.key ? 'border-warning bg-warning bg-opacity-25' : 'border-light'
//                                         }`}
//                                         style={{ cursor: 'pointer' }}
//                                     >
//                                         <div className="card-body p-3">
//                                             <div className="d-flex justify-content-between align-items-center">
//                                                 <div>
//                                                     <h6 className="fw-bold mb-1">{size.label}</h6>
//                                                     <p className="small text-muted mb-0">{size.dimensions}</p>
//                                                     <p className="small text-info mb-0">{size.description}</p>
//                                                 </div>
//                                                 <span className="fw-bold fs-5">£{size.price}</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 );

//             case 'border':
//                 return (
//                     <div className="row g-3">
//                         <div className="col-12">
//                             <h6 className="fw-bold mb-3">Select Border Style</h6>
//                             {borderOptions?.slice(0, 6).map((border) => (
//                                 <div key={border.key} className="mb-2">
//                                     <div
//                                         onClick={() => setSelectedBorder(border.key)}
//                                         className={`card border-2 cursor-pointer ${
//                                             selectedBorder === border.key ? 'border-warning bg-warning bg-opacity-25' : 'border-light'
//                                         }`}
//                                         style={{ cursor: 'pointer' }}
//                                     >
//                                         <div className="card-body p-3">
//                                             <div className="d-flex align-items-center">
//                                                 <div 
//                                                     className="me-3 border rounded"
//                                                     style={{ 
//                                                         width: '60px',
//                                                         height: '30px',
//                                                         backgroundColor: '#FFD700',
//                                                         borderColor: border.color === 'transparent' ? '#ccc' : border.color,
//                                                         borderWidth: border.color === 'transparent' ? '1px' : '3px'
//                                                     }}
//                                                 />
//                                                 <div className="flex-grow-1">
//                                                     <h6 className="fw-bold mb-1">{border.name}</h6>
//                                                     <p className="small text-muted mb-0">
//                                                         {border.price === 0 ? 'Free' : `+£${border.price}`}
//                                                     </p>
//                                                 </div>
//                                                 {border.key !== 'none' && (
//                                                     <span className="badge bg-warning text-dark">NOT ROAD LEGAL</span>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 );

//             case 'badge':
//                 return (
//                     <div className="row g-4">
//                         <div className="col-12">
//                             <label className="form-label fw-bold">Country Badge</label>
//                             <select
//                                 className="form-select form-select-lg border-warning"
//                                 value={selectedCountry}
//                                 onChange={(e) => handleCountryChange(e.target.value)}
//                             >
//                                 {countryOptions?.map((country) => (
//                                     <option key={country.key} value={country.key}>
//                                         {country.name}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {selectedCountry !== 'none' && flagOptions?.[selectedCountry] && (
//                             <div className="col-12">
//                                 <label className="form-label fw-bold">Flag Options</label>
//                                 <div className="row g-2">
//                                     {flagOptions[selectedCountry].map((flag) => (
//                                         <div key={flag.key} className="col-6">
//                                             <div
//                                                 className={`card cursor-pointer border-2 h-100 ${
//                                                     selectedFlag === flag.key ? 'border-warning bg-warning bg-opacity-25' : 'border-light'
//                                                 }`}
//                                                 onClick={() => setSelectedFlag(flag.key)}
//                                                 style={{ cursor: 'pointer' }}
//                                             >
//                                                 <div className="card-body p-3 text-center">
//                                                     <div className="mb-2">
//                                                         <div className="mx-auto border rounded overflow-hidden" style={{
//                                                             width: '50px',
//                                                             height: '30px'
//                                                         }}>
//                                                             {flag.flagImage ? (
//                                                                 <img
//                                                                     src={flag.flagImage}
//                                                                     alt={flag.name}
//                                                                     className="w-100 h-100"
//                                                                     style={{ objectFit: 'cover' }}
//                                                                 />
//                                                             ) : (
//                                                                 <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-light">
//                                                                     <Camera size={16} className="text-muted" />
//                                                                 </div>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                     <div className="small fw-bold mb-1">{flag.text || flag.name}</div>
//                                                     <div className="small text-muted">£{flag.price}</div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {selectedFlag === 'custom-upload' && (
//                             <>
//                                 <div className="col-12">
//                                     <label className="form-label fw-bold">Upload Custom Flag Image</label>
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={handleImageUpload}
//                                         className="form-control form-control-lg border-warning"
//                                     />
//                                     <div className="form-text">Max size: 2MB. Recommended: 240x144px</div>
//                                     {customFlagImage && (
//                                         <div className="mt-3 text-center">
//                                             <img
//                                                 src={customFlagImage}
//                                                 alt="Custom Flag Preview"
//                                                 className="border border-warning rounded"
//                                                 style={{ maxWidth: '120px', maxHeight: '72px' }}
//                                             />
//                                             <div className="small text-success mt-1 fw-bold">
//                                                 Image uploaded successfully
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>

//                                 <div className="col-12">
//                                     <label className="form-label fw-bold">Custom Flag Text</label>
//                                     <input
//                                         type="text"
//                                         value={customFlagText}
//                                         onChange={(e) => setCustomFlagText(e.target.value.toUpperCase())}
//                                         className="form-control form-control-lg border-warning"
//                                         placeholder="Enter flag text (max 6 chars)"
//                                         maxLength="6"
//                                     />
//                                 </div>
//                             </>
//                         )}

//                         {selectedFlag !== 'none' && (
//                             <div className="col-12">
//                                 <div className="row g-3">
//                                     <div className="col-6">
//                                         <label className="form-label fw-bold">Badge Position</label>
//                                         <select
//                                             className="form-select border-warning"
//                                             value={badgePosition}
//                                             onChange={(e) => setBadgePosition(e.target.value)}
//                                         >
//                                             <option value="left">Left Side</option>
//                                             <option value="right">Right Side</option>
//                                         </select>
//                                     </div>
//                                     <div className="col-6">
//                                         <label className="form-label fw-bold">Badge Text Color</label>
//                                         <select
//                                             className="form-select border-warning"
//                                             value={customTextColor}
//                                             onChange={(e) => setCustomTextColor(e.target.value)}
//                                         >
//                                             <option value="#FFFFFF">White</option>
//                                             <option value="#000000">Black</option>
//                                             <option value="#FFD700">Gold</option>
//                                             <option value="#FF0000">Red</option>
//                                             <option value="#0000FF">Blue</option>
//                                             <option value="#008000">Green</option>
//                                         </select>
//                                     </div>
//                                     <div className="col-12">
//                                         <label className="form-label fw-bold">Badge Background Color</label>
//                                         <div className="row g-2">
//                                             <div className="col-8">
//                                                 <select
//                                                     className="form-select border-warning"
//                                                     value={badgeBorderColor}
//                                                     onChange={(e) => setBadgeBorderColor(e.target.value)}
//                                                 >
//                                                     <option value="#005EB8">Royal Blue (UK Standard)</option>
//                                                     <option value="#003478">Navy Blue</option>
//                                                     <option value="#1f4e79">Dark Blue</option>
//                                                     <option value="#000000">Black</option>
//                                                     <option value="#8B4513">Bronze</option>
//                                                     <option value="#FF0000">Red</option>
//                                                     <option value="#006600">Green</option>
//                                                 </select>
//                                             </div>
//                                             <div className="col-4">
//                                                 <input
//                                                     type="color"
//                                                     value={badgeBorderColor}
//                                                     onChange={(e) => setBadgeBorderColor(e.target.value)}
//                                                     className="form-control form-control-color w-100"
//                                                     style={{ height: '42px' }}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 );

//             case 'finish':
//                 return (
//                     <div className="row g-3">
//                         <div className="col-12">
//                             <h6 className="fw-bold mb-3">Plate Finish</h6>
//                             {finishOptions.map((finish) => (
//                                 <div key={finish.key} className="mb-2">
//                                     <div
//                                         onClick={() => setSelectedFinish(finish.key)}
//                                         className={`card border-2 cursor-pointer ${
//                                             selectedFinish === finish.key ? 'border-warning bg-warning bg-opacity-25' : 'border-light'
//                                         }`}
//                                         style={{ cursor: 'pointer' }}
//                                     >
//                                         <div className="card-body p-3">
//                                             <div className="d-flex justify-content-between align-items-start">
//                                                 <div>
//                                                     <h6 className="fw-bold mb-1">{finish.label}</h6>
//                                                     <p className="small text-muted mb-0">{finish.description}</p>
//                                                 </div>
//                                                 <span className="fw-bold fs-5">
//                                                     {finish.price === 0 ? 'Free' : `£${finish.price}`}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 );

//             default:
//                 return (
//                     <div className="text-center py-5">
//                         <h5 className="text-muted">Select a tab to configure your plates</h5>
//                     </div>
//                 );
//         }
//     };

//     return (
//         <div className="container-fluid bg-light min-vh-100">
//             {/* Data Status Indicator */}
//             <div className="position-fixed bottom-0 end-0 m-3" style={{ zIndex: 1000 }}>
//                 <div className="badge bg-success">
//                     <span className="me-1">●</span>
//                     Live Pricing
//                 </div>
//             </div>

//             {/* Top Tab Navigation */}
//             <div className="row g-0 bg-white shadow-sm">
//                 {tabs.map((tab) => {
//                     const Icon = tab.icon;
//                     return (
//                         <div key={tab.id} className="col">
//                             <button
//                                 onClick={() => setActiveTab(tab.id)}
//                                 className={`btn w-100 py-3 fw-bold border-0 ${
//                                     activeTab === tab.id 
//                                         ? 'bg-warning text-dark' 
//                                         : 'bg-light text-dark hover:bg-gray-100'
//                                 }`}
//                                 style={{ borderRadius: 0 }}
//                             >
//                                 <div className="d-flex flex-column align-items-center">
//                                     <Icon size={20} className="mb-1" />
//                                     <span className="small">{tab.label}</span>
//                                 </div>
//                             </button>
//                         </div>
//                     );
//                 })}
//             </div>

//             {/* Main Content */}
//             <div className="row g-3 p-3">
//                 {/* Left Panel - Controls */}
//                 <div className="col-lg-3">
//                     <div className="card border-0 shadow-sm">
//                         <div className="card-header bg-warning text-dark fw-bold">
//                             <h5 className="mb-0">{activeTab.toUpperCase()}</h5>
//                         </div>
//                         <div className="card-body">
//                             {renderTabContent()}
//                         </div>
//                     </div>

//                     {/* Navigation Buttons */}
//                     <div className="d-flex gap-2 mt-3">
//                         <button
//                             onClick={prevTab}
//                             disabled={activeTab === 'start'}
//                             className="btn btn-outline-secondary flex-fill"
//                         >
//                             <ChevronLeft size={16} className="me-1" />
//                             BACK
//                         </button>
//                         <button
//                             onClick={nextTab}
//                             disabled={activeTab === 'badge'} 
//                             className="btn btn-warning text-dark flex-fill fw-bold"
//                         >
//                             NEXT
//                             <ChevronRight size={16} className="ms-1" />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Center Panel - Preview */}
//                 <div className="col-lg-6">
//                     <div className="card border-0 shadow-sm">
//                         <div className="card-header bg-warning text-dark fw-bold">
//                             <div className="d-flex align-items-center justify-content-between">
//                                 <div className="d-flex align-items-center">
//                                     <Eye className="me-2" size={20} />
//                                     <span>Live Preview</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="card-body">
//                             {/* Preview Type Tabs */}
//                             <div className="row g-0 mb-3">
//                                 <div className="col-6">
//                                     <button
//                                         onClick={() => setPreviewType('front')}
//                                         className={`btn w-100 fw-bold ${
//                                             previewType === 'front' ? 'btn-warning text-dark' : 'btn-outline-secondary'
//                                         }`}
//                                     >
//                                         FRONT PREVIEW
//                                     </button>
//                                 </div>
//                                 <div className="col-6">
//                                     <button
//                                         onClick={() => setPreviewType('rear')}
//                                         className={`btn w-100 fw-bold ${
//                                             previewType === 'rear' ? 'btn-warning text-dark' : 'btn-outline-secondary'
//                                         }`}
//                                     >
//                                         REAR PREVIEW
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* 3D Plate Preview */}
//                             <PlatePreview
//                                 text={displayText}
//                                 plateType={previewType}
//                                 plateStyle={selectedStyle}
//                                 thickness={selectedThicknessObj?.value || 0.25}
//                                 fontColor={finalFontColor}
//                                 shadowEffect={selectedShadow}
//                                 borderStyle={selectedBorder}
//                                 customFontColor={selectedFontColor === 'custom' ? customColor : null}
//                                 countryBadge={selectedFlag}
//                                 selectedCountry={selectedCountry}
//                                 badgePosition={badgePosition}
//                                 badgeBorderColor={badgeBorderColor}
//                                 customFlagText={customFlagText}
//                                 customFlagImage={customFlagImage}
//                                 customTextColor={customTextColor}
//                                 outlineColor={outlineColor}
//                                 selectedSize={selectedSize}
//                             />

//                             <p className="text-center text-muted small mt-3">
//                                 Click & drag to rotate. Use mouse wheel to zoom. This is a preview only.
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right Panel - Order Summary */}
//                 <div className="col-lg-3">
//                     <div className="card border-0 shadow-sm">
//                         <div className="card-header bg-warning text-dark fw-bold">
//                             <div className="d-flex align-items-center">
//                                 <ShoppingCart className="me-2" size={20} />
//                                 <span>Your Plates</span>
//                             </div>
//                         </div>
//                         <div className="card-body">
//                             {/* Order Details */}
//                             <div className="mb-4">
//                                 <div className="d-flex justify-content-between mb-2">
//                                     <span className="fw-bold">Registration:</span>
//                                     <span className="fw-bold text-primary">{plateText}</span>
//                                 </div>
//                                 <div className="d-flex justify-content-between mb-2">
//                                     <span>Spacing:</span>
//                                     <span>{spacing === 'own' ? "As I've typed" : 'Legal spacing'}</span>
//                                 </div>
//                                 <div className="d-flex justify-content-between">
//                                     <span>Quantity:</span>
//                                     <span className="fw-bold">{frontQuantity} Front + {rearQuantity} Rear</span>
//                                 </div>
//                             </div>

//                             {/* Dynamic Features List */}
//                             <div className="mb-4">
//                                 <h6 className="fw-bold mb-3 text-primary">Selected Features:</h6>
//                                 {getSelectedFeatures().map((feature, index) => (
//                                     <div key={index} className={`d-flex justify-content-between align-items-center mb-2 p-2 rounded ${
//                                         feature.type === 'base' ? 'bg-primary bg-opacity-10 border border-primary border-opacity-25' : 'bg-light'
//                                     }`}>
//                                         <div className="d-flex align-items-center">
//                                             {feature.type === 'base' && (
//                                                 <span className="badge bg-primary me-2">BASE</span>
//                                             )}
//                                             {feature.type === 'addon' && (
//                                                 <span className="badge bg-success me-2">+</span>
//                                             )}
//                                             <span className={feature.type === 'base' ? 'fw-bold' : ''}>{feature.name}</span>
//                                         </div>
//                                         <span className={`fw-bold ${feature.type === 'base' ? 'text-primary' : 'text-success'}`}>
//                                             £{feature.price.toFixed(2)}
//                                         </span>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Price Breakdown */}
//                             <div className="bg-warning bg-opacity-25 p-3 rounded mb-3">
//                                 <div className="d-flex justify-content-between mb-2">
//                                     <span>Base price per plate:</span>
//                                     <span className="fw-bold">£{basePrice.toFixed(2)}</span>
//                                 </div>
//                                 <div className="d-flex justify-content-between mb-2">
//                                     <span>Total plates:</span>
//                                     <span className="fw-bold">{totalQuantity}</span>
//                                 </div>
//                                 <hr className="my-2" />
//                                 <div className="d-flex justify-content-between align-items-center">
//                                     <span className="fw-bold fs-5">TOTAL:</span>
//                                     <span className="fw-bold fs-4 text-success">£{totalPrice.toFixed(2)}</span>
//                                 </div>
//                             </div>

//                             {/* Complete Order Summary - Shows all details when on last tab */}
//                             {activeTab === 'badge' && (
//                                 <div className="bg-light p-3 rounded mb-3">
//                                     <h6 className="fw-bold mb-3 text-dark">Complete Order Summary</h6>
//                                     <div className="small">
//                                         <div className="row mb-1">
//                                             <div className="col-6"><strong>Text:</strong></div>
//                                             <div className="col-6">{plateText}</div>
//                                         </div>
//                                         <div className="row mb-1">
//                                             <div className="col-6"><strong>Style:</strong></div>
//                                             <div className="col-6">{selected?.label}</div>
//                                         </div>
//                                         <div className="row mb-1">
//                                             <div className="col-6"><strong>Size:</strong></div>
//                                             <div className="col-6">{selectedSizeObj?.label}</div>
//                                         </div>
//                                         <div className="row mb-1">
//                                             <div className="col-6"><strong>Thickness:</strong></div>
//                                             <div className="col-6">{selectedThicknessObj?.label}</div>
//                                         </div>
//                                         <div className="row mb-1">
//                                             <div className="col-6"><strong>Font Color:</strong></div>
//                                             <div className="col-6">{selectedColorObj?.name}</div>
//                                         </div>
//                                         {selectedShadow !== 'none' && (
//                                             <div className="row mb-1">
//                                                 <div className="col-6"><strong>Effect:</strong></div>
//                                                 <div className="col-6">{selectedShadowObj?.name}</div>
//                                             </div>
//                                         )}
//                                         {selectedBorder !== 'none' && (
//                                             <div className="row mb-1">
//                                                 <div className="col-6"><strong>Border:</strong></div>
//                                                 <div className="col-6">{selectedBorderObj?.name}</div>
//                                             </div>
//                                         )}
//                                         {selectedFlag !== 'none' && (
//                                             <div className="row mb-1">
//                                                 <div className="col-6"><strong>Badge:</strong></div>
//                                                 <div className="col-6">{selectedFlagObj?.name} ({badgePosition})</div>
//                                             </div>
//                                         )}
//                                         <div className="row mb-1">
//                                             <div className="col-6"><strong>Spacing:</strong></div>
//                                             <div className="col-6">{spacing === 'own' ? "As typed" : 'Legal'}</div>
//                                         </div>
//                                         <div className="row">
//                                             <div className="col-6"><strong>Quantity:</strong></div>
//                                             <div className="col-6">{frontQuantity}F + {rearQuantity}R</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Legal Checkbox */}
//                             <div className="form-check mb-3">
//                                 <input 
//                                     type="checkbox" 
//                                     className="form-check-input" 
//                                     id="legalCheck"
//                                     checked={isLegalCheckboxChecked}
//                                     onChange={(e) => setIsLegalCheckboxChecked(e.target.checked)}
//                                 />
//                                 <label className="form-check-label small" htmlFor="legalCheck">
//                                     I understand that my plates may not be road legal and that they may be sold as show plates
//                                 </label>
//                             </div>

//                             {/* Success Message */}
//                             {showSuccessMessage && (
//                                 <div className="alert alert-success mb-3" role="alert">
//                                     <CheckCircle className="me-2" size={20} />
//                                     <strong>Added to cart!</strong> Your plate has been added successfully.
//                                 </div>
//                             )}

//                             {/* Add to Basket */}
//                             <button 
//                                 className={`btn btn-lg fw-bold w-100 text-white mb-3 ${
//                                     isLegalCheckboxChecked ? 'btn-success' : 'btn-secondary'
//                                 }`}
//                                 onClick={handleAddToCart}
//                                 disabled={!isLegalCheckboxChecked}
//                                 style={{
//                                     opacity: isLegalCheckboxChecked ? 1 : 0.6,
//                                     cursor: isLegalCheckboxChecked ? 'pointer' : 'not-allowed',
//                                     transition: 'all 0.3s ease'
//                                 }}
//                             >
//                                 <ShoppingCart className="me-2" size={20} />
//                                 {isLegalCheckboxChecked ? (
//                                     <>ADD TO BASKET - £{totalPrice.toFixed(2)}</>
//                                 ) : (
//                                     <>PLEASE ACCEPT TERMS ABOVE</>
//                                 )}
//                             </button>

//                             {/* Cart Link */}
//                             {cartItemCount > 0 && (
//                                 <div className="text-center mb-3">
//                                     <button 
//                                         className="btn btn-outline-warning"
//                                         onClick={goToCart}
//                                     >
//                                         View Cart ({cartItemCount} items)
//                                     </button>
//                                 </div>
//                             )}

//                             {/* Action Buttons */}
//                             <div className="row g-2">
//                                 <div className="col-4">
//                                     <button className="btn btn-outline-primary btn-sm w-100">Save</button>
//                                 </div>
//                                 <div className="col-4">
//                                     <button className="btn btn-outline-info btn-sm w-100">Share</button>
//                                 </div>
//                                 <div className="col-4">
//                                     <button onClick={resetAll} className="btn btn-outline-secondary btn-sm w-100">
//                                         Reset
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PlateBuilder;