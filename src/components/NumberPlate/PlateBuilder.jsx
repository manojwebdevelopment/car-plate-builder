// // ===============================
// // PlateBuilder.js - Main plate builder component
// // ===============================

// import React, { useState } from 'react';
// import DualPlateView from './DualPlateView';
// import { 
//     plateStyles, 
//     thicknessOptions, 
//     colorOptions, 
//     shadowOptions, 
//     borderOptions, 
//     countryOptions, 
//     flagOptions 
// } from '../../config/PlateJson';

// const PlateBuilder = () => {
//     // STATE MANAGEMENT - All component state variables
//     const [plateText, setPlateText] = useState('GHELLO');
//     const [spacing, setSpacing] = useState('own');
//     const [selectedStyle, setSelectedStyle] = useState('standard'); // Now includes font
//     const [selectedThickness, setSelectedThickness] = useState('5mm');
//     const [selectedFontColor, setSelectedFontColor] = useState('#000000');
//     const [customColor, setCustomColor] = useState('#000000');
//     const [selectedShadow, setSelectedShadow] = useState('none');
//     const [selectedBorder, setSelectedBorder] = useState('none');
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

//     // CALCULATIONS
//     const displayText = spacing === 'legal' ? plateText.split('').join(' ') : plateText;
//     const selected = plateStyles.find((s) => s.key === selectedStyle);
//     const selectedThicknessObj = thicknessOptions.find((t) => t.key === selectedThickness);
//     const selectedColorObj = colorOptions.find((c) => c.color === selectedFontColor);
//     const selectedShadowObj = shadowOptions.find((s) => s.key === selectedShadow);
//     const selectedBorderObj = borderOptions.find((b) => b.key === selectedBorder);
//     const selectedCountryObj = countryOptions.find((c) => c.key === selectedCountry);
//     const selectedFlagObj = flagOptions[selectedCountry]?.find((f) => f.key === selectedFlag);

//     const finalFontColor = selectedFontColor === 'custom' ? customColor : selectedFontColor;
//     const basePrice = (selected?.price || 0) + (selectedThicknessObj?.price || 0) +
//         (selectedColorObj?.price || 0) + (selectedShadowObj?.price || 0) +
//         (selectedBorderObj?.price || 0) + (selectedFlagObj?.price || 0);
//     const totalQuantity = frontQuantity + rearQuantity;
//     const totalPrice = basePrice * totalQuantity;

//     // EVENT HANDLERS
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
//             reader.onload = (e) => {
//                 setCustomFlagImage(e.target.result);
//             };
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
//         setSelectedStyle('standard');
//         setSelectedThickness('5mm');
//         setSelectedFontColor('#000000');
//         setCustomColor('#000000');
//         setSelectedShadow('none');
//         setSelectedBorder('none');
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
//     };

//     return (
//         <div className="min-vh-100" style={{
//             background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
//             fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
//         }}>
//             <div className="container py-4">
//                 <div className="row g-4">
                    
//                     {/* LEFT PANEL - Controls */}
//                     <div className="col-lg-6">
                        
//                         {/* TEXT INPUT SECTION */}
//                         <div className="card shadow border-0 mb-4" style={{ borderRadius: '15px' }}>
//                             <div className="card-header text-white text-center py-3" style={{
//                                 background: 'linear-gradient(45deg, #667eea, #764ba2)',
//                                 borderRadius: '15px 15px 0 0'
//                             }}>
//                                 <h5 className="mb-0">
//                                     <i className="fas fa-edit me-2"></i>Enter Your Plate Text
//                                 </h5>
//                             </div>
//                             <div className="card-body p-4">
//                                 <input
//                                     type="text"
//                                     value={plateText}
//                                     onChange={(e) => setPlateText(e.target.value.toUpperCase())}
//                                     className="form-control form-control-lg text-center fw-bold mb-4"
//                                     placeholder="Enter Plate Text"
//                                     maxLength="8"
//                                     style={{
//                                         fontSize: '2.5rem',
//                                         letterSpacing: '0.3em',
//                                         border: '3px solid #e9ecef',
//                                         borderRadius: '15px',
//                                         boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)'
//                                     }}
//                                 />

