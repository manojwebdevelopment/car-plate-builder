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

// export const plateStyles = [
//     {
//         key: 'standard',
//         label: 'Standard Plate',
//         price: 15.99,
//         description: 'Classic flat finish',
//         font: 'Arial',
//         fontUrl: 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
//         fontSize: 0.65
//     },
//     {
//         key: '3d',
//         label: '3D Gel Plate',
//         price: 25.49,
//         description: 'Raised 3D letters with gel finish',
//         font: 'Arial Bold',
//         // fontUrl: 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
//         fontUrl: 'fonts/Diplomata SC_Regular.json',
//         fontSize: 0.65
//     },
//     {
//         key: '4d',
//         label: '4D Gel Plate',
//         price: 28.49,
//         description: 'Premium 4D raised letters',
//         font: 'Impact',
//         // fontUrl: 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
//         fontUrl: 'fonts/3D Isometric_Regular.json',
//         fontSize: 0.65
//     },
//     {
//         key: '4d-neon-gel',
//         label: '4D Neon Gel Orange',
//         price: 32.99,
//         description: 'Neon effect with 4D letters',
//         font: 'Impact Bold',
//         // fontUrl: 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
//         fontUrl: 'fonts/Drift Blade Demo_Regular.json',
//         fontSize: 0.65
//     },
//     {
//         key: '5d-gel',
//         label: '5D Gel Plate',
//         price: 35.99,
//         description: 'Ultra premium 5D finish',
//         font: 'Helvetica Bold',
//         // fontUrl: 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
//         fontUrl: 'fonts/RiderwayDemo_Regular.json',
//         fontSize: 0.65
//     },
//     {
//         key: 'laser',
//         label: 'Laser Cut Plate',
//         price: 22.99,
//         description: 'Precision laser cut letters',
//         font: 'Futura',
//         // fontUrl: 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
//         // fontUrl: 'fonts/Novox Varsity_Regular.json',
//         fontUrl: 'fonts/JAGTECH_Regular.json',
//         fontSize: 0.65
//     },
//     {
//         key: 'carbon-fiber',
//         label: 'Carbon Fiber Plate',
//         price: 45.99,
//         description: 'Carbon fiber texture',
//         font: 'Eurostile',
//         // fontUrl: 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
//         // fontUrl: 'fonts/Deventer PERSONAL USE_Regular.json',
//         fontUrl: 'fonts/Car-Go Plain 3.1 Demo_Regular.json',
//         fontSize: 0.65
//     }
// ];

// export const thicknessOptions = [
//     { key: '3mm', label: '3mm Standard', price: 0, value: 0.15 },
//     { key: '5mm', label: '5mm Premium', price: 2.99, value: 0.25 },
//     { key: '8mm', label: '8mm Ultra', price: 5.99, value: 0.4 }
// ];

// export const colorOptions = [
//     { color: '#000000', name: 'Black', price: 0 },
//     { color: '#FFFFFF', name: 'White', price: 1.99 },
//     { color: '#FF0000', name: 'Red', price: 2.99 },
//     { color: '#0000FF', name: 'Blue', price: 2.99 },
//     { color: '#00FF00', name: 'Green', price: 2.99 },
//     { color: '#FFD700', name: 'Gold', price: 4.99 },
//     { color: '#C0C0C0', name: 'Silver', price: 3.99 },
//     { color: '#800080', name: 'Purple', price: 2.99 },
//     { color: '#FFA500', name: 'Orange', price: 2.99 },
//     { color: 'custom', name: 'Custom Color', price: 5.99 }
// ];

// export const shadowOptions = [
//     { key: 'none', name: 'No Effect', price: 0 },
//     { key: 'colored-outline', name: 'Colored Outline', price: 4.99 }
// ];

// export const borderOptions = [
//     { key: 'none', name: 'No Border', price: 0, color: 'transparent' },
//     { key: 'black', name: 'Black Border', price: 3.99, color: '#000000' },
//     { key: 'white', name: 'White Border', price: 3.99, color: '#FFFFFF' },
//     { key: 'red', name: 'Red Border', price: 4.99, color: '#FF0000' },
//     { key: 'blue', name: 'Blue Border', price: 4.99, color: '#0000FF' },
//     { key: 'green', name: 'Green Border', price: 4.99, color: '#00FF00' },
//     { key: 'gold', name: 'Gold Border', price: 6.99, color: '#FFD700' },
//     { key: 'silver', name: 'Silver Border', price: 5.99, color: '#C0C0C0' },
//     { key: 'orange-krystal', name: 'Orange Krystal', price: 5.49, color: '#FF8C00' },
//     { key: 'red-krystal', name: 'Red Krystal', price: 5.49, color: '#DC143C' },
//     { key: 'blue-krystal', name: 'Blue Krystal', price: 5.49, color: '#0066CC' },
//     { key: 'green-krystal', name: 'Green Krystal', price: 5.49, color: '#228B22' }
// ];

