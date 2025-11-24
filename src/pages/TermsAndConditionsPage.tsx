import React from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from '@/components/layout/Footer';

const TermsAndConditionsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | MyEasyDonate</title>
        <meta name="description" content="Terms and conditions for MyEasyDonate crowdfunding platform" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-4xl font-bold mb-2 text-gray-900">MyEasyDonate Terms and Conditions</h1>
            <p className="text-sm text-gray-500 mb-8">Effective Date: November 24, 2025</p>
            
            <div className="prose max-w-none text-gray-700 space-y-6">
              <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-900">Terms and Conditions</h2>

              <section>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">1. Introduction</h3>
                <p>
                  Welcome to MyEasyDonate (referred to as "the Platform", "we", "our", or "us"), an online and USSD-based donation platform operated by WALTERGATES GHANA LTD and powered by FalconPay. By creating an account and using our services, you agree to be bound by these Terms and Conditions, our Privacy Policy, and any additional guidelines we may issue from time to time. If you do not agree with these Terms, please do not create an account or use our services. MyEasyDonate serves as an intermediary to connect campaign owners with donors and to process donations. For any questions, complaints, or reports regarding the Platform or these Terms, you may contact us at support@myeasydonate.com.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">2. Definitions</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Platform</strong> – The website www.myeasydonate.com and associated USSD, QR code, and digital payment services.</li>
                  <li><strong>User</strong> – Any individual or organization using the Platform, whether as a donor or a campaign owner.</li>
                  <li><strong>Campaign Owner</strong> – A User who creates a fundraising or donation campaign on the Platform.</li>
                  <li><strong>Donor</strong> – A User who contributes funds to a campaign.</li>
                  <li><strong>Merchant ID</strong> – A unique identifier assigned to each campaign owner upon campaign creation (used for USSD and other payment channels).</li>
                  <li><strong>Service Fee</strong> – The fee we charge on donations, currently 5% of the total funds collected for a campaign, calculated after transaction costs are deducted.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">3. Eligibility</h3>
                <p>To use MyEasyDonate, you must meet the following eligibility criteria:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You must be at least 18 years old to create an account and use the Platform.</li>
                  <li>You must provide accurate and complete information during registration.</li>
                  <li>You must have the legal capacity to enter into binding agreements (e.g., not be legally incapacitated).</li>
                </ul>
                <p className="mt-4">
                  If you are using the Platform on behalf of an organization, you represent that you have the authority to bind that organization to these Terms. The Platform is initially focused on Users in Ghana and other African countries but is accessible globally; as a User, you are responsible for ensuring that your use of the Platform complies with all laws applicable to you.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">4. Account Registration and Security</h3>
                <p>When registering for an account, you agree to the following:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Provide truthful and accurate information:</strong> You must provide current and correct personal or organizational details during sign-up and keep them updated.</li>
                  <li><strong>Account credentials:</strong> You are responsible for maintaining the confidentiality of your account login information (username and password). Do not share your credentials with others.</li>
                  <li><strong>Responsibility for activity:</strong> You are responsible for all activities that occur under your account. Any action taken through your account will be assumed to have been done by you.</li>
                </ul>
                <p className="mt-4">
                  We may require you to verify your identity or provide additional documentation at any time (for example, a government ID or organization registration documents) to ensure compliance with our Know Your Customer (KYC) and fraud-prevention obligations. Failure to provide requested verification information may result in suspension of your account. Please notify us immediately at support@myeasydonate.com if you suspect any unauthorized use of your account.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">5. Services Provided</h3>
                <p>MyEasyDonate provides an integrated platform that enables campaign owners to raise funds and donors to contribute easily. Our core services include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Campaign Creation:</strong> Tools to create a fundraising campaign page, which is assigned a unique Merchant ID for identification.</li>
                  <li><strong>Multiple Donation Channels:</strong> Generation of a QR code and a web link for each campaign, and support for USSD codes, allowing donors to contribute via mobile phones (including basic phones without internet) or online.</li>
                  <li><strong>Notifications:</strong> Automated SMS or email notifications to campaign owners and donors (e.g., to thank donors or confirm contributions).</li>
                  <li><strong>Secure Payment Processing:</strong> Integration with FalconPay for payment processing. All donations are processed through FalconPay's secure gateway, which is PCI-DSS compliant for safe handling of payment information.</li>
                </ul>
                <p className="mt-4">
                  Additional features may be offered, such as campaign visibility boosting or analytics tools, which may be subject to separate guidelines or fees.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">6. Fees and Charges</h3>
                <p>Using MyEasyDonate to create an account or campaign is free; however, certain fees apply to donations:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Platform Service Fee:</strong> We charge a 5% service fee on the total amount of donations collected for a campaign, calculated after any third-party transaction fees are deducted. This service fee is deducted from the campaign's donation pool at the time of disbursement (i.e. at the end of the campaign).</li>
                  <li><strong>Payment Processing Fees:</strong> Payment gateway or mobile money transaction fees (as charged by banks, credit card processors, mobile money providers, etc.) will also apply and are automatically deducted by the payment provider (these fees vary depending on the payment method). The campaign owner will receive the net amount after these costs.</li>
                  <li><strong>Changes to Fees:</strong> All fees are subject to change. If we change the service fee or introduce any new fees, we will provide prior notice (for example, by updating these Terms or informing users via email or Platform notification). Continued use of the Platform after a fee change constitutes acceptance of the new fee structure.</li>
                </ul>
                <p className="mt-4">
                  MyEasyDonate does not charge donors any additional fees on top of their donation amount; donors will only be charged the amount they choose to donate (plus any fees charged by their payment provider, if applicable).
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">7. Acceptable Use of the Platform (Prohibited Activities)</h3>
                <p>When using MyEasyDonate, you agree to use the Platform lawfully and ethically. You agree NOT to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the Platform for any illegal activities, including money laundering, financing of terrorism, fraud, or any other unlawful conduct.</li>
                  <li>Create campaigns that promote violence, hate speech, discrimination, or any content that we deem offensive or inappropriate. This includes content that incites racism, ethnic hatred, religious intolerance, or violent wrongdoing.</li>
                  <li>Misrepresent the purpose of your campaign or misuse the funds donated. In other words, you must use the donations for the purpose you stated when you created the campaign.</li>
                  <li>Post content or create campaigns that infringe upon the intellectual property rights or privacy rights of others. For example, do not use images, videos, or text that you do not have permission to use, and do not impersonate any person or organization.</li>
                  <li>Solicit funds for illegal or highly regulated activities (such as the sale of illegal drugs, weapons, involvement in criminal organizations, gambling operations not licensed in the applicable jurisdiction, etc.).</li>
                  <li>Attempt to interfere with or disrupt the operation of the Platform. This means you must not introduce viruses, malware, or harmful code; attempt to bypass any security measures; or overload the Platform through automated scripts or other means of interference.</li>
                </ul>
                <p className="mt-4">
                  We reserve the right to suspend or terminate any account that violates these conditions and to remove or disable any campaign or content that, in our judgment, breaches these Terms or applicable laws. We may also report any suspicious or illegal activities to the appropriate law enforcement or regulatory authorities. Use of the Platform is a privilege, and any violation of these rules may result in immediate loss of access to MyEasyDonate's services.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">8. Disbursement of Funds</h3>
                <p>MyEasyDonate's role is to facilitate donations from donors to campaign owners. Funds handling and disbursement operate as follows:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Collection and Holding of Donations:</strong> Donations made to a campaign are collected via our payment processor (FalconPay) on behalf of the campaign owner and held securely until disbursement. Donations will typically be disbursed to the campaign owner after the campaign's designated end date (or at periodic intervals for ongoing campaigns, if applicable), with all applicable fees deducted.</li>
                  <li><strong>Verification Before Payout:</strong> Before any funds are disbursed, we may require the campaign owner to complete an identity verification process or provide additional information/documentation to verify the legitimacy of the campaign. This could include verifying your government-issued ID, proof of the cause for which you are raising funds, or other evidence to ensure the campaign is genuine. Failure to comply with verification requests may delay or cancel the disbursement.</li>
                  <li><strong>Disbursement Process:</strong> Once a campaign ends (or reaches a payout milestone) and any required verification is satisfied, the net funds (after fees) will be released to the campaign owner via the payout method provided (such as a bank transfer or mobile money transfer). Timing of the disbursement may vary depending on banking processes or other external factors.</li>
                  <li><strong>Delays and External Factors:</strong> We are not liable for delays or failures in disbursing funds that are due to third-party issues or events outside our control. This includes delays caused by payment processors, banks, mobile money operators, or regulatory clearance. We will make reasonable efforts to resolve any such delays, but the campaign owner acknowledges that some delays are beyond our control.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">9. Refunds</h3>
                <p>Donations made on MyEasyDonate are generally non-refundable. By donating to a campaign, donors understand that their contributions are final and that MyEasyDonate is not obligated to process refunds. However, we recognize that exceptional situations can arise:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>In cases of proven fraud, misrepresentation by a campaign owner, or an unauthorized transaction (for example, if a donor's payment method was used without their permission), we may, at our sole discretion, assist in facilitating a refund to the affected donor. Such refunds, if granted, will typically be returned via the original payment method used, minus any irrecoverable transaction fees.</li>
                  <li>If you believe that a donation you made was fraudulent or made in error, or if you suspect a campaign is engaging in fraudulent activity, please contact us immediately at support@myeasydonate.com. We will review the situation on a case-by-case basis. You may be required to provide information or proof (such as a transaction reference or evidence of fraud) to support a refund request.</li>
                  <li>MyEasyDonate does not guarantee that refunds will be available in any particular case. Any decision to refund is made in good faith in light of our policies, the circumstances of the request, and applicable laws.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">10. Intellectual Property Rights</h3>
                <p>
                  All content provided by MyEasyDonate itself – including but not limited to the Platform's name, logo, branding elements, design, graphics, and software – is the property of WALTERGATES GHANA LTD (or its licensors) and is protected by intellectual property laws. You may not copy, reproduce, distribute, or otherwise use any of MyEasyDonate's proprietary content without our prior written permission.
                </p>
                <p className="mt-4">
                  <strong>User Content:</strong> When you create a campaign or otherwise upload content to the Platform (such as text, images, videos, or other materials associated with your campaign), you retain ownership of your content. However, by submitting or posting User Content on MyEasyDonate, you grant WALTERGATES GHANA LTD a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display that content for the purpose of operating, promoting, or improving the Platform. This license enables us, for example, to display your campaign information to potential donors, feature your campaign in promotional materials or on social media, or make adjustments to how content is presented on different devices.
                </p>
                <p className="mt-4">
                  You represent and warrant that you have all necessary rights to post or use any content that you upload to the Platform. This means that your content must be original to you or properly licensed, and it must not infringe or violate the rights of any third party (including intellectual property rights, privacy, or publicity rights). If your campaign includes images or text that belong to someone else, you must have permission to use them.
                </p>
                <p className="mt-4">
                  We reserve the right to remove or disable any user-submitted content or campaigns that we believe (in our discretion) violate these Terms, infringe on someone else's rights, or for any other valid reason such as a legal request or a policy violation.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">11. Limitation of Liability</h3>
                <p>
                  MyEasyDonate provides the Platform on an "as is" and "as available" basis, without any warranties or guarantees of any kind. We do not warrant that the Platform will be available at all times, uninterrupted, or error-free. While we strive to maintain a high level of service, there may be occasions when the Platform is unavailable or experiences technical issues.
                </p>
                <p className="mt-4">
                  Additionally, MyEasyDonate does not guarantee any particular results or outcomes from using the Platform. For example, we do not guarantee that any campaign will receive a certain amount of donations, or that donors will ultimately contribute to your campaign, nor do we guarantee that campaign owners will use the funds raised for the specific purpose described in their campaign. Campaign owners are solely responsible for fulfilling the objectives of their campaigns and for the proper use of donated funds.
                </p>
                <p className="mt-4">
                  To the fullest extent permitted by law, WALTERGATES GHANA LTD and MyEasyDonate shall not be liable for any indirect, incidental, special, consequential, or exemplary damages arising out of or in connection with your use of the Platform. This includes, without limitation: loss of profits or donations, loss of data, unauthorized access to personal data, cost of procurement of substitute services, or any other intangible losses, even if we have been advised of the possibility of such damages. We are not responsible for any disputes or disagreements between Users (for example, between a donor and a campaign owner); however, we may, at our discretion, facilitate communication or resolution in good faith.
                </p>
                <p className="mt-4">
                  Nothing in these Terms is intended to exclude or limit any condition, warranty, right or liability which may not be lawfully excluded or limited. Because some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability for consequential or incidental damages, some of the above limitations may not apply to you. In such jurisdictions, MyEasyDonate's liability will be limited to the greatest extent permitted by law.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">12. Indemnification</h3>
                <p>
                  You agree to indemnify and hold harmless WALTERGATES GHANA LTD, its officers, directors, employees, agents, and partners from and against any and all claims, liabilities, damages, losses, or expenses (including reasonable attorneys' fees and legal costs) that arise from or relate to your use of the Platform, your violation of these Terms, or your violation of any rights of a third party. This means that if a third party makes a claim against MyEasyDonate or WALTERGATES GHANA LTD because of something you did (for example, posting illegal content or misusing funds), you will be responsible for any costs or damages we incur as a result of your actions. We will promptly notify you of any such claim and, where possible, give you an opportunity to assist in the defense or settlement of the matter.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">13. Changes to Terms</h3>
                <p>
                  We reserve the right to modify or update these Terms and Conditions at any time. If we make material changes, we will post the updated Terms on the Platform and update the "Effective Date" at the top of the document. It is your responsibility to review the Terms periodically for updates. Your continued use of the Platform after any changes to the Terms have been posted will signify your acceptance of the revised Terms. If you do not agree to the updated Terms, you must stop using the Platform and (if applicable) close your account.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">14. Governing Law and Jurisdiction</h3>
                <p>
                  These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of Ghana. You agree that any dispute or claim arising out of or in connection with these Terms or your use of the Platform shall be subject to the exclusive jurisdiction of the courts of Ghana. We and you each consent to the jurisdiction of such courts. If you are accessing or using the Platform from a jurisdiction outside Ghana, please be aware that you do so at your own risk and are responsible for compliance with local laws.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">15. Severability</h3>
                <p>
                  If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, that provision shall be severed (removed) from the Terms. The remaining provisions of the Terms will remain in full force and effect and continue to be binding and enforceable. Our failure to enforce any particular provision in one instance shall not affect our right to enforce it in the future.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">16. Entire Agreement</h3>
                <p>
                  These Terms and Conditions (together with the Privacy Policy and any additional guidelines or terms provided by MyEasyDonate for specific services or features) constitute the entire agreement between you and WALTERGATES GHANA LTD regarding your use of the MyEasyDonate Platform. This means they supersede all prior or contemporaneous agreements, understandings, or communications between you and us, whether written or oral, relating to the subject matter herein. You acknowledge that you have not relied on any representation, warranty, or agreement relating to the Platform that is not expressly set out in these Terms.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">17. Waiver</h3>
                <p>
                  No failure or delay by MyEasyDonate in exercising any right, power, or remedy under these Terms shall operate as a waiver of that right, power, or remedy. Similarly, if we do not enforce a provision of these Terms in one instance, it does not mean we have waived our right to enforce it in the future. Any waiver of rights by MyEasyDonate must be explicit and in writing to be effective.
                </p>
              </section>

              <section>
                <p className="text-sm text-gray-500 mt-8">
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

export default TermsAndConditionsPage;
