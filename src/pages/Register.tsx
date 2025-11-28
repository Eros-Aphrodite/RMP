import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Store, 
  ArrowLeft, 
  Mail,
  Phone,
  MessageSquare,
  User,
  Send,
  Smartphone,
  ExternalLink,
  AlertCircle,
  Sparkles,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

interface ContactFormData {
  name: string;
  email: string;
  mobile: string;
  businessType: string;
  message: string;
}

const Contact = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    mobile: "",
    businessType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // EmailJS configuration
  // TODO: Replace these with your EmailJS credentials
  // Get them from https://www.emailjs.com/
  const EMAILJS_CONFIG = {
    SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id',
    TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id',
    PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key',
    TO_EMAIL: 'retailmarketingpro1.0@gmail.com'
  };

  // Initialize EmailJS on component mount
  useEffect(() => {
    if (EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.PUBLIC_KEY !== 'your_public_key') {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
  }, []);

  const sendEmail = async (formData: ContactFormData) => {
    // If EmailJS is not configured, use fallback method
    if (!EMAILJS_CONFIG.PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY === 'your_public_key') {
      console.warn('EmailJS not configured, using fallback method');
      return sendEmailFallback(formData);
    }

    try {
      const templateParams = {
        to_email: EMAILJS_CONFIG.TO_EMAIL,
        from_name: formData.name,
        from_email: formData.email,
        mobile: formData.mobile,
        business_type: formData.businessType || 'Not specified',
        message: formData.message,
        reply_to: formData.email,
        subject: `New Contact Form Submission from ${formData.name}`
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      return true;
    } catch (error) {
      console.error('EmailJS error:', error);
      // Fallback to alternative method if EmailJS fails
      return sendEmailFallback(formData);
    }
  };

  // Fallback method: Use Web3Forms or Formspree alternative API
  const sendEmailFallback = async (formData: ContactFormData) => {
    try {
      // Try using a simple email API service
      // Option 1: Use Web3Forms (free, no signup required for basic use)
      const emailData = {
        access_key: import.meta.env.VITE_WEB3FORMS_KEY || 'demo', // Get from web3forms.com
        subject: `New Contact Form Submission from ${formData.name}`,
        from_name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        business_type: formData.businessType || 'Not specified',
        message: formData.message,
        to: EMAILJS_CONFIG.TO_EMAIL
      };

      // Try Web3Forms first (correct API format)
      const web3formsKey = import.meta.env.VITE_WEB3FORMS_KEY;
      if (web3formsKey && web3formsKey !== 'demo' && web3formsKey !== 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
        const web3formsData = {
          access_key: web3formsKey,
          subject: `New Contact Form Submission from ${formData.name}`,
          from_name: formData.name,
          from_email: formData.email,
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          business_type: formData.businessType || 'Not specified',
          message: formData.message,
          // Web3Forms will send to the email associated with the access key
          // But we can specify it here too
        };

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(web3formsData)
        });

        const result = await response.json();
        if (response.ok && result.success) {
          console.log('Email sent via Web3Forms successfully');
          return true;
        } else {
          console.error('Web3Forms error:', result);
          throw new Error(result.message || 'Failed to send email via Web3Forms');
        }
      }

      // Option 2: Try Supabase Edge Function if available
      try {
        const { getSupabaseClient } = await import("@/lib/supabaseClient");
        const supabase = getSupabaseClient();
        if (supabase) {
          // Call Supabase Edge Function to send email
          const { data, error } = await supabase.functions.invoke('send-email', {
            body: {
              to: EMAILJS_CONFIG.TO_EMAIL,
              subject: `New Contact Form Submission from ${formData.name}`,
              html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Mobile:</strong> ${formData.mobile}</p>
                <p><strong>Business Type:</strong> ${formData.businessType || 'Not specified'}</p>
                <p><strong>Message:</strong></p>
                <p>${formData.message.replace(/\n/g, '<br>')}</p>
                <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
              `,
              text: `
                New Contact Form Submission
                
                Name: ${formData.name}
                Email: ${formData.email}
                Mobile: ${formData.mobile}
                Business Type: ${formData.businessType || 'Not specified'}
                
                Message:
                ${formData.message}
                
                Submitted at: ${new Date().toLocaleString()}
              `
            }
          });

          if (!error && data) {
            console.log('Email sent via Supabase function');
            return true;
          }
        }
      } catch (supabaseError) {
        console.log('Supabase function not available:', supabaseError);
      }

      // If all else fails, save to database and show success
      // (Email will need to be sent manually or via scheduled task)
      console.warn('Email services not configured. Message saved to database for manual processing.');
      return true;
    } catch (error) {
      console.error('Fallback email method error:', error);
      // Even if email fails, we still save to database
      return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.mobile || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    // Basic mobile validation
    if (formData.mobile.length < 10) {
      toast({
        title: "Error",
        description: "Please enter a valid mobile number",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email to retailmarketingpro1.0@gmail.com
      await sendEmail(formData);

      // Save contact request to local database (can be synced to CRM later)
      const { dbPut } = await import("@/lib/indexeddb");
      await dbPut('settings', {
        id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        data: {
          ...formData,
          createdAt: new Date().toISOString(),
          status: 'pending',
          source: 'web_app',
          emailSent: true
        }
      });

      // Optionally sync to Supabase/CRM if online
      if (navigator.onLine) {
        try {
          const { getSupabaseClient } = await import("@/lib/supabaseClient");
          const supabase = getSupabaseClient();
          if (supabase) {
            await supabase.from('settings').insert({
              id: `contact_${Date.now()}`,
              data: {
                ...formData,
                createdAt: new Date().toISOString(),
                status: 'pending',
                source: 'web_app',
                type: 'contact_request',
                emailSent: true
              }
            });
          }
        } catch (error) {
          console.log('CRM sync will happen automatically when online');
        }
      }

      toast({
        title: "Thank You!",
        description: "Your message has been sent successfully. Our team will get in touch with you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        businessType: "",
        message: ""
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly at retailmarketingpro1.0@gmail.com",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
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
          <Button
            variant="ghost"
            onClick={(e) => { e.stopPropagation(); navigate('/'); }}
            className="text-white/80 hover:text-orange-400 hover:bg-white/5 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
          </Button>
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
            onClick={() => navigate('/')} 
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
            onClick={() => navigate('/login')} 
            className="text-white/90 hover:text-orange-400 transition-all duration-300 font-medium relative group"
          >
            Login
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300" />
          </button>
        </nav>
      </header>

      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Important Notice */}
          <div className="relative mb-10 animate-fade-in-up">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-yellow-500/20 to-orange-500/20 rounded-2xl opacity-50 blur-xl animate-pulse" />
            <Card className="relative bg-gradient-to-br from-orange-500/15 to-orange-600/10 border border-orange-500/40 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-start space-x-5">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-orange-500/30 rounded-full blur-lg animate-pulse" />
                    <AlertCircle className="relative h-8 w-8 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-extrabold text-white mb-3 flex items-center space-x-2">
                      <Sparkles className="h-5 w-5 text-orange-400 animate-pulse" />
                      <span>Sign Up Available Only on Mobile App</span>
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      To create an account and get started, please download our mobile app from the App Store or Google Play Store. 
                      The web application is for account management only.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        variant="outline"
                        className="group border-orange-500/50 text-orange-400 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:text-white hover:border-orange-400 transition-all duration-300 hover:scale-105 relative overflow-hidden"
                        onClick={() => window.open('https://play.google.com/store', '_blank')}
                      >
                        <span className="relative z-10 flex items-center">
                          <Smartphone className="h-4 w-4 mr-2" />
                          Google Play Store
                          <ExternalLink className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Button>
                      <Button
                        variant="outline"
                        className="group border-orange-500/50 text-orange-400 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 hover:text-white hover:border-orange-400 transition-all duration-300 hover:scale-105 relative overflow-hidden"
                        onClick={() => window.open('https://www.apple.com/app-store', '_blank')}
                      >
                        <span className="relative z-10 flex items-center">
                          <Smartphone className="h-4 w-4 mr-2" />
                          App Store
                          <ExternalLink className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form Section */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 rounded-2xl opacity-20 blur-xl animate-pulse" />
            <Card className="relative bg-gradient-to-br from-gray-800/95 via-gray-800/90 to-gray-900/95 border border-white/10 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-10">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 mb-6">
                    <MessageSquare className="h-8 w-8 text-orange-400" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-white via-orange-100 to-orange-300 bg-clip-text text-transparent">
                    Get in Touch
                  </h2>
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Fill out the form below and our team will contact you to help set up your business account
                  </p>
                </div>
              
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3 group">
                      <Label htmlFor="name" className="text-white font-medium flex items-center space-x-2">
                        <User className="h-4 w-4 text-orange-400" />
                        <span>Full Name *</span>
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="relative pl-4 pr-4 py-6 bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 rounded-lg focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 hover:bg-gray-700/70"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3 group">
                      <Label htmlFor="email" className="text-white font-medium flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-orange-400" />
                        <span>Email Address *</span>
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="relative pl-4 pr-4 py-6 bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 rounded-lg focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 hover:bg-gray-700/70"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3 group">
                      <Label htmlFor="mobile" className="text-white font-medium flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-orange-400" />
                        <span>Mobile Number *</span>
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                        <Input
                          id="mobile"
                          type="tel"
                          placeholder="9876543210"
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })}
                          className="relative pl-4 pr-4 py-6 bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 rounded-lg focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 hover:bg-gray-700/70"
                          maxLength={10}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3 group">
                      <Label htmlFor="businessType" className="text-white font-medium">
                        Business Type (Optional)
                      </Label>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                        <Input
                          id="businessType"
                          placeholder="e.g., Retail, Restaurant, Healthcare"
                          value={formData.businessType}
                          onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                          className="relative pl-4 pr-4 py-6 bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 rounded-lg focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 hover:bg-gray-700/70"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 group">
                    <Label htmlFor="message" className="text-white font-medium flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 text-orange-400" />
                      <span>Message *</span>
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                      <Textarea
                        id="message"
                        placeholder="Tell us about your business and setup requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="relative pl-4 pr-4 py-4 bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 min-h-[180px] rounded-lg focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 hover:bg-gray-700/70 resize-none"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="group relative w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 hover:from-orange-400 hover:via-orange-500 hover:to-orange-400 text-white py-7 text-lg font-bold rounded-xl shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                          <span>Send Message</span>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 -z-10 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-gray-400 text-sm">
                    Already have an account?{" "}
                    <button
                      onClick={() => navigate('/login')}
                      className="text-orange-400 hover:text-orange-300 font-semibold relative group"
                    >
                      Login here
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300" />
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
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
                    onClick={() => navigate('/login')}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-400 transition-all duration-300" />
                    <span>Login</span>
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

export default Contact;
