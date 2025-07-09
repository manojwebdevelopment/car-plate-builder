// // Step 2: Checkout Page - Create new file: src/pages/CheckoutPage.jsx

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import { NewtonsCradle } from 'ldrs/react';

// const CheckoutPage = () => {
//   const navigate = useNavigate();
//   const { cart, getCartTotal, clearCart } = useCart();
  
//   const [loading, setLoading] = useState(false);
//   const [loadingMessage, setLoadingMessage] = useState('');
//   const [errors, setErrors] = useState({});
  
//   const [customerInfo, setCustomerInfo] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     postcode: '',
//     country: 'IN'
//   });

//   // Redirect if cart is empty
//   useEffect(() => {
//     if (!cart || cart.length === 0) {
//       navigate('/basket');
//     }
//   }, [cart, navigate]);

//   // Calculate totals
//   const subtotal = getCartTotal();
//   const taxRate = 0.18; // 18% GST for India
//   const tax = subtotal * taxRate;
//   const shipping = 0; // Free shipping for now
//   const total = subtotal + tax + shipping;

//   // Validate Indian postcode
//   const validatePostcode = (postcode) => {
//     const indianPostcodeRegex = /^[1-9][0-9]{5}$/;
//     return indianPostcodeRegex.test(postcode);
//   };

//   // Validate email
//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   // Validate phone (Indian format)
//   const validatePhone = (phone) => {
//     const phoneRegex = /^[6-9]\d{9}$/;
//     return phoneRegex.test(phone.replace(/\s/g, ''));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     // Required field validation
//     if (!customerInfo.firstName.trim()) newErrors.firstName = 'First name is required';
//     if (!customerInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
//     if (!customerInfo.email.trim()) newErrors.email = 'Email is required';
//     if (!customerInfo.phone.trim()) newErrors.phone = 'Phone is required';
//     if (!customerInfo.address.trim()) newErrors.address = 'Address is required';
//     if (!customerInfo.city.trim()) newErrors.city = 'City is required';
//     if (!customerInfo.postcode.trim()) newErrors.postcode = 'Postcode is required';

//     // Format validation
//     if (customerInfo.email && !validateEmail(customerInfo.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }
    
//     // Remove this phone validation block:
//     // if (customerInfo.phone && !validatePhone(customerInfo.phone)) {
//     //   newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
//     // }
    
//     if (customerInfo.postcode && !validatePostcode(customerInfo.postcode)) {
//       newErrors.postcode = 'Please enter a valid 6-digit Indian postcode';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerInfo(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const createOrderAndProceedToPayPal = async () => {
//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);
//     setLoadingMessage('Creating your order...');

//     try {
//       // Prepare order data
//       const orderData = {
//         customer: customerInfo,
//         items: cart.map(item => ({
//           name: item.name,
//           type: item.type || 'plate',
//           price: item.price,
//           quantity: item.quantity,
//           subtotal: item.subtotal || (item.price * item.quantity),
//           plateConfiguration: {
//             text: item.registration || item.text || 'UNKNOWN',
//             spacing: item.spacing || 'legal',
//             displayText: item.displayText || item.registration || item.text,
//             side: item.side || 'front',
//             size: {
//               key: item.size || 'standard',
//               label: item.sizeLabel || 'Standard Size',
//               dimensions: item.sizeDimensions || '520mm x 111mm'
//             },
//             plateStyle: {
//               key: item.plateStyle || 'standard',
//               label: item.styleLabel || 'Standard Plate',
//               font: item.font || 'Charles Wright',
//               fontSize: item.fontSize || 79,
//               price: item.stylePrice || 0
//             },
//             fontColor: {
//               key: item.fontColor || 'black',
//               name: item.fontColorName || 'Black',
//               color: item.fontColor || '#000000',
//               price: item.fontColorPrice || 0
//             },
//             border: {
//               key: item.borderStyle || 'none',
//               name: item.borderName || 'No Border',
//               type: item.borderType || 'none',
//               color: item.borderColor || '',
//               borderWidth: item.borderWidth || 0,
//               price: item.borderPrice || 0
//             },
//             countryBadge: {
//               key: item.countryBadge || 'none',
//               name: item.badgeName || 'No Badge',
//               country: item.selectedCountry || 'in',
//               flagImage: item.flagImage || '',
//               position: item.badgePosition || 'left',
//               price: item.badgePrice || 0
//             },
//             finish: {
//               key: item.finish || 'standard',
//               label: item.finishLabel || 'Standard Finish',
//               description: item.finishDescription || '',
//               price: item.finishPrice || 0
//             },
//             thickness: {
//               key: item.thickness || '3mm',
//               label: item.thicknessLabel || '3mm Standard',
//               value: item.thicknessValue || 3,
//               price: item.thicknessPrice || 0
//             },
//             shadowEffect: {
//               key: item.shadowEffect || 'none',
//               name: item.shadowName || 'No Effect',
//               description: item.shadowDescription || '',
//               price: item.shadowPrice || 0
//             },
//             roadLegal: item.roadLegal || 'No',
//             legalNotes: item.roadLegal === 'No' ? 'Show plates only - not for road use' : ''
//           }
//         })),
//         pricing: {
//           subtotal,
//           discount: 0,
//           shipping,
//           tax,
//           taxRate,
//           total
//         },
//         originalCartData: cart // Store for restoration if needed
//       };

