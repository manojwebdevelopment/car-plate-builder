import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <style jsx>{`
        .bg-yellow-gradient { background: linear-gradient(135deg, #ffc107, #ffca2c); }
        .bg-yellow-light { background-color: #fff3cd; }
        .text-orange-primary { color: #ff6b35; }
        .card-hover:hover {
          transform: translateY(-10px);
          transition: all 0.3s ease;
          box-shadow: 0 20px 40px rgba(255, 193, 7, 0.3);
        }
        .shadow-yellow { box-shadow: 0 10px 30px rgba(255, 193, 7, 0.2); }
        .timeline-item::before {
          content: '';
          position: absolute;
          left: -8px;
          top: 20px;
          width: 16px;
          height: 16px;
          background: #ffc107;
          border: 3px solid #fff;
          border-radius: 50%;
        }
        .timeline-line {
          position: absolute;
          left: -1px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #ffc107;
        }
      `}</style>

      <div className="min-vh-100" style={{backgroundColor: '#fffbf0'}}>
        {/* Hero Section */}
        <section className="bg-yellow-gradient py-5">
          <div className="container py-5">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h1 className="display-3 fw-bold text-dark mb-4">
                  About PlateForge
                </h1>
                <p className="fs-4 text-dark mb-4">
                  The UK's most trusted number plate manufacturer since 2010. 
                  We've been crafting premium quality plates with passion, precision, and innovation.
                </p>
                <button 
                  onClick={() => navigate('/plate-builder')}
                  className="btn btn-dark btn-lg px-5 py-3 fw-bold rounded-3"
                >
                  🚀 Start Your Order
                </button>
              </div>
              <div className="col-lg-4 text-center">
                <div className="bg-white p-4 rounded-4 shadow-yellow">
                  <div className="display-1 mb-3">🏭</div>
                  <h3 className="text-dark fw-bold">Est. 2010</h3>
                  <p className="text-secondary mb-0">15+ Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-5 bg-white">
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-6">
                <h2 className="display-5 fw-bold text-dark mb-4">
                  Our <span className="text-orange-primary">Story</span>
                </h2>
                <p className="fs-5 text-secondary mb-4">
                  PlateForge was founded in 2010 with a simple mission: to revolutionize 
                  the number plate industry by combining traditional craftsmanship with 
                  modern technology and exceptional customer service.
                </p>
                <p className="text-secondary mb-4">
                  What started as a small family business in London has grown into the UK's 
                  leading online number plate manufacturer, serving over 50,000 satisfied 
                  customers nationwide.
                </p>
                <p className="text-secondary">
                  We're proud to be DVLA approved and maintain the highest standards of 
                  quality while offering competitive prices and fast delivery times.
                </p>
              </div>
              <div className="col-lg-6">
                <div className="row g-3">
                  <div className="col-6">
                    <div className="bg-yellow-light p-4 rounded-3 text-center card-hover">
                      <h3 className="display-6 fw-bold text-orange-primary">50K+</h3>
                      <p className="mb-0 fw-bold text-dark">Happy Customers</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-yellow-light p-4 rounded-3 text-center card-hover">
                      <h3 className="display-6 fw-bold text-orange-primary">15+</h3>
                      <p className="mb-0 fw-bold text-dark">Years Experience</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-yellow-light p-4 rounded-3 text-center card-hover">
                      <h3 className="display-6 fw-bold text-orange-primary">99%</h3>
                      <p className="mb-0 fw-bold text-dark">Satisfaction Rate</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="bg-yellow-light p-4 rounded-3 text-center card-hover">
                      <h3 className="display-6 fw-bold text-orange-primary">24/7</h3>
                      <p className="mb-0 fw-bold text-dark">Customer Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-5 bg-yellow-light">
          <div className="container py-5">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold text-dark mb-4">
                Our <span className="text-orange-primary">Values</span>
              </h2>
              <p className="fs-5 text-secondary mx-auto" style={{maxWidth: '600px'}}>
                These core values guide everything we do at PlateForge
              </p>
            </div>

            <div className="row g-4">
              <div className="col-md-6 col-lg-3">
                <div className="bg-white p-5 rounded-4 text-center card-hover h-100 shadow-yellow">
                  <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" 
                       style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                    🏆
                  </div>
                  <h4 className="fw-bold text-dark mb-3">Quality First</h4>
                  <p className="text-secondary">
                    We never compromise on quality. Every plate is manufactured to the highest standards 
                    using premium materials and precision techniques.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="bg-white p-5 rounded-4 text-center card-hover h-100 shadow-yellow">
                  <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" 
                       style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                    💡
                  </div>
                  <h4 className="fw-bold text-dark mb-3">Innovation</h4>
                  <p className="text-secondary">
                    We continuously invest in new technologies and techniques to stay ahead 
                    of the curve and offer cutting-edge solutions.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="bg-white p-5 rounded-4 text-center card-hover h-100 shadow-yellow">
                  <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" 
                       style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                    🤝
                  </div>
                  <h4 className="fw-bold text-dark mb-3">Customer Focus</h4>
                  <p className="text-secondary">
                    Our customers are at the heart of everything we do. We listen, understand, 
                    and deliver exactly what you need.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="bg-white p-5 rounded-4 text-center card-hover h-100 shadow-yellow">
                  <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" 
                       style={{width: '80px', height: '80px', fontSize: '2rem'}}>
                    🌱
                  </div>
                  <h4 className="fw-bold text-dark mb-3">Sustainability</h4>
                  <p className="text-secondary">
                    We're committed to sustainable manufacturing practices and reducing 
                    our environmental impact while maintaining quality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-5 bg-white">
          <div className="container py-5">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold text-dark mb-4">
                Our <span className="text-orange-primary">Journey</span>
              </h2>
              <p className="fs-5 text-secondary">
                From humble beginnings to industry leaders
              </p>
            </div>

            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="position-relative">
                  <div className="timeline-line"></div>
                  
                  <div className="timeline-item position-relative ps-5 mb-5">
                    <div className="bg-yellow-light p-4 rounded-4 shadow-yellow">
                      <h4 className="fw-bold text-dark">2010 - The Beginning</h4>
                      <p className="text-secondary mb-0">
                        PlateForge founded in London with a vision to revolutionize 
                        the number plate industry through quality and innovation.
                      </p>
                    </div>
                  </div>

                  <div className="timeline-item position-relative ps-5 mb-5">
                    <div className="bg-yellow-light p-4 rounded-4 shadow-yellow">
                      <h4 className="fw-bold text-dark">2013 - First Major Milestone</h4>
                      <p className="text-secondary mb-0">
                        Achieved DVLA approval and served our 1,000th customer. 
                        Expanded our product range to include 3D gel plates.
                      </p>
                    </div>
                  </div>

                  <div className="timeline-item position-relative ps-5 mb-5">
                    <div className="bg-yellow-light p-4 rounded-4 shadow-yellow">
                      <h4 className="fw-bold text-dark">2017 - Going Digital</h4>
                      <p className="text-secondary mb-0">
                        Launched our online platform and introduced the revolutionary 
                        Plate Builder tool for custom designs.
                      </p>
                    </div>
                  </div>

                  <div className="timeline-item position-relative ps-5 mb-5">
                    <div className="bg-yellow-light p-4 rounded-4 shadow-yellow">
                      <h4 className="fw-bold text-dark">2020 - Nationwide Expansion</h4>
                      <p className="text-secondary mb-0">
                        Reached 25,000+ customers and expanded delivery to cover 
                        the entire UK with next-day delivery options.
                      </p>
                    </div>
                  </div>

                  <div className="timeline-item position-relative ps-5">
                    <div className="bg-yellow-gradient p-4 rounded-4 shadow-yellow">
                      <h4 className="fw-bold text-dark">2024 - Industry Leaders</h4>
                      <p className="text-dark mb-0">
                        <strong>Now serving 50,000+ customers with 99% satisfaction rate. 
                        Recognized as the UK's #1 online number plate manufacturer.</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-5 bg-yellow-light">
          <div className="container py-5">
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold text-dark mb-4">
                Meet Our <span className="text-orange-primary">Team</span>
              </h2>
              <p className="fs-5 text-secondary">
                The passionate people behind PlateForge
              </p>
            </div>

            <div className="row g-4 justify-content-center">
              <div className="col-md-6 col-lg-4">
                <div className="bg-white p-5 rounded-4 text-center card-hover shadow-yellow">
                  <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" 
                       style={{width: '100px', height: '100px', fontSize: '3rem'}}>
                    👨‍💼
                  </div>
                  <h4 className="fw-bold text-dark">John Smith</h4>
                  <p className="text-orange-primary fw-bold mb-3">Founder & CEO</p>
                  <p className="text-secondary">
                    With 15+ years in the automotive industry, John founded PlateForge 
                    to bring innovation and quality to number plate manufacturing.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="bg-white p-5 rounded-4 text-center card-hover shadow-yellow">
                  <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" 
                       style={{width: '100px', height: '100px', fontSize: '3rem'}}>
                    👩‍🔬
                  </div>
                  <h4 className="fw-bold text-dark">Sarah Johnson</h4>
                  <p className="text-orange-primary fw-bold mb-3">Head of Quality</p>
                  <p className="text-secondary">
                    Sarah ensures every plate meets our exacting standards. 
                    Her attention to detail has earned us our reputation for excellence.
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-4">
                <div className="bg-white p-5 rounded-4 text-center card-hover shadow-yellow">
                  <div className="bg-yellow-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" 
                       style={{width: '100px', height: '100px', fontSize: '3rem'}}>
                    👨‍💻
                  </div>
                  <h4 className="fw-bold text-dark">Mike Wilson</h4>
                  <p className="text-orange-primary fw-bold mb-3">Tech Director</p>
                  <p className="text-secondary">
                    Mike leads our digital innovation, developing tools like our 
                    Plate Builder to make ordering simple and enjoyable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-5 bg-white">
          <div className="container py-5">
            <div className="bg-yellow-gradient p-5 rounded-4 text-center shadow-yellow">
              <h2 className="display-5 fw-bold text-dark mb-4">
                Ready to Experience the PlateForge Difference?
              </h2>
              <p className="fs-5 text-dark mb-4">
                Join thousands of satisfied customers who trust us with their number plates
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                <button 
                  onClick={() => navigate('/plate-builder')}
                  className="btn btn-dark btn-lg px-5 py-3 fw-bold"
                >
                  🚀 Build Your Plate
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="btn btn-outline-dark btn-lg px-5 py-3 fw-bold"
                >
                  💬 Contact Us
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;