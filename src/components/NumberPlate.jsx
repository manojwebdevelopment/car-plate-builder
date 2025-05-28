// // src/NumberPlate.js
// import React, { useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Text3D } from '@react-three/drei';
// import * as THREE from 'three';

// const NumberPlate3D = ({ number }) => {
//   return (
//     <Canvas style={{ height: '300px', background: '#f0f0f0' }}>
//       <ambientLight intensity={0.4} />
//       <directionalLight position={[5, 5, 5]} />
//       <OrbitControls />

//       {/* Number Plate Base */}
//       <mesh position={[0, 0, 0]}>
//         <boxGeometry args={[6, 2.5, 0.3]} />
//         <meshStandardMaterial color="#ffffff" />
//       </mesh>

//       {/* 3D Text */}
//       <Text3D
//         font="/fonts/helvetiker_regular.typeface.json"
//         size={0.5}
//         height={0.2}
//         position={[-2.5, -0.3, 0.2]}
//         bevelEnabled
//         bevelSize={0.02}
//         bevelThickness={0.02}
//       >
//         {number}
//         <meshStandardMaterial color="#000000" />
//       </Text3D>
//     </Canvas>
//   );
// };

// const NumberPlate = () => {
//   const [number, setNumber] = useState('MH12AB1234');

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <input
//         type="text"
//         value={number}
//         onChange={(e) => setNumber(e.target.value.toUpperCase())}
//         placeholder="Enter vehicle number"
//         className="border border-gray-300 rounded p-2 mb-4 w-full text-xl"
//       />
//       <div className="border rounded shadow-lg">
//         <NumberPlate3D number={number} />
//       </div>
//     </div>
//   );
// };

// export default NumberPlate;

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D } from '@react-three/drei';

const plateStyles = [
    { label: 'Standard Number Plates', key: 'standard', price: 30 },
    { label: '3D Gel Plates', key: '3d', price: 40 },
    { label: '4D Plates', key: '4d', price: 45 },
    { label: '4D Gel Plates', key: '4d-gel', price: 55 },
    { label: '5D Gel Plates', key: '5d-gel', price: 60 }
];

const fontOptions = [
    { label: 'Standard Font', key: 'standard', size: 0.6, characteristics: 'Clean, traditional UK font' },
    { label: '3D Gel Font', key: '3d-gel', size: 0.62, characteristics: 'Rounded gel effect' },
    { label: '4D Plate Font', key: '4d-plate', size: 0.65, characteristics: 'Bold, raised style' },
    { label: '4D Gel Font', key: '4d-gel', size: 0.63, characteristics: 'Gel with depth' },
    { label: '5D Gel Font', key: '5d-gel', size: 0.68, characteristics: 'Maximum depth' },
    { label: 'Premium Font', key: 'premium', size: 0.66, characteristics: 'Luxury style' },
    { label: 'Sport Font', key: 'sport', size: 0.64, characteristics: 'Athletic look' },
    { label: 'Laser Cut Font', key: 'laser', size: 0.58, characteristics: 'Precise edges' }
];

const thicknessOptions = [
    { label: '3mm (Standard)', key: '3mm', value: 0.15, price: 0 },
    { label: '5mm (Enhanced)', key: '5mm', value: 0.25, price: 5 },
    { label: '8mm (Premium)', key: '8mm', value: 0.4, price: 10 }
];

const colorOptions = [
    { name: 'Classic Black', color: '#000000', price: 0 },
    { name: 'Royal Blue', color: '#0033cc', price: 5 },
    { name: 'Racing Red', color: '#cc0000', price: 5 },
    { name: 'Forest Green', color: '#006600', price: 5 },
    { name: 'Purple', color: '#6600cc', price: 5 },
    { name: 'Orange', color: '#ff6600', price: 8 },
    { name: 'Hot Pink', color: '#ff1493', price: 8 },
    { name: 'Gold', color: '#ffd700', price: 10 },
    { name: 'Silver', color: '#c0c0c0', price: 10 },
    { name: 'Chrome', color: '#e8e8e8', price: 15 },
    { name: 'Custom Color', color: 'custom', price: 20 }
];

