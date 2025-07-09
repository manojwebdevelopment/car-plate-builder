// import React, { useState, useEffect } from 'react';
// import './AdminDashboard.css'

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('orders');
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [toastMessage, setToastMessage] = useState(null);
//   const [viewingOrder, setViewingOrder] = useState(null);
//   const [loadingOrderDetails, setLoadingOrderDetails] = useState(false);
  
//   const [contacts, setContacts] = useState([
//     { id: 1, name: 'Alice Brown', email: 'alice@example.com', phone: '+91-9876543210', message: 'Inquiry about products' },
//     { id: 2, name: 'Bob Wilson', email: 'bob@example.com', phone: '+91-9876543211', message: 'Support request' }
//   ]);

//   const [siteSettings, setSiteSettings] = useState({
//     title: 'My E-commerce Store',
//     description: 'Best online shopping experience with quality products',
//     canonical: 'https://mystore.com'
//   });

//   const [editingOrder, setEditingOrder] = useState(null);
//   const [editingContact, setEditingContact] = useState(null);

//   // Toast notification component
//   const Toast = ({ message, type, onClose }) => (
//     <div 
//       className={`position-fixed top-0 end-0 m-3 alert alert-${type} alert-dismissible`} 
//       style={{ zIndex: 9999 }}
//     >
//       {message}
//       <button type="button" className="btn-close" onClick={onClose}></button>
//     </div>
//   );

//   // Show toast message
//   const showToast = (message, type = 'danger') => {
//     setToastMessage({ message, type });
//     setTimeout(() => setToastMessage(null), 5000);
//   };

//   // Format date to "Jun 01, 2025" format
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: '2-digit'
//     });
//   };

//   // Fetch orders from API
//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/order-details');
//       const result = await response.json();
      
//       if (result.success) {
//         setOrders(result.data);
//       } else {
//         showToast('Failed to fetch orders: ' + result.error);
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       showToast('Network error: Unable to fetch orders');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch single order details for modal
//   const fetchOrderDetails = async (orderId) => {
//     setLoadingOrderDetails(true);
//     try {
//       const response = await fetch(`http://localhost:5000/order-details/${orderId}`);
//       const result = await response.json();
      
//       if (result.success) {
//         setViewingOrder(result.data);
//       } else {
//         showToast('Failed to fetch order details: ' + result.error);
//       }
//     } catch (error) {
//       console.error('Error fetching order details:', error);
//       showToast('Network error: Unable to fetch order details');
//     } finally {
//       setLoadingOrderDetails(false);
//     }
//   };

//   const handleViewOrder = (order) => {
//     fetchOrderDetails(order.orderId);
//   };

//   // Fetch orders when component mounts or when orders tab is selected
//   useEffect(() => {
//     if (activeTab === 'orders') {
//       fetchOrders();
//     }
//   }, [activeTab]);

//   const handleDeleteOrder = (id) => {
//     // For now, just remove from local state
//     // You can implement actual delete API call later
//     setOrders(orders.filter(order => order.id !== id));
//     showToast('Order deleted successfully', 'success');
//   };

//   const handleDeleteContact = (id) => {
//     setContacts(contacts.filter(contact => contact.id !== id));
//   };

//   const handleEditOrder = (order) => {
//     setEditingOrder(order);
//   };

//   const handleSaveOrder = (updatedOrder) => {
//     setOrders(orders.map(order => order.id === updatedOrder.id ? updatedOrder : order));
//     setEditingOrder(null);
//     showToast('Order updated successfully', 'success');
//   };

//   const handleEditContact = (contact) => {
//     setEditingContact(contact);
//   };

//   const handleSaveContact = (updatedContact) => {
//     setContacts(contacts.map(contact => contact.id === updatedContact.id ? updatedContact : contact));
//     setEditingContact(null);
//   };

// const EnhancedOrderViewModal = ({ order, onClose, loading }) => {
//   if (!order && !loading) return null;

//   const formatDate = (date) => {
//     if (!date) return 'N/A';
//     return new Date(date).toLocaleDateString('en-GB', {
//       day: '2-digit',
//       month: '2-digit', 
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getStatusBadgeClass = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'paid': return 'bg-success';
//       case 'pending': return 'bg-warning text-dark';
//       case 'processing': return 'bg-info';
//       case 'shipped': return 'bg-primary';
//       case 'delivered': return 'bg-success';
//       case 'cancelled': return 'bg-danger';
//       case 'failed': return 'bg-danger';
//       case 'refunded': return 'bg-secondary';
//       default: return 'bg-secondary';
//     }
//   };

//   const PlateConfigurationCard = ({ item, index }) => (
//     <div className="card mb-3 border-start border-warning border-4">
//       <div className="card-header bg-light d-flex justify-content-between align-items-center">
//         <h6 className="mb-0 fw-bold text-dark">
//           <i className="bi bi-card-text me-2"></i>
//           Plate {index + 1}: {item.plateConfiguration?.text || 'N/A'}
//         </h6>
//         <span className="badge bg-warning text-dark">
//           {item.plateConfiguration?.side?.toUpperCase() || 'UNKNOWN'}
//         </span>
//       </div>
//       <div className="card-body">
//         <div className="row g-3">
//           {/* Basic Info */}
//           <div className="col-md-6">
//             <h6 className="text-warning mb-2">
//               <i className="bi bi-info-circle me-1"></i>Basic Information
//             </h6>
//             <div className="small mb-2">
//               <strong>Registration:</strong> 
//               <span className="ms-2 font-monospace">{item.plateConfiguration?.text || 'N/A'}</span>
//             </div>
//             <div className="small mb-2">
//               <strong>Spacing:</strong> 
//               <span className="ms-2">{item.plateConfiguration?.spacing === 'legal' ? 'Legal Spacing' : "As Typed"}</span>
//             </div>
//             <div className="small mb-2">
//               <strong>Side:</strong> 
//               <span className="ms-2 text-capitalize">{item.plateConfiguration?.side || 'Unknown'}</span>
//             </div>
//             <div className="small mb-2">
//               <strong>Quantity:</strong> 
//               <span className="ms-2">{item.quantity || 1}</span>
//             </div>
//             <div className="small mb-2">
//               <strong>Road Legal:</strong> 
//               <span className={`ms-2 badge ${item.plateConfiguration?.roadLegal === 'Yes' ? 'bg-success' : 'bg-warning text-dark'}`}>
//                 {item.plateConfiguration?.roadLegal || 'No'}
//               </span>
//             </div>
//           </div>

