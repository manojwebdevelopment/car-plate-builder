// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../assets/css/PlateForge.css"; // Import custom CSS for PlateForge styles
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/autoplay";
// import SwiperCore from "swiper";
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// SwiperCore.use([Autoplay]);

// const plateImages = [
//   "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
//   "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
//   "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
//   "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
//   "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
// ];

// const features = [
//   { icon: "bi-truck", title: "FREE DELIVERY" },
//   { icon: "bi-shield-check", title: "3-YEAR WARRANTY" },
//   { icon: "bi-file-earmark-check", title: "100% ROAD LEGAL" },
//   { icon: "bi-award", title: "PREMIUM QUALITY" },
//   { icon: "bi-headset", title: "EXCELLENT SERVICE" },
// ];

// const products = [
//   {
//     title: '4D Gel Number Plates',
//     img: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp',
//     link: '#'
//   },
//   {
//     title: '3D Gel Number Plates',
//     img: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp',
//     link: '#'
//   },
//   {
//     title: 'Hex Number Plates',
//     img: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp',
//     link: '#'
//   },
//   {
//     title: 'Krystal Plates',
//     img: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp',
//     link: '#'
//   }
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   const [regNumber, setRegNumber] = useState("");

//   const handleSearch = () => {
//     const trimmed = regNumber.trim().toUpperCase();
//     const isValid = /^[A-Z0-9]{1,7}$/.test(trimmed); // 1 to 7 letters/numbers only

//     if (!isValid) {
//       alert(
//         "Invalid number plate! Use only letters and numbers (max 7 characters)."
//       );
//       return;
//     }

//     navigate(`/plate-builder?reg=${trimmed}`);
//   };

