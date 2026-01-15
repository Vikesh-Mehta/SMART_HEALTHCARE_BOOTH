
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import CtaSection from '@/components/home/CtaSection';
import Login from '@/components/auth/Login';
import Signup from '@/components/auth/Signup';

const Index = () => {
  const { user, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  // Use the correct path to the uploaded image
  const boothImage = '/lovable-uploads/ed7ed09c-9713-4f2f-b711-d01e486e9aeb.png';

  // Redirect to dashboard if already logged in
  if (user && !loading) {
    return <Navigate to="/dashboard" replace />;
  }

  if (showAuth) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-medical-50 to-white">
        <Header />
        
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          {authMode === 'login' ? (
            <Login onSwitchToSignup={() => setAuthMode('signup')} />
          ) : (
            <Signup onSwitchToLogin={() => setAuthMode('login')} />
          )}
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header onLoginClick={() => { setShowAuth(true); setAuthMode('login'); }} />
      
      <main className="flex-1">
        <HeroSection 
          boothImage={boothImage} 
          onGetStartedClick={() => { setShowAuth(true); setAuthMode('signup'); }}
        />
        <FeaturesSection />
        <HowItWorksSection />
        <CtaSection onGetStartedClick={() => { setShowAuth(true); setAuthMode('signup'); }} />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
