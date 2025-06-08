// import React from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Text3D } from "@react-three/drei";
// import * as THREE from "three";
// import {
//   plateStyles,
//   borderOptions,
//   flagOptions,
// } from "../../config/PlateJson";

// const PlatePreview = ({
//   text,
//   plateType,
//   plateStyle,
//   thickness,
//   fontColor,
//   shadowEffect,
//   borderStyle,
//   customFontColor,
//   countryBadge,
//   selectedCountry,
//   badgePosition,
//   badgeBorderColor,
//   customFlagText,
//   customFlagImage,
//   customTextColor,
//   outlineColor,
//   selectedSize,
// }) => {
//   // Base configuration
//   const plateColor = plateType === "front" ? "#FFFFFF" : "#FFD320";
//   const finalFontColor = customFontColor || fontColor;

//   // Get plate style configuration
//   const selectedPlateObj = plateStyles.find((s) => s.key === plateStyle);
//   const fontUrl =
//     selectedPlateObj?.fontUrl ||
//     "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json";
//   const badgefontUrl =
//     "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json";

//   // Plate dimensions based on vehicle type
//   const plateDimensions = {
//     "18-oblong": { width: 8.5, height: 2.0, depth: 0.03, scale: 1.0 },
//     "21-oblong": { width: 10.0, height: 2.0, depth: 0.03, scale: 1.0 },
//     "4x4": { width: 8.5, height: 2.0, depth: 0.03, scale: 1.0 },
//   };

//   const dimensions =
//     plateDimensions[selectedSize] || plateDimensions["18-oblong"];

//   // Custom rounded box geometry function
//   const createRoundedBoxGeometry = (width, height, depth, radius) => {
//     const shape = new THREE.Shape();
//     const x = width / 2 - radius;
//     const y = height / 2 - radius;

//     shape.moveTo(-x, -y + radius);
//     shape.lineTo(-x, y - radius);
//     shape.quadraticCurveTo(-x, y, -x + radius, y);
//     shape.lineTo(x - radius, y);
//     shape.quadraticCurveTo(x, y, x, y - radius);
//     shape.lineTo(x, -y + radius);
//     shape.quadraticCurveTo(x, -y, x - radius, -y);
//     shape.lineTo(-x + radius, -y);
//     shape.quadraticCurveTo(-x, -y, -x, -y + radius);

//     const extrudeSettings = {
//       depth: depth,
//       bevelEnabled: true,
//       bevelThickness: 0.008,
//       bevelSize: 0.008,
//       bevelSegments: 8,
//       curveSegments: 16,
//     };

//     return new THREE.ExtrudeGeometry(shape, extrudeSettings);
//   };

//   // Dynamic font size calculation based on text length and plate width
//   const calculateFontSize = () => {
//     const baseSize = selectedPlateObj?.fontSize || 0.85;
//     const textLength = text.length;

//     let availableWidth = dimensions.width - 0.3;

//     const hasBadge = selectedCountry !== "none" && countryBadge !== "none";
//     if (hasBadge) {
//       const badgeWidth = 1.4 * dimensions.scale;
//       availableWidth = availableWidth - badgeWidth - 0.15;
//     }

//     const characterWidthRatio = 0.5;
//     const estimatedTextWidth = textLength * baseSize * characterWidthRatio;

//     let fontSize = baseSize;
//     if (estimatedTextWidth > availableWidth) {
//       fontSize = (availableWidth / (textLength * characterWidthRatio)) * 0.95;
//     }

//     fontSize = fontSize * dimensions.scale;
//     fontSize = Math.max(fontSize, 0.4);
//     fontSize = Math.min(fontSize, 2.0);

//     return fontSize;
//   };

//   const fontSize = calculateFontSize();

//   // Improved text positioning calculation
//   const getTextPosition = () => {
//     const hasBadge = selectedCountry !== "none" && countryBadge !== "none";

//     const estimatedCharWidth = fontSize * 0.45;
//     const totalTextWidth = text.length * estimatedCharWidth;

//     let xPosition = 0;

//     if (hasBadge) {
//       const badgeWidth = 1.4 * dimensions.scale;
//       const margin = 0.2;

//       if (badgePosition === "left") {
//         const badgeRightEdge = -dimensions.width / 2 + badgeWidth + margin;
//         const availableRightSpace = dimensions.width / 2 - badgeRightEdge;
//         const textAreaCenter = badgeRightEdge + availableRightSpace / 2;
//         xPosition = textAreaCenter - totalTextWidth / 2;
//       } else {
//         const badgeLeftEdge = dimensions.width / 2 - badgeWidth - margin;
//         const availableLeftSpace = badgeLeftEdge - -dimensions.width / 2;
//         const textAreaCenter = -dimensions.width / 2 + availableLeftSpace / 2;
//         xPosition = textAreaCenter - totalTextWidth / 2;
//       }
//     } else {
//       xPosition = -(totalTextWidth / 2);
//     }

//     return [xPosition, 0, dimensions.depth / 2 + 0.015];
//   };

//   const textPosition = getTextPosition();

//   // Enhanced lighting function for bright front illumination
//   const getLighting = () => {
//     return (
//       <>
//         {/* Enhanced ambient light for overall brightness */}
//         <ambientLight intensity={1} color="#ffffff" />

//         {/* PRIMARY FRONT LIGHT - Direct bright illumination */}
//         <directionalLight
//           position={[-12, -1, 80]} // Positioned directly in front
//           intensity={0.9} // High intensity for bright effect
//           castShadow
//           color="#ffffff"
//           shadow-mapSize-width={2048}
//           shadow-mapSize-height={2048}
//           shadow-camera-far={50}
//           shadow-camera-left={-10}
//           shadow-camera-right={10}
//           shadow-camera-top={10}
//           shadow-camera-bottom={-10}
//         />

//         {/* SECONDARY FRONT LIGHT - Slightly angled for depth */}
//         <directionalLight
//           position={[1, 3, 20]}
//           intensity={0.5}
//           color="#ffffff"
//         />