//                                 <div className="row g-3">
//                                     <div className="col-6">
//                                         <label className="form-label fw-bold text-success fs-5">
//                                             <i className="fas fa-arrows-alt-h me-2"></i>Spacing
//                                         </label>
//                                         <div className="btn-group w-100">
//                                             <button
//                                                 onClick={() => setSpacing('own')}
//                                                 className={`btn btn-lg ${spacing === 'own' ? 'btn-success' : 'btn-outline-success'}`}
//                                                 style={{ borderRadius: '10px 0 0 10px' }}
//                                             >
//                                                 OWN
//                                             </button>
//                                             <button
//                                                 onClick={() => setSpacing('legal')}
//                                                 className={`btn btn-lg ${spacing === 'legal' ? 'btn-success' : 'btn-outline-success'}`}
//                                                 style={{ borderRadius: '0 10px 10px 0' }}
//                                             >
//                                                 LEGAL
//                                             </button>
//                                         </div>
//                                     </div>
//                                     <div className="col-6">
//                                         <label className="form-label fw-bold text-info fs-6">Preview</label>
//                                         <div className="form-control text-center fw-bold" style={{ 
//                                             fontSize: '1.5rem', 
//                                             letterSpacing: spacing === 'legal' ? '0.3em' : '0.1em',
//                                             backgroundColor: '#f8f9fa',
//                                             borderRadius: '10px'
//                                         }}>
//                                             {displayText}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* QUANTITY CONTROLS */}
//                                 <div className="row g-3 mt-2">
//                                     <div className="col-6">
//                                         <label className="form-label fw-bold text-info fs-6">
//                                             <i className="fas fa-plus-circle me-2"></i>Front Plates
//                                         </label>
//                                         <div className="input-group">
//                                             <button
//                                                 className="btn btn-outline-info"
//                                                 onClick={() => setFrontQuantity(Math.max(0, frontQuantity - 1))}
//                                                 style={{ borderRadius: '10px 0 0 10px' }}
//                                             >
//                                                 <i className="fas fa-minus"></i>
//                                             </button>
//                                             <input
//                                                 type="number"
//                                                 className="form-control text-center fw-bold"
//                                                 value={frontQuantity}
//                                                 onChange={(e) => setFrontQuantity(Math.max(0, parseInt(e.target.value) || 0))}
//                                                 min="0"
//                                                 max="10"
//                                             />
//                                             <button
//                                                 className="btn btn-outline-info"
//                                                 onClick={() => setFrontQuantity(Math.min(10, frontQuantity + 1))}
//                                                 style={{ borderRadius: '0 10px 10px 0' }}
//                                             >
//                                                 <i className="fas fa-plus"></i>
//                                             </button>
//                                         </div>
//                                     </div>
//                                     <div className="col-6">
//                                         <label className="form-label fw-bold text-warning fs-6">
//                                             <i className="fas fa-plus-circle me-2"></i>Rear Plates
//                                         </label>
//                                         <div className="input-group">
//                                             <button
//                                                 className="btn btn-outline-warning"
//                                                 onClick={() => setRearQuantity(Math.max(0, rearQuantity - 1))}
//                                                 style={{ borderRadius: '10px 0 0 10px' }}
//                                             >
//                                                 <i className="fas fa-minus"></i>
//                                             </button>
//                                             <input
//                                                 type="number"
//                                                 className="form-control text-center fw-bold"
//                                                 value={rearQuantity}
//                                                 onChange={(e) => setRearQuantity(Math.max(0, parseInt(e.target.value) || 0))}
//                                                 min="0"
//                                                 max="10"
//                                             />
//                                             <button
//                                                 className="btn btn-outline-warning"
//                                                 onClick={() => setRearQuantity(Math.min(10, rearQuantity + 1))}
//                                                 style={{ borderRadius: '0 10px 10px 0' }}
//                                             >
//                                                 <i className="fas fa-plus"></i>
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* STYLE OPTIONS - COMBINED PLATE STYLE + FONT */}
//                         <div className="card shadow border-0 mb-4" style={{ borderRadius: '15px' }}>
//                             <div className="card-header text-white py-3" style={{
//                                 background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
//                                 borderRadius: '15px 15px 0 0'
//                             }}>
//                                 <h5 className="mb-0">
//                                     <i className="fas fa-sliders-h me-2"></i>Style Options
//                                 </h5>
//                             </div>
//                             <div className="card-body p-4">
//                                 <div className="row g-4">
                                    
//                                     {/* COMBINED PLATE STYLE + FONT */}
//                                     <div className="col-12">
//                                         <label className="form-label fw-bold fs-5">
//                                             <i className="fas fa-layer-group me-2 text-primary"></i>Plate Style & Font
//                                         </label>
//                                         <select
//                                             className="form-select form-select-lg"
//                                             value={selectedStyle}
//                                             onChange={(e) => setSelectedStyle(e.target.value)}
//                                             style={{ borderRadius: '10px', border: '2px solid #dee2e6' }}
//                                         >
//                                             {plateStyles.map((style) => (
//                                                 <option key={style.key} value={style.key}>
//                                                     {style.label} - £{style.price}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <div className="small text-muted mt-2">
//                                             <i className="fas fa-info-circle me-1"></i>
//                                             Font style is automatically matched to plate type
//                                         </div>
//                                     </div>

