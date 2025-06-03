import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D } from '@react-three/drei';
import * as THREE from 'three';
import { plateStyles, borderOptions, flagOptions } from '../../config/PlateJson';

const PlatePreview = ({
    text,
    plateType,
    plateStyle,
    thickness,
    fontColor,
    shadowEffect,
    borderStyle,
    customFontColor,
    countryBadge,
    selectedCountry,
    badgePosition,
    badgeBorderColor,
    customFlagText,
    customFlagImage,
    customTextColor,
    outlineColor,
    selectedSize
}) => {
    // Base configuration
    const plateColor = plateType === 'front' ? '#FFFFFF' : '#FFD320';
    const finalFontColor = customFontColor || fontColor;
    
    // Get plate style configuration
    const selectedPlateObj = plateStyles.find((s) => s.key === plateStyle);
    const fontUrl = selectedPlateObj?.fontUrl || 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json';
    const badgefontUrl = 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json';
    
    // Plate dimensions based on vehicle type
    const plateDimensions = {
        '18-oblong': { width: 8.5, height: 2.0, depth: 0.25, scale: 1.0 },
        '21-oblong': { width: 10.0, height: 2.0, depth: 0.25, scale: 1.0 },
        'square': { width: 4.2, height: 3.6, depth: 0.25, scale: 0.8 },
        'motorcycle': { width: 3.8, height: 2.6, depth: 0.2, scale: 0.7 },
        '4x4': { width: 8.5, height: 2.0, depth: 0.3, scale: 1.0 }
    };
    
    const dimensions = plateDimensions[selectedSize] || plateDimensions['18-oblong'];
    
    // Dynamic font size calculation based on text length and plate width
    const calculateFontSize = () => {
        const baseSize = selectedPlateObj?.fontSize || 0.85; // Increased base size
        const textLength = text.length;
        
        // Calculate available width for text
        let availableWidth = dimensions.width - 0.3; // Reduced margins for larger text
        
        // Check if we have a badge that takes up space
        const hasBadge = selectedCountry !== 'none' && countryBadge !== 'none';
        if (hasBadge) {
            const badgeWidth = 1.4 * dimensions.scale;
            availableWidth = availableWidth - badgeWidth - 0.15; // Reduced margin for badge
        }
        
        // Calculate optimal size to fit text in available space
        // Use a more conservative character width estimate
        const characterWidthRatio = 0.5; // Adjusted for larger text
        const estimatedTextWidth = textLength * baseSize * characterWidthRatio;
        
        let fontSize = baseSize;
        if (estimatedTextWidth > availableWidth) {
            fontSize = (availableWidth / (textLength * characterWidthRatio)) * 0.95; // Increased to 95% for larger text
        }
        
        // Apply scale factor and ensure minimum/maximum readable size
        fontSize = fontSize * dimensions.scale;
        fontSize = Math.max(fontSize, 0.4); // Increased minimum size
        fontSize = Math.min(fontSize, 2.0); // Increased maximum size significantly
        
        return fontSize;
    };

    const fontSize = calculateFontSize();

    // Improved text positioning calculation
    const getTextPosition = () => {
        const hasBadge = selectedCountry !== 'none' && countryBadge !== 'none';
        
        // Calculate text width
        const estimatedCharWidth = fontSize * 0.45; // Adjusted for larger text
        const totalTextWidth = text.length * estimatedCharWidth;
        
        let xPosition = 0; // Start at center
        
        if (hasBadge) {
            const badgeWidth = 1.4 * dimensions.scale;
            const margin = 0.2;
            
            if (badgePosition === 'left') {
                // Badge is on left, center text in remaining right space
                const badgeRightEdge = -dimensions.width / 2 + badgeWidth + margin;
                const availableRightSpace = dimensions.width / 2 - badgeRightEdge;
                const textAreaCenter = badgeRightEdge + (availableRightSpace / 2);
                xPosition = textAreaCenter - (totalTextWidth / 2);
            } else {
                // Badge is on right, center text in remaining left space  
                const badgeLeftEdge = dimensions.width / 2 - badgeWidth - margin;
                const availableLeftSpace = badgeLeftEdge - (-dimensions.width / 2);
                const textAreaCenter = -dimensions.width / 2 + (availableLeftSpace / 2);
                xPosition = textAreaCenter - (totalTextWidth / 2);
            }
        } else {
            // No badge, center text on entire plate
            xPosition = -(totalTextWidth / 2);
        }
        
        return [xPosition, 0, dimensions.depth / 2 + 0.01];
    };

    const textPosition = getTextPosition();

    // Lighting setup for professional appearance
    const getLighting = () => {
        if (shadowEffect === 'neon' || shadowEffect === 'led') {
            return (
                <>
                    <ambientLight intensity={0.9} />
                    <directionalLight position={[0, 4, 4]} intensity={2.0} castShadow />
                    <directionalLight position={[4, 2, 2]} intensity={1.0} />
                    <directionalLight position={[-4, 2, 2]} intensity={1.0} />
                    <pointLight position={[0, 3, 3]} intensity={1.5} color="#ffffff" />
                    <spotLight position={[0, 6, 6]} intensity={2.5} color={finalFontColor} angle={0.4} />
                </>
            );
        }
        return (
            <>
                <ambientLight intensity={0.8} />
                <directionalLight position={[0, 4, 4]} intensity={2.0} castShadow />
                <directionalLight position={[4, 2, 2]} intensity={1.2} />
                <directionalLight position={[-4, 2, 2]} intensity={1.2} />
                <pointLight position={[0, 3, 3]} intensity={1.0} color="#ffffff" />
                <pointLight position={[2, 2, 4]} intensity={0.8} color="#f0f0f0" />
                <pointLight position={[-2, 2, 4]} intensity={0.8} color="#f0f0f0" />
            </>
        );
    };

    // Border rendering
    const renderBorder = () => {
        if (borderStyle === 'none') return null;

        const selectedBorderObj = borderOptions.find(b => b.key === borderStyle);
        if (!selectedBorderObj) return null;

        const borderColor = selectedBorderObj.color;
        if (borderColor === 'transparent' || 
            (plateColor === '#FFFFFF' && borderColor === '#FFFFFF') ||
            (plateColor === '#FFD320' && borderColor === '#FFD700')) {
            return null;
        }

        const borderThickness = selectedBorderObj.key.includes('krystal') ? 0.15 : 0.08;
        const hasBadge = selectedCountry !== 'none' && countryBadge !== 'none';

        if (hasBadge) {
            const textAreaWidth = dimensions.width - 1.5;
            const xOffset = badgePosition === 'left' ? 0.75 : -0.75;

            return (
                <group>
                    <mesh position={[xOffset, 0, dimensions.depth / 2 + borderThickness / 2]}>
                        <boxGeometry args={[textAreaWidth, dimensions.height, borderThickness]} />
                        <meshStandardMaterial color={borderColor} metalness={0.3} roughness={0.2} />
                    </mesh>
                    <mesh position={[xOffset, 0, dimensions.depth / 2 + borderThickness / 2 + 0.001]}>
                        <boxGeometry args={[textAreaWidth - 0.2, dimensions.height - 0.2, borderThickness + 0.002]} />
                        <meshStandardMaterial color={plateColor} />
                    </mesh>
                </group>
            );
        }

        return (
            <group>
                <mesh position={[0, 0, dimensions.depth / 2 + borderThickness / 2]}>
                    <boxGeometry args={[dimensions.width + borderThickness, dimensions.height + borderThickness, borderThickness]} />
                    <meshStandardMaterial color={borderColor} metalness={0.3} roughness={0.2} />
                </mesh>
                <mesh position={[0, 0, dimensions.depth / 2 + borderThickness / 2 + 0.001]}>
                    <boxGeometry args={[dimensions.width - 0.1, dimensions.height - 0.1, borderThickness + 0.002]} />
                    <meshStandardMaterial color={plateColor} />
                </mesh>
            </group>
        );
    };

    // Badge rendering
    const renderCountryBadge = () => {
        if (!selectedCountry || selectedCountry === 'none' || !countryBadge || countryBadge === 'none') return null;

        const flagData = flagOptions[selectedCountry]?.find(f => f.key === countryBadge);
        if (!flagData) return null;

        const flagText = countryBadge === 'custom-upload' ? customFlagText : flagData.text;
        const badgeWidth = 1.1 * dimensions.scale;
        const badgeHeight = dimensions.height * 0.8;
        
        const xPosition = badgePosition === 'right' 
            ? (dimensions.width / 2 - badgeWidth / 2 - 0.1) 
            : (-dimensions.width / 2 + badgeWidth / 2 + 0.1);
            
        const position = [xPosition, 0, dimensions.depth / 2 + 0.02];

        return (
            <group>
                {/* Badge background */}
                <mesh position={position}>
                    <boxGeometry args={[badgeWidth, badgeHeight, 0.03]} />
                    <meshStandardMaterial color={badgeBorderColor} metalness={0.2} roughness={0.3} />
                </mesh>

                {/* Flag area */}
                <mesh position={[position[0], position[1] + badgeHeight * 0.1, position[2] + 0.02]}>
                    <boxGeometry args={[badgeWidth * 0.9, badgeHeight * 0.6, 0.01]} />
                    <meshBasicMaterial color="#FFFFFF" />
                </mesh>

                {/* Flag image */}
                {flagData.flagImage && (
                    <mesh position={[position[0], position[1] + badgeHeight * 0.1, position[2] + 0.025]}>
                        <planeGeometry args={[badgeWidth * 0.9, badgeHeight * 0.6]} />
                        <meshBasicMaterial transparent={true}>
                            <primitive
                                object={(() => {
                                    const texture = new THREE.TextureLoader().load(flagData.flagImage);
                                    texture.flipY = false;
                                    return texture;
                                })()}
                                attach="map"
                            />
                        </meshBasicMaterial>
                    </mesh>
                )}

                {/* Custom flag image */}
                {countryBadge === 'custom-upload' && customFlagImage && (
                    <mesh position={[position[0], position[1] + badgeHeight * 0.1, position[2] + 0.025]}>
                        <planeGeometry args={[badgeWidth * 0.85, badgeHeight * 0.55]} />
                        <meshBasicMaterial transparent={true}>
                            <primitive
                                object={(() => {
                                    const texture = new THREE.TextureLoader().load(customFlagImage);
                                    texture.flipY = false;
                                    return texture;
                                })()}
                                attach="map"
                            />
                        </meshBasicMaterial>
                    </mesh>
                )}

                {/* Country code text */}
                <Text3D
                    font={badgefontUrl}
                    size={0.18 * dimensions.scale}
                    height={0.01}
                    position={[
                        position[0] - (flagText.length * 0.09 * dimensions.scale) / 2,
                        position[1] - badgeHeight * 0.4,
                        position[2] + 0.01
                    ]}
                    bevelEnabled={false}
                >
                    {flagText}
                    <meshBasicMaterial color={customTextColor || "#FFFFFF"} />
                </Text3D>
            </group>
        );
    };

    // Material properties based on plate style
    const getMaterialProps = (style) => {
        const materialMap = {
            '3d': { metalness: 0.3, roughness: 0.1, clearcoat: 0.8 },
            '4d': { metalness: 0.1, roughness: 0.4, clearcoat: 0.2 },
            '4d-neon-gel': { metalness: 0.4, roughness: 0.15, clearcoat: 0.9 },
            '5d-gel': { metalness: 0.5, roughness: 0.1, clearcoat: 1.0 },
            'laser': { metalness: 0.05, roughness: 0.6, clearcoat: 0.1 },
            'carbon-fiber': { metalness: 0.6, roughness: 0.2, clearcoat: 0.8 },
            'standard': { metalness: 0.1, roughness: 0.3, clearcoat: 0.2 }
        };
        return materialMap[style] || { metalness: 0.1, roughness: 0.3, clearcoat: 0.2 };
    };

    const materialProps = getMaterialProps(plateStyle);
    const cameraDistance = Math.max(dimensions.width, dimensions.height) * 1.2 + 3;

    return (
        <Canvas 
            style={{
                height: '350px',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                borderRadius: '8px'
            }}
            camera={{ position: [0, 0, cameraDistance], fov: 45 }}
            shadows
        >
            {getLighting()}
            <OrbitControls 
                enableZoom={true} 
                enablePan={true} 
                autoRotate={false}
                enableDamping={true}
                dampingFactor={0.05}
                minDistance={Math.max(3, cameraDistance * 0.6)}
                maxDistance={cameraDistance * 2}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2}
            />

            {renderBorder()}
            {renderCountryBadge()}

            {/* Main plate with enhanced appearance */}
            <mesh position={[0, 0, 0]} receiveShadow>
                <boxGeometry args={[dimensions.width, dimensions.height, dimensions.depth]} />
                <meshStandardMaterial
                    color={plateColor}
                    metalness={0.15}
                    roughness={0.1}
                    clearcoat={0.8}
                    clearcoatRoughness={0.05}
                    envMapIntensity={0.6}
                />
            </mesh>

            {/* Shadow effects with enhanced depth */}
            {shadowEffect !== 'none' && (
                <>
                    {/* Enhanced drop shadow for depth */}
                    <Text3D
                        font={fontUrl}
                        size={fontSize}
                        height={thickness * 0.2}
                        position={[textPosition[0] + 0.05, textPosition[1] - 0.08, textPosition[2] - 0.15]}
                        bevelEnabled={true}
                        bevelThickness={thickness * 0.02}
                        bevelSize={thickness * 0.01}
                        curveSegments={8}
                    >
                        {text}
                        <meshStandardMaterial
                            color="#222222"
                            transparent={true}
                            opacity={0.6}
                            roughness={0.8}
                        />
                    </Text3D>

                    {/* Outline effects */}
                    {(shadowEffect.includes('outline')) && (
                        <>
                            <Text3D
                                font={fontUrl}
                                size={fontSize * 1.03}
                                height={thickness * 0.9}
                                position={[textPosition[0] - 0.008, textPosition[1] - 0.008, textPosition[2] - 0.005]}
                                bevelEnabled={true}
                                bevelThickness={thickness * 0.08}
                                bevelSize={thickness * 0.04}
                                curveSegments={12}
                            >
                                {text}
                                <meshStandardMaterial
                                    color={
                                        shadowEffect === 'black-outline' ? '#000000' :
                                        shadowEffect === 'gray-outline' ? '#333333' :
                                        shadowEffect === 'white-outline' ? '#FFFFFF' :
                                        shadowEffect === 'colored-outline' ? outlineColor : '#000000'
                                    }
                                    metalness={0.1}
                                    roughness={0.3}
                                />
                            </Text3D>
                        </>
                    )}

                    {/* Neon/LED glow effects */}
                    {(shadowEffect === 'neon' || shadowEffect === 'led') && (
                        <>
                            {/* Inner glow */}
                            <Text3D
                                font={fontUrl}
                                size={fontSize * 0.98}
                                height={thickness * 0.4}
                                position={[textPosition[0], textPosition[1], textPosition[2] + 0.02]}
                                bevelEnabled={true}
                                bevelThickness={thickness * 0.05}
                                bevelSize={thickness * 0.02}
                                curveSegments={12}
                            >
                                {text}
                                <meshStandardMaterial
                                    color={finalFontColor}
                                    transparent={true}
                                    opacity={0.8}
                                    emissive={finalFontColor}
                                    emissiveIntensity={shadowEffect === 'neon' ? 0.6 : 0.3}
                                    metalness={0.0}
                                    roughness={0.1}
                                />
                            </Text3D>
                            
                            {/* Outer glow */}
                            <Text3D
                                font={fontUrl}
                                size={fontSize * 1.05}
                                height={thickness * 0.2}
                                position={[textPosition[0] - 0.01, textPosition[1] - 0.01, textPosition[2] - 0.02]}
                                bevelEnabled={true}
                                bevelThickness={thickness * 0.03}
                                bevelSize={thickness * 0.02}
                                curveSegments={8}
                            >
                                {text}
                                <meshStandardMaterial
                                    color={finalFontColor}
                                    transparent={true}
                                    opacity={0.4}
                                    emissive={finalFontColor}
                                    emissiveIntensity={shadowEffect === 'neon' ? 0.8 : 0.4}
                                    metalness={0.0}
                                    roughness={0.0}
                                />
                            </Text3D>
                        </>
                    )}
                </>
            )}

            {/* Main 3D text with enhanced appearance */}
            <Text3D
                font={fontUrl}
                size={fontSize}
                height={thickness}
                position={textPosition}
                bevelEnabled={true}
                bevelThickness={thickness * 0.12}
                bevelSize={thickness * 0.06}
                curveSegments={16}
            >
                {text}
                <meshStandardMaterial
                    color={finalFontColor}
                    metalness={materialProps.metalness}
                    roughness={materialProps.roughness}
                    clearcoat={materialProps.clearcoat}
                    clearcoatRoughness={0.05}
                    emissive={shadowEffect === 'colored-outline' ? '#000000' : '#000000'}
                    emissiveIntensity={0}
                    envMapIntensity={0.8}
                />
            </Text3D>
        </Canvas>
    );
};

export default PlatePreview;