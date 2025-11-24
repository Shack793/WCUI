import React from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from '@/components/layout/Footer';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | MyEasyDonate</title>
        <meta name="description" content="Privacy policy for MyEasyDonate crowdfunding platform" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
            
            <div className="prose max-w-none text-gray-700 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Introduction</h2>
                <p>
                  MyEasyDonate ("we," "us," "our," or "Company") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you visit our website and use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Information We Collect</h2>
                <p>We collect information in the following ways:</p>
                
                <h3 className="text-xl font-semibold mb-2 text-gray-800">2.1 Information You Provide</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Account registration details (name, email, password)</li>
                  <li>Profile information (bio, profile picture, contact details)</li>
                  <li>Campaign details (title, description, funding goals, category)</li>
                  <li>Payment information for donations</li>
                  <li>Communication data (messages, support inquiries)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-800">2.2 Information Collected Automatically</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP address and browser type</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referral sources</li>
                  <li>Device information (device type, OS, unique identifiers)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. How We Use Your Information</h2>
                <p>We use your information for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Creating and managing your account</li>
                  <li>Processing donations and payments</li>
                  <li>Communicating with you about campaigns and updates</li>
                  <li>Providing customer support</li>
                  <li>Improving and optimizing our platform</li>
                  <li>Detecting and preventing fraud or abuse</li>
                  <li>Complying with legal obligations</li>
                  <li>Sending promotional materials (with your consent)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Information Sharing</h2>
                <p>
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment processors and financial institutions</li>
                  <li>Service providers who assist in operating our platform</li>
                  <li>Law enforcement when required by law</li>
                  <li>Third parties with your explicit consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Data Security</h2>
                <p>
                  We implement industry-standard security measures to protect your personal information from 
                  unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
                  over the Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Cookies and Tracking Technologies</h2>
                <p>
                  Our website uses cookies and similar tracking technologies to enhance your experience. 
                  You can control cookie preferences through your browser settings. Some features may not 
                  function properly if cookies are disabled.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Your Privacy Rights</h2>
                <p>Depending on your location, you may have the following rights:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct or update inaccurate information</li>
                  <li>Delete your personal information</li>
                  <li>Opt-out of promotional communications</li>
                  <li>Data portability</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us through the methods provided at the end of this policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Retention of Information</h2>
                <p>
                  We retain your personal information for as long as necessary to provide our services and 
                  fulfill the purposes outlined in this Privacy Policy. You may request deletion of your account 
                  and associated data at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Third-Party Links</h2>
                <p>
                  MyEasyDonate may contain links to third-party websites. We are not responsible for the privacy 
                  practices of these sites. We encourage you to review their privacy policies before providing 
                  any personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">10. Children's Privacy</h2>
                <p>
                  MyEasyDonate is not intended for individuals under the age of 18. We do not knowingly collect 
                  personal information from children. If we become aware of such collection, we will take steps 
                  to delete the information and terminate the child's account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">11. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy periodically. Changes will be effective immediately upon posting. 
                  Your continued use of MyEasyDonate signifies your acceptance of the updated Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">12. Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy or our privacy practices, please contact us 
                  through our website contact page.
                </p>
              </section>

              <section>
                <p className="text-sm text-gray-500">
                  Last updated: November 24, 2025
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