//       console.log('Creating order with data:', orderData);

//       // Create order in database
//       const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders/create`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(orderData),
//       });

//       const result = await response.json();
      
//       if (!result.success) {
//         throw new Error(result.error || 'Failed to create order');
//       }

//       console.log('Order created:', result.orderId);
      
//       // Store order ID for payment processing
//       localStorage.setItem('currentOrderId', result.orderId);
      
//       setLoadingMessage('Redirecting to PayPal...');

//       // Create PayPal order
//       const paypalResponse = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/create-paypal-order`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           amount: total.toFixed(2),
//           currency: 'GBP',
//           orderId: result.orderId // Pass our order ID to PayPal
//         }),
//       });

//       const paypalResult = await paypalResponse.json();
      
//       if (!paypalResult.id) {
//         throw new Error('Failed to create PayPal order');
//       }

//       // Update our order with PayPal order ID
//       await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders/${result.orderId}/paypal`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           paypalOrderId: paypalResult.id
//         }),
//       });

//       // Redirect to PayPal
//       const approvalUrl = paypalResult.links.find(link => link.rel === 'approve')?.href;
//       if (approvalUrl) {
//         window.location.href = approvalUrl;
//       } else {
//         throw new Error('PayPal approval URL not found');
//       }

//     } catch (error) {
//       console.error('Error creating order:', error);
//       setErrors({ submit: error.message });
//       setLoading(false);
//       setLoadingMessage('');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-dark">
//         <div className="text-center">
//           <div className="mb-4">
//             <NewtonsCradle
//               size="78"
//               speed="1.4"
//               color="#ffc107"
//             />
//           </div>
//           <h3 className="text-white mb-2">{loadingMessage}</h3>
//           <p className="text-warning">Please wait, do not close this window...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-5">
//       <div className="row justify-content-center">
//         <div className="col-lg-8">
//           <div className="card shadow-lg border-0">
//             <div className="card-header bg-warning text-dark">
//               <h4 className="mb-0">
//                 <i className="bi bi-person-fill me-2"></i>
//                 Checkout Information
//               </h4>
//             </div>
//             <div className="card-body p-4">
              
