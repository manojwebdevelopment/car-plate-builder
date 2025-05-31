import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D } from '@react-three/drei';
import * as THREE from 'three';

// ===============================
// CONFIGURATION DATA - ALL RESTORED
// ===============================

const plateStyles = [
    { label: 'Standard Number Plates', key: 'standard', price: 30, 
        size: 0.6,
        characteristics: 'Clean, traditional UK font',
        fontUrl: 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
     },
    { label: '3D Gel Plates', key: '3d', price: 40,
        size: 0.62,
        characteristics: 'Rounded gel effect with depth',
        fontUrl: 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
     },
    { label: '4D Plates', key: '4d', price: 45,
        characteristics: 'Bold, industrial carbon style',
        fontUrl: 'https://threejs.org/examples/fonts/droid/droid_sans_bold.typeface.json',
     },
    { label: '4D Gel Plates', key: '4d-gel', price: 55,
         size: 0.63,
        characteristics: 'Modern European gel design',
        fontUrl: 'https://threejs.org/examples/fonts/gentilis_regular.typeface.json',
     },
    { label: '5D Gel Plates', key: '5d-gel', price: 60,
        size: 0.68,
        characteristics: 'Maximum depth casino style',
        fontUrl: 'https://threejs.org/examples/fonts/optimer_bold.typeface.json',
     }
];

const fontOptions = [
    {
        label: 'STANDARD',
        key: 'standard',
        size: 0.6,
        characteristics: 'Clean, traditional UK font',
        fontUrl: 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
        previewImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjEwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI4IiBmb250LXdlaWdodD0ibm9ybWFsIiBmaWxsPSIjMDAwIj5TVEFOREFSRDwvdGV4dD48L3N2Zz4='
    },
    {
        label: '3D FONT',
        key: '3d-gel',
        size: 0.62,
        characteristics: 'Rounded gel effect with depth',
        fontUrl: 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
        previewImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjEwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzAwMCIgc3R5bGU9ImZpbHRlcjogZHJvcC1zaGFkb3coMnB4IDJweCAwcHggIzMzMykiPjNEIEZPTlQ8L3RleHQ+PC9zdmc+'
    },
    {
        label: 'CARBON FIBRE',
        key: '4d-plate',
        size: 0.65,
        characteristics: 'Bold, industrial carbon style',
        fontUrl: 'https://threejs.org/examples/fonts/droid/droid_sans_bold.typeface.json',
        previewImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjEwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsIEJsYWNrLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI2IiBmb250LXdlaWdodD0iOTAwIiBmaWxsPSIjMjIyIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMSI+Q0FSQk9OIEZJQlJFPC90ZXh0Pjwvc3ZnPg=='
    },
    {
        label: 'EUROSTYLE',
        key: '4d-gel',
        size: 0.63,
        characteristics: 'Modern European gel design',
        fontUrl: 'https://threejs.org/examples/fonts/gentilis_regular.typeface.json',
        previewImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjEwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkNhbGlicmksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiMwMDAiIGxldHRlci1zcGFjaW5nPSIxcHgiPkVVUk9TVFlMRTwvdGV4dD48L3N2Zz4='
    },
    {
        label: 'BLACKJACK',
        key: '5d-gel',
        size: 0.68,
        characteristics: 'Maximum depth casino style',
        fontUrl: 'https://threejs.org/examples/fonts/optimer_bold.typeface.json',
        previewImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjEwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkltcGFjdCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyOCIgZm9udC13ZWlnaHQ9IjkwMCIgZmlsbD0iIzAwMCIgbGV0dGVyLXNwYWNpbmc9IjJweCIgc3R5bGU9InRleHQtc2hhZG93OiAycHggMnB4IDRweCByZ2JhKDAsMCwwLDAuNSkiPkJMQUNLSkFDSzwvdGV4dD48L3N2Zz4='
    },
    {
        label: 'GERMAN FONT',
        key: 'premium',
        size: 0.66,
        characteristics: 'Precision German engineering style',
        fontUrl: 'https://threejs.org/examples/fonts/droid/droid_sans_regular.typeface.json',
        previewImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjEwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkZ1dHVyYSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNiIgZm9udC13ZWlnaHQ9IjUwMCIgZmlsbD0iIzAwMCIgbGV0dGVyLXNwYWNpbmc9IjFweCIgc3R5bGU9InRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2UiPkdFUk1BTiBGT05UPC90ZXh0Pjwvc3ZnPg=='
    },
    {
        label: 'ARIAL',
        key: 'sport',
        size: 0.64,
        characteristics: 'Clean athletic modern look',
        fontUrl: 'https://threejs.org/examples/fonts/gentilis_bold.typeface.json',
        previewImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjEwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI4IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjMDAwIiBsZXR0ZXItc3BhY2luZz0iMC41cHgiPkFSSUFMPC90ZXh0Pjwvc3ZnPg=='
    },
    {
        label: 'LASER CUT',
        key: 'laser',
        size: 0.58,
        characteristics: 'Precise laser-cut edges',
        fontUrl: 'https://threejs.org/examples/fonts/optimer_regular.typeface.json',
        previewImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0ZXh0IHg9IjEwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkNvdXJpZXIsIG1vbm9zcGFjZSIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9IjQwMCIgZmlsbD0iIzAwMCIgbGV0dGVyLXNwYWNpbmc9IjJweCIgc3R5bGU9InRleHQtc2hhZG93OiAxcHggMXB4IDJweCByZ2JhKDAsMCwwLDAuMykiPkxBU0VSIENVVDwvdGV4dD48L3N2Zz4='
    }
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
    { name: 'Black Outline', key: 'black-outline', price: 3 },
    { name: 'Dark Gray Outline', key: 'gray-outline', price: 3 },
    { name: 'White Outline', key: 'white-outline', price: 3 },
    { name: 'Colored Outline', key: 'colored-outline', price: 5 },
    { name: 'Soft Shadow', key: 'soft', price: 3 },
    { name: 'Hard Shadow', key: 'hard', price: 5 },
    { name: 'Neon Glow', key: 'neon', price: 12 },
    { name: 'LED Effect', key: 'led', price: 15 }
];

