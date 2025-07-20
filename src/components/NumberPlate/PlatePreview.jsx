import React, { useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
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
  const plateColor = plateType === "front" ? "#ffffff" : "#FFD320";
  const finalFontColor = customFontColor || fontColor;
  const canvasRef = useRef();

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
    "18-oblong": { width: 5.9, height: 1.4, depth: 0.03, scale: 1 },
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

  // WebGL context recovery - ONLY NEW ADDITION
  useEffect(() => {
    const handleContextLost = (event) => {
      console.warn('WebGL context lost. Preventing default behavior.');
      event.preventDefault();
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored.');
      // Force re-render if needed
      if (canvasRef.current) {
        const canvas = canvasRef.current.querySelector('canvas');
        if (canvas) {
          canvas.style.display = 'none';
          setTimeout(() => {
            canvas.style.display = 'block';
          }, 100);
        }
      }
    };

    const canvas = canvasRef.current?.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      }
    };
  }, []);

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

  // Text positioning calculation with Y-AXIS CENTERING
  const getTextPosition = () => {
    const estimatedCharWidth = fontSize * 0.45
    const totalTextWidth = text.length * estimatedCharWidth;

    let xPosition = 0;

    if (hasBadge) {
      // Text should be positioned in the usable area (inside the border frame)
      // Since border frame is offset, position text within that area
      const frameOffsetX = badgePosition === "left" ? -0.7 : -1.3; // Offset text away from badge side plate text center 
      xPosition = frameOffsetX - totalTextWidth / 2;
    } else {
      // No badge: center text perfectly on plate
      xPosition = -(totalTextWidth / 1.1);
    }

    // Y-AXIS CENTERING - CHANGED FROM -0.28 TO 0
    const yPosition = -0.35; // Perfect vertical center of the plate

    // CRITICAL FIX: Elevate text Z-position for ALL borders to appear above frames
    const baseZ = dimensions.depth / 2 + 0.015;
    let textZ = baseZ;
    
    // Adjust Z position based on border type to ensure text is always visible
    if (selectedBorderObj) {
      const borderType = selectedBorderObj.type;
      if (borderType === "4d") {
        textZ = baseZ + 0.1; // Much higher for 4D borders
      } else if (borderType === "crystal") {
        textZ = baseZ + 0.03; // Higher for crystal borders
      } else if (borderType === "printed" || borderType === "standard") {
        textZ = baseZ + 0.03; // Higher for printed/standard borders
      } else {
        textZ = baseZ + 0.03; // Slightly higher for any other border
      }
    }

    return [xPosition, yPosition, textZ]; // Y-axis now centered at 0
  };

  const textPosition = getTextPosition();

