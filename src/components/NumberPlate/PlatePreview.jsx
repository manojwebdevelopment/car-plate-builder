import React from "react";
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

  // Plate dimensions based on vehicle type
  const plateDimensions = {
    "18-oblong": { width: 8.5, height: 2.0, depth: 0.03, scale: 1.0 },
    "21-oblong": { width: 10.0, height: 2.0, depth: 0.03, scale: 1.0 },
    "4x4": { width: 8.5, height: 2.0, depth: 0.03, scale: 1.0 },
  };

  const dimensions =
    plateDimensions[selectedSize] || plateDimensions["18-oblong"];

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

  // Dynamic font size calculation based on text length and plate width
  const calculateFontSize = () => {
    const baseSize = selectedPlateObj?.fontSize || 0.85;
    const textLength = text.length;

    let availableWidth = dimensions.width - 0.3;

    const hasBadge = selectedCountry !== "none" && countryBadge !== "none";
    if (hasBadge) {
      const badgeWidth = 1.4 * dimensions.scale;
      availableWidth = availableWidth - badgeWidth - 0.15;
    }

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

  // Improved text positioning calculation
  const getTextPosition = () => {
    const hasBadge = selectedCountry !== "none" && countryBadge !== "none";

    const estimatedCharWidth = fontSize * 0.45;
    const totalTextWidth = text.length * estimatedCharWidth;

    let xPosition = 0;

    if (hasBadge) {
      const badgeWidth = 1.4 * dimensions.scale;
      const margin = 0.2;

      if (badgePosition === "left") {
        const badgeRightEdge = -dimensions.width / 2 + badgeWidth + margin;
        const availableRightSpace = dimensions.width / 2 - badgeRightEdge;
        const textAreaCenter = badgeRightEdge + availableRightSpace / 2;
        xPosition = textAreaCenter - totalTextWidth / 2;
      } else {
        const badgeLeftEdge = dimensions.width / 2 - badgeWidth - margin;
        const availableLeftSpace = badgeLeftEdge - -dimensions.width / 2;
        const textAreaCenter = -dimensions.width / 2 + availableLeftSpace / 2;
        xPosition = textAreaCenter - totalTextWidth / 2;
      }
    } else {
      xPosition = -(totalTextWidth / 2);
    }

    return [xPosition, 0, dimensions.depth / 2 + 0.015];
  };

  const textPosition = getTextPosition();

  // Enhanced lighting function for bright front illumination
  const getLighting = () => {
    return (
      <>
        {/* Enhanced ambient light for overall brightness */}
        <ambientLight intensity={1} color="#ffffff" />

        {/* PRIMARY FRONT LIGHT - Direct bright illumination */}
        <directionalLight
          position={[-12, -1, 80]} // Positioned directly in front
          intensity={0.9} // High intensity for bright effect
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
          position={[1, 3, 20]}
          intensity={0.5}
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

  // Border rendering - THIN 1MM BORDER WITH 1MM MARGIN
  const renderBorder = () => {
    if (borderStyle === "none") return null;

    const selectedBorderObj = borderOptions.find((b) => b.key === borderStyle);
    if (!selectedBorderObj) return null;

    const borderColor = selectedBorderObj.color;
    if (
      borderColor === "transparent" ||
      (plateColor === "#FFFFFF" && borderColor === "#FFFFFF") ||
      (plateColor === "#FFD320" && borderColor === "#FFD700")
    ) {
      return null;
    }

    const borderMargin = 0.05; // 1mm margin on all sides
    const borderThickness = 0.05; // 1mm border thickness
    const hasBadge = selectedCountry !== "none" && countryBadge !== "none";

    if (hasBadge) {
      const textAreaWidth = dimensions.width - 1.5;
      const xOffset = badgePosition === "left" ? 0.75 : -0.75;

      return (
        <group>
          {/* Border frame - THIN 1mm border with 1mm margin */}
          <mesh
            position={[xOffset, 0, 0.001]} // Same Z as main plate
            receiveShadow
          >
            <primitive
              object={createRoundedBoxGeometry(
                textAreaWidth + borderMargin * 2, // 1mm margin on each side
                dimensions.height + borderMargin * 2, // 1mm margin on each side
                dimensions.depth, // Same thickness as main plate
                0.06
              )}
            />
            <meshStandardMaterial
              color={borderColor} // Border color
              metalness={0.2}
              roughness={0.3}
              clearcoat={0.3}
            />
          </mesh>

          {/* Inner cutout - creates thin frame effect */}
          <mesh
            position={[xOffset, 0, 0.001]} // Slightly in front
          >
            <primitive
              object={createRoundedBoxGeometry(
                textAreaWidth - borderThickness * 2, // Reduce by border thickness
                dimensions.height - borderThickness * 2, // Reduce by border thickness
                dimensions.depth + 0.002, // Slightly thicker to ensure cutout
                0.05
              )}
            />
            <meshStandardMaterial
              color={plateColor} // Same as main plate color
              metalness={0.02}
              roughness={0.1}
              clearcoat={0.6}
              clearcoatRoughness={0.02}
              envMapIntensity={0.5}
              emissive={plateColor}
              emissiveIntensity={0.05}
            />
          </mesh>
        </group>
      );
    }

    return (
      <group>
        {/* Border frame - THIN 1mm border with 1mm margin */}
        <mesh
          position={[0, 0, 0.001]} // Same Z as main plate
          receiveShadow
        >
          <primitive
            object={createRoundedBoxGeometry(
              dimensions.width + borderMargin * 2, // 1mm margin on each side
              dimensions.height + borderMargin * 2, // 1mm margin on each side
              dimensions.depth, // Same thickness as main plate
              0.06
            )}
          />
          <meshStandardMaterial
            color={borderColor} // Border color
            metalness={0.2}
            roughness={0.3}
            clearcoat={0.3}
          />
        </mesh>

        {/* Inner cutout - creates thin frame effect */}
        <mesh
          position={[0, 0, 0.001]} // Slightly in front
        >
          <primitive
            object={createRoundedBoxGeometry(
              dimensions.width - borderThickness * 2, // Reduce by border thickness
              dimensions.height - borderThickness * 2, // Reduce by border thickness
              dimensions.depth + 0.002, // Slightly thicker to ensure cutout
              0.05
            )}
          />
          <meshStandardMaterial
            color={plateColor} // Same as main plate color
            metalness={0.02}
            roughness={0.1}
            clearcoat={0.6}
            clearcoatRoughness={0.02}
            envMapIntensity={0.5}
            emissive={plateColor}
            emissiveIntensity={0.05}
          />
        </mesh>
      </group>
    );
  };

  // Badge rendering - Adjusted for single plate thickness
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
    const badgeWidth = 1.1 * dimensions.scale;
    const badgeHeight = dimensions.height * 0.8;

    const xPosition =
      badgePosition === "right"
        ? dimensions.width / 2 - badgeWidth / 2 - 0.1
        : -dimensions.width / 2 + badgeWidth / 2 + 0.1;

    const position = [xPosition, 0, dimensions.depth / 2 + 0.01]; // On top of single plate

    return (
      <group>
        {/* Badge background */}
        <mesh position={position}>
          <primitive
            object={createRoundedBoxGeometry(
              badgeWidth,
              badgeHeight,
              0.02,
              0.04
            )}
          />
          <meshStandardMaterial
            color={badgeBorderColor}
            metalness={0.1}
            roughness={0.4}
          />
        </mesh>

        {/* Flag area */}
        <mesh
          position={[
            position[0],
            position[1] + badgeHeight * 0.1,
            position[2] + 0.01,
          ]}
        >
          <primitive
            object={createRoundedBoxGeometry(
              badgeWidth * 0.9,
              badgeHeight * 0.6,
              0.008,
              0.02
            )}
          />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>

        {/* Flag image */}
        {flagData.flagImage && (
          <mesh
            position={[
              position[0],
              position[1] + badgeHeight * 0.1,
              position[2] + 0.015,
            ]}
          >
            <planeGeometry args={[badgeWidth * 0.9, badgeHeight * 0.6]} />
            <meshBasicMaterial transparent={true}>
              <primitive
                object={(() => {
                  const texture = new THREE.TextureLoader().load(
                    flagData.flagImage
                  );
                  texture.flipY = false;
                  return texture;
                })()}
                attach="map"
              />
            </meshBasicMaterial>
          </mesh>
        )}

        {/* Custom flag image */}
        {countryBadge === "custom-upload" && customFlagImage && (
          <mesh
            position={[
              position[0],
              position[1] + badgeHeight * 0.1,
              position[2] + 0.015,
            ]}
          >
            <planeGeometry args={[badgeWidth * 0.85, badgeHeight * 0.55]} />
            <meshBasicMaterial transparent={true}>
              <primitive
                object={(() => {
                  const texture = new THREE.TextureLoader().load(
                    customFlagImage
                  );
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
          size={0.16 * dimensions.scale}
          height={0.008}
          position={[
            position[0] - (flagText.length * 0.08 * dimensions.scale) / 2,
            position[1] - badgeHeight * 0.4,
            position[2] + 0.02,
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
      "3d": { metalness: 0.2, roughness: 0.2, clearcoat: 0.6 },
      "4d": { metalness: 0.1, roughness: 0.3, clearcoat: 0.3 },
      "4d-neon-gel": { metalness: 0.3, roughness: 0.2, clearcoat: 0.7 },
      "5d-gel": { metalness: 0.4, roughness: 0.1, clearcoat: 0.8 },
      laser: { metalness: 0.05, roughness: 0.5, clearcoat: 0.2 },
      "carbon-fiber": { metalness: 0.5, roughness: 0.3, clearcoat: 0.6 },
      standard: { metalness: 0.1, roughness: 0.4, clearcoat: 0.3 },
    };
    return (
      materialMap[style] || { metalness: 0.1, roughness: 0.4, clearcoat: 0.3 }
    );
  };

  const materialProps = getMaterialProps(plateStyle);
  const cameraDistance =
    Math.max(dimensions.width, dimensions.height) * 0.8 + 4;

  return (
    <Canvas
      style={{
        height: "450px",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        borderRadius: "10px",
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

      {renderBorder()}
      {renderCountryBadge()}

      {/* MAIN PLATE - Single plate thickness */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <primitive
          object={createRoundedBoxGeometry(
            dimensions.width,
            dimensions.height,
            dimensions.depth, // Single plate thickness - NOT multiplied
            0.09 // Increased radius for more visible rounded corners
          )}
        />
        <meshStandardMaterial
          color={plateColor} // ALWAYS use original plateColor (white for front, yellow for back)
          metalness={0.02} // Very low metalness for bright matte finish
          roughness={0.1} // Very smooth surface for maximum light reflection
          clearcoat={0.6} // High clearcoat for glossy finish
          clearcoatRoughness={0.02}
          envMapIntensity={0.5}
          // Enhanced for bright front lighting
          emissive={plateColor} // ALWAYS use original plateColor for emissive
          emissiveIntensity={0.05} // Slight self-illumination
        />
      </mesh>

      {/* Minimal shadow effects - only outline option */}
      {shadowEffect === "colored-outline" && (
        <Text3D
          font={fontUrl}
          size={fontSize * 1.02}
          height={thickness * 0.8}
          position={[
            textPosition[0] - 0.005,
            textPosition[1] - 0.005,
            textPosition[2] - 0.003,
          ]}
          bevelEnabled={true}
          bevelThickness={thickness * 0.05}
          bevelSize={thickness * 0.02}
          curveSegments={8}
        >
          {text}
          <meshStandardMaterial
            color={outlineColor}
            metalness={0.1}
            roughness={0.4}
          />
        </Text3D>
      )}

      {/* Enhanced 3D text with bright front lighting */}
      <Text3D
        font={fontUrl}
        size={fontSize}
        height={thickness * 1.5} // Increased text height
        position={textPosition}
        bevelEnabled={true}
        bevelThickness={thickness * 0.12} // Enhanced bevel
        bevelSize={thickness * 0.06}
        curveSegments={16} // Smoother curves
      >
        {text}
        <meshStandardMaterial
          color={finalFontColor}
          metalness={0.1} // Low metalness for bright appearance
          roughness={0.2} // Smooth for light reflection
          clearcoat={0.7} // High clearcoat for glossy finish
          clearcoatRoughness={0.05}
          envMapIntensity={0.6}
          // Enhanced for bright front lighting
          emissive={finalFontColor}
          emissiveIntensity={0.03} // Slight self-illumination for text
        />
      </Text3D>
    </Canvas>
  );
};

export default PlatePreview;
