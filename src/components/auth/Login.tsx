import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Lock, ArrowRight, Store, Smartphone, Sparkles, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { BusinessType } from "@/components/BusinessSelector";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { dbGetAll, setCurrentUser } from "@/lib/indexeddb";

interface LoginProps {
  onLogin?: (credentials: { username: string; password: string; rememberMe: boolean; businessType: BusinessType }) => void;
}

export function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    rememberMe: false,
    businessType: '' as BusinessType
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      toast({
        title: "Success",
        description: location.state.message,
      });
    }
  }, [location]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    
    try {
      // Step 1: Try IndexedDB first (like mobile app) - fastest and most reliable
      console.log('[Login] Trying IndexedDB authentication first...');
      const users = await dbGetAll<any>('users');
      
      // Debug: Log what we're looking for and what we have
      console.log('[Login] Searching for username:', credentials.username);
      console.log('[Login] Total users in IndexedDB:', users.length);
      if (users.length > 0) {
        console.log('[Login] Sample user from IndexedDB:', {
          email: users[0].email,
          mobile: users[0].mobile,
          hasPassword: !!users[0].password,
          allKeys: Object.keys(users[0])
        });
      }
      
      // Case-insensitive and field-variation tolerant search
      const foundUser = users.find((u: any) => {
        // Normalize field names (handle both camelCase and lowercase)
        const userEmail = (u.email || u.Email || '').toLowerCase().trim();
        const userMobile = (u.mobile || u.Mobile || '').trim();
        const searchValue = credentials.username.toLowerCase().trim();
        
        // Check email match (case-insensitive)
        const emailMatch = userEmail === searchValue;
        
        // Check mobile match (exact, no case needed for numbers)
        const mobileMatch = userMobile === credentials.username.trim();
        
        // Get password field (handle variations)
        const userPassword = u.password || u.Password || '';
        
        const usernameMatches = emailMatch || mobileMatch;
        const passwordMatches = userPassword === credentials.password;
        
        console.log('[Login] Checking user:', {
          email: userEmail,
          mobile: userMobile,
          emailMatch,
          mobileMatch,
          passwordMatch: passwordMatches,
          usernameMatches
        });
        
        return usernameMatches && passwordMatches;
      });

      if (foundUser) {
        console.log('[Login] ✅ Found user in IndexedDB:', foundUser);
        // IndexedDB login successful
        // Normalize field names for consistency
        const userData = {
          ...foundUser,
          ownerName: foundUser.ownerName || foundUser.ownername || foundUser.OwnerName,
          email: foundUser.email || foundUser.Email,
          mobile: foundUser.mobile || foundUser.Mobile,
        };
        
        await setCurrentUser(userData);
        // Also save to localStorage for immediate access
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        const userBusinessType = foundUser.businessType || foundUser.businesstype || foundUser.businessid || 'retail';
        
        if (onLogin) {
          onLogin({
            ...credentials,
            businessType: userBusinessType as BusinessType
          });
        } else {
          navigate("/app", { 
            state: { 
              user: userData,
              businessType: userBusinessType 
            } 
          });
        }
        
        toast({
          title: "Success",
          description: `Logged in successfully! Welcome back, ${userData.ownerName || userData.email || 'User'}`,
        });
        setLoading(false);
        return;
      } else {
        console.log('[Login] ❌ User not found in IndexedDB with matching credentials');
        console.log('[Login] Available users:', users.map((u: any) => ({
          email: u.email || u.Email,
          mobile: u.mobile || u.Mobile,
          hasPassword: !!u.password
        })));
      }

      // Step 2: Try api.registrations table (has passwords)
      const supabase = getSupabaseClient();
      if (supabase) {
          console.log('[Login] Checking api.registrations table...');
          try {
            const { data: registration, error: regError } = await supabase
              .from('registrations')
              .select('*')
              .or(`email.eq.${credentials.username},mobile.eq.${credentials.username}`)
              .eq('password', credentials.password)
              .maybeSingle();
            
            if (regError) {
              console.log('[Login] Error checking registrations:', regError);
            }
            
            if (registration) {
              console.log('[Login] ✅ Found user in api.registrations');
              // Fetch profile from api.users
              const { data: userProfile } = await supabase
                .from('users')
                .select('*')
                .or(`email.eq.${registration.email || credentials.username},mobile.eq.${credentials.username}`)
                .maybeSingle();
              
              const userData = {
                id: userProfile?.id || registration.id,
                email: registration.email || userProfile?.email || credentials.username,
                mobile: registration.mobile || userProfile?.mobile,
                ownerName: registration.ownername || userProfile?.ownername,
                businessType: registration.businesstype || userProfile?.businessid,
                ...(userProfile || {}),
                ...registration,
              };
              
              await setCurrentUser(userData);
              // Also save to localStorage for immediate access
              localStorage.setItem('currentUser', JSON.stringify(userData));
              
              const userBusinessType = userData.businessType || userData.businessid || 'retail';
              
              if (onLogin) {
                onLogin({
                  ...credentials,
                  businessType: userBusinessType as BusinessType
                });
              } else {
                navigate("/app", { 
                  state: { 
                    user: userData,
                    businessType: userBusinessType 
                  } 
                });
              }
              
              toast({
                title: "Success",
                description: `Logged in successfully! Welcome back, ${userData.ownerName || userData.email}`,
              });
              setLoading(false);
              return;
            } else {
              console.log('[Login] User not found in api.registrations');
            }
          } catch (regCheckError) {
            console.log('[Login] Error checking api.registrations:', regCheckError);
          }
      }

      // If all authentication methods failed, show detailed error
      console.error('[Login] ❌ All authentication methods failed');
      console.error('[Login] Username searched:', credentials.username);
      console.error('[Login] Password provided:', credentials.password ? '***' : 'empty');
      
      toast({
        title: "Error",
        description: "Invalid credentials. Please check your mobile number/email and password. Sign up is available only through our mobile app.",
        variant: "destructive",
      });
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to login. Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 flex items-center justify-center p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[100px] opacity-30 animate-pulse"
          style={{
            left: `${mousePosition.x / 15}px`,
            top: `${mousePosition.y / 15}px`,
            transition: 'all 0.5s ease-out'
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[90px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-purple-500/10 rounded-full blur-[95px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_110%)]" />
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${12 + Math.random() * 8}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="relative">
              <Store className="h-6 w-6 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-orange-400 animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white via-orange-100 to-orange-400 bg-clip-text text-transparent">
              RetailPro
            </span>
          </div>
          <nav className="flex space-x-3 text-sm">
            <button 
              onClick={() => navigate('/')} 
              className="text-white/80 hover:text-orange-400 transition-all duration-300 relative group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300" />
            </button>
            <button 
              onClick={() => navigate('/pricing')} 
              className="text-white/80 hover:text-orange-400 transition-all duration-300 relative group"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300" />
            </button>
            <button 
              onClick={() => navigate('/contact')} 
              className="text-white/80 hover:text-orange-400 transition-all duration-300 relative group"
            >
              Support
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300" />
            </button>
          </nav>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500 rounded-2xl opacity-20 blur-xl animate-pulse" />
          <Card className="relative bg-gradient-to-br from-gray-800/95 via-gray-800/90 to-gray-900/95 border border-white/10 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 mb-4">
              <Lock className="h-8 w-8 text-orange-400" />
            </div>
            <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-white via-orange-100 to-orange-300 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <p className="text-gray-400 mt-2 text-sm">Login to your RetailPro account</p>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="username" className="text-white font-medium flex items-center space-x-2">
                  <User className="h-4 w-4 text-orange-400" />
                  <span>Mobile Number / Email</span>
                </Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter mobile or email"
                      className="pl-12 pr-4 py-6 bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 rounded-lg focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 hover:bg-gray-700/70"
                      value={credentials.username}
                      onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="password" className="text-white font-medium flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-orange-400" />
                  <span>Password</span>
                </Label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      className="pl-12 pr-4 py-6 bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 rounded-lg focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 hover:bg-gray-700/70"
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={credentials.rememberMe}
                    onCheckedChange={(checked) => 
                      setCredentials(prev => ({ ...prev, rememberMe: checked as boolean }))
                    }
                    className="border-gray-600"
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-gray-300">Remember me</Label>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="group relative w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 hover:from-orange-400 hover:via-orange-500 hover:to-orange-400 text-white py-6 text-base font-bold rounded-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <span>Login</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 -z-10 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>

              <div className="text-center pt-6 space-y-4">
                <div className="relative group bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/30 rounded-xl p-5 backdrop-blur-sm hover:border-orange-400/50 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-start space-x-3">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-orange-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Smartphone className="relative h-6 w-6 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-white text-sm font-bold mb-2 flex items-center space-x-2">
                        <Sparkles className="h-4 w-4 text-orange-400 animate-pulse" />
                        <span>New to RetailPro?</span>
                      </p>
                      <p className="text-gray-300 text-xs mb-3 leading-relaxed">
                        Sign up is only available through our mobile app. Download from:
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => window.open('https://play.google.com/store', '_blank')}
                          className="px-3 py-1.5 bg-gradient-to-r from-orange-500/20 to-orange-600/10 border border-orange-500/30 text-orange-400 hover:text-orange-300 hover:border-orange-400/50 text-xs font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                        >
                          Google Play
                        </button>
                        <button
                          type="button"
                          onClick={() => window.open('https://www.apple.com/app-store', '_blank')}
                          className="px-3 py-1.5 bg-gradient-to-r from-orange-500/20 to-orange-600/10 border border-orange-500/30 text-orange-400 hover:text-orange-300 hover:border-orange-400/50 text-xs font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                        >
                          App Store
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  Need help?{" "}
                  <button
                    type="button"
                    onClick={() => navigate('/contact')}
                    className="text-orange-400 hover:text-orange-300 font-semibold relative group"
                  >
                    Contact Us
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300" />
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="relative z-10 mt-12 pt-8 border-t border-white/10">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <button 
                onClick={() => navigate('/')}
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Home
              </button>
              <span className="text-gray-600">•</span>
              <button 
                onClick={() => navigate('/pricing')}
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Pricing
              </button>
              <span className="text-gray-600">•</span>
              <button 
                onClick={() => navigate('/contact')}
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Support
              </button>
            </div>
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <a href="mailto:retailmarketingpro1.0@gmail.com" className="hover:text-orange-400 transition-colors">
                  retailmarketingpro1.0@gmail.com
                </a>
              </div>
            </div>
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} RetailPro. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}