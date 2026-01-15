
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Droplet, 
  Waves, 
  Activity, 
  ArrowRight, 
  CheckCircle,
  Info,
  AlertCircle,
  Stethoscope,
  HelpCircle,
  Clock
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HealthMetricCard from '@/components/ui/HealthMetricCard';

const HealthCheckup = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checkupComplete, setCheckupComplete] = useState(false);
  const [healthData, setHealthData] = useState({
    heartRate: { value: 0, unit: 'bpm', status: 'normal' as const },
    bloodPressure: { value: '0/0', unit: 'mmHg', status: 'normal' as const },
    bloodSugar: { value: 0, unit: 'mg/dL', status: 'normal' as const },
    oxygenLevel: { value: 0, unit: '%', status: 'normal' as const }
  });

  useEffect(() => {
    if (step > 0 && step <= 4) {
      setLoading(true);
      const timer = setTimeout(() => {
        updateHealthData(step);
        setLoading(false);
        
        if (step === 4) {
          setCheckupComplete(true);
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [step]);

  const updateHealthData = (currentStep: number) => {
    switch(currentStep) {
      case 1:
        setHealthData(prev => ({
          ...prev,
          heartRate: { value: 72, unit: 'bpm', status: 'normal' }
        }));
        break;
      case 2:
        setHealthData(prev => ({
          ...prev,
          bloodPressure: { value: '126/82', unit: 'mmHg', status: 'normal' }
        }));
        break;
      case 3:
        setHealthData(prev => ({
          ...prev,
          bloodSugar: { value: 110, unit: 'mg/dL', status: 'normal' }
        }));
        break;
      case 4:
        setHealthData(prev => ({
          ...prev,
          oxygenLevel: { value: 98, unit: '%', status: 'normal' }
        }));
        break;
      default:
        break;
    }
  };

  const startNewCheckup = () => {
    setStep(0);
    setCheckupComplete(false);
    setHealthData({
      heartRate: { value: 0, unit: 'bpm', status: 'normal' },
      bloodPressure: { value: '0/0', unit: 'mmHg', status: 'normal' },
      bloodSugar: { value: 0, unit: 'mg/dL', status: 'normal' },
      oxygenLevel: { value: 0, unit: '%', status: 'normal' }
    });
  };

  const checkupSteps = [
    {
      title: 'Prepare for Checkup',
      description: 'Find a quiet place and sit comfortably. Make sure you\'re relaxed before starting.',
      icon: <Info size={24} />
    },
    {
      title: 'Heart Rate Measurement',
      description: 'Place your finger on the sensor to measure your heart rate.',
      icon: <Heart size={24} />
    },
    {
      title: 'Blood Pressure Reading',
      description: 'Place your arm in the cuff and remain still while the measurement is taken.',
      icon: <Activity size={24} />
    },
    {
      title: 'Blood Sugar Analysis',
      description: 'Follow the instructions to obtain a small blood sample for glucose analysis.',
      icon: <Droplet size={24} />
    },
    {
      title: 'Oxygen Level Check',
      description: 'Place your finger in the sensor to measure blood oxygen saturation.',
      icon: <Waves size={24} />
    }
  ];

  const renderStepContent = () => {
    if (checkupComplete) {
      return (
        <div className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 bg-healing-100 dark:bg-healing-900/30 rounded-full mb-3">
            <CheckCircle size={40} className="text-healing-600 dark:text-healing-400" />
          </div>
          <h2 className="text-2xl font-bold">Checkup Complete!</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            All your vital signs have been measured successfully. You can view the summary below.
          </p>
          
          <div className="pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <HealthMetricCard
                title="Heart Rate"
                value={healthData.heartRate.value}
                unit={healthData.heartRate.unit}
                status={healthData.heartRate.status}
                icon={<Heart size={20} />}
                description="Normal resting heart rate"
              />
              <HealthMetricCard
                title="Blood Pressure"
                value={healthData.bloodPressure.value}
                unit={healthData.bloodPressure.unit}
                status={healthData.bloodPressure.status}
                icon={<Activity size={20} />}
                description="Healthy range"
              />
              <HealthMetricCard
                title="Blood Sugar"
                value={healthData.bloodSugar.value}
                unit={healthData.bloodSugar.unit}
                status={healthData.bloodSugar.status}
                icon={<Droplet size={20} />}
                description="Fasting glucose level"
              />
              <HealthMetricCard
                title="Oxygen Level"
                value={healthData.oxygenLevel.value}
                unit={healthData.oxygenLevel.unit}
                status={healthData.oxygenLevel.status}
                icon={<Waves size={20} />}
                description="SpO2 measurement"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto pt-6">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-3 text-base font-medium hover:bg-muted focus:outline-none focus:ring-2 focus:ring-medical-600 focus:ring-offset-2 transition-colors"
            >
              Back to Dashboard
            </Link>
            <Link
              to="/virtual-consultation"
              className="inline-flex items-center justify-center rounded-lg bg-medical-600 px-5 py-3 text-base font-medium text-white hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-medical-600 focus:ring-offset-2 transition-colors"
            >
              Consult a Doctor
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          <div className="pt-4">
            <button
              onClick={startNewCheckup}
              className="text-sm text-medical-600 dark:text-medical-400 hover:underline"
            >
              Start a New Checkup
            </button>
          </div>
        </div>
      );
    }
    
    if (step === 0) {
      return (
        <div className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 bg-medical-100 dark:bg-medical-900/30 rounded-full mb-3">
            <Stethoscope size={40} className="text-medical-600" />
          </div>
          <h2 className="text-2xl font-bold">AI-Powered Health Checkup</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Our Smart Health Booth will guide you through a comprehensive health assessment,
            measuring your vital signs and providing instant analysis.
          </p>
          
          <div className="bg-card rounded-xl border border-border p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold mb-3 flex items-center">
              <Info size={16} className="mr-2 text-medical-600" />
              Before You Begin
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground text-left">
              <li className="flex items-start">
                <CheckCircle size={16} className="mr-2 mt-0.5 text-healing-600" />
                Sit comfortably in a quiet environment
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="mr-2 mt-0.5 text-healing-600" />
                Make sure you haven't exercised in the last 30 minutes
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="mr-2 mt-0.5 text-healing-600" />
                Remove any tight clothing or accessories from your arms
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="mr-2 mt-0.5 text-healing-600" />
                Follow each step carefully for accurate results
              </li>
              <li className="flex items-start">
                <AlertCircle size={16} className="mr-2 mt-0.5 text-amber-600" />
                This is a simulation. In a real Smart Health Booth, physical measurements would be taken.
              </li>
            </ul>
          </div>
          
          <button
            onClick={() => setStep(1)}
            className="inline-flex items-center justify-center rounded-lg bg-medical-600 px-5 py-3 text-base font-medium text-white hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-medical-600 focus:ring-offset-2 transition-colors"
          >
            Begin Checkup
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      );
    }
    
    const currentStep = checkupSteps[step];
    
    return (
      <div className="text-center space-y-6 animate-fade-in">
        <div className="inline-flex items-center justify-center p-3 bg-medical-100 dark:bg-medical-900/30 rounded-full mb-3">
          {currentStep.icon}
        </div>
        <h2 className="text-2xl font-bold">{currentStep.title}</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          {currentStep.description}
        </p>
        
        {loading ? (
          <div className="pt-8">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-medical-200 border-t-medical-600 rounded-full animate-spin"></div>
              <p className="text-muted-foreground mt-4 flex items-center">
                <Clock className="mr-2" size={16} />
                Measuring... Please remain still
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto pt-6">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-3 text-base font-medium hover:bg-muted focus:outline-none focus:ring-2 focus:ring-medical-600 focus:ring-offset-2 transition-colors"
              >
                Previous
              </button>
            )}
            <button
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center justify-center rounded-lg bg-medical-600 px-5 py-3 text-base font-medium text-white hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-medical-600 focus:ring-offset-2 transition-colors"
            >
              {step < 4 ? 'Next' : 'Complete Checkup'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}
        
        <div className="pt-4">
          <button
            onClick={() => setStep(0)}
            className="text-sm text-medical-600 dark:text-medical-400 hover:underline"
          >
            Cancel Checkup
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 md:px-6 mx-auto">
          {/* Progress Bar */}
          {!checkupComplete && step > 0 && (
            <div className="max-w-3xl mx-auto mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Step {step} of {checkupSteps.length - 1}
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round((step / (checkupSteps.length - 1)) * 100)}% Complete
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-medical-600 transition-all duration-300 ease-out"
                  style={{ width: `${(step / (checkupSteps.length - 1)) * 100}%` }}
                />
              </div>
            </div>
          )}
          
          {/* Step Content */}
          <div className="max-w-3xl mx-auto py-8">
            {renderStepContent()}
          </div>
          
          {/* Help Section */}
          {!checkupComplete && (
            <div className="max-w-3xl mx-auto mt-12 pt-6 border-t border-border">
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-muted mr-3">
                    <HelpCircle size={16} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Need Help?</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      If you're experiencing any difficulties with the checkup process, 
                      you can contact our support team or consult with a healthcare provider.
                    </p>
                    <div className="flex space-x-4 mt-3">
                      <Link
                        to="/virtual-consultation"
                        className="text-sm font-medium text-medical-600 dark:text-medical-400 hover:underline"
                      >
                        Speak to a Doctor
                      </Link>
                      <button 
                        className="text-sm font-medium text-muted-foreground hover:underline"
                      >
                        Contact Support
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HealthCheckup;
