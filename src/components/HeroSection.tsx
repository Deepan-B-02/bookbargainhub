
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [imagesLoaded, setImagesLoaded] = useState({
    img1: false,
    img2: false,
    img3: false,
    img4: false,
  });
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleImageLoad = (imgKey: keyof typeof imagesLoaded) => {
    setImagesLoaded(prev => ({
      ...prev,
      [imgKey]: true
    }));
  };

  const handleImageError = (imgKey: keyof typeof imagesLoaded) => {
    console.error(`Failed to load image: ${imgKey}`);
    // Set as loaded to remove loading state, even though it failed
    setImagesLoaded(prev => ({
      ...prev,
      [imgKey]: true
    }));
  };

  // Reliable fallback images
  const fallbackImages = {
    img1: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=387&h=580",
    img2: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=387&h=580",
    img3: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=387&h=580",
    img4: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=387&h=580"
  };

  // Main book images with reliable backups
  const bookImages = {
    img1: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=387&h=580",
    img2: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?auto=format&fit=crop&q=80&w=390&h=580",
    img3: "https://images.unsplash.com/photo-1571167530149-c1105da82639?auto=format&fit=crop&q=80&w=376&h=580",
    img4: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=376&h=580"
  };
  
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Enhanced Background with more attractive styles */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/50 to-background -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] -z-10 opacity-50" />
      
      {/* Decorative elements with enhanced styling */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
          <div className="flex flex-col justify-center space-y-6 animate-fade-in text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center justify-center lg:justify-start">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary flex items-center gap-1 animate-fade-in shine-effect">
                <Sparkles className="h-3.5 w-3.5" />
                <span>BookBay Community</span>
              </span>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none xl:text-6xl/none text-balance">
                Discover Books. <br />
                <span className="gradient-text">Connect with Readers.</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
                Your community marketplace for new and used books. Buy, sell, and trade with fellow book lovers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0 w-full">
              <form onSubmit={handleSearch} className="flex-1 flex gap-2 w-full">
                <div className="relative flex-1 group">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-hover:text-primary" />
                  <Input 
                    type="search"
                    placeholder="Search books, authors, genres..." 
                    className="pl-9 transition-all group-hover:border-primary focus:ring-2 focus:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" className="transition-all hover:scale-105 shadow-md hover:shadow-lg shine-effect">Search</Button>
              </form>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center lg:justify-start">
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
          <div className="flex items-center justify-center lg:mt-0 order-1 lg:order-2">
            <div className="relative flex items-center justify-center">
              {/* Stack of Books with enhanced visuals */}
              <div className="relative grid grid-cols-2 gap-4 sm:gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="rounded-lg overflow-hidden shadow-lg rotate-[-6deg] hover:rotate-0 transition-all duration-300 hover:shadow-xl group glass-effect">
                  {!imagesLoaded.img1 && (
                    <div className="aspect-[2/3] bg-secondary animate-pulse rounded-lg"></div>
                  )}
                  <img 
                    src={bookImages.img1}
                    alt="Book Cover" 
                    className={cn(
                      "w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300",
                      imagesLoaded.img1 ? 'opacity-100' : 'opacity-0'
                    )}
                    onLoad={() => handleImageLoad('img1')}
                    onError={() => handleImageError('img1')}
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg rotate-[6deg] hover:rotate-0 transition-all duration-300 translate-y-4 group glass-effect">
                  {!imagesLoaded.img2 && (
                    <div className="aspect-[2/3] bg-secondary animate-pulse rounded-lg"></div>
                  )}
                  <img 
                    src={bookImages.img2}
                    alt="Book Cover" 
                    className={cn(
                      "w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300",
                      imagesLoaded.img2 ? 'opacity-100' : 'opacity-0'
                    )}
                    onLoad={() => handleImageLoad('img2')}
                    onError={() => handleImageError('img2')}
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg rotate-[8deg] hover:rotate-0 transition-all duration-300 translate-x-6 group glass-effect">
                  {!imagesLoaded.img3 && (
                    <div className="aspect-[2/3] bg-secondary animate-pulse rounded-lg"></div>
                  )}
                  <img 
                    src={fallbackImages.img3} 
                    alt="Book Cover" 
                    className={cn(
                      "w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300",
                      imagesLoaded.img3 ? 'opacity-100' : 'opacity-0'
                    )}
                    onLoad={() => handleImageLoad('img3')}
                    onError={() => handleImageError('img3')}
                  />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg rotate-[-8deg] hover:rotate-0 transition-all duration-300 translate-x-[-6px] translate-y-4 group glass-effect">
                  {!imagesLoaded.img4 && (
                    <div className="aspect-[2/3] bg-secondary animate-pulse rounded-lg"></div>
                  )}
                  <img 
                    src={bookImages.img4}
                    alt="Book Cover" 
                    className={cn(
                      "w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300",
                      imagesLoaded.img4 ? 'opacity-100' : 'opacity-0'
                    )}
                    onLoad={() => handleImageLoad('img4')}
                    onError={() => handleImageError('img4')}
                  />
                </div>
              </div>
              
              {/* Floating element with enhanced styling */}
              <div className="absolute bottom-[-30px] right-[-20px] glass-effect rounded-lg shadow-xl p-4 animate-float border border-primary/20 backdrop-blur-sm hover-lift card-shine">
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-primary-foreground shadow-md shine-effect">
                    <ArrowRight className="h-5 w-5" />
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
