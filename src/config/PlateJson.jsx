// // ===============================
// // config.js - All configuration data
// // ===============================

// export const plateStyles = [
//     { 
//         label: 'Standard Number Plates - Standard Font', 
//         key: 'standard', 
//         price: 30,
//         fontUrl: 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
//         fontSize: 0.6,
//         characteristics: 'Clean, traditional UK font'
//     },
//     { 
//         label: '3D Gel Plates - Bold Font', 
//         key: '3d', 
//         price: 40,
//         fontUrl: 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
//         fontSize: 0.62,
//         characteristics: 'Rounded gel effect with depth'
//     },
//     { 
//         label: '4D Plates - Carbon Fibre Font', 
//         key: '4d', 
//         price: 45,
//         fontUrl: 'https://threejs.org/examples/fonts/droid/droid_sans_bold.typeface.json',
//         fontSize: 0.65,
//         characteristics: 'Bold, industrial carbon style'
//     },
//     { 
//         label: '4D Gel Plates - Euro Style Font', 
//         key: '4d-gel', 
//         price: 55,
//         fontUrl: 'https://threejs.org/examples/fonts/gentilis_regular.typeface.json',
//         fontSize: 0.63,
//         characteristics: 'Modern European gel design'
//     },
//     { 
//         label: '5D Gel Plates - Blackjack Font', 
//         key: '5d-gel', 
//         price: 60,
//         fontUrl: 'https://threejs.org/examples/fonts/optimer_bold.typeface.json',
//         fontSize: 0.68,
//         characteristics: 'Maximum depth casino style'
//     },
//     { 
//         label: 'Premium Plates - German Font', 
//         key: 'premium', 
//         price: 70,
//         fontUrl: 'https://threejs.org/examples/fonts/droid/droid_sans_regular.typeface.json',
//         fontSize: 0.66,
//         characteristics: 'Precision German engineering style'
//     },
//     { 
//         label: 'Sport Plates - Arial Font', 
//         key: 'sport', 
//         price: 65,
//         fontUrl: 'https://threejs.org/examples/fonts/gentilis_bold.typeface.json',
//         fontSize: 0.64,
//         characteristics: 'Clean athletic modern look'
//     },
//     { 
//         label: 'Laser Cut Plates - Laser Font', 
//         key: 'laser', 
//         price: 55,
//         fontUrl: 'https://threejs.org/examples/fonts/optimer_regular.typeface.json',
//         fontSize: 0.58,
//         characteristics: 'Precise laser-cut edges'
//     }
// ];

// export const thicknessOptions = [
//     { label: '3mm (Standard)', key: '3mm', value: 0.15, price: 0 },
//     { label: '5mm (Enhanced)', key: '5mm', value: 0.25, price: 5 },
//     { label: '8mm (Premium)', key: '8mm', value: 0.4, price: 10 }
// ];

// export const colorOptions = [
//     { name: 'Classic Black', color: '#000000', price: 0 },
//     { name: 'Royal Blue', color: '#0033cc', price: 5 },
//     { name: 'Racing Red', color: '#cc0000', price: 5 },
//     { name: 'Forest Green', color: '#006600', price: 5 },
//     { name: 'Purple', color: '#6600cc', price: 5 },
//     { name: 'Orange', color: '#ff6600', price: 8 },
//     { name: 'Hot Pink', color: '#ff1493', price: 8 },
//     { name: 'Gold', color: '#ffd700', price: 10 },
//     { name: 'Silver', color: '#c0c0c0', price: 10 },
//     { name: 'Chrome', color: '#e8e8e8', price: 15 },
//     { name: 'Custom Color', color: 'custom', price: 20 }
// ];

// export const shadowOptions = [
//     { name: 'No Shadow', key: 'none', price: 0 },
//     { name: 'Black Outline', key: 'black-outline', price: 3 },
//     { name: 'Dark Gray Outline', key: 'gray-outline', price: 3 },
//     { name: 'White Outline', key: 'white-outline', price: 3 },
//     { name: 'Colored Outline', key: 'colored-outline', price: 5 },
//     { name: 'Soft Shadow', key: 'soft', price: 3 },
//     { name: 'Hard Shadow', key: 'hard', price: 5 },
//     { name: 'Neon Glow', key: 'neon', price: 12 },
//     { name: 'LED Effect', key: 'led', price: 15 }
// ];