//   return (
//     <>
//       <style jsx>{`
//         .bg-yellow-primary {
//           background-color: #ffc107;
//         }
//         .bg-yellow-secondary {
//           background-color: #fff3cd;
//         }
//         .bg-yellow-light {
//           background-color: #fffbf0;
//         }
//         .bg-yellow-gradient {
//           background: linear-gradient(135deg, #ffc107, #ffca2c);
//         }
//         .bg-yellow-gradient-light {
//           background: linear-gradient(135deg, #fff3cd, #ffeaa7);
//         }
//         .bg-orange-gradient {
//           background: linear-gradient(135deg, #ff8c42, #ff6b35);
//         }
//         .text-yellow-primary {
//           color: #ffc107;
//         }
//         .text-orange-primary {
//           color: #ff6b35;
//         }
//         .border-yellow-primary {
//           border-color: #ffc107;
//         }
//         .card-hover:hover {
//           transform: translateY(-10px);
//           transition: all 0.3s ease;
//           box-shadow: 0 20px 40px rgba(255, 193, 7, 0.3);
//         }
//         .shadow-yellow {
//           box-shadow: 0 10px 30px rgba(255, 193, 7, 0.2);
//         }
//         .hero-bg {
//           background: linear-gradient(
//             135deg,
//             #ffc107 0%,
//             #ffca2c 50%,
//             #fff3cd 100%
//           );
//           position: relative;
//           overflow: hidden;
//         }
//         .hero-bg::before {
//           content: "";
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: radial-gradient(
//               circle at 20% 20%,
//               rgba(255, 255, 255, 0.3) 0%,
//               transparent 50%
//             ),
//             radial-gradient(
//               circle at 80% 80%,
//               rgba(255, 107, 53, 0.1) 0%,
//               transparent 50%
//             );
//         }
//         .text-shadow {
//           text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
//         }
//         .btn-glow:hover {
//           box-shadow: 0 0 20px rgba(255, 193, 7, 0.5);
//           transform: scale(1.05);
//           transition: all 0.3s ease;
//         }
//         .pulse-animation {
//           animation: pulse 2s infinite;
//         }
//         @keyframes pulse {
//           0% {
//             transform: scale(1);
//           }
//           50% {
//             transform: scale(1.05);
//           }
//           100% {
//             transform: scale(1);
//           }
//         }
//         .section-separator {
//           height: 4px;
//           background: linear-gradient(90deg, #ffc107, #ff8c42, #ffc107);
//         }
//       `}</style>

//       <div className="min-vh-100" style={{ backgroundColor: "#fffbf0" }}>
//         <section>
//           {/* HERO FORM + BANNER */}
//           <div
//             style={{
//               backgroundColor: "#f2f2f2",
//               paddingTop: "30px",
//             //   paddingBottom: "30px",
//             }}
//           >
//             <div
//               className="mx-auto p-4 rounded text-center shadow"
//               style={{
//                 backgroundColor: "#1a1a1a",
//                 border: "2px solid #f1c40f",
//                 color: "white",
//                 maxWidth: "900px",
//               }}
//             >
//               <h4 className="fw-bold mb-3">DESIGN YOUR PLATES</h4>
//               <div className="d-flex justify-content-center">
//                 <input
//                   type="text"
//                   placeholder="Enter Your Registration"
//                   className="form-control me-2"
//                   style={{ maxWidth: "500px", borderRadius: "5px" }}
//                 />
//                 <button
//                   className="btn"
//                   style={{
//                     backgroundColor: "#f1c40f",
//                     color: "black",
//                     fontWeight: "bold",
//                     borderRadius: "5px",
//                   }}
//                 >
//                   BUILD NOW
//                 </button>
//               </div>
//             </div>
//             <div
//               className="text-center fw-bold py-2 mt-3"
//               style={{ backgroundColor: "#f1c40f", color: "black" }}
//             >
//               FREE FIXING KIT | FREE SHIPPING OVER £35
//             </div>
//           </div>

//           {/* CAROUSEL */}
//           <div className="bg-white py-4">
//             <Swiper
//               spaceBetween={30}
//               slidesPerView={3}
//               loop={true}
//               autoplay={{ delay: 2500, disableOnInteraction: false }}
//               breakpoints={{
//                 0: { slidesPerView: 1 },
//                 768: { slidesPerView: 2 },
//                 992: { slidesPerView: 3 },
//               }}
//             >
//               {plateImages.map((img, idx) => (
//                 <SwiperSlide key={idx}>
//                   <img
//                     src={img}
//                     alt={`plate ${idx}`}
//                     className="img-fluid mx-auto d-block"
//                     style={{ maxHeight: "180px" }}
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

//           {/* FEATURE BAR */}
//           <div style={{ backgroundColor: "#111", padding: "30px 0" }}>
//             <div className="container">
//               <div className="row text-center justify-content-center">
//                 {features.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="col-6 col-sm-4 col-md-2 mx-2 mb-3 text-white"
//                   >
//                     <i
//                       className={`${item.icon}`}
//                       style={{ fontSize: "2rem" }}
//                     ></i>
//                     <p className="fw-bold mt-2" style={{ fontSize: "0.9rem" }}>
//                       {item.title}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         <section style={{ backgroundColor: '#fddc00', padding: '50px 0' }}>
//       <div className="container">
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           spaceBetween={30}
//           slidesPerView={3}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 2500 }}
//           breakpoints={{
//             0: { slidesPerView: 1 },
//             768: { slidesPerView: 2 },
//             992: { slidesPerView: 3 }
//           }}
//         >
//           {products.map((product, idx) => (
//             <SwiperSlide key={idx}>
//               <div className="card border-0 shadow-sm h-100">
//                 <img
//                   src={product.img}
//                   className="card-img-top"
//                   alt={product.title}
//                   style={{ objectFit: 'cover', height: '300px' }}
//                 />
//                 <div className="card-body text-center bg-dark text-white">
//                   <h5 className="card-title">{product.title}</h5>
//                   <a
//                     href={product.link}
//                     className="btn btn-warning fw-bold mt-2"
//                     style={{ borderRadius: '5px', color: 'black' }}
//                   >
//                     SHOP NOW
//                   </a>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Shop All Styles Button */}
//         <div className="text-center mt-4">
//           <button
//             className="btn btn-dark text-white fw-bold"
//             style={{ border: '2px solid white', padding: '10px 25px' }}
//           >
//             SHOP ALL STYLES
//           </button>
//         </div>
//       </div>
//     </section>

//         {/* Section Separator */}
//         <div className="section-separator"></div>

//         {/* Features Section */}
//         <section className="py-5 bg-yellow-light">
//           <div className="container py-5">
//             <div className="text-center mb-5">
//               <h2 className="display-4 fw-bold text-dark mb-4">
//                 Why Choose{" "}
//                 <span className="text-orange-primary">PlateForge</span>?
//               </h2>
//               <p
//                 className="fs-4 text-secondary mx-auto"
//                 style={{ maxWidth: "600px" }}
//               >
//                 Premium quality plates with unmatched service and competitive
//                 pricing
//               </p>
//             </div>

//             <div className="row g-4">
//               <div className="col-md-6 col-lg-3">
//                 <div className="bg-white p-5 rounded-4 text-center border-3 border-warning card-hover h-100 shadow-yellow">
//                   <div
//                     className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-yellow"
//                     style={{ width: "80px", height: "80px", fontSize: "2rem" }}
//                   >
//                     🏆
//                   </div>
//                   <h3 className="h4 fw-bold text-dark mb-3">Premium Quality</h3>
//                   <p className="text-secondary">
//                     Made with high-grade materials that last for years with
//                     perfect finish and durability
//                   </p>
//                 </div>
//               </div>

//               <div className="col-md-6 col-lg-3">
//                 <div className="bg-white p-5 rounded-4 text-center border-3 border-warning card-hover h-100 shadow-yellow">
//                   <div
//                     className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-yellow"
//                     style={{ width: "80px", height: "80px", fontSize: "2rem" }}
//                   >
//                     🚚
//                   </div>
//                   <h3 className="h4 fw-bold text-dark mb-3">Fast Delivery</h3>
//                   <p className="text-secondary">
//                     Quick turnaround time with secure packaging and reliable
//                     shipping nationwide
//                   </p>
//                 </div>
//               </div>

//               <div className="col-md-6 col-lg-3">
//                 <div className="bg-white p-5 rounded-4 text-center border-3 border-warning card-hover h-100 shadow-yellow">
//                   <div
//                     className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-yellow"
//                     style={{ width: "80px", height: "80px", fontSize: "2rem" }}
//                   >
//                     🛡️
//                   </div>
//                   <h3 className="h4 fw-bold text-dark mb-3">
//                     Legal Compliance
//                   </h3>
//                   <p className="text-secondary">
//                     All plates meet DVLA standards and legal requirements for
//                     road use
//                   </p>
//                 </div>
//               </div>

//               <div className="col-md-6 col-lg-3">
//                 <div className="bg-white p-5 rounded-4 text-center border-3 border-warning card-hover h-100 shadow-yellow">
//                   <div
//                     className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-yellow"
//                     style={{ width: "80px", height: "80px", fontSize: "2rem" }}
//                   >
//                     ⭐
//                   </div>
//                   <h3 className="h4 fw-bold text-dark mb-3">5-Star Service</h3>
//                   <p className="text-secondary">
//                     Exceptional customer service with 24/7 support and expert
//                     assistance
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Section Separator */}
//         <div className="section-separator"></div>

//         {/* Product Categories */}
//         <section className="py-5 bg-yellow-secondary">
//           <div className="container py-5">
//             <div className="text-center mb-5">
//               <h2 className="display-4 fw-bold text-dark mb-4">
//                 Our <span className="text-orange-primary">Product Range</span>
//               </h2>
//               <p
//                 className="fs-4 text-secondary mx-auto"
//                 style={{ maxWidth: "600px" }}
//               >
//                 Choose from our wide selection of premium number plates with
//                 competitive pricing
//               </p>
//             </div>