//           {/* Style & Design */}
//           <div className="col-md-6">
//             <h6 className="text-warning mb-2">
//               <i className="bi bi-palette me-1"></i>Style & Design
//             </h6>
//             <div className="small mb-2">
//               <strong>Plate Style:</strong> 
//               <span className="ms-2">{item.plateConfiguration?.plateStyle?.label || 'Standard'}</span>
//               {item.plateConfiguration?.plateStyle?.price > 0 && (
//                 <span className="ms-1 text-success">+£{item.plateConfiguration.plateStyle.price}</span>
//               )}
//             </div>
//             <div className="small mb-2">
//               <strong>Font Color:</strong> 
//               <span className="ms-2 d-flex align-items-center">
//                 {item.plateConfiguration?.fontColor?.color && (
//                   <span 
//                     className="me-2 border rounded" 
//                     style={{
//                       width: '16px', 
//                       height: '16px', 
//                       backgroundColor: item.plateConfiguration.fontColor.color,
//                       display: 'inline-block'
//                     }}
//                   ></span>
//                 )}
//                 {item.plateConfiguration?.fontColor?.name || 'Black'}
//                 {item.plateConfiguration?.fontColor?.price > 0 && (
//                   <span className="ms-1 text-success">+£{item.plateConfiguration.fontColor.price}</span>
//                 )}
//               </span>
//             </div>
//             <div className="small mb-2">
//               <strong>Size:</strong> 
//               <span className="ms-2">{item.plateConfiguration?.size?.label || 'Standard'}</span>
//               <br />
//               <small className="text-muted ms-4">{item.plateConfiguration?.size?.dimensions || 'N/A'}</small>
//             </div>
//           </div>

//           {/* Border & Effects */}
//           <div className="col-md-6">
//             <h6 className="text-warning mb-2">
//               <i className="bi bi-border-all me-1"></i>Border & Effects
//             </h6>
//             <div className="small mb-2">
//               <strong>Border:</strong> 
//               <span className="ms-2">{item.plateConfiguration?.border?.name || 'No Border'}</span>
//               {item.plateConfiguration?.border?.price > 0 && (
//                 <span className="ms-1 text-success">+£{item.plateConfiguration.border.price}</span>
//               )}
//             </div>
//             {item.plateConfiguration?.border?.type !== 'none' && (
//               <div className="small mb-2 ms-3 text-muted">
//                 Type: {item.plateConfiguration.border.type}, 
//                 Width: {item.plateConfiguration.border.borderWidth}mm
//               </div>
//             )}
//             <div className="small mb-2">
//               <strong>Shadow Effect:</strong> 
//               <span className="ms-2">{item.plateConfiguration?.shadowEffect?.name || 'None'}</span>
//               {item.plateConfiguration?.shadowEffect?.price > 0 && (
//                 <span className="ms-1 text-success">+£{item.plateConfiguration.shadowEffect.price}</span>
//               )}
//             </div>
//           </div>

//           {/* Badge & Finish */}
//           <div className="col-md-6">
//             <h6 className="text-warning mb-2">
//               <i className="bi bi-award me-1"></i>Badge & Finish
//             </h6>
//             <div className="small mb-2">
//               <strong>Country Badge:</strong> 
//               <span className="ms-2">{item.plateConfiguration?.countryBadge?.name || 'No Badge'}</span>
//               {item.plateConfiguration?.countryBadge?.price > 0 && (
//                 <span className="ms-1 text-success">+£{item.plateConfiguration.countryBadge.price}</span>
//               )}
//             </div>
//             {item.plateConfiguration?.countryBadge?.position && (
//               <div className="small mb-2 ms-3 text-muted">
//                 Position: {item.plateConfiguration.countryBadge.position}
//               </div>
//             )}
//             <div className="small mb-2">
//               <strong>Finish:</strong> 
//               <span className="ms-2">{item.plateConfiguration?.finish?.label || 'Standard'}</span>
//               {item.plateConfiguration?.finish?.price > 0 && (
//                 <span className="ms-1 text-success">+£{item.plateConfiguration.finish.price}</span>
//               )}
//             </div>
//             <div className="small mb-2">
//               <strong>Thickness:</strong> 
//               <span className="ms-2">{item.plateConfiguration?.thickness?.label || '3mm'}</span>
//               {item.plateConfiguration?.thickness?.price > 0 && (
//                 <span className="ms-1 text-success">+£{item.plateConfiguration.thickness.price}</span>
//               )}
//             </div>
//           </div>

