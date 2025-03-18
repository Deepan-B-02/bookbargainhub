
import { useEffect } from 'react';
import { books } from '@/data/books';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import CategorySection from '@/components/CategorySection';
import FeaturedBooks from '@/components/FeaturedBooks';
import BookCard from '@/components/BookCard';
import { Button } from '@/components/ui/button';
import { ShoppingCart, BookOpen, Users } from 'lucide-react';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredBooks = books.filter(book => book.featured);
  const bestSellers = books.filter(book => book.bestSeller);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        
        {/* How it works section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
              <p className="text-muted-foreground mt-4">BookBay connects book lovers with a simple, secure marketplace.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Browse Books</h3>
                <p className="text-muted-foreground">Explore thousands of new and used books across multiple categories.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Connect</h3>
                <p className="text-muted-foreground">Message sellers directly, negotiate prices, and arrange transactions.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Buy Securely</h3>
                <p className="text-muted-foreground">Complete purchases through our secure platform with buyer protection.</p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild>
                <a href="/search">Start Browsing</a>
              </Button>
            </div>
          </div>
        </section>
        
        <FeaturedBooks 
          title="Featured Books" 
          description="Hand-picked selections from our marketplace"
          books={featuredBooks} 
        />
        
        <CategorySection />
        
        {/* Bestsellers section */}
        <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Bestsellers</h2>
              <p className="text-muted-foreground mt-2">Popular books that everyone is reading</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bestSellers.slice(0, 4).map((book, index) => (
                <div key={book.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <BookCard book={book} />
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Button variant="outline" asChild>
                <a href="/search?bestseller=true">View All Bestsellers</a>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials section */}
        <section className="py-16 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">What Our Users Say</h2>
              <p className="text-muted-foreground mt-2">Stories from the BookBay community</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-card p-6 rounded-lg border animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full bg-primary/10 h-12 w-12 flex items-center justify-center">
                    <span className="font-medium text-primary">SL</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Sarah L.</h4>
                    <p className="text-sm text-muted-foreground">Book Seller</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"I've sold over 50 books on BookBay. The platform is easy to use, and I love connecting with other readers who appreciate my collection."</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full bg-primary/10 h-12 w-12 flex items-center justify-center">
                    <span className="font-medium text-primary">MJ</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Michael J.</h4>
                    <p className="text-sm text-muted-foreground">Book Buyer</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"I found a rare edition I'd been searching for years. The seller was knowledgeable and shipping was fast. Will definitely be back!"</p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="rounded-full bg-primary/10 h-12 w-12 flex items-center justify-center">
                    <span className="font-medium text-primary">AK</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Amy K.</h4>
                    <p className="text-sm text-muted-foreground">Book Collector</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"As a collector, I appreciate the detailed condition descriptions and high-quality photos. It makes buying online much more reliable."</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