//             <div className="row g-4 justify-content-center">
//               <div className="col-lg-4">
//                 <div className="bg-white p-5 rounded-4 border-3 border-warning card-hover h-100 shadow-yellow">
//                   <div className="text-center">
//                     <div className="bg-light text-dark px-4 py-3 rounded-3 fs-2 fw-bold mb-4 mx-auto d-inline-block shadow-yellow border-3 border-secondary">
//                       AB12 CDE
//                     </div>
//                     <h3 className="h3 fw-bold text-dark mb-3">
//                       Standard Plates
//                     </h3>
//                     <p className="text-secondary mb-4">
//                       Classic design with reflective backing for maximum
//                       visibility and legal compliance
//                     </p>
//                     <div className="text-orange-primary display-6 fw-bold mb-3">
//                       £24.99
//                     </div>
//                     <button className="btn bg-yellow-gradient text-dark fw-bold fs-5 w-100 py-3 rounded-3 border-2 border-warning btn-glow shadow-yellow">
//                       Order Now
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-lg-4">
//                 <div className="bg-white p-5 rounded-4 border-3 border-warning card-hover h-100 shadow-yellow pulse-animation">
//                   <div className="text-center">
//                     <div className="bg-yellow-gradient text-dark px-4 py-3 rounded-3 fs-2 fw-bold mb-4 mx-auto d-inline-block shadow-yellow border-3 border-warning">
//                       AB12 CDE
//                     </div>
//                     <h3 className="h3 fw-bold text-dark mb-3">3D Gel Plates</h3>
//                     <p className="text-secondary mb-4">
//                       Raised characters with premium gel finish for enhanced
//                       appeal and modern look
//                     </p>
//                     <div className="text-orange-primary display-6 fw-bold mb-3">
//                       £34.99
//                     </div>
//                     <button className="btn bg-orange-gradient text-white fw-bold fs-5 w-100 py-3 rounded-3 border-2 border-warning btn-glow shadow-yellow">
//                       Most Popular
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-lg-4">
//                 <div className="bg-white p-5 rounded-4 border-3 border-warning card-hover h-100 shadow-yellow">
//                   <div className="text-center">
//                     <div className="bg-secondary text-warning border-3 border-warning px-4 py-3 rounded-3 fs-2 fw-bold mb-4 mx-auto d-inline-block shadow-yellow">
//                       AB12 CDE
//                     </div>
//                     <h3 className="h3 fw-bold text-dark mb-3">Show Plates</h3>
//                     <p className="text-secondary mb-4">
//                       Custom designs for exhibitions and private use only with
//                       personalized styling
//                     </p>
//                     <div className="text-orange-primary display-6 fw-bold mb-3">
//                       £19.99
//                     </div>
//                     <button className="btn bg-yellow-gradient text-dark fw-bold fs-5 w-100 py-3 rounded-3 border-2 border-warning btn-glow shadow-yellow">
//                       Order Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Section Separator */}
//         <div className="section-separator"></div>

//         {/* Contact Section */}
//         <section className="py-5 bg-yellow-light">
//           <div className="container py-5">
//             <div className="text-center mb-5">
//               <h2 className="display-4 fw-bold text-dark mb-4">
//                 Get in <span className="text-orange-primary">Touch</span>
//               </h2>
//               <p
//                 className="fs-4 text-secondary mx-auto"
//                 style={{ maxWidth: "600px" }}
//               >
//                 Ready to order or have questions? Our expert team is here to
//                 help you 24/7
//               </p>
//             </div>

//             <div className="row g-4 justify-content-center">
//               <div className="col-md-4">
//                 <div className="bg-white p-5 rounded-4 text-center border-3 border-warning card-hover h-100 shadow-yellow">
//                   <div
//                     className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-yellow"
//                     style={{ width: "80px", height: "80px", fontSize: "2rem" }}
//                   >
//                     📞
//                   </div>
//                   <h3 className="h4 fw-bold text-dark mb-3">Call Us</h3>
//                   <p className="text-orange-primary fs-5 fw-bold">
//                     0800 123 4567
//                   </p>
//                   <p className="text-secondary">Mon-Fri 9AM-6PM</p>
//                 </div>
//               </div>

//               <div className="col-md-4">
//                 <div className="bg-white p-5 rounded-4 text-center border-3 border-warning card-hover h-100 shadow-yellow">
//                   <div
//                     className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-yellow"
//                     style={{ width: "80px", height: "80px", fontSize: "2rem" }}
//                   >
//                     ✉️
//                   </div>
//                   <h3 className="h4 fw-bold text-dark mb-3">Email Us</h3>
//                   <p className="text-orange-primary fs-5 fw-bold">
//                     info@plateforge.com
//                   </p>
//                   <p className="text-secondary">Quick Response</p>
//                 </div>
//               </div>

//               <div className="col-md-4">
//                 <div className="bg-white p-5 rounded-4 text-center border-3 border-warning card-hover h-100 shadow-yellow">
//                   <div
//                     className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-yellow"
//                     style={{ width: "80px", height: "80px", fontSize: "2rem" }}
//                   >
//                     📍
//                   </div>
//                   <h3 className="h4 fw-bold text-dark mb-3">Visit Us</h3>
//                   <p className="text-orange-primary fs-5 fw-bold">London, UK</p>
//                   <p className="text-secondary">By Appointment</p>
//                 </div>
//               </div>
//             </div>

//             {/* Call to Action */}
//             <div className="text-center mt-5">
//               <div className="bg-orange-gradient p-5 rounded-4 shadow-yellow">
//                 <h3 className="display-6 fw-bold text-white mb-3 text-shadow">
//                   Ready to Get Started?
//                 </h3>
//                 <p className="fs-5 text-white mb-4 text-shadow">
//                   Create your perfect number plate today with our easy-to-use
//                   builder
//                 </p>
//                 <button
//                   onClick={() => navigate("/plate-builder")}
//                   className="btn bg-white text-dark fw-bold fs-4 px-5 py-3 rounded-3 border-3 border-white btn-glow shadow-yellow"
//                 >
//                   🚀 Start Building Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }

// import { useState } from "react";

// const plateImages = [
//   "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
//   "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
//   "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
//   "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
//   "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
// ];

// const features = [
//   { icon: "bi-truck", title: "FREE DELIVERY" },
//   { icon: "bi-shield-check", title: "3-YEAR WARRANTY" },
//   { icon: "bi-file-earmark-check", title: "100% ROAD LEGAL" },
//   { icon: "bi-award", title: "PREMIUM QUALITY" },
//   { icon: "bi-headset", title: "EXCELLENT SERVICE" },
// ];

// const products = [
//   {
//     title: '4D Gel Number Plates',
//     img: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp',
//     link: '#'
//   },
//   {
//     title: '3D Gel Number Plates',
//     img: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp',
//     link: '#'
//   },
//   {
//     title: 'Hex Number Plates',
//     img: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp',
//     link: '#'
//   },
//   {
//     title: 'Krystal Plates',
//     img: 'images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp',
//     link: '#'
//   }
// ];

// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const [regNumber, setRegNumber] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = () => {
//     const trimmed = regNumber.trim().toUpperCase();
//     const isValid = /^[A-Z0-9]{1,7}$/.test(trimmed);

//     if (!isValid) {
//       alert("Invalid number plate! Use only letters and numbers (max 7 characters).");
//       return;
//     }

