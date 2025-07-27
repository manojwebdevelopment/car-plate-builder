import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { successhandle, errorhandle } from "../components/toast/Toast";


const products = [
  {
    title: "4D Gel Number Plates",
    img: "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
    price: "£34.99",
    originalPrice: "£44.99",
    badge: "PREMIUM",
    rating: 4.9,
    reviews: 1250,
    features: ["3mm Raised", "UV Resistant", "3-Year Warranty"]
  },
  {
    title: "3D Gel Number Plates", 
    img: "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
    price: "£29.99",
    originalPrice: "£39.99", 
    badge: "BESTSELLER",
    rating: 4.8,
    reviews: 2100,
    features: ["Raised Letters", "Weather Proof", "2-Year Warranty"]
  },
  {
    title: "Hex Number Plates",
    img: "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp", 
    price: "£27.99",
    originalPrice: "£34.99",
    badge: "NEW",
    rating: 4.7,
    reviews: 850,
    features: ["Hex Pattern", "Modern Look", "Road Legal"]
  },
  {
    title: "Crystal Plates",
    img: "images/4D-Gel-3mm-Main-Image-Pair-Web-v2-white-640x360.webp",
    price: "£39.99",
    originalPrice: "£49.99", 
    badge: "LUXURY",
    rating: 4.9,
    reviews: 650,
    features: ["Crystal Finish", "Luxury Look", "Premium Quality"]
  },
];

const features = [
  {
    icon: "🏆",
    title: "Premium Quality",
    desc: "High-grade materials with perfect finish and 3-year warranty",
    highlight: "3-Year Warranty",
    color: "success"
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    desc: "24-48 hour production with express delivery options",
    highlight: "24H Production",
    color: "warning"
  },
  {
    icon: "🛡️", 
    title: "100% Legal",
    desc: "DVLA approved and fully compliant with UK regulations",
    highlight: "DVLA Certified",
    color: "info"
  },
  {
    icon: "💎",
    title: "Expert Craft",
    desc: "Precision manufacturing with attention to every detail",
    highlight: "Handcrafted",
    color: "danger"
  }
];