// export const borderOptions = [
//   { name: 'No Border', key: 'none', price: 0, color: 'transparent', thickness: 0 },
//   { name: 'Black Border', key: 'black', price: 2, color: '#000000', thickness: 0.01 },
//   { name: 'Yellow Border', key: 'yellow', price: 2, color: '#FFD700', thickness: 0.02 },
//   { name: 'Blue Border', key: 'blue', price: 3, color: '#0033cc', thickness: 0.02 },
//   { name: 'Red Border', key: 'red', price: 3, color: '#cc0000', thickness: 0.02 },
//   { name: 'White Border', key: 'white', price: 2, color: '#FFFFFF', thickness: 0.015 },
//   { name: 'Chrome Border', key: 'chrome', price: 8, color: '#c0c0c0', thickness: 0.025 }
// ];


// export const countryOptions = [
//     { name: 'No Badge', key: 'none' },
//     { name: 'ENGLAND', key: 'england' },
//     { name: 'SCOTLAND', key: 'scotland' },
//     { name: 'WALES', key: 'wales' },
//     { name: 'NORTHERN IRELAND', key: 'northern-ireland' },
//     { name: 'UNITED STATES', key: 'usa' },
//     { name: 'GERMANY', key: 'germany' },
//     { name: 'FRANCE', key: 'france' },
//     { name: 'ITALY', key: 'italy' },
//     { name: 'SPAIN', key: 'spain' },
//     { name: 'CUSTOM', key: 'custom' }
// ];

// export const flagOptions = {
//     'none': [],
//     'england': [
//         {
//             name: 'St George - ENG',
//             key: 'st-george',
//             flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMTQwIiB5PSIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjAiIHk9IjgwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPg==',
//             text: 'ENG',
//             price: 8
//         },
//         {
//             name: 'Three Lions - ENG',
//             key: 'three-lions',
//             flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMTQwIiB5PSIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjAiIHk9IjgwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPg==',
//             text: 'ENG',
//             price: 10
//         }
//     ],
//     'scotland': [
//         {
//             name: 'St Andrew - SCO',
//             key: 'st-andrew',
//             flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiMwMDVFQjgiLz4KPHBhdGggZD0iTTAgMEwzMDAgMTgwTTMwMCAwTDAgMTgwIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMjAiLz4KPC9zdmc+',
//             text: 'SCO',
//             price: 8
//         }
//     ],
//     'wales': [
//         {
//             name: 'St David - WAL',
//             key: 'st-david',
//             flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSI5MCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB5PSI5MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSI5MCIgZmlsbD0iIzAwQjA0RiIvPgo8L3N2Zz4=',
//             text: 'WAL',
//             price: 8
//         }
//     ],
//     'northern-ireland': [
//         {
//             name: 'Ulster Banner - NI',
//             key: 'ulster',
//             flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iMTQwIiB5PSIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjAiIHk9IjgwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPg==',
//             text: 'NI',
//             price: 8
//         }
//     ],
//     'usa': [
//         {
//             name: 'Stars & Stripes - USA',
//             key: 'stars-stripes',
//             flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNGRkZGRkYiLz4KPGcgZmlsbD0iI0IyMjIzNCI+CjxyZWN0IHk9IjE0IiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE0Ii8+CjxyZWN0IHk9IjQyIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE0Ii8+CjxyZWN0IHk9IjcwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE0Ii8+CjxyZWN0IHk9Ijk4IiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE0Ii8+CjxyZWN0IHk9IjEyNiIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxNCIvPgo8cmVjdCB5PSIxNTQiIHdpZHRoPSIzMDAiIGhlaWdodD0iMTQiLz4KPC9nPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9Ijk4IiBmaWxsPSIjM0MzQjZFIi8+Cjwvc3ZnPg==',
//             text: 'USA',
//             price: 8
//         }
//     ],
//     'germany': [
//         {
//             name: 'German Flag - DEU',
//             key: 'german-flag',
//             flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB5PSI2MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSI2MCIgZmlsbD0iI0REMDAwMCIvPgo8cmVjdCB5PSIxMjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iNjAiIGZpbGw9IiNGRkNFMDAiLz4KPC9zdmc+',
//             text: 'DEU',
//             price: 8
//         }
//     ],
//     'france': [
//         {
//             name: 'Tricolore - FRA',
//             key: 'tricolore',
//             flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiMwMDU1QTQiLz4KPHJlY3QgeD0iMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE4MCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSIyMDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRUY0MTM1Ii8+Cjwvc3ZnPg==',
//             text: 'FRA',
//             price: 8
//         }
//     ],
//     'italy': [
//         {
//             name: 'Italian Flag - ITA',
//             key: 'italian-flag',
//             flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiMwMDkyNDYiLz4KPHJlY3QgeD0iMTAwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE4MCIgZmlsbD0iI0ZGRkZGRiIvPgo8cmVjdCB4PSIyMDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTgwIiBmaWxsPSIjQ0UyQjM3Ii8+Cjwvc3ZnPg==',
//             text: 'ITA',
//             price: 8
//         }
//     ],
//     'spain': [
//         {
//             name: 'Spanish Flag - ESP',
//             key: 'spanish-flag',
//             flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSI0NSIgZmlsbD0iI0FBMTUxQiIvPgo8cmVjdCB5PSI0NSIgd2lkdGg9IjMwMCIgaGVpZ2h0PSI5MCIgZmlsbD0iI0YxQkYwMCIvPgo8cmVjdCB5PSIxMzUiIHdpZHRoPSIzMDAiIGhlaWdodD0iNDUiIGZpbGw9IiNBQTE1MUIiLz4KPC9zdmc+',
//             text: 'ESP',
//             price: 8
//         }
//     ],
//     'custom': [
//         {
//             name: 'Upload Custom Flag',
//             key: 'custom-upload',
//             flagImage: null,
//             text: 'CUSTOM',
//             price: 15
//         }
//     ]
// };


