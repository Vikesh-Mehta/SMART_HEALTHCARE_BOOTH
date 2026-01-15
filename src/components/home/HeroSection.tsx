
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  boothImage: string;
  onGetStartedClick?: () => void;
}

const HeroSection = ({ boothImage, onGetStartedClick }: HeroSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-background to-accent/30">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className={`flex-1 max-w-2xl transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm font-medium mb-6">
              <span className="h-2 w-2 rounded-full bg-healing-500 mr-2"></span>
              <span>Rural Healthcare Innovation</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Smart Health Booths for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-600 to-healing-600">
                Rural Communities
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              AI-integrated self-service healthcare available 24/7, bringing medical assistance closer to rural areas without requiring a full hospital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onGetStartedClick}
                className="inline-flex items-center justify-center rounded-lg bg-medical-600 px-5 py-3 text-base font-medium text-white hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-medical-600 focus:ring-offset-2 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <Link
                to="/health-checkup"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-3 text-base font-medium hover:bg-muted focus:outline-none focus:ring-2 focus:ring-medical-600 focus:ring-offset-2 transition-colors"
              >
                Try Health Checkup
              </Link>
            </div>
          </div>
          <div className={`flex-1 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-medical-400/10 rounded-full filter blur-xl animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-healing-400/10 rounded-full filter blur-xl animate-pulse delay-700"></div>
              <div className="relative bg-gradient-to-br from-medical-50 to-transparent border border-border rounded-2xl overflow-hidden shadow-lg">
                {boothImage && (
                  <img 
                    src={boothImage} 
                    alt="Smart Health Booth in rural setting with holographic doctor interface" 
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      console.error("Image failed to load:", boothImage);
                      e.currentTarget.src = "/image.svg";
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold mb-2">Smart Telehealth Booth</h3>
                  <p className="text-sm text-foreground/80">AI-integrated self-service healthcare for rural communities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
