// ===============================
// DualPlateView.js - Dual plate display component
// ===============================

import React from 'react';
import PlatePreview from './PlatePreview';
import { thicknessOptions } from '../../config/PlateJson';

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
    outlineColor 
}) => {
    const selectedThicknessObj = thicknessOptions.find((t) => t.key === selectedThickness);

    return (
        <div className="row g-3">
            {/* Front Plate */}
            <div className="col-12">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-light text-center py-2">
                        <h6 className="mb-0 text-primary">
                            <i className="fas fa-car me-2"></i>Front Plate (White)
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
                        />
                    </div>
                </div>
            </div>

            {/* Rear Plate */}
            <div className="col-12">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-warning text-center py-2">
                        <h6 className="mb-0 text-dark">
                            <i className="fas fa-car me-2"></i>Rear Plate (Yellow)
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
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DualPlateView;