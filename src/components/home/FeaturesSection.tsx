
import React, { useState } from 'react';
import { Activity, VideoIcon, PillIcon, Map } from 'lucide-react';
import FeatureCard from '@/components/ui/FeatureCard';
import BoothLocator from '@/components/ui/BoothLocator';

const FeaturesSection = () => {
  const [showLocator, setShowLocator] = useState(false);

  const features = [
    {
      title: 'Health Checkup',
      description: 'Monitor vital signs like blood pressure, sugar levels, SpO2, and ECG with advanced AI analysis.',
      icon: <Activity size={24} className="text-medical-600" />,
      path: '/health-checkup'
    },
    {
      title: 'Virtual Doctor',
      description: 'Connect with AI-powered virtual doctors for personalized consultations in your regional language.',
      icon: <VideoIcon size={24} className="text-medical-600" />,
      path: '/virtual-consultation'
    },
    {
      title: 'Medicine Advisor',
      description: 'Receive automatic medicine recommendations for common ailments with dosage guidance.',
      icon: <PillIcon size={24} className="text-medical-600" />,
      path: '/medicine-advisor'
    },
    {
      title: 'Find a Booth',
      description: 'Locate the nearest Smart Health Booth in your area for immediate healthcare access.',
      icon: <Map size={24} className="text-medical-600" />,
      onClick: () => setShowLocator(true)
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <p className="text-muted-foreground">
            Our Smart Health Booths provide comprehensive healthcare solutions for rural communities,
            addressing the challenges of limited healthcare access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              index={index}
              onClick={feature.onClick || (feature.path ? () => window.location.href = feature.path : undefined)}
            />
          ))}
        </div>

        {/* Booth Locator Modal */}
        {showLocator && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-2xl bg-card rounded-xl shadow-lg animate-fade-up overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-lg font-semibold">Find a Smart Health Booth</h3>
                <button 
                  onClick={() => setShowLocator(false)}
                  className="p-1 rounded-md hover:bg-muted transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <BoothLocator />
              </div>
              <div className="p-4 bg-muted/30 border-t border-border flex justify-end">
                <button 
                  onClick={() => setShowLocator(false)}
                  className="px-4 py-2 bg-background border border-border rounded-md hover:bg-muted transition-colors text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesSection;