const shadowOptions = [
    { name: 'No Shadow', key: 'none', price: 0 },
    { name: 'Soft Shadow', key: 'soft', price: 3 },
    { name: 'Hard Shadow', key: 'hard', price: 5 },
    { name: 'Neon Glow', key: 'neon', price: 12 },
    { name: 'LED Effect', key: 'led', price: 15 }
];

const borderOptions = [
    { name: 'No Border', key: 'none', price: 0 },
    { name: 'Standard Border', key: 'standard', price: 2 },
    { name: 'Double Border', key: 'double', price: 5 },
    { name: 'Neon Border', key: 'neon', price: 10 },
    { name: 'Chrome Border', key: 'chrome', price: 8 }
];

const badgeOptions = [
    { name: 'No Badge', key: 'none', price: 0, text: '', color: '#000000' },
    { name: 'Government', key: 'govt', price: 15, text: 'GOVT', color: '#0066cc' },
    { name: 'Commercial', key: 'commercial', price: 12, text: 'COM', color: '#cc6600' },
    { name: 'Police', key: 'police', price: 20, text: 'POLICE', color: '#000080' },
    { name: 'Military', key: 'military', price: 25, text: 'MIL', color: '#006600' },
    { name: 'Emergency', key: 'emergency', price: 18, text: 'EMG', color: '#cc0000' },
    { name: 'Taxi', key: 'taxi', price: 10, text: 'TAXI', color: '#ffcc00' },
    { name: 'Bus', key: 'bus', price: 10, text: 'BUS', color: '#ff6600' },
    { name: 'Custom Badge', key: 'custom', price: 30, text: 'CUSTOM', color: '#333333' }
];