// export const sizeOptions = [
//     { key: '18-oblong', label: '18" Oblong', price: 1.99, dimensions: '533mm x 152mm', description: 'Standard UK size' },
//     { key: '21-oblong', label: '21" Oblong', price: 2.99, dimensions: '533mm x 152mm', description: 'Extended length' },
//     // { key: 'square', label: 'Square Plate', price: 2.49, dimensions: '279mm x 203mm', description: 'Classic square format' },
//     // { key: 'motorcycle', label: 'Motorcycle', price: 1.49, dimensions: '229mm x 164mm', description: 'Bike specific size' },
//     { key: '4x4', label: '4x4 Badge', price: 3.99, dimensions: '533mm x 152mm', description: 'Off-road vehicle badge' }
// ];

// export const finishOptions = [
//     { key: 'standard', label: 'Standard Finish', price: 0, description: 'Matte protective coating' },
//     { key: 'gloss', label: 'High Gloss', price: 2.99, description: 'Glossy protective coating' },
//     { key: 'anti-tamper', label: 'Anti-Tamper', price: 4.99, description: 'Security screws included' },
//     { key: 'weatherproof', label: 'Weatherproof', price: 3.99, description: 'Enhanced weather protection' }
// ];

// export const countryOptions = [
//     { key: 'none', name: 'No Country Badge' },
//     { key: 'uk', name: 'United Kingdom' },
//     { key: 'wales', name: 'Wales' },
//     { key: 'scotland', name: 'Scotland' },
//     { key: 'ireland', name: 'Ireland' },
//     { key: 'custom', name: 'Custom Country' }
// ];

// export const flagOptions = {
//     uk: [
//         { key: 'none', name: 'No Flag', text: '', price: 0, flagImage: null },
//         { 
//             key: 'union-jack', 
//             name: 'Union Jack', 
//             text: 'UK', 
//             price: 3.99, 
//             flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA2MCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMDA2NkNDIi8+CjxwYXRoIGQ9Ik0wIDBoNjBsMCAxNUgweiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNMCAxNWg2MHYxNUgweiIgZmlsbD0iI0ZGRkZGRiIvPgo8cGF0aCBkPSJNMjcgMGg2djMwSDE2eiIgZmlsbD0iI0ZGMDAwMCIvPgo8cGF0aCBkPSJNMCAxMmg2MHY2SDB6IiBmaWxsPSIjRkYwMDAwIi8+Cjwvc3ZnPg==' 
//         }
//     ],
//     wales: [
//         { key: 'none', name: 'No Flag', text: '', price: 0, flagImage: null },
//         { 
//             key: 'wales-flag', 
//             name: 'Wales Flag', 
//             text: 'CYM', 
//             price: 3.99, 
//             flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA2MCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHk9IjE1IiB3aWR0aD0iNjAiIGhlaWdodD0iMTUiIGZpbGw9IiMwMDgwMDAiLz4KPC9zdmc+' 
//         }
//     ],
//     scotland: [
//         { key: 'none', name: 'No Flag', text: '', price: 0, flagImage: null },
//         { 
//             key: 'scotland-flag', 
//             name: 'Scotland Flag', 
//             text: 'SCO', 
//             price: 3.99, 
//             flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA2MCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMDA2NkNDIi8+CjwvSVNH' 
//         }
//     ],
//     ireland: [
//         { key: 'none', name: 'No Flag', text: '', price: 0, flagImage: null },
//         { 
//             key: 'ireland-flag', 
//             name: 'Ireland Flag', 
//             text: 'IRE', 
//             price: 3.99, 
//             flagImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCA2MCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMDA4MDAwIi8+CjxyZWN0IHg9IjIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3QgeD0iNDAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI0ZGNjYwMCIvPgo8L3N2Zz4=' 
//         }
//     ],
//     custom: [
//         { key: 'none', name: 'No Flag', text: '', price: 0, flagImage: null },
//         { key: 'custom-upload', name: 'Custom Upload', text: 'CUSTOM', price: 7.99, flagImage: null }
//     ]
// };