//               {/* Order Summary */}
//               <div className="row mb-4">
//                 <div className="col-md-6">
//                   <h5 className="text-warning">Order Summary</h5>
//                   <div className="bg-light p-3 rounded">
//                     <div className="d-flex justify-content-between mb-2">
//                       <span>Items ({cart.length}):</span>
//                       <span>£{subtotal.toFixed(2)}</span>
//                     </div>
//                     <div className="d-flex justify-content-between mb-2">
//                       <span>Shipping:</span>
//                       <span className="text-success">FREE</span>
//                     </div>
//                     <div className="d-flex justify-content-between mb-2">
//                       <span>GST (18%):</span>
//                       <span>£{tax.toFixed(2)}</span>
//                     </div>
//                     <hr />
//                     <div className="d-flex justify-content-between fw-bold">
//                       <span>Total:</span>
//                       <span className="text-success">£{total.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <h5 className="text-warning">Your Items</h5>
//                   <div className="bg-light p-3 rounded" style={{ maxHeight: '200px', overflowY: 'auto' }}>
//                     {cart.map((item, index) => (
//                       <div key={index} className="d-flex justify-content-between align-items-center mb-2">
//                         <div className="small">
//                           <strong>{item.name}</strong><br />
//                           <span className="text-muted">Qty: {item.quantity}</span>
//                         </div>
//                         <span className="small fw-bold">£{item.subtotal?.toFixed(2)}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Customer Information Form */}
//               <form onSubmit={(e) => { e.preventDefault(); createOrderAndProceedToPayPal(); }}>
//                 <h5 className="text-warning mb-3">Customer Information</h5>
                
//                 <div className="row g-3">
//                   {/* First Name */}
//                   <div className="col-md-6">
//                     <label className="form-label">First Name *</label>
//                     <input
//                       type="text"
//                       className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
//                       name="firstName"
//                       value={customerInfo.firstName}
//                       onChange={handleInputChange}
//                       placeholder="Enter first name"
//                     />
//                     {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
//                   </div>

//                   {/* Last Name */}
//                   <div className="col-md-6">
//                     <label className="form-label">Last Name *</label>
//                     <input
//                       type="text"
//                       className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
//                       name="lastName"
//                       value={customerInfo.lastName}
//                       onChange={handleInputChange}
//                       placeholder="Enter last name"
//                     />
//                     {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
//                   </div>

//                   {/* Email */}
//                   <div className="col-md-6">
//                     <label className="form-label">Email Address *</label>
//                     <input
//                       type="email"
//                       className={`form-control ${errors.email ? 'is-invalid' : ''}`}
//                       name="email"
//                       value={customerInfo.email}
//                       onChange={handleInputChange}
//                       placeholder="Enter email address"
//                     />
//                     {errors.email && <div className="invalid-feedback">{errors.email}</div>}
//                   </div>

//                   {/* Phone */}
//                   <div className="col-md-6">
//                     <label className="form-label">Phone Number *</label>
//                     <input
//                       type="tel"
//                       className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
//                       name="phone"
//                       value={customerInfo.phone}
//                       onChange={handleInputChange}
//                       placeholder="10-digit mobile number"
//                     />
//                     {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
//                   </div>

//                   {/* Address */}
//                   <div className="col-12">
//                     <label className="form-label">Address *</label>
//                     <input
//                       type="text"
//                       className={`form-control ${errors.address ? 'is-invalid' : ''}`}
//                       name="address"
//                       value={customerInfo.address}
//                       onChange={handleInputChange}
//                       placeholder="Enter full address"
//                     />
//                     {errors.address && <div className="invalid-feedback">{errors.address}</div>}
//                   </div>

//                   {/* City */}
//                   <div className="col-md-6">
//                     <label className="form-label">City *</label>
//                     <input
//                       type="text"
//                       className={`form-control ${errors.city ? 'is-invalid' : ''}`}
//                       name="city"
//                       value={customerInfo.city}
//                       onChange={handleInputChange}
//                       placeholder="Enter city"
//                     />
//                     {errors.city && <div className="invalid-feedback">{errors.city}</div>}
//                   </div>

//                   {/* Postcode */}
//                   <div className="col-md-6">
//                     <label className="form-label">Postcode *</label>
//                     <input
//                       type="text"
//                       className={`form-control ${errors.postcode ? 'is-invalid' : ''}`}
//                       name="postcode"
//                       value={customerInfo.postcode}
//                       onChange={handleInputChange}
//                       placeholder="6-digit postcode"
//                       maxLength="6"
//                     />
//                     {errors.postcode && <div className="invalid-feedback">{errors.postcode}</div>}
//                   </div>

