
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Video, 
  Mic, 
  Phone, 
  MessageSquare, 
  Send, 
  PaperclipIcon, 
  MicOff, 
  VideoOff, 
  Brain,
  Volume2,
  User,
  Loader,
  Info
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const VirtualConsultation = () => {
  const [loading, setLoading] = useState(true);
  const [consultationStarted, setConsultationStarted] = useState(false);
  const [chatActive, setChatActive] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<{
    id: number;
    sender: 'user' | 'doctor';
    text: string;
    time: string;
  }[]>([]);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    if (consultationStarted) {
      // Add initial doctor message after a delay
      const timer = setTimeout(() => {
        addMessage('doctor', "Hello! I'm Dr. Maya, your AI health assistant. How can I help you today?");
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [consultationStarted]);

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startConsultation = () => {
    setConsultationStarted(true);
    setChatActive(true);
  };

  const endConsultation = () => {
    setConsultationStarted(false);
    setChatActive(false);
    setMessages([]);
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
  };

  const addMessage = (sender: 'user' | 'doctor', text: string) => {
    const now = new Date();
    const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        sender,
        text,
        time: timeString
      }
    ]);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    addMessage('user', messageInput);
    setMessageInput('');
    
    // Simulate doctor typing
    setIsTyping(true);
    
    // Simulate AI doctor response
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "I understand your concern. Based on your symptoms, it could be a minor infection. I recommend rest and staying hydrated.",
        "Your vital signs look good. The health data from your recent checkup shows normal readings.",
        "I'd suggest monitoring this for a few days. If symptoms persist, we might need to consider additional tests.",
        "That's a common concern. The data from your health booth indicates it's within normal ranges, but let's discuss this further.",
        "Based on the information you've provided, I don't think this is anything serious, but it's good that you reached out."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage('doctor', randomResponse);
    }, 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 md:px-6 mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="w-16 h-16 border-4 border-medical-200 border-t-medical-600 rounded-full animate-spin"></div>
              <p className="text-muted-foreground mt-4">Connecting to virtual consultation service...</p>
            </div>
          ) : !consultationStarted ? (
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm font-medium mb-4">
                <span className="h-2 w-2 rounded-full bg-healing-500 mr-2"></span>
                <span>AI-Powered Virtual Consultation</span>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">
                Speak with an AI Doctor
              </h1>
              
              <p className="text-muted-foreground max-w-xl mx-auto">
                Connect with our AI-powered virtual doctor for personalized consultations. 
                Get medical guidance, discuss symptoms, and receive treatment recommendations in your preferred language.
              </p>
              
              <div className="bg-card rounded-xl border border-border p-6 mt-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-medical-100 dark:bg-medical-900/30 flex items-center justify-center">
                    <Brain size={40} className="text-medical-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold">Dr. Maya</h3>
                    <p className="text-muted-foreground mb-2">AI Health Assistant</p>
                    <div className="flex items-center space-x-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-healing-500"></span>
                      <span className="text-sm text-healing-600 dark:text-healing-400">Available Now</span>
                    </div>
                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <Volume2 size={14} className="mr-2" />
                        Speaks multiple languages
                      </li>
                      <li className="flex items-center">
                        <Info size={14} className="mr-2" />
                        Available 24/7 for health inquiries
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <button
                onClick={startConsultation}
                className="inline-flex items-center justify-center rounded-lg bg-medical-600 px-6 py-3 text-base font-medium text-white hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-medical-600 focus:ring-offset-2 transition-colors mt-4"
              >
                <Video className="mr-2 h-5 w-5" />
                Start Consultation
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Video Area */}
              <div className="lg:col-span-2 space-y-4">
                <div className="relative rounded-xl overflow-hidden border border-border aspect-video bg-muted/80">
                  {videoEnabled ? (
                    <div className="absolute inset-0 bg-medical-900/10 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-medical-600/20 flex items-center justify-center backdrop-blur-sm">
                        <Brain size={48} className="text-medical-600" />
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                      <VideoOff size={48} className="text-muted-foreground/50" />
                    </div>
                  )}
                  
                  <div className="absolute bottom-4 right-4 rounded-lg overflow-hidden border border-border shadow-md w-32 h-24 bg-muted">
                    {videoEnabled ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <User size={32} className="text-muted-foreground/50" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-background">
                        <VideoOff size={24} className="text-muted-foreground/50" />
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center space-x-2 text-sm text-white bg-foreground/70 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-healing-500"></span>
                      <span>Connected</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-4">
                  <button 
                    onClick={toggleAudio}
                    className={`p-3 rounded-full ${
                      audioEnabled ? 'bg-muted hover:bg-muted/80' : 'bg-destructive/10 text-destructive hover:bg-destructive/20'
                    } transition-colors`}
                    aria-label={audioEnabled ? 'Mute microphone' : 'Unmute microphone'}
                  >
                    {audioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                  </button>
                  <button 
                    onClick={toggleVideo}
                    className={`p-3 rounded-full ${
                      videoEnabled ? 'bg-muted hover:bg-muted/80' : 'bg-destructive/10 text-destructive hover:bg-destructive/20'
                    } transition-colors`}
                    aria-label={videoEnabled ? 'Turn off camera' : 'Turn on camera'}
                  >
                    {videoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
                  </button>
                  <button 
                    onClick={endConsultation}
                    className="p-3 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                    aria-label="End call"
                  >
                    <Phone size={20} />
                  </button>
                </div>
              </div>
              
              {/* Chat Area */}
              <div className="rounded-xl border border-border overflow-hidden flex flex-col h-[600px]">
                <div className="p-3 border-b border-border bg-muted/30 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-medical-100 dark:bg-medical-900/30 flex items-center justify-center mr-2">
                      <Brain size={16} className="text-medical-600" />
                    </div>
                    <span className="font-medium">Dr. Maya</span>
                  </div>
                  <button 
                    onClick={() => setChatActive(!chatActive)}
                    className="p-1 rounded-full hover:bg-muted transition-colors"
                  >
                    <MessageSquare size={16} />
                  </button>
                </div>
                
                {chatActive && (
                  <>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div 
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                              message.sender === 'user' 
                                ? 'bg-medical-600 text-white rounded-br-none' 
                                : 'bg-muted rounded-bl-none'
                            }`}
                          >
                            <div className="text-sm">{message.text}</div>
                            <div className="text-xs mt-1 opacity-70 text-right">{message.time}</div>
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted rounded-bl-none">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 rounded-full bg-medical-600/60 animate-bounce"></div>
                              <div className="w-2 h-2 rounded-full bg-medical-600/60 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-2 h-2 rounded-full bg-medical-600/60 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                    
                    <div className="border-t border-border p-3">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-full hover:bg-muted transition-colors">
                          <PaperclipIcon size={18} />
                        </button>
                        <textarea
                          className="flex-1 bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none h-10 max-h-32"
                          placeholder="Type a message..."
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          rows={1}
                        />
                        <button 
                          className="p-2 rounded-full bg-medical-600 text-white hover:bg-medical-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={handleSendMessage}
                          disabled={!messageInput.trim()}
                        >
                          <Send size={18} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
                
                {!chatActive && (
                  <div className="flex-1 flex items-center justify-center flex-col p-6 text-center">
                    <MessageSquare size={40} className="text-muted-foreground/30 mb-4" />
                    <h3 className="font-medium mb-2">Chat is minimized</h3>
                    <p className="text-sm text-muted-foreground">
                      Click the chat icon to continue your conversation
                    </p>
                    <button 
                      onClick={() => setChatActive(true)}
                      className="mt-4 text-sm font-medium text-medical-600 dark:text-medical-400 hover:underline"
                    >
                      Open Chat
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VirtualConsultation;