const borderOptions = [
    { name: 'No Border', key: 'none', price: 0, color: 'transparent', thickness: 0 },
    { name: 'Black Border', key: 'black', price: 2, color: '#000000', thickness: 0.05 },
    { name: 'Yellow Border', key: 'yellow', price: 2, color: '#FFD700', thickness: 0.05 },
    { name: 'Blue Border', key: 'blue', price: 3, color: '#0033cc', thickness: 0.05 },
    { name: 'Red Border', key: 'red', price: 3, color: '#cc0000', thickness: 0.05 },
    { name: 'White Border', key: 'white', price: 2, color: '#FFFFFF', thickness: 0.05 },
    { name: 'Chrome Border', key: 'chrome', price: 8, color: '#c0c0c0', thickness: 0.06 }
];

const countryOptions = [
    { name: 'No Badge', key: 'none' },
    { name: 'ENGLAND', key: 'england' },
    { name: 'SCOTLAND', key: 'scotland' },
    { name: 'WALES', key: 'wales' },
    { name: 'NORTHERN IRELAND', key: 'northern-ireland' },
    { name: 'UNITED STATES', key: 'usa' },
    { name: 'GERMANY', key: 'germany' },
    { name: 'FRANCE', key: 'france' },
    { name: 'ITALY', key: 'italy' },
    { name: 'SPAIN', key: 'spain' },
    { name: 'CUSTOM', key: 'custom' }
];