//         {/* TOP LIGHT - For text definition */}
//         <directionalLight
//           position={[0, 80, 4]} // Positioned above for top-down lighting
//           intensity={1.2}
//           color="#ffffff"
//         />

//         {/* SIDE LIGHTS - For even illumination */}
//         <directionalLight
//           position={[-20, -5, -80]}
//           intensity={2}
//           color="#ffffff"
//         />
//         <directionalLight
//           position={[-4, 2, 5]} // Positioned to the side for additional lighting
//           intensity={0.8}
//           color="#ffffff"
//         />

//         {/* POINT LIGHTS - For additional brightness */}
//         <pointLight
//           position={[0, 0, 6]}
//           intensity={1.0}
//           color="#ffffff"
//           distance={15}
//         />
//         <pointLight
//           position={[2, 2, 4]} // Positioned to the side for additional lighting
//           intensity={0.8}
//           color="#ffffff"
//           distance={12}
//         />
//         <pointLight
//           position={[-2, 2, 4]} // Positioned to the side for additional lighting
//           intensity={0.8}
//           color="#ffffff"
//           distance={12}
//         />
//       </>
//     );
//   };

//   // Border rendering - THIN 1MM BORDER WITH 1MM MARGIN
//   const renderBorder = () => {
//     if (borderStyle === "none") return null;

//     const selectedBorderObj = borderOptions.find((b) => b.key === borderStyle);
//     if (!selectedBorderObj) return null;

//     const borderColor = selectedBorderObj.color;
//     if (
//       borderColor === "transparent" ||
//       (plateColor === "#FFFFFF" && borderColor === "#FFFFFF") ||
//       (plateColor === "#FFD320" && borderColor === "#FFD700")
//     ) {
//       return null;
//     }

//     const borderMargin = 0.05; // 1mm margin on all sides
//     const borderThickness = 0.05; // 1mm border thickness
//     const hasBadge = selectedCountry !== "none" && countryBadge !== "none";

//     if (hasBadge) {
//       const textAreaWidth = dimensions.width - 1.5;
//       const xOffset = badgePosition === "left" ? 0.75 : -0.75;

//       return (
//         <group>
//           {/* Border frame - THIN 1mm border with 1mm margin */}
//           <mesh
//             position={[xOffset, 0, 0.001]} // Same Z as main plate
//             receiveShadow
//           >
//             <primitive
//               object={createRoundedBoxGeometry(
//                 textAreaWidth + borderMargin * 2, // 1mm margin on each side
//                 dimensions.height + borderMargin * 2, // 1mm margin on each side
//                 dimensions.depth, // Same thickness as main plate
//                 0.06
//               )}
//             />
//             <meshStandardMaterial
//               color={borderColor} // Border color
//               metalness={0.2}
//               roughness={0.3}
//               clearcoat={0.3}
//             />
//           </mesh>

//           {/* Inner cutout - creates thin frame effect */}
//           <mesh
//             position={[xOffset, 0, 0.001]} // Slightly in front
//           >
//             <primitive
//               object={createRoundedBoxGeometry(
//                 textAreaWidth - borderThickness * 2, // Reduce by border thickness
//                 dimensions.height - borderThickness * 2, // Reduce by border thickness
//                 dimensions.depth + 0.002, // Slightly thicker to ensure cutout
//                 0.05
//               )}
//             />
//             <meshStandardMaterial
//               color={plateColor} // Same as main plate color
//               metalness={0.02}
//               roughness={0.1}
//               clearcoat={0.6}
//               clearcoatRoughness={0.02}
//               envMapIntensity={0.5}
//               emissive={plateColor}
//               emissiveIntensity={0.05}
//             />
//           </mesh>
//         </group>
//       );
//     }

//     return (
//       <group>
//         {/* Border frame - THIN 1mm border with 1mm margin */}
//         <mesh
//           position={[0, 0, 0.001]} // Same Z as main plate
//           receiveShadow
//         >
//           <primitive
//             object={createRoundedBoxGeometry(
//               dimensions.width + borderMargin * 2, // 1mm margin on each side
//               dimensions.height + borderMargin * 2, // 1mm margin on each side
//               dimensions.depth, // Same thickness as main plate
//               0.06
//             )}
//           />
//           <meshStandardMaterial
//             color={borderColor} // Border color
//             metalness={0.2}
//             roughness={0.3}
//             clearcoat={0.3}
//           />
//         </mesh>

//         {/* Inner cutout - creates thin frame effect */}
//         <mesh
//           position={[0, 0, 0.001]} // Slightly in front
//         >
//           <primitive
//             object={createRoundedBoxGeometry(
//               dimensions.width - borderThickness * 2, // Reduce by border thickness
//               dimensions.height - borderThickness * 2, // Reduce by border thickness
//               dimensions.depth + 0.002, // Slightly thicker to ensure cutout
//               0.05
//             )}
//           />
//           <meshStandardMaterial
//             color={plateColor} // Same as main plate color
//             metalness={0.02}
//             roughness={0.1}
//             clearcoat={0.6}
//             clearcoatRoughness={0.02}
//             envMapIntensity={0.5}
//             emissive={plateColor}
//             emissiveIntensity={0.05}
//           />
//         </mesh>
//       </group>
//     );
//   };

//   // Badge rendering - Adjusted for single plate thickness
//   const renderCountryBadge = () => {
//     if (
//       !selectedCountry ||
//       selectedCountry === "none" ||
//       !countryBadge ||
//       countryBadge === "none"
//     )
//       return null;

//     const flagData = flagOptions[selectedCountry]?.find(
//       (f) => f.key === countryBadge
//     );
//     if (!flagData) return null;

//     const flagText =
//       countryBadge === "custom-upload" ? customFlagText : flagData.text;
//     const badgeWidth = 1.1 * dimensions.scale;
//     const badgeHeight = dimensions.height * 0.8;

