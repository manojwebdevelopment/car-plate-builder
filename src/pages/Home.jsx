import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const [regNumber, setRegNumber] = useState('');

    const handleSearch = () => {
        const trimmed = regNumber.trim().toUpperCase();
        const isValid = /^[A-Z0-9]{1,7}$/.test(trimmed); // 1 to 7 letters/numbers only

        if (!isValid) {
            alert('Invalid number plate! Use only letters and numbers (max 7 characters).');
            return;
        }

        navigate(`/plate-builder?reg=${trimmed}`);
    };

    return (
        <>
            <style jsx>{`
                .bg-yellow-primary { background-color: #ffc107; }
                .bg-yellow-secondary { background-color: #fff3cd; }
                .bg-yellow-light { background-color: #fffbf0; }
                .bg-yellow-gradient { background: linear-gradient(135deg, #ffc107, #ffca2c); }
                .bg-yellow-gradient-light { background: linear-gradient(135deg, #fff3cd, #ffeaa7); }
                .bg-orange-gradient { background: linear-gradient(135deg, #ff8c42, #ff6b35); }
                .text-yellow-primary { color: #ffc107; }
                .text-orange-primary { color: #ff6b35; }
                .border-yellow-primary { border-color: #ffc107; }
                .card-hover:hover { 
                    transform: translateY(-10px); 
                    transition: all 0.3s ease;
                    box-shadow: 0 20px 40px rgba(255, 193, 7, 0.3);
                }
                .shadow-yellow { box-shadow: 0 10px 30px rgba(255, 193, 7, 0.2); }
                .hero-bg {
                    background: linear-gradient(135deg, #ffc107 0%, #ffca2c 50%, #fff3cd 100%);
                    position: relative;
                    overflow: hidden;
                }
                .hero-bg::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
                                radial-gradient(circle at 80% 80%, rgba(255, 107, 53, 0.1) 0%, transparent 50%);
                }
                .text-shadow { text-shadow: 2px 2px 4px rgba(0,0,0,0.1); }
                .btn-glow:hover {
                    box-shadow: 0 0 20px rgba(255, 193, 7, 0.5);
                    transform: scale(1.05);
                    transition: all 0.3s ease;
                }
                .pulse-animation {
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
                .section-separator {
                    height: 4px;
                    background: linear-gradient(90deg, #ffc107, #ff8c42, #ffc107);
                }
            `}</style>

            <div className="min-vh-100" style={{backgroundColor: '#fffbf0'}}>
                {/* Hero Section */}
                <section className="hero-bg min-vh-100 d-flex align-items-center justify-content-center position-relative">
                    <div className="container text-center" style={{position: 'relative', zIndex: 10}}>
                        {/* Company Name */}
                        <div className="mb-5">
                            <h1 className="display-2 fw-bold text-dark mb-4 text-shadow">
                                PlateForge
                            </h1>
                            <p className="fs-3 text-orange-primary mb-5 fw-bold text-shadow">
                                Online Excellence Since 2010
                            </p>
                        </div>

                        {/* Main Heading */}
                        <div className="mb-5" >
                            <h2 className="display-4 fw-bold text-dark mb-4 lh-sm text-shadow">
                                No. 1 Manufacturers of
                                <span className="d-block text-orange-primary mt-2">
                                    High Quality
                                </span>
                                <span className="d-block mt-2 text-dark">
                                    Motorbike & Car Plates Online
                                </span>
                            </h2>
                        </div>

                        {/* All Inclusive Price Banner */}
                        <div className="bg-orange-gradient text-white p-5 rounded-4 mb-5 shadow-yellow card-hover border-3 border-warning">
                            <h3 className="display-5 fw-bold mb-3 text-shadow">
                                ALL INCLUSIVE PRICE
                            </h3>
                            <p className="fs-4 fw-bold mb-0 text-shadow">
                                No extra charge for Badge, Border or Slogan
                            </p>
                        </div>

                        {/* Registration Input */}
                        <div className="bg-white p-5 rounded-4 shadow-yellow mx-auto mb-5 border-3 border-warning" style={{maxWidth: '800px'}}>
                            <h4 className="display-6 fw-bold text-dark mb-4">
                                Enter Your Registration Number
                            </h4>
                            <div className="row g-3">
                                <div className="col-lg-8">
                                    <input
                                        type="text"
                                        value={regNumber}
                                        onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
                                        placeholder="TYPE IN YOUR REGISTRATION"
                                        className="form-control form-control-lg text-center fw-bold fs-4 border-3 border-warning rounded-3 shadow-sm"
                                        style={{backgroundColor: '#fff3cd'}}
                                    />
                                </div>
                                <div className="col-lg-4">
                                    <button
                                        onClick={handleSearch}
                                        className="btn bg-yellow-gradient text-dark fw-bold fs-6 w-100 py-3 rounded-3 border-2 border-warning btn-glow shadow-yellow"
                                    >
                                        🔍 Create Your Plate
                                    </button>
                                </div>
                            </div>
                            <p className="text-muted mt-3 fs-6 mb-0">
                                Enter your registration number to see available plate designs and get instant pricing
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="row g-4 mb-5">
                            <div className="col-6 col-lg-3">
                                <div className="bg-white p-4 rounded-3 border-3 border-warning card-hover shadow-yellow">
                                    <div className="display-5 fw-bold text-orange-primary mb-2">50K+</div>
                                    <div className="text-dark fw-bold">Happy Customers</div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3">
                                <div className="bg-white p-4 rounded-3 border-3 border-warning card-hover shadow-yellow">
                                    <div className="display-5 fw-bold text-orange-primary mb-2">15+</div>
                                    <div className="text-dark fw-bold">Years Experience</div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3">
                                <div className="bg-white p-4 rounded-3 border-3 border-warning card-hover shadow-yellow">
                                    <div className="display-5 fw-bold text-orange-primary mb-2">24/7</div>
                                    <div className="text-dark fw-bold">Support</div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-3">
                                <div className="bg-white p-4 rounded-3 border-3 border-warning card-hover shadow-yellow">
                                    <div className="display-5 fw-bold text-orange-primary mb-2">99%</div>
                                    <div className="text-dark fw-bold">Satisfaction</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section Separator */}
                <div className="section-separator"></div>

                {/* Features Section */}
                <section className="py-5 bg-yellow-light">
                    <div className="container py-5">
                        <div className="text-center mb-5">
                            <h2 className="display-4 fw-bold text-dark mb-4">
                                Why Choose <span className="text-orange-primary">PlateForge</span>?
                            </h2>
                            <p className="fs-4 text-secondary mx-auto" style={{maxWidth: '600px'}}>
                                Premium quality plates with unmatched service and competitive pricing
                            </p>
                        </div>

                        <div className="row g-4">
                            <div className="col-md-6 col-lg-3">
                                <div className="bg-white p-5 rounded-4 text-center border-3 border-warning card-hover h-100 shadow-yellow">
                                    <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-yellow" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                                        🏆
                                    </div>
                                    <h3 className="h4 fw-bold text-dark mb-3">Premium Quality</h3>
                                    <p className="text-secondary">
                                        Made with high-grade materials that last for years with perfect finish and durability
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <div className="bg-white p-5 rounded-4 text-center border-3 border-warning card-hover h-100 shadow-yellow">
                                    <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-yellow" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                                        🚚
                                    </div>
                                    <h3 className="h4 fw-bold text-dark mb-3">Fast Delivery</h3>
                                    <p className="text-secondary">
                                        Quick turnaround time with secure packaging and reliable shipping nationwide
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <div className="bg-white p-5 rounded-4 text-center border-3 border-warning card-hover h-100 shadow-yellow">
                                    <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-yellow" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                                        🛡️
                                    </div>
                                    <h3 className="h4 fw-bold text-dark mb-3">Legal Compliance</h3>
                                    <p className="text-secondary">
                                        All plates meet DVLA standards and legal requirements for road use
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <div className="bg-white p-5 rounded-4 text-center border-3 border-warning card-hover h-100 shadow-yellow">
                                    <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-yellow" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                                        ⭐
                                    </div>
                                    <h3 className="h4 fw-bold text-dark mb-3">5-Star Service</h3>
                                    <p className="text-secondary">
                                        Exceptional customer service with 24/7 support and expert assistance
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
                    <div className="container py-5">
                        <div className="text-center mb-5">
                            <h2 className="display-4 fw-bold text-dark mb-4">
                                Our <span className="text-orange-primary">Product Range</span>
                            </h2>
                            <p className="fs-4 text-secondary mx-auto" style={{maxWidth: '600px'}}>
                                Choose from our wide selection of premium number plates with competitive pricing
                            </p>
                        </div>

                        <div className="row g-4 justify-content-center">
                            <div className="col-lg-4">
                                <div className="bg-white p-5 rounded-4 border-3 border-warning card-hover h-100 shadow-yellow">
                                    <div className="text-center">
                                        <div className="bg-light text-dark px-4 py-3 rounded-3 fs-2 fw-bold mb-4 mx-auto d-inline-block shadow-yellow border-3 border-secondary">
                                            AB12 CDE
                                        </div>
                                        <h3 className="h3 fw-bold text-dark mb-3">Standard Plates</h3>
                                        <p className="text-secondary mb-4">
                                            Classic design with reflective backing for maximum visibility and legal compliance
                                        </p>
                                        <div className="text-orange-primary display-6 fw-bold mb-3">£24.99</div>
                                        <button className="btn bg-yellow-gradient text-dark fw-bold fs-5 w-100 py-3 rounded-3 border-2 border-warning btn-glow shadow-yellow">
                                            Order Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="bg-white p-5 rounded-4 border-3 border-warning card-hover h-100 shadow-yellow pulse-animation">
                                    <div className="text-center">
                                        <div className="bg-yellow-gradient text-dark px-4 py-3 rounded-3 fs-2 fw-bold mb-4 mx-auto d-inline-block shadow-yellow border-3 border-warning">
                                            AB12 CDE
                                        </div>
                                        <h3 className="h3 fw-bold text-dark mb-3">3D Gel Plates</h3>
                                        <p className="text-secondary mb-4">
                                            Raised characters with premium gel finish for enhanced appeal and modern look
                                        </p>
                                        <div className="text-orange-primary display-6 fw-bold mb-3">£34.99</div>
                                        <button className="btn bg-orange-gradient text-white fw-bold fs-5 w-100 py-3 rounded-3 border-2 border-warning btn-glow shadow-yellow">
                                            Most Popular
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="bg-white p-5 rounded-4 border-3 border-warning card-hover h-100 shadow-yellow">
                                    <div className="text-center">
                                        <div className="bg-secondary text-warning border-3 border-warning px-4 py-3 rounded-3 fs-2 fw-bold mb-4 mx-auto d-inline-block shadow-yellow">
                                            AB12 CDE
                                        </div>
                                        <h3 className="h3 fw-bold text-dark mb-3">Show Plates</h3>
                                        <p className="text-secondary mb-4">
                                            Custom designs for exhibitions and private use only with personalized styling
                                        </p>
                                        <div className="text-orange-primary display-6 fw-bold mb-3">£19.99</div>
                                        <button className="btn bg-yellow-gradient text-dark fw-bold fs-5 w-100 py-3 rounded-3 border-2 border-warning btn-glow shadow-yellow">
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
                    <div className="container py-5">
                        <div className="text-center mb-5">
                            <h2 className="display-4 fw-bold text-dark mb-4">
                                Get in <span className="text-orange-primary">Touch</span>
                            </h2>
                            <p className="fs-4 text-secondary mx-auto" style={{maxWidth: '600px'}}>
                                Ready to order or have questions? Our expert team is here to help you 24/7
                            </p>
                        </div>

                        <div className="row g-4 justify-content-center">
                            <div className="col-md-4">
                                <div className="bg-white p-5 rounded-4 text-center border-3 border-warning card-hover h-100 shadow-yellow">
                                    <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-yellow" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                                        📞
                                    </div>
                                    <h3 className="h4 fw-bold text-dark mb-3">Call Us</h3>
                                    <p className="text-orange-primary fs-5 fw-bold">0800 123 4567</p>
                                    <p className="text-secondary">Mon-Fri 9AM-6PM</p>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="bg-white p-5 rounded-4 text-center border-3 border-warning card-hover h-100 shadow-yellow">
                                    <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-yellow" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                                        ✉️
                                    </div>
                                    <h3 className="h4 fw-bold text-dark mb-3">Email Us</h3>
                                    <p className="text-orange-primary fs-5 fw-bold">info@plateforge.com</p>
                                    <p className="text-secondary">Quick Response</p>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="bg-white p-5 rounded-4 text-center border-3 border-warning card-hover h-100 shadow-yellow">
                                    <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-yellow" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                                        📍
                                    </div>
                                    <h3 className="h4 fw-bold text-dark mb-3">Visit Us</h3>
                                    <p className="text-orange-primary fs-5 fw-bold">London, UK</p>
                                    <p className="text-secondary">By Appointment</p>
                                </div>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="text-center mt-5">
                            <div className="bg-orange-gradient p-5 rounded-4 shadow-yellow">
                                <h3 className="display-6 fw-bold text-white mb-3 text-shadow">
                                    Ready to Get Started?
                                </h3>
                                <p className="fs-5 text-white mb-4 text-shadow">
                                    Create your perfect number plate today with our easy-to-use builder
                                </p>
                                <button 
                                    onClick={() => navigate('/plate-builder')}
                                    className="btn bg-white text-dark fw-bold fs-4 px-5 py-3 rounded-3 border-3 border-white btn-glow shadow-yellow"
                                >
                                    🚀 Start Building Now
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}