// ===============================
// PlateJson.js - Configuration data for plate builder
// ===============================
// ===============================
// PlateJson.js - Clean Configuration Data
// ===============================

export const plateStyles = [
    {
        key: 'standard',
        label: 'Standard Plate',
        price: 15.99,
        description: 'Classic flat finish',
        font: 'Arial',
        fontUrl: 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
        fontSize: 0.6
    },
    {
        key: '3d',
        label: '3D Gel Plate',
        price: 25.49,
        description: 'Raised 3D letters with gel finish',
        font: 'Arial Bold',
        fontUrl: 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
        fontSize: 0.65
    },
    {
        key: '4d',
        label: '4D Gel Plate',
        price: 28.49,
        description: 'Premium 4D raised letters',
        font: 'Impact',
        fontUrl: 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
        fontSize: 0.7
    },
    {
        key: '4d-neon-gel',
        label: '4D Neon Gel Orange',
        price: 32.99,
        description: 'Neon effect with 4D letters',
        font: 'Impact Bold',
        fontUrl: 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
        fontSize: 0.7
    },
    {
        key: '5d-gel',
        label: '5D Gel Plate',
        price: 35.99,
        description: 'Ultra premium 5D finish',
        font: 'Helvetica Bold',
        fontUrl: 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
        fontSize: 0.75
    },
    {
        key: 'laser',
        label: 'Laser Cut Plate',
        price: 22.99,
        description: 'Precision laser cut letters',
        font: 'Futura',
        fontUrl: 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
        fontSize: 0.6
    },
    {
        key: 'carbon-fiber',
        label: 'Carbon Fiber Plate',
        price: 45.99,
        description: 'Carbon fiber texture',
        font: 'Eurostile',
        fontUrl: 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
        fontSize: 0.65
    }
];

export const thicknessOptions = [
    { key: '3mm', label: '3mm Standard', price: 0, value: 0.15 },
    { key: '5mm', label: '5mm Premium', price: 2.99, value: 0.25 },
    { key: '8mm', label: '8mm Ultra', price: 5.99, value: 0.4 }
];

export const colorOptions = [
    { color: '#000000', name: 'Black', price: 0 },
    { color: '#FFFFFF', name: 'White', price: 1.99 },
    { color: '#FF0000', name: 'Red', price: 2.99 },
    { color: '#0000FF', name: 'Blue', price: 2.99 },
    { color: '#00FF00', name: 'Green', price: 2.99 },
    { color: '#FFD700', name: 'Gold', price: 4.99 },
    { color: '#C0C0C0', name: 'Silver', price: 3.99 },
    { color: '#800080', name: 'Purple', price: 2.99 },
    { color: '#FFA500', name: 'Orange', price: 2.99 },
    { color: 'custom', name: 'Custom Color', price: 5.99 }
];

export const shadowOptions = [
    { key: 'none', name: 'No Shadow', price: 0 },
    { key: 'soft', name: 'Soft Shadow', price: 2.99 },
    { key: 'hard', name: 'Hard Shadow', price: 2.99 },
    { key: 'black-outline', name: 'Black Outline', price: 3.99 },
    { key: 'gray-outline', name: 'Gray Outline', price: 3.99 },
    { key: 'white-outline', name: 'White Outline', price: 3.99 },
    { key: 'colored-outline', name: 'Colored Outline', price: 4.99 },
    { key: 'neon', name: 'Neon Glow', price: 7.99 },
    { key: 'led', name: 'LED Effect', price: 9.99 }
];