const flagOptions = {
    'none': [],
    'england': [
        {
            name: 'St George - ENG',
            key: 'st-george',
            flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMTQwIiB5PSIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjAiIHk9IjgwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPg==',
            text: 'ENG',
            price: 8
        },
        {
            name: 'Three Lions - ENG',
            key: 'three-lions',
            flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMTQwIiB5PSIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjAiIHk9IjgwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPg==',
            text: 'ENG',
            price: 10
        }
    ],
    'scotland': [
        {
            name: 'St Andrew - SCO',
            key: 'st-andrew',
            flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiMwMDVFQjgiLz4KPHBhdGggZD0iTTAgMEwzMDAgMTgwTTMwMCAwTDAgMTgwIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMjAiLz4KPC9zdmc+',
            text: 'SCO',
            price: 8
        }
    ],
    'wales': [
        {
            name: 'St David - WAL',
            key: 'st-david',
            flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSI5MCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB5PSI5MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSI5MCIgZmlsbD0iIzAwQjA0RiIvPgo8L3N2Zz4=',
            text: 'WAL',
            price: 8
        }
    ],
    'northern-ireland': [
        {
            name: 'Ulster Banner - NI',
            key: 'ulster',
            flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMTQwIiB5PSIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjAiIHk9IjgwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPg==',
            text: 'NI',
            price: 8
        }
    ],
    'usa': [
        {
            name: 'Stars & Stripes - USA',
            key: 'stars-stripes',
            flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNGRkZGRkYiLz4KPGcgZmlsbD0iI0IyMjIzNCI+CjxyZWN0IHk9IjE0IiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE0Ii8+CjxyZWN0IHk9IjQyIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE0Ii8+CjxyZWN0IHk9IjcwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE0Ii8+CjxyZWN0IHk9Ijk4IiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE0Ii8+CjxyZWN0IHk9IjEyNiIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxNCIvPgo8cmVjdCB5PSIxNTQiIHdpZHRoPSIzMDAiIGhlaWdodD0iMTQiLz4KPC9nPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9Ijk4IiBmaWxsPSIjM0MzQjZFIi8+Cjwvc3ZnPg==',
            text: 'USA',
            price: 8
        }
    ],
    'germany': [
        {
            name: 'German Flag - DEU',
            key: 'german-flag',
            flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB5PSI2MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSI2MCIgZmlsbD0iI0REMDAwMCIvPgo8cmVjdCB5PSIxMjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iNjAiIGZpbGw9IiNGRkNFMDAiLz4KPC9zdmc+',
            text: 'DEU',
            price: 8
        }
    ],
    'france': [
        {
            name: 'Tricolore - FRA',
            key: 'tricolore',
            flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiMwMDU1QTQiLz4KPHJlY3QgeD0iMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE4MCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSIyMDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRUY0MTM1Ii8+Cjwvc3ZnPg==',
            text: 'FRA',
            price: 8
        }
    ],
    'italy': [
        {
            name: 'Italian Flag - ITA',
            key: 'italian-flag',
            flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiMwMDkyNDYiLz4KPHJlY3QgeD0iMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE4MCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSIyMDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTgwIiBmaWxsPSIjQ0UyQjM3Ii8+Cjwvc3ZnPg==',
            text: 'ITA',
            price: 8
        }
    ],
    'spain': [
        {
            name: 'Spanish Flag - ESP',
            key: 'spanish-flag',
            flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSI0NSIgZmlsbD0iI0FBMTUxQiIvPgo8cmVjdCB5PSI0NSIgd2lkdGg9IjMwMCIgaGVpZ2h0PSI5MCIgZmlsbD0iI0YxQkYwMCIvPgo8cmVjdCB5PSIxMzUiIHdpZHRoPSIzMDAiIGhlaWdodD0iNDUiIGZpbGw9IiNBQTE1MUIiLz4KPC9zdmc+',
            text: 'ESP',
            price: 8
        }
    ],
    'custom': [
        {
            name: 'Upload Custom Flag',
            key: 'custom-upload',
            flagImage: null,
            text: 'CUSTOM',
            price: 15
        }
    ]
};

// ===============================
// PLATE PREVIEW COMPONENT - ENHANCED
// ===============================