//                                     {/* FONT COLOR */}
//                                     <div className="col-12">
//                                         <label className="form-label fw-bold fs-5">
//                                             <i className="fas fa-palette me-2 text-danger"></i>Font Color
//                                         </label>
//                                         <select
//                                             className="form-select form-select-lg"
//                                             value={selectedFontColor}
//                                             onChange={(e) => setSelectedFontColor(e.target.value)}
//                                             style={{ borderRadius: '10px', border: '2px solid #dee2e6' }}
//                                         >
//                                             {colorOptions.map((color) => (
//                                                 <option key={color.color} value={color.color}>
//                                                     {color.name} - £{color.price}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         {selectedFontColor === 'custom' && (
//                                             <div className="mt-3">
//                                                 <input
//                                                     type="color"
//                                                     value={customColor}
//                                                     onChange={(e) => setCustomColor(e.target.value)}
//                                                     className="form-control form-control-color form-control-lg w-100"
//                                                     style={{ height: '60px', borderRadius: '10px' }}
//                                                 />
//                                             </div>
//                                         )}
//                                     </div>

//                                     {/* THICKNESS & SHADOW */}
//                                     <div className="col-6">
//                                         <label className="form-label fw-bold fs-6">
//                                             <i className="fas fa-expand-arrows-alt me-2 text-secondary"></i>Thickness
//                                         </label>
//                                         <select
//                                             className="form-select form-select-lg"
//                                             value={selectedThickness}
//                                             onChange={(e) => setSelectedThickness(e.target.value)}
//                                             style={{ borderRadius: '10px' }}
//                                         >
//                                             {thicknessOptions.map((thickness) => (
//                                                 <option key={thickness.key} value={thickness.key}>
//                                                     {thickness.label} +£{thickness.price}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>

//                                     <div className="col-6">
//                                         <label className="form-label fw-bold fs-6">
//                                             <i className="fas fa-magic me-2" style={{ color: '#ff6b00' }}></i>Text Effects
//                                         </label>
//                                         <select
//                                             className="form-select form-select-lg"
//                                             value={selectedShadow}
//                                             onChange={(e) => setSelectedShadow(e.target.value)}
//                                             style={{ borderRadius: '10px' }}
//                                         >
//                                             {shadowOptions.map((shadow) => (
//                                                 <option key={shadow.key} value={shadow.key}>
//                                                     {shadow.name} +£{shadow.price}
//                                                 </option>
//                                             ))}
//                                         </select>

//                                         {/* OUTLINE COLOR PICKER */}
//                                         {(selectedShadow === 'colored-outline') && (
//                                             <div className="mt-2">
//                                                 <label className="form-label small fw-bold">Outline Color</label>
//                                                 <div className="d-flex gap-2">
//                                                     <input
//                                                         type="color"
//                                                         value={outlineColor}
//                                                         onChange={(e) => setOutlineColor(e.target.value)}
//                                                         className="form-control form-control-color"
//                                                         style={{ width: '50px', height: '38px' }}
//                                                     />
//                                                     <select
//                                                         className="form-select"
//                                                         value={outlineColor}
//                                                         onChange={(e) => setOutlineColor(e.target.value)}
//                                                     >
//                                                         <option value="#000000">Black</option>
//                                                         <option value="#FFFFFF">White</option>
//                                                         <option value="#FF0000">Red</option>
//                                                         <option value="#0000FF">Blue</option>
//                                                         <option value="#00FF00">Green</option>
//                                                         <option value="#FFD700">Gold</option>
//                                                         <option value="#800080">Purple</option>
//                                                     </select>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>

//                                     {/* BORDER STYLE */}
//                                     <div className="col-12">
//                                         <label className="form-label fw-bold fs-6">
//                                             <i className="fas fa-border-style me-2 text-info"></i>Border Style
//                                         </label>
//                                         <select
//                                             className="form-select form-select-lg"
//                                             value={selectedBorder}
//                                             onChange={(e) => setSelectedBorder(e.target.value)}
//                                             style={{ borderRadius: '10px' }}
//                                         >
//                                             {borderOptions.map((border) => (
//                                                 <option key={border.key} value={border.key}>
//                                                     {border.name} +£{border.price}
//                                                 </option>
//                                             ))}
//                                         </select>