export const borderOptions = [
    { key: 'none', name: 'No Border', price: 0, color: 'transparent' },
    { key: 'black', name: 'Black Border', price: 3.99, color: '#000000' },
    { key: 'white', name: 'White Border', price: 3.99, color: '#FFFFFF' },
    { key: 'red', name: 'Red Border', price: 4.99, color: '#FF0000' },
    { key: 'blue', name: 'Blue Border', price: 4.99, color: '#0000FF' },
    { key: 'green', name: 'Green Border', price: 4.99, color: '#00FF00' },
    { key: 'gold', name: 'Gold Border', price: 6.99, color: '#FFD700' },
    { key: 'silver', name: 'Silver Border', price: 5.99, color: '#C0C0C0' },
    { key: 'orange-krystal', name: 'Orange Krystal', price: 5.49, color: '#FF8C00' },
    { key: 'red-krystal', name: 'Red Krystal', price: 5.49, color: '#DC143C' },
    { key: 'blue-krystal', name: 'Blue Krystal', price: 5.49, color: '#0066CC' },
    { key: 'green-krystal', name: 'Green Krystal', price: 5.49, color: '#228B22' }
];

export const sizeOptions = [
    { key: '18-oblong', label: '18" Oblong', price: 1.99, dimensions: '533mm x 152mm', description: 'Standard UK size' },
    { key: '21-oblong', label: '21" Oblong', price: 2.99, dimensions: '533mm x 152mm', description: 'Extended length' },
    { key: 'square', label: 'Square Plate', price: 2.49, dimensions: '279mm x 203mm', description: 'Classic square format' },
    { key: 'motorcycle', label: 'Motorcycle', price: 1.49, dimensions: '229mm x 164mm', description: 'Bike specific size' },
    { key: '4x4', label: '4x4 Badge', price: 3.99, dimensions: '533mm x 152mm', description: 'Off-road vehicle badge' }
];

export const finishOptions = [
    { key: 'standard', label: 'Standard Finish', price: 0, description: 'Matte protective coating' },
    { key: 'gloss', label: 'High Gloss', price: 2.99, description: 'Glossy protective coating' },
    { key: 'anti-tamper', label: 'Anti-Tamper', price: 4.99, description: 'Security screws included' },
    { key: 'weatherproof', label: 'Weatherproof', price: 3.99, description: 'Enhanced weather protection' }
];

export const countryOptions = [
    { key: 'none', name: 'No Country Badge' },
    { key: 'uk', name: 'United Kingdom' },
    { key: 'wales', name: 'Wales' },
    { key: 'scotland', name: 'Scotland' },
    { key: 'ireland', name: 'Ireland' },
    { key: 'custom', name: 'Custom Country' }
];

export const flagOptions = {
    uk: [
        { key: 'none', name: 'No Flag', text: '', price: 0, flagImage: null },
        { 
            key: 'union-jack', 
            name: 'Union Jack', 
            text: 'UK', 
            price: 3.99, 
            flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA2MCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMDA2NkNDIi8+CjxwYXRoIGQ9Ik0wIDBoNjBsMCAxNUgweiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNMCAxNWg2MHYxNUgweiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNMjcgMGg2djMwSDE2eiIgZmlsbD0iI0ZGMDAwMCIvPgo8cGF0aCBkPSJNMCAxMmg2MHY2SDB6IiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPg==' 
        }
    ],
    wales: [
        { key: 'none', name: 'No Flag', text: '', price: 0, flagImage: null },
        { 
            key: 'wales-flag', 
            name: 'Wales Flag', 
            text: 'CYM', 
            price: 3.99, 
            flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA2MCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHk9IjE1IiB3aWR0aD0iNjAiIGhlaWdodD0iMTUiIGZpbGw9IiMwMDgwMDAiLz4KPC9zdmc+' 
        }
    ],
    scotland: [
        { key: 'none', name: 'No Flag', text: '', price: 0, flagImage: null },
        { 
            key: 'scotland-flag', 
            name: 'Scotland Flag', 
            text: 'SCO', 
            price: 3.99, 
            flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA2MCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMDA2NkNDIi8+CjwvSVNH' 
        }
    ],
    ireland: [
        { key: 'none', name: 'No Flag', text: '', price: 0, flagImage: null },
        { 
            key: 'ireland-flag', 
            name: 'Ireland Flag', 
            text: 'IRE', 
            price: 3.99, 
            flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA2MCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMDA4MDAwIi8+CjxyZWN0IHg9IjIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iNDAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI0ZGNjYwMCIvPgo8L3N2Zz4=' 
        }
    ],
    custom: [
        { key: 'none', name: 'No Flag', text: '', price: 0, flagImage: null },
        { key: 'custom-upload', name: 'Custom Upload', text: 'CUSTOM', price: 7.99, flagImage: null }
    ]
};