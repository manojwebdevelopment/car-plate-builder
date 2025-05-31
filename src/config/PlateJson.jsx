// ===============================
// config.js - All configuration data
// ===============================

export const plateStyles = [
    { 
        label: 'Standard Number Plates - Standard Font', 
        key: 'standard', 
        price: 30,
        fontUrl: 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
        fontSize: 0.6,
        characteristics: 'Clean, traditional UK font'
    },
    { 
        label: '3D Gel Plates - Bold Font', 
        key: '3d', 
        price: 40,
        fontUrl: 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
        fontSize: 0.62,
        characteristics: 'Rounded gel effect with depth'
    },
    { 
        label: '4D Plates - Carbon Fibre Font', 
        key: '4d', 
        price: 45,
        fontUrl: 'https://threejs.org/examples/fonts/droid/droid_sans_bold.typeface.json',
        fontSize: 0.65,
        characteristics: 'Bold, industrial carbon style'
    },
    { 
        label: '4D Gel Plates - Euro Style Font', 
        key: '4d-gel', 
        price: 55,
        fontUrl: 'https://threejs.org/examples/fonts/gentilis_regular.typeface.json',
        fontSize: 0.63,
        characteristics: 'Modern European gel design'
    },
    { 
        label: '5D Gel Plates - Blackjack Font', 
        key: '5d-gel', 
        price: 60,
        fontUrl: 'https://threejs.org/examples/fonts/optimer_bold.typeface.json',
        fontSize: 0.68,
        characteristics: 'Maximum depth casino style'
    },
    { 
        label: 'Premium Plates - German Font', 
        key: 'premium', 
        price: 70,
        fontUrl: 'https://threejs.org/examples/fonts/droid/droid_sans_regular.typeface.json',
        fontSize: 0.66,
        characteristics: 'Precision German engineering style'
    },
    { 
        label: 'Sport Plates - Arial Font', 
        key: 'sport', 
        price: 65,
        fontUrl: 'https://threejs.org/examples/fonts/gentilis_bold.typeface.json',
        fontSize: 0.64,
        characteristics: 'Clean athletic modern look'
    },
    { 
        label: 'Laser Cut Plates - Laser Font', 
        key: 'laser', 
        price: 55,
        fontUrl: 'https://threejs.org/examples/fonts/optimer_regular.typeface.json',
        fontSize: 0.58,
        characteristics: 'Precise laser-cut edges'
    }
];

export const thicknessOptions = [
    { label: '3mm (Standard)', key: '3mm', value: 0.15, price: 0 },
    { label: '5mm (Enhanced)', key: '5mm', value: 0.25, price: 5 },
    { label: '8mm (Premium)', key: '8mm', value: 0.4, price: 10 }
];

export const colorOptions = [
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

export const shadowOptions = [
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

export const borderOptions = [
    { name: 'No Border', key: 'none', price: 0, color: 'transparent', thickness: 0 },
    { name: 'Black Border', key: 'black', price: 2, color: '#000000', thickness: 0.05 },
    { name: 'Yellow Border', key: 'yellow', price: 2, color: '#FFD700', thickness: 0.05 },
    { name: 'Blue Border', key: 'blue', price: 3, color: '#0033cc', thickness: 0.05 },
    { name: 'Red Border', key: 'red', price: 3, color: '#cc0000', thickness: 0.05 },
    { name: 'White Border', key: 'white', price: 2, color: '#FFFFFF', thickness: 0.05 },
    { name: 'Chrome Border', key: 'chrome', price: 8, color: '#c0c0c0', thickness: 0.06 }
];

export const countryOptions = [
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

export const flagOptions = {
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