//                                         {selectedBorder !== 'none' && (
//                                             <div className="mt-2 d-flex align-items-center">
//                                                 <span className="small me-2">Border Color:</span>
//                                                 <div
//                                                     style={{
//                                                         width: '30px',
//                                                         height: '20px',
//                                                         backgroundColor: borderOptions.find(b => b.key === selectedBorder)?.color || '#000000',
//                                                         border: '1px solid #ccc',
//                                                         borderRadius: '4px'
//                                                     }}
//                                                 ></div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* COUNTRY BADGE OPTIONS */}
//                         <div className="card shadow border-0 mt-4" style={{ borderRadius: '15px' }}>
//                             <div className="card-header text-white py-3" style={{
//                                 background: 'linear-gradient(45deg, #28a745, #20c997)',
//                                 borderRadius: '15px 15px 0 0'
//                             }}>
//                                 <h5 className="mb-0">
//                                     <i className="fas fa-flag me-2"></i>Country Badge Options
//                                 </h5>
//                             </div>
//                             <div className="card-body p-4">
//                                 <div className="row g-4">
                                    
//                                     <div className="col-12">
//                                         <label className="form-label fw-bold fs-5">
//                                             <i className="fas fa-globe me-2 text-primary"></i>Country Badge
//                                         </label>
//                                         <select
//                                             className="form-select form-select-lg"
//                                             value={selectedCountry}
//                                             onChange={(e) => handleCountryChange(e.target.value)}
//                                             style={{ borderRadius: '10px', border: '2px solid #dee2e6' }}
//                                         >
//                                             {countryOptions.map((country) => (
//                                                 <option key={country.key} value={country.key}>
//                                                     {country.name}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>

//                                     {selectedCountry !== 'none' && flagOptions[selectedCountry] && (
//                                         <div className="col-12">
//                                             <div className="row g-2">
//                                                 {flagOptions[selectedCountry].map((flag) => (
//                                                     <div key={flag.key} className="col-6">
//                                                         <div
//                                                             className={`card h-100 cursor-pointer border-2 ${selectedFlag === flag.key ? 'border-primary bg-light' : 'border-secondary'}`}
//                                                             onClick={() => setSelectedFlag(flag.key)}
//                                                             style={{
//                                                                 cursor: 'pointer',
//                                                                 borderRadius: '10px',
//                                                                 transition: 'all 0.3s ease'
//                                                             }}
//                                                         >
//                                                             <div className="card-body p-3 text-center">
//                                                                 <div className="mb-2">
//                                                                     <div style={{
//                                                                         width: '60px',
//                                                                         height: '36px',
//                                                                         margin: '0 auto',
//                                                                         border: '1px solid #ddd',
//                                                                         borderRadius: '3px',
//                                                                         overflow: 'hidden',
//                                                                         position: 'relative'
//                                                                     }}>
//                                                                         {flag.flagImage ? (
//                                                                             <img
//                                                                                 src={flag.flagImage}
//                                                                                 alt={flag.name}
//                                                                                 style={{
//                                                                                     width: '100%',
//                                                                                     height: '100%',
//                                                                                     objectFit: 'cover'
//                                                                                 }}
//                                                                             />
//                                                                         ) : (
//                                                                             <div style={{
//                                                                                 width: '100%',
//                                                                                 height: '100%',
//                                                                                 backgroundColor: '#f8f9fa',
//                                                                                 border: '2px dashed #dee2e6',
//                                                                                 borderRadius: '3px',
//                                                                                 display: 'flex',
//                                                                                 alignItems: 'center',
//                                                                                 justifyContent: 'center'
//                                                                             }}>
//                                                                                 <i className="fas fa-upload text-muted"></i>
//                                                                             </div>
//                                                                         )}
//                                                                     </div>
//                                                                 </div>
//                                                                 <div className="small fw-bold">{flag.text}</div>
//                                                                 <div className="small text-muted">£{flag.price}</div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     )}

//                                     {selectedFlag === 'custom-upload' && (
//                                         <>
//                                             <div className="col-12">
//                                                 <label className="form-label fw-bold">
//                                                     <i className="fas fa-upload me-2 text-primary"></i>Upload Custom Flag Image
//                                                 </label>
//                                                 <input
//                                                     type="file"
//                                                     accept="image/*"
//                                                     onChange={handleImageUpload}
//                                                     className="form-control form-control-lg"
//                                                     style={{ borderRadius: '10px' }}
//                                                 />
//                                                 <div className="small text-muted mt-2">
//                                                     <i className="fas fa-info-circle me-1"></i>Max size: 2MB. Recommended: 240x144px
//                                                 </div>
//                                                 {customFlagImage && (
//                                                     <div className="mt-3 text-center">
//                                                         <img
//                                                             src={customFlagImage}
//                                                             alt="Custom Flag Preview"
//                                                             style={{
//                                                                 maxWidth: '120px',
//                                                                 maxHeight: '72px',
//                                                                 border: '2px solid #dee2e6',
//                                                                 borderRadius: '5px'
//                                                             }}
//                                                         />
//                                                         <div className="small text-success mt-1">
//                                                             <i className="fas fa-check me-1"></i>Image uploaded successfully
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </div>