//           {/* Pricing for this item */}
//           <div className="col-12">
//             <div className="bg-light p-2 rounded mt-2">
//               <div className="d-flex justify-content-between align-items-center">
//                 <span className="fw-bold">Item Total:</span>
//                 <span className="fw-bold text-success">£{item.subtotal?.toFixed(2) || (item.price * item.quantity).toFixed(2)}</span>
//               </div>
//               <small className="text-muted">
//                 £{item.price?.toFixed(2)} × {item.quantity} = £{(item.price * item.quantity).toFixed(2)}
//               </small>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//       <div className="modal-dialog modal-xl">
//         <div className="modal-content">
//           <div className="modal-header bg-warning">
//             <h5 className="modal-title text-dark fw-bold">
//               <i className="bi bi-receipt me-2"></i>
//               Order Details
//             </h5>
//             <button type="button" className="btn-close" onClick={onClose}></button>
//           </div>
//           <div className="modal-body" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
//             {loading ? (
//               <div className="text-center p-4">
//                 <div className="spinner-border text-warning" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                 </div>
//                 <p className="mt-2">Loading order details...</p>
//               </div>
//             ) : order ? (
//               <div className="row">
//                 {/* Order Summary */}
//                 <div className="col-md-4 mb-4">
//                   <div className="card h-100">
//                     <div className="card-header bg-primary text-white">
//                       <h6 className="mb-0">
//                         <i className="bi bi-file-text me-2"></i>Order Summary
//                       </h6>
//                     </div>
//                     <div className="card-body">
//                       <div className="mb-3">
//                         <strong>Order ID:</strong>
//                         <br />
//                         <span className="font-monospace small">{order.orderId}</span>
//                       </div>
//                       <div className="mb-3">
//                         <strong>Status:</strong>
//                         <br />
//                         <span className={`badge ${getStatusBadgeClass(order.orderStatus)}`}>
//                           {order.orderStatus?.toUpperCase() || 'PENDING'}
//                         </span>
//                       </div>
//                       <div className="mb-3">
//                         <strong>Payment Status:</strong>
//                         <br />
//                         <span className={`badge ${getStatusBadgeClass(order.paymentStatus)}`}>
//                           {order.paymentStatus?.toUpperCase() || 'PENDING'}
//                         </span>
//                       </div>
//                       <div className="mb-3">
//                         <strong>Order Date:</strong>
//                         <br />
//                         <small>{formatDate(order.dates?.ordered || order.dateOfOrder)}</small>
//                       </div>
//                       {order.dates?.paid && (
//                         <div className="mb-3">
//                           <strong>Payment Date:</strong>
//                           <br />
//                           <small>{formatDate(order.dates.paid)}</small>
//                         </div>
//                       )}
//                       <div className="mb-3">
//                         <strong>Items:</strong>
//                         <br />
//                         <span className="badge bg-info">{order.items?.length || 0} plate(s)</span>
//                       </div>
//                       <div className="mb-3">
//                         <strong>Total Amount:</strong>
//                         <br />
//                         <span className="h5 text-success fw-bold">£{order.pricing?.total?.toFixed(2) || order.amount?.toFixed(2)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Customer Information */}
//                 <div className="col-md-4 mb-4">
//                   <div className="card h-100">
//                     <div className="card-header bg-success text-white">
//                       <h6 className="mb-0">
//                         <i className="bi bi-person me-2"></i>Customer Information
//                       </h6>
//                     </div>
//                     <div className="card-body">
//                       <div className="mb-3">
//                         <strong>Name:</strong>
//                         <br />
//                         {order.customer?.name || order.customerName || 'N/A'}
//                       </div>
//                       <div className="mb-3">
//                         <strong>Email:</strong>
//                         <br />
//                         <small>{order.customer?.email || order.customerEmail || 'N/A'}</small>
//                       </div>
//                       <div className="mb-3">
//                         <strong>Phone:</strong>
//                         <br />
//                         {order.customer?.phone || order.customerPhone || 'N/A'}
//                       </div>
                      
//                       <hr />
//                       <h6 className="text-success mb-2">Shipping Address</h6>
//                       {order.shippingAddress ? (
//                         <address className="small">
//                           {order.shippingAddress.name && (
//                             <>{order.shippingAddress.name}<br /></>
//                           )}
//                           {order.shippingAddress.street}<br />
//                           {order.shippingAddress.city}{order.shippingAddress.state && `, ${order.shippingAddress.state}`}<br />
//                           {order.shippingAddress.postcode}<br />
//                           {order.shippingAddress.country}<br />
//                           {order.shippingAddress.phone && (
//                             <>Phone: {order.shippingAddress.phone}</>
//                           )}
//                         </address>
//                       ) : (
//                         <small className="text-muted">No shipping address provided</small>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Payment Information */}
//                 <div className="col-md-4 mb-4">
//                   <div className="card h-100">
//                     <div className="card-header bg-info text-white">
//                       <h6 className="mb-0">
//                         <i className="bi bi-credit-card me-2"></i>Payment Information
//                       </h6>
//                     </div>
//                     <div className="card-body">
//                       <div className="mb-3">
//                         <strong>Payment Provider:</strong>
//                         <br />
//                         <span className="badge bg-primary text-capitalize">
//                           {order.payment?.provider || 'PayPal'}
//                         </span>
//                       </div>
//                       <div className="mb-3">
//                         <strong>Transaction ID:</strong>
//                         <br />
//                         <small className="font-monospace">
//                           {order.payment?.transactionId || order.paypalPaymentId || 'N/A'}
//                         </small>
//                       </div>
//                       {order.payment?.paypalOrderId && (
//                         <div className="mb-3">
//                           <strong>PayPal Order ID:</strong>
//                           <br />
//                           <small className="font-monospace">{order.payment.paypalOrderId}</small>
//                         </div>
//                       )}
//                       <div className="mb-3">
//                         <strong>Amount:</strong>
//                         <br />
//                         <span className="fw-bold">
//                           £{order.payment?.amount?.toFixed(2) || order.amount?.toFixed(2)} {order.payment?.currency || 'GBP'}
//                         </span>
//                       </div>

