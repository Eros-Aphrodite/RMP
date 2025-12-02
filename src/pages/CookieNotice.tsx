import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Store, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

const CookieNotice = () => {
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
              Cookie Notice – RMP
            </h1>
            <p className="text-gray-400 mb-8">
              Updated: 2025.12.01
            </p>

            <div className="prose prose-invert max-w-none space-y-6 text-gray-300 leading-relaxed">
              <section className="space-y-4">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Essential cookies for login and session management</li>
                  <li>Optional anonymous analytics may be used</li>
                  <li>No marketing or tracking cookies</li>
                  <li>Cookies do not store personal or financial information</li>
                  <li>Users can manage cookies via browser settings</li>
                </ul>
              </section>

              <section className="space-y-4 mt-8">
                <p className="text-lg">
                  <strong className="text-white">Contact:</strong>{" "}
                  <a 
                    href="mailto:retailmarketingpro1.0@gmail.com" 
                    className="text-orange-400 hover:text-orange-300 transition-colors underline"
                  >
                    retailmarketingpro1.0@gmail.com
                  </a>
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
                <li>
                  <button 
                    onClick={() => navigate('/refund')}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-300" />
                    <span>Refund & Cancellation Policy</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/disclaimer')}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-300" />
                    <span>Disclaimer</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/cookies')}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-300" />
                    <span>Cookie Notice</span>
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
                  <span className="text-gray-400 text-sm">+91 8910921128</span>
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
              <button 
                onClick={() => navigate('/refund')}
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Refund & Cancellation Policy
              </button>
              <button 
                onClick={() => navigate('/disclaimer')}
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Disclaimer
              </button>
              <button 
                onClick={() => navigate('/cookies')}
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Cookie Notice
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CookieNotice;