//                                             <div className="col-12">
//                                                 <label className="form-label fw-bold">Custom Flag Text</label>
//                                                 <input
//                                                     type="text"
//                                                     value={customFlagText}
//                                                     onChange={(e) => setCustomFlagText(e.target.value.toUpperCase())}
//                                                     className="form-control form-control-lg"
//                                                     placeholder="Enter flag text (max 6 chars)"
//                                                     maxLength="6"
//                                                     style={{ borderRadius: '10px' }}
//                                                 />
//                                             </div>
//                                         </>
//                                     )}

//                                     <div className="col-6">
//                                         <label className="form-label fw-bold fs-6">
//                                             <i className="fas fa-crosshairs me-2 text-warning"></i>Badge Position
//                                         </label>
//                                         <select
//                                             className="form-select form-select-lg"
//                                             value={badgePosition}
//                                             onChange={(e) => setBadgePosition(e.target.value)}
//                                             style={{ borderRadius: '10px' }}
//                                         >
//                                             <option value="left">Left Side</option>
//                                             <option value="right">Right Side</option>
//                                         </select>
//                                     </div>

//                                     <div className="col-6">
//                                         <label className="form-label fw-bold fs-6">
//                                             <i className="fas fa-font me-2 text-success"></i>Badge Text Color
//                                         </label>
//                                         <div className="row g-1">
//                                             <div className="col-8">
//                                                 <select
//                                                     className="form-select form-select-lg"
//                                                     value={customTextColor}
//                                                     onChange={(e) => setCustomTextColor(e.target.value)}
//                                                     style={{ borderRadius: '10px' }}
//                                                 >
//                                                     <option value="#FFFFFF">White</option>
//                                                     <option value="#000000">Black</option>
//                                                     <option value="#FFD700">Gold</option>
//                                                     <option value="#FF0000">Red</option>
//                                                     <option value="#0000FF">Blue</option>
//                                                     <option value="#008000">Green</option>
//                                                 </select>
//                                             </div>
//                                             <div className="col-4">
//                                                 <input
//                                                     type="color"
//                                                     value={customTextColor}
//                                                     onChange={(e) => setCustomTextColor(e.target.value)}
//                                                     className="form-control form-control-color form-control-lg w-100"
//                                                     style={{ height: '50px', borderRadius: '10px' }}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-12">
//                                         <label className="form-label fw-bold fs-6">
//                                             <i className="fas fa-palette me-2 text-secondary"></i>Badge Background Color
//                                         </label>
//                                         <div className="row g-2">
//                                             <div className="col-8">
//                                                 <select
//                                                     className="form-select form-select-lg"
//                                                     value={badgeBorderColor}
//                                                     onChange={(e) => setBadgeBorderColor(e.target.value)}
//                                                     style={{ borderRadius: '10px' }}
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
//                                                     className="form-control form-control-color form-control-lg w-100"
//                                                     style={{ height: '50px', borderRadius: '10px' }}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* RIGHT PANEL - DUAL PREVIEW AND ORDER SUMMARY */}
//                     <div className="col-lg-6">
//                         <div className="sticky-top" style={{ top: '20px' }}>
                            
//                             {/* DUAL PREVIEW */}
//                             <div className="card shadow border-0 mb-4" style={{ borderRadius: '15px' }}>
//                                 <div className="card-header text-white text-center py-3" style={{
//                                     background: 'linear-gradient(45deg, #667eea, #764ba2)',
//                                     borderRadius: '15px 15px 0 0'
//                                 }}>
//                                     <h5 className="mb-0">
//                                         <i className="fas fa-eye me-2"></i>Live Preview - Both Plates
//                                     </h5>
//                                 </div>
//                                 <div className="card-body p-4">
//                                     <DualPlateView
//                                         plateText={displayText}
//                                         plateStyle={selectedStyle}
//                                         selectedThickness={selectedThickness}
//                                         fontColor={finalFontColor}
//                                         shadowEffect={selectedShadow}
//                                         borderStyle={selectedBorder}
//                                         customFontColor={selectedFontColor === 'custom' ? customColor : null}
//                                         countryBadge={selectedFlag}
//                                         selectedCountry={selectedCountry}
//                                         badgePosition={badgePosition}
//                                         badgeBorderColor={badgeBorderColor}
//                                         customFlagText={customFlagText}
//                                         customFlagImage={customFlagImage}
//                                         customTextColor={customTextColor}
//                                         outlineColor={outlineColor}
//                                     />
//                                 </div>
//                             </div>