//                       {/* Pricing Breakdown */}
//                       {order.pricing && (
//                         <>
//                           <hr />
//                           <h6 className="text-info mb-2">Pricing Breakdown</h6>
//                           <div className="small">
//                             <div className="d-flex justify-content-between mb-1">
//                               <span>Subtotal:</span>
//                               <span>£{order.pricing.subtotal?.toFixed(2)}</span>
//                             </div>
//                             {order.pricing.discount > 0 && (
//                               <div className="d-flex justify-content-between mb-1 text-success">
//                                 <span>Discount:</span>
//                                 <span>-£{order.pricing.discount?.toFixed(2)}</span>
//                               </div>
//                             )}
//                             <div className="d-flex justify-content-between mb-1">
//                               <span>Shipping:</span>
//                               <span>£{order.pricing.shipping?.toFixed(2)}</span>
//                             </div>
//                             <div className="d-flex justify-content-between mb-1">
//                               <span>VAT ({(order.pricing.taxRate * 100) || 20}%):</span>
//                               <span>£{order.pricing.tax?.toFixed(2)}</span>
//                             </div>
//                             <hr className="my-2" />
//                             <div className="d-flex justify-content-between fw-bold">
//                               <span>Total:</span>
//                               <span>£{order.pricing.total?.toFixed(2)}</span>
//                             </div>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Plate Configurations */}
//                 <div className="col-12">
//                   <h5 className="mb-3 fw-bold text-dark">
//                     <i className="bi bi-card-list me-2"></i>
//                     Plate Configurations ({order.items?.length || 0})
//                   </h5>
                  
//                   {order.items && order.items.length > 0 ? (
//                     <div className="row">
//                       {order.items.map((item, index) => (
//                         <div key={index} className="col-lg-6 mb-3">
//                           <PlateConfigurationCard item={item} index={index} />
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="alert alert-warning">
//                       <i className="bi bi-exclamation-triangle me-2"></i>
//                       No detailed plate configurations found for this order.
//                     </div>
//                   )}
//                 </div>

//                 {/* Order Notes & Timeline */}
//                 {(order.notes || order.adminNotes || order.trackingNumber) && (
//                   <div className="col-12 mt-4">
//                     <div className="card">
//                       <div className="card-header bg-secondary text-white">
//                         <h6 className="mb-0">
//                           <i className="bi bi-journal-text me-2"></i>Additional Information
//                         </h6>
//                       </div>
//                       <div className="card-body">
//                         {order.notes && (
//                           <div className="mb-3">
//                             <strong>Order Notes:</strong>
//                             <div className="mt-1 p-2 bg-light rounded small">
//                               {order.notes}
//                             </div>
//                           </div>
//                         )}
//                         {order.adminNotes && (
//                           <div className="mb-3">
//                             <strong>Admin Notes:</strong>
//                             <div className="mt-1 p-2 bg-warning bg-opacity-25 rounded small">
//                               {order.adminNotes}
//                             </div>
//                           </div>
//                         )}
//                         {order.trackingNumber && (
//                           <div className="mb-3">
//                             <strong>Tracking Number:</strong>
//                             <span className="ms-2 font-monospace">{order.trackingNumber}</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="alert alert-danger">
//                 <i className="bi bi-exclamation-triangle me-2"></i>
//                 Failed to load order details.
//               </div>
//             )}
//           </div>
//           <div className="modal-footer">
//             <button type="button" className="btn btn-secondary" onClick={onClose}>
//               <i className="bi bi-x-circle me-2"></i>Close
//             </button>
//             {order && (
//               <>
//                 <button type="button" className="btn btn-primary">
//                   <i className="bi bi-pencil me-2"></i>Edit Order
//                 </button>
//                 <button type="button" className="btn btn-success">
//                   <i className="bi bi-printer me-2"></i>Print Details
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

//   const OrderModal = ({ order, onSave, onClose }) => {
//     const [formData, setFormData] = useState(order);

//     const handleSubmit = () => {
//       onSave(formData);
//     };

//     return (
//       <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Edit Order</h5>
//               <button type="button" className="btn-close" onClick={onClose}></button>
//             </div>
//             <div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">Order ID</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={formData.orderId}
//                     onChange={(e) => setFormData({...formData, orderId: e.target.value})}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Customer</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={formData.customer}
//                     onChange={(e) => setFormData({...formData, customer: e.target.value})}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Product</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={formData.product}
//                     onChange={(e) => setFormData({...formData, product: e.target.value})}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Amount</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={formData.amount}
//                     onChange={(e) => setFormData({...formData, amount: parseInt(e.target.value)})}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Status</label>
//                   <select
//                     className="form-control"
//                     value={formData.status}
//                     onChange={(e) => setFormData({...formData, status: e.target.value})}
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Completed">Completed</option>
//                     <option value="Shipped">Shipped</option>
//                     <option value="Cancelled">Cancelled</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
//                 <button type="button" className="btn btn-warning" onClick={handleSubmit}>Save Changes</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const ContactModal = ({ contact, onSave, onClose }) => {
//     const [formData, setFormData] = useState(contact);

//     const handleSubmit = () => {
//       onSave(formData);
//     };

