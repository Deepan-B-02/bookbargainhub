import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const footerRef = useRef<HTMLDivElement>(null);
  
  // Scroll to top on page load, unless scrollToBottom is in the query params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const shouldScrollToBottom = searchParams.get('scrollToBottom') === 'true';
    
    if (shouldScrollToBottom && footerRef.current) {
      // Scroll to the footer section
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Otherwise scroll to top
      window.scrollTo(0, 0);
    }
  }, [location]);

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
        
        {/* About section (target for About link) */}
        <section id="about" className="py-16 bg-primary/5" ref={footerRef}>
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight">About BookBay</h2>
              <p className="text-muted-foreground mt-4">Connecting book lovers since 2023</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <p className="text-lg">
                  BookBay was founded with a simple mission: to give books a second life and connect readers around the world.
                </p>
                <p>
                  We believe that every book deserves a reader who will appreciate it. That's why we've created a platform where book enthusiasts can buy, sell, and trade books easily and securely.
                </p>
                <p>
                  Our community spans across 50+ countries and includes students, teachers, collectors, and casual readers who all share a passion for the written word.
                </p>
                <div className="pt-4">
                  <h3 className="font-semibold text-lg mb-2">Our Values</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Making literature accessible to everyone</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Promoting sustainability through reuse</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Building a global community of readers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Supporting independent authors and sellers</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border p-6">
                <h3 className="font-semibold text-lg mb-4">BookBay by the Numbers</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="text-3xl font-bold text-primary">500K+</div>
                    <div className="text-sm text-muted-foreground">Books Listed</div>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="text-3xl font-bold text-primary">100K+</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="text-3xl font-bold text-primary">30+</div>
                    <div className="text-sm text-muted-foreground">Categories</div>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="text-3xl font-bold text-primary">4.8/5</div>
                    <div className="text-sm text-muted-foreground">User Rating</div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <h4 className="font-medium">Contact Us</h4>
                  <p className="text-sm text-muted-foreground">
                    Have questions or suggestions? We'd love to hear from you!
                  </p>
                  <Button variant="outline" className="w-full mt-2">
                    hello@bookbay.com
                  </Button>
                </div>
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