//     navigate(`/plate-builder?reg=${trimmed}`);
//   };

//   return (
//     <>
//       <style jsx>{`
//         .bg-charcoal-primary { background-color: #555879; }
//         .bg-slate-primary { background-color: #98A1BC; }
//         .bg-warm-primary { background-color: #DED3C4; }
//         .bg-cream-primary { background-color: #F4EBD3; }

//         .bg-charcoal-gradient { background: linear-gradient(135deg, #555879, #98A1BC); }
//         .bg-slate-gradient { background: linear-gradient(135deg, #98A1BC, #DED3C4); }
//         .bg-warm-gradient { background: linear-gradient(135deg, #DED3C4, #F4EBD3); }
//         .bg-sophisticated-gradient { background: linear-gradient(135deg, #555879 0%, #98A1BC 50%, #DED3C4 100%); }
//         .bg-elegant-gradient { background: linear-gradient(135deg, #98A1BC 0%, #DED3C4 50%, #F4EBD3 100%); }

//         .text-charcoal-primary { color: #555879; }
//         .text-slate-primary { color: #98A1BC; }
//         .text-warm-primary { color: #DED3C4; }

//         .border-charcoal-primary { border-color: #555879; }
//         .border-slate-primary { border-color: #98A1BC; }
//         .border-warm-primary { border-color: #DED3C4; }

//         .card-hover:hover {
//           transform: translateY(-10px);
//           transition: all 0.3s ease;
//           box-shadow: 0 20px 40px rgba(85, 88, 121, 0.3);
//         }

//         .elegant-shadow {
//           box-shadow: 0 10px 30px rgba(85, 88, 121, 0.15);
//         }

//         .hero-bg {
//           background: linear-gradient(135deg, #555879 0%, #98A1BC 30%, #DED3C4 70%, #F4EBD3 100%);
//           position: relative;
//           overflow: hidden;
//         }

//         .hero-bg::before {
//           content: "";
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
//                       radial-gradient(circle at 80% 80%, rgba(222, 211, 196, 0.2) 0%, transparent 50%);
//         }

//         .text-shadow { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); }

//         .btn-glow:hover {
//           box-shadow: 0 0 20px rgba(85, 88, 121, 0.4);
//           transform: scale(1.05);
//           transition: all 0.3s ease;
//         }

//         .pulse-animation { animation: pulse 2s infinite; }

//         @keyframes pulse {
//           0% { transform: scale(1); }
//           50% { transform: scale(1.05); }
//           100% { transform: scale(1); }
//         }

//         .section-separator {
//           height: 4px;
//           background: linear-gradient(90deg, #555879, #98A1BC, #DED3C4, #555879);
//         }

//         .hover-lift:hover {
//           transform: translateY(-5px);
//           transition: all 0.3s ease;
//         }

//         .premium-card {
//           backdrop-filter: blur(10px);
//           background: rgba(244, 235, 211, 0.9);
//         }
//       `}</style>

//       <div className="min-vh-100 bg-cream-primary">
//         <section>
//           {/* HERO FORM + BANNER */}
//           <div className="hero-bg" style={{ paddingTop: "40px", paddingBottom: "20px" }}>
//             <div
//               className="mx-auto p-4 rounded-4 text-center elegant-shadow"
//               style={{
//                 backgroundColor: "#555879",
//                 border: "3px solid #DED3C4",
//                 color: "white",
//                 maxWidth: "900px",
//               }}
//             >
//               <h4 className="fw-bold mb-3 text-shadow">DESIGN YOUR PLATES</h4>
//               <div className="d-flex justify-content-center">
//                 <input
//                   type="text"
//                   placeholder="Enter Your Registration"
//                   className="form-control me-2 border-2 border-warm-primary"
//                   style={{ maxWidth: "500px", borderRadius: "8px" }}
//                   value={regNumber}
//                   onChange={(e) => setRegNumber(e.target.value)}
//                 />
//                 <button
//                   className="btn fw-bold btn-glow"
//                   style={{
//                     backgroundColor: "#DED3C4",
//                     color: "#555879",
//                     borderRadius: "8px",
//                     border: "2px solid #98A1BC",
//                   }}
//                   onClick={handleSearch}
//                 >
//                   BUILD NOW
//                 </button>
//               </div>
//             </div>
//             <div
//               className="text-center fw-bold py-3 mt-4 text-shadow"
//               style={{
//                 background: "linear-gradient(90deg, #98A1BC, #DED3C4)",
//                 color: "#555879",
//                 borderRadius: "0 0 20px 20px"
//               }}
//             >
//               FREE FIXING KIT | FREE SHIPPING OVER £35
//             </div>
//           </div>

//           {/* IMAGES SECTION */}
//           <div className="bg-cream-primary py-5">
//             <div className="container">
//               <div className="row g-4">
//                 {plateImages.slice(0, 3).map((img, idx) => (
//                   <div key={idx} className="col-md-4">
//                     <div className="p-3 rounded-4 bg-white elegant-shadow hover-lift">
//                       <img
//                         src={img}
//                         alt={`plate ${idx}`}
//                         className="img-fluid mx-auto d-block rounded-3"
//                         style={{ maxHeight: "180px" }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* FEATURE BAR */}
//           <div className="bg-charcoal-primary" style={{ padding: "40px 0" }}>
//             <div className="container">
//               <div className="row text-center justify-content-center">
//                 {features.map((item, idx) => (
//                   <div key={idx} className="col-6 col-sm-4 col-md-2 mx-2 mb-3 text-white hover-lift">
//                     <div
//                       className="bg-slate-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
//                       style={{ width: "60px", height: "60px" }}
//                     >
//                       <i className={`${item.icon}`} style={{ fontSize: "1.5rem", color: "white" }}></i>
//                     </div>
//                     <p className="fw-bold" style={{ fontSize: "0.9rem" }}>{item.title}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* PRODUCTS SECTION */}
//         <section className="bg-slate-primary" style={{ padding: '60px 0' }}>
//           <div className="container">
//             <div className="row g-4">
//               {products.map((product, idx) => (
//                 <div key={idx} className="col-md-6 col-lg-3">
//                   <div className="card border-0 elegant-shadow h-100 hover-lift">
//                     <img
//                       src={product.img}
//                       className="card-img-top"
//                       alt={product.title}
//                     />
//                     <div className="card-body text-center">
//                       <h5 className="card-title">{product.title}</h5>
//                       <a
//                         href={product.link}
//                         className="btn fw-bold mt-2 btn-glow"
//                         style={{
//                           backgroundColor: '#DED3C4',
//                           borderRadius: '8px',
//                           color: '#555879',
//                           border: '2px solid #98A1BC'
//                         }}
//                       >
//                         SHOP NOW
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="text-center mt-5">
//               <button
//                 className="btn fw-bold btn-glow elegant-shadow"
//                 style={{
//                   backgroundColor: '#F4EBD3',
//                   color: '#555879',
//                   border: '3px solid #98A1BC',
//                   padding: '15px 30px',
//                   borderRadius: '12px'
//                 }}
//               >
//                 SHOP ALL STYLES
//               </button>
//             </div>
//           </div>
//         </section>

