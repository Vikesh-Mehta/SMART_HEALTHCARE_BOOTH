
import { useState } from 'react';
import { User, Video, MessageSquare, History, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DoctorProps {
  id: string;
  name: string;
  specialty: string;
  availability: 'Available' | 'Busy' | 'Offline';
  image?: string;
  rating?: number;
}

const VirtualDoctorCard = ({
  id,
  name,
  specialty,
  availability,
  image,
  rating = 4.5,
}: DoctorProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const availabilityColor = 
    availability === 'Available' ? 'bg-healing-500' : 
    availability === 'Busy' ? 'bg-amber-500' : 
    'bg-gray-400';

  return (
    <div 
      className="relative overflow-hidden rounded-xl border border-border/40 bg-card transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                {image ? (
                  <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={24} className="text-muted-foreground/60" />
                )}
              </div>
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${availabilityColor}`} />
            </div>
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-muted-foreground">{specialty}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-sm font-semibold">{rating}</span>
            <svg 
              className="w-4 h-4 text-amber-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Availability</span>
            <span className={`font-medium ${
              availability === 'Available' ? 'text-healing-600 dark:text-healing-400' : 
              availability === 'Busy' ? 'text-amber-600 dark:text-amber-400' : 
              'text-gray-500'
            }`}>
              {availability}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Response Time</span>
            <span className="font-medium">~5 mins</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex space-x-2">
            <button 
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Video call"
            >
              <Video size={18} />
            </button>
            <button 
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Chat"
            >
              <MessageSquare size={18} />
            </button>
            <button 
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="History"
            >
              <History size={18} />
            </button>
          </div>
          <Link 
            to={`/virtual-consultation/${id}`}
            className="text-sm font-medium text-medical-600 dark:text-medical-400 hover:underline flex items-center"
          >
            <span>Consult</span>
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-medical-500/10 opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`} />
    </div>
  );
};

export default VirtualDoctorCard;