//     return (
//       <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Edit Contact</h5>
//               <button type="button" className="btn-close" onClick={onClose}></button>
//             </div>
//             <div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={formData.name}
//                     onChange={(e) => setFormData({...formData, name: e.target.value})}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     value={formData.email}
//                     onChange={(e) => setFormData({...formData, email: e.target.value})}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Phone</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={formData.phone}
//                     onChange={(e) => setFormData({...formData, phone: e.target.value})}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Message</label>
//                   <textarea
//                     className="form-control"
//                     rows="3"
//                     value={formData.message}
//                     onChange={(e) => setFormData({...formData, message: e.target.value})}
//                   />
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
//                 <button type="button" className="btn btn-warning" onClick={handleSubmit}>Save Changes</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="d-flex" style={{ minHeight: '100vh' }}>
//       {/* Toast Notification */}
//       {toastMessage && (
//         <Toast 
//           message={toastMessage.message} 
//           type={toastMessage.type} 
//           onClose={() => setToastMessage(null)} 
//         />
//       )}

//       {/* Sidebar */}
//       <div className="sidebar" style={{ 
//         width: '250px', 
//         backgroundColor: '#ffc107', 
//         minHeight: '100vh',
//         boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
//       }}>
//         <div className="p-3">
//           <h4 className="text-dark mb-4">Admin Panel</h4>
//           <nav className="nav flex-column">
//             <button
//               className={`nav-link btn text-start mb-2 ${activeTab === 'orders' ? 'btn-dark' : 'btn-outline-dark'}`}
//               onClick={() => setActiveTab('orders')}
//             >
//               📦 Orders
//             </button>
//             <button
//               className={`nav-link btn text-start mb-2 ${activeTab === 'contacts' ? 'btn-dark' : 'btn-outline-dark'}`}
//               onClick={() => setActiveTab('contacts')}
//             >
//               📞 Contacts
//             </button>
//             <button
//               className={`nav-link btn text-start mb-2 ${activeTab === 'settings' ? 'btn-dark' : 'btn-outline-dark'}`}
//               onClick={() => setActiveTab('settings')}
//             >
//               ⚙️ Site Settings
//             </button>
//           </nav>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa' }}>
//         <div className="container-fluid">
          
//           {/* Orders Tab */}
//           {activeTab === 'orders' && (
//             <div>
//               <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h2>Order Management</h2>
//                 <div className="d-flex align-items-center gap-3">
//                   <button 
//                     className="btn btn-outline-warning"
//                     onClick={fetchOrders}
//                     disabled={loading}
//                   >
//                     {loading ? 'Refreshing...' : 'Refresh'}
//                   </button>
//                   <span className="badge bg-warning text-dark fs-6">Total Orders: {orders.length}</span>
//                 </div>
//               </div>
              
//               <div className="card">
//                 <div className="card-body">
//                   {loading ? (
//                     <div className="text-center p-4">
//                       <div className="spinner-border text-warning" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                       </div>
//                       <p className="mt-2">Loading orders...</p>
//                     </div>
//                   ) : orders.length === 0 ? (
//                     <div className="text-center p-4">
//                       <p className="text-muted">No orders found</p>
//                     </div>
//                   ) : (
//                     <div className="table-responsive">
//                       <table className="table table-hover">
//                         <thead className="table-warning">
//                           <tr>
//                             <th>Order ID</th>
//                             <th>Customer Name</th>
//                             <th>Product</th>
//                             <th>Amount</th>
//                             <th>Payment Status</th>
//                             <th>Date of Order</th>
//                             <th>View</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {orders.map(order => (
//                             <tr key={order.id}>
//                               <td>{order.orderId}</td>
//                               <td>{order.customer}</td>
//                               <td>{order.product}</td>
//                               <td>₹{order.amount}</td>
//                               <td>
//                                 <span className={`badge ${
//                                   order.status === 'Completed' ? 'bg-success' :
//                                   order.status === 'Pending' ? 'bg-warning text-dark' :
//                                   order.status === 'Shipped' ? 'bg-info' : 'bg-secondary'
//                                 }`}>
//                                   {order.status}
//                                 </span>
//                               </td>
//                               <td>{formatDate(order.date)}</td>
//                               <td>
//                                 <button
//                                   className="btn btn-sm btn-outline-info"
//                                   onClick={() => handleViewOrder(order)}
//                                 >
//                                   👁️ View
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Contacts Tab */}
//           {activeTab === 'contacts' && (
//             <div>
//               <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h2>Contact Management</h2>
//                 <span className="badge bg-warning text-dark fs-6">Total Contacts: {contacts.length}</span>
//               </div>
              
//               <div className="card">
//                 <div className="card-body">
//                   <div className="table-responsive">
//                     <table className="table table-hover">
//                       <thead className="table-warning">
//                         <tr>
//                           <th>ID</th>
//                           <th>Name</th>
//                           <th>Email</th>
//                           <th>Phone</th>
//                           <th>Message</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {contacts.map(contact => (
//                           <tr key={contact.id}>
//                             <td>#{contact.id}</td>
//                             <td>{contact.name}</td>
//                             <td>{contact.email}</td>
//                             <td>{contact.phone}</td>
//                             <td>{contact.message.substring(0, 50)}...</td>
//                             <td>
//                               <button
//                                 className="btn btn-sm btn-outline-info me-2"
//                                 onClick={() => alert(`Full message: ${contact.message}`)}
//                               >
//                                 View
//                               </button>
//                               <button
//                                 className="btn btn-sm btn-outline-primary me-2"
//                                 onClick={() => handleEditContact(contact)}
//                               >
//                                 Edit
//                               </button>
//                               <button
//                                 className="btn btn-sm btn-outline-danger"
//                                 onClick={() => handleDeleteContact(contact.id)}
//                               >
//                                 Delete
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Settings Tab */}
//           {activeTab === 'settings' && (
//             <div>
//               <h2 className="mb-4">Site Settings</h2>
              
