import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, BookOpen } from 'lucide-react';

const LandingPage = () => {
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 4000);

    const navigationTimer = setTimeout(() => {
      navigate('/entry');
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-orange-900 via-orange-800 to-orange-700">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-orange-300 rounded-full animate-bounce delay-100"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-orange-200 rounded-full animate-bounce delay-300"></div>
      <div className="absolute bottom-40 left-20 w-5 h-5 bg-orange-400 rounded-full animate-bounce delay-500"></div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="bg-cream/20 backdrop-blur-sm rounded-full p-6">
            <BookOpen className="w-16 h-16 text-cream" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-wide">
          JOSEPH
          <span className="block text-2xl md:text-3xl font-normal text-orange-200 mt-2">
            Revision Platform
          </span>
        </h1>

        {/* Scrolling Marquee */}
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-8 overflow-hidden">
          <div className="whitespace-nowrap animate-marquee">
            <span className="text-white text-lg md:text-xl font-medium">
              "Hey Dear, we are 0.44 behind. ISSACHAR. You know what that means? We need to prepare extraordinarily with God on our side 😊"
            </span>
          </div>
        </div>

        {/* Loading Spinner */}
        {showLoading && (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-12 h-12 text-orange-200 animate-spin" />
            <p className="text-white/80 text-lg">Preparing your revision journey...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;