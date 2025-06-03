import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    enquiryType: 'general'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      enquiryType: 'general'
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <style jsx>{`
        .bg-yellow-gradient { background: linear-gradient(135deg, #ffc107, #ffca2c); }
        .bg-yellow-light { background-color: #fff3cd; }
        .text-orange-primary { color: #ff6b35; }
        .card-hover:hover {
          transform: translateY(-5px);
          transition: all 0.3s ease;
          box-shadow: 0 15px 30px rgba(255, 193, 7, 0.3);
        }
        .shadow-yellow { box-shadow: 0 10px 30px rgba(255, 193, 7, 0.2); }
        .contact-icon {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffc107;
          color: #000;
          border-radius: 50%;
          font-size: 1.5rem;
          font-weight: bold;
        }
      `}</style>

      <div className="min-vh-100" style={{backgroundColor: '#fffbf0'}}>
        {/* Hero Section */}
        <section className="bg-yellow-gradient py-5">
          <div className="container py-5">
            <div className="text-center">
              <h1 className="display-3 fw-bold text-dark mb-4">
                Get in Touch
              </h1>
              <p className="fs-4 text-dark mb-4">
                We're here to help with all your number plate needs. 
                Reach out to our expert team for personalized assistance.
              </p>
              <div className="bg-white d-inline-block px-4 py-2 rounded-3 shadow-yellow">
                <span className="text-orange-primary fw-bold">⚡ Average Response Time: 2 Hours</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-5 bg-white">
          <div className="container py-5">
            <div className="row g-4 mb-5">
              <div className="col-md-6 col-lg-3">
                <div className="bg-yellow-light p-4 rounded-4 text-center card-hover h-100 shadow-yellow">
                  <div className="contact-icon mx-auto mb-3">📞</div>
                  <h4 className="fw-bold text-dark mb-3">Call Us</h4>
                  <p className="text-orange-primary fs-5 fw-bold mb-2">0800 123 4567</p>
                  <p className="text-secondary small mb-3">Mon-Fri: 9AM-6PM<br/>Sat: 9AM-5PM</p>
                  <a href="tel:08001234567" className="btn btn-warning text-dark fw-bold">Call Now</a>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="bg-yellow-light p-4 rounded-4 text-center card-hover h-100 shadow-yellow">
                  <div className="contact-icon mx-auto mb-3">✉️</div>
                  <h4 className="fw-bold text-dark mb-3">Email Us</h4>
                  <p className="text-orange-primary fs-5 fw-bold mb-2">info@plateforge.com</p>
                  <p className="text-secondary small mb-3">Quick response<br/>within 2 hours</p>
                  <a href="mailto:info@plateforge.com" className="btn btn-warning text-dark fw-bold">Send Email</a>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="bg-yellow-light p-4 rounded-4 text-center card-hover h-100 shadow-yellow">
                  <div className="contact-icon mx-auto mb-3">💬</div>
                  <h4 className="fw-bold text-dark mb-3">Live Chat</h4>
                  <p className="text-orange-primary fs-5 fw-bold mb-2">Available Now</p>
                  <p className="text-secondary small mb-3">Instant help<br/>Mon-Fri: 9AM-6PM</p>
                  <button className="btn btn-warning text-dark fw-bold">Start Chat</button>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="bg-yellow-light p-4 rounded-4 text-center card-hover h-100 shadow-yellow">
                  <div className="contact-icon mx-auto mb-3">📱</div>
                  <h4 className="fw-bold text-dark mb-3">WhatsApp</h4>
                  <p className="text-orange-primary fs-5 fw-bold mb-2">07700 123456</p>
                  <p className="text-secondary small mb-3">Message us<br/>anytime</p>
                  <a href="https://wa.me/447700123456" className="btn btn-warning text-dark fw-bold">WhatsApp</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-5 bg-yellow-light">
          <div className="container py-5">
            <div className="row g-5">
              {/* Contact Form */}
              <div className="col-lg-8">
                <div className="bg-white p-5 rounded-4 shadow-yellow">
                  <h2 className="fw-bold text-dark mb-4">
                    Send us a <span className="text-orange-primary">Message</span>
                  </h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label className="form-label fw-bold text-dark">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control form-control-lg border-warning"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold text-dark">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control form-control-lg border-warning"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label className="form-label fw-bold text-dark">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control form-control-lg border-warning"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold text-dark">Enquiry Type</label>
                        <select
                          name="enquiryType"
                          className="form-select form-select-lg border-warning"
                          value={formData.enquiryType}
                          onChange={handleChange}
                        >
                          <option value="general">General Enquiry</option>
                          <option value="order">Order Support</option>
                          <option value="technical">Technical Support</option>
                          <option value="complaint">Complaint</option>
                          <option value="wholesale">Wholesale Enquiry</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold text-dark">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        className="form-control form-control-lg border-warning"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Brief description of your enquiry"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold text-dark">Message *</label>
                      <textarea
                        name="message"
                        className="form-control border-warning"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Please provide details about your enquiry..."
                      ></textarea>
                    </div>

                    <div className="mb-4">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="privacy"
                          required
                        />
                        <label className="form-check-label text-secondary" htmlFor="privacy">
                          I agree to the <a href="/privacy-policy" className="text-orange-primary">Privacy Policy</a> and 
                          consent to PlateForge contacting me about my enquiry.
                        </label>
                      </div>
                    </div>

                    <button type="submit" className="btn bg-yellow-gradient text-dark fw-bold btn-lg px-5 py-3">
                      📤 Send Message
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Information */}
              <div className="col-lg-4">
                <div className="bg-white p-5 rounded-4 shadow-yellow h-100">
                  <h3 className="fw-bold text-dark mb-4">
                    Contact <span className="text-orange-primary">Information</span>
                  </h3>

                  <div className="mb-4">
                    <h5 className="fw-bold text-dark mb-2">📍 Our Location</h5>
                    <p className="text-secondary mb-0">
                      PlateForge Ltd<br/>
                      123 Industrial Estate<br/>
                      Manufacturing District<br/>
                      London, UK SW1A 1AA
                    </p>
                  </div>

                  <div className="mb-4">
                    <h5 className="fw-bold text-dark mb-2">🕒 Opening Hours</h5>
                    <div className="text-secondary">
                      <div className="d-flex justify-content-between">
                        <span>Monday - Friday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Saturday</span>
                        <span>9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="fw-bold text-dark mb-2">📧 Department Emails</h5>
                    <div className="text-secondary small">
                      <div>Sales: sales@plateforge.com</div>
                      <div>Support: support@plateforge.com</div>
                      <div>Returns: returns@plateforge.com</div>
                      <div>Wholesale: wholesale@plateforge.com</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="fw-bold text-dark mb-2">🚗 Visit Our Showroom</h5>
                    <p className="text-secondary small mb-3">
                      See our full range of plates and speak with our experts. 
                      Appointments recommended for personalized service.
                    </p>
                    <button className="btn btn-warning text-dark fw-bold w-100">
                      📅 Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-5 bg-white">
          <div className="container py-5">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold text-dark mb-4">
                Frequently Asked <span className="text-orange-primary">Questions</span>
              </h2>
              <p className="fs-5 text-secondary">
                Quick answers to common questions
              </p>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="accordion" id="faqAccordion">
                  <div className="accordion-item border-warning mb-3">
                    <h2 className="accordion-header">
                      <button className="accordion-button bg-yellow-light fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                        How long does delivery take?
                      </button>
                    </h2>
                    <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">
                        Standard delivery takes 2-3 working days. We also offer next-day delivery for urgent orders placed before 12PM.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item border-warning mb-3">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed bg-yellow-light fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                        Are your plates road legal?
                      </button>
                    </h2>
                    <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">
                        Yes, all our standard plates are DVLA approved and fully road legal. Custom designs may be for show use only.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item border-warning mb-3">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed bg-yellow-light fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                        Can I return my plates?
                      </button>
                    </h2>
                    <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">
                        Yes, we offer a 30-day return policy for unused plates. Custom plates may have different return conditions.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item border-warning">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed bg-yellow-light fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                        Do you offer wholesale prices?
                      </button>
                    </h2>
                    <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">
                        Yes, we offer competitive wholesale pricing for bulk orders. Contact our wholesale team for a custom quote.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-5 bg-yellow-light">
          <div className="container py-5">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold text-dark mb-4">
                Find <span className="text-orange-primary">Us</span>
              </h2>
            </div>
            
            <div className="bg-white p-4 rounded-4 shadow-yellow">
              <div className="bg-secondary rounded-3 d-flex align-items-center justify-content-center" style={{height: '400px'}}>
                <div className="text-center text-white">
                  <div className="display-1 mb-3">🗺️</div>
                  <h4>Interactive Map</h4>
                  <p>Google Maps integration would go here</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;