//               <div className="card">
//                 <div className="card-header bg-warning">
//                   <h5 className="mb-0 text-dark">SEO & Site Configuration</h5>
//                 </div>
//                 <div className="card-body">
//                   <div onSubmit={(e) => e.preventDefault()}>
//                     <div className="mb-3">
//                       <label className="form-label fw-bold">Site Title</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         value={siteSettings.title}
//                         onChange={(e) => setSiteSettings({...siteSettings, title: e.target.value})}
//                       />
//                     </div>
                    
//                     <div className="mb-3">
//                       <label className="form-label fw-bold">Site Description</label>
//                       <textarea
//                         className="form-control"
//                         rows="3"
//                         value={siteSettings.description}
//                         onChange={(e) => setSiteSettings({...siteSettings, description: e.target.value})}
//                       />
//                     </div>
                    
//                     <div className="mb-3">
//                       <label className="form-label fw-bold">Canonical URL</label>
//                       <input
//                         type="url"
//                         className="form-control"
//                         value={siteSettings.canonical}
//                         onChange={(e) => setSiteSettings({...siteSettings, canonical: e.target.value})}
//                       />
//                     </div>
                    
//                     <button type="button" className="btn btn-warning">
//                       Save Changes
//                     </button>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="card mt-4">
//                 <div className="card-header bg-warning">
//                   <h5 className="mb-0 text-dark">Theme Settings</h5>
//                 </div>
//                 <div className="card-body">
//                   <div className="row">
//                     <div className="col-md-6">
//                       <label className="form-label fw-bold">Primary Color</label>
//                       <div className="d-flex align-items-center">
//                         <div className="color-preview me-3" style={{
//                           width: '50px',
//                           height: '50px',
//                           backgroundColor: '#ffc107',
//                           border: '2px solid #000',
//                           borderRadius: '5px'
//                         }}></div>
//                         <span className="badge bg-warning text-dark">Yellow Theme Active</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modals */}
//       {editingOrder && (
//         <OrderModal
//           order={editingOrder}
//           onSave={handleSaveOrder}
//           onClose={() => setEditingOrder(null)}
//         />
//       )}
      
//       {editingContact && (
//         <ContactModal
//           contact={editingContact}
//           onSave={handleSaveContact}
//           onClose={() => setEditingContact(null)}
//         />
//       )}

//       {(viewingOrder || loadingOrderDetails) && (
//         <EnhancedOrderViewModal 
//           order={viewingOrder} 
//           onClose={() => setViewingOrder(null)} 
//           loading={loadingOrderDetails} 
//         />
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;


// Updated AdminDashboard.jsx with all fixes

