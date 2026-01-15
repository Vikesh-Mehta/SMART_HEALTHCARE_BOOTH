
import { useState, useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';

interface BoothLocation {
  id: string;
  name: string;
  address: string;
  distance: string;
  status: 'Available' | 'Busy' | 'Closed';
}

const mockLocations: BoothLocation[] = [
  {
    id: '1',
    name: 'Sunnyvale Health Booth',
    address: '123 Main St, Sunnyvale Village',
    distance: '0.5 km',
    status: 'Available'
  },
  {
    id: '2',
    name: 'Greenfield Health Booth',
    address: '456 Oak Rd, Greenfield',
    distance: '2.3 km',
    status: 'Busy'
  },
  {
    id: '3',
    name: 'Riverdale Health Booth',
    address: '789 Pine Ave, Riverdale',
    distance: '3.1 km',
    status: 'Available'
  },
  {
    id: '4',
    name: 'Highland Health Booth',
    address: '321 Maple St, Highland Village',
    distance: '4.7 km',
    status: 'Closed'
  }
];

const BoothLocator = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState<BoothLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLocations(mockLocations);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredLocations = locations.filter(location => 
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search for health booths..."
            className="w-full py-2 pl-10 pr-4 rounded-md bg-background border border-input focus:border-ring focus:ring-1 focus:ring-ring focus:outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {isLoading ? (
          <div className="p-8 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-medical-200 border-t-medical-500 rounded-full animate-spin"></div>
            <p className="text-sm text-muted-foreground mt-4">Finding nearby health booths...</p>
          </div>
        ) : filteredLocations.length === 0 ? (
          <div className="p-8 text-center">
            <MapPin className="mx-auto text-muted-foreground" size={32} />
            <p className="text-muted-foreground mt-2">No health booths found</p>
            <p className="text-sm text-muted-foreground mt-1">Try a different search term</p>
          </div>
        ) : (
          <ul>
            {filteredLocations.map((location) => (
              <li key={location.id} className="border-b border-border last:border-none">
                <button className="w-full p-4 text-left hover:bg-muted/50 transition-colors flex items-start justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">{location.name}</h3>
                      <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                        location.status === 'Available' ? 'bg-healing-100 text-healing-600 dark:bg-healing-900/30 dark:text-healing-400' : 
                        location.status === 'Busy' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : 
                        'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {location.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center">
                      <MapPin size={14} className="mr-1 text-muted-foreground/70" />
                      {location.address}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-medical-600 dark:text-medical-400">
                    {location.distance}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BoothLocator;
