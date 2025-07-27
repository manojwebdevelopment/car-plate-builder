// Import at the top
import ColorfulLoader from './ColorfulLoader';

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlatePreview from "./PlatePreview";
import {
  ChevronLeft,
  ChevronRight,
  Car,
  ShoppingCart,
  Eye,
  Move,
  Camera,
  Palette,
  Flag,
  Star,
  CheckCircle,
} from "lucide-react";
import {
  plateStyles,
  thicknessOptions,
  colorOptions,
  shadowOptions,
  borderOptions,
  countryOptions,
  flagOptions,
  sizeOptions,
  finishOptions,
} from "../../config/PlateJson";
// import { addToCart, getCartItemCount, getCartItemCountAsync } from "../Cart/cartUtils";
import { useCart } from "../../context/CartContext";

const PlateBuilder = () => {

// Add these state variables with your other useState declarations
const [isLoading, setIsLoading] = useState(true);
const [isTransitioning, setIsTransitioning] = useState(false);
  // Current active tab and preview type

  const [activeTab, setActiveTab] = useState("start");
  const [previewType, setPreviewType] = useState("front");
  const { addToCart: addToCartContext, getCartItemCount } = useCart();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  // NEW: Check if registration is passed in state
  const registration = location.state?.registration || "";
  // If registration is passed, set it as the initial plate text
  const initialPlateText = registration;
  // State for plate text

  // State management - all plate configuration
  const [plateText, setPlateText] = useState(initialPlateText || "YOUR REG");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const reg = params.get("reg");
    if (reg) {
      setPlateText(reg);
    }

    // Smooth loading sequence
    const loadingTimer = setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }, 1500);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, [location.search]);

  const [spacing, setSpacing] = useState("own");
  const [selectedStyle, setSelectedStyle] = useState("standard");
  const [selectedFontColor, setSelectedFontColor] = useState("#3D3D3D");
  const [customColor, setCustomColor] = useState("#000000");
  const [selectedBorder, setSelectedBorder] = useState("none");
  const [selectedCountry, setSelectedCountry] = useState("none");
  const [selectedFlag, setSelectedFlag] = useState("none");
  const [badgePosition, setBadgePosition] = useState("left");
  const [badgePlacement, setBadgePlacement] = useState("outside");
  const [badgeBorderColor, setBadgeBorderColor] = useState("#005EB8");
  const [customFlagText, setCustomFlagText] = useState("CUSTOM");
  const [customFlagImage, setCustomFlagImage] = useState(null);
  const [customTextColor, setCustomTextColor] = useState("#FFFFFF");
  const [frontQuantity, setFrontQuantity] = useState(1);
  const [rearQuantity, setRearQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("18-oblong");
  const [selectedFinish, setSelectedFinish] = useState("standard");
  const [isLegalCheckboxChecked, setIsLegalCheckboxChecked] = useState(false);

  // NEW: Toggle states for front and rear plates
  const [wantFrontPlate, setWantFrontPlate] = useState(true);
  const [wantRearPlate, setWantRearPlate] = useState(true);

  // Tab configuration
  const tabs = [
    { id: "start", label: "START", icon: Car },
    { id: "style", label: "STYLE", icon: Palette },
    { id: "size", label: "SIZE", icon: Move },
    { id: "border", label: "BORDER", icon: Eye },
    { id: "badge", label: "BADGE", icon: Flag },
    { id: "finish", label: "FINISH", icon: Star },
  ];

  // Helper functions for data retrieval
  const getSelectedOption = (options, selectedId) =>
    options.find((opt) => opt.id === selectedId || opt.key === selectedId) ||
    options[0];

  // Price calculations
  const selected = getSelectedOption(plateStyles, selectedStyle);
  const selectedColorObj = getSelectedOption(colorOptions, selectedFontColor);
  const selectedBorderObj = getSelectedOption(borderOptions, selectedBorder);
  const selectedFlagObj = flagOptions[selectedCountry]?.find(
    (f) => f.key === selectedFlag
  );
  const selectedSizeObj = getSelectedOption(sizeOptions, selectedSize);
  const selectedFinishObj = getSelectedOption(finishOptions, selectedFinish);

  const finalFontColor =
    selectedFontColor === "custom" ? customColor : selectedFontColor;
  const basePrice =
    (selected?.price || 0) +
    (selectedColorObj?.price || 0) +
    (selectedBorderObj?.price || 0) +
    (selectedFlagObj?.price || 0) +
    (selectedSizeObj?.price || 0) +
    (selectedFinishObj?.price || 0);

  // UPDATED: Calculate quantities based on toggles
  const actualFrontQuantity = wantFrontPlate ? frontQuantity : 0;
  const actualRearQuantity = wantRearPlate ? rearQuantity : 0;
  const totalQuantity = actualFrontQuantity + actualRearQuantity;
  const totalPrice = basePrice * totalQuantity;
  const displayText =
    spacing === "legal" ? plateText.split("").join(" ") : plateText;

  // NEW: Character validation function
  const validatePlateText = (text) => {
    const textWithoutSpaces = text.replace(/\s/g, "");
    if (textWithoutSpaces.length > 7) {
      return "Plate registration too long - max 7 characters (only 2 spaces allowed)";
    }
    return "";
  };

  const handlePlateTextChange = (value) => {
    const upperValue = value.toUpperCase();
    const textWithoutSpaces = upperValue.replace(/\s/g, "");

    // Only allow up to 7 characters (excluding spaces)
    if (textWithoutSpaces.length <= 7) {
      setPlateText(upperValue);
    }
    // If more than 7 characters, truncate to 7 characters
    else {
      const truncated = textWithoutSpaces.substring(0, 7);
      setPlateText(truncated);
    }
  };

  // UPDATED: Handle toggle changes with auto-activation (prevent both being false)
  const handleFrontToggle = (value) => {
    setWantFrontPlate(value);

    if (!value) {
      setFrontQuantity(0);
      // If turning off front, automatically turn on rear
      if (!wantRearPlate) {
        setWantRearPlate(true);
        setRearQuantity(1);
      }
    } else {
      setFrontQuantity(1);
    }
  };

  const handleRearToggle = (value) => {
    setWantRearPlate(value);

    if (!value) {
      setRearQuantity(0);
      // If turning off rear, automatically turn on front
      if (!wantFrontPlate) {
        setWantFrontPlate(true);
        setFrontQuantity(1);
      }
    } else {
      setRearQuantity(1);
    }
  };

  // UPDATED: Set preview type based on what's enabled
  useEffect(() => {
    if (wantFrontPlate && !wantRearPlate) {
      setPreviewType("front");
    } else if (!wantFrontPlate && wantRearPlate) {
      setPreviewType("rear");
    }
    // If both are enabled, keep current preview type
  }, [wantFrontPlate, wantRearPlate]);

  // Dynamic order summary function
  const getSelectedFeatures = () => {
    const features = [];

    // Always show plate style (base item)
    features.push({
      name: selected?.label || "Standard Plate",
      price: selected?.price || 0,
      type: "base",
    });

    // Show size if not default
    if (selectedSize !== "18-oblong" && selectedSizeObj?.price > 0) {
      features.push({
        name: `Size: ${selectedSizeObj?.label}`,
        price: selectedSizeObj.price,
        type: "addon",
      });
    }

    // Show font color if has price
    if (selectedColorObj?.price > 0) {
      features.push({
        name: `Font Color: ${selectedColorObj?.name}`,
        price: selectedColorObj.price,
        type: "addon",
      });
    }

    // Show border if selected
    if (selectedBorder !== "none" && selectedBorderObj?.price > 0) {
      features.push({
        name: `Frame Border: ${selectedBorderObj?.name}`,
        price: selectedBorderObj.price,
        type: "addon",
      });
    }

    // Show badge if selected
    if (selectedFlag !== "none" && selectedFlagObj?.price > 0) {
      features.push({
        name: `Badge: ${selectedFlagObj?.name}`,
        price: selectedFlagObj.price,
        type: "addon",
      });
    }

    // Show finish if not default
    if (selectedFinish !== "standard" && selectedFinishObj?.price > 0) {
      features.push({
        name: `Finish: ${selectedFinishObj?.label}`,
        price: selectedFinishObj.price,
        type: "addon",
      });
    }

    return features;
  };

  const handleAddToCart = async () => {
    try {
      // Check if legal checkbox is checked
      if (!isLegalCheckboxChecked) {
        alert(
          "Please confirm that you understand the plates may not be road legal by checking the checkbox."
        );
        return;
      }

      // Check if at least one plate type is wanted
      if (!wantFrontPlate && !wantRearPlate) {
        alert("Please select at least front or rear plate option.");
        return;
      }

      let addedItems = 0;
      let totalSuccess = true;

      // Add Front Plates if wanted and quantity > 0
      if (wantFrontPlate && frontQuantity > 0) {
        // Create enhanced plate item with all required fields (same as original cartUtils)
        const frontPlateItem = {
          id: `plate_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: 'plate',
          name: `${selected?.label || 'Custom'} Number Plate`,
          side: 'FRONT',
          registration: plateText,
          roadLegal: 'No',
          spacing: spacing === 'legal' ? 'Legal spacing' : 'As I\'ve typed',
          
          // Size data
          size: selectedSize,
          sizeLabel: selectedSizeObj?.label || 'Standard Size',
          sizeDimensions: selectedSizeObj?.dimensions || '520mm x 111mm',
          sizePrice: selectedSizeObj?.price || 0,
          
          // Style data
          plateStyle: selectedStyle,
          styleLabel: selected?.label || 'Standard Plate',
          stylePrice: selected?.price || 0,
          
          // Thickness data
          thickness: '3mm',
          thicknessLabel: '3mm Standard',
          thicknessValue: 3,
          thicknessPrice: 0,
          
          // Color data
          fontColor: finalFontColor,
          fontColorName: selectedColorObj?.name || 'Black',
          fontColorPrice: selectedColorObj?.price || 0,
          customTextColor: finalFontColor,
          
          // Border data
          borderStyle: selectedBorder,
          borderName: selectedBorderObj?.name || 'No Border',
          borderType: selectedBorderObj?.type || 'none',
          borderColor: selectedBorderObj?.color || '',
          borderWidth: selectedBorderObj?.borderWidth || 0,
          borderPrice: selectedBorderObj?.price || 0,
          
          // Shadow effect data
          shadowEffect: 'none',
          shadowName: 'No Effect',
          shadowDescription: '',
          shadowPrice: 0,
          
          // Badge data
          countryBadge: selectedFlag,
          selectedCountry: selectedCountry,
          badgeName: selectedFlagObj?.name || 'No Badge',
          badgePosition: badgePosition,
          flagImage: selectedFlagObj?.flagImage || '',
          badgePrice: selectedFlagObj?.price || 0,
          
          // Finish data
          finish: selectedFinish,
          finishLabel: selectedFinishObj?.label || 'Standard Finish',
          finishDescription: selectedFinishObj?.description || '',
          finishPrice: selectedFinishObj?.price || 0,
          
          // Additional fields
          displayText: spacing === 'legal' ? plateText.split('').join(' ') : plateText,
          font: 'Charles Wright',
          fontSize: 79,
          
          // Pricing
          price: basePrice,
          quantity: frontQuantity,
          subtotal: basePrice * frontQuantity,
          
          addedAt: new Date().toISOString()
        };

        const frontResult = await addToCartContext(frontPlateItem);
        if (frontResult.success) {
          addedItems += frontQuantity;
        } else {
          totalSuccess = false;
        }
      }

      // Add Rear Plates if wanted and quantity > 0
      if (wantRearPlate && rearQuantity > 0) {
        // Small delay to ensure different IDs
        await new Promise(resolve => setTimeout(resolve, 10));
        
        const rearPlateItem = {
          id: `plate_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: 'plate',
          name: `${selected?.label || 'Custom'} Number Plate`,
          side: 'REAR',
          registration: plateText,
          roadLegal: 'No',
          spacing: spacing === 'legal' ? 'Legal spacing' : 'As I\'ve typed',
          
          // Size data
          size: selectedSize,
          sizeLabel: selectedSizeObj?.label || 'Standard Size',
          sizeDimensions: selectedSizeObj?.dimensions || '520mm x 111mm',
          sizePrice: selectedSizeObj?.price || 0,
          
          // Style data
          plateStyle: selectedStyle,
          styleLabel: selected?.label || 'Standard Plate',
          stylePrice: selected?.price || 0,
          
          // Thickness data
          thickness: '3mm',
          thicknessLabel: '3mm Standard',
          thicknessValue: 3,
          thicknessPrice: 0,
          
          // Color data
          fontColor: finalFontColor,
          fontColorName: selectedColorObj?.name || 'Black',
          fontColorPrice: selectedColorObj?.price || 0,
          customTextColor: finalFontColor,
          
          // Border data
          borderStyle: selectedBorder,
          borderName: selectedBorderObj?.name || 'No Border',
          borderType: selectedBorderObj?.type || 'none',
          borderColor: selectedBorderObj?.color || '',
          borderWidth: selectedBorderObj?.borderWidth || 0,
          borderPrice: selectedBorderObj?.price || 0,
          
          // Shadow effect data
          shadowEffect: 'none',
          shadowName: 'No Effect',
          shadowDescription: '',
          shadowPrice: 0,
          
          // Badge data
          countryBadge: selectedFlag,
          selectedCountry: selectedCountry,
          badgeName: selectedFlagObj?.name || 'No Badge',
          badgePosition: badgePosition,
          flagImage: selectedFlagObj?.flagImage || '',
          badgePrice: selectedFlagObj?.price || 0,
          
          // Finish data
          finish: selectedFinish,
          finishLabel: selectedFinishObj?.label || 'Standard Finish',
          finishDescription: selectedFinishObj?.description || '',
          finishPrice: selectedFinishObj?.price || 0,
          
          // Additional fields
          displayText: spacing === 'legal' ? plateText.split('').join(' ') : plateText,
          font: 'Charles Wright',
          fontSize: 79,
          
          // Pricing
          price: basePrice,
          quantity: rearQuantity,
          subtotal: basePrice * rearQuantity,
          
          addedAt: new Date().toISOString()
        };

        const rearResult = await addToCartContext(rearPlateItem);
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
          alert("Some items were added to cart, but there were errors with others.");
        }
      } else {
        alert("Please select at least one front or rear plate.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("An error occurred while adding to cart");
    }
  };

  const goToCart = () => {
    navigate("/basket");
  };

  // Event handlers
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => setCustomFlagImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCountryChange = (countryKey) => {
    setSelectedCountry(countryKey);
    setSelectedFlag("none");
    setCustomFlagImage(null);
  };

  const resetAll = () => {
    setPlateText("YOUR REG");
    setSpacing("own");
    setSelectedStyle("standard");
    setSelectedFontColor("#000000");
    setCustomColor("#000000");
    setSelectedBorder("none");
    setSelectedCountry("none");
    setSelectedFlag("none");
    setBadgePosition("left");
    setBadgePlacement("outside");
    setBadgeBorderColor("#005EB8");
    setCustomFlagText("CUSTOM");
    setCustomFlagImage(null);
    setCustomTextColor("#FFFFFF");
    setFrontQuantity(1);
    setRearQuantity(1);
    setSelectedSize("18-oblong");
    setSelectedFinish("standard");
    setIsLegalCheckboxChecked(false);
    // Reset toggles
    setWantFrontPlate(true);
    setWantRearPlate(true);
  };

  // Navigation functions
  const nextTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const prevTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  // Tab content rendering
  const renderTabContent = () => {
    switch (activeTab) {
      case "start":
        return (
          <div className="row g-4">
            <div className="col-12">
              <div className="card border-danger">
                <div className="card-header bg-danger text-white fw-bold">
                  <Car className="me-2" size={20} />
                  Enter Your Plate Text
                </div>
                <div className="card-body">
                  <input
                    type="text"
                    value={plateText}
                    onChange={(e) => handlePlateTextChange(e.target.value)}
                    onFocus={(e) => {
                      // Auto-select all text when clicking on default text
                      if (e.target.value === "YOUR REG") {
                        e.target.select();
                      }
                    }}
                    className="form-control form-control-lg text-center fw-bold border-danger"
                    placeholder="YOUR REG"
                    maxLength="10"
                    style={{ fontSize: "1.5rem", letterSpacing: "0.3em" }}
                  />
                  {/* NEW: Character validation message */}
                  {validatePlateText(plateText) && (
                    <div className="alert alert-danger mt-2 mb-0 small">
                      <i className="fas fa-exclamation-triangle me-1"></i>
                      {validatePlateText(plateText)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* NEW: Toggle switches for front and rear plates */}
            <div className="col-12">
              <div className="card border-warning">
                <div className="card-header bg-danger text-white fw-bold">
                  <Move className="me-2" size={20} />
                  Plate Options
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="frontPlateToggle"
                          checked={wantFrontPlate}
                          onChange={(e) => handleFrontToggle(e.target.checked)}
                        />
                        <label
                          className="form-check-label fw-bold"
                          htmlFor="frontPlateToggle"
                        >
                          I want a front plate
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rearPlateToggle"
                          checked={wantRearPlate}
                          onChange={(e) => handleRearToggle(e.target.checked)}
                        />
                        <label
                          className="form-check-label fw-bold"
                          htmlFor="rearPlateToggle"
                        >
                          I want a rear plate
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* UPDATED: Conditional quantity controls */}
            {wantFrontPlate && (
              <div className="col-6">
                <label className="form-label fw-bold">Front Plates</label>
                <div className="input-group">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() =>
                      setFrontQuantity(Math.max(1, frontQuantity - 1))
                    }
                  >
                    <ChevronLeft size={10} />
                  </button>
                  <input
                    type="number"
                    className="form-control text-center fw-bold border-danger"
                    value={frontQuantity}
                    onChange={(e) =>
                      setFrontQuantity(
                        Math.max(1, parseInt(e.target.value) || 1)
                      )
                    }
                    min="1"
                    max="10"
                  />
                  <button
                    className="btn btn-outline-danger"
                    onClick={() =>
                      setFrontQuantity(Math.min(10, frontQuantity + 1))
                    }
                  >
                    <ChevronRight size={10} />
                  </button>
                </div>
              </div>
            )}

            {wantRearPlate && (
              <div className="col-6">
                <label className="form-label fw-bold">Rear Plates</label>
                <div className="input-group">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() =>
                      setRearQuantity(Math.max(1, rearQuantity - 1))
                    }
                  >
                    <ChevronLeft size={10} />
                  </button>
                  <input
                    type="number"
                    className="form-control text-center fw-bold border-danger"
                    value={rearQuantity}
                    onChange={(e) =>
                      setRearQuantity(
                        Math.max(1, parseInt(e.target.value) || 1)
                      )
                    }
                    min="1"
                    max="10"
                  />
                  <button
                    className="btn btn-outline-danger"
                    onClick={() =>
                      setRearQuantity(Math.min(10, rearQuantity + 1))
                    }
                  >
                    <ChevronRight size={10} />
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case "style":
        return (
          <div className="row g-4">
            <div
              className="col-12"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              {plateStyles.map((style) => (
                <div key={style.key} className="mb-3">
                  <div
                    onClick={() => setSelectedStyle(style.key)}
                    className={`card border-2 cursor-pointer ${
                      selectedStyle === style.key
                        ? "border-danger bg-danger bg-opacity-25"
                        : "border-light"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    {/* FULL SIZE IMAGE - like reference design */}
                    <div className="position-relative">
                      <img
                        src={style.image}
                        alt={style.label}
                        className="card-img-top"
                        style={{
                          width: "100%",
                          height: "120px",
                          objectFit: "cover",
                          border:
                            selectedStyle === style.key
                              ? "2px solid #a4161a"
                              : "1px solid #dee2e6",
                        }}
                        onError={(e) => {
                          // Fallback to colored div if image fails to load
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      {/* Fallback colored div */}
                      <div
                        className="d-none align-items-center justify-content-center text-white fw-bold position-absolute top-0 start-0 w-100"
                        style={{
                          height: "120px",
                          background: style.outlineColor
                            ? `linear-gradient(45deg, ${style.outlineColor}, ${style.outlineColor}aa)`
                            : "linear-gradient(45deg, #666, #999)",
                          fontSize: "16px",
                          color:
                            style.outlineColor === "#FFFFFF" ||
                            style.outlineColor === "#a4161a"
                              ? "#000"
                              : "#fff",
                        }}
                      >
                        <span
                          className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1"
                          style={{
                            fontSize: "10px",
                            borderRadius: "0 0 8px 0",
                          }}
                        >
                          NOT ROAD LEGAL
                        </span>
                        {style.label.split(" ")[0]}
                      </div>

                      {/* SELECTED indicator on image */}
                      {selectedStyle === style.key && (
                        <div className="position-absolute top-2 end-2">
                          <div className="bg-success text-white px-2 py-1 rounded">
                            <span className="small fw-bold">SELECTED ✓</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* BOTTOM INFO - plate name and price only */}
                    <div className="card-body p-3 ">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="fw-bold mb-1">{style.label}</h6>
                          <p className="small text-muted mb-0">
                            Pair: £{(style.price * 2).toFixed(2)} / Single: £
                            {style.price.toFixed(2)}
                          </p>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary">
                          ?
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "size":
        return (
          <div className="row g-3">
            <div
              className="col-12"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              {sizeOptions.map((size) => (
                <div key={size.key} className="mb-3">
                  <div
                    onClick={() => setSelectedSize(size.key)}
                    className={`card border-2 cursor-pointer ${
                      selectedSize === size.key
                        ? "border-danger bg-danger bg-opacity-25"
                        : "border-light"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    {/* FULL SIZE IMAGE */}
                    <div className="position-relative">
                      <img
                        src={size.image}
                        alt={size.label}
                        className="card-img-top"
                        style={{
                          width: "100%",
                          height: "120px",
                          objectFit: "cover",
                          border:
                            selectedSize === size.key
                              ? "2px solid #a4161a"
                              : "1px solid #dee2e6",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      {/* Fallback colored div */}
                      <div
                        className="d-none align-items-center justify-content-center text-dark fw-bold position-absolute top-0 start-0 w-100"
                        style={{
                          height: "120px",
                          background: "#a4161a",
                          fontSize: "16px",
                        }}
                      >
                        <span
                          className="position-absolute top-0 start-0 bg-warning text-dark px-2 py-1"
                          style={{
                            fontSize: "10px",
                            borderRadius: "0 0 8px 0",
                          }}
                        >
                          NOT ROAD LEGAL
                        </span>
                        SIZE
                      </div>

                      {/* SELECTED indicator on image */}
                      {selectedSize === size.key && (
                        <div className="position-absolute top-2 end-2">
                          <div className="bg-success text-white px-2 py-1 rounded">
                            <span className="small fw-bold">SELECTED ✓</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* BOTTOM INFO - exactly like style tab */}
                    <div className="card-body p-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="fw-bold mb-1">{size.label}</h6>
                          <p className="small text-muted mb-0">
                            {size.price === 0
                              ? "Included"
                              : `+£${size.price.toFixed(2)}`}
                          </p>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary">
                          ?
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "border":
        return (
          <div className="row g-3">
            <div className="col-12">
              <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                {borderOptions.map((border) => (
                  <div key={border.key} className="mb-2">
                    <div
                      onClick={() => setSelectedBorder(border.key)}
                      className={`card border-2 cursor-pointer ${
                        selectedBorder === border.key
                          ? "border-danger bg-danger bg-opacity-25"
                          : "border-light"
                      }`}
                      style={{ cursor: "pointer" }}
                    >
                      {/* FULL SIZE IMAGE */}
                      <div className="position-relative">
                        <img
                          src={border.image}
                          alt={border.name}
                          className="card-img-top"
                          style={{
                            width: "100%",
                            height: "120px",
                            objectFit: "cover",
                            border:
                              selectedBorder === border.key
                                ? "2px solid #a4161a"
                                : "1px solid #dee2e6",
                          }}
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        {/* Fallback Frame Border Preview */}
                        <div
                          className="d-none position-absolute top-0 start-0 w-100 align-items-center justify-content-center"
                          style={{
                            height: "120px",
                            backgroundColor:
                              border.key === "none" ? "#a4161a" : border.color,
                            borderRadius: "4px",
                            border:
                              border.key === "none"
                                ? "none"
                                : `3px solid ${border.color}`,
                          }}
                        >
                          {/* Inner plate area */}
                          <div
                            className="position-relative d-flex align-items-center justify-content-center fw-bold"
                            style={{
                              width: border.key === "none" ? "200px" : "160px",
                              height: border.key === "none" ? "80px" : "60px",
                              backgroundColor: "#a4161a",
                              borderRadius: "2px",
                              fontSize: "16px",
                              color: "#000",
                              boxShadow:
                                border.type === "crystal"
                                  ? `0 0 8px ${border.color}66`
                                  : border.type === "4d"
                                  ? `2px 2px 4px ${border.color}88`
                                  : "none",
                            }}
                          >
                            ABC
                          </div>
                        </div>

                        {/* SELECTED indicator on image */}
                        {selectedBorder === border.key && (
                          <div className="position-absolute top-2 end-2">
                            <div className="bg-success text-white px-2 py-1 rounded">
                              <span className="small fw-bold">SELECTED ✓</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* BOTTOM INFO */}
                      <div className="card-body p-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="fw-bold mb-1">{border.name}</h6>
                            <p className="small text-muted mb-0">
                              {border.price === 0
                                ? "Free"
                                : `+£${border.price}`}
                            </p>
                            <div className="d-flex gap-1 mt-1 flex-wrap">
                              {border.borderWidth && border.key !== "none" && (
                                <span className="badge bg-primary">
                                  {border.borderWidth}mm Frame
                                </span>
                              )}
                              {border.type === "crystal" && (
                                <span className="badge bg-info text-dark">
                                  CRYSTAL
                                </span>
                              )}
                              {border.type === "4d" && (
                                <span className="badge bg-success">
                                  4D RAISED
                                </span>
                              )}
                              {border.type === "printed" && (
                                <span className="badge bg-secondary">
                                  PRINTED
                                </span>
                              )}
                              {border.key !== "none" && (
                                <span className="badge bg-warning text-dark">
                                  NOT ROAD LEGAL
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "badge":
        return (
          <div className="row g-4">
            <div className="col-12">
              <label className="form-label fw-bold">Country Badge</label>
              <select
                className="form-select form-select-lg border-danger"
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

            {selectedCountry !== "none" && flagOptions[selectedCountry] && (
              <div className="col-12">
                <label className="form-label fw-bold">Flag Options</label>
                <div className="row g-2">
                  {flagOptions[selectedCountry].map((flag) => (
                    <div key={flag.key} className="col-6">
                      <div
                        className={`card cursor-pointer border-2 h-100 ${
                          selectedFlag === flag.key
                            ? "border-danger bg-danger bg-opacity-25"
                            : "border-light"
                        }`}
                        onClick={() => setSelectedFlag(flag.key)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="card-body p-3 text-center">
                          <div className="mb-2">
                            <div
                              className="mx-auto border rounded overflow-hidden"
                              style={{
                                width: "50px",
                                height: "30px",
                              }}
                            >
                              {flag.flagImage ? (
                                <img
                                  src={flag.flagImage}
                                  alt={flag.name}
                                  className="w-100 h-100"
                                  style={{ objectFit: "cover" }}
                                />
                              ) : (
                                <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-light">
                                  <Camera size={16} className="text-muted" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="small fw-bold mb-1">
                            {flag.text || flag.name}
                          </div>
                          <div className="small text-muted">£{flag.price}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedFlag === "custom-upload" && (
              <>
                <div className="col-12">
                  <label className="form-label fw-bold">
                    Upload Custom Flag Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="form-control form-control-lg border-danger"
                  />
                  <div className="form-text">
                    Max size: 2MB. Recommended: 240x144px
                  </div>
                  {customFlagImage && (
                    <div className="mt-3 text-center">
                      <img
                        src={customFlagImage}
                        alt="Custom Flag Preview"
                        className="border border-danger rounded"
                        style={{ maxWidth: "120px", maxHeight: "72px" }}
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
                    onChange={(e) =>
                      setCustomFlagText(e.target.value.toUpperCase())
                    }
                    className="form-control form-control-lg border-danger"
                    placeholder="Enter flag text (max 6 chars)"
                    maxLength="6"
                  />
                </div>
              </>
            )}

            {selectedFlag !== "none" && (
              <div className="col-12">
                <div className="row g-3">
                  <div className="col-6">
                    <label className="form-label fw-bold">Badge Position</label>
                    <select
                      className="form-select border-danger"
                      value={badgePosition}
                      onChange={(e) => setBadgePosition(e.target.value)}
                    >
                      <option value="left">Left Side</option>
                      <option value="right">Right Side</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-bold">
                      Badge Text Color
                    </label>
                    <select
                      className="form-select border-danger"
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
                    <label className="form-label fw-bold">
                      Badge Background Color
                    </label>
                    <div className="row g-2">
                      <div className="col-8">
                        <select
                          className="form-select border-danger"
                          value={badgeBorderColor}
                          onChange={(e) => setBadgeBorderColor(e.target.value)}
                        >
                          <option value="#005EB8">
                            Royal Blue (UK Standard)
                          </option>
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
                          style={{ height: "42px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "finish":
        return (
          <div className="row g-3">
            <div className="col-12">
              <h6 className="fw-bold mb-3">Plate Finish</h6>
              {finishOptions.map((finish) => (
                <div key={finish.key} className="mb-2">
                  <div
                    onClick={() => setSelectedFinish(finish.key)}
                    className={`card border-2 cursor-pointer ${
                      selectedFinish === finish.key
                        ? "border-danger bg-danger bg-opacity-25"
                        : "border-light"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-body p-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="d-flex align-items-center">
                          {/* FINISH IMAGE */}
                          <div className="me-3">
                            <img
                              src={finish.image}
                              alt={finish.label}
                              className="rounded"
                              style={{
                                width: "60px",
                                height: "30px",
                                objectFit: "cover",
                                border:
                                  selectedFinish === finish.key
                                    ? "2px solid #a4161a"
                                    : "1px solid #dee2e6",
                              }}
                              onError={(e) => {
                                // Fallback to colored div if image fails to load
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                            {/* Fallback colored div */}
                            <div
                              className="d-none align-items-center justify-content-center text-dark fw-bold"
                              style={{
                                width: "60px",
                                height: "30px",
                                background: "#a4161a",
                                borderRadius: "4px",
                                fontSize: "8px",
                                border:
                                  selectedFinish === finish.key
                                    ? "2px solid #a4161a"
                                    : "1px solid #dee2e6",
                              }}
                            >
                              FINISH
                            </div>
                          </div>
                          <div>
                            <h6 className="fw-bold mb-1">{finish.label}</h6>
                            <p className="small text-muted mb-0">
                              {finish.description}
                            </p>
                          </div>
                        </div>
                        <span className="fw-bold fs-5">
                          {finish.price === 0 ? "Free" : `£${finish.price}`}
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
            <h5 className="text-muted">
              Select a tab to configure your plates
            </h5>
          </div>
        );
    }
  };

 // Modify your useEffect to include smooth loading logic
useEffect(() => {
  const params = new URLSearchParams(location.search);
  const reg = params.get("reg");
  if (reg) {
    setPlateText(reg);
  }



  // Smooth loading sequence
  const loadingTimer = setTimeout(() => {
    setIsTransitioning(true); // Start transition
    
    // Complete loading after transition starts
    setTimeout(() => {
      setIsLoading(false);
    }, 800); // 800ms for smooth fade out
    
  }, 1500); // 1.5 seconds initial loading

  return () => {
    clearTimeout(loadingTimer);
  };
}, [location.search]);


  return (
     <>
<ColorfulLoader 
  isLoading={isLoading}
  isTransitioning={isTransitioning}
  loadingText="Loading Plate Builder..."
  welcomeText="Welcome!"
/>


       <div className="main-content">
    <div className="container-fluid" style={{ backgroundColor: "#dddddd" }}>
      <div
        className="container min-vh-100"
        style={{ backgroundColor: "#dddddd" }}
      >
        {/* Top Tab Navigation */}
        <div className="row g-0 shadow-sm pt-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <div key={tab.id} className="col">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`btn w-100 py-3 fw-bold border-0 ${
                    activeTab === tab.id
                      ? "bg-danger text-white"
                      : "bg-light text-dark hover:bg-gray-100"
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
              <div className="card-header bg-danger text-white fw-bold">
                <h5 className="mb-0">{activeTab.toUpperCase()}</h5>
              </div>
              <div className="card-body">{renderTabContent()}</div>
            </div>

            {/* Navigation Buttons */}
            <div className="d-flex gap-2 mt-3">
              {activeTab === "start" ? null : (
                <button
                  onClick={prevTab}
                  disabled={activeTab === "start"}
                  className="btn btn-secondary text-dark flex-fill fw-bold"
                >
                  <ChevronLeft size={16} className="me-1" />
                  BACK
                </button>
              )}

              <button
                onClick={nextTab}
                disabled={activeTab === "finish"}
                className="btn btn-danger text-white flex-fill fw-bold"
              >
                NEXT
                <ChevronRight size={16} className="ms-1" />
              </button>
            </div>
          </div>

          {/* Center Panel - Preview */}
          <div className="col-lg-6">
            <div className="card" style={{ backgroundColor: "#dddddd" }}>
              <div className="card-header bg-danger text-white fw-bold">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <Eye className="me-2" size={20} />
                    <span>Live Preview</span>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                {/* UPDATED: Preview Type Tabs - only show available options */}
                <div className="row g-0 overflow-hidden">
                  {wantFrontPlate && (
                    <div className={`col-${wantRearPlate ? "6" : "12"}`}>
                      <button
                        onClick={() => setPreviewType("front")}
                        className={`btn w-100 fw-bold ${
                          previewType === "front"
                            ? "btn-danger text-white"
                            : "btn-outline-secondary bg-light text-dark"
                        }`}
                        style={{ borderRadius: 0, border: "none" }}
                      >
                        FRONT PREVIEW
                      </button>
                    </div>
                  )}
                  {wantRearPlate && (
                    <div className={`col-${wantFrontPlate ? "6" : "12"}`}>
                      <button
                        onClick={() => setPreviewType("rear")}
                        className={`btn w-100 fw-bold ${
                          previewType === "rear"
                            ? "btn-danger text-white"
                            : "btn-outline-secondary bg-light text-dark"
                        }`}
                        style={{ borderRadius: 0, border: "none" }}
                      >
                        REAR PREVIEW
                      </button>
                    </div>
                  )}
                </div>

                {/* UPDATED: Only show preview if at least one plate type is wanted */}
                {wantFrontPlate || wantRearPlate ? (
                  <PlatePreview
                    text={displayText}
                    plateType={previewType}
                    plateStyle={selectedStyle}
                    fontColor={finalFontColor}
                    borderStyle={selectedBorder}
                    customFontColor={
                      selectedFontColor === "custom" ? customColor : null
                    }
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
                ) : (
                  <div className="text-center py-5">
                    <h5 className="text-muted">
                      Please select front or rear plate to see preview
                    </h5>
                  </div>
                )}

                <p className="text-center text-muted small mt-3">
                  Click & drag to rotate. Use mouse wheel to zoom. Frame borders
                  surround the entire plate.
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Order Summary */}
          <div className="col-lg-3">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-danger text-white fw-bold">
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
                    <span>
                      {spacing === "own" ? "As I've typed" : "Legal spacing"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Quantity:</span>
                    <span className="fw-bold">
                      {wantFrontPlate ? `${frontQuantity} Front` : ""}
                      {wantFrontPlate && wantRearPlate ? " + " : ""}
                      {wantRearPlate ? `${rearQuantity} Rear` : ""}
                    </span>
                  </div>
                </div>

                {/* Dynamic Features List */}
                <div className="mb-4">
                  <h6 className="fw-bold mb-3 text-primary">
                    Selected Features:
                  </h6>
                  {getSelectedFeatures().map((feature, index) => (
                    <div
                      key={index}
                      className={`d-flex justify-content-between align-items-center mb-2 p-2 rounded ${
                        feature.type === "base"
                          ? "bg-primary bg-opacity-10 border border-primary border-opacity-25"
                          : "bg-light"
                      }`}
                    >
                      <div className="d-flex align-items-center">
                        {feature.type === "base" && (
                          <span className="badge bg-primary me-2">BASE</span>
                        )}
                        {feature.type === "addon" && (
                          <span className="badge bg-success me-2">+</span>
                        )}
                        <span
                          className={feature.type === "base" ? "fw-bold" : ""}
                        >
                          {feature.name}
                        </span>
                      </div>
                      <span
                        className={`fw-bold ${
                          feature.type === "base"
                            ? "text-primary"
                            : "text-success"
                        }`}
                      >
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
                    <span className="fw-bold fs-4 text-success">
                      £{totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Legal Checkbox */}
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="legalCheck"
                    checked={isLegalCheckboxChecked}
                    onChange={(e) =>
                      setIsLegalCheckboxChecked(e.target.checked)
                    }
                  />
                  <label
                    className="form-check-label small"
                    htmlFor="legalCheck"
                  >
                    I understand that my plates may not be road legal and that
                    they may be sold as show plates
                  </label>
                </div>

                {/* Success Message */}
                {showSuccessMessage && (
                  <div className="alert alert-success mb-3" role="alert">
                    <CheckCircle className="me-2" size={20} />
                    <strong>Added to cart!</strong> Your plate has been added
                    successfully.
                  </div>
                )}

                {/* Add to Basket */}
                <button
                  className={`btn btn-lg fw-bold w-100 text-white mb-3 ${
                    isLegalCheckboxChecked && totalQuantity > 0
                      ? "btn-success"
                      : "btn-secondary"
                  }`}
                  onClick={handleAddToCart}
                  disabled={!isLegalCheckboxChecked || totalQuantity === 0}
                  style={{
                    opacity:
                      isLegalCheckboxChecked && totalQuantity > 0 ? 1 : 0.6,
                    cursor:
                      isLegalCheckboxChecked && totalQuantity > 0
                        ? "pointer"
                        : "not-allowed",
                    transition: "all 0.3s ease",
                  }}
                >
                  <ShoppingCart className="me-2" size={10} />
                  {isLegalCheckboxChecked && totalQuantity > 0 ? (
                    <>ADD TO BASKET - £{totalPrice.toFixed(2)}</>
                  ) : totalQuantity === 0 ? (
                    <>SELECT PLATES TO ADD</>
                  ) : (
                    <>PLEASE ACCEPT TERMS ABOVE</>
                  )}
                </button>

                {/* Cart Link */}
                {getCartItemCount() > 0 && (
                  <div className="text-center mb-3">
                    <button
                      className="btn btn-outline-warning"
                      onClick={goToCart}
                    >
                      View Cart ({getCartItemCount()} items)
                    </button>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="row g-2">
                  <div className="col-4">
                    <button
                      onClick={resetAll}
                      className="btn btn-outline-secondary btn-sm w-100"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    </>
  );
};
export default PlateBuilder;
