
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 to-background -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] -z-10 opacity-50" />
      
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4 animate-fade-in">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none xl:text-6xl/none text-balance">
                Discover Books. <br />
                <span className="text-primary">Connect with Readers.</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Your community marketplace for new and used books. Buy, sell, and trade with fellow book lovers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 min-[400px]:flex-row">
              <form onSubmit={handleSearch} className="flex-1 flex gap-2 w-full">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    type="search"
                    placeholder="Search books, authors, genres..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit">Search</Button>
              </form>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Popular:</span>
              <div className="flex flex-wrap gap-2">
                <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary" 
                       onClick={() => navigate('/search?category=fiction')}>
                  Fiction
                </Button>
                <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary"
                       onClick={() => navigate('/search?category=sci-fi')}>
                  Sci-Fi
                </Button>
                <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary"
                       onClick={() => navigate('/search?category=mystery')}>
                  Mystery
                </Button>
                <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary"
                       onClick={() => navigate('/search?condition=new')}>
                  New Books
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative flex items-center justify-center">
              {/* Stack of Books */}
              <div className="relative grid grid-cols-2 gap-4 sm:gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="rounded-lg overflow-hidden shadow-lg rotate-[-6deg] hover:rotate-0 transition-all duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=387&h=580" 
                    alt="Book Cover" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg rotate-[6deg] hover:rotate-0 transition-all duration-300 translate-y-4">
                  <img 
                    src="https://images.unsplash.com/photo-1629992101753-56d196c8aabb?auto=format&fit=crop&q=80&w=390&h=580" 
                    alt="Book Cover" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg rotate-[8deg] hover:rotate-0 transition-all duration-300 translate-x-6">
                  <img 
                    src="https://images.unsplash.com/photo-1571167530149-c1105da82639?auto=format&fit=crop&q=80&w=376&h=580" 
                    alt="Book Cover" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg rotate-[-8deg] hover:rotate-0 transition-all duration-300 translate-x-[-6px] translate-y-4">
                  <img 
                    src="https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=376&h=580" 
                    alt="Book Cover" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              
              {/* Floating element */}
              <div className="absolute bottom-[-30px] right-[-20px] bg-card rounded-lg shadow-lg p-3 animate-float">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Start Selling</p>
                    <p className="text-xs text-muted-foreground">Share books you love</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
