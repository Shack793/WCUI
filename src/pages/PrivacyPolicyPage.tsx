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
            <h1 className="text-4xl font-bold mb-2 text-gray-900">Privacy Policy</h1>
            <p className="text-gray-700 mb-8">
              MyEasyDonate is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains what information we collect from you, how we use and share it, and your rights regarding that information. This Policy applies to information collected through our website, USSD service, and any associated digital platforms or services.
            </p>
            
            <div className="prose max-w-none text-gray-700 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Information We Collect</h2>
                <p>When you use MyEasyDonate, we may collect the following types of information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Personal Information:</strong> This includes information that can identify you as an individual or organization, such as your name, email address, telephone number, postal address, and payment details. If you register on behalf of an organization, we may also collect organizational information (e.g., organization name, registration details).</li>
                  <li><strong>Campaign Information:</strong> If you are a campaign owner, we collect details about your fundraising campaign, including the campaign title, purpose/description of the cause, images or videos you upload, your fundraising goal, and updates you post to donors.</li>
                  <li><strong>Transaction Data:</strong> We record details of donations made on the Platform. This includes the amounts donated, the currency, the dates/times of transactions, the campaign involved, and the payment method (e.g., mobile money, credit/debit card, bank transfer) used. We do not store full credit card numbers or sensitive payment details on our own servers (these may be handled by our payment processor, FalconPay).</li>
                  <li><strong>Technical and Usage Data:</strong> Like many online services, we gather technical data when you interact with our Platform. This includes your IP address, device type (e.g., phone or computer, and device identifiers), browser type, operating system, and usage information such as pages viewed, links clicked, and the time spent on the site. We may also collect device location information (if you permit it) for purposes such as fraud prevention and localization of content.</li>
                </ul>
                <p className="mt-4">
                  We collect this information in several ways: information you provide directly (for example, during account registration or campaign creation), information automatically collected through technology (such as cookies and server logs), and information from third parties (for example, payment processors or identity verification services).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. How We Use Your Information</h2>
                <p>MyEasyDonate uses the collected information for various legitimate purposes related to our Platform's operation and your user experience. Specifically, we use your information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Provide and Manage Services:</strong> To create your account, allow you to set up and manage campaigns, and enable donors to find and donate to campaigns. We use personal and campaign information to administer your user profile and campaign pages (e.g., displaying your campaign to others).</li>
                  <li><strong>Process Transactions:</strong> To process donations and facilitate the disbursement of funds to campaign owners. This includes using payment details to complete transactions and generating receipts or transaction records for donors and campaign owners.</li>
                  <li><strong>Communicate with You:</strong> To send you important notifications and updates. For example, we send email or SMS notifications to confirm donations, send donation receipts, inform campaign owners of new donations, or alert you to important changes or issues (such as updates to these policies or Platform features). We may also send updates about campaigns you have donated to, if you have opted to receive such updates.</li>
                  <li><strong>Prevent Fraud and Ensure Compliance:</strong> To monitor for fraudulent activities and ensure users comply with our Terms and with legal requirements. For instance, we might use your information to verify your identity, to perform anti-fraud checks on transactions, or to ensure campaigns are legitimate. This helps us keep the Platform safe and secure for all users.</li>
                  <li><strong>Improve and Personalize the Service:</strong> To understand how users interact with our Platform and improve our services. We may analyze technical data and user feedback to fix issues, enhance functionality, and tailor the user experience. For example, we might use usage data to introduce new features or to personalize content (such as showing you campaigns you might be interested in).</li>
                </ul>
                <p className="mt-4">
                  We will only use your personal information for the purposes for which we collected it, unless we reasonably consider that we need to use it for another related reason that is compatible with the original purpose. If we need to use your personal information for an unrelated purpose, we will notify you and obtain your consent or ensure we have another lawful basis for that new use.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Sharing of Information</h2>
                <p>
                  We understand that your personal information is important, and we are not in the business of selling it. We do not sell your personal data to third parties. However, we do share certain information with third parties in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Payment Processors and Financial Institutions:</strong> We share relevant personal and transaction information with our payment processing partner (FalconPay) and other financial institutions as needed to process donations and payouts. For example, when you make a donation, your payment details are handled by FalconPay or the relevant mobile money/bank networks, which will receive information like your name, card or account details, and transaction amount in order to process the payment.</li>
                  <li><strong>Regulatory and Legal Requirements:</strong> We may disclose your information to regulatory authorities, government agencies, or law enforcement if required by law or legal process. This can include compliance with anti-money laundering regulations, responding to lawful subpoenas or court orders, or reporting to tax authorities as required. We will only share what is necessary and will, if lawful, inform you of such disclosures.</li>
                  <li><strong>Service Providers and Partners:</strong> We employ third-party companies and individuals to help us operate and improve MyEasyDonate. This includes, for example, cloud hosting providers, data analytics services, customer support tools, marketing or communications service providers, and identity verification services. These service providers may have access to certain personal information, but only to perform tasks on our behalf and in compliance with this Privacy Policy. We require them to protect your information and not use it for any other purpose.</li>
                </ul>
                <p className="mt-4">
                  Aside from the purposes above, we will not share your personal information with any third parties without your consent. In particular, we will never sell your personal data to any third party. We may, however, share aggregated or anonymized data (which cannot be used to identify you personally) publicly or with partners – for example, publishing trends about donation volumes or success stories – but this data will not include any personal details.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Data Security</h2>
                <p>
                  We take the security of your information seriously. MyEasyDonate implements a variety of security measures to protect your personal data from unauthorized access, use, or disclosure. These measures include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Encryption:</strong> We use encryption protocols (such as SSL/TLS) to secure data transmission between your device and our servers. Sensitive data (like payment information) is encrypted during transit.</li>
                  <li><strong>Secure Storage:</strong> Personal data is stored on secure servers, and we employ technical safeguards like firewalls, access controls, and encryption at rest where appropriate to prevent unauthorized access.</li>
                  <li><strong>PCI-DSS Compliance:</strong> Our payment processing is handled via FalconPay, which adheres to the Payment Card Industry Data Security Standard (PCI-DSS) – a rigorous standard for handling payment information securely. This means credit/debit card transactions are processed with a high level of security.</li>
                  <li><strong>Organizational Measures:</strong> We restrict access to personal data to employees and contractors who need that information to operate our Platform or provide services. They are subject to strict confidentiality obligations. We also provide training to our team about data protection best practices.</li>
                </ul>
                <p className="mt-4">
                  Despite our efforts, please note that no method of transmission over the internet or method of electronic storage is completely secure. While we strive to protect your personal information, we cannot guarantee its absolute security. You can help protect your account by using a strong, unique password and keeping your login credentials private. If you have reason to believe that your interaction with us is no longer secure (for example, if you feel your account has been compromised), please immediately contact us at support@myeasydonate.com.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Data Retention</h2>
                <p>
                  We will retain your personal and transaction data for as long as necessary to fulfill the purposes for which we collected it, and to comply with our legal and regulatory obligations. Specifically:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Account Information:</strong> If you have an account on MyEasyDonate, we retain your personal information as long as your account is active. If you choose to close your account, we will delete or anonymize your personal information within a reasonable period after the closure, except for data we are required or permitted to retain by law (for example, for tax, audit, anti-fraud, or record-keeping purposes).</li>
                  <li><strong>Campaign and Donation Records:</strong> We retain records of campaigns and donations (including transaction data and related personal information of donors and campaign owners) as required to comply with financial regulations, anti-fraud measures, and to have an accurate financial audit trail. Generally, financial transaction records may be kept for a number of years as mandated by law (e.g., up to 5-7 years, depending on local regulations).</li>
                  <li><strong>Legal Compliance and Dispute Resolution:</strong> If we are under a legal obligation to keep certain data (such as for an ongoing investigation, litigation hold, or law enforcement request), or if data is needed for resolving a dispute or enforcing our agreements, we will retain the necessary data for the duration of that obligation or proceeding.</li>
                </ul>
                <p className="mt-4">
                  After the applicable retention period, we will securely dispose of or anonymize your data. Anonymized aggregate data, which no longer identifies you, may be retained indefinitely for analytics and research purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Cookies and Tracking Technologies</h2>
                <p>MyEasyDonate uses cookies and similar tracking technologies to provide and improve our services. Cookies are small text files that are placed on your device (computer, smartphone, etc.) when you visit our website. We use cookies for several purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Functional Cookies:</strong> These are essential for the operation of our site. For example, they help authenticate your login, keep you logged in as you navigate the site, and remember your preferences (such as language or region).</li>
                  <li><strong>Analytical/Performance Cookies:</strong> These cookies help us understand how visitors use our website, which pages are popular, or if any errors occur. This information is used to improve how the website works. We may use third-party analytics tools (like Google Analytics or similar services) that set their own cookies to collect aggregate information about users' interactions with the site.</li>
                  <li><strong>Advertising Cookies:</strong> (If applicable) If we ever display advertising or promoted content, advertising cookies might be used to personalize the ads you see or to measure their effectiveness. (Currently, MyEasyDonate does not host third-party ads, so such cookies are minimal or not used.)</li>
                </ul>
                <p className="mt-4">
                  By using our Platform, you consent to our use of cookies. You can control or delete cookies through your browser settings. For example, you have the option to refuse all or some cookies by adjusting your browser settings. You can also delete cookies that have already been set. However, please note that if you disable or delete cookies, certain features of the Platform might not function properly. For instance, you might have to re-enter your login information more frequently, or some interactive features may be impaired.
                </p>
                <p className="mt-4">
                  For more details about how we use cookies or to find out specific information about the cookies we set, please refer to our Cookies notice (if available) or contact us at support@myeasydonate.com.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Your Rights</h2>
                <p>
                  Depending on your jurisdiction and applicable data protection laws, you may have certain rights regarding your personal information. We honor the rights of users to the extent required by applicable law. These rights may include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Right of Access:</strong> You have the right to request access to the personal data we hold about you and to receive a copy of that information. We will provide this information, subject to verification of your identity, within the timeframe required by law.</li>
                  <li><strong>Right to Rectification:</strong> You have the right to request that we correct or update any of your personal information that is inaccurate or incomplete. You can also update much of your basic account information by logging into your MyEasyDonate account and editing your profile.</li>
                  <li><strong>Right to Deletion:</strong> You have the right to request the deletion of your personal data (also known as the "right to be forgotten"). If you request this and there is no legal necessity for us to keep the data, we will delete or anonymize your information. Do note that certain information cannot be deleted if we are required to keep it for legal reasons (for example, records of financial transactions may be retained for auditing purposes).</li>
                  <li><strong>Right to Withdraw Consent:</strong> If we rely on your consent to process any of your personal data (for example, for sending marketing emails), you have the right to withdraw that consent at any time. Withdrawal of consent will not affect the lawfulness of any processing we conducted prior to your withdrawal. If you opt out of marketing communications, we may still send you transactional or important administrative messages (such as donation confirmations or critical account notices).</li>
                </ul>
                <p className="mt-4">
                  To exercise any of your rights, please contact us at support@myeasydonate.com with your request. We may need to verify your identity before fulfilling certain requests (to ensure that we do not disclose data to the wrong person or make incorrect changes). We will respond to your request within the timeframe required by applicable law.
                </p>
                <p className="mt-4">
                  Please note that some requests (like deleting data) might mean we have to close your account, because we cannot function without certain data. We will inform you if this is the case and see if you want to proceed.
                </p>
                <p className="mt-4">
                  If you have concerns about how your data is handled, you also have the right to lodge a complaint with a relevant data protection authority. In Ghana, you may contact the Data Protection Commission. If you are located in another country, you can reach out to your local data protection regulator.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Changes to this Privacy Policy</h2>
                <p>
                  We may update or revise this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. If we make significant changes, we will notify users by posting the updated policy on our website and updating the Effective Date at the top of the policy. In some cases, we may also notify you via email or through a notice on your account dashboard. It's important that you review any changes to the Privacy Policy.
                </p>
                <p className="mt-4">
                  By continuing to use the Platform after any revisions become effective, you agree to the updated Privacy Policy. If you do not agree with any changes, you should discontinue use of the Platform and, if you have an account, consider deleting it or reaching out to us for assistance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Contact Information</h2>
                <p>
                  If you have any questions, concerns, or complaints regarding these Terms and Conditions or the Privacy Policy, or if you wish to exercise any of your rights related to your personal data, please contact us. The official contact method for MyEasyDonate is via email. You can reach our support team at support@myeasydonate.com. We will do our best to respond promptly and address your needs.
                </p>
                <p className="mt-4">
                  WALTERGATES GHANA LTD is the company responsible for the operation of MyEasyDonate. As of the launch date, our primary business operations are located in Ghana. Should we provide additional contact details (such as a physical address or telephone number) in the future, we will publish that information on our website. For now, please direct all inquiries to our support email.
                </p>
                <p className="mt-4">
                  Thank you for reading our Terms and Conditions and Privacy Policy. We value your trust in MyEasyDonate and are committed to providing a secure, transparent, and positive experience for all our users. By using the Platform, you are helping to make charitable giving and fundraising easier and more accessible. If you have any feedback or suggestions regarding our policies or services, we welcome you to share them with us at the contact email above.
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
