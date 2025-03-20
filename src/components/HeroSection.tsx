
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([false, false, false, false]);
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleImageLoad = (index: number) => {
    const newImageLoaded = [...imageLoaded];
    newImageLoaded[index] = true;
    setImageLoaded(newImageLoaded);
  };
  
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 to-background -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] -z-10 opacity-50" />
      
      <div className="container px-4 md:px-6">
        {/* Center the text content */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-6 animate-fade-in">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-2">
            <Sparkles className="inline-block h-4 w-4 mr-1" /> Discover your next favorite book
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-balance">
            Your Community <span className="text-primary">Book Marketplace</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Buy, sell, and connect with fellow book lovers in a vibrant community marketplace.
          </p>
          
          <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
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
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Popular:</span>
            <div className="flex flex-wrap gap-2 justify-center">
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
        
        {/* Stylish book display */}
        <div className="mt-16 relative max-w-3xl mx-auto">
          <div className="absolute -left-4 -top-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-secondary/80 rounded-full blur-xl"></div>
          
          <div className="grid grid-cols-4 gap-4 md:gap-6 relative z-10">
            {[
              "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=387&h=580",
              "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?auto=format&fit=crop&q=80&w=390&h=580",
              "https://images.unsplash.com/photo-1571167530149-c1105da82639?auto=format&fit=crop&q=80&w=376&h=580",
              "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=376&h=580"
            ].map((src, index) => (
              <div 
                key={index} 
                className={`group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300
                  ${index === 0 ? 'rotate-[-6deg] hover:rotate-0' : 
                    index === 1 ? 'rotate-[6deg] hover:rotate-0 translate-y-4' : 
                    index === 2 ? 'rotate-[8deg] hover:rotate-0 translate-x-6' : 
                    'rotate-[-8deg] hover:rotate-0 translate-x-[-6px] translate-y-4'}`}
              >
                {!imageLoaded[index] && (
                  <div className="aspect-[3/4] bg-secondary animate-pulse flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-muted-foreground/40" />
                  </div>
                )}
                <img 
                  src={src} 
                  alt={`Book Cover ${index + 1}`} 
                  className={`w-full h-auto object-cover transition-opacity duration-300 aspect-[3/4] ${imageLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => handleImageLoad(index)}
                  onError={(e) => {
                    console.error(`Failed to load image: ${src}`);
                    // Try loading a fallback image
                    e.currentTarget.src = "https://images.unsplash.com/photo-1589739900575-9b5a8f63f497?auto=format&fit=crop&q=80&w=376&h=580";
                  }}
                />
              </div>
            ))}
          </div>
          
          {/* Floating element with glassmorphism */}
          <div className="absolute bottom-[-20px] right-[-10px] backdrop-blur-md bg-white/70 dark:bg-black/50 rounded-lg shadow-lg p-3 border border-white/20 animate-float">
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
      
      {/* Decorative elements */}
      <div className="absolute -bottom-10 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-10 w-32 h-32 bg-secondary/40 rounded-full blur-2xl"></div>
    </section>
  );
};

export default HeroSection;

