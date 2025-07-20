import React from 'react';
import PlatePreview from './PlatePreview';
import { thicknessOptions } from '../../config/PlateJson';
// ===============================
// DualPlateView.js - Clean Dual Plate Display Component
// ===============================

const DualPlateView = ({ 
    plateText, 
    plateStyle, 
    selectedThickness, 
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
    const selectedThicknessObj = thicknessOptions.find((t) => t.key === selectedThickness);

    return (
        <div className="row g-3">
            {/* Front Plate */}
            <div className="col-12">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-primary text-white text-center py-2">
                        <h6 className="mb-0 fw-bold small">
                            <span className="badge bg-light text-primary rounded-circle me-2">●</span>
                            Front Plate (White)
                        </h6>
                    </div>
                    <div className="card-body p-3">
                        <PlatePreview
                            text={plateText}
                            plateType="front"
                            plateStyle={plateStyle}
                            thickness={selectedThicknessObj?.value || 0.25}
                            fontColor={fontColor}
                            shadowEffect={shadowEffect}
                            borderStyle={borderStyle}
                            customFontColor={customFontColor}
                            countryBadge={countryBadge}
                            selectedCountry={selectedCountry}
                            badgePosition={badgePosition}
                            badgeBorderColor={badgeBorderColor}
                            customFlagText={customFlagText}
                            customFlagImage={customFlagImage}
                            customTextColor={customTextColor}
                            outlineColor={outlineColor}
                            selectedSize={selectedSize}
                        />
                    </div>
                </div>
            </div>

            {/* Rear Plate */}
            <div className="col-12">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-warning text-dark text-center py-2">
                        <h6 className="mb-0 fw-bold small">
                            <span className="badge bg-dark text-warning rounded-circle me-2">●</span>
                            Rear Plate (Yellow)
                        </h6>
                    </div>
                    <div className="card-body p-3">
                        <PlatePreview
                            text={plateText}
                            plateType="rear"
                            plateStyle={plateStyle}
                            thickness={selectedThicknessObj?.value || 0.25}
                            fontColor={fontColor}
                            shadowEffect={shadowEffect}
                            borderStyle={borderStyle}
                            customFontColor={customFontColor}
                            countryBadge={countryBadge}
                            selectedCountry={selectedCountry}
                            badgePosition={badgePosition}
                            badgeBorderColor={badgeBorderColor}
                            customFlagText={customFlagText}
                            customFlagImage={customFlagImage}
                            customTextColor={customTextColor}
                            outlineColor={outlineColor}
                            selectedSize={selectedSize}
                        />
                    </div>
                </div>
            </div>

            {/* Plate Info */}
            <div className="col-12">
                <div className="card bg-light border-0">
                    <div className="card-body p-3">
                        <h6 className="fw-bold mb-2 small">Plate Information</h6>
                        <div className="row g-2 small text-muted">
                            <div className="col-6">
                                <strong>Text:</strong> {plateText}
                            </div>
                            <div className="col-6">
                                <strong>Style:</strong> {plateStyle}
                            </div>
                            <div className="col-6">
                                <strong>Thickness:</strong> {selectedThickness}
                            </div>
                            <div className="col-6">
                                <strong>Size:</strong> {selectedSize}
                            </div>
                            {borderStyle !== 'none' && (
                                <div className="col-6">
                                    <strong>Border:</strong> {borderStyle}
                                </div>
                            )}
                            {countryBadge !== 'none' && (
                                <div className="col-6">
                                    <strong>Badge:</strong> {countryBadge} ({badgePosition})
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DualPlateView;