const NumberPlatePreview = ({
    text,
    plateType,
    fontSize,
    fontStyle,
    thickness,
    fontColor,
    shadowEffect,
    borderStyle,
    customFontColor,
    badgeStyle,
    customBadgeText
}) => {
    const plateColor = plateType === 'front' ? '#FFFFFF' : '#FFD320';
    const finalFontColor = customFontColor || fontColor;
    const selectedBadgeObj = badgeOptions.find((b) => b.key === badgeStyle);

    // Material properties based on font style
    const getMaterialProps = (style) => {
        const materialMap = {
            '3d-gel': { metalness: 0.3, roughness: 0.1, clearcoat: 0.8 },
            '4d-plate': { metalness: 0.1, roughness: 0.4, clearcoat: 0.2 },
            '4d-gel': { metalness: 0.4, roughness: 0.15, clearcoat: 0.9 },
            '5d-gel': { metalness: 0.5, roughness: 0.1, clearcoat: 1.0 },
            'premium': { metalness: 0.2, roughness: 0.3, clearcoat: 0.5 },
            'sport': { metalness: 0.15, roughness: 0.35, clearcoat: 0.4 },
            'laser': { metalness: 0.05, roughness: 0.6, clearcoat: 0.1 }
        };
        return materialMap[style] || { metalness: 0.1, roughness: 0.3, clearcoat: 0.2 };
    };

    const materialProps = getMaterialProps(fontStyle);

    // Enhanced lighting for effects
    const getLighting = () => {
        if (shadowEffect === 'neon' || shadowEffect === 'led') {
            return (
                <>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[0, 3, 3]} intensity={1.5} />
                    <pointLight position={[-2, 2, 2]} intensity={1.2} color={finalFontColor} />
                    <pointLight position={[2, 2, 2]} intensity={1.2} color={finalFontColor} />
                    <spotLight position={[0, 5, 5]} intensity={2} color={finalFontColor} angle={0.3} />
                </>
            );
        }
        return (
            <>
                <ambientLight intensity={0.6} />
                <directionalLight position={[0, 3, 3]} intensity={1.2} />
                <pointLight position={[-2, 2, 2]} intensity={0.8} />
            </>
        );
    };

    // Border rendering
    const renderBorder = () => {
        if (borderStyle === 'none') return null;

        const borderProps = {
            'standard': { color: '#333333', thickness: 0.05 },
            'double': { color: '#666666', thickness: 0.08 },
            'neon': { color: finalFontColor, thickness: 0.1 },
            'chrome': { color: '#c0c0c0', thickness: 0.06 }
        };

        const props = borderProps[borderStyle] || borderProps.standard;

        return (
            <group>
                <mesh position={[0, 0, -0.01]}>
                    <boxGeometry args={[6.6, 3.1, 0.02]} />
                    <meshStandardMaterial
                        color={props.color}
                        metalness={borderStyle === 'chrome' ? 0.8 : 0.2}
                        roughness={borderStyle === 'chrome' ? 0.1 : 0.5}
                        emissive={borderStyle === 'neon' ? props.color : '#000000'}
                        emissiveIntensity={borderStyle === 'neon' ? 0.3 : 0}
                    />
                </mesh>
                {borderStyle === 'double' && (
                    <mesh position={[0, 0, -0.005]}>
                        <boxGeometry args={[6.8, 3.3, 0.02]} />
                        <meshStandardMaterial color="#333333" />
                    </mesh>
                )}
            </group>
        );
    };

    // Badge rendering
    const renderBadge = () => {
        if (badgeStyle === 'none') return null;

        const badgeText = customBadgeText || selectedBadgeObj?.text || '';
        const badgeColor = selectedBadgeObj?.color || '#333333';

        return (
            <group>
                {/* Badge Background */}
                <mesh position={[2.5, 0.8, 0.15]}>
                    <boxGeometry args={[1.2, 0.4, 0.1]} />
                    <meshStandardMaterial
                        color={plateType === 'front' ? '#F8F8F8' : '#FFF8DC'}
                        metalness={0.1}
                        roughness={0.3}
                    />
                </mesh>

                {/* Badge Border */}
                <mesh position={[2.5, 0.8, 0.12]}>
                    <boxGeometry args={[1.3, 0.5, 0.05]} />
                    <meshStandardMaterial color={badgeColor} />
                </mesh>

                {/* Badge Text */}
                <Text3D
                    font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
                    size={0.15}
                    height={0.05}
                    position={[2.5 - (badgeText.length * 0.08), 0.75, 0.2]}
                    bevelEnabled={true}
                    bevelThickness={0.01}
                    bevelSize={0.005}
                    curveSegments={8}
                >
                    {badgeText}
                    <meshStandardMaterial
                        color={badgeColor}
                        metalness={0.3}
                        roughness={0.4}
                    />
                </Text3D>
            </group>
        );
    };

    return (
        <div className="position-relative">
            {/* Action Buttons */}
            <div className="position-absolute top-0 start-0 w-100 d-flex justify-content-between p-3" style={{ zIndex: 10 }}>
                <button className="btn btn-sm btn-outline-light bg-white text-dark border-0 shadow-sm">
                    <i className="fas fa-expand me-1"></i>
                    Fullscreen
                </button>
                <button className="btn btn-sm btn-outline-light bg-white text-dark border-0 shadow-sm">
                    <i className="fas fa-download me-1"></i>
                    Export
                </button>
            </div>

            <Canvas style={{
                height: '400px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '15px',
                border: '3px solid #fff',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
                {getLighting()}
                <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    autoRotate={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 4}
                />

                {renderBorder()}
                {renderBadge()}

                {/* Plate Base */}
                <group>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[6.2, 2.7, 0.25]} />
                        <meshStandardMaterial
                            color={plateColor}
                            metalness={0.1}
                            roughness={0.2}
                        />
                    </mesh>
                    <mesh position={[0, 0, -0.02]}>
                        <boxGeometry args={[6.4, 2.9, 0.1]} />
                        <meshStandardMaterial color="#333333" />
                    </mesh>
                </group>

                {/* Shadow Text */}
                {/* Shadow Text - Aligned with Main Text */}
                {shadowEffect !== 'none' && (
                    <Text3D
                        font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
                        size={fontSize}
                        height={thickness * 0.5}
                        position={[-(text.length * fontSize * 0.28) + -0.5 + 0.02, -0.28 - 0.04, 0.4 - 0.3]}
                        bevelEnabled={true}
                        bevelThickness={thickness * 0.05}
                        bevelSize={thickness * 0.02}
                        curveSegments={8}
                    >
                        {text}
                        <meshStandardMaterial
                            color={shadowEffect === 'neon' || shadowEffect === 'led' ? finalFontColor : '#333333'}
                            transparent={true}
                            opacity={shadowEffect === 'soft' ? 0.3 : shadowEffect === 'hard' ? 0.6 : 0.8}
                            emissive={shadowEffect === 'neon' || shadowEffect === 'led' ? finalFontColor : '#000000'}
                            emissiveIntensity={shadowEffect === 'neon' ? 0.5 : shadowEffect === 'led' ? 0.3 : 0}
                        />
                    </Text3D>
                )}

                {/* Main Text */}
                {/* Main Text - Perfectly Centered */}
                <Text3D
                    font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
                    size={fontSize}
                    height={thickness}
                    position={[-(text.length * fontSize * 0.28) + -0.5, -0.2, 0.2]}
                    bevelEnabled={true}
                    bevelThickness={thickness * 0.1}
                    bevelSize={thickness * 0.05}
                    curveSegments={12}
                >
                    {text}
                    <meshStandardMaterial
                        color={finalFontColor}
                        metalness={materialProps.metalness}
                        roughness={materialProps.roughness}
                        clearcoat={materialProps.clearcoat}
                        clearcoatRoughness={0.1}
                        emissive={shadowEffect === 'neon' || shadowEffect === 'led' ? finalFontColor : '#000000'}
                        emissiveIntensity={shadowEffect === 'neon' ? 0.2 : shadowEffect === 'led' ? 0.1 : 0}
                    />
                </Text3D>
            </Canvas>
        </div>
    );
};