//         <div className="section-separator"></div>

//         {/* FEATURES SECTION */}
//         <section className="py-5 bg-warm-gradient">
//           <div className="container py-5">
//             <div className="text-center mb-5">
//               <h2 className="display-4 fw-bold text-charcoal-primary mb-4">
//                 Why Choose <span className="text-slate-primary">PlateForge</span>?
//               </h2>
//               <p className="fs-4 text-charcoal-primary mx-auto" style={{ maxWidth: "600px" }}>
//                 Premium quality plates with unmatched service and competitive pricing
//               </p>
//             </div>

//             <div className="row g-4">
//               {[
//                 { emoji: "🏆", title: "Premium Quality", desc: "Made with high-grade materials that last for years with perfect finish and durability" },
//                 { emoji: "🚚", title: "Fast Delivery", desc: "Quick turnaround time with secure packaging and reliable shipping nationwide" },
//                 { emoji: "🛡️", title: "Legal Compliance", desc: "All plates meet DVLA standards and legal requirements for road use" },
//                 { emoji: "⭐", title: "5-Star Service", desc: "Exceptional customer service with 24/7 support and expert assistance" }
//               ].map((item, idx) => (
//                 <div key={idx} className="col-md-6 col-lg-3">
//                   <div className="premium-card p-5 rounded-4 text-center border-3 border-slate-primary card-hover h-100 elegant-shadow">
//                     <div
//                       className="bg-slate-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
//                       style={{ width: "80px", height: "80px", fontSize: "2rem" }}
//                     >
//                       {item.emoji}
//                     </div>
//                     <h3 className="h4 fw-bold text-charcoal-primary mb-3">{item.title}</h3>
//                     <p className="text-charcoal-primary opacity-75">{item.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         <div className="section-separator"></div>

//         {/* PRODUCT CATEGORIES */}
//         <section className="py-5 bg-cream-primary">
//           <div className="container py-5">
//             <div className="text-center mb-5">
//               <h2 className="display-4 fw-bold text-charcoal-primary mb-4">
//                 Our <span className="text-slate-primary">Product Range</span>
//               </h2>
//               <p className="fs-4 text-charcoal-primary mx-auto" style={{ maxWidth: "600px" }}>
//                 Choose from our wide selection of premium number plates with competitive pricing
//               </p>
//             </div>

//             <div className="row g-4 justify-content-center">
//               {[
//                 { title: "Standard Plates", price: "£24.99", bg: "bg-light", color: "text-charcoal-primary", btnClass: "bg-slate-gradient" },
//                 { title: "3D Gel Plates", price: "£34.99", bg: "bg-slate-gradient", color: "text-white", btnClass: "bg-charcoal-gradient", popular: true },
//                 { title: "Show Plates", price: "£19.99", bg: "bg-charcoal-primary", color: "text-warm-primary", btnClass: "bg-slate-gradient" }
//               ].map((item, idx) => (
//                 <div key={idx} className="col-lg-4">
//                   <div className={`bg-white p-5 rounded-4 border-3 border-slate-primary card-hover h-100 elegant-shadow ${item.popular ? 'pulse-animation' : ''}`}>
//                     <div className="text-center">
//                       <div className={`${item.bg} ${item.color} px-4 py-3 rounded-3 fs-2 fw-bold mb-4 mx-auto d-inline-block border-3 ${item.popular ? 'border-warm-primary' : 'border-slate-primary'}`}>
//                         AB12 CDE
//                       </div>
//                       <h3 className="h3 fw-bold text-charcoal-primary mb-3">{item.title}</h3>
//                       <p className="text-charcoal-primary opacity-75 mb-4">
//                         {idx === 0 && "Classic design with reflective backing for maximum visibility and legal compliance"}
//                         {idx === 1 && "Raised characters with premium gel finish for enhanced appeal and modern look"}
//                         {idx === 2 && "Custom designs for exhibitions and private use only with personalized styling"}
//                       </p>
//                       <div className="text-slate-primary display-6 fw-bold mb-3">{item.price}</div>
//                       <button className={`btn ${item.btnClass} text-white fw-bold fs-5 w-100 py-3 rounded-3 border-2 ${item.popular ? 'border-warm-primary' : 'border-slate-primary'} btn-glow`}>
//                         {item.popular ? "Most Popular" : "Order Now"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         <div className="section-separator"></div>

//         {/* CONTACT SECTION */}
//         <section className="py-5 bg-elegant-gradient">
//           <div className="container py-5">
//             <div className="text-center mb-5">
//               <h2 className="display-4 fw-bold text-charcoal-primary mb-4">
//                 Get in <span className="text-slate-primary">Touch</span>
//               </h2>
//               <p className="fs-4 text-charcoal-primary mx-auto" style={{ maxWidth: "600px" }}>
//                 Ready to order or have questions? Our expert team is here to help you 24/7
//               </p>
//             </div>