export default function Home() {
   const navigate = useNavigate();
  const [registration, setRegistration] = useState('');
  const [isLoading, setIsLoading] = useState(false);

 const handleSubmit = (e) => {
  e.preventDefault();

  const trimmedReg = registration.trim();

  if (!trimmedReg) {
    errorhandle("❌ Registration number is required!");
    return;
  }

  if (trimmedReg.length > 7) {
    errorhandle("❌ Registration number must be 7 characters or less!");
    return;
  }

  setIsLoading(true);
  console.log('Registration:', trimmedReg);

  // Redirect with state
  navigate('/platebuilder', { state: { registration: trimmedReg } });

  // Simulate API call delay
  setTimeout(() => {
    setIsLoading(false);
  }, 1000);
};

  return (
    <div className="modern-home">
      {/* Hero Section */}
      <section className="hero-section position-relative overflow-hidden">
        <div className="hero-bg"></div>
        <div className="hero-pattern"></div>
        
        <div className="container position-relative">
          <div className="row min-vh-100 align-items-center gx-4">
            <div className="col-lg-6 col-xl-6">
              <div className="hero-content pe-lg-4">
                <div className="hero-badge badge bg-danger text-white px-3 py-2 rounded-pill mb-4">
                  <span className="me-2">🚀</span>
                  UK&apos;s #1 Plate Specialists
                </div>
                
                <h1 className="hero-title display-1 fw-black text-white mb-4">
                  Create 
                  <span className="text-danger d-block">Stunning</span>
                  Number Plates
                </h1>
                
                <p className="hero-subtitle lead text-white-50 mb-5">
                  Professional quality, lightning-fast delivery, and unbeatable prices. 
                  Join 50,000+ happy customers who trust PlateForge.
                </p>

                <div className="hero-stats row g-3 mb-5">
                  <div className="col-4 text-center">
                    <div className="stat-number h2 text-danger fw-bold mb-0 animate-pulse">50K+</div>
                    <small className="text-white-50">Customers</small>
                  </div>
                  <div className="col-4 text-center">
                    <div className="stat-number h2 text-danger fw-bold mb-0">24H</div>
                    <small className="text-white-50">Delivery</small>
                  </div>
                  <div className="col-4 text-center">
                    <div className="stat-number h2 text-danger fw-bold mb-0">4.9★</div>
                    <small className="text-white-50">Rating</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-6">
              <div className="hero-form-wrapper ps-lg-4">
                <div className="hero-form card shadow-lg border-0">
                  <div className="card-body p-4">
                    <div className="text-center mb-4">
                      <h3 className="h4 fw-bold mb-2">
                        <span className=" me-2">⚡</span>
                        Quick Plate Builder
                      </h3>
                      <p className=" small mb-0">Enter your reg to get started instantly</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="input-group input-group-lg mb-3">
                        <input 
                          type="text" 
                          className="form-control text-uppercase fw-bold" 
                          placeholder="AB12 CDE"
                          value={registration}
                          onChange={(e) => setRegistration(e.target.value.toUpperCase())}
                          maxLength={8}
                          
                        />
                        <button 
                          type="submit"
                          className="btn btn-danger px-4"
                          
                        >
                          {isLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Building...
                            </>
                          ) : (
                            <>
                              <span className="me-2">🚀</span>
                              Build
                            </>
                          )}
                        </button>
                      </div>
                    </form>

                    

                    <div className="trust-badges d-flex justify-content-between text-center">
                      <div className="trust-item">
                        <span className="text-success fs-5">✓</span>
                        <small className="d-block fw-semibold">Secure</small>
                      </div>
                      <div className="trust-item">
                        <span className="text-success fs-5">✓</span>
                        <small className="d-block  fw-semibold">Fast</small>
                      </div>
                      <div className="trust-item">
                        <span className="text-success fs-5">✓</span>
                        <small className="d-block  fw-semibold">Legal</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats Card */}
                <div className="mt-4">
                  <div className="row g-2">
                    <div className="col-6">
                      <div className="card bg-dark text-white border-0">
                        <div className="card-body p-3 text-center">
                          <div className="fw-bold">⚡ Express</div>
                          <small className="opacity-75">24h delivery</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="card bg-dark text-white border-0">
                        <div className="card-body p-3 text-center">
                          <div className="fw-bold">🛡️ Legal</div>
                          <small className="opacity-75">DVLA approved</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-danger text-white px-3 py-2 rounded-pill mb-3">
              Our Collection
            </span>
            <h2 className="display-4 fw-bold mb-3">
              Premium <span className="text-danger">Plate Styles</span>
            </h2>
            <p className="lead text-muted">Choose from our expertly crafted range</p>
          </div>

          <div className="row g-4">
            {products.map((product, idx) => (
              <div key={idx} className="col-lg-3 col-md-6">
                <div className="product-card card h-100 border-0 shadow-sm position-relative">
                  <div className={`product-badge badge position-absolute top-0 start-0 m-3 ${
                    product.badge === 'BESTSELLER' ? 'bg-success' :
                    product.badge === 'NEW' ? 'bg-info' :
                    product.badge === 'LUXURY' ? 'bg-warning text-dark' : 'bg-danger'
                  }`} style={{ zIndex: 3 }}>
                    {product.badge}
                  </div>
                  
                  <div className="product-image position-relative overflow-hidden">
                    <img 
                      src={product.img} 
                      className="card-img-top" 
                      alt={product.title}
                      style={{ height: '220px', objectFit: 'cover' }}
                    />
                  </div>

                  <div className="card-body">
                    <h5 className="card-title fw-bold mb-2">{product.title}</h5>
                    
                    <div className="rating mb-2">
                      <span className="text-warning">★★★★★</span>
                      <small className="text-muted ms-1">
                        {product.rating} ({product.reviews} reviews)
                      </small>
                    </div>

                    <div className="features mb-3">
                      {product.features.map((feature, i) => (
                        <span key={i} className="badge bg-light text-dark me-1 mb-1">{feature}</span>
                      ))}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <span className="h5 text-danger fw-bold mb-0">{product.price}</span>
                        <small className="text-muted text-decoration-line-through ms-2">{product.originalPrice}</small>
                      </div>
                      <small className="text-muted">per pair</small>
                    </div>

                    <button type="button" className="btn btn-dark w-100">
                      <span className="me-2">🛒</span>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <button type="button" className="btn btn-outline-danger btn-lg px-5">
              View All Products <span className="ms-2">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-dark text-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-3">
              Why Choose <span className="text-danger">PlateForge</span>?
            </h2>
            <p className="lead text-white-50">Experience the difference with premium service</p>
          </div>

          <div className="row g-4">
            {features.map((feature, idx) => (
              <div key={idx} className="col-lg-3 col-md-6">
                <div className="feature-card text-center p-4 h-100 position-relative">
                  <div className="feature-icon display-1 mb-3">{feature.icon}</div>
                  <h4 className="fw-bold mb-3">{feature.title}</h4>
                  <p className="text-white-50 mb-3">{feature.desc}</p>
                  <span className={`badge bg-${feature.color} text-white px-3 py-2`}>
                    {feature.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="row mt-5 pt-5 border-top border-secondary">
            <div className="col-md-3 text-center mb-3">
              <div className="fs-2 mb-2">🏅</div>
              <div className="fw-bold">Award Winning</div>
              <small className="text-white-50">Best Plate Supplier 2024</small>
            </div>
            <div className="col-md-3 text-center mb-3">
              <div className="fs-2 mb-2">📦</div>
              <div className="fw-bold">Free Delivery</div>
              <small className="text-white-50">On orders over £25</small>
            </div>
            <div className="col-md-3 text-center mb-3">
              <div className="fs-2 mb-2">💬</div>
              <div className="fw-bold">24/7 Support</div>
              <small className="text-white-50">Expert help when you need it</small>
            </div>
            <div className="col-md-3 text-center mb-3">
              <div className="fs-2 mb-2">🔄</div>
              <div className="fw-bold">Easy Returns</div>
              <small className="text-white-50">30-day guarantee</small>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-danger text-white px-3 py-2 rounded-pill mb-3">
              Transparent Pricing
            </span>
            <h2 className="display-4 fw-bold mb-3">
              <span className="text-danger">Professional</span> Plates at Great Prices
            </h2>
            <p className="lead text-muted">No hidden fees. Premium quality guaranteed.</p>
          </div>

          <div className="row g-4 justify-content-center">
            {[
              {
                name: "Standard Plates",
                price: "£24.99",
                originalPrice: "£34.99",
                features: ["Reflective backing", "Legal compliance", "2-year warranty", "Free design", "Basic support"],
                popular: false,
                icon: "🛡️",
                savings: "Save £10"
              },
              {
                name: "3D Gel Plates", 
                price: "£34.99",
                originalPrice: "£49.99",
                features: ["Raised gel letters", "Premium finish", "Enhanced appeal", "3-year warranty", "Priority support", "Free replacement"],
                popular: true,
                icon: "💎",
                savings: "Save £15"
              },
              {
                name: "Show Plates",
                price: "£19.99",
                originalPrice: "£29.99", 
                features: ["Custom designs", "Exhibition use", "Any styling", "Personal text", "Quick turnaround"],
                popular: false,
                icon: "🎨",
                savings: "Save £10"
              }
            ].map((plan, idx) => (
              <div key={idx} className="col-lg-4 col-md-6">
                <div className={`pricing-card card h-100 ${plan.popular ? 'border-danger' : 'border-0'} shadow-sm position-relative`}>
                  {plan.popular && (
                    <div className="card-header bg-danger text-white text-center fw-bold">
                      <span className="me-2">🔥</span>MOST POPULAR
                    </div>
                  )}
                  
                  {plan.savings && (
                    <div className="position-absolute top-0 end-0 m-3">
                      <span className="badge bg-success">{plan.savings}</span>
                    </div>
                  )}
                  
                  <div className="card-body text-center p-4">
                    <div className="pricing-icon display-4 mb-3">{plan.icon}</div>
                    <h3 className="fw-bold mb-3">{plan.name}</h3>
                    <div className="pricing-price mb-4">
                      <span className="display-4 fw-bold text-danger">{plan.price}</span>
                      <small className="text-muted text-decoration-line-through d-block">{plan.originalPrice}</small>
                      <small className="text-muted">per pair</small>
                    </div>

                    <ul className="list-unstyled mb-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="mb-2">
                          <span className="text-success me-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button type="button" className={`btn w-100 ${plan.popular ? 'btn-danger' : 'btn-outline-dark'}`}>
                      <span className="me-2">🛒</span>
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-danger text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="cta-content">
                <h2 className="display-5 fw-bold mb-3">
                  Ready to Create Your Perfect Plates? 🚀
                </h2>
                <p className="lead mb-0">
                  Join thousands of satisfied customers who trust PlateForge for their number plate needs
                </p>
                <div className="mt-3">
                  <span className="badge bg-light text-dark me-3">
                    <span className="me-1">⭐</span> 4.9/5 Rating
                  </span>
                  <span className="badge bg-light text-dark me-3">
                    <span className="me-1">🚚</span> Free Delivery
                  </span>
                  <span className="badge bg-light text-dark">
                    <span className="me-1">🛡️</span> 30-Day Guarantee
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="cta-buttons">
                <button type="button" className="btn btn-light btn-lg me-lg-3 mb-2 w-100 w-lg-auto">
                  <span className="me-2">⚡</span>
                  Start Building
                </button>
                <button type="button" className="btn btn-outline-light btn-lg mb-2 w-100 w-lg-auto">
                  <span className="me-2">📞</span>
                  Get Help
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-danger text-white px-3 py-2 rounded-pill mb-3">
              Got Questions?
            </span>
            <h2 className="display-4 fw-bold mb-3">
              Frequently Asked <span className="text-danger">Questions</span>
            </h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                {[
                  {
                    q: "Are your number plates road legal?",
                    a: "Yes! All our standard and 3D/4D plates meet strict UK legal requirements and are fully road legal with DVLA certification. We guarantee compliance."
                  },
                  {
                    q: "How quickly can you deliver?",
                    a: "Lightning fast! Most orders are produced within 24-48 hours and delivered within 2-4 business days with full tracking. Express options available."
                  },
                  {
                    q: "What documents do I need?",
                    a: "UK law requires proof of ownership and identity. We'll guide you through our simple verification process step by step."
                  },
                  {
                    q: "Can I customize show plates completely?",
                    a: "Absolutely! Show plates offer total creative freedom - custom text, fonts, colors, borders and styling options. Perfect for exhibitions and personal use."
                  },
                  {
                    q: "Do you offer guarantees?",
                    a: "Yes! We offer a 30-day money-back guarantee and 2-3 year warranties on all plates. If you're not satisfied, we'll make it right."
                  }
                ].map((faq, idx) => (
                  <div key={idx} className="accordion-item border-0 mb-3 shadow-sm">
                    <h3 className="accordion-header" id={`faqHeading${idx}`}>
                      <button
                        className="accordion-button collapsed fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq${idx}`}
                        aria-expanded="false"
                        aria-controls={`faq${idx}`}
                      >
                        <span className="text-danger me-3">❓</span>
                        {faq.q}
                      </button>
                    </h3>
                    <div
                      id={`faq${idx}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`faqHeading${idx}`}
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body text-muted">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-5 text-white newsletter-section">
        <div className="container position-relative">
          <div className="row justify-content-center text-center">
            <div className="col-lg-6">
              <h3 className="fw-bold mb-3">
                <span className="text-danger me-2">📧</span>
                Stay Updated with PlateForge
              </h3>
              <p className="text-white-50 mb-4">
                Get exclusive offers, new product alerts, and expert plate design tips delivered to your inbox
              </p>
              <div className="input-group input-group-lg mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email address"
                />
                <button type="button" className="btn btn-danger px-4">
                  <span className="me-2">📧</span>
                  Subscribe
                </button>
              </div>
              <small className="text-white-50 d-block">
                🔒 No spam. Unsubscribe anytime. Join 10,000+ subscribers.
              </small>
              
              <div className="mt-4">
                <div className="row g-3">
                  <div className="col-4">
                    <div className="text-center">
                      <div className="fw-bold">💰</div>
                      <small>Exclusive Deals</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="text-center">
                      <div className="fw-bold">🆕</div>
                      <small>New Products</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="text-center">
                      <div className="fw-bold">💡</div>
                      <small>Design Tips</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer/>
    </div>
  );
}