//     const xPosition =
//       badgePosition === "right"
//         ? dimensions.width / 2 - badgeWidth / 2 - 0.1
//         : -dimensions.width / 2 + badgeWidth / 2 + 0.1;

//     const position = [xPosition, 0, dimensions.depth / 2 + 0.01]; // On top of single plate

//     return (
//       <group>
//         {/* Badge background */}
//         <mesh position={position}>
//           <primitive
//             object={createRoundedBoxGeometry(
//               badgeWidth,
//               badgeHeight,
//               0.02,
//               0.04
//             )}
//           />
//           <meshStandardMaterial
//             color={badgeBorderColor}
//             metalness={0.1}
//             roughness={0.4}
//           />
//         </mesh>

//         {/* Flag area */}
//         <mesh
//           position={[
//             position[0],
//             position[1] + badgeHeight * 0.1,
//             position[2] + 0.01,
//           ]}
//         >
//           <primitive
//             object={createRoundedBoxGeometry(
//               badgeWidth * 0.9,
//               badgeHeight * 0.6,
//               0.008,
//               0.02
//             )}
//           />
//           <meshBasicMaterial color="#FFFFFF" />
//         </mesh>

//         {/* Flag image */}
//         {flagData.flagImage && (
//           <mesh
//             position={[
//               position[0],
//               position[1] + badgeHeight * 0.1,
//               position[2] + 0.015,
//             ]}
//           >
//             <planeGeometry args={[badgeWidth * 0.9, badgeHeight * 0.6]} />
//             <meshBasicMaterial transparent={true}>
//               <primitive
//                 object={(() => {
//                   const texture = new THREE.TextureLoader().load(
//                     flagData.flagImage
//                   );
//                   texture.flipY = false;
//                   return texture;
//                 })()}
//                 attach="map"
//               />
//             </meshBasicMaterial>
//           </mesh>
//         )}

//         {/* Custom flag image */}
//         {countryBadge === "custom-upload" && customFlagImage && (
//           <mesh
//             position={[
//               position[0],
//               position[1] + badgeHeight * 0.1,
//               position[2] + 0.015,
//             ]}
//           >
//             <planeGeometry args={[badgeWidth * 0.85, badgeHeight * 0.55]} />
//             <meshBasicMaterial transparent={true}>
//               <primitive
//                 object={(() => {
//                   const texture = new THREE.TextureLoader().load(
//                     customFlagImage
//                   );
//                   texture.flipY = false;
//                   return texture;
//                 })()}
//                 attach="map"
//               />
//             </meshBasicMaterial>
//           </mesh>
//         )}

//         {/* Country code text */}
//         <Text3D
//           font={badgefontUrl}
//           size={0.16 * dimensions.scale}
//           height={0.008}
//           position={[
//             position[0] - (flagText.length * 0.08 * dimensions.scale) / 2,
//             position[1] - badgeHeight * 0.4,
//             position[2] + 0.02,
//           ]}
//           bevelEnabled={false}
//         >
//           {flagText}
//           <meshBasicMaterial color={customTextColor || "#FFFFFF"} />
//         </Text3D>
//       </group>
//     );
//   };

//   // Material properties based on plate style
//   const getMaterialProps = (style) => {
//     const materialMap = {
//       "3d": { metalness: 0.2, roughness: 0.2, clearcoat: 0.6 },
//       "4d": { metalness: 0.1, roughness: 0.3, clearcoat: 0.3 },
//       "4d-neon-gel": { metalness: 0.3, roughness: 0.2, clearcoat: 0.7 },
//       "5d-gel": { metalness: 0.4, roughness: 0.1, clearcoat: 0.8 },
//       laser: { metalness: 0.05, roughness: 0.5, clearcoat: 0.2 },
//       "carbon-fiber": { metalness: 0.5, roughness: 0.3, clearcoat: 0.6 },
//       standard: { metalness: 0.1, roughness: 0.4, clearcoat: 0.3 },
//     };
//     return (
//       materialMap[style] || { metalness: 0.1, roughness: 0.4, clearcoat: 0.3 }
//     );
//   };

//   const materialProps = getMaterialProps(plateStyle);
//   const cameraDistance =
//     Math.max(dimensions.width, dimensions.height) * 0.8 + 4;

//   return (
//     <Canvas
//       style={{
//         height: "450px",
//         background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
//         borderRadius: "10px",
//       }}
//       camera={{ position: [0, 0, cameraDistance], fov: 35 }}
//       shadows
//     >
//       {getLighting()}
//       <OrbitControls
//         enableZoom={true}
//         minDistance={6}
//         maxDistance={25}
//         enablePan={true}
//         autoRotate={false}
//         enableDamping={true}
//         dampingFactor={0.08}
//         minPolarAngle={Math.PI / 6}
//         maxPolarAngle={Math.PI / 1.5}
//         target={[0, 0, 0]}
//       />

//       {renderBorder()}
//       {renderCountryBadge()}

//       {/* MAIN PLATE - Single plate thickness */}
//       <mesh position={[0, 0, 0]} receiveShadow castShadow>
//         <primitive
//           object={createRoundedBoxGeometry(
//             dimensions.width,
//             dimensions.height,
//             dimensions.depth, // Single plate thickness - NOT multiplied
//             0.09 // Increased radius for more visible rounded corners
//           )}
//         />
//         <meshStandardMaterial
//           color={plateColor} // ALWAYS use original plateColor (white for front, yellow for back)
//           metalness={0.02} // Very low metalness for bright matte finish
//           roughness={0.1} // Very smooth surface for maximum light reflection
//           clearcoat={0.6} // High clearcoat for glossy finish
//           clearcoatRoughness={0.02}
//           envMapIntensity={0.5}
//           // Enhanced for bright front lighting
//           emissive={plateColor} // ALWAYS use original plateColor for emissive
//           emissiveIntensity={0.05} // Slight self-illumination
//         />
//       </mesh>