//             <div className="row g-4 justify-content-center">
//               {[
//                 { emoji: "📞", title: "Call Us", info: "0800 123 4567", sub: "Mon-Fri 9AM-6PM" },
//                 { emoji: "✉️", title: "Email Us", info: "info@plateforge.com", sub: "Quick Response" },
//                 { emoji: "📍", title: "Visit Us", info: "London, UK", sub: "By Appointment" }
//               ].map((item, idx) => (
//                 <div key={idx} className="col-md-4">
//                   <div className="premium-card p-5 rounded-4 text-center border-3 border-slate-primary card-hover h-100 elegant-shadow">
//                     <div
//                       className="bg-slate-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
//                       style={{ width: "80px", height: "80px", fontSize: "2rem" }}
//                     >
//                       {item.emoji}
//                     </div>
//                     <h3 className="h4 fw-bold text-charcoal-primary mb-3">{item.title}</h3>
//                     <p className="text-slate-primary fs-5 fw-bold">{item.info}</p>
//                     <p className="text-charcoal-primary opacity-75">{item.sub}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* CALL TO ACTION */}
//             <div className="text-center mt-5">
//               <div className="bg-sophisticated-gradient p-5 rounded-4 elegant-shadow">
//                 <h3 className="display-6 fw-bold text-white mb-3 text-shadow">Ready to Get Started?</h3>
//                 <p className="fs-5 text-white mb-4 text-shadow">
//                   Create your perfect number plate today with our easy-to-use builder
//                 </p>
//                 <button
//                   onClick={handleSearch}
//                   className="btn text-charcoal-primary fw-bold fs-4 px-5 py-3 rounded-3 border-3 btn-glow"
//                   style={{ backgroundColor: '#F4EBD3', borderColor: '#DED3C4' }}
//                 >
//                   🚀 Start Building Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import SwiperCore from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

SwiperCore.use([Autoplay]);

const plateImages = [
  "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
  "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
  "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
  "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
  "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
];

const features = [
  { icon: "bi-truck", title: "FREE DELIVERY" },
  { icon: "bi-shield-check", title: "3-YEAR WARRANTY" },
  { icon: "bi-file-earmark-check", title: "100% ROAD LEGAL" },
  { icon: "bi-award", title: "PREMIUM QUALITY" },
  { icon: "bi-headset", title: "EXCELLENT SERVICE" },
];

