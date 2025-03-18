
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors hover:text-primary ${
        isActive(to) ? 'text-primary' : 'text-foreground'
      }`}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display font-bold text-xl">BookBay</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/search">Browse</NavLink>
            <NavLink to="/sell">Sell</NavLink>
            <NavLink to="/about">About</NavLink>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/search" aria-label="Search">
              <Search className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link to="/cart" aria-label="Shopping cart">
              <ShoppingCart className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link to="/auth" aria-label="User account">
              <User className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild>
            <Link to="/auth">Sign In</Link>
          </Button>
        </div>

        <div className="md:hidden flex items-center">
          <Button variant="outline" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 space-y-4 animate-fade-in bg-background">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/search" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Browse</Link>
            <Link to="/sell" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>Sell</Link>
            <Link to="/about" className="text-sm font-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
          </div>
          <div className="flex space-x-2 pt-2 border-t">
            <Button variant="outline" size="sm" asChild className="flex-1">
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button size="sm" asChild className="flex-1">
              <Link to="/auth?tab=signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