const NumberPlateBuilder = () => {
    const [plateText, setPlateText] = useState('GHELLO');
    const [spacing, setSpacing] = useState('own');
    const [selectedStyle, setSelectedStyle] = useState('4d-3mm');
    const [selectedFont, setSelectedFont] = useState('standard');
    const [selectedThickness, setSelectedThickness] = useState('5mm');
    const [plateType, setPlateType] = useState('front');
    const [selectedFontColor, setSelectedFontColor] = useState('#000000');
    const [customColor, setCustomColor] = useState('#000000');
    const [selectedShadow, setSelectedShadow] = useState('none');
    const [selectedBorder, setSelectedBorder] = useState('none');
    const [badgeStyle, setBadgeStyle] = useState('none');
    const [customBadgeText, setCustomBadgeText] = useState('');

    // Find selected objects
    const selected = plateStyles.find((s) => s.key === selectedStyle);
    const selectedFontObj = fontOptions.find((f) => f.key === selectedFont);
    const selectedThicknessObj = thicknessOptions.find((t) => t.key === selectedThickness);
    const selectedColorObj = colorOptions.find((c) => c.color === selectedFontColor);
    const selectedShadowObj = shadowOptions.find((s) => s.key === selectedShadow);
    const selectedBorderObj = borderOptions.find((b) => b.key === selectedBorder);
    const selectedBadgeObj = badgeOptions.find((b) => b.key === badgeStyle);

    const displayText = spacing === 'legal' ? plateText.split('').join(' ') : plateText;
    const finalFontColor = selectedFontColor === 'custom' ? customColor : selectedFontColor;
    const totalPrice = (selected?.price || 0) + (selectedThicknessObj?.price || 0) +
        (selectedColorObj?.price || 0) + (selectedShadowObj?.price || 0) +
        (selectedBorderObj?.price || 0) + (selectedBadgeObj?.price || 0);

    // Reset function
    const resetAll = () => {
        setPlateText('GHELLO');
        setSpacing('own');
        setSelectedStyle('4d-3mm');
        setSelectedFont('standard');
        setSelectedThickness('5mm');
        setSelectedFontColor('#000000');
        setCustomColor('#000000');
        setSelectedShadow('none');
        setSelectedBorder('none');
        setBadgeStyle('none');
        setCustomBadgeText('');
        setPlateType('front');
    };

    // Quick preset functions
    const applyNeonPreset = () => {
        setSelectedShadow('neon');
        setSelectedFontColor('#ff0000');
        setSelectedBorder('neon');
    };

    const applyLuxuryPreset = () => {
        setSelectedFontColor('#ffd700');
        setSelectedBorder('chrome');
        setSelectedThickness('8mm');
    };

    const applySportPreset = () => {
        setSelectedFont('sport');
        setSelectedFontColor('#cc0000');
        setSelectedShadow('hard');
    };

    return (
        <div className="min-vh-100" style={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            <div className="container py-5">


                <div className="row g-4">
                    {/* Left Panel - Controls */}
                    <div className="col-lg-6">
                        {/* Plate Text Input */}
                        <div className="card shadow-lg mb-4 border-0" style={{ borderRadius: '20px' }}>
                            <div className="card-header text-white text-center py-4" style={{
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                borderRadius: '20px 20px 0 0'
                            }}>
                                <h5 className="mb-0 fs-4">
                                    <i className="fas fa-edit me-2"></i>
                                    Enter Your Plate Text
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

                                {/* Plate Type & Spacing */}
                                <div className="row g-3">
                                    <div className="col-6">
                                        <label className="form-label fw-bold text-primary fs-5">
                                            <i className="fas fa-palette me-2"></i>Plate Type
                                        </label>
                                        <div className="btn-group w-100">
                                            <button
                                                onClick={() => setPlateType('front')}
                                                className={`btn btn-lg ${plateType === 'front' ? 'btn-primary' : 'btn-outline-primary'}`}
                                                style={{ borderRadius: '10px 0 0 10px' }}
                                            >
                                                <i className="fas fa-car me-1"></i>Front
                                            </button>
                                            <button
                                                onClick={() => setPlateType('rear')}
                                                className={`btn btn-lg ${plateType === 'rear' ? 'btn-warning' : 'btn-outline-warning'}`}
                                                style={{ borderRadius: '0 10px 10px 0' }}
                                            >
                                                <i className="fas fa-car me-1"></i>Rear
                                            </button>
                                        </div>
                                    </div>
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
                                </div>
                            </div>
                        </div>

                        {/* Customization Options */}
                        <div className="card shadow-lg border-0" style={{ borderRadius: '20px' }}>
                            <div className="card-header text-white py-4" style={{
                                background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                                borderRadius: '20px 20px 0 0'
                            }}>
                                <h5 className="mb-0 fs-4">
                                    <i className="fas fa-sliders-h me-2"></i>
                                    Customization Options
                                </h5>
                            </div>
                            <div className="card-body p-4">
                                <div className="row g-4">
                                    {/* Plate Style */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold fs-5">
                                            <i className="fas fa-layer-group me-2 text-primary"></i>
                                            Plate Style
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
                                    </div>

                                    {/* Font Style */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold fs-5">
                                            <i className="fas fa-font me-2 text-warning"></i>
                                            Font Style
                                        </label>
                                        <select
                                            className="form-select form-select-lg"
                                            value={selectedFont}
                                            onChange={(e) => setSelectedFont(e.target.value)}
                                            style={{ borderRadius: '10px', border: '2px solid #dee2e6' }}
                                        >
                                            {fontOptions.map((font) => (
                                                <option key={font.key} value={font.key}>
                                                    {font.label} - {font.characteristics}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Font Color */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold fs-5">
                                            <i className="fas fa-palette me-2 text-danger"></i>
                                            Font Color
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

                                    {/* Thickness & Shadow */}
                                    <div className="col-6">
                                        <label className="form-label fw-bold fs-6">
                                            <i className="fas fa-expand-arrows-alt me-2 text-secondary"></i>
                                            Thickness
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
                                            <i className="fas fa-magic me-2" style={{ color: '#ff6b00' }}></i>
                                            Shadow Effects
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
                                    </div>

                                    {/* Border & Badge */}
                                    <div className="col-6">
                                        <label className="form-label fw-bold fs-6">
                                            <i className="fas fa-border-style me-2 text-info"></i>
                                            Border Style
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
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label fw-bold fs-6">
                                            <i className="fas fa-shield-alt me-2" style={{ color: '#6f42c1' }}></i>
                                            Badge
                                        </label>
                                        <select
                                            className="form-select form-select-lg"
                                            value={badgeStyle}
                                            onChange={(e) => setBadgeStyle(e.target.value)}
                                            style={{ borderRadius: '10px' }}
                                        >
                                            {badgeOptions.map((badge) => (
                                                <option key={badge.key} value={badge.key}>
                                                    {badge.name} +£{badge.price}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Custom Badge Text */}
                                    {badgeStyle === 'custom' && (
                                        <div className="col-12">
                                            <label className="form-label fw-bold">Custom Badge Text</label>
                                            <input
                                                type="text"
                                                value={customBadgeText}
                                                onChange={(e) => setCustomBadgeText(e.target.value.toUpperCase())}
                                                className="form-control form-control-lg"
                                                placeholder="Enter badge text (max 6 chars)"
                                                maxLength="6"
                                                style={{ borderRadius: '10px' }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Preview */}
                    <div className="col-lg-6">
                        <div className="sticky-top" style={{ top: '20px' }}>
                            {/* 3D Preview */}
                            <div className="card shadow-lg border-0 mb-4" style={{ borderRadius: '20px' }}>
                                <div className="card-header text-white text-center py-4" style={{
                                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                    borderRadius: '20px 20px 0 0'
                                }}>
                                    <h5 className="mb-0 fs-4">
                                        <i className="fas fa-eye me-2"></i>
                                        Live Preview - {plateType === 'front' ? 'Front' : 'Rear'} Plate
                                    </h5>
                                </div>
                                <div className="card-body p-4">
                                    <NumberPlatePreview
                                        text={displayText}
                                        plateType={plateType}
                                        fontSize={selectedFontObj?.size || 0.6}
                                        fontStyle={selectedFont}
                                        thickness={selectedThicknessObj?.value || 0.25}
                                        fontColor={finalFontColor}
                                        customFontColor={selectedFontColor === 'custom' ? customColor : null}
                                        shadowEffect={selectedShadow}
                                        borderStyle={selectedBorder}
                                        badgeStyle={badgeStyle}
                                        customBadgeText={customBadgeText}
                                    />
                                </div>
                            </div>

                            {/* Quick Presets */}
                            <div className="card shadow-lg border-0" style={{ borderRadius: '20px' }}>
                                <div className="card-header bg-dark text-white text-center py-3" style={{ borderRadius: '20px 20px 0 0' }}>
                                    <h6 className="mb-0 fs-5">
                                        <i className="fas fa-bolt me-2"></i>
                                        Quick Style Presets
                                    </h6>
                                </div>
                                <div className="card-body p-4">
                                    <div className="row g-3">
                                        <div className="col-4">
                                            <button
                                                className="btn btn-outline-danger w-100 py-3"
                                                onClick={applyNeonPreset}
                                                style={{ borderRadius: '15px' }}
                                            >
                                                <i className="fas fa-fire fs-3 mb-2 d-block"></i>
                                                <div className="fw-bold">Neon</div>
                                                <small>Glow Effect</small>
                                            </button>
                                        </div>
                                        <div className="col-4">
                                            <button
                                                className="btn btn-outline-warning w-100 py-3"
                                                onClick={applyLuxuryPreset}
                                                style={{ borderRadius: '15px' }}
                                            >
                                                <i className="fas fa-crown fs-3 mb-2 d-block"></i>
                                                <div className="fw-bold">Luxury</div>
                                                <small>Gold & Chrome</small>
                                            </button>
                                        </div>
                                        <div className="col-4">
                                            <button
                                                className="btn btn-outline-success w-100 py-3"
                                                onClick={applySportPreset}
                                                style={{ borderRadius: '15px' }}
                                            >
                                                <i className="fas fa-flag-checkered fs-3 mb-2 d-block"></i>
                                                <div className="fw-bold">Sport</div>
                                                <small>Racing Style</small>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="card shadow-lg border-0 mb-4" style={{ borderRadius: '20px' }}>
                                <div className="card-header bg-success text-white text-center py-4" style={{ borderRadius: '20px 20px 0 0' }}>
                                    <h5 className="mb-0 fs-4">
                                        <i className="fas fa-shopping-cart me-2"></i>
                                        Order Summary
                                    </h5>
                                </div>
                                <div className="card-body p-4">
                                    <div className="row mb-4">
                                        <div className="col-8">
                                            <div className="mb-2"><strong>Text:</strong> {plateText}</div>
                                            <div className="mb-2"><strong>Style:</strong> {selected?.label}</div>
                                            <div className="mb-2"><strong>Font:</strong> {selectedFontObj?.label}</div>
                                            <div className="mb-2"><strong>Color:</strong> {selectedColorObj?.name}</div>
                                            <div className="mb-2"><strong>Thickness:</strong> {selectedThickness}</div>
                                            <div className="mb-2"><strong>Effects:</strong> {selectedShadowObj?.name}</div>
                                            <div className="mb-2"><strong>Border:</strong> {selectedBorderObj?.name}</div>
                                            <div className="mb-2"><strong>Badge:</strong> {selectedBadgeObj?.name}</div>
                                            <div className="mb-2"><strong>Type:</strong> {plateType === 'front' ? 'Front (White)' : 'Rear (Yellow)'}</div>
                                        </div>
                                        <div className="col-4 text-end">
                                            <h2 className="text-success fw-bold mb-3">£{totalPrice}</h2>
                                            <div className="small text-muted">
                                                <div>Base: £{selected?.price || 0}</div>
                                                <div>Thickness: +£{selectedThicknessObj?.price || 0}</div>
                                                <div>Color: +£{selectedColorObj?.price || 0}</div>
                                                <div>Effects: +£{selectedShadowObj?.price || 0}</div>
                                                <div>Border: +£{selectedBorderObj?.price || 0}</div>
                                                <div>Badge: +£{selectedBadgeObj?.price || 0}</div>
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
                                                    <i className="fas fa-heart me-1"></i>
                                                    Save
                                                </button>
                                            </div>
                                            <div className="col-4">
                                                <button className="btn btn-outline-info w-100" style={{ borderRadius: '10px' }}>
                                                    <i className="fas fa-share me-1"></i>
                                                    Share
                                                </button>
                                            </div>
                                            <div className="col-4">
                                                <button className="btn btn-outline-secondary w-100" style={{ borderRadius: '10px' }}>
                                                    <i className="fas fa-copy me-1"></i>
                                                    Copy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            {/* Reset Button */}
                            <div className="text-center mt-4">
                                <button
                                    onClick={resetAll}
                                    className="btn btn-link text-primary fs-5"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <i className="fas fa-redo me-2"></i>
                                    Reset All Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        </div>
    );
};

export default NumberPlateBuilder;