//                   {/* Country */}
//                   <div className="col-md-6">
//                     <label className="form-label">Country *</label>
//                     <select
//                       className="form-select"
//                       name="country"
//                       value={customerInfo.country}
//                       onChange={handleInputChange}
//                     >
//                       <option value="IN">India</option>
//                       <option value="GB">United Kingdom</option>
//                       <option value="US">United States</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Submit Error */}
//                 {errors.submit && (
//                   <div className="alert alert-danger mt-3">
//                     <i className="bi bi-exclamation-triangle me-2"></i>
//                     {errors.submit}
//                   </div>
//                 )}

//                 {/* Action Buttons */}
//                 <div className="d-flex justify-content-between mt-4">
//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary"
//                     onClick={() => navigate('/basket')}
//                   >
//                     <i className="bi bi-arrow-left me-2"></i>
//                     Back to Cart
//                   </button>
                  
//                   <button
//                     type="submit"
//                     className="btn btn-warning btn-lg"
//                     disabled={loading}
//                   >
//                     <i className="bi bi-paypal me-2"></i>
//                     Proceed to PayPal (£{total.toFixed(2)})
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;







import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Shield, Clock, CreditCard, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, loading: cartLoading, getCartTotal, getCartItemCount, clearCart } = useCart();
  
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('paypal');
  
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    country: 'IN'
  });

  // Check if cart is empty and redirect
  useEffect(() => {
    if (!cartLoading && cart.length === 0) {
      console.log('❌ Cart is empty, redirecting to basket');
      navigate('/basket');
    }
  }, [cart, cartLoading, navigate]);

  // Calculate totals
  const subtotal = getCartTotal();
  const taxRate = 0.18; // 18% GST for India
  const tax = subtotal * taxRate;
  const shipping = 0; // Free shipping for now
  const total = subtotal + tax + shipping;

  console.log('💰 Checkout totals:', { subtotal, tax, shipping, total });

  // Validate Indian postcode
  const validatePostcode = (postcode) => {
    const indianPostcodeRegex = /^[1-9][0-9]{5}$/;
    return indianPostcodeRegex.test(postcode);
  };

  // Validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!customerInfo.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!customerInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!customerInfo.email.trim()) newErrors.email = 'Email is required';
    if (!customerInfo.phone.trim()) newErrors.phone = 'Phone is required';
    if (!customerInfo.address.trim()) newErrors.address = 'Address is required';
    if (!customerInfo.city.trim()) newErrors.city = 'City is required';
    if (!customerInfo.postcode.trim()) newErrors.postcode = 'Postcode is required';

    // Format validation
    if (customerInfo.email && !validateEmail(customerInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (customerInfo.postcode && !validatePostcode(customerInfo.postcode)) {
      newErrors.postcode = 'Please enter a valid 6-digit Indian postcode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const createOrderAndProceedToPayment = async () => {
    if (!validateForm()) {
      return;
    }

    if (cart.length === 0) {
      console.log('❌ Cannot proceed - cart is empty');
      navigate('/basket');
      return;
    }

    setLoading(true);

    try {
      // Prepare order data with complete cart information from database
      const orderData = {
        customer: customerInfo,
        items: cart.map(item => ({
          name: item.name,
          type: item.type || 'plate',
          price: item.price,
          quantity: item.quantity,
          subtotal: item.subtotal || (item.price * item.quantity),
          plateConfiguration: {
            text: item.registration || item.text || 'UNKNOWN',
            spacing: item.spacing || 'legal',
            displayText: item.displayText || item.registration || item.text,
            side: item.side || 'front',
            size: {
              key: item.size || 'standard',
              label: item.sizeLabel || 'Standard Size',
              dimensions: item.sizeDimensions || '520mm x 111mm'
            },
            plateStyle: {
              key: item.plateStyle || 'standard',
              label: item.styleLabel || 'Standard Plate',
              font: item.font || 'Charles Wright',
              fontSize: item.fontSize || 79,
              price: item.stylePrice || 0
            },
            fontColor: {
              key: item.fontColor || 'black',
              name: item.fontColorName || 'Black',
              color: item.fontColor || '#000000',
              price: item.fontColorPrice || 0
            },
            border: {
              key: item.borderStyle || 'none',
              name: item.borderName || 'No Border',
              type: item.borderType || 'none',
              color: item.borderColor || '',
              borderWidth: item.borderWidth || 0,
              price: item.borderPrice || 0
            },
            countryBadge: {
              key: item.countryBadge || 'none',
              name: item.badgeName || 'No Badge',
              country: item.selectedCountry || 'in',
              flagImage: item.flagImage || '',
              position: item.badgePosition || 'left',
              price: item.badgePrice || 0
            },
            finish: {
              key: item.finish || 'standard',
              label: item.finishLabel || 'Standard Finish',
              description: item.finishDescription || '',
              price: item.finishPrice || 0
            },
            thickness: {
              key: item.thickness || '3mm',
              label: item.thicknessLabel || '3mm Standard',
              value: item.thicknessValue || 3,
              price: item.thicknessPrice || 0
            },
            shadowEffect: {
              key: item.shadowEffect || 'none',
              name: item.shadowName || 'No Effect',
              description: item.shadowDescription || '',
              price: item.shadowPrice || 0
            },
            roadLegal: item.roadLegal || 'No',
            legalNotes: item.roadLegal === 'No' ? 'Show plates only - not for road use' : ''
          }
        })),
        pricing: {
          subtotal,
          discount: 0,
          shipping,
          tax,
          taxRate,
          total
        },
        originalCartData: cart // Store complete cart data for backup
      };

      console.log('Creating order with data:', orderData);

      // Create order in database with PENDING status
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to create order');
      }

      console.log('Order created successfully:', result.data.orderId);
      
      // Proceed to selected payment method
      if (selectedPaymentMethod === 'paypal') {
        await proceedToPayPal(result.data.orderId);
      } else {
        await proceedToWorldpay(result.data.orderId);
      }

    } catch (error) {
      console.error('Error creating order:', error);
      setErrors({ submit: error.message });
      setLoading(false);
      setLoadingMessage('');
    }
  };

  const proceedToPayPal = async (orderId) => {
    setLoadingMessage('Creating PayPal order...');

    try {
      // Create PayPal order with our database order ID
      const paypalResponse = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/create-paypal-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total.toFixed(2),
          currency: 'GBP',
          orderId: orderId // Pass our database order ID
        }),
      });

      const paypalResult = await paypalResponse.json();
      
      if (!paypalResult.id) {
        throw new Error('Failed to create PayPal order');
      }

      console.log('PayPal order created:', paypalResult.id, 'for DB order:', orderId);

      // Redirect to PayPal (backend already linked PayPal order to our DB order)
      const approvalUrl = paypalResult.links.find(link => link.rel === 'approve')?.href;
      if (approvalUrl) {
        setLoadingMessage('Redirecting to PayPal...');
        window.location.href = approvalUrl;
      } else {
        throw new Error('PayPal approval URL not found');
      }

    } catch (error) {
      console.error('PayPal error:', error);
      setErrors({ submit: `PayPal Error: ${error.message}` });
      setLoading(false);
      setLoadingMessage('');
    }
  };

  const proceedToWorldpay = async (orderId) => {
    setLoadingMessage('Creating Worldpay payment...');

    try {
      // Create Worldpay payment
      const worldpayResponse = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/create-worldpay-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total.toFixed(2),
          currency: 'GBP',
          customerInfo: {
            name: `${customerInfo.firstName} ${customerInfo.lastName}`,
            email: customerInfo.email,
            phone: customerInfo.phone
          },
          orderDetails: {
            orderId: orderId,
            items: cart.length,
            quantity: cart.reduce((sum, item) => sum + item.quantity, 0)
          }
        }),
      });

      const worldpayResult = await worldpayResponse.json();
      
      if (!worldpayResult.success) {
        throw new Error(worldpayResult.error || 'Failed to create Worldpay payment');
      }

      // Update our order with Worldpay payment ID
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders/${orderId}/worldpay`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          worldpayPaymentId: worldpayResult.paymentId,
          transactionReference: worldpayResult.transactionReference
        }),
      });

      // Redirect to Worldpay or success page
      if (worldpayResult.redirectUrl) {
        setLoadingMessage('Redirecting to Worldpay...');
        window.location.href = worldpayResult.redirectUrl;
      } else {
        // For demo purposes, redirect to success page
        navigate(`/payment-success?paymentId=${worldpayResult.paymentId}&transactionRef=${worldpayResult.transactionReference}&provider=worldpay`);
      }

    } catch (error) {
      console.error('Worldpay error:', error);
      setErrors({ submit: `Worldpay Error: ${error.message}` });
      setLoading(false);
      setLoadingMessage('');
    }
  };

  // Payment Method Selector Component
  const PaymentMethodSelector = () => {
    return (
      <div className="payment-methods mb-4">
        <h5 className="text-warning mb-3">Choose Payment Method</h5>
        
        {/* PayPal Option */}
        <div 
          className={`payment-option ${selectedPaymentMethod === 'paypal' ? 'selected' : ''}`}
          onClick={() => setSelectedPaymentMethod('paypal')}
          style={{ cursor: 'pointer' }}
        >
          <div className={`d-flex align-items-center justify-content-between p-3 border rounded mb-3 ${
            selectedPaymentMethod === 'paypal' ? 'border-warning border-2 bg-light' : 'border-secondary'
          }`}>
            <div className="d-flex align-items-center">
              <div className="me-3">
                <div className={`rounded-circle d-flex align-items-center justify-content-center ${
                  selectedPaymentMethod === 'paypal' ? 'bg-warning text-dark' : 'border'
                }`} style={{ width: '20px', height: '20px' }}>
                  {selectedPaymentMethod === 'paypal' && <Check size={12} />}
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <span className="fw-bold text-primary" style={{ fontSize: '18px' }}>PayPal</span>
                </div>
                <div>
                  <div className="fw-semibold text-dark">PayPal Account</div>
                  <small className="text-muted">Pay with your PayPal account or card</small>
                </div>
              </div>
            </div>
            <div>
              <span className="badge bg-primary me-1">Instant</span>
              <span className="badge bg-success">Trusted</span>
            </div>
          </div>
        </div>

        {/* Worldpay Option */}
        <div 
          className={`payment-option ${selectedPaymentMethod === 'worldpay' ? 'selected' : ''}`}
          onClick={() => setSelectedPaymentMethod('worldpay')}
          style={{ cursor: 'pointer' }}
        >
          <div className={`d-flex align-items-center justify-content-between p-3 border rounded mb-3 ${
            selectedPaymentMethod === 'worldpay' ? 'border-warning border-2 bg-light' : 'border-secondary'
          }`}>
            <div className="d-flex align-items-center">
              <div className="me-3">
                <div className={`rounded-circle d-flex align-items-center justify-content-center ${
                  selectedPaymentMethod === 'worldpay' ? 'bg-warning text-dark' : 'border'
                }`} style={{ width: '20px', height: '20px' }}>
                  {selectedPaymentMethod === 'worldpay' && <Check size={12} />}
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <div className="bg-danger text-white px-2 py-1 rounded fw-bold" style={{ fontSize: '12px' }}>
                    Worldpay
                  </div>
                </div>
                <div>
                  <div className="fw-semibold text-dark">Worldpay Secure Checkout</div>
                  <small className="text-muted">Cards, Digital Wallets, EMI & more</small>
                </div>
              </div>
            </div>
            <div>
              <span className="badge bg-success me-1">Multiple Options</span>
              <span className="badge bg-info">Secure</span>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="mt-3 p-3 bg-light rounded">
          <div className="row text-center">
            <div className="col-4">
              <Shield size={20} className="text-success mb-1" />
              <div className="small text-muted">SSL Encrypted</div>
            </div>
            <div className="col-4">
              <Clock size={20} className="text-primary mb-1" />
              <div className="small text-muted">Instant Processing</div>
            </div>
            <div className="col-4">
              <CreditCard size={20} className="text-warning mb-1" />
              <div className="small text-muted">Secure Payments</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Show loading while cart is being loaded
  if (cartLoading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-dark">
        <div className="text-center">
          <div className="mb-4">
            <div className="spinner-border text-warning" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <h3 className="text-white mb-2">{loadingMessage}</h3>
          <p className="text-warning">Please wait, do not close this window...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-warning text-dark">
              <h4 className="mb-0">
                <i className="bi bi-person-fill me-2"></i>
                Checkout Information
              </h4>
            </div>
            <div className="card-body p-4">
              
              {/* Order Summary */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <h5 className="text-warning">Order Summary</h5>
                  <div className="bg-light p-3 rounded">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Items ({cart.length}):</span>
                      <span>£{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Shipping:</span>
                      <span className="text-success">FREE</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>GST (18%):</span>
                      <span>£{tax.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-bold">
                      <span>Total:</span>
                      <span className="text-success">£{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <h5 className="text-warning">Your Items</h5>
                  <div className="bg-light p-3 rounded" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {cart.map((item, index) => (
                      <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                        <div className="small">
                          <strong>{item.name}</strong><br />
                          <span className="text-muted">Qty: {item.quantity}</span>
                        </div>
                        <span className="small fw-bold">£{item.subtotal?.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <PaymentMethodSelector />

              {/* Customer Information Form */}
              <form onSubmit={(e) => { e.preventDefault(); createOrderAndProceedToPayment(); }}>
                <h5 className="text-warning mb-3">Customer Information</h5>
                
                <div className="row g-3">
                  {/* First Name */}
                  <div className="col-md-6">
                    <label className="form-label">First Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      name="firstName"
                      value={customerInfo.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                  </div>

                  {/* Last Name */}
                  <div className="col-md-6">
                    <label className="form-label">Last Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      name="lastName"
                      value={customerInfo.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  {/* Phone */}
                  <div className="col-md-6">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>

                  {/* Address */}
                  <div className="col-12">
                    <label className="form-label">Address *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      placeholder="Enter full address"
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                  </div>

                  {/* City */}
                  <div className="col-md-6">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                      name="city"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                    />
                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                  </div>

                  {/* Postcode */}
                  <div className="col-md-6">
                    <label className="form-label">Postcode *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.postcode ? 'is-invalid' : ''}`}
                      name="postcode"
                      value={customerInfo.postcode}
                      onChange={handleInputChange}
                      placeholder="6-digit postcode"
                      maxLength="6"
                    />
                    {errors.postcode && <div className="invalid-feedback">{errors.postcode}</div>}
                  </div>

                  {/* Country */}
                  <div className="col-md-6">
                    <label className="form-label">Country *</label>
                    <select
                      className="form-select"
                      name="country"
                      value={customerInfo.country}
                      onChange={handleInputChange}
                    >
                      <option value="IN">India</option>
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States</option>
                    </select>
                  </div>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="alert alert-danger mt-3">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {errors.submit}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/basket')}
                  >
                    <ArrowLeft className="me-2" size={16} />
                    Back to Cart
                  </button>
                  
                  <button
                    type="submit"
                    className={`btn btn-lg ${
                      selectedPaymentMethod === 'paypal' 
                        ? 'btn-primary' 
                        : 'btn-danger'
                    }`}
                    disabled={loading || cart.length === 0}
                  >
                    {selectedPaymentMethod === 'paypal' ? (
                      <>
                        <i className="bi bi-paypal me-2"></i>
                        Pay with PayPal (£{total.toFixed(2)})
                      </>
                    ) : (
                      <>
                        <CreditCard className="me-2" size={16} />
                        Pay with Worldpay (£{total.toFixed(2)})
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;