const PlatePreview = ({
    text,
    plateType,
    fontSize,
    fontStyle,
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
    const selectedFontObj = fontOptions.find((f) => f.key === fontStyle);

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

    const renderBorder = () => {
        if (borderStyle === 'none') return null;

        const selectedBorderObj = borderOptions.find(b => b.key === borderStyle);
        if (!selectedBorderObj) return null;

        const borderColor = selectedBorderObj.color;
        
        if ((plateColor === '#FFFFFF' && borderColor === '#FFFFFF') ||
            (plateColor === '#FFD320' && borderColor === '#FFD700')) {
            return null;
        }

        return (
            <group>
                <mesh position={[0, 0, 0.13]}>
                    <boxGeometry args={[5.8, 2.3, 0.02]} />
                    <meshStandardMaterial
                        color={borderColor}
                        metalness={borderStyle === 'chrome' ? 0.8 : 0.2}
                        roughness={borderStyle === 'chrome' ? 0.1 : 0.5}
                    />
                </mesh>
                <mesh position={[0, 0, 0.14]}>
                    <boxGeometry args={[5.6, 2.1, 0.02]} />
                    <meshStandardMaterial
                        color={plateColor}
                        metalness={0.1}
                        roughness={0.2}
                    />
                </mesh>
            </group>
        );
    };

    const renderCountryBadge = () => {
        if (!selectedCountry || selectedCountry === 'none' || !countryBadge || countryBadge === 'none') return null;

        const flagData = flagOptions[selectedCountry]?.find(f => f.key === countryBadge);
        if (!flagData) return null;

        const flagText = countryBadge === 'custom-upload' ? customFlagText : flagData.text;
        const position = badgePosition === 'right' ? [3.2, 0, 0.13] : [-2.8, 0, 0.13];
        const badgeWidth = 0.6;
        const badgeHeight = 2.8;
        const flagAreaHeight = 1.9;
        const textAreaHeight = 0.6;

        return (
            <group>
                <mesh position={position}>
                    <boxGeometry args={[badgeWidth, badgeHeight, 0.04]} />
                    <meshStandardMaterial
                        color={badgeBorderColor}
                        metalness={0.3}
                        roughness={0.4}
                    />
                </mesh>

                <mesh position={[position[0], position[1] + 0.35, position[2] + 0.02]}>
                    <boxGeometry args={[badgeWidth * 0.88, flagAreaHeight, 0.02]} />
                    <meshBasicMaterial color="#FFFFFF" />
                </mesh>

                {flagData.flagImage && (
                    <mesh position={[position[0], position[1] + 0.35, position[2] + 0.04]}>
                        <planeGeometry args={[badgeWidth * 0.82, flagAreaHeight * 0.85]} />
                        <meshBasicMaterial transparent={true}>
                            <primitive
                                object={(() => {
                                    const texture = new THREE.TextureLoader().load(flagData.flagImage);
                                    texture.flipY = false;
                                    texture.wrapS = THREE.ClampToEdgeWrapping;
                                    texture.wrapT = THREE.ClampToEdgeWrapping;
                                    return texture;
                                })()}
                                attach="map"
                            />
                        </meshBasicMaterial>
                    </mesh>
                )}

                {countryBadge === 'custom-upload' && customFlagImage && (
                    <mesh position={[position[0], position[1] + 0.35, position[2] + 0.04]}>
                        <planeGeometry args={[badgeWidth * 0.82, flagAreaHeight * 0.85]} />
                        <meshBasicMaterial transparent={true}>
                            <primitive
                                object={(() => {
                                    const texture = new THREE.TextureLoader().load(customFlagImage);
                                    texture.flipY = false;
                                    texture.wrapS = THREE.ClampToEdgeWrapping;
                                    texture.wrapT = THREE.ClampToEdgeWrapping;
                                    return texture;
                                })()}
                                attach="map"
                            />
                        </meshBasicMaterial>
                    </mesh>
                )}

                <mesh position={[position[0], position[1] - 0.9, position[2] + 0.02]}>
                    <boxGeometry args={[badgeWidth * 0.88, textAreaHeight, 0.02]} />
                    <meshBasicMaterial color={badgeBorderColor} />
                </mesh>

                <Text3D
                    font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
                    size={0.1}
                    height={0.01}
                    position={[
                        position[0] - (flagText.length * 0.05),
                        position[1] - 0.92,
                        position[2] + 0.04
                    ]}
                    bevelEnabled={false}
                >
                    {flagText}
                    <meshBasicMaterial color={customTextColor || "#FFFFFF"} />
                </Text3D>
            </group>
        );
    };

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

            {shadowEffect !== 'none' && (
                <>
                    {(shadowEffect === 'black-outline' || shadowEffect === 'gray-outline' ||
                        shadowEffect === 'white-outline' || shadowEffect === 'colored-outline') && (
                            <>
                                <Text3D
                                    font={selectedFontObj?.fontUrl || "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"}
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
                                    font={selectedFontObj?.fontUrl || "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"}
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
                                font={selectedFontObj?.fontUrl || "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"}
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

            <Text3D
                font={selectedFontObj?.fontUrl || "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"}
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

// ===============================
// DUAL PLATE VIEW COMPONENT
// ===============================

const DualPlateView = ({ plateText, plateStyle, selectedFont, selectedThickness, fontColor, shadowEffect, borderStyle, customFontColor, countryBadge, selectedCountry, badgePosition, badgeBorderColor, customFlagText, customFlagImage, customTextColor, outlineColor }) => {
    const selectedFontObj = fontOptions.find((f) => f.key === selectedFont);
    const selectedThicknessObj = thicknessOptions.find((t) => t.key === selectedThickness);

    return (
        <div className="row g-3">
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
                            fontSize={selectedFontObj?.size || 0.6}
                            fontStyle={selectedFont}
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
                            fontSize={selectedFontObj?.size || 0.6}
                            fontStyle={selectedFont}
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

// ===============================
// MAIN PLATE BUILDER COMPONENT - FULLY RESTORED
// ===============================

const PlateBuilder = () => {
    // ALL STATE VARIABLES RESTORED
    const [plateText, setPlateText] = useState('GHELLO');
    const [spacing, setSpacing] = useState('own');
    const [selectedStyle, setSelectedStyle] = useState('4d');
    const [selectedFont, setSelectedFont] = useState('standard');
    const [selectedThickness, setSelectedThickness] = useState('5mm');
    const [selectedFontColor, setSelectedFontColor] = useState('#000000');
    const [customColor, setCustomColor] = useState('#000000');
    const [selectedShadow, setSelectedShadow] = useState('none');
    const [selectedBorder, setSelectedBorder] = useState('none');
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

    // CALCULATIONS
    const displayText = spacing === 'legal' ? plateText.split('').join(' ') : plateText;
    const selected = plateStyles.find((s) => s.key === selectedStyle);
    const selectedFontObj = fontOptions.find((f) => f.key === selectedFont);
    const selectedThicknessObj = thicknessOptions.find((t) => t.key === selectedThickness);
    const selectedColorObj = colorOptions.find((c) => c.color === selectedFontColor);
    const selectedShadowObj = shadowOptions.find((s) => s.key === selectedShadow);
    const selectedBorderObj = borderOptions.find((b) => b.key === selectedBorder);
    const selectedCountryObj = countryOptions.find((c) => c.key === selectedCountry);
    const selectedFlagObj = flagOptions[selectedCountry]?.find((f) => f.key === selectedFlag);

    const finalFontColor = selectedFontColor === 'custom' ? customColor : selectedFontColor;
    const basePrice = (selected?.price || 0) + (selectedThicknessObj?.price || 0) +
        (selectedColorObj?.price || 0) + (selectedShadowObj?.price || 0) +
        (selectedBorderObj?.price || 0) + (selectedFlagObj?.price || 0);
    const totalQuantity = frontQuantity + rearQuantity;
    const totalPrice = basePrice * totalQuantity;

    // EVENT HANDLERS
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
            reader.onload = (e) => {
                setCustomFlagImage(e.target.result);
            };
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
        setSelectedStyle('4d');
        setSelectedFont('standard');
        setSelectedThickness('5mm');
        setSelectedFontColor('#000000');
        setCustomColor('#000000');
        setSelectedShadow('none');
        setSelectedBorder('none');
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
    };

    return (
        <div className="min-vh-100" style={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            <div className="container py-4">
                <div className="row g-4">
                    
                    {/* LEFT PANEL - ALL CONTROLS RESTORED */}
                    <div className="col-lg-6">
                        
                        {/* TEXT INPUT SECTION */}
                        <div className="card shadow border-0 mb-4" style={{ borderRadius: '15px' }}>
                            <div className="card-header text-white text-center py-3" style={{
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                borderRadius: '15px 15px 0 0'
                            }}>
                                <h5 className="mb-0">
                                    <i className="fas fa-edit me-2"></i>Enter Your Plate Text
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

                                <div className="row g-3">
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
                                    <div className="col-6">
                                        <label className="form-label fw-bold text-info fs-6">Preview</label>
                                        <div className="form-control text-center fw-bold" style={{ 
                                            fontSize: '1.5rem', 
                                            letterSpacing: spacing === 'legal' ? '0.3em' : '0.1em',
                                            backgroundColor: '#f8f9fa',
                                            borderRadius: '10px'
                                        }}>
                                            {displayText}
                                        </div>
                                    </div>
                                </div>

                                {/* QUANTITY CONTROLS */}
                                <div className="row g-3 mt-2">
                                    <div className="col-6">
                                        <label className="form-label fw-bold text-info fs-6">
                                            <i className="fas fa-plus-circle me-2"></i>Front Plates
                                        </label>
                                        <div className="input-group">
                                            <button
                                                className="btn btn-outline-info"
                                                onClick={() => setFrontQuantity(Math.max(0, frontQuantity - 1))}
                                                style={{ borderRadius: '10px 0 0 10px' }}
                                            >
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <input
                                                type="number"
                                                className="form-control text-center fw-bold"
                                                value={frontQuantity}
                                                onChange={(e) => setFrontQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                                                min="0"
                                                max="10"
                                            />
                                            <button
                                                className="btn btn-outline-info"
                                                onClick={() => setFrontQuantity(Math.min(10, frontQuantity + 1))}
                                                style={{ borderRadius: '0 10px 10px 0' }}
                                            >
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <label className="form-label fw-bold text-warning fs-6">
                                            <i className="fas fa-plus-circle me-2"></i>Rear Plates
                                        </label>
                                        <div className="input-group">
                                            <button
                                                className="btn btn-outline-warning"
                                                onClick={() => setRearQuantity(Math.max(0, rearQuantity - 1))}
                                                style={{ borderRadius: '10px 0 0 10px' }}
                                            >
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <input
                                                type="number"
                                                className="form-control text-center fw-bold"
                                                value={rearQuantity}
                                                onChange={(e) => setRearQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                                                min="0"
                                                max="10"
                                            />
                                            <button
                                                className="btn btn-outline-warning"
                                                onClick={() => setRearQuantity(Math.min(10, rearQuantity + 1))}
                                                style={{ borderRadius: '0 10px 10px 0' }}
                                            >
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CUSTOMIZATION SECTION - ALL OPTIONS RESTORED */}
                        <div className="card shadow border-0 mb-4" style={{ borderRadius: '15px' }}>
                            <div className="card-header text-white py-3" style={{
                                background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
                                borderRadius: '15px 15px 0 0'
                            }}>
                                <h5 className="mb-0">
                                    <i className="fas fa-sliders-h me-2"></i>Customization Options
                                </h5>
                            </div>
                            <div className="card-body p-4">
                                <div className="row g-4">
                                    
                                    {/* PLATE STYLE */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold fs-5">
                                            <i className="fas fa-layer-group me-2 text-primary"></i>Plate Style
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

                                    {/* FONT STYLE WITH PREVIEW IMAGES - RESTORED */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold fs-5">
                                            <i className="fas fa-font me-2 text-warning"></i>Font Style
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

                                        {/* FONT PREVIEW GRID - RESTORED */}
                                        <div className="row g-2 mt-3">
                                            {fontOptions.map((font) => (
                                                <div key={font.key} className="col-6 col-md-4">
                                                    <div
                                                        className={`card cursor-pointer border-2 ${selectedFont === font.key ? 'border-warning bg-warning bg-opacity-10' : 'border-light'}`}
                                                        onClick={() => setSelectedFont(font.key)}
                                                        style={{
                                                            cursor: 'pointer',
                                                            borderRadius: '8px',
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                    >
                                                        <div className="card-body p-2 text-center">
                                                            <img
                                                                src={font.previewImage}
                                                                alt={font.label}
                                                                style={{
                                                                    width: '100%',
                                                                    height: 'auto',
                                                                    maxHeight: '30px',
                                                                    objectFit: 'contain'
                                                                }}
                                                            />
                                                            <div className="small fw-bold mt-1" style={{ fontSize: '0.7rem' }}>
                                                                {font.label}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* FONT COLOR - RESTORED */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold fs-5">
                                            <i className="fas fa-palette me-2 text-danger"></i>Font Color
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

                                    {/* THICKNESS & SHADOW - RESTORED */}
                                    <div className="col-6">
                                        <label className="form-label fw-bold fs-6">
                                            <i className="fas fa-expand-arrows-alt me-2 text-secondary"></i>Thickness
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
                                            <i className="fas fa-magic me-2" style={{ color: '#ff6b00' }}></i>Text Effects
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

                                        {/* OUTLINE COLOR PICKER - RESTORED */}
                                        {(selectedShadow === 'colored-outline') && (
                                            <div className="mt-2">
                                                <label className="form-label small fw-bold">Outline Color</label>
                                                <div className="d-flex gap-2">
                                                    <input
                                                        type="color"
                                                        value={outlineColor}
                                                        onChange={(e) => setOutlineColor(e.target.value)}
                                                        className="form-control form-control-color"
                                                        style={{ width: '50px', height: '38px' }}
                                                    />
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
                                                        <option value="#800080">Purple</option>
                                                    </select>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* BORDER STYLE - RESTORED */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold fs-6">
                                            <i className="fas fa-border-style me-2 text-info"></i>Border Style & Color
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

                                        {/* BORDER COLOR PREVIEW - RESTORED */}
                                        {selectedBorder !== 'none' && (
                                            <div className="mt-2 d-flex align-items-center">
                                                <span className="small me-2">Border Color:</span>
                                                <div
                                                    style={{
                                                        width: '30px',
                                                        height: '20px',
                                                        backgroundColor: borderOptions.find(b => b.key === selectedBorder)?.color || '#000000',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '4px'
                                                    }}
                                                ></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* COUNTRY BADGE OPTIONS - FULLY RESTORED */}
                        <div className="card shadow border-0 mt-4" style={{ borderRadius: '15px' }}>
                            <div className="card-header text-white py-3" style={{
                                background: 'linear-gradient(45deg, #28a745, #20c997)',
                                borderRadius: '15px 15px 0 0'
                            }}>
                                <h5 className="mb-0">
                                    <i className="fas fa-flag me-2"></i>Country Badge Options
                                </h5>
                            </div>
                            <div className="card-body p-4">
                                <div className="row g-4">
                                    
                                    {/* COUNTRY SELECTION - RESTORED */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold fs-5">
                                            <i className="fas fa-globe me-2 text-primary"></i>Country Badge
                                        </label>
                                        <select
                                            className="form-select form-select-lg"
                                            value={selectedCountry}
                                            onChange={(e) => handleCountryChange(e.target.value)}
                                            style={{ borderRadius: '10px', border: '2px solid #dee2e6' }}
                                        >
                                            {countryOptions.map((country) => (
                                                <option key={country.key} value={country.key}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* FLAG SELECTION - RESTORED */}
                                    {selectedCountry !== 'none' && flagOptions[selectedCountry] && (
                                        <div className="col-12">
                                            <label className="form-label fw-bold fs-5">
                                                <i className="fas fa-flag me-2 text-info"></i>Flag Style
                                            </label>
                                            <div className="row g-2">
                                                {flagOptions[selectedCountry].map((flag) => (
                                                    <div key={flag.key} className="col-6">
                                                        <div
                                                            className={`card h-100 cursor-pointer border-2 ${selectedFlag === flag.key ? 'border-primary bg-light' : 'border-secondary'}`}
                                                            onClick={() => setSelectedFlag(flag.key)}
                                                            style={{
                                                                cursor: 'pointer',
                                                                borderRadius: '10px',
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                        >
                                                            <div className="card-body p-3 text-center">
                                                                <div className="mb-2">
                                                                    <div style={{
                                                                        width: '60px',
                                                                        height: '36px',
                                                                        margin: '0 auto',
                                                                        border: '1px solid #ddd',
                                                                        borderRadius: '3px',
                                                                        overflow: 'hidden',
                                                                        position: 'relative'
                                                                    }}>
                                                                        {flag.flagImage ? (
                                                                            <img
                                                                                src={flag.flagImage}
                                                                                alt={flag.name}
                                                                                style={{
                                                                                    width: '100%',
                                                                                    height: '100%',
                                                                                    objectFit: 'cover'
                                                                                }}
                                                                            />
                                                                        ) : (
                                                                            <div style={{
                                                                                width: '100%',
                                                                                height: '100%',
                                                                                backgroundColor: '#f8f9fa',
                                                                                border: '2px dashed #dee2e6',
                                                                                borderRadius: '3px',
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center'
                                                                            }}>
                                                                                <i className="fas fa-upload text-muted"></i>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="small fw-bold">{flag.text}</div>
                                                                <div className="small text-muted">£{flag.price}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* CUSTOM IMAGE UPLOAD - RESTORED */}
                                    {selectedFlag === 'custom-upload' && (
                                        <div className="col-12">
                                            <label className="form-label fw-bold">
                                                <i className="fas fa-upload me-2 text-primary"></i>Upload Custom Flag Image
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="form-control form-control-lg"
                                                style={{ borderRadius: '10px' }}
                                            />
                                            <div className="small text-muted mt-2">
                                                <i className="fas fa-info-circle me-1"></i>Max size: 2MB. Recommended: 240x144px
                                            </div>
                                            {customFlagImage && (
                                                <div className="mt-3 text-center">
                                                    <img
                                                        src={customFlagImage}
                                                        alt="Custom Flag Preview"
                                                        style={{
                                                            maxWidth: '120px',
                                                            maxHeight: '72px',
                                                            border: '2px solid #dee2e6',
                                                            borderRadius: '5px'
                                                        }}
                                                    />
                                                    <div className="small text-success mt-1">
                                                        <i className="fas fa-check me-1"></i>Image uploaded successfully
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* CUSTOM FLAG TEXT - RESTORED */}
                                    {selectedFlag === 'custom-upload' && (
                                        <div className="col-12">
                                            <label className="form-label fw-bold">Custom Flag Text</label>
                                            <input
                                                type="text"
                                                value={customFlagText}
                                                onChange={(e) => setCustomFlagText(e.target.value.toUpperCase())}
                                                className="form-control form-control-lg"
                                                placeholder="Enter flag text (max 6 chars)"
                                                maxLength="6"
                                                style={{ borderRadius: '10px' }}
                                            />
                                        </div>
                                    )}

                                    {/* BADGE CONTROLS - RESTORED */}
                                    <div className="col-6">
                                        <label className="form-label fw-bold fs-6">
                                            <i className="fas fa-crosshairs me-2 text-warning"></i>Badge Position
                                        </label>
                                        <select
                                            className="form-select form-select-lg"
                                            value={badgePosition}
                                            onChange={(e) => setBadgePosition(e.target.value)}
                                            style={{ borderRadius: '10px' }}
                                        >
                                            <option value="left">Left Side</option>
                                            <option value="right">Right Side</option>
                                        </select>
                                    </div>

                                    {/* BADGE TEXT COLOR - RESTORED */}
                                    <div className="col-6">
                                        <label className="form-label fw-bold fs-6">
                                            <i className="fas fa-font me-2 text-success"></i>Badge Text Color
                                        </label>
                                        <div className="row g-1">
                                            <div className="col-8">
                                                <select
                                                    className="form-select form-select-lg"
                                                    value={customTextColor}
                                                    onChange={(e) => setCustomTextColor(e.target.value)}
                                                    style={{ borderRadius: '10px' }}
                                                >
                                                    <option value="#FFFFFF">White</option>
                                                    <option value="#000000">Black</option>
                                                    <option value="#FFD700">Gold</option>
                                                    <option value="#FF0000">Red</option>
                                                    <option value="#0000FF">Blue</option>
                                                    <option value="#008000">Green</option>
                                                </select>
                                            </div>
                                            <div className="col-4">
                                                <input
                                                    type="color"
                                                    value={customTextColor}
                                                    onChange={(e) => setCustomTextColor(e.target.value)}
                                                    className="form-control form-control-color form-control-lg w-100"
                                                    style={{ height: '50px', borderRadius: '10px' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* BADGE BACKGROUND COLOR - RESTORED */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold fs-6">
                                            <i className="fas fa-palette me-2 text-secondary"></i>Badge Background Color
                                        </label>
                                        <div className="row g-2">
                                            <div className="col-8">
                                                <select
                                                    className="form-select form-select-lg"
                                                    value={badgeBorderColor}
                                                    onChange={(e) => setBadgeBorderColor(e.target.value)}
                                                    style={{ borderRadius: '10px' }}
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
                                                    className="form-control form-control-color form-control-lg w-100"
                                                    style={{ height: '50px', borderRadius: '10px' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL - DUAL PREVIEW AND ORDER SUMMARY */}
                    <div className="col-lg-6">
                        <div className="sticky-top" style={{ top: '20px' }}>
                            
                            {/* DUAL PREVIEW */}
                            <div className="card shadow border-0 mb-4" style={{ borderRadius: '15px' }}>
                                <div className="card-header text-white text-center py-3" style={{
                                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                    borderRadius: '15px 15px 0 0'
                                }}>
                                    <h5 className="mb-0">
                                        <i className="fas fa-eye me-2"></i>Live Preview - Both Plates
                                    </h5>
                                </div>
                                <div className="card-body p-4">
                                    <DualPlateView
                                        plateText={displayText}
                                        plateStyle={selectedStyle}
                                        selectedFont={selectedFont}
                                        selectedThickness={selectedThickness}
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
                                    />
                                </div>
                            </div>

                            {/* ORDER SUMMARY - RESTORED */}
                            <div className="card shadow border-0 mb-4" style={{ borderRadius: '15px' }}>
                                <div className="card-header bg-success text-white text-center py-3" style={{ borderRadius: '15px 15px 0 0' }}>
                                    <h5 className="mb-0">
                                        <i className="fas fa-shopping-cart me-2"></i>Order Summary
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
                                            <div className="mb-2"><strong>Country:</strong> {selectedCountryObj?.name || 'None'}</div>
                                            <div className="mb-2"><strong>Flag:</strong> {selectedFlagObj?.name || 'None'}</div>
                                            <div className="mb-2"><strong>Quantities:</strong> {frontQuantity} Front + {rearQuantity} Rear</div>
                                        </div>
                                        <div className="col-4 text-end">
                                            <h2 className="text-success fw-bold mb-3">£{totalPrice}</h2>
                                            <div className="small text-muted">
                                                <div>Base Price: £{basePrice}</div>
                                                <div>Total Quantity: {totalQuantity}</div>
                                                <div className="border-top pt-1 mt-1">
                                                    <div>Plate: £{selected?.price || 0}</div>
                                                    <div>Thickness: +£{selectedThicknessObj?.price || 0}</div>
                                                    <div>Color: +£{selectedColorObj?.price || 0}</div>
                                                    <div>Effects: +£{selectedShadowObj?.price || 0}</div>
                                                    <div>Border: +£{selectedBorderObj?.price || 0}</div>
                                                    <div>Flag: +£{selectedFlagObj?.price || 0}</div>
                                                </div>
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
                                                    <i className="fas fa-heart me-1"></i>Save
                                                </button>
                                            </div>
                                            <div className="col-4">
                                                <button className="btn btn-outline-info w-100" style={{ borderRadius: '10px' }}>
                                                    <i className="fas fa-share me-1"></i>Share
                                                </button>
                                            </div>
                                            <div className="col-4">
                                                <button className="btn btn-outline-secondary w-100" style={{ borderRadius: '10px' }}>
                                                    <i className="fas fa-copy me-1"></i>Copy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RESET BUTTON */}
                            <div className="text-center mt-4">
                                <button
                                    onClick={resetAll}
                                    className="btn btn-link text-primary fs-5"
                                    style={{ textDecoration: 'none' }}
                                >
                                    <i className="fas fa-redo me-2"></i>Reset All Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlateBuilder;