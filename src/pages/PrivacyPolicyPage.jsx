import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <>
      <style jsx>{`
        .bg-yellow-gradient { background: linear-gradient(135deg, #ffc107, #ffca2c); }
        .text-orange-primary { color: #ff6b35; }
        .section-card {
          background: white;
          border: 2px solid #ffc107;
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 10px 30px rgba(255, 193, 7, 0.1);
        }
      `}</style>

      <div className="min-vh-100" style={{backgroundColor: '#fffbf0'}}>
        {/* Header */}
        <section className="bg-yellow-gradient py-4">
          <div className="container">
            <div className="text-center">
              <h1 className="display-4 fw-bold text-dark mb-3">Privacy Policy</h1>
              <p className="fs-5 text-dark">Last updated: December 2024</p>
            </div>
          </div>
        </section>

        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              
              {/* Introduction */}
              <div className="section-card">
                <h2 className="text-orange-primary fw-bold mb-4">1. Introduction</h2>
                <p>PlateForge Ltd ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
                <p>By using our website and services, you consent to the data practices described in this policy.</p>
              </div>

              {/* Information We Collect */}
              <div className="section-card">
                <h2 className="text-orange-primary fw-bold mb-4">2. Information We Collect</h2>
                
                <h4 className="fw-bold mb-3">2.1 Personal Information</h4>
                <p>We may collect the following personal information:</p>
                <ul>
                  <li>Name and contact information (email, phone, address)</li>
                  <li>Vehicle registration details</li>
                  <li>Payment information (processed securely by third parties)</li>
                  <li>Order history and preferences</li>
                  <li>Communication preferences</li>
                </ul>

                <h4 className="fw-bold mb-3 mt-4">2.2 Technical Information</h4>
                <p>We automatically collect technical information including:</p>
                <ul>
                  <li>IP address and browser type</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Device information and operating system</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>

              {/* How We Use Information */}
              <div className="section-card">
                <h2 className="text-orange-primary fw-bold mb-4">3. How We Use Your Information</h2>
                <p>We use your information to:</p>
                <ul>
                  <li>Process and fulfill your orders</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Send order confirmations and shipping updates</li>
                  <li>Improve our website and services</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Comply with legal obligations</li>
                  <li>Prevent fraud and enhance security</li>
                </ul>
              </div>

              {/* Information Sharing */}
              <div className="section-card">
                <h2 className="text-orange-primary fw-bold mb-4">4. Information Sharing and Disclosure</h2>
                
                <h4 className="fw-bold mb-3">4.1 Service Providers</h4>
                <p>We may share your information with trusted third parties who assist us in:</p>
                <ul>
                  <li>Payment processing</li>
                  <li>Order fulfillment and shipping</li>
                  <li>Customer support</li>
                  <li>Marketing and analytics</li>
                </ul>

                <h4 className="fw-bold mb-3 mt-4">4.2 Legal Requirements</h4>
                <p>We may disclose your information when required by law or to:</p>
                <ul>
                  <li>Comply with legal processes</li>
                  <li>Protect our rights and property</li>
                  <li>Ensure user safety</li>
                  <li>Investigate potential violations</li>
                </ul>

                <h4 className="fw-bold mb-3 mt-4">4.3 Business Transfers</h4>
                <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</p>
              </div>

              {/* Data Security */}
              <div className="section-card">
                <h2 className="text-orange-primary fw-bold mb-4">5. Data Security</h2>
                <p>We implement appropriate security measures to protect your personal information:</p>
                <ul>
                  <li>SSL encryption for data transmission</li>
                  <li>Secure payment processing systems</li>
                  <li>Regular security assessments</li>
                  <li>Limited access to personal information</li>
                  <li>Employee confidentiality agreements</li>
                </ul>
                <p>However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
              </div>

              {/* Your Rights */}
              <div className="section-card">
                <h2 className="text-orange-primary fw-bold mb-4">6. Your Rights (GDPR)</h2>
                <p>Under the General Data Protection Regulation (GDPR), you have the right to:</p>
                <ul>
                  <li><strong>Access:</strong> Request copies of your personal data</li>
                  <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
                  <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                  <li><strong>Restrict Processing:</strong> Request limitation of data processing</li>
                  <li><strong>Data Portability:</strong> Request transfer of your data</li>
                  <li><strong>Object:</strong> Object to processing of your personal data</li>
                  <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing</li>
                </ul>
                <p>To exercise these rights, contact us at <a href="mailto:privacy@plateforge.com" className="text-orange-primary">privacy@plateforge.com</a></p>
              </div>

              {/* Cookies */}
              <div className="section-card">
                <h2 className="text-orange-primary fw-bold mb-4">7. Cookies and Tracking</h2>
                <p>We use cookies and similar technologies to:</p>
                <ul>
                  <li>Remember your preferences</li>
                  <li>Analyze website traffic</li>
                  <li>Improve user experience</li>
                  <li>Provide personalized content</li>
                </ul>
                <p>You can control cookies through your browser settings. For more information, see our <a href="/cookies-policy" className="text-orange-primary">Cookies Policy</a>.</p>
              </div>

              {/* Data Retention */}
              <div className="section-card">
                <h2 className="text-orange-primary fw-bold mb-4">8. Data Retention</h2>
                <p>We retain your personal information for as long as necessary to:</p>
                <ul>
                  <li>Provide our services</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes</li>
                  <li>Enforce our agreements</li>
                </ul>
                <p>When no longer needed, we securely delete or anonymize your information.</p>
              </div>

              {/* Children's Privacy */}
              <div className="section-card">
                <h2 className="text-orange-primary fw-bold mb-4">9. Children's Privacy</h2>
                <p>Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.</p>
              </div>

              {/* International Transfers */}
              <div className="section-card">
                <h2 className="text-orange-primary fw-bold mb-4">10. International Data Transfers</h2>
                <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers, including:</p>
                <ul>
                  <li>Adequacy decisions by the European Commission</li>
                  <li>Standard contractual clauses</li>
                  <li>Certification schemes</li>
                </ul>
              </div>

              {/* Changes to Policy */}
              <div className="section-card">
                <h2 className="text-orange-primary fw-bold mb-4">11. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by:</p>
                <ul>
                  <li>Posting the new policy on this page</li>
                  <li>Updating the "Last updated" date</li>
                  <li>Sending email notifications for significant changes</li>
                </ul>
                <p>Your continued use of our services after changes constitutes acceptance of the new policy.</p>
              </div>

              {/* Contact Information */}
              <div className="section-card">
                <h2 className="text-orange-primary fw-bold mb-4">12. Contact Us</h2>
                <p>If you have questions about this Privacy Policy or our data practices, contact us:</p>
                <div className="bg-warning bg-opacity-25 p-4 rounded-3 mt-3">
                  <p className="mb-2"><strong>PlateForge Ltd</strong></p>
                  <p className="mb-2">Data Protection Officer</p>
                  <p className="mb-2">Email: <a href="mailto:privacy@plateforge.com" className="text-orange-primary">privacy@plateforge.com</a></p>
                  <p className="mb-2">Phone: 0800 123 4567</p>
                  <p className="mb-0">Address: 123 Industrial Estate, London, UK SW1A 1AA</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;