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

  navigate(`/platebuilder?reg=${trimmed}`);
};


  return (
    <>
      <style jsx>{`
        .bg-yellow-custom { background-color: #fbbf24; }
        .bg-yellow-hover:hover { background-color: #f59e0b; }
        .bg-blue-gradient { background: linear-gradient(135deg, #2563eb, #1d4ed8); }
        .bg-yellow-gradient { background: linear-gradient(135deg, #fbbf24, #f59e0b); }
        .bg-dark-gradient { background: linear-gradient(135deg, #111827, #000000); }
        .bg-gray-gradient { background: linear-gradient(135deg, #374151, #111827); }
        .text-yellow-custom { color: #fbbf24; }
        .border-yellow-custom { border-color: #fbbf24; }
        .dropdown-arrow { transition: transform 0.3s ease; }
        .dropdown-arrow.rotate { transform: rotate(180deg); }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-bounce { animation: bounce 1s infinite; }
        .card-hover:hover { transform: scale(1.05); transition: transform 0.3s ease; }
        .shadow-glow { box-shadow: 0 0 20px rgba(251, 191, 36, 0.3); }
        .hero-bg {
          background: linear-gradient(135deg, #111827 0%, #000000 50%, #374151 100%);
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
          background: radial-gradient(circle at 20% 20%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 40% 60%, rgba(251, 191, 36, 0.05) 0%, transparent 50%);
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
          50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
        }
      `}</style>

      <div className="min-vh-100" style={{backgroundColor: '#111827'}}>
        



        {/* Hero Section */}
        <section className="hero-bg min-vh-100 d-flex align-items-center justify-content-center position-relative">
          <div className="container text-center" style={{position: 'relative', zIndex: 10}}>
            {/* Company Name */}
            <div className="mb-5">
              <h1 className="display-2 fw-bold text-white mb-4">
                PlateForge
              </h1>
              <p className="fs-3 text-yellow-custom mb-5 fw-bold">
                Online Excellence Since 2010
              </p>
            </div>

            {/* Main Heading */}
            <div className="mb-5">
              <h2 className="display-4 fw-bold text-white mb-4 lh-sm">
                No. 1 Manufacturers of
                <span className="d-block text-yellow-custom mt-2">
                  High Quality
                </span>
                <span className="d-block mt-2 bg-yellow-gradient bg-clip-text text-transparent">
                  Motorbike & Car Plates Online
                </span>
              </h2>
            </div>

            {/* All Inclusive Price Banner */}
            <div className="bg-yellow-gradient text-dark p-5 rounded-4 mb-5 shadow-lg card-hover border-3 border-warning">
              <h3 className="display-5 fw-bold mb-3">
                ALL INCLUSIVE PRICE
              </h3>
              <p className="fs-4 fw-bold mb-0">
                No extra charge for Badge, Border or Slogan
              </p>
            </div>

            {/* Registration Input */}
            <div className="bg-light p-5 rounded-4 shadow-lg mx-auto mb-5 border-3 border-warning" style={{maxWidth: '800px', backgroundColor: 'rgba(255,255,255,0.95) !important'}}>
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
                    style={{backgroundColor: '#f8f9fa'}}
                  />
                </div>
                <div className="col-lg-4">
                  <button
                    onClick={handleSearch}
                    className="btn bg-yellow-gradient text-dark fw-bold fs-6 w-100 py-3 rounded-3 border-2 border-warning card-hover shadow"
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
                <div className="bg-warning bg-opacity-25 p-4 rounded-3 border border-warning card-hover">
                  <div className="display-5 fw-bold text-yellow-custom mb-2">50K+</div>
                  <div className="text-white fw-bold">Happy Customers</div>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="bg-warning bg-opacity-25 p-4 rounded-3 border border-warning card-hover">
                  <div className="display-5 fw-bold text-yellow-custom mb-2">15+</div>
                  <div className="text-white fw-bold">Years Experience</div>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="bg-warning bg-opacity-25 p-4 rounded-3 border border-warning card-hover">
                  <div className="display-5 fw-bold text-yellow-custom mb-2">24/7</div>
                  <div className="text-white fw-bold">Support</div>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="bg-warning bg-opacity-25 p-4 rounded-3 border border-warning card-hover">
                  <div className="display-5 fw-bold text-yellow-custom mb-2">99%</div>
                  <div className="text-white fw-bold">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-5 bg-gray-gradient">
          <div className="container py-5">
            <div className="text-center mb-5">
              <h2 className="display-4 fw-bold text-white mb-4">
                Why Choose <span className="text-yellow-custom">PlateForge</span>?
              </h2>
              <p className="fs-4 text-light mx-auto" style={{maxWidth: '600px'}}>
                Premium quality plates with unmatched service and competitive pricing
              </p>
            </div>

            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="bg-warning bg-opacity-10 p-5 rounded-4 text-center border border-warning card-hover h-100">
                  <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-lg" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                    🏆
                  </div>
                  <h3 className="h4 fw-bold text-white mb-3">Premium Quality</h3>
                  <p className="text-light">
                    Made with high-grade materials that last for years with perfect finish and durability
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="bg-warning bg-opacity-10 p-5 rounded-4 text-center border border-warning card-hover h-100">
                  <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-lg" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                    🚚
                  </div>
                  <h3 className="h4 fw-bold text-white mb-3">Fast Delivery</h3>
                  <p className="text-light">
                    Quick turnaround time with secure packaging and reliable shipping nationwide
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="bg-warning bg-opacity-10 p-5 rounded-4 text-center border border-warning card-hover h-100">
                  <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-lg" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                    🛡️
                  </div>
                  <h3 className="h4 fw-bold text-white mb-3">Legal Compliance</h3>
                  <p className="text-light">
                    All plates meet DVLA standards and legal requirements for road use
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="bg-warning bg-opacity-10 p-5 rounded-4 text-center border border-warning card-hover h-100">
                  <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-lg" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                    ⭐
                  </div>
                  <h3 className="h4 fw-bold text-white mb-3">5-Star Service</h3>
                  <p className="text-light">
                    Exceptional customer service with 24/7 support and expert assistance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-5 bg-dark">
          <div className="container py-5">
            <div className="text-center mb-5">
              <h2 className="display-4 fw-bold text-white mb-4">
                Our <span className="text-yellow-custom">Product Range</span>
              </h2>
              <p className="fs-4 text-light mx-auto" style={{maxWidth: '600px'}}>
                Choose from our wide selection of premium number plates with competitive pricing
              </p>
            </div>

            <div className="row g-4 justify-content-center">
              <div className="col-lg-4">
                <div className="bg-warning bg-opacity-20 p-5 rounded-4 border-2 border-warning card-hover h-100">
                  <div className="text-center">
                    <div className="bg-white text-dark px-4 py-3 rounded-3 fs-2 fw-bold mb-4 mx-auto d-inline-block shadow-lg border-3 border-secondary">
                      AB12 CDE
                    </div>
                    <h3 className="h3 fw-bold text-white mb-3">Standard Plates</h3>
                    <p className="text-light mb-4">
                      Classic design with reflective backing for maximum visibility and legal compliance
                    </p>
                    <div className="text-yellow-custom display-6 fw-bold mb-3">£24.99</div>
                    <button className="btn bg-yellow-gradient text-dark fw-bold fs-5 w-100 py-3 rounded-3 border-2 border-warning card-hover shadow">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="bg-warning bg-opacity-20 p-5 rounded-4 border-2 border-warning card-hover h-100">
                  <div className="text-center">
                    <div className="bg-yellow-gradient text-dark px-4 py-3 rounded-3 fs-2 fw-bold mb-4 mx-auto d-inline-block shadow-lg border-3 border-warning">
                      AB12 CDE
                    </div>
                    <h3 className="h3 fw-bold text-white mb-3">3D Gel Plates</h3>
                    <p className="text-light mb-4">
                      Raised characters with premium gel finish for enhanced appeal and modern look
                    </p>
                    <div className="text-yellow-custom display-6 fw-bold mb-3">£34.99</div>
                    <button className="btn bg-yellow-gradient text-dark fw-bold fs-5 w-100 py-3 rounded-3 border-2 border-warning card-hover shadow">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="bg-warning bg-opacity-20 p-5 rounded-4 border-2 border-warning card-hover h-100">
                  <div className="text-center">
                    <div className="bg-dark text-yellow-custom border-3 border-warning px-4 py-3 rounded-3 fs-2 fw-bold mb-4 mx-auto d-inline-block shadow-lg">
                      AB12 CDE
                    </div>
                    <h3 className="h3 fw-bold text-white mb-3">Show Plates</h3>
                    <p className="text-light mb-4">
                      Custom designs for exhibitions and private use only with personalized styling
                    </p>
                    <div className="text-yellow-custom display-6 fw-bold mb-3">£19.99</div>
                    <button className="btn bg-yellow-gradient text-dark fw-bold fs-5 w-100 py-3 rounded-3 border-2 border-warning card-hover shadow">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-5 bg-dark-gradient">
          <div className="container py-5">
            <div className="text-center mb-5">
              <h2 className="display-4 fw-bold text-white mb-4">
                Get in <span className="text-yellow-custom">Touch</span>
              </h2>
              <p className="fs-4 text-light mx-auto" style={{maxWidth: '600px'}}>
                Ready to order or have questions? Our expert team is here to help you 24/7
              </p>
            </div>

            <div className="row g-4 justify-content-center">
              <div className="col-md-4">
                <div className="bg-warning bg-opacity-10 p-5 rounded-4 text-center border border-warning card-hover h-100">
                  <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-lg" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                    📞
                  </div>
                  <h3 className="h4 fw-bold text-white mb-3">Call Us</h3>
                  <p className="text-yellow-custom fs-5 fw-bold">0800 123 4567</p>
                  <p className="text-light">Mon-Fri 9AM-6PM</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="bg-warning bg-opacity-10 p-5 rounded-4 text-center border border-warning card-hover h-100">
                  <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-lg" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                    ✉️
                  </div>
                  <h3 className="h4 fw-bold text-white mb-3">Email Us</h3>
                  <p className="text-yellow-custom fs-5 fw-bold">info@plateforge.com</p>
                  <p className="text-light">Quick Response</p>
                </div>
              </div>

              <div className="col-md-4">
                <div className="bg-warning bg-opacity-10 p-5 rounded-4 text-center border border-warning card-hover h-100">
                  <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-lg" style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                    📍
                  </div>
                  <h3 className="h4 fw-bold text-white mb-3">Visit Us</h3>
                  <p className="text-yellow-custom fs-5 fw-bold">London, UK</p>
                  <p className="text-light">By Appointment</p>
                </div>
              </div>
            </div>
          </div>
        </section>

       
      </div>
    </>
  );
}