// Enhanced lighting function for bright front illumination
const getLighting = () => {
  return (
    <>
      {/* Enhanced ambient light for overall brightness */}
      <ambientLight intensity={3} color="#F5F5F5" />

      {/* PRIMARY FRONT LIGHT - Direct bright illumination */}
      <directionalLight
        position={[-7, -4, 60]} // Positioned directly in front
        intensity={0.40} // High intensity for bright effect
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
        intensity={0.1}
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
        color="#757575"
        distance={15}
      />
      <pointLight
        position={[2, 2, 4]} // Positioned to the side for additional lighting
        intensity={0.8}
        color="#757575"
        distance={12}
      />
      <pointLight
        position={[-2, 2, 4]} // Positioned to the side for additional lighting
        intensity={0.8}
        color="#757575"
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
        marginLeft = 0.8; // Larger left margin for badge space
      } else if (badgePosition === "left") {
        marginLeft = 0.8; // Larger right margin for badge space
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

        {/* ENHANCED FRAME for printed/standard borders with offset - RESTORED ORIGINAL */}
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
    const badgeWidth = 0.6 * dimensions.scale;
    const badgeHeight = dimensions.height * 0.85; // Slightly smaller than plate height

    // POSITION OUTSIDE the border frame, in the margin area we created
    const plateEdgeDistance = dimensions.width / 2;
    const badgeDistance = plateEdgeDistance - 0.43; // Position in the margin area

    const xPosition =
      badgePosition === "right"
        ? badgeDistance // Right side, in the right margin
        : -badgeDistance; // Left side, in the left margin

    // Badge Z position - HIGHEST to show above everything including borders
    const badgeZ = is4dBorder
      ? dimensions.depth / 2 + 0.01
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

        {/* Flag image - CENTERED in flag area */}
        {flagData.flagImage && (
          <mesh
            position={[
              position[0], // X
              position[1] + badgeHeight * 0.08, // Y
              position[2] + 0.04, // Z (on top of badge background)
            ]}
          >
            <planeGeometry args={[badgeWidth * 0.82, badgeHeight * 0.68]} />
            <meshBasicMaterial
              attach="material"
              transparent={true}
              toneMapped={false} // ✅ Fix white blur
              side={THREE.DoubleSide} // ✅ Show on both sides
              map={(() => {
                try {
                  const texture = new THREE.TextureLoader().load(
                    flagData.flagImage,
                    undefined,
                    undefined,
                    (error) => {
                      console.warn('Flag image failed to load:', error);
                    }
                  );
                  texture.encoding = THREE.sRGBEncoding;
                  return texture;
                } catch (error) {
                  console.warn('Error creating flag texture:', error);
                  return null;
                }
              })()}
            />
          </mesh>
        )}

        {/* Custom flag image - CENTERED */}
        {countryBadge === "custom-upload" && customFlagImage && (
          <mesh
            position={[
              position[0], // X
              position[1] + badgeHeight * 0.08, // Y
              position[2] + 0.04, // ✅ Z (above everything)
            ]}
          >
            <planeGeometry args={[badgeWidth * 0.82, badgeHeight * 0.68]} />
            <meshBasicMaterial
              attach="material"
              transparent={true}
              toneMapped={false} // ✅ Prevents white blur
              side={THREE.DoubleSide} // ✅ Ensures it renders from both sides
              map={(() => {
                try {
                  const texture = new THREE.TextureLoader().load(
                    customFlagImage,
                    undefined,
                    undefined,
                    (error) => {
                      console.warn('Custom flag image failed to load:', error);
                    }
                  );
                  texture.encoding = THREE.sRGBEncoding;
                  return texture;
                } catch (error) {
                  console.warn('Error creating custom flag texture:', error);
                  return null;
                }
              })()}
            />
          </mesh>
        )}

        {/* Country code text - BOTTOM 40% like reference "UK" */}
        <Suspense fallback={null}>
          <Text3D
            font={badgefontUrl}
            size={0.15 * dimensions.scale} // Appropriate text size for badge
            height={0.015} // Good thickness
            position={[
              position[0] - (flagText.length * 0.075 * dimensions.scale) / 1.4, // PERFECT CENTER
              position[1] - badgeHeight * 0.44, // Bottom portion of badge
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
        </Suspense>
      </group>
    );
  };

  const cameraDistance =
    Math.max(dimensions.width, dimensions.height) * 0.5 + 2;

  // Error boundary component
  const ErrorFallback = () => (
    <div 
      style={{
        height: "300px",
        backgroundColor: "#ffffff",
        border: "2px solid #FFD320",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <div style={{ textAlign: "center", color: "#6c757d" }}>
        <h5>Preview Temporarily Unavailable</h5>
        <p>3D preview is loading...</p>
        <small>Your configuration is saved and will be applied to your order</small>
      </div>
    </div>
  );

  try {
    return (
      <div ref={canvasRef}>
        <Canvas
          style={{
            height: "300px",
            backgroundColor: "#F5F5F5", // Light background for contrast
            border: "2px solid #FFD320",
          }}
          camera={{ position: [0, 0, cameraDistance], fov: 35 }}
          shadows
          gl={{
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: false,
            powerPreference: "default",
          }}
          onError={(error) => {
            console.error('Canvas error:', error);
          }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            {getLighting()}
            <OrbitControls
              enableZoom={true}
              minDistance={5.1}
              maxDistance={50}
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

            {/* MAIN PLATE - Keeps original color (white/yellow) on BOTH sides */}
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
                color={plateColor} // Original plate color (white for front, yellow for rear)
                metalness={0.02}
                roughness={0.1}
                clearcoat={0.6}
                clearcoatRoughness={0.02}
                envMapIntensity={0.5}
                emissive={plateColor}
                emissiveIntensity={0.05}
              />
            </mesh>

            {/* BORDER FRAME - Only shows as edge outline, not full backing */}
            <mesh position={[0, 0, 0]} receiveShadow={false} castShadow={false}>
              <primitive
                object={(() => {
                  // Create border frame geometry - hollow in the middle
                  const outerShape = new THREE.Shape();
                  const innerShape = new THREE.Shape();
                  
                  // Outer border shape
                  const outerWidth = dimensions.width + 0.04;
                  const outerHeight = dimensions.height + 0.04;
                  const outerRadius = 0.09;
                  const outerX = outerWidth / 2 - outerRadius;
                  const outerY = outerHeight / 2 - outerRadius;
                  
                  outerShape.moveTo(-outerX, -outerY + outerRadius);
                  outerShape.lineTo(-outerX, outerY - outerRadius);
                  outerShape.quadraticCurveTo(-outerX, outerY, -outerX + outerRadius, outerY);
                  outerShape.lineTo(outerX - outerRadius, outerY);
                  outerShape.quadraticCurveTo(outerX, outerY, outerX, outerY - outerRadius);
                  outerShape.lineTo(outerX, -outerY + outerRadius);
                  outerShape.quadraticCurveTo(outerX, -outerY, outerX - outerRadius, -outerY);
                  outerShape.lineTo(-outerX + outerRadius, -outerY);
                  outerShape.quadraticCurveTo(-outerX, -outerY, -outerX, -outerY + outerRadius);
                  
                  // Inner cutout shape (same as main plate)
                  const innerWidth = dimensions.width;
                  const innerHeight = dimensions.height;
                  const innerRadius = 0.09;
                  const innerX = innerWidth / 2 - innerRadius;
                  const innerY = innerHeight / 2 - innerRadius;
                  
                  innerShape.moveTo(-innerX, -innerY + innerRadius);
                  innerShape.lineTo(-innerX, innerY - innerRadius);
                  innerShape.quadraticCurveTo(-innerX, innerY, -innerX + innerRadius, innerY);
                  innerShape.lineTo(innerX - innerRadius, innerY);
                  innerShape.quadraticCurveTo(innerX, innerY, innerX, innerY - innerRadius);
                  innerShape.lineTo(innerX, -innerY + innerRadius);
                  innerShape.quadraticCurveTo(innerX, -innerY, innerX - innerRadius, -innerY);
                  innerShape.lineTo(-innerX + innerRadius, -innerY);
                  innerShape.quadraticCurveTo(-innerX, -innerY, -innerX, -innerY + innerRadius);
                  
                  // Create hole in outer shape
                  outerShape.holes.push(innerShape);
                  
                  const extrudeSettings = {
                    depth: dimensions.depth * 1.2, // Very thin border
                    bevelEnabled: false,
                  };
                  
                  return new THREE.ExtrudeGeometry(outerShape, extrudeSettings);
                })()}
              />
              <meshStandardMaterial
                // color="#3a3a3a" // Dark gray border
                color="#757575" // Dark gray border
                metalness={0.2}
                roughness={0.3}
                clearcoat={0.4}
                clearcoatRoughness={0.1}
                envMapIntensity={0.4}
                emissive="#2a2a2a"
                emissiveIntensity={0.02}
              />
            </mesh>

            {/* Built-in outline effects from plate style - ELEVATED for ALL borders */}
            {builtInOutlineColor && (
              <Suspense fallback={null}>
                <Text3D
                  font={fontUrl}
                  size={fontSize * 1.07}
                  height={plateThickness * 0.9}
                  position={[
                    textPosition[0] - 0.04,
                    textPosition[1] - 0.008, // Use same Y position as main text
                    textPosition[2] + 0.01, // ABOVE main text, higher Z
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
              </Suspense>
            )}

            {/* Main text - NOW PROPERLY ELEVATED for ALL borders with Y-AXIS CENTERED */}
            <Suspense fallback={null}>
              <Text3D
                font={fontUrl}
                size={fontSize * 1.05}
                height={plateThickness * 1.6}
                position={textPosition} // Uses the Y-centered position (0 instead of -0.28)
                bevelEnabled={true}
                bevelThickness={plateThickness * 0.05}
                bevelSize={plateThickness * 0.02}
                curveSegments={16}
              >
                {text}
                <meshStandardMaterial
                  // color={finalFontColor}
                  color="#181818"
                  metalness={0.1}
                  roughness={0.2}
                  clearcoat={0.7}
                  clearcoatRoughness={0.05}
                  envMapIntensity={0.6}
                  emissive={finalFontColor}
                  emissiveIntensity={0.03}
                />
              </Text3D>
            </Suspense>
          </Suspense>
        </Canvas>
      </div>
    );
  } catch (error) {
    console.error('PlatePreview error:', error);
    return <ErrorFallback />;
  }
};

export default PlatePreview;