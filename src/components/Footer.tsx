
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  PhoneCall, 
  MapPin 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary text-foreground">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h3 className="font-display font-bold text-xl">BookBay</h3>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your community marketplace for new and used books. Buy, sell, and connect with fellow book lovers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-medium text-md mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/search" className="text-sm text-muted-foreground hover:text-primary transition-colors">All Books</Link>
              </li>
              <li>
                <Link to="/search?condition=new" className="text-sm text-muted-foreground hover:text-primary transition-colors">New Books</Link>
              </li>
              <li>
                <Link to="/search?condition=used" className="text-sm text-muted-foreground hover:text-primary transition-colors">Used Books</Link>
              </li>
              <li>
                <Link to="/search?featured=true" className="text-sm text-muted-foreground hover:text-primary transition-colors">Featured Books</Link>
              </li>
              <li>
                <Link to="/search?bestseller=true" className="text-sm text-muted-foreground hover:text-primary transition-colors">Bestsellers</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-medium text-md mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/sell" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sell Books</Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-medium text-md mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start text-sm">
                <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">
                  123 Book Lane, Reading City<br />Booktown, BK 12345
                </span>
              </li>
              <li className="flex items-center text-sm">
                <PhoneCall className="h-5 w-5 mr-2 text-muted-foreground" />
                <a href="tel:+11234567890" className="text-muted-foreground hover:text-primary transition-colors">+1 (123) 456-7890</a>
              </li>
              <li className="flex items-center text-sm">
                <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                <a href="mailto:support@bookbay.com" className="text-muted-foreground hover:text-primary transition-colors">support@bookbay.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} BookBay. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex flex-wrap space-x-4 justify-center md:justify-end">
                <li>
                  <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms</Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-xs text-muted-foreground hover:text-primary transition-colors">Cookies</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
