
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CtaSectionProps {
  onGetStartedClick?: () => void;
}

const CtaSection = ({ onGetStartedClick }: CtaSectionProps) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-br from-medical-600 to-healing-600 rounded-2xl p-8 md:p-12">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-white/10 rounded-full filter blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to experience the future of rural healthcare?
              </h2>
              <p className="text-white/80 text-lg">
                Try our Smart Health Booth technology today and see how it can transform healthcare access in your community.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onGetStartedClick}
                className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-base font-medium text-medical-600 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-medical-600 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <Link
                to="/health-checkup"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-base font-medium text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-medical-600 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