//                             {/* ORDER SUMMARY */}
//                             <div className="card shadow border-0 mb-4" style={{ borderRadius: '15px' }}>
//                                 <div className="card-header bg-success text-white text-center py-3" style={{ borderRadius: '15px 15px 0 0' }}>
//                                     <h5 className="mb-0">
//                                         <i className="fas fa-shopping-cart me-2"></i>Order Summary
//                                     </h5>
//                                 </div>
//                                 <div className="card-body p-4">
//                                     <div className="row mb-4">
//                                         <div className="col-8">
//                                             <div className="mb-2"><strong>Text:</strong> {plateText}</div>
//                                             <div className="mb-2"><strong>Style:</strong> {selected?.label}</div>
//                                             <div className="mb-2"><strong>Color:</strong> {selectedColorObj?.name}</div>
//                                             <div className="mb-2"><strong>Thickness:</strong> {selectedThickness}</div>
//                                             <div className="mb-2"><strong>Effects:</strong> {selectedShadowObj?.name}</div>
//                                             <div className="mb-2"><strong>Border:</strong> {selectedBorderObj?.name}</div>
//                                             <div className="mb-2"><strong>Country:</strong> {selectedCountryObj?.name || 'None'}</div>
//                                             <div className="mb-2"><strong>Flag:</strong> {selectedFlagObj?.name || 'None'}</div>
//                                             <div className="mb-2"><strong>Quantities:</strong> {frontQuantity} Front + {rearQuantity} Rear</div>
//                                         </div>
//                                         <div className="col-4 text-end">
//                                             <h2 className="text-success fw-bold mb-3">£{totalPrice}</h2>
//                                             <div className="small text-muted">
//                                                 <div>Base Price: £{basePrice}</div>
//                                                 <div>Total Quantity: {totalQuantity}</div>
//                                                 <div className="border-top pt-1 mt-1">
//                                                     <div>Plate: £{selected?.price || 0}</div>
//                                                     <div>Thickness: +£{selectedThicknessObj?.price || 0}</div>
//                                                     <div>Color: +£{selectedColorObj?.price || 0}</div>
//                                                     <div>Effects: +£{selectedShadowObj?.price || 0}</div>
//                                                     <div>Border: +£{selectedBorderObj?.price || 0}</div>
//                                                     <div>Flag: +£{selectedFlagObj?.price || 0}</div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="d-grid gap-3">
//                                         <button
//                                             className="btn btn-danger btn-lg py-3 fw-bold"
//                                             style={{ borderRadius: '15px', fontSize: '1.2rem' }}
//                                         >
//                                             <i className="fas fa-cart-plus me-2"></i>
//                                             ADD TO BASKET - £{totalPrice}
//                                         </button>

//                                         <div className="row g-2">
//                                             <div className="col-4">
//                                                 <button className="btn btn-outline-primary w-100" style={{ borderRadius: '10px' }}>
//                                                     <i className="fas fa-heart me-1"></i>Save
//                                                 </button>
//                                             </div>
//                                             <div className="col-4">
//                                                 <button className="btn btn-outline-info w-100" style={{ borderRadius: '10px' }}>
//                                                     <i className="fas fa-share me-1"></i>Share
//                                                 </button>
//                                             </div>
//                                             <div className="col-4">
//                                                 <button className="btn btn-outline-secondary w-100" style={{ borderRadius: '10px' }}>
//                                                     <i className="fas fa-copy me-1"></i>Copy
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* RESET BUTTON */}
//                             <div className="text-center mt-4">
//                                 <button
//                                     onClick={resetAll}
//                                     className="btn btn-link text-primary fs-5"
//                                     style={{ textDecoration: 'none' }}
//                                 >
//                                     <i className="fas fa-redo me-2"></i>Reset All Settings
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PlateBuilder;



// ===============================
// PlateBuilder.js - Clean Design Matching Reference Images
// ===============================

import React, { useState } from 'react';
import PlatePreview from './PlatePreview';
import { ChevronLeft, ChevronRight, Car, ShoppingCart, Eye, Move, Camera, Palette, Flag, Star } from 'lucide-react';
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

