
import React from 'react';
import { Map, HeartPulse, Brain, PillIcon, ArrowRight } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      title: 'Walk-in Access',
      description: 'Villagers enter the Smart Health Booth at any time, eliminating long-distance travel and reducing waiting times.',
      icon: <Map size={40} className="text-medical-600" />,
      number: '01'
    },
    {
      title: 'AI-Powered Health Checkups',
      description: 'Built-in sensors monitor vital signs such as blood pressure, blood sugar, oxygen levels, and ECG.',
      icon: <HeartPulse size={40} className="text-medical-600" />,
      number: '02'
    },
    {
      title: 'Holographic AI Doctor',
      description: 'An AI-powered virtual doctor interacts via voice and text, providing guidance in regional languages.',
      icon: <Brain size={40} className="text-medical-600" />,
      number: '03'
    },
    {
      title: 'Automated Medicine & Assistance',
      description: 'The system dispenses basic medicines for common ailments and connects to remote doctors when needed.',
      icon: <PillIcon size={40} className="text-medical-600" />,
      number: '04'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground">
            Our Smart Health Booths provide a simple, four-step process to connect rural communities 
            with quality healthcare services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative group">
              <div className="absolute -top-6 -left-6 text-6xl font-bold text-muted-foreground/10 transition-all duration-300 group-hover:text-medical-600/10">
                {step.number}
              </div>
              <div className="relative z-10 bg-card rounded-xl p-6 border border-border h-full transition-all duration-300 group-hover:shadow-md">
                <div className="p-3 bg-muted inline-block rounded-lg mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform translate-x-1/2 -translate-y-1/2 z-20">
                    <ArrowRight className="text-medical-600" size={20} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
