"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

function App() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      >
        {/* Orange gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/90 via-orange-500/85 to-yellow-400/90"></div>
      </div>

      {/* Geometric decorative elements */}
      <div className="absolute top-10 left-10 w-8 h-0.5 bg-black/60 transform rotate-45 z-10"></div>
      <div className="absolute top-16 left-16 w-8 h-0.5 bg-black/60 transform -rotate-45 z-10"></div>
      
      <div className="absolute top-20 right-20 w-12 h-0.5 bg-black/60 transform rotate-45 z-10"></div>
      <div className="absolute top-24 right-24 w-12 h-0.5 bg-black/60 transform -rotate-45 z-10"></div>
      
      <div className="absolute bottom-20 left-1/4 w-10 h-0.5 bg-black/60 transform rotate-12 z-10"></div>
      <div className="absolute bottom-16 left-1/4 w-10 h-0.5 bg-black/60 transform -rotate-12 z-10"></div>
      
      <div className="absolute bottom-32 right-10 w-10 h-0.5 bg-black/60 transform rotate-45 z-10"></div>
      <div className="absolute bottom-28 right-14 w-10 h-0.5 bg-black/60 transform -rotate-45 z-10"></div>

      {/* Abstract line patterns */}
      <div className="absolute left-0 top-1/3 w-1/3 h-32 opacity-20 z-10">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <path d="M10,50 Q50,10 90,50 T170,50" stroke="currentColor" strokeWidth="3" fill="none" className="text-white"/>
          <path d="M5,60 Q45,20 85,60 T165,60" stroke="currentColor" strokeWidth="2" fill="none" className="text-white"/>
          <path d="M15,40 Q55,0 95,40 T175,40" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-white"/>
        </svg>
      </div>

      <div className="flex h-screen relative z-20">
        {/* Left side - Food images with dark overlay */}
        <div className="w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>
          
          <div className="absolute top-8 left-8 z-30">
            <div className="text-white font-bold text-xl tracking-wider">
              HARRIS <span className="text-gray-200">GRIS</span>
            </div>
          </div>
          
          <div className="h-full flex flex-col justify-center items-center p-8 relative z-20">
            {/* Main salad image - superposed */}
            <div className="relative mb-8">
              <div className="w-72 h-72 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border-4 border-white/30 shadow-2xl">
                <Image 
                  src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop" 
                  alt="Fresh salad" 
                  width={96}
                  height={96}
                  className="w-64 h-64 rounded-full object-cover shadow-xl"
                />
              </div>
              {/* Decorative ring around main image */}
              <div className="absolute -top-2 -left-2 w-76 h-76 rounded-full border-2 border-white/20"></div>
            </div>
            
            {/* Bottom food images - superposed */}
            <div className="flex space-x-8">
              <div className="w-28 h-28 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border-3 border-white/30 shadow-xl">
                <Image 
                  src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop" 
                  alt="Avocado toast" 
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
              <div className="w-24 h-24 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl border-2 border-white/50">
                <Image 
                  src="https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop" 
                  alt="Healthy bowl" 
                  width={96}
                  height={96}
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form with enhanced overlay */}
        <div className="w-1/2 relative">
          {/* Background decorative circles */}
          <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-white/15 opacity-60 backdrop-blur-sm"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-white/10 opacity-50 backdrop-blur-sm"></div>
          <div className="absolute top-1/2 right-32 w-32 h-32 rounded-full bg-white/20 opacity-40 backdrop-blur-sm"></div>

          <div className="h-full bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-lg flex items-center justify-center p-12 relative">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}></div>
            </div>

            <div className="w-full max-w-sm relative z-10">
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-wide">BIENVENUE À VOTRE ESPACE!</h1>
              </div>

              <div className="space-y-6">
                {/* Email field */}
                <div className="relative">
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="w-full px-5 py-4 bg-gray-100/90 backdrop-blur-sm border-0 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-3 focus:ring-green-500/30 focus:bg-white/95 transition-all duration-300 shadow-lg"
                  />
                </div>

                {/* Password field */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full px-5 py-4 bg-gray-100/90 backdrop-blur-sm border-0 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-3 focus:ring-green-500/30 focus:bg-white/95 transition-all duration-300 pr-14 shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>

                {/* Forgot password link */}
                <div className="text-right">
                  <a href="#" className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors">
                    Mot de passe oublié?
                  </a>
                </div>

                {/* Login button */}
                <Link href="/proprio">
                 <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5">
                  Login
                </button>
                </Link>

               

                {/* SAU divider */}
                <div className="text-center py-2">
                  <span className="text-sm text-green-600 font-semibold bg-white/80 px-4 py-1 rounded-full">OU</span>
                </div>

                {/* Social login buttons */}
                <div className="flex space-x-4">
                  <button className="flex-1 bg-white/90 hover:bg-white backdrop-blur-sm border border-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Google</span>
                  </button>
                  
                  <button className="flex-1 bg-[#1877F2] hover:bg-[#166FE5] text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;