//       {/* Minimal shadow effects - only outline option */}
//       {shadowEffect === "colored-outline" && (
//         <Text3D
//           font={fontUrl}
//           size={fontSize * 1.02}
//           height={thickness * 0.8}
//           position={[
//             textPosition[0] - 0.005,
//             textPosition[1] - 0.005,
//             textPosition[2] - 0.003,
//           ]}
//           bevelEnabled={true}
//           bevelThickness={thickness * 0.05}
//           bevelSize={thickness * 0.02}
//           curveSegments={8}
//         >
//           {text}
//           <meshStandardMaterial
//             color={outlineColor}
//             metalness={0.1}
//             roughness={0.4}
//           />
//         </Text3D>
//       )}

//       {/* Enhanced 3D text with bright front lighting */}
//       <Text3D
//         font={fontUrl}
//         size={fontSize}
//         height={thickness * 1.5} // Increased text height
//         position={textPosition}
//         bevelEnabled={true}
//         bevelThickness={thickness * 0.12} // Enhanced bevel
//         bevelSize={thickness * 0.06}
//         curveSegments={16} // Smoother curves
//       >
//         {text}
//         <meshStandardMaterial
//           color={finalFontColor}
//           metalness={0.1} // Low metalness for bright appearance
//           roughness={0.2} // Smooth for light reflection
//           clearcoat={0.7} // High clearcoat for glossy finish
//           clearcoatRoughness={0.05}
//           envMapIntensity={0.6}
//           // Enhanced for bright front lighting
//           emissive={finalFontColor}
//           emissiveIntensity={0.03} // Slight self-illumination for text
//         />
//       </Text3D>
//     </Canvas>
//   );
// };

// export default PlatePreview;

import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Text3D } from "@react-three/drei";
import * as THREE from "three";
import {
  plateStyles,
  borderOptions,
  flagOptions,
} from "../../config/PlateJson";

