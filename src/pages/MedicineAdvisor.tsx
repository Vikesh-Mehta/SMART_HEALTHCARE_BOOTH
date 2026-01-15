
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  PillIcon, 
  Clock, 
  Info, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle,
  Package,
  Calendar,
  X,
  HelpCircle
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  purpose: string;
  sideEffects: string[];
  contraindications: string[];
}

interface Symptom {
  id: string;
  name: string;
  description: string;
  possibleConditions: string[];
  recommendedMedications: string[];
}

const MedicineAdvisor = () => {
  const [step, setStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [recommendedMedicine, setRecommendedMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(false);
  const [showMedicineDetails, setShowMedicineDetails] = useState(false);

  // Mock data for symptoms
  const commonSymptoms: Symptom[] = [
    {
      id: 's1',
      name: 'Headache',
      description: 'Pain in any region of the head',
      possibleConditions: ['Tension headache', 'Migraine', 'Sinusitis'],
      recommendedMedications: ['Paracetamol', 'Ibuprofen']
    },
    {
      id: 's2',
      name: 'Fever',
      description: 'Elevated body temperature',
      possibleConditions: ['Viral infection', 'Bacterial infection', 'Inflammation'],
      recommendedMedications: ['Paracetamol', 'Ibuprofen']
    },
    {
      id: 's3',
      name: 'Cough',
      description: 'Sudden expulsion of air from the lungs',
      possibleConditions: ['Common cold', 'Bronchitis', 'Allergies'],
      recommendedMedications: ['Dextromethorphan', 'Guaifenesin']
    },
    {
      id: 's4',
      name: 'Sore Throat',
      description: 'Pain or irritation in the throat',
      possibleConditions: ['Pharyngitis', 'Strep throat', 'Tonsillitis'],
      recommendedMedications: ['Paracetamol', 'Lozenges', 'Antiseptic gargle']
    },
    {
      id: 's5',
      name: 'Runny Nose',
      description: 'Excess drainage of mucus from the nose',
      possibleConditions: ['Common cold', 'Allergic rhinitis', 'Sinusitis'],
      recommendedMedications: ['Antihistamines', 'Nasal decongestants']
    },
    {
      id: 's6',
      name: 'Body Ache',
      description: 'Generalized pain in muscles and joints',
      possibleConditions: ['Viral infection', 'Overexertion', 'Flu'],
      recommendedMedications: ['Paracetamol', 'Ibuprofen']
    },
    {
      id: 's7',
      name: 'Nausea',
      description: 'Feeling of sickness with an inclination to vomit',
      possibleConditions: ['Gastroenteritis', 'Motion sickness', 'Food poisoning'],
      recommendedMedications: ['Domperidone', 'Ondansetron']
    },
    {
      id: 's8',
      name: 'Dizziness',
      description: 'Feeling of being lightheaded or unsteady',
      possibleConditions: ['Vertigo', 'Low blood pressure', 'Inner ear issues'],
      recommendedMedications: ['Antihistamines', 'Anti-vertigo medications']
    }
  ];

  // Mock medicine data
  const medicines: Record<string, Medicine> = {
    'Paracetamol': {
      id: 'm1',
      name: 'Paracetamol',
      dosage: '500-1000 mg',
      frequency: 'Every 4-6 hours as needed (max 4g per day)',
      purpose: 'Reduces fever and relieves mild to moderate pain',
      sideEffects: ['Nausea', 'Rash', 'Liver damage (with prolonged use or overdose)'],
      contraindications: ['Liver disease', 'Alcoholism']
    },
    'Ibuprofen': {
      id: 'm2',
      name: 'Ibuprofen',
      dosage: '400-600 mg',
      frequency: 'Every 6-8 hours as needed (max 2.4g per day)',
      purpose: 'Reduces fever, pain, and inflammation',
      sideEffects: ['Stomach upset', 'Heartburn', 'Dizziness', 'Increased risk of heart attack and stroke with prolonged use'],
      contraindications: ['Peptic ulcer', 'Heart failure', 'Severe kidney disease']
    },
    'Dextromethorphan': {
      id: 'm3',
      name: 'Dextromethorphan',
      dosage: '10-30 mg',
      frequency: 'Every 4-8 hours as needed (max 120mg per day)',
      purpose: 'Suppresses cough by affecting the signals in the brain that trigger cough reflex',
      sideEffects: ['Drowsiness', 'Dizziness', 'Nausea'],
      contraindications: ['Taking MAO inhibitors', 'Asthma']
    }
  };

  const filteredSymptoms = commonSymptoms.filter(symptom => 
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (step === 2 && selectedSymptoms.length > 0) {
      setLoading(true);
      
      // Simulate API call to get medicine recommendation
      setTimeout(() => {
        // Simple algorithm to choose a medicine based on selected symptoms
        const symptomObjects = commonSymptoms.filter(s => selectedSymptoms.includes(s.name));
        const allRecommendedMeds = symptomObjects.flatMap(s => s.recommendedMedications);
        
        // Find the most frequently recommended medicine
        const medCounts: Record<string, number> = {};
        allRecommendedMeds.forEach(med => {
          medCounts[med] = (medCounts[med] || 0) + 1;
        });
        
        const topMedName = Object.keys(medCounts).reduce((a, b) => 
          medCounts[a] > medCounts[b] ? a : b
        );
        
        setRecommendedMedicine(medicines[topMedName]);
        setLoading(false);
      }, 2000);
    }
  }, [step, selectedSymptoms]);

  const toggleSymptom = (symptomName: string) => {
    if (selectedSymptoms.includes(symptomName)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptomName));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomName]);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center justify-center p-3 bg-medical-100 dark:bg-medical-900/30 rounded-full mb-3">
              <PillIcon size={40} className="text-medical-600" />
            </div>
            <h2 className="text-2xl font-bold">AI Medicine Advisor</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Our Smart Health Booth can help recommend appropriate over-the-counter medications
              based on your symptoms and health history.
            </p>
            
            <div className="bg-card rounded-xl border border-border p-6 max-w-2xl mx-auto">
              <h3 className="font-semibold mb-3 flex items-center">
                <Info size={16} className="mr-2 text-medical-600" />
                Important Information
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground text-left">
                <p>
                  This advisor is designed to provide general guidance for common, non-emergency symptoms.
                  It is not a replacement for professional medical advice.
                </p>
                <div className="flex items-start">
                  <AlertCircle size={16} className="mr-2 mt-0.5 text-amber-600" />
                  <p>
                    If you're experiencing severe symptoms, difficulty breathing, chest pain, or any other
                    emergency conditions, please seek immediate medical attention.
                  </p>
                </div>
                <div className="flex items-start">
                  <Info size={16} className="mr-2 mt-0.5 text-medical-600" />
                  <p>
                    This is a simulation. In a real Smart Health Booth, the system would have access to
                    your health records and provide more personalized recommendations.
                  </p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center justify-center rounded-lg bg-medical-600 px-5 py-3 text-base font-medium text-white hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-medical-600 focus:ring-offset-2 transition-colors"
            >
              Start
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        );
        
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Select Your Symptoms</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Choose all the symptoms you're currently experiencing to receive an appropriate medication recommendation.
              </p>
            </div>
            
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search for symptoms..."
                className="w-full py-3 pl-10 pr-4 rounded-lg bg-background border border-input focus:border-ring focus:ring-1 focus:ring-ring focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {selectedSymptoms.length > 0 && (
              <div className="bg-muted/30 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-2">Selected Symptoms:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map(symptom => (
                    <div 
                      key={symptom} 
                      className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-sm font-medium"
                    >
                      {symptom}
                      <button 
                        className="ml-1 p-0.5 rounded-full hover:bg-muted transition-colors"
                        onClick={() => toggleSymptom(symptom)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSymptoms.map(symptom => (
                <button
                  key={symptom.id}
                  className={`p-4 rounded-lg border ${
                    selectedSymptoms.includes(symptom.name) 
                      ? 'border-medical-500 bg-medical-50 dark:bg-medical-900/20' 
                      : 'border-border bg-card'
                  } hover:border-medical-500 transition-colors text-left flex flex-col h-full`}
                  onClick={() => toggleSymptom(symptom.name)}
                >
                  <h3 className="font-medium mb-1">{symptom.name}</h3>
                  <p className="text-sm text-muted-foreground">{symptom.description}</p>
                </button>
              ))}
            </div>
            
            <div className="flex justify-between pt-6">
              <button
                onClick={() => setStep(0)}
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-3 text-base font-medium hover:bg-muted focus:outline-none focus:ring-2 focus:ring-medical-600 focus:ring-offset-2 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center justify-center rounded-lg bg-medical-600 px-5 py-3 text-base font-medium text-white hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-medical-600 focus:ring-offset-2 transition-colors"
                disabled={selectedSymptoms.length === 0}
              >
                Get Recommendation
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Medication Recommendation</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Based on your symptoms, our AI system recommends the following medication.
              </p>
            </div>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 border-4 border-medical-200 border-t-medical-600 rounded-full animate-spin"></div>
                <p className="text-muted-foreground mt-4 flex items-center">
                  <Clock className="mr-2" size={16} />
                  Analyzing symptoms and finding the best medication...
                </p>
              </div>
            ) : recommendedMedicine ? (
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{recommendedMedicine.name}</h3>
                      <p className="text-medical-600 dark:text-medical-400 text-sm mt-1">
                        {recommendedMedicine.purpose}
                      </p>
                    </div>
                    <span className="p-2 rounded-full bg-healing-50 dark:bg-healing-900/30">
                      <PillIcon size={20} className="text-healing-600 dark:text-healing-400" />
                    </span>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex">
                      <div className="w-32 text-sm font-medium">Dosage:</div>
                      <div className="flex-1 text-sm">{recommendedMedicine.dosage}</div>
                    </div>
                    <div className="flex">
                      <div className="w-32 text-sm font-medium">Frequency:</div>
                      <div className="flex-1 text-sm">{recommendedMedicine.frequency}</div>
                    </div>
                    
                    {!showMedicineDetails ? (
                      <button
                        onClick={() => setShowMedicineDetails(true)}
                        className="text-sm text-medical-600 dark:text-medical-400 mt-2 hover:underline"
                      >
                        Show more details
                      </button>
                    ) : (
                      <>
                        <div className="pt-2">
                          <div className="text-sm font-medium mb-2">Side Effects:</div>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {recommendedMedicine.sideEffects.map((effect, index) => (
                              <li key={index} className="flex items-start">
                                <AlertCircle size={14} className="mr-2 mt-0.5 text-amber-600" />
                                <span>{effect}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="pt-2">
                          <div className="text-sm font-medium mb-2">Contraindications:</div>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {recommendedMedicine.contraindications.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <AlertCircle size={14} className="mr-2 mt-0.5 text-destructive" />
                                <span>Do not take if you have {item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="pt-2 flex items-start">
                          <Info size={14} className="mr-2 mt-0.5 text-medical-600" />
                          <p className="text-sm text-muted-foreground">
                            Always read the label and follow the instructions carefully. 
                            Consult a healthcare professional if symptoms persist.
                          </p>
                        </div>
                        
                        <button
                          onClick={() => setShowMedicineDetails(false)}
                          className="text-sm text-medical-600 dark:text-medical-400 mt-2 hover:underline"
                        >
                          Show less
                        </button>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="p-4 bg-muted/30 border-t border-border space-y-3">
                  <div className="flex items-center text-sm">
                    <Package size={16} className="mr-2 text-muted-foreground" />
                    <span>Available in Smart Health Booth dispenser</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar size={16} className="mr-2 text-muted-foreground" />
                    <span>Recommended for short-term use (3-5 days)</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle size={40} className="mx-auto text-amber-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No recommendation available</h3>
                <p className="text-muted-foreground">
                  We couldn't generate a recommendation based on the selected symptoms.
                  Please try selecting different symptoms or consult with a doctor.
                </p>
              </div>
            )}
            
            <div className="flex justify-between pt-6">
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-3 text-base font-medium hover:bg-muted focus:outline-none focus:ring-2 focus:ring-medical-600 focus:ring-offset-2 transition-colors"
              >
                Back
              </button>
              <Link
                to="/virtual-consultation"
                className="inline-flex items-center justify-center rounded-lg bg-medical-600 px-5 py-3 text-base font-medium text-white hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-medical-600 focus:ring-offset-2 transition-colors"
              >
                Consult with Doctor
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 md:px-6 mx-auto">
          {/* Progress Bar */}
          {step > 0 && (
            <div className="max-w-3xl mx-auto mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Step {step} of 2
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round((step / 2) * 100)}% Complete
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-medical-600 transition-all duration-300 ease-out"
                  style={{ width: `${(step / 2) * 100}%` }}
                />
              </div>
            </div>
          )}
          
          {/* Step Content */}
          <div className="max-w-3xl mx-auto py-8">
            {renderStepContent()}
          </div>
          
          {/* Help Section */}
          <div className="max-w-3xl mx-auto mt-12 pt-6 border-t border-border">
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-muted mr-3">
                  <HelpCircle size={16} className="text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">Important Disclaimer</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    This medication advisor provides general information and is not a substitute for 
                    professional medical advice. If symptoms are severe or persist, please consult with a healthcare provider.
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
                      Emergency Help
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MedicineAdvisor;