const PlateBuilder = () => {
    // Current active tab and preview type
    const [activeTab, setActiveTab] = useState('style');
    const [previewType, setPreviewType] = useState('front');
    
    // State management - all plate configuration
    const [plateText, setPlateText] = useState('GHELLO');
    const [spacing, setSpacing] = useState('own');
    const [selectedStyle, setSelectedStyle] = useState('4d-neon-gel');
    const [selectedThickness, setSelectedThickness] = useState('5mm');
    const [selectedFontColor, setSelectedFontColor] = useState('#000000');
    const [customColor, setCustomColor] = useState('#000000');
    const [selectedShadow, setSelectedShadow] = useState('none');
    const [selectedBorder, setSelectedBorder] = useState('orange-krystal');
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
    const [selectedSize, setSelectedSize] = useState('18-oblong');
    const [selectedFinish, setSelectedFinish] = useState('standard');

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
    const selectedThicknessObj = getSelectedOption(thicknessOptions, selectedThickness);
    const selectedColorObj = getSelectedOption(colorOptions, selectedFontColor);
    const selectedShadowObj = getSelectedOption(shadowOptions, selectedShadow);
    const selectedBorderObj = getSelectedOption(borderOptions, selectedBorder);
    const selectedFlagObj = flagOptions[selectedCountry]?.find((f) => f.key === selectedFlag);
    const selectedSizeObj = getSelectedOption(sizeOptions, selectedSize);
    const selectedFinishObj = getSelectedOption(finishOptions, selectedFinish);

    const finalFontColor = selectedFontColor === 'custom' ? customColor : selectedFontColor;
    const basePrice = (selected?.price || 0) + (selectedThicknessObj?.price || 0) +
        (selectedColorObj?.price || 0) + (selectedShadowObj?.price || 0) +
        (selectedBorderObj?.price || 0) + (selectedFlagObj?.price || 0) +
        (selectedSizeObj?.price || 0) + (selectedFinishObj?.price || 0);
    const totalQuantity = frontQuantity + rearQuantity;
    const totalPrice = basePrice * totalQuantity;
    const displayText = spacing === 'legal' ? plateText.split('').join(' ') : plateText;

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
        setSelectedStyle('4d-neon-gel');
        setSelectedThickness('5mm');
        setSelectedFontColor('#000000');
        setCustomColor('#000000');
        setSelectedShadow('none');
        setSelectedBorder('orange-krystal');
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
        setSelectedSize('18-oblong');
        setSelectedFinish('standard');
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

    // Tab content rendering
    const renderTabContent = () => {
        switch (activeTab) {
            case 'start':
                return (
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="row g-0 mb-3">
                                <div className="col-6">
                                    <button className="btn btn-warning w-100 fw-bold text-dark">FRONT BORDER</button>
                                </div>
                                <div className="col-6">
                                    <button className="btn btn-outline-secondary w-100">REAR BORDER</button>
                                </div>
                            </div>
                        </div>

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
                                fontSize: '1.2rem', 
                                letterSpacing: spacing === 'legal' ? '0.3em' : '0.1em'
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
                                    <ChevronLeft size={16} />
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
                                    <ChevronRight size={16} />
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
                                    <ChevronLeft size={16} />
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
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                );

            case 'style':
                return (
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="row g-0 mb-3">
                                <div className="col-6">
                                    <button className="btn btn-warning w-100 fw-bold text-dark">FRONT STYLE</button>
                                </div>
                                <div className="col-6">
                                    <button className="btn btn-outline-secondary w-100">REAR STYLE</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-12" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {plateStyles.slice(0, 4).map((style) => (
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
                                                        background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
                                                        borderRadius: '4px',
                                                        fontSize: '10px'
                                                    }}
                                                >
                                                    <span className="position-absolute top-0 start-0 bg-warning text-dark px-1" 
                                                          style={{ fontSize: '6px', borderRadius: '0 0 4px 0' }}>
                                                        NOT ROAD LEGAL
                                                    </span>
                                                    NEON GEL
                                                </div>
                                                
                                                <div className="flex-grow-1">
                                                    <h6 className="fw-bold mb-1">{style.label}</h6>
                                                    <p className="small text-muted mb-0">
                                                        Pair: £{(style.price * 2).toFixed(2)} / Single: £{style.price}
                                                    </p>
                                                    <p className="small text-primary mb-0">Font: {style.font}</p>
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

                        <div className="col-6">
                            <label className="form-label fw-bold">Thickness</label>
                            <select
                                className="form-select border-warning"
                                value={selectedThickness}
                                onChange={(e) => setSelectedThickness(e.target.value)}
                            >
                                {thicknessOptions.map((thickness) => (
                                    <option key={thickness.key} value={thickness.key}>
                                        {thickness.label} +£{thickness.price}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-6">
                            <label className="form-label fw-bold">Text Effects</label>
                            <select
                                className="form-select border-warning"
                                value={selectedShadow}
                                onChange={(e) => setSelectedShadow(e.target.value)}
                            >
                                {shadowOptions.map((shadow) => (
                                    <option key={shadow.key} value={shadow.key}>
                                        {shadow.name} +£{shadow.price}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedShadow === 'colored-outline' && (
                            <div className="col-12">
                                <label className="form-label fw-bold">Outline Color</label>
                                <div className="row g-2">
                                    <div className="col-3">
                                        <input
                                            type="color"
                                            value={outlineColor}
                                            onChange={(e) => setOutlineColor(e.target.value)}
                                            className="form-control form-control-color w-100"
                                            style={{ height: '40px' }}
                                        />
                                    </div>
                                    <div className="col-9">
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
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
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
                            <h6 className="fw-bold mb-3">Select Border Style</h6>
                            {borderOptions.slice(0, 6).map((border) => (
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
                                                <div 
                                                    className="me-3 border rounded"
                                                    style={{ 
                                                        width: '60px',
                                                        height: '30px',
                                                        backgroundColor: '#FFD700',
                                                        borderColor: border.color === 'transparent' ? '#ccc' : border.color,
                                                        borderWidth: border.color === 'transparent' ? '1px' : '3px'
                                                    }}
                                                />
                                                <div className="flex-grow-1">
                                                    <h6 className="fw-bold mb-1">{border.name}</h6>
                                                    <p className="small text-muted mb-0">
                                                        {border.price === 0 ? 'Free' : `+£${border.price}`}
                                                    </p>
                                                </div>
                                                {border.key !== 'none' && (
                                                    <span className="badge bg-warning text-dark">NOT ROAD LEGAL</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                <div className="col-lg-4">
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
                <div className="col-lg-4">
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
                                thickness={selectedThicknessObj?.value || 0.25}
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
                                selectedSize={selectedSize}
                            />

                            <p className="text-center text-muted small mt-3">
                                Click & drag to rotate. Use mouse wheel to zoom. This is a preview only.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Order Summary */}
                <div className="col-lg-4">
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
                                    <span>Registration</span>
                                    <span className="fw-bold">{plateText}</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Spacing</span>
                                    <span>{spacing === 'own' ? "As I've typed" : 'Legal spacing'}</span>
                                </div>
                            </div>

                            {/* Pricing Details */}
                            <div className="bg-warning bg-opacity-25 p-3 rounded mb-3">
                                <div className="row">
                                    <div className="col-6">
                                        <h6 className="fw-bold mb-2">Front Plate</h6>
                                        <div className="small">
                                            <div className="d-flex justify-content-between">
                                                <span>Style</span>
                                                <span>£{selected?.price || 0}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span>Size</span>
                                                <span>£{selectedSizeObj?.price || 0}</span>
                                            </div>
                                            {selectedBorderObj?.price > 0 && (
                                                <div className="d-flex justify-content-between">
                                                    <span>Border</span>
                                                    <span>£{selectedBorderObj.price}</span>
                                                </div>
                                            )}
                                            {selectedFlagObj?.price > 0 && (
                                                <div className="d-flex justify-content-between">
                                                    <span>Badge</span>
                                                    <span>£{selectedFlagObj.price}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="fw-bold mb-2">Rear Plate</h6>
                                        <div className="small">
                                            <div className="d-flex justify-content-between">
                                                <span>Style</span>
                                                <span>£{selected?.price || 0}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span>Size</span>
                                                <span>£{selectedSizeObj?.price || 0}</span>
                                            </div>
                                            {selectedBorderObj?.price > 0 && (
                                                <div className="d-flex justify-content-between">
                                                    <span>Border</span>
                                                    <span>£{selectedBorderObj.price}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <span className="fw-bold fs-5">Total</span>
                                <span className="fw-bold fs-4 text-warning">£{totalPrice.toFixed(2)}</span>
                            </div>

                            {/* Quantities */}
                            <div className="mb-3">
                                <div className="small text-muted">
                                    <div className="d-flex justify-content-between">
                                        <span>Base price per plate:</span>
                                        <span>£{basePrice.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>Quantity:</span>
                                        <span>{frontQuantity} Front + {rearQuantity} Rear = {totalQuantity}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Legal Checkbox */}
                            <div className="form-check mb-3">
                                <input type="checkbox" className="form-check-input" id="legalCheck" />
                                <label className="form-check-label small" htmlFor="legalCheck">
                                    I understand that my plates may not be road legal and that they may be sold as show plates
                                </label>
                            </div>

                            {/* Add to Basket */}
                            <button className="btn btn-warning btn-lg fw-bold w-100 text-dark mb-3">
                                <ShoppingCart className="me-2" size={20} />
                                ADD TO BASKET - £{totalPrice.toFixed(2)}
                            </button>

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