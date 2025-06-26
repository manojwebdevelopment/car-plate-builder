import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <style jsx>{`
        .bg-yellow-gradient { background: linear-gradient(135deg, #ffc107, #ffca2c); }
        .text-yellow-primary { color: #ffc107; }
        .border-yellow { border-color: #ffc107; }
        .hover-yellow:hover { color: #ffc107; transition: all 0.3s ease; }
        .social-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffc107;
          color: #000;
          border-radius: 50%;
          text-decoration: none;
          transition: all 0.3s ease;
          font-weight: bold;
        }
        .social-icon:hover {
          background: #ff6b35;
          color: white;
          transform: scale(1.1);
        }
      `}</style>

      <footer className="bg-dark text-light pt-5">
        {/* Newsletter Section */}
        <div className="bg-yellow-gradient text-dark py-4">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h4 className="fw-bold mb-2">📧 Stay Updated with PlateForge</h4>
                <p className="mb-0">Get exclusive offers, new product updates, and plate design tips!</p>
              </div>
              <div className="col-lg-4">
                <div className="input-group">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter your email"
                  />
                  <button className="btn btn-dark fw-bold" type="button">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-5">
          <div className="row g-4">
            {/* Company Info */}
            <div className="col-lg-4">
              <div className="mb-4">
                <h3 className="text-yellow-primary fw-bold mb-3">
                  <span style={{ 
                    border: '3px solid #ffc107', 
                    padding: '8px 12px', 
                    borderRadius: '8px'
                  }}>
                    PLATEFORGE
                  </span>
                </h3>
                <p className="text-light mb-4">
                  The UK's leading manufacturer of premium number plates since 2010. 
                  We combine quality craftsmanship with cutting-edge technology to deliver 
                  exceptional plates for every vehicle.
                </p>
                <div className="d-flex gap-3">
                  <a href="#" className="social-icon">📘</a>
                  <a href="#" className="social-icon">🐦</a>
                  <a href="#" className="social-icon">📷</a>
                  <a href="#" className="social-icon">💼</a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <h5 className="text-yellow-primary fw-bold mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/" className="text-light text-decoration-none hover-yellow">Home</Link>
                </li>
                <li className="mb-2">
                  <Link to="/plate-builder" className="text-light text-decoration-none hover-yellow">Plate Builder</Link>
                </li>
                <li className="mb-2">
                  <Link to="/about" className="text-light text-decoration-none hover-yellow">About Us</Link>
                </li>
                <li className="mb-2">
                  <Link to="/contact" className="text-light text-decoration-none hover-yellow">Contact</Link>
                </li>
                <li className="mb-2">
                  <Link to="/cart" className="text-light text-decoration-none hover-yellow">My Basket</Link>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div className="col-lg-2 col-md-6">
              <h5 className="text-yellow-primary fw-bold mb-3">Products</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none hover-yellow">Standard Plates</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none hover-yellow">3D Gel Plates</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none hover-yellow">4D Plates</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none hover-yellow">Show Plates</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-light text-decoration-none hover-yellow">Accessories</a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="col-lg-2 col-md-6">
              <h5 className="text-yellow-primary fw-bold mb-3">Legal</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/privacy-policy" className="text-light text-decoration-none hover-yellow">Privacy Policy</Link>
                </li>
                <li className="mb-2">
                  <Link to="/terms-conditions" className="text-light text-decoration-none hover-yellow">Terms & Conditions</Link>
                </li>
                <li className="mb-2">
                  <Link to="/refund-policy" className="text-light text-decoration-none hover-yellow">Refund Policy</Link>
                </li>
                <li className="mb-2">
                  <Link to="/cancellation-policy" className="text-light text-decoration-none hover-yellow">Cancellation Policy</Link>
                </li>
                <li className="mb-2">
                  <Link to="/cookies-policy" className="text-light text-decoration-none hover-yellow">Cookies Policy</Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-lg-2 col-md-6">
              <h5 className="text-yellow-primary fw-bold mb-3">Contact</h5>
              <div className="text-light">
                <div className="mb-3">
                  <strong>📞 Phone:</strong><br/>
                  <a href="tel:08001234567" className="text-light text-decoration-none hover-yellow">
                    0800 123 4567
                  </a>
                </div>
                <div className="mb-3">
                  <strong>✉️ Email:</strong><br/>
                  <a href="mailto:info@plateforge.com" className="text-light text-decoration-none hover-yellow">
                    info@plateforge.com
                  </a>
                </div>
                <div className="mb-3">
                  <strong>📍 Address:</strong><br/>
                  <span className="small">
                    PlateForge Ltd<br/>
                    123 Industrial Estate<br/>
                    London, UK SW1A 1AA
                  </span>
                </div>
                <div>
                  <strong>🕒 Hours:</strong><br/>
                  <span className="small">
                    Mon-Fri: 9AM-6PM<br/>
                    Sat: 9AM-5PM<br/>
                    Sun: Closed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications & Trust Badges */}
          <div className="row mt-5 pt-4 border-top border-secondary">
            <div className="col-12">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="d-flex flex-wrap gap-3 align-items-center">
                    <div className="bg-yellow-gradient text-dark px-3 py-2 rounded fw-bold small">
                      🛡️ DVLA Approved
                    </div>
                    <div className="bg-yellow-gradient text-dark px-3 py-2 rounded fw-bold small">
                      ✅ ISO 9001 Certified
                    </div>
                    <div className="bg-yellow-gradient text-dark px-3 py-2 rounded fw-bold small">
                      🔒 SSL Secured
                    </div>
                    <div className="bg-yellow-gradient text-dark px-3 py-2 rounded fw-bold small">
                      ⭐ 5-Star Rated
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 text-lg-end mt-3 mt-lg-0">
                  <div className="text-light small">
                    <strong>Payment Methods:</strong> 
                    💳 Visa • 💳 Mastercard • 💳 PayPal • 💳 Apple Pay
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-yellow-gradient text-dark py-3">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <p className="mb-0 fw-bold">
                  © 2024 PlateForge Ltd. All rights reserved.
                </p>
              </div>
              <div className="col-lg-6 text-lg-end mt-2 mt-lg-0">
                <p className="mb-0 small">
                  Designed with ❤️ in the India | Company Reg: 12345678
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;