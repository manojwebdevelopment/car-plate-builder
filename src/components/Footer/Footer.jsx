import React from 'react';
import './footer.css'; // Assuming you have a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer-section">
      {/* Newsletter Section */}

      <div className="footer-main">
        <div className="container">
          <div className="row g-4">
            {/* Company Info */}
            <div className="col-lg-4">
              <div className="footer-animate">
                <h3 className="footer-brand mb-3">
                  <span className="footer-brand-box">
                    PLATEFORGE
                  </span>
                </h3>
                <p className="footer-description">
                  The UK's leading manufacturer of premium number plates since 2010. 
                  We combine quality craftsmanship with cutting-edge technology to deliver 
                  exceptional plates for every vehicle.
                </p>
                <div className="social-icons">
                  <a href="#" className="social-icon" aria-label="Facebook">📘</a>
                  <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
                  <a href="#" className="social-icon" aria-label="Instagram">📷</a>
                  <a href="#" className="social-icon" aria-label="LinkedIn">💼</a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <h5 className="footer-section-title">Quick Links</h5>
              <ul className="footer-links">
                <li>
                  <a href="/" className="footer-link">Home</a>
                </li>
                <li>
                  <a href="/plate-builder" className="footer-link">Plate Builder</a>
                </li>
                <li>
                  <a href="/about" className="footer-link">About Us</a>
                </li>
                <li>
                  <a href="/contact" className="footer-link">Contact</a>
                </li>
                <li>
                  <a href="/cart" className="footer-link">My Basket</a>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div className="col-lg-2 col-md-6">
              <h5 className="footer-section-title">Products</h5>
              <ul className="footer-links">
                <li>
                  <a href="#" className="footer-link">Standard Plates</a>
                </li>
                <li>
                  <a href="#" className="footer-link">3D Gel Plates</a>
                </li>
                <li>
                  <a href="#" className="footer-link">4D Plates</a>
                </li>
                <li>
                  <a href="#" className="footer-link">Show Plates</a>
                </li>
                <li>
                  <a href="#" className="footer-link">Accessories</a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="col-lg-2 col-md-6">
              <h5 className="footer-section-title">Legal</h5>
              <ul className="footer-links">
                <li>
                  <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms-conditions" className="footer-link">Terms & Conditions</a>
                </li>
                <li>
                  <a href="/refund-policy" className="footer-link">Refund Policy</a>
                </li>
                <li>
                  <a href="/cancellation-policy" className="footer-link">Cancellation Policy</a>
                </li>
                <li>
                  <a href="/cookies-policy" className="footer-link">Cookies Policy</a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-lg-2 col-md-6">
              <h5 className="footer-section-title">Contact</h5>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-label">📞 Phone:</span>
                  <a href="tel:08001234567" className="contact-value">
                    0800 123 4567
                  </a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">✉️ Email:</span>
                  <a href="mailto:info@plateforge.com" className="contact-value">
                    info@plateforge.com
                  </a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">📍 Address:</span>
                  <div className="contact-value">
                    PlateForge Ltd<br/>
                    123 Industrial Estate<br/>
                    London, UK SW1A 1AA
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-label">🕒 Hours:</span>
                  <div className="contact-value">
                    Mon-Fri: 9AM-6PM<br/>
                    Sat: 9AM-5PM<br/>
                    Sun: Closed
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges & Certifications */}
          <div className="trust-badges">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="d-flex flex-wrap gap-2 align-items-center justify-content-center justify-content-lg-start">
                  <div className="trust-badge">
                    🛡️ DVLA Approved
                  </div>
                  <div className="trust-badge">
                    ✅ ISO 9001 Certified
                  </div>
                  <div className="trust-badge">
                    🔒 SSL Secured
                  </div>
                  <div className="trust-badge">
                    ⭐ 5-Star Rated
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="payment-methods text-center text-lg-end">
                  <strong>Payment Methods:</strong><br/>
                  💳 Visa • 💳 Mastercard • 💰 PayPal • 🌍 WorldPay
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <p className="copyright-text">
                © 2024 PlateForge Ltd. All rights reserved.
              </p>
            </div>
            <div className="col-lg-6 text-lg-end">
              <p className="developer-credits">
                Designed with ❤️ in India | Developed by{' '}
                <span className="developer-name">Manoj</span> &{' '}
                <span className="developer-name">Abhishek</span> | Company Reg: 12345678
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;