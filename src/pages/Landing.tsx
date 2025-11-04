import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Store, Building2, BarChart3, Smartphone, MapPin, TrendingUp, CreditCard, ShieldCheck, Users, Sparkles, Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useEffect, useState } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Smartphone,
      title: "Mobile POS",
      description: "Complete mobile point of sale system with location-based billing"
    },
    {
      icon: Building2,
      title: "Multi-Location",
      description: "Manage multiple business locations from one dashboard"
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Track sales, inventory, and performance metrics live"
    }
  ];

  const allFeatures = [
    {
      icon: Building2,
      title: "Multi-Location Management",
      description: "Manage multiple business locations from one dashboard"
    },
    {
      icon: Smartphone,
      title: "Mobile POS Integration",
      description: "Sync with Android POS devices for seamless transactions"
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Track sales, inventory, and performance metrics"
    },
    {
      icon: CreditCard,
      title: "Flexible Pricing Plans",
      description: "Choose between free and paid plans based on your needs"
    },
    {
      icon: Store,
      title: "Industry-Specific Features",
      description: "Customized features for different business types"
    },
    {
      icon: ShieldCheck,
      title: "Transaction Processing",
      description: "Secure payment processing with transparent fees"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div 
          className="absolute w-[800px] h-[800px] bg-orange-500/20 rounded-full blur-[120px] opacity-30 animate-pulse"
          style={{
            left: `${mousePosition.x / 20}px`,
            top: `${mousePosition.y / 20}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-purple-500/10 rounded-full blur-[110px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${15 + Math.random() * 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-50 container mx-auto px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-black/20 border-b border-white/5">
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="relative">
            <Store className="h-7 w-7 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-orange-400 animate-pulse" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white via-orange-100 to-orange-400 bg-clip-text text-transparent group-hover:from-orange-400 group-hover:via-orange-300 group-hover:to-white transition-all duration-300">
            RetailPro
          </span>
        </div>
        <nav className="flex space-x-8 items-center">
          <button 
            onClick={() => navigate('/pricing')} 
            className="text-white/90 hover:text-orange-400 transition-all duration-300 font-medium relative group"
          >
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300" />
          </button>
          <button 
            onClick={() => navigate('/pricing')} 
            className="text-white/90 hover:text-orange-400 transition-all duration-300 font-medium relative group"
          >
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300" />
          </button>
          <button 
            onClick={() => navigate('/contact')} 
            className="text-white/90 hover:text-orange-400 transition-all duration-300 font-medium relative group"
          >
            Support
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300" />
          </button>
          <Button 
            onClick={() => navigate('/login')} 
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
          >
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </nav>
      </header>

      {/* Hero Section - First Landing Page Style */}
      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Section - CTA */}
          <div className="text-white space-y-10 animate-fade-in-up">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-orange-400 animate-pulse" />
                <span className="text-sm font-medium text-orange-300">Premium Business Solution</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-white via-orange-100 to-orange-300 bg-clip-text text-transparent">
                Manage Your Business Like a Pro
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl">
                Complete retail management platform with mobile POS integration, multi-location support, and real-time analytics. Start free or upgrade for advanced features.
              </p>
            </div>
            
            {/* Key Features */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index} 
                    className="group text-center space-y-3 p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-orange-500/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative inline-block">
                      <Icon className="h-10 w-10 mx-auto text-orange-500 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{feature.title}</p>
                  </div>
                );
              })}
            </div>

            <Button
              onClick={() => navigate('/contact')}
              className="group relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 hover:from-orange-400 hover:via-orange-500 hover:to-orange-400 text-white px-10 py-7 text-lg font-bold rounded-xl shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 transition-all duration-300 hover:scale-105 overflow-hidden"
              size="lg"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Get in Touch for Setup</span>
                <Sparkles className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 -z-10 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>

          {/* Right Section - Dashboard Demo */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 rounded-2xl opacity-20 blur-xl animate-pulse" />
            <Card className="relative bg-gradient-to-br from-gray-800/90 via-gray-800/80 to-gray-900/90 border border-white/10 backdrop-blur-xl shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-[1.02]">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-xl">Business Dashboard</h3>
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
                    <div className="text-blue-400 text-4xl font-extrabold mb-1 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      ₹45,280
                    </div>
                    <div className="text-gray-400 text-sm font-medium">Today's Sales</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
                    <div className="text-purple-400 text-4xl font-extrabold mb-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      156
                    </div>
                    <div className="text-gray-400 text-sm font-medium">Transactions</div>
                  </div>
                </div>

                <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20">
                  <div className="text-gray-300 text-sm mb-2 font-medium">Main Store</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-400 text-sm font-semibold">POS Connected • 3 locations active</span>
                    <div className="relative">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-gray-400 text-sm mb-3 font-medium">Recent Activity</div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]">
                      <span className="text-gray-300 text-sm font-medium">Sale #1234</span>
                      <span className="text-white font-bold text-sm bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">₹2,480</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]">
                      <span className="text-gray-300 text-sm font-medium">Sale #1233</span>
                      <span className="text-white font-bold text-sm bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">₹1,250</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Second Landing Page Style - Features Grid */}
      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="text-center mb-16 animate-fade-in-up">
          <Button 
            variant="outline" 
            className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-400 border-orange-500/50 mb-6 px-6 py-2 rounded-full hover:scale-105 transition-all duration-300 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Features
          </Button>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 bg-gradient-to-r from-white via-orange-100 to-orange-300 bg-clip-text text-transparent">
            Everything you need to run your business
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            From single location to multi-chain management, we've got you covered.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <Card className="relative bg-gradient-to-br from-gray-800/90 via-gray-800/80 to-gray-900/90 border border-white/10 backdrop-blur-xl hover:border-orange-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-orange-500/30 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 group-hover:border-orange-400/60 transition-all duration-300">
                          <Icon className="h-6 w-6 text-orange-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className="text-white font-bold text-xl mb-3 group-hover:text-orange-300 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
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
                  RetailPro
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Complete retail management platform with mobile POS integration, multi-location support, and real-time analytics.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-800/50 border border-white/10 flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group">
                  <Facebook className="h-5 w-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-800/50 border border-white/10 flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group">
                  <Twitter className="h-5 w-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-800/50 border border-white/10 flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group">
                  <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-gray-800/50 border border-white/10 flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group">
                  <Instagram className="h-5 w-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
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
                <li>
                  <button 
                    onClick={() => navigate('/login')}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-300" />
                    <span>Login</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-white font-bold mb-4">Features</h3>
              <ul className="space-y-3">
                <li className="text-gray-400 text-sm">Mobile POS Integration</li>
                <li className="text-gray-400 text-sm">Multi-Location Management</li>
                <li className="text-gray-400 text-sm">Real-time Analytics</li>
                <li className="text-gray-400 text-sm">Inventory Tracking</li>
                <li className="text-gray-400 text-sm">Transaction Processing</li>
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
              © {new Date().getFullYear()} RetailPro. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <button 
                onClick={() => navigate('/contact')}
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => navigate('/contact')}
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

export default Landing;