import React, { useState, useEffect } from 'react';
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [loadingOrderDetails, setLoadingOrderDetails] = useState(false);
  
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Alice Brown', email: 'alice@example.com', phone: '+91-9876543210', message: 'Inquiry about products' },
    { id: 2, name: 'Bob Wilson', email: 'bob@example.com', phone: '+91-9876543211', message: 'Support request' }
  ]);

  const [siteSettings, setSiteSettings] = useState({
    title: 'My E-commerce Store',
    description: 'Best online shopping experience with quality products',
    canonical: 'https://mystore.com'
  });

  const [editingContact, setEditingContact] = useState(null);

  // Toast notification component
  const Toast = ({ message, type, onClose }) => (
    <div 
      className={`position-fixed top-0 end-0 m-3 alert alert-${type} alert-dismissible`} 
      style={{ zIndex: 9999 }}
    >
      {message}
      <button type="button" className="btn-close" onClick={onClose}></button>
    </div>
  );

  // Show toast message
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Format date to "Jun 01, 2025" format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  };

  // Format currency
  const formatCurrency = (amount, currency = 'GBP') => {
    if (!amount) return '£0.00';
    const symbol = currency === 'GBP' ? '£' : currency === 'USD' ? '$' : currency;
    return `${symbol}${parseFloat(amount).toFixed(2)}`;
  };

  // Fetch orders from API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/order-details');
      const result = await response.json();
      
      if (result.success) {
        setOrders(result.data);
      } else {
        showToast('Failed to fetch orders: ' + result.error, 'danger');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      showToast('Network error: Unable to fetch orders', 'danger');
    } finally {
      setLoading(false);
    }
  };

  // Fetch single order details for modal
  const fetchOrderDetails = async (orderId) => {
    setLoadingOrderDetails(true);
    try {
      const response = await fetch(`http://localhost:5000/order-details/${orderId}`);
      const result = await response.json();
      
      if (result.success) {
        setViewingOrder(result.data);
      } else {
        showToast('Failed to fetch order details: ' + result.error, 'danger');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      showToast('Network error: Unable to fetch order details', 'danger');
    } finally {
      setLoadingOrderDetails(false);
    }
  };

  const handleViewOrder = (order) => {
    fetchOrderDetails(order.orderId);
  };

  // Fetch orders when component mounts or when orders tab is selected
  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const handleDeleteOrder = (id) => {
    if (window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      setOrders(orders.filter(order => order.id !== id));
      showToast('Order deleted successfully', 'success');
    }
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    showToast('Contact deleted successfully', 'success');
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  const handleSaveContact = (updatedContact) => {
    setContacts(contacts.map(contact => contact.id === updatedContact.id ? updatedContact : contact));
    setEditingContact(null);
    showToast('Contact updated successfully', 'success');
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    if (!status) return 'bg-secondary';
    
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'completed':
      case 'paid':
      case 'confirmed':
        return 'bg-success';
      case 'pending':
      case 'processing':
        return 'bg-warning text-dark';
      case 'shipped':
        return 'bg-info';
      case 'cancelled':
      case 'failed':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  // Enhanced ViewOrderModal Component - using the one we created earlier
  const ViewOrderModal = ({ order, onClose, loading }) => {
    if (!order && !loading) return null;

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header bg-warning text-dark">
              <h5 className="modal-title">
                <i className="bi bi-receipt me-2"></i>
                Order Details
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {loading ? (
                <div className="text-center p-4">
                  <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading order details...</p>
                </div>
              ) : order ? (
                <div className="row">
                  {/* Left Column - Order Information */}
                  <div className="col-md-6">
                    <div className="card h-100">
                      <div className="card-header bg-primary text-white">
                        <h6 className="mb-0">
                          <i className="bi bi-info-circle me-2"></i>
                          Order Information
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <strong>Order ID:</strong>
                          <div className="mt-1">
                            <span className="badge bg-light text-dark font-monospace">
                              {order.orderId || 'N/A'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <strong>Customer:</strong>
                          <div className="mt-1">
                            {order.customer?.firstName && order.customer?.lastName ? 
                              `${order.customer.firstName} ${order.customer.lastName}` :
                              order.customer || order.customerName || 'Unknown Customer'}
                          </div>
                        </div>

                        <div className="mb-3">
                          <strong>Email:</strong>
                          <div className="mt-1">
                            <span className="text-muted">
                              {order.customer?.email || 'N/A'}
                            </span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <strong>Phone:</strong>
                          <div className="mt-1">
                            <span className="text-muted">
                              {order.customer?.phone || 'N/A'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <strong>Order Status:</strong>
                          <div className="mt-1">
                            <span className={`badge ${getStatusBadgeClass(order.orderStatus || order.status)}`}>
                              {order.orderStatus || order.status || 'Unknown'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <strong>Order Date:</strong>
                          <div className="mt-1">
                            <span className="text-muted">
                              {formatDate(order.dates?.ordered || order.date || order.createdAt)}
                            </span>
                          </div>
                        </div>

                        {order.items && order.items.length > 0 && (
                          <div className="mb-3">
                            <strong>Items:</strong>
                            <div className="mt-1">
                              <span className="badge bg-info">
                                {order.items.length} plate(s)
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Payment & Shipping */}
                  <div className="col-md-6">
                    <div className="card h-100">
                      <div className="card-header bg-success text-white">
                        <h6 className="mb-0">
                          <i className="bi bi-credit-card me-2"></i>
                          Payment & Shipping
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <strong>Amount:</strong>
                          <div className="mt-1">
                            <span className="h5 text-success mb-0">
                              {formatCurrency(order.pricing?.total || order.amount, order.currency)}
                            </span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <strong>Payment Status:</strong>
                          <div className="mt-1">
                            <span className={`badge ${getStatusBadgeClass(order.paymentStatus)}`}>
                              {order.paymentStatus || 'Unknown'}
                            </span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <strong>Payment Method:</strong>
                          <div className="mt-1">
                            <span className="badge bg-primary">
                              PayPal
                            </span>
                          </div>
                        </div>

                        {order.paypalPaymentId && (
                          <div className="mb-3">
                            <strong>Transaction ID:</strong>
                            <div className="mt-1">
                              <small className="font-monospace text-muted">
                                {order.paypalPaymentId}
                              </small>
                            </div>
                          </div>
                        )}

                        {/* Shipping Address */}
                        <div className="mb-3">
                          <strong>Shipping Address:</strong>
                          <div className="mt-2">
                            {order.shippingAddress || order.customer?.address ? (
                              <div className="border p-3 rounded bg-light">
                                {order.shippingAddress?.street || order.customer?.address ? (
                                  <div className="mb-1">
                                    <small><strong>Street:</strong> {order.shippingAddress?.street || order.customer?.address}</small>
                                  </div>
                                ) : null}
                                
                                {order.shippingAddress?.city || order.customer?.city ? (
                                  <div className="mb-1">
                                    <small><strong>City:</strong> {order.shippingAddress?.city || order.customer?.city}</small>
                                  </div>
                                ) : null}
                                
                                {order.shippingAddress?.postcode || order.customer?.postcode ? (
                                  <div className="mb-1">
                                    <small><strong>Postcode:</strong> {order.shippingAddress?.postcode || order.customer?.postcode}</small>
                                  </div>
                                ) : null}
                                
                                {order.shippingAddress?.country || order.customer?.country ? (
                                  <div className="mb-1">
                                    <small><strong>Country:</strong> {order.shippingAddress?.country || order.customer?.country}</small>
                                  </div>
                                ) : null}
                              </div>
                            ) : (
                              <div className="alert alert-info mb-0">
                                <small>
                                  <i className="bi bi-info-circle me-1"></i>
                                  No shipping address available
                                </small>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="alert alert-warning">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  No order details available
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                <i className="bi bi-x-circle me-2"></i>
                Close
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => window.open(`http://localhost:5000/admin/print-order/${order?.orderId}`, '_blank')}
                disabled={!order}
              >
                <i className="bi bi-printer me-2"></i>
                Print Details
              </button>
              <button 
                type="button" 
                className="btn btn-success"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = `http://localhost:5000/api/admin/orders/${order?.orderId}/pdf`;
                  link.target = '_blank';
                  link.click();
                }}
                disabled={!order}
              >
                <i className="bi bi-download me-2"></i>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ContactModal = ({ contact, onSave, onClose }) => {
    const [formData, setFormData] = useState(contact);

    const handleSubmit = () => {
      onSave(formData);
    };

    return (
      <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Contact</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-dashboard">
      {toastMessage && (
        <Toast 
          message={toastMessage.message} 
          type={toastMessage.type} 
          onClose={() => setToastMessage(null)} 
        />
      )}

      <div className="sidebar">
        <div className="logo">
          <h3>Admin Panel</h3>
        </div>
        <nav className="nav-menu">
          <button 
            className={activeTab === 'orders' ? 'active' : ''} 
            onClick={() => setActiveTab('orders')}
          >
            <i className="bi bi-basket3"></i>
            Orders
            <span className="badge bg-warning ms-2">Total Orders: {orders.length}</span>
          </button>
          <button 
            className={activeTab === 'contacts' ? 'active' : ''} 
            onClick={() => setActiveTab('contacts')}
          >
            <i className="bi bi-people"></i>
            Contacts
          </button>
          <button 
            className={activeTab === 'settings' ? 'active' : ''} 
            onClick={() => setActiveTab('settings')}
          >
            <i className="bi bi-gear"></i>
            Site Settings
          </button>
        </nav>
      </div>

      <div className="main-content">
        <header className="header">
          <h1>
            {activeTab === 'orders' && 'Order Management'}
            {activeTab === 'contacts' && 'Contact Management'}
            {activeTab === 'settings' && 'Site Settings'}
          </h1>
        </header>

        <div className="content">
          {activeTab === 'orders' && (
            <div className="orders-section">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Recent Orders</h2>
                <button 
                  className="btn btn-primary"
                  onClick={fetchOrders}
                  disabled={loading}
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  {loading ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>

              {loading ? (
                <div className="text-center p-4">
                  <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2">Loading orders...</p>
                </div>
              ) : orders.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-warning">
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>
                            <span className="font-monospace small">{order.orderId}</span>
                          </td>
                          <td>{order.customer}</td>
                          <td>{order.product}</td>
                          <td>
                            <span className="fw-bold text-success">
                              {formatCurrency(order.amount)}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td>{formatDate(order.date)}</td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button 
                                className="btn btn-outline-primary"
                                onClick={() => handleViewOrder(order)}
                                title="View Details"
                              >
                                <i className="bi bi-eye"></i>
                              </button>
                              <button 
                                className="btn btn-outline-success"
                                onClick={() => window.open(`http://localhost:5000/admin/print-order/${order.orderId}`, '_blank')}
                                title="Print Details"
                              >
                                <i className="bi bi-printer"></i>
                              </button>
                              <button 
                                className="btn btn-outline-info"
                                onClick={() => {
                                  const link = document.createElement('a');
                                  link.href = `http://localhost:5000/api/admin/orders/${order.orderId}/pdf`;
                                  link.target = '_blank';
                                  link.click();
                                }}
                                title="Download PDF"
                              >
                                <i className="bi bi-download"></i>
                              </button>
                              <button 
                                className="btn btn-outline-danger"
                                onClick={() => handleDeleteOrder(order.id)}
                                title="Delete Order"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-info">
                  <i className="bi bi-info-circle me-2"></i>
                  No orders found. Orders will appear here once customers make purchases.
                </div>
              )}
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="contacts-section">
              <h2>Contact Messages</h2>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-warning">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Message</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact.id}>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                        <td>
                          <span className="text-truncate d-inline-block" style={{maxWidth: '200px'}}>
                            {contact.message}
                          </span>
                        </td>
                       <td>
                          <div className="btn-group btn-group-sm">
                            <button 
                              className="btn btn-outline-primary" 
                              onClick={() => handleViewOrder(order)}
                              title="View Details"
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                            <button 
                              className="btn btn-outline-success"
                              onClick={() => window.open(`http://localhost:5000/admin/print-order/${order.orderId}`, '_blank')}
                              title="Print Details"
                            >
                              <i className="bi bi-printer"></i>
                            </button>
                            <button 
                              className="btn btn-outline-info"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = `http://localhost:5000/api/admin/orders/${order.orderId}/pdf`;
                                link.target = '_blank';
                                link.click();
                              }}
                              title="Download PDF"
                            >
                              <i className="bi bi-download"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-section">
              <h2>Site Settings</h2>
              <div className="row">
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header">
                      <h5>General Settings</h5>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <label className="form-label">Site Title</label>
                        <input
                          type="text"
                          className="form-control"
                          value={siteSettings.title}
                          onChange={(e) => setSiteSettings({...siteSettings, title: e.target.value})}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Site Description</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          value={siteSettings.description}
                          onChange={(e) => setSiteSettings({...siteSettings, description: e.target.value})}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Canonical URL</label>
                        <input
                          type="url"
                          className="form-control"
                          value={siteSettings.canonical}
                          onChange={(e) => setSiteSettings({...siteSettings, canonical: e.target.value})}
                        />
                      </div>
                      <button className="btn btn-primary">
                        <i className="bi bi-check-circle me-2"></i>
                        Save Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {viewingOrder && (
        <ViewOrderModal
          order={viewingOrder}
          onClose={() => setViewingOrder(null)}
          loading={loadingOrderDetails}
        />
      )}

      {editingContact && (
        <ContactModal
          contact={editingContact}
          onSave={handleSaveContact}
          onClose={() => setEditingContact(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;