const PlatePreview = ({
  text,
  plateType,
  plateStyle,
  fontColor,
  borderStyle,
  customFontColor,
  countryBadge,
  selectedCountry,
  badgePosition,
  badgeBorderColor,
  customFlagText,
  customFlagImage,
  customTextColor,
  selectedSize,
}) => {
  // Base configuration
  const plateColor = plateType === "front" ? "#FFFFFF" : "#FFD320";
  const finalFontColor = customFontColor || fontColor;

  // Get plate style configuration
  const selectedPlateObj = plateStyles.find((s) => s.key === plateStyle);
  const fontUrl =
    selectedPlateObj?.fontUrl ||
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json";
  const badgefontUrl =
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json";

  // Get built-in outline color and thickness from plate style
  const builtInOutlineColor = selectedPlateObj?.outlineColor;
  const plateThickness = selectedPlateObj?.thickness || 0.25;

  // Get border configuration for Z-index calculations
  const selectedBorderObj = borderOptions.find((b) => b.key === borderStyle);
  const is4dBorder = selectedBorderObj?.type === "4d";

  // Check if badge is present
  const hasBadge = selectedCountry !== "none" && countryBadge !== "none";

  // Plate dimensions based on vehicle type - INCREASE width when badge is present
  const plateDimensions = {
    "18-oblong": { width: 6.5, height: 1.5, depth: 0.03, scale: 1 },
    "21-oblong": { width: 8.0, height: 1.5, depth: 0.03, scale: 1 },
    "4x4": { width: 8.5, height: 1.5, depth: 0.03, scale: 1 },
  };

  const baseDimensions =
    plateDimensions[selectedSize] || plateDimensions["18-oblong"];

  // INCREASE plate width when badge is present - to accommodate badge outside border
  const dimensions = {
    ...baseDimensions,
    width: hasBadge ? baseDimensions.width : baseDimensions.width, // Add extra width for badge
  };

  // Custom rounded box geometry function
  const createRoundedBoxGeometry = (width, height, depth, radius) => {
    const shape = new THREE.Shape();
    const x = width / 2 - radius;
    const y = height / 2 - radius;

    shape.moveTo(-x, -y + radius);
    shape.lineTo(-x, y - radius);
    shape.quadraticCurveTo(-x, y, -x + radius, y);
    shape.lineTo(x - radius, y);
    shape.quadraticCurveTo(x, y, x, y - radius);
    shape.lineTo(x, -y + radius);
    shape.quadraticCurveTo(x, -y, x - radius, -y);
    shape.lineTo(-x + radius, -y);
    shape.quadraticCurveTo(-x, -y, -x, -y + radius);

    const extrudeSettings = {
      depth: depth,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 8,
      curveSegments: 16,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  };

  // Dynamic font size calculation
  const calculateFontSize = () => {
    const baseSize = selectedPlateObj?.fontSize || 0.85;
    const textLength = text.length;

    // Calculate available width for text (badge is outside so doesn't affect text space)
    let availableWidth = dimensions.width - 0.4; // Base margins only

    const characterWidthRatio = 0.5;
    const estimatedTextWidth = textLength * baseSize * characterWidthRatio;

    let fontSize = baseSize;
    if (estimatedTextWidth > availableWidth) {
      fontSize = (availableWidth / (textLength * characterWidthRatio)) * 0.95;
    }

    fontSize = fontSize * dimensions.scale;
    fontSize = Math.max(fontSize, 0.4);
    fontSize = Math.min(fontSize, 2.0);

    return fontSize;
  };

  const fontSize = calculateFontSize();

  // Text positioning calculation with 4D border adjustment
  const getTextPosition = () => {
    const estimatedCharWidth = fontSize * 0.45;
    const totalTextWidth = text.length * estimatedCharWidth;

    let xPosition = 0;

    if (hasBadge) {
      // Text should be positioned in the usable area (inside the border frame)
      // Since border frame is offset, position text within that area
      const frameOffsetX = badgePosition === "left" ? -0.6 : -1.7; // Offset text away from badge side plate text center 
      xPosition = frameOffsetX - totalTextWidth / 2;
    } else {
      // No badge: center text perfectly on plate
      xPosition = -(totalTextWidth / 1.1);
    }

    // CRITICAL FIX: Elevate text Z-position for 4D borders to appear above the raised frame
    const baseZ = dimensions.depth / 2 + 0.015;
    const textZ = is4dBorder ? baseZ + 0.08 : baseZ; // Much higher Z for 4D borders

    return [xPosition, -0.28, textZ];
  };

  const textPosition = getTextPosition();

  // Enhanced lighting function - FIXED for all border types
  // const getLighting = () => {
  //   const selectedBorderObj = borderOptions.find((b) => b.key === borderStyle);
  //   const isCrystalBorder = selectedBorderObj?.type === "crystal";

  //   return (
  //     <>
  //       {/* Base ambient light - REDUCED to prevent unwanted shadows */}
  //       <ambientLight intensity={0.6} color="#ffffff" />

  //       {/* Primary directional light - OPTIMIZED positioning */}
  //       <directionalLight
  //         position={[0, 8, 12]}
  //         intensity={1.0}
  //         castShadow={false} // DISABLED shadows to fix back plate issue
  //         color="#ffffff"
  //       />

  //       {/* Secondary light for depth - NO shadows */}
  //       <directionalLight
  //         position={[-3, 4, 8]}
  //         intensity={0.5}
  //         color="#ffffff"
  //         castShadow={false}
  //       />

  //       {/* Top light for text definition - NO shadows */}
  //       <directionalLight
  //         position={[0, 10, 6]}
  //         intensity={0.7}
  //         color="#ffffff"
  //         castShadow={false}
  //       />

  //       {/* Side fill lights - NO shadows */}
  //       <directionalLight
  //         position={[8, 0, 4]}
  //         intensity={0.3}
  //         color="#ffffff"
  //         castShadow={false}
  //       />
  //       <directionalLight
  //         position={[-8, 0, 4]}
  //         intensity={0.3}
  //         color="#ffffff"
  //         castShadow={false}
  //       />

  //       {/* Crystal-specific lighting effects - ONLY for crystal borders */}
  //       {isCrystalBorder && (
  //         <>
  //           <pointLight
  //             position={[0, 0, 2]}
  //             intensity={0.6}
  //             color={selectedBorderObj.color}
  //             distance={4}
  //             decay={1.5}
  //           />
  //           <pointLight
  //             position={[0.5, 0.3, 1.5]}
  //             intensity={0.4}
  //             color={selectedBorderObj.color}
  //             distance={3}
  //             decay={1.5}
  //           />
  //           <pointLight
  //             position={[-0.5, -0.3, 1.5]}
  //             intensity={0.4}
  //             color={selectedBorderObj.color}
  //             distance={3}
  //             decay={1.5}
  //           />
  //         </>
  //       )}

  //       {/* Standard point lights for general illumination - NO shadows */}
  //       <pointLight
  //         position={[0, 0, 6]}
  //         intensity={0.5}
  //         color="#ffffff"
  //         distance={15}
  //         castShadow={false}
  //       />
  //       <pointLight
  //         position={[2, 2, 4]}
  //         intensity={0.3}
  //         color="#ffffff"
  //         distance={12}
  //         castShadow={false}
  //       />
  //       <pointLight
  //         position={[-2, 2, 4]}
  //         intensity={0.3}
  //         color="#ffffff"
  //         distance={12}
  //         castShadow={false}
  //       />
  //     </>
  //   );
  // };
  
// Enhanced lighting function for bright front illumination
const getLighting = () => {
return (
<>
{/* Enhanced ambient light for overall brightness */}
<ambientLight intensity={4} color="#ffffff" />

{/* PRIMARY FRONT LIGHT - Direct bright illumination */}
<directionalLight
position={[-7, -4, 60]} // Positioned directly in front
intensity={0.15} // High intensity for bright effect
castShadow
color="#ffffff"
shadow-mapSize-width={2048}
shadow-mapSize-height={2048}
shadow-camera-far={50}
shadow-camera-left={-10}
shadow-camera-right={10}
shadow-camera-top={10}
shadow-camera-bottom={-10}
/>

{/* SECONDARY FRONT LIGHT - Slightly angled for depth */}
<directionalLight
position={[6, 2, 30]}
intensity={0.08}
color="#ffffff"
/>

{/* TOP LIGHT - For text definition */}
<directionalLight
position={[0, 80, 4]} // Positioned above for top-down lighting
intensity={1.2}
color="#ffffff"
/>

{/* SIDE LIGHTS - For even illumination */}
<directionalLight
position={[-20, -5, -80]}
intensity={2}
color="#ffffff"

/>
<directionalLight
position={[-4, 2, 5]} // Positioned to the side for additional lighting
intensity={0.8}
color="#ffffff"
/>

{/* POINT LIGHTS - For additional brightness */}
<pointLight
position={[0, 0, 6]}
intensity={1.0}
color="#ffffff"
distance={15}
/>
<pointLight
position={[2, 2, 4]} // Positioned to the side for additional lighting
intensity={0.8}
color="#ffffff"
distance={12}
/>
<pointLight
position={[-2, 2, 4]} // Positioned to the side for additional lighting
intensity={0.8}
color="#ffffff"
distance={12}
/>
</>
);
};

  // PLATE FRAME BORDER RENDERING - Frame style around entire plate, adjusted for badge
  const renderPlateFrameBorder = () => {
    if (borderStyle === "none") return null;

    const selectedBorderObj = borderOptions.find((b) => b.key === borderStyle);
    if (!selectedBorderObj) return null;

    const borderColor = selectedBorderObj.color;
    const borderType = selectedBorderObj.type;
    const borderWidth = (selectedBorderObj.borderWidth || 2) * 0.02; // Border thickness

    if (borderColor === "transparent") return null;

    // FRAME MARGINS - adjust margins to leave space for badge outside
    const marginTop = 0.15;
    const marginBottom = 0.15;
    let marginLeft = 0.2;
    let marginRight = 0.2;

    if (hasBadge) {
      // Reduce margin on badge side to accommodate badge outside border
      if (badgePosition === "right") {
        marginLeft = 1.3; // Larger left margin for badge space
      } else if (badgePosition === "left") {
        marginLeft = 1.3; // Larger right margin for badge space
      }
    }

    // FRAME DIMENSIONS - plate size minus margins
    const frameWidth = dimensions.width - marginLeft - marginRight;
    const frameHeight = dimensions.height - marginTop - marginBottom;

    // FRAME POSITION - offset frame to center the usable area
    const frameOffsetX = hasBadge
      ? badgePosition === "left"
        ? (marginLeft - marginRight) / 2
        : (marginRight - marginLeft) / 2
      : 0;

    // ENHANCED material properties for frame borders
    const getBorderMaterial = () => {
      if (borderType === "crystal") {
        return {
          color: borderColor,
          metalness: 0.8,
          roughness: 0.1,
          clearcoat: 1.0,
          clearcoatRoughness: 0.02,
          envMapIntensity: 1.5,
          emissive: borderColor,
          emissiveIntensity: 0.2,
          transparent: false,
          opacity: 1.0,
        };
      } else if (borderType === "4d") {
        return {
          color: borderColor,
          metalness: 0.2,
          roughness: 0.3,
          clearcoat: 0.7,
          clearcoatRoughness: 0.1,
          envMapIntensity: 0.8,
          emissive: borderColor,
          emissiveIntensity: 0.1,
        };
      } else if (borderType === "printed") {
        return {
          color: borderColor,
          metalness: 0.05,
          roughness: 0.8,
          clearcoat: 0.3,
          clearcoatRoughness: 0.5,
          envMapIntensity: 0.4,
          emissive: borderColor,
          emissiveIntensity: 0.08,
        };
      } else {
        // Standard borders
        return {
          color: borderColor,
          metalness: 0.1,
          roughness: 0.5,
          clearcoat: 0.5,
          envMapIntensity: 0.6,
          emissive: borderColor,
          emissiveIntensity: 0.1,
        };
      }
    };

    const borderMaterial = getBorderMaterial();
    const actualBorderWidth = Math.max(borderWidth, 0.08);

    return (
      <group>
        {/* OUTER FRAME BORDER - around entire plate with offset */}
        <mesh
          position={[frameOffsetX, 0, dimensions.depth / 2 + 0.008]}
          receiveShadow={false}
          castShadow={false}
        >
          <primitive
            object={createRoundedBoxGeometry(
              frameWidth + actualBorderWidth * 2,
              frameHeight + actualBorderWidth * 2,
              0.025, // Frame thickness
              0.08
            )}
          />
          <meshStandardMaterial {...borderMaterial} />
        </mesh>

        {/* INNER CUTOUT - shows plate color inside frame with offset */}
        <mesh
          position={[frameOffsetX, 0, dimensions.depth / 2 + 0.012]}
          receiveShadow={false}
          castShadow={false}
        >
          <primitive
            object={createRoundedBoxGeometry(
              frameWidth,
              frameHeight,
              0.03, // Thick cutout
              0.05
            )}
          />
          <meshStandardMaterial
            color={plateColor}
            metalness={0.02}
            roughness={0.1}
            clearcoat={0.6}
            clearcoatRoughness={0.02}
            envMapIntensity={0.5}
            emissive={plateColor}
            emissiveIntensity={0.05}
          />
        </mesh>

        {/* CRYSTAL FRAME EFFECTS with offset */}
        {borderType === "crystal" && (
          <>
            {/* Primary glow around frame */}
            <mesh
              position={[frameOffsetX, 0, dimensions.depth / 2 + 0.005]}
              receiveShadow={false}
              castShadow={false}
            >
              <primitive
                object={createRoundedBoxGeometry(
                  frameWidth + actualBorderWidth * 6,
                  frameHeight + actualBorderWidth * 6,
                  0.008,
                  0.3
                )}
              />
              <meshStandardMaterial
                color={borderColor}
                transparent={true}
                opacity={0.3}
                emissive={borderColor}
                emissiveIntensity={0.5}
              />
            </mesh>

            {/* Secondary inner glow */}
            <mesh
              position={[frameOffsetX, 0, dimensions.depth / 2 + 0.006]}
              receiveShadow={false}
              castShadow={false}
            >
              <primitive
                object={createRoundedBoxGeometry(
                  frameWidth + actualBorderWidth * 3,
                  frameHeight + actualBorderWidth * 3,
                  0.01,
                  0.10
                )}
              />
              <meshStandardMaterial
                color={borderColor}
                transparent={true}
                opacity={0.5}
                emissive={borderColor}
                emissiveIntensity={0.7}
              />
            </mesh>
          </>
        )}

        {/* 4D RAISED FRAME EFFECT with offset */}
        {borderType === "4d" && (
          <>
            {/* 4D Raised border frame */}
            <mesh
              position={[frameOffsetX, 0, dimensions.depth / 2 + 0.018]}
              receiveShadow={false}
              castShadow={false}
            >
              <primitive
                object={createRoundedBoxGeometry(
                  frameWidth + actualBorderWidth * 2,
                  frameHeight + actualBorderWidth * 2,
                  actualBorderWidth * 0.8, // REDUCED from 1.5 to 0.8 - less thick
                  0.06
                )}
              />
              <meshStandardMaterial
                color={borderColor}
                metalness={0.3}
                roughness={0.1}
                clearcoat={0.8}
                clearcoatRoughness={0.05}
                envMapIntensity={1.0}
                emissive={borderColor}
                emissiveIntensity={0.1}
              />
            </mesh>

            {/* 4D Inner cutout */}
            <mesh
              position={[frameOffsetX, 0, dimensions.depth / 2 + 0.02]}
              receiveShadow={false}
              castShadow={false}
            >
              <primitive
                object={createRoundedBoxGeometry(
                  frameWidth,
                  frameHeight,
                  actualBorderWidth * 1.0, // REDUCED from 2.0 to 1.0
                  0.05
                )}
              />
              <meshStandardMaterial
                color={plateColor}
                metalness={0.02}
                roughness={0.1}
                clearcoat={0.6}
                clearcoatRoughness={0.02}
                envMapIntensity={0.5}
                emissive={plateColor}
                emissiveIntensity={0.05}
              />
            </mesh>
          </>
        )}

        {/* ENHANCED FRAME for printed/standard borders with offset */}
        {(borderType === "printed" || borderType === "standard") && (
          <>
            {/* Primary glow effect like crystal */}
            <mesh
              position={[frameOffsetX, 0, dimensions.depth / 2 + 0.005]}
              receiveShadow={false}
              castShadow={false}
            >
              <primitive
                object={createRoundedBoxGeometry(
                  frameWidth + actualBorderWidth * 4,
                  frameHeight + actualBorderWidth * 4,
                  0.008,
                  0.10
                )}
              />
              <meshStandardMaterial
                color={borderColor}
                transparent={true}
                opacity={0.2}
                emissive={borderColor}
                emissiveIntensity={0.3}
              />
            </mesh>

            {/* Secondary border outline */}
            <mesh
              position={[frameOffsetX, 0, dimensions.depth / 2 + 0.015]}
              receiveShadow={false}
              castShadow={false}
            >
              <primitive
                object={createRoundedBoxGeometry(
                  frameWidth + actualBorderWidth * 2.5,
                  frameHeight + actualBorderWidth * 2.5,
                  0.008,
                  0.60
                )}
              />
              <meshStandardMaterial
                color={borderColor}
                metalness={0.05}
                roughness={0.7}
                clearcoat={0.4}
                emissive={borderColor}
                emissiveIntensity={0.15}
              />
            </mesh>

            {/* Inner definition line */}
            <mesh
              position={[frameOffsetX, 0, dimensions.depth / 2 + 0.02]}
              receiveShadow={false}
              castShadow={false}
            >
              <primitive
                object={createRoundedBoxGeometry(
                  frameWidth + actualBorderWidth * 1.8,
                  frameHeight + actualBorderWidth * 1.8,
                  0.008,
                  0.55
                )}
              />
              <meshStandardMaterial
                color={borderColor}
                metalness={0.1}
                roughness={0.5}
                clearcoat={0.6}
                emissive={borderColor}
                emissiveIntensity={0.12}
              />
            </mesh>
          </>
        )}
      </group>
    );
  };

  // Badge rendering - POSITIONED OUTSIDE the border frame, in the margin area
  const renderCountryBadge = () => {
    if (
      !selectedCountry ||
      selectedCountry === "none" ||
      !countryBadge ||
      countryBadge === "none"
    )
      return null;

    const flagData = flagOptions[selectedCountry]?.find(
      (f) => f.key === countryBadge
    );

    if (!flagData) return null;

    const flagText =
      countryBadge === "custom-upload" ? customFlagText : flagData.text;

    // Badge dimensions like reference images
    const badgeWidth = 1.0 * dimensions.scale;
    const badgeHeight = dimensions.height * 0.85; // Slightly smaller than plate height

    // POSITION OUTSIDE the border frame, in the margin area we created
    const plateEdgeDistance = dimensions.width / 2;
    const badgeDistance = plateEdgeDistance - 0.7; // Position in the margin area

    const xPosition =
      badgePosition === "right"
        ? badgeDistance // Right side, in the right margin
        : -badgeDistance; // Left side, in the left margin

    // Badge Z position - HIGHEST to show above everything including borders
    const badgeZ = is4dBorder
      ? dimensions.depth / 2 + 0.1
      : dimensions.depth / 2 + 0.01;
    const position = [xPosition, 0, badgeZ];

    return (
      <group>
        {/* Badge background - OUTSIDE border frame, in margin area */}
        <mesh position={position}>
          <primitive
            object={createRoundedBoxGeometry(
              badgeWidth,
              badgeHeight,
              0.025,
              0.04
            )}
          />
          <meshStandardMaterial
            color={badgeBorderColor}
            metalness={0.1}
            roughness={0.4}
            emissive={badgeBorderColor}
            emissiveIntensity={0.08}
          />
        </mesh>

        {/* Flag area - TOP 60% of badge like reference */}
        <mesh
          position={[
            position[0], // Centered horizontally
            position[1] + badgeHeight * 0.18, // Upper portion - higher up
            position[2] + 0.015, // Above badge background
          ]}
        >
          <primitive
            object={createRoundedBoxGeometry(
              badgeWidth * 0.88, // Wider flag area
              badgeHeight * 0.52, // 52% height for flag
              0.012,
              0.02
            )}
          />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>

        {/* Flag image - CENTERED in flag area */}
{flagData.flagImage && (
  <mesh
    position={[
      position[0], // X
      position[1] + badgeHeight * 0.18, // Y
      position[2] + 0.04, // Z (on top of badge background)
    ]}
  >
    <planeGeometry args={[badgeWidth * 0.82, badgeHeight * 0.48]} />
    <meshBasicMaterial
      attach="material"
      transparent={true}
      toneMapped={false} // ✅ Fix white blur
      side={THREE.DoubleSide} // ✅ Show on both sides
      map={(() => {
        const texture = new THREE.TextureLoader().load(flagData.flagImage);
        // texture.flipY = false; // ✅ Correct orientation
        texture.encoding = THREE.sRGBEncoding; // ✅ Preserve original color
        return texture;
      })()}
    />
  </mesh>
)}



        {/* {flagData.flagImage && (
          <mesh
            position={[
              position[0], // X
              position[1] + badgeHeight * 0.18, // Y
              position[2] + 0.05, // ✅ Z (above background & border)
            ]}
          >
            <planeGeometry args={[badgeWidth * 0.82, badgeHeight * 0.48]} />
            <meshBasicMaterial transparent={true}>
              <primitive
                object={(() => {
                  const texture = new THREE.TextureLoader().load(
                    flagData.flagImage
                  );
                  // texture.flipY = false;
                  // texture.encoding = THREE.sRGBEncoding;
                  return texture;
                })()}
                attach="map"
              />
            </meshBasicMaterial>
          </mesh>
        )} */}

        {/* Custom flag image - CENTERED */}
        {/* {countryBadge === "custom-upload" && customFlagImage && (
          <mesh
           position={[
    position[0],                             // X
    position[1] + badgeHeight * 0.18,        // Y
    position[2] + 0.05,                      // ✅ Z (above background & border)
  ]}
          >
            <planeGeometry args={[badgeWidth * 0.78, badgeHeight * 0.44]} />
            <meshBasicMaterial transparent={true}>
              <primitive
                object={(() => {
                  const texture = new THREE.TextureLoader().load(customFlagImage);
                  // texture.flipY = false;
                  texture.encoding = THREE.sRGBEncoding;
                  return texture;
                })()}
                attach="map"
              />
            </meshBasicMaterial>
          </mesh>
        )} */}
        {countryBadge === "custom-upload" && customFlagImage && (
          <mesh
            position={[
              position[0], // X
              position[1] + badgeHeight * 0.18, // Y
              position[2] + 0.06, // ✅ Z (above everything)
            ]}
          >
            <planeGeometry args={[badgeWidth * 0.78, badgeHeight * 0.44]} />
            <meshBasicMaterial
              attach="material"
              transparent={true}
              toneMapped={false} // ✅ Prevents white blur
              side={THREE.DoubleSide} // ✅ Ensures it renders from both sides
              map={(() => {
                const texture = new THREE.TextureLoader().load(customFlagImage);
                // texture.flipY = false;              // ✅ Keep orientation correct
                texture.encoding = THREE.sRGBEncoding; // ✅ Keeps original image color
                return texture;
              })()}
            />
          </mesh>
        )}

        {/* Country code text - BOTTOM 40% like reference "UK" */}
        <Text3D
          font={badgefontUrl}
          size={0.15 * dimensions.scale} // Appropriate text size for badge
          height={0.015} // Good thickness
          position={[
            position[0] - (flagText.length * 0.075 * dimensions.scale) / 1.1, // PERFECT CENTER
            position[1] - badgeHeight * 0.26, // Bottom portion of badge
            position[2] + 0.02, // Above badge background
          ]}
          bevelEnabled={true}
          bevelThickness={0.003}
          bevelSize={0.002}
        >
          {flagText}
          <meshStandardMaterial
            color={customTextColor || "#FFFFFF"} // White text like reference
            metalness={0.1}
            roughness={0.3}
            clearcoat={0.6}
            emissive={customTextColor || "#FFFFFF"}
            emissiveIntensity={0.05}
          />
        </Text3D>
      </group>
    );
  };

  const cameraDistance =
    Math.max(dimensions.width, dimensions.height) * 0.8 + 2;

  return (
    <Canvas
      style={{
        height: "300px",
        // background:
        //   "linear-gradient(135deg, rgb(238, 237, 232) 0%, #e9ecef 100%)",
        // borderRadius: "10px",
        backgroundColor: "#ffffff", // Light background for contrast
        border: "2px solid #FFD320",
      }}
      camera={{ position: [0, 0, cameraDistance], fov: 35 }}
      shadows
    >
      {getLighting()}
      <OrbitControls
        enableZoom={true}
        minDistance={6}
        maxDistance={25}
        enablePan={true}
        autoRotate={false}
        enableDamping={true}
        dampingFactor={0.08}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.5}
        target={[0, 0, 0]}
      />

      {/* Render PLATE FRAME border (not text border) */}
      {renderPlateFrameBorder()}
      {renderCountryBadge()}

      {/* MAIN PLATE - NO shadows to prevent back plate shadow */}
      <mesh position={[0, 0, 0]} receiveShadow={false} castShadow={false}>
        <primitive
          object={createRoundedBoxGeometry(
            dimensions.width,
            dimensions.height,
            dimensions.depth,
            0.09
          )}
        />
        <meshStandardMaterial
          color={plateColor} // Always original plate color
          metalness={0.02}
          roughness={0.1}
          clearcoat={0.6}
          clearcoatRoughness={0.02}
          envMapIntensity={0.5}
          emissive={plateColor}
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Built-in outline effects from plate style - ELEVATED for 4D borders */}
      {builtInOutlineColor && (
        <Text3D
          font={fontUrl}
          size={fontSize * 1.07}
          height={plateThickness * 0.9}
          position={[
            textPosition[0] - 0.04,
            textPosition[1] - 0.008,
            textPosition[2] - 0.01, // Slightly behind main text
          ]}
          bevelEnabled={true}
          bevelThickness={plateThickness * 0.05}
          bevelSize={plateThickness * 0.02}
          curveSegments={8}
        >
          {text}
          <meshStandardMaterial
            color={builtInOutlineColor}
            metalness={0.1}
            roughness={0.4}
          />
        </Text3D>
      )}

      {/* Main text - NOW PROPERLY ELEVATED for 4D borders */}
      <Text3D
        font={fontUrl}
        size={fontSize * 1.05}
        height={plateThickness * 1.6}
        position={textPosition} // Uses the elevated Z-position for 4D borders
        bevelEnabled={true}
        bevelThickness={plateThickness * 0.05}
        bevelSize={plateThickness * 0.02}
        curveSegments={16}
      >
        {text}
        <meshStandardMaterial
          color={finalFontColor}
          metalness={0.1}
          roughness={0.2}
          clearcoat={0.7}
          clearcoatRoughness={0.05}
          envMapIntensity={0.6}
          emissive={finalFontColor}
          emissiveIntensity={0.03}
        />
      </Text3D>
    </Canvas>
  );
};

export default PlatePreview;