export const plateStyles = [
    {
        key: 'standard',
        label: 'Standard Plate',
        price: 15.99,
        description: 'Classic flat finish',
        font: 'Arial',
        fontUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/droid/droid_sans_bold.typeface.json',
        fontSize: 0.65,
        outlineColor: null,
        thickness: 0.01, // 3mm default
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    // 3D Gel variants with different thicknesses
    {
        key: '3d-gel-3mm',
        label: '3D Gel 3mm',
        price: 25.49,
        description: 'Raised 3D letters with gel finish - 3mm thickness',
        font: 'Arial Bold',
        fontUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/droid/droid_sans_bold.typeface.json',
        fontSize: 0.65,
        outlineColor: null,
        thickness: 0.05,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    {
        key: '3d-gel-5mm',
        label: '3D Gel 5mm',
        price: 28.48,
        description: 'Raised 3D letters with gel finish - 5mm thickness',
        font: 'Arial Bold',
        fontUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/droid/droid_sans_bold.typeface.json',
        fontSize: 0.65,
        outlineColor: null,
        thickness: 0.10,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    // 4D Gel variants with different thicknesses
    {
        key: '4d-gel-3mm',
        label: '4D Gel 3mm',
        price: 28.49,
        description: 'Premium 4D raised letters - 3mm thickness',
        font: 'Impact',
        fontUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/droid/droid_sans_bold.typeface.json',
        fontSize: 0.65,
        outlineColor: null,
        thickness: 0.03,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    {
        key: '4d-gel-5mm',
        label: '4D Gel 5mm',
        price: 31.48,
        description: 'Premium 4D raised letters - 5mm thickness',
        font: 'Impact',
        fontUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/droid/droid_sans_bold.typeface.json',
        fontSize: 0.65,
        outlineColor: null,
        thickness: 0.10,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    // 4D Crystal variants with different thicknesses and colors
    {
        key: '4d-crystal-green-3mm',
        label: '4D Crystal Green 3mm',
        price: 32.99,
        description: '4D letters with green crystal outline - 3mm thickness',
        font: 'Impact Bold',
        fontUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/droid/droid_sans_bold.typeface.json',
        fontSize: 0.65,
        outlineColor: '#00FF00',
        thickness: 0.05,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    {
        key: '4d-crystal-green-5mm',
        label: '4D Crystal Green 5mm',
        price: 35.98,
        description: '4D letters with green crystal outline - 5mm thickness',
        font: 'Impact Bold',
        fontUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/droid/droid_sans_bold.typeface.json',
        fontSize: 0.65,
        outlineColor: '#00FF00',
        thickness: 0.10,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    {
        key: '4d-crystal-red-3mm',
        label: '4D Crystal Red 3mm',
        price: 32.99,
        description: '4D letters with red crystal outline - 3mm thickness',
        font: 'Impact Bold',
        fontUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/droid/droid_sans_bold.typeface.json',
        fontSize: 0.65,
        outlineColor: '#FF0000',
        thickness: 0.05,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    {
        key: '4d-crystal-red-5mm',
        label: '4D Crystal Red 5mm',
        price: 35.98,
        description: '4D letters with red crystal outline - 5mm thickness',
        font: 'Impact Bold',
        fontUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/droid/droid_sans_bold.typeface.json',
        fontSize: 0.65,
        outlineColor: '#FF0000',
        thickness: 0.10,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    {
        key: '4d-crystal-blue-3mm',
        label: '4D Crystal Blue 3mm',
        price: 32.99,
        description: '4D letters with blue crystal outline - 3mm thickness',
        font: 'Impact Bold',
        fontUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/droid/droid_sans_bold.typeface.json',
        fontSize: 0.65,
        outlineColor: '#0066CC',
        thickness: 0.05,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    {
        key: '4d-crystal-blue-5mm',
        label: '4D Crystal Blue 5mm',
        price: 35.98,
        description: '4D letters with blue crystal outline - 5mm thickness',
        font: 'Impact Bold',
        fontUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/droid/droid_sans_bold.typeface.json',
        fontSize: 0.65,
        outlineColor: '#0066CC',
        thickness: 0.10,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    // 4D Neon Gel variants with different thicknesses and colors
    {
        key: '4d-neon-gel-green-3mm',
        label: '4D Neon Gel Green 3mm',
        price: 34.99,
        description: 'Neon effect with green 4D letters - 3mm thickness',
        font: 'Impact Bold',
        fontUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/droid/droid_sans_bold.typeface.json',
        fontSize: 0.65,
        outlineColor: '#00FF00',
        thickness: 0.05,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    {
        key: '4d-neon-gel-green-5mm',
        label: '4D Neon Gel Green 5mm',
        price: 37.98,
        description: 'Neon effect with green 4D letters - 5mm thickness',
        font: 'Impact Bold',
        fontUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/droid/droid_sans_bold.typeface.json',
        fontSize: 0.65,
        outlineColor: '#00FF00',
        thickness: 0.10,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    {
        key: '4d-neon-gel-red-3mm',
        label: '4D Neon Gel Red 3mm',
        price: 34.99,
        description: 'Neon effect with red 4D letters - 3mm thickness',
        font: 'Impact Bold',
        fontUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/droid/droid_sans_bold.typeface.json',
        fontSize: 0.65,
        outlineColor: '#FF0000',
        thickness: 0.05,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    {
        key: '4d-neon-gel-red-5mm',
        label: '4D Neon Gel Red 5mm',
        price: 37.98,
        description: 'Neon effect with red 4D letters - 5mm thickness',
        font: 'Impact Bold',
        fontUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/droid/droid_sans_bold.typeface.json',
        fontSize: 0.65,
        outlineColor: '#FF0000',
        thickness: 0.10,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    {
        key: '5d-gel-5mm',
        label: '5D Gel 5mm',
        price: 35.99,
        description: 'Ultra premium 5D finish - 5mm thickness',
        font: 'Helvetica Bold',
        fontUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/droid/droid_sans_bold.typeface.json',
        fontSize: 0.65,
        outlineColor: null,
        thickness: 0.10,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    {
        key: 'laser-cut-3mm',
        label: 'Laser Cut 3mm',
        price: 22.99,
        description: 'Precision laser cut letters - 3mm thickness',
        font: 'Futura',
        fontUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/droid/droid_sans_bold.typeface.json',
        fontSize: 0.65,
        outlineColor: null,
        thickness: 0.05,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    {
        key: 'carbon-fiber-5mm',
        label: 'Carbon Fiber 5mm',
        price: 45.99,
        description: 'Carbon fiber texture - 5mm thickness',
        font: 'Eurostile',
        fontUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/droid/droid_sans_bold.typeface.json',
        fontSize: 0.65,
        outlineColor: null,
        thickness: 0.10,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    }
];

// Remove separate thickness options since it's now built into plate styles
export const thicknessOptions = [];

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
    { key: 'none', name: 'No Effect', price: 0 }
];

// Updated border options - proper text area borders with margins
export const borderOptions = [
    { 
        key: 'none', 
        name: 'No Border', 
        price: 0, 
        color: 'transparent', 
        type: 'none', 
        borderWidth: 0,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    
    // 4D Functional Borders (only 3mm and 5mm border width, not thickness)
    { 
        key: '4d-black-3mm', 
        name: '4D Black 3mm Border', 
        price: 3.99, 
        color: '#000000', 
        type: '4d', 
        borderWidth: 3,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: '4d-black-5mm', 
        name: '4D Black 5mm Border', 
        price: 5.99, 
        color: '#000000', 
        type: '4d', 
        borderWidth: 5,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    
    // Printed Borders - various colors
    { 
        key: 'printed-black', 
        name: 'Printed Black Border', 
        price: 3.99, 
        color: '#000000', 
        type: 'printed', 
        borderWidth: 2,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'printed-blue', 
        name: 'Printed Blue Border', 
        price: 4.99, 
        color: '#0000FF', 
        type: 'printed', 
        borderWidth: 2,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'printed-red', 
        name: 'Printed Red Border', 
        price: 4.99, 
        color: '#FF0000', 
        type: 'printed', 
        borderWidth: 2,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'printed-green', 
        name: 'Printed Green Border', 
        price: 4.99, 
        color: '#00FF00', 
        type: 'printed', 
        borderWidth: 2,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'printed-orange', 
        name: 'Printed Orange Border', 
        price: 4.99, 
        color: '#FF8C00', 
        type: 'printed', 
        borderWidth: 2,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'printed-white', 
        name: 'Printed White Border', 
        price: 3.99, 
        color: '#FFFFFF', 
        type: 'printed', 
        borderWidth: 2,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'printed-gold', 
        name: 'Printed Gold Border', 
        price: 6.99, 
        color: '#FFD700', 
        type: 'printed', 
        borderWidth: 2,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'printed-silver', 
        name: 'Printed Silver Border', 
        price: 5.99, 
        color: '#C0C0C0', 
        type: 'printed', 
        borderWidth: 2,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    
    // Crystal Borders - with glow effects
    { 
        key: 'crystal-blue', 
        name: 'Crystal Blue Border', 
        price: 7.99, 
        color: '#0066CC', 
        type: 'crystal', 
        borderWidth: 3,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'crystal-green', 
        name: 'Crystal Green Border', 
        price: 7.99, 
        color: '#00FF00', 
        type: 'crystal', 
        borderWidth: 3,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'crystal-red', 
        name: 'Crystal Red Border', 
        price: 7.99, 
        color: '#FF0000', 
        type: 'crystal', 
        borderWidth: 3,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'crystal-orange', 
        name: 'Crystal Orange Border', 
        price: 7.99, 
        color: '#FF8C00', 
        type: 'crystal', 
        borderWidth: 3,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'crystal-purple', 
        name: 'Crystal Purple Border', 
        price: 7.99, 
        color: '#800080', 
        type: 'crystal', 
        borderWidth: 3,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'crystal-white', 
        name: 'Crystal White Border', 
        price: 7.99, 
        color: '#FFFFFF', 
        type: 'crystal', 
        borderWidth: 3,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    
    // Standard Color Borders
    { 
        key: 'standard-black', 
        name: 'Black Border', 
        price: 2.99, 
        color: '#000000', 
        type: 'standard', 
        borderWidth: 2,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'standard-white', 
        name: 'White Border', 
        price: 2.99, 
        color: '#FFFFFF', 
        type: 'standard', 
        borderWidth: 2,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'standard-blue', 
        name: 'Blue Border', 
        price: 3.99, 
        color: '#0000FF', 
        type: 'standard', 
        borderWidth: 2,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'standard-red', 
        name: 'Red Border', 
        price: 3.99, 
        color: '#FF0000', 
        type: 'standard', 
        borderWidth: 2,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'standard-green', 
        name: 'Green Border', 
        price: 3.99, 
        color: '#00FF00', 
        type: 'standard', 
        borderWidth: 2,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'standard-yellow', 
        name: 'Yellow Border', 
        price: 3.99, 
        color: '#FFFF00', 
        type: 'standard', 
        borderWidth: 2,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'standard-purple', 
        name: 'Purple Border', 
        price: 3.99, 
        color: '#800080', 
        type: 'standard', 
        borderWidth: 2,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'standard-orange', 
        name: 'Orange Border', 
        price: 3.99, 
        color: '#FF8C00', 
        type: 'standard', 
        borderWidth: 2,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'standard-gold', 
        name: 'Gold Border', 
        price: 5.99, 
        color: '#FFD700', 
        type: 'standard', 
        borderWidth: 2,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'standard-silver', 
        name: 'Silver Border', 
        price: 4.99, 
        color: '#C0C0C0', 
        type: 'standard', 
        borderWidth: 2,
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    }
];

export const sizeOptions = [
    { 
        key: '18-oblong', 
        label: '18" Oblong', 
        price: 1.99, 
        dimensions: '533mm x 152mm', 
        description: 'Standard UK size',
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: '21-oblong', 
        label: '21" Oblong', 
        price: 2.99, 
        dimensions: '533mm x 152mm', 
        description: 'Extended length',
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: '4x4', 
        label: '4x4 Badge', 
        price: 3.99, 
        dimensions: '533mm x 152mm', 
        description: 'Off-road vehicle badge',
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    }
];

export const finishOptions = [
    { 
        key: 'standard', 
        label: 'Standard Finish', 
        price: 0, 
        description: 'Matte protective coating',
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'gloss', 
        label: 'High Gloss', 
        price: 2.99, 
        description: 'Glossy protective coating',
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'anti-tamper', 
        label: 'Anti-Tamper', 
        price: 4.99, 
        description: 'Security screws included',
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    },
    { 
        key: 'weatherproof', 
        label: 'Weatherproof', 
        price: 3.99, 
        description: 'Enhanced weather protection',
        image: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp'
    }
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