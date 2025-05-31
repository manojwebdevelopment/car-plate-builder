// ===============================
// PlatePreview.js - 3D Plate rendering component
// ===============================

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
    outlineColor
}) => {
    const plateColor = plateType === 'front' ? '#FFFFFF' : '#FFD320';
    const finalFontColor = customFontColor || fontColor;
    
    // Get font info from plate style (fonts are now embedded in plate styles)
    const selectedPlateObj = plateStyles.find((s) => s.key === plateStyle);
    const fontUrl = selectedPlateObj?.fontUrl || 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json';
    const fontSize = selectedPlateObj?.fontSize || 0.6;

    // Enhanced lighting for better visual quality
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

    // UK-style border rendering - exact match to reference image
    const renderBorder = () => {
        if (borderStyle === 'none') return null;

        const selectedBorderObj = borderOptions.find(b => b.key === borderStyle);
        if (!selectedBorderObj) return null;

        const borderColor = selectedBorderObj.color;
        
        if ((plateColor === '#FFFFFF' && borderColor === '#FFFFFF') ||
            (plateColor === '#FFD320' && borderColor === '#FFD700')) {
            return null;
        }

        // If badge is selected, show border around text area only
        if (selectedCountry !== 'none' && countryBadge !== 'none') {
            const badgeWidth = 1.0;
            const textAreaWidth = 5.0;
            // Keep border in same position, just make it smaller
            const xOffset = badgePosition === 'left' ? 0.5 : -0.5;

            return (
                <group>
                    {/* Border around text area - same position, smaller width */}
                    <mesh position={[xOffset, 0, 0.13]}>
                        <boxGeometry args={[textAreaWidth + 0.1, 2.5, 0.02]} />
                        <meshBasicMaterial color={borderColor} />
                    </mesh>
                    {/* Inner text area */}
                    <mesh position={[xOffset, 0, 0.14]}>
                        <boxGeometry args={[textAreaWidth - 0.1, 2.3, 0.02]} />
                        <meshBasicMaterial color={plateColor} />
                    </mesh>
                </group>
            );
        }

        // If no badge, show border around entire plate with proper margin
        return (
            <group>
                {/* Outer border frame */}
                <mesh position={[0, 0, 0.13]}>
                    <boxGeometry args={[6.2, 2.7, 0.02]} />
                    <meshBasicMaterial color={borderColor} />
                </mesh>
                {/* Inner area with margin */}
                <mesh position={[0, 0, 0.14]}>
                    <boxGeometry args={[5.8, 2.3, 0.02]} />
                    <meshBasicMaterial color={plateColor} />
                </mesh>
            </group>
        );
    };

    // UK-style badge - exact match to reference image
    const renderCountryBadge = () => {
        if (!selectedCountry || selectedCountry === 'none' || !countryBadge || countryBadge === 'none') return null;

        const flagData = flagOptions[selectedCountry]?.find(f => f.key === countryBadge);
        if (!flagData) return null;

        const flagText = countryBadge === 'custom-upload' ? customFlagText : flagData.text;
        const position = badgePosition === 'right' ? [2.6, 0, 0.13] : [-2.6, 0, 0.13];
        const badgeWidth = 1.0;
        const badgeHeight = 2.7;

        return (
            <group>
                {/* Badge background - blue like UK standard */}
                <mesh position={position}>
                    <boxGeometry args={[badgeWidth, badgeHeight, 0.02]} />
                    <meshBasicMaterial color={badgeBorderColor} />
                </mesh>

                {/* Flag area - top section */}
                <mesh position={[position[0], position[1] + 0.5, position[2] + 0.01]}>
                    <boxGeometry args={[badgeWidth * 0.9, 1.4, 0.01]} />
                    <meshBasicMaterial color="#FFFFFF" />
                </mesh>

                {/* Flag image */}
                {flagData.flagImage && (
                    <mesh position={[position[0], position[1] + 0.5, position[2] + 0.02]}>
                        <planeGeometry args={[badgeWidth * 0.8, 1.2]} />
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
                    <mesh position={[position[0], position[1] + 0.5, position[2] + 0.02]}>
                        <planeGeometry args={[badgeWidth * 0.8, 1.2]} />
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

                {/* Country code text - bottom section */}
                <Text3D
                    font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
                    size={0.18}
                    height={0.02}
                    position={[
                        position[0] - (flagText.length * 0.09),
                        position[1] - 0.9,
                        position[2] + 0.02
                    ]}
                    bevelEnabled={false}
                >
                    {flagText}
                    <meshBasicMaterial color={customTextColor || "#FFFFFF"} />
                </Text3D>
            </group>
        );
    };

    // Enhanced material properties based on plate style
    const getMaterialProps = (style) => {
        const materialMap = {
            '3d': { metalness: 0.3, roughness: 0.1, clearcoat: 0.8 },
            '4d': { metalness: 0.1, roughness: 0.4, clearcoat: 0.2 },
            '4d-gel': { metalness: 0.4, roughness: 0.15, clearcoat: 0.9 },
            '5d-gel': { metalness: 0.5, roughness: 0.1, clearcoat: 1.0 },
            'premium': { metalness: 0.2, roughness: 0.3, clearcoat: 0.5 },
            'sport': { metalness: 0.15, roughness: 0.35, clearcoat: 0.4 },
            'laser': { metalness: 0.05, roughness: 0.6, clearcoat: 0.1 }
        };
        return materialMap[style] || { metalness: 0.1, roughness: 0.3, clearcoat: 0.2 };
    };

    const materialProps = getMaterialProps(plateStyle);

    return (
        <Canvas style={{
            height: '300px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '10px'
        }}>
            {getLighting()}
            <OrbitControls enableZoom={true} enablePan={false} autoRotate={false} />

            {renderBorder()}
            {renderCountryBadge()}

            {/* Plate base - Simple clean design */}
            <group>
                {/* Main plate - single clean piece */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[6.2, 2.7, 0.25]} />
                    <meshStandardMaterial
                        color={plateColor}
                        metalness={0.1}
                        roughness={0.2}
                    />
                </mesh>
            </group>

            {/* Shadow and outline effects */}
            {shadowEffect !== 'none' && (
                <>
                    {(shadowEffect === 'black-outline' || shadowEffect === 'gray-outline' ||
                        shadowEffect === 'white-outline' || shadowEffect === 'colored-outline') && (
                            <>
                                <Text3D
                                    font={fontUrl}
                                    size={fontSize * 1.02}
                                    height={thickness * 0.8}
                                    position={[-(text.length * fontSize * 0.285) + -0.51, -0.205, 0.19]}
                                    bevelEnabled={false}
                                >
                                    {text}
                                    <meshBasicMaterial
                                        color={
                                            shadowEffect === 'black-outline' ? '#000000' :
                                                shadowEffect === 'gray-outline' ? '#333333' :
                                                    shadowEffect === 'white-outline' ? '#FFFFFF' :
                                                        shadowEffect === 'colored-outline' ? outlineColor :
                                                            '#000000'
                                        }
                                    />
                                </Text3D>

                                <Text3D
                                    font={fontUrl}
                                    size={fontSize * 1.01}
                                    height={thickness * 0.9}
                                    position={[-(text.length * fontSize * 0.283) + -0.505, -0.2025, 0.195]}
                                    bevelEnabled={false}
                                >
                                    {text}
                                    <meshBasicMaterial
                                        color={
                                            shadowEffect === 'black-outline' ? '#111111' :
                                                shadowEffect === 'gray-outline' ? '#444444' :
                                                    shadowEffect === 'white-outline' ? '#EEEEEE' :
                                                        shadowEffect === 'colored-outline' ? outlineColor :
                                                            '#111111'
                                        }
                                    />
                                </Text3D>
                            </>
                        )}

                    {(shadowEffect === 'soft' || shadowEffect === 'hard' ||
                        shadowEffect === 'neon' || shadowEffect === 'led') && (
                            <Text3D
                                font={fontUrl}
                                size={fontSize}
                                height={thickness * 0.3}
                                position={[-(text.length * fontSize * 0.28) + -0.5 + 0.03, -0.28 - 0.06, 0.4 - 0.4]}
                                bevelEnabled={true}
                                bevelThickness={thickness * 0.03}
                                bevelSize={thickness * 0.01}
                                curveSegments={6}
                            >
                                {text}
                                <meshStandardMaterial
                                    color={shadowEffect === 'neon' || shadowEffect === 'led' ? finalFontColor : '#222222'}
                                    transparent={true}
                                    opacity={shadowEffect === 'soft' ? 0.4 : shadowEffect === 'hard' ? 0.7 : 0.9}
                                    emissive={shadowEffect === 'neon' || shadowEffect === 'led' ? finalFontColor : '#000000'}
                                    emissiveIntensity={shadowEffect === 'neon' ? 0.4 : shadowEffect === 'led' ? 0.2 : 0}
                                />
                            </Text3D>
                        )}
                </>
            )}

            {/* Main text */}
            <Text3D
                font={fontUrl}
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
    );
};

export default PlatePreview;