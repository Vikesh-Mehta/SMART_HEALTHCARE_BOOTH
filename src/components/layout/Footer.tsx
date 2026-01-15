
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/50 dark:bg-muted/20 pt-12 pb-6 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-medical-500 to-healing-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">SH</span>
              </div>
              <span className="text-xl font-medium">Smart Health</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Bringing accessible healthcare to rural communities through
              AI-integrated self-service health booths.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-medical-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-medical-600 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/health-checkup" className="text-sm text-muted-foreground hover:text-medical-600 transition-colors">
                  Health Checkup
                </Link>
              </li>
              <li>
                <Link to="/virtual-consultation" className="text-sm text-muted-foreground hover:text-medical-600 transition-colors">
                  Virtual Doctor
                </Link>
              </li>
              <li>
                <Link to="/medicine-advisor" className="text-sm text-muted-foreground hover:text-medical-600 transition-colors">
                  Medicine Advisor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-medical-600 transition-colors flex items-center">
                  <span>Health Articles</span>
                  <ExternalLink size={12} className="ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-medical-600 transition-colors flex items-center">
                  <span>Find a Booth</span>
                  <ExternalLink size={12} className="ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-medical-600 transition-colors flex items-center">
                  <span>FAQ</span>
                  <ExternalLink size={12} className="ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-medical-600 transition-colors flex items-center">
                  <span>Privacy Policy</span>
                  <ExternalLink size={12} className="ml-1" />
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-medical-600 transition-colors flex items-center">
                  <span>Terms of Service</span>
                  <ExternalLink size={12} className="ml-1" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-medical-500 shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  123 Health Street, Rural District, Country
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-medical-500" />
                <span className="text-sm text-muted-foreground">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-medical-500" />
                <span className="text-sm text-muted-foreground">
                  support@smarthealth.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Smart Health. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 mt-4 md:mt-0 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart size={14} className="text-destructive" />
            <span>for rural communities</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