const products = [
  {
    title: "4D Gel Number Plates",
    img: "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
    link: "#",
  },
  {
    title: "3D Gel Number Plates",
    img: "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
    link: "#",
  },
  {
    title: "Hex Number Plates",
    img: "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
    link: "#",
  },
  {
    title: "Krystal Plates",
    img: "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
    link: "#",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [regNumber, setRegNumber] = useState("");

  const handleSearch = () => {
    const trimmed = regNumber.trim().toUpperCase();
    const isValid = /^[A-Z0-9]{1,7}$/.test(trimmed); // 1 to 7 letters/numbers only

    if (!isValid) {
      alert(
        "Invalid number plate! Use only letters and numbers (max 7 characters)."
      );
      return;
    }

    navigate(`/plate-builder?reg=${trimmed}`);
  };

  return (
    <div className="min-vh-100-custom">
      <section>
        {/* HERO FORM + BANNER */}
        <div className="bg-section" style={{ paddingTop: "30px" }}>
          {/* New Text Added Here */}
          <p className="text-white-custom mb-4 plate-info-text">
            Design your perfect style number plates! <br />
            <span>Standard, 3D Gel, 4D, 5D, custom sizes and more...</span>
          </p>
          <div className="mx-auto p-4 rounded text-center shadow plate-input-container">
            <h4 className="fw-bold mb-3 text-white-custom">
              DESIGN YOUR PLATES
            </h4>
            <div className="d-flex justify-content-center">
              <input
                type="text"
                placeholder="Enter Your Registration"
                className="form-control me-2 form-control-custom"
                style={{ maxWidth: "500px" }}
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
              />
              <button
                className="btn btn-primary-custom font-weight-custom"
                onClick={handleSearch}
              >
                BUILD NOW
              </button>
            </div>
          </div>
        </div>

        {/* CAROUSEL */}
        <div className="bg-white py-4">
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
          >
            {plateImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`plate ${idx}`}
                  className="img-fluid mx-auto d-block"
                  style={{ maxHeight: "180px" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* FEATURE BAR */}
        <div className="bg-dark-custom py-custom">
          <div className="container">
            <div className="row text-center justify-content-center">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="col-6 col-sm-4 col-md-2 mx-2 mb-3 text-white-custom"
                >
                  <i
                    className={`${item.icon}`}
                    style={{ fontSize: "2rem" }}
                  ></i>
                  <p
                    className="font-weight-custom mt-2"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS CAROUSEL */}
      <section className="bg-yellow-primary py-custom">
        <div className="container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500 }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
          >
            {products.map((product, idx) => (
              <SwiperSlide key={idx}>
                <div className="card border-0 shadow-sm h-100">
                  <img
                    src={product.img}
                    className="card-img-top"
                    alt={product.title}
                    style={{ objectFit: "cover", height: "300px" }}
                  />
                  <div className="card-body text-center bg-dark text-white">
                    <h5 className="card-title">{product.title}</h5>
                    <a
                      href={product.link}
                      className="btn btn-primary-custom font-weight-custom mt-2"
                    >
                      SHOP NOW
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Shop All Styles Button */}
          <div className="text-center mt-4">
            <button className="btn btn-outline-custom font-weight-custom px-4 py-2">
              SHOP ALL STYLES
            </button>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="section-separator"></div>

      {/* Features Section */}
      <section className="py-5 bg-yellow-light">
        <div className="container py-custom">
          <div className="text-center mb-5">
            <h2 className="display-4 font-weight-extra text-dark mb-4">
              Why Choose <span className="text-orange-primary">PlateForge</span>
              ?
            </h2>
            <p
              className="fs-4 text-secondary-custom mx-auto"
              style={{ maxWidth: "600px" }}
            >
              Premium quality plates with unmatched service and competitive
              pricing
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card-custom p-custom text-center card-hover h-100 shadow-yellow">
                <div className="feature-icon">🏆</div>
                <h3 className="h4 font-weight-custom text-dark mb-3">
                  Premium Quality
                </h3>
                <p className="text-secondary-custom">
                  Made with high-grade materials that last for years with
                  perfect finish and durability
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card-custom p-custom text-center card-hover h-100 shadow-yellow">
                <div className="feature-icon">🚚</div>
                <h3 className="h4 font-weight-custom text-dark mb-3">
                  Fast Delivery
                </h3>
                <p className="text-secondary-custom">
                  Quick turnaround time with secure packaging and reliable
                  shipping nationwide
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card-custom p-custom text-center card-hover h-100 shadow-yellow">
                <div className="feature-icon">🛡️</div>
                <h3 className="h4 font-weight-custom text-dark mb-3">
                  Legal Compliance
                </h3>
                <p className="text-secondary-custom">
                  All plates meet DVLA standards and legal requirements for road
                  use
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card-custom p-custom text-center card-hover h-100 shadow-yellow">
                <div className="feature-icon">⭐</div>
                <h3 className="h4 font-weight-custom text-dark mb-3">
                  5-Star Service
                </h3>
                <p className="text-secondary-custom">
                  Exceptional customer service with 24/7 support and expert
                  assistance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="section-separator"></div>

      {/* Product Categories */}
      <section className="py-5 bg-yellow-secondary">
        <div className="container py-custom">
          <div className="text-center mb-5">
            <h2 className="display-4 font-weight-extra text-dark mb-4">
              Our <span className="text-orange-primary">Product Range</span>
            </h2>
            <p
              className="fs-4 text-secondary-custom mx-auto"
              style={{ maxWidth: "600px" }}
            >
              Choose from our wide selection of premium number plates with
              competitive pricing
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-lg-4">
              <div className="card-custom p-custom card-hover h-100 shadow-yellow pulse-animation">
                <div className="text-center">
                  <img
                    src="images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp" // replace with actual image path
                    alt="Standard Number Plate"
                    className="mb-4 mx-auto d-block rounded-custom shadow-yellow border-3-custom border-primary-custom"
                    style={{ maxWidth: "260px", height: "auto" }}
                  />

                  <h3 className="h3 font-weight-custom text-dark mb-3">
                    Standard Plates
                  </h3>
                  <p className="text-secondary-custom mb-4">
                    Classic design with reflective backing for maximum
                    visibility and legal compliance
                  </p>
                  <div className="text-primary-custom display-6 font-weight-custom mb-3">
                    £24.99
                  </div>
                  <button className="btn btn-gradient-custom font-weight-custom fs-5 w-100 py-3 rounded-custom btn-glow shadow-yellow">
                    Order Now
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card-custom p-custom card-hover h-100 shadow-yellow">
                <div className="text-center">
                  <img
                    src="images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp" // replace with actual image path
                    alt="Standard Number Plate"
                    className="mb-4 mx-auto d-block rounded-custom shadow-yellow border-3-custom border-primary-custom"
                    style={{ maxWidth: "260px", height: "auto" }}
                  />
                  <h3 className="h3 font-weight-custom text-dark mb-3">
                    3D Gel Plates
                  </h3>
                  <p className="text-secondary-custom mb-4">
                    Raised characters with premium gel finish for enhanced
                    appeal and modern look
                  </p>
                  <div className="text-primary-custom display-6 font-weight-custom mb-3">
                    £34.99
                  </div>
                  <button className="btn bg-yellow-gradient text-primary-custom font-weight-custom fs-5 w-100 py-3 rounded-custom border-2-custom border-primary-custom btn-glow shadow-yellow">
                    Most Popular
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card-custom p-custom card-hover h-100 shadow-yellow ">
                <div className="text-center">
                  <img
                    src="images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp" // replace with actual image path
                    alt="Standard Number Plate"
                    className="mb-4 mx-auto d-block rounded-custom shadow-yellow border-3-custom border-primary-custom"
                    style={{ maxWidth: "260px", height: "auto" }}
                  />
                  <h3 className="h3 font-weight-custom text-dark mb-3">
                    3D Gel Plates
                  </h3>
                  <p className="text-secondary-custom mb-4">
                    Raised characters with premium gel finish for enhanced
                    appeal and modern look
                  </p>
                  <div className="text-primary-custom display-6 font-weight-custom mb-3">
                    £34.99
                  </div>
                  <button className="btn bg-yellow-gradient text-primary-custom font-weight-custom fs-5 w-100 py-3 rounded-custom border-2-custom border-primary-custom btn-glow shadow-yellow">
                    Most Popular
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card-custom p-custom card-hover h-100 shadow-yellow ">
                <div className="text-center">
                  <img
                    src="images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp" // replace with actual image path
                    alt="Standard Number Plate"
                    className="mb-4 mx-auto d-block rounded-custom shadow-yellow border-3-custom border-primary-custom"
                    style={{ maxWidth: "260px", height: "auto" }}
                  />
                  <h3 className="h3 font-weight-custom text-dark mb-3">
                    3D Gel Plates
                  </h3>
                  <p className="text-secondary-custom mb-4">
                    Raised characters with premium gel finish for enhanced
                    appeal and modern look
                  </p>
                  <div className="text-primary-custom display-6 font-weight-custom mb-3">
                    £34.99
                  </div>
                  <button className="btn bg-yellow-gradient text-primary-custom font-weight-custom fs-5 w-100 py-3 rounded-custom border-2-custom border-primary-custom btn-glow shadow-yellow">
                    Most Popular
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card-custom p-custom card-hover h-100 shadow-yellow">
                <div className="text-center">
                  <img
                    src="images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp" // replace with actual image path
                    alt="Standard Number Plate"
                    className="mb-4 mx-auto d-block rounded-custom shadow-yellow border-3-custom border-primary-custom"
                    style={{ maxWidth: "260px", height: "auto" }}
                  />
                  <h3 className="h3 font-weight-custom text-dark mb-3">
                    3D Gel Plates
                  </h3>
                  <p className="text-secondary-custom mb-4">
                    Raised characters with premium gel finish for enhanced
                    appeal and modern look
                  </p>
                  <div className="text-primary-custom display-6 font-weight-custom mb-3">
                    £34.99
                  </div>
                  <button className="btn bg-yellow-gradient text-primary-custom font-weight-custom fs-5 w-100 py-3 rounded-custom border-2-custom border-primary-custom btn-glow shadow-yellow">
                    Most Popular
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card-custom p-custom card-hover h-100 shadow-yellow">
                <div className="text-center">
                  <img
                    src="images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp" // replace with actual image path
                    alt="Standard Number Plate"
                    className="mb-4 mx-auto d-block rounded-custom shadow-yellow border-3-custom border-primary-custom"
                    style={{ maxWidth: "260px", height: "auto" }}
                  />
                  <h3 className="h3 font-weight-custom text-dark mb-3">
                    Show Plates
                  </h3>
                  <p className="text-secondary-custom mb-4">
                    Custom designs for exhibitions and private use only with
                    personalized styling
                  </p>
                  <div className="text-primary-custom display-6 font-weight-custom mb-3">
                    £19.99
                  </div>
                  <button className="btn btn-gradient-custom font-weight-custom fs-5 w-100 py-3 rounded-custom btn-glow shadow-yellow">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <div className="section-separator"></div>

      {/* Contact Section */}
      <section className="py-5 bg-yellow-light">
        <div className="container py-custom">
          <div className="text-center mb-5">
            <h2 className="display-4 font-weight-extra text-dark mb-4">
              Get in <span className="text-orange-primary">Touch</span>
            </h2>
            <p
              className="fs-4 text-secondary-custom mx-auto"
              style={{ maxWidth: "600px" }}
            >
              Ready to order or have questions? Our expert team is here to help
              you 24/7
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="card-custom p-custom text-center card-hover h-100 shadow-yellow">
                <div className="feature-icon">📞</div>
                <h3 className="h4 font-weight-custom text-dark mb-3">
                  Call Us
                </h3>
                <p className="text-primary-custom fs-5 font-weight-custom">
                  0800 123 4567
                </p>
                <p className="text-secondary-custom">Mon-Fri 9AM-6PM</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card-custom p-custom text-center card-hover h-100 shadow-yellow">
                <div className="feature-icon">✉️</div>
                <h3 className="h4 font-weight-custom text-dark mb-3">
                  Email Us
                </h3>
                <p className="text-primary-custom fs-5 font-weight-custom">
                  info@plateforge.com
                </p>
                <p className="text-secondary-custom">Quick Response</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card-custom p-custom text-center card-hover h-100 shadow-yellow">
                <div className="feature-icon">📍</div>
                <h3 className="h4 font-weight-custom text-dark mb-3">
                  Visit Us
                </h3>
                <p className="text-primary-custom fs-5 font-weight-custom">
                  London, UK
                </p>
                <p className="text-secondary-custom">By Appointment</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-custom">
            <div className="bg-yellow-gradient p-custom rounded-lg-custom shadow-yellow">
              <h3 className="display-6 font-weight-extra text-primary-custom mb-3 text-shadow">
                Ready to Get Started?
              </h3>
              <p className="fs-5 text-primary-custom mb-4 text-shadow">
                Create your perfect number plate today with our easy-to-use
                builder
              </p>
              <button
                onClick={() => navigate("/plate-builder")}
                className="btn bg-white text-primary-custom font-weight-custom fs-4 px-5 py-3 rounded-custom border-3-custom border-white btn-glow shadow-yellow"
              >
                🚀 Start Building Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section py-5 px-3 bg-yellow-light">
        <div className="container">
          <h1 className="display-4 fw-bold mb-4 text-center">
            Premium Number Plates That Match Your Style
          </h1>

          <h2 className="h3 fw-semibold mb-3">
            Choose From a Wide Range of Plate Styles
          </h2>
          <p className="mb-4">
            From sleek standard plates to eye-catching 3D, 4D, and 5D designs,
            we offer custom options to suit every vehicle and personality. All
            our plates are crafted with high-quality materials and cutting-edge
            finishes.
          </p>

          <h3 className="h5 fw-bold mb-2">Why Choose Our Plates?</h3>
          <p className="mb-3">
            - Fully road legal
            <br />
            - High durability & UV-resistant
            <br />
            - Custom sizes & fonts available
            <br />- Fast production & nationwide delivery
          </p>

          <h2 className="h3 fw-semibold mt-5 mb-3">
            Built to Impress. Made to Last.
          </h2>
          <p>
            Whether you're upgrading your vehicle's look or need plates for a
            show car, our number plates bring performance and personality
            together — guaranteed to turn heads.
          </p>
        </div>
      </section>


      <section className="faq-section py-5">
  <div className="container">
    <h2 className="text-center fw-bold mb-5">Frequently Asked Questions</h2>

    <div className="accordion" id="faqAccordion">

      <div className="accordion-item mb-3">
        <h3 className="accordion-header" id="faqHeading1">
          <button
            className="accordion-button collapsed fw-semibold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faqCollapse1"
            aria-expanded="false"
            aria-controls="faqCollapse1"
          >
            Are your number plates road legal?
          </button>
        </h3>
        <div
          id="faqCollapse1"
          className="accordion-collapse collapse"
          aria-labelledby="faqHeading1"
          data-bs-parent="#faqAccordion"
        >
          <div className="accordion-body text-secondary-custom">
            Yes, all of our standard and 3D/4D plates meet legal UK requirements and are road legal.
          </div>
        </div>
      </div>

      <div className="accordion-item mb-3">
        <h3 className="accordion-header" id="faqHeading2">
          <button
            className="accordion-button collapsed fw-semibold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faqCollapse2"
            aria-expanded="false"
            aria-controls="faqCollapse2"
          >
            How long does delivery take?
          </button>
        </h3>
        <div
          id="faqCollapse2"
          className="accordion-collapse collapse"
          aria-labelledby="faqHeading2"
          data-bs-parent="#faqAccordion"
        >
          <div className="accordion-body text-secondary-custom">
            Most orders are produced and shipped within 24–48 hours. Delivery usually takes 2–4 business days.
          </div>
        </div>
      </div>

      <div className="accordion-item mb-3">
        <h3 className="accordion-header" id="faqHeading3">
          <button
            className="accordion-button collapsed fw-semibold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faqCollapse3"
            aria-expanded="false"
            aria-controls="faqCollapse3"
          >
            Do I need to show any documents?
          </button>
        </h3>
        <div
          id="faqCollapse3"
          className="accordion-collapse collapse"
          aria-labelledby="faqHeading3"
          data-bs-parent="#faqAccordion"
        >
          <div className="accordion-body text-secondary-custom">
            Yes, UK law requires that you provide proof of ownership and identity before we can produce road-legal plates.
          </div>
        </div>
      </div>

      <div className="accordion-item mb-3">
        <h3 className="accordion-header" id="faqHeading4">
          <button
            className="accordion-button collapsed fw-semibold"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faqCollapse4"
            aria-expanded="false"
            aria-controls="faqCollapse4"
          >
            Can I create a custom show plate?
          </button>
        </h3>
        <div
          id="faqCollapse4"
          className="accordion-collapse collapse"
          aria-labelledby="faqHeading4"
          data-bs-parent="#faqAccordion"
        >
          <div className="accordion-body text-secondary-custom">
            Absolutely! Show plates can be fully customized with text, size, borders, flags, fonts, and more.
          </div>
        </div>
      </div>

    </div>
  </div>
</section>


    </div>
  );
}
