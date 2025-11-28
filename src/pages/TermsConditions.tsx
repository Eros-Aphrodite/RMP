import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Store, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

const TermsConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
      {/* Header */}
      <header className="relative z-50 container mx-auto px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-black/20 border-b border-white/5">
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate('/')}>
          <Store className="h-7 w-7 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-2xl font-bold bg-gradient-to-r from-white via-orange-100 to-orange-400 bg-clip-text text-transparent">
            Retail Marketing Pro
          </span>
        </div>
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="text-white hover:text-orange-400"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <Card className="bg-gradient-to-br from-gray-800/90 via-gray-800/80 to-gray-900/90 border border-white/10 backdrop-blur-xl">
          <CardContent className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 bg-gradient-to-r from-white via-orange-100 to-orange-300 bg-clip-text text-transparent">
              Terms & Conditions
            </h1>
            <p className="text-gray-400 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="prose prose-invert max-w-none space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                We at Retail Marketing Pro (the "Business" "we" or "us" in this Privacy Policy), operator of the web site at www.retailmarketingpro.in (the "Site"), understand the importance of the privacy of users of the Site, and in particular of protecting their personal information. We have therefore put in place this Privacy Policy, in order to inform you fully of our privacy practices, and to permit you to contact us with any concerns, questions, or corrections regarding your personal information in our possession.
              </p>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Accountability</h2>
                <p>
                  The Business has provided this privacy policy for ensuring compliance. Should you have any questions regarding this policy or concerns with respect to Business`s compliance, you may contact us.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Identifying Purpose of Collection</h2>
                <p>
                  We collect various personal information from you when you seek our products or services, make an online reservation, sing-up to our VIP newsletter membership or any inquiry through the Site. Information collected may include your:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Full Name</li>
                  <li>Company Name</li>
                  <li>Address(es)</li>
                  <li>Telephone and Facsimile number(s)</li>
                  <li>Email address(es)</li>
                  <li>Gender</li>
                  <li>Interest(s)</li>
                </ul>
                <p className="mt-4">
                  We collect this information in order to permit us to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Verify your identity,</li>
                  <li>Permit us to contact you to provide goods and services requested by you,</li>
                  <li>Provide you with periodic updates regarding the Site and our products and services.</li>
                </ul>
                <p className="mt-4">
                  We may also use such information to build a profile of your interests as they relate to the Site or Business so that we will be able to suggest or provide products or services of interest to you in the future.
                </p>
                <p className="mt-4">
                  We do not collect information which we do not reasonably require in order to fulfill these purposes.
                </p>
                <p className="mt-4">
                  Further, the Site automatically collects certain information every time you visit it:
                </p>
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">a) Cookies</h3>
                    <p>
                      A cookie is a small non-executable file that is stored on your hard drive for the purpose of identifying your computer. While it is possible to view and to acquire products and services from the site with your browser`s security settings set to prevent cookies from being used, your online experience may be greatly reduced.
                    </p>
                    <p className="mt-2">
                      Business uses both session cookies and permanent cookies at Site only after you have created a user account on the platform. Session cookies are active only during the period you are logged on to the Site and are removed when you leave.
                    </p>
                    <p className="mt-2">
                      Permanent cookies remain on your hard drive until you remove them through your browser`s Internet security settings. Permanent cookies are used to store login information and user preferences and thus eliminate you're having to make the same entries on each visit.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">b) Conversion Beacons</h3>
                    <p>
                      The Business also uses Conversion Beacons (short bits of HTML computer code) inserted in the source code of designated website pages. These beacons, used with industry standard browser cookie technology and standard Html coding, allow us to track analytics to the Site and email flow between you and us. Email recipients who receive a Conversion Beacon enabled email message will receive a small unique cookie that is stored in their browser session, which is later used to connect the email recipient with the subsequent recipient activity on the Site.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Consent and CEMs</h2>
                <p>
                  When you acquire any product or service on or through the Site, or you provide any information at our request, your action constitutes consent to our collection and use of such information as permitted in this Privacy Policy.
                </p>
                <p className="mt-2">
                  Express consent is obtained when you explicitly toggle the opt-in check-box to agree to express permission for us to send you commercial electronic messages ("CEM").
                </p>
                <p className="mt-2">
                  Implied consent is obtained when you have purchased our goods or services and have provided your email address from a reservation, comment form, coupon or other methods.
                </p>
                <p className="mt-2">
                  Email communications are sent from a software provided by Retail Marketing Pro. All email communications include the Business name, contact and a mechanism that allows the recipient to unsubscribe at no cost.
                </p>
                <p className="mt-2">
                  Please note that if you do not wish to receive emails from us, you may opt-out automatically of such material by clicking on the unsubscribe link found in the email communication sent to you by our Business.
                </p>
                <p className="mt-2">
                  You may also opt-out of certain other uses of your data by contacting us.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Limiting Collection</h2>
                <p>
                  The Business will limit the collection of personal information to that which reasonably necessary to fulfill the purpose for which it was collected.
                </p>
                <p className="mt-2">
                  Research and survey data is reported back to Business as aggregated data with no reference to individual customers.
                </p>
                <p className="mt-2">
                  Customers who do not wish to be contacted for research or survey purposes should contact us.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Limiting Use, Disclosure, and Retention</h2>
                <p>
                  We will not use or disclose your personal information for purposes other than those for which it was collected without your consent or as permitted or required by law.
                </p>
                <p className="mt-2">
                  However, we do use the services of third parties to complete certain electronic requests such as reservations, newsletter sign-ups along with any other 3rd party widgets, and your personal information may, therefore, be transmitted to such third parties for such purposes. If your personal data is to be transmitted to another party for processing or storage, we use contractual and other means to ensure that your personal information is protected in accordance with PIPEDA.
                </p>
                <p className="mt-2">
                  Your user data will be stored by Retail Marketing Pro, a product developed by Retail Marketing Pro.
                </p>
                <p className="mt-2">
                  Your personal information is retained only for as long as necessary to fulfill the purposes for which it was collected unless the law requires longer retention.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Accuracy</h2>
                <p>
                  In order to maintain the highest levels of accuracy regarding your personal information, to the extent possible we permit you to enter such information into our systems yourself. In some instances, however, we are required to enter such information, for instance upon speaking to you over the phone or some other type of communication (provided by you or otherwise).
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Safeguards</h2>
                <p>
                  While in our possession (or the possession of any entity engaged by us to house or store it) and regardless of the format in which it is held, your personal information is protected against theft, loss and/or unauthorized access, disclosure, copying, use or modification by security safeguards appropriate to the sensitivity of the information.
                </p>
                <p className="mt-2">
                  Some personal information entered by you into our systems may be encrypted as it travels over the Internet. Depending on your web browser you may see a secure webpage indicator, for example, a closed lock in the lower right-hand corner of your browser. We may use the Secure Socket Layer (SSL) protocol to encrypt some personal information as it travels from your computer to our systems.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Openness</h2>
                <p>
                  Business`s privacy practices are as outlined within this policy. If you have any questions or comments, please contact us.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Individual Access</h2>
                <p>
                  With certain limited exceptions, you have a right to access your personal information held by the Business. You may access your personal information by contacting us.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Changes to the Privacy Policy</h2>
                <p>
                  Business reserves the right to modify this privacy statement at any time, so please review it frequently. If we make material changes to this policy we will notify you on our homepage and other places we deem appropriate so that you are aware of what information we collect how we use it, and under what circumstances, if any, we disclose it.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white mt-8 mb-4">Refund and Cancellation Policy</h2>
                <p>
                  All refund amounts shall be credited to your account within 5-7 business days in accordance with the terms that may be stipulated by the bank which has issued the credit/debit card.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Store className="h-6 w-6 text-orange-500" />
                <span className="text-xl font-bold bg-gradient-to-r from-white via-orange-100 to-orange-400 bg-clip-text text-transparent">
                  Retail Marketing Pro
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Complete retail management platform with mobile POS integration, multi-location support, and real-time analytics.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=61578900585501" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800/50 border border-white/10 flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group"
                >
                  <Facebook className="h-5 w-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                </a>
                <a 
                  href="https://x.com/IndiaRetailPro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800/50 border border-white/10 flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group"
                >
                  <Twitter className="h-5 w-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                </a>
                <a 
                  href="https://www.instagram.com/indiaretailpro/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800/50 border border-white/10 flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group"
                >
                  <Instagram className="h-5 w-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                </a>
                <a 
                  href="https://www.youtube.com/@RetailMARKETINGPRO" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800/50 border border-white/10 flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group"
                >
                  <Youtube className="h-5 w-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => navigate('/')}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-300" />
                    <span>Home</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/pricing')}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-300" />
                    <span>Features</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/pricing')}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-300" />
                    <span>Pricing</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/contact')}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-300" />
                    <span>Support</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => navigate('/privacy')}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-300" />
                    <span>Privacy Policy</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/terms')}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-300" />
                    <span>Terms of Service</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-bold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <a href="mailto:retailmarketingpro1.0@gmail.com" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">
                    retailmarketingpro1.0@gmail.com
                  </a>
                </li>
                <li className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400 text-sm">+91 98765 43210</span>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400 text-sm">India</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Retail Marketing Pro. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <button 
                onClick={() => navigate('/privacy')}
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => navigate('/terms')}
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsConditions;

