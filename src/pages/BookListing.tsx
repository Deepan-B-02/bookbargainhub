
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { books } from '@/data/books';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedBooks from '@/components/FeaturedBooks';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Heart, 
  Share, 
  MessageCircle, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Star
} from 'lucide-react';
import { toast } from 'sonner';

const BookListing = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState(books.find(b => b.id === id));
  const [relatedBooks, setRelatedBooks] = useState(books.filter(b => 
    b.id !== id && 
    b.category.some(cat => book?.category.includes(cat))
  ).slice(0, 8));
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'seller'>('description');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!book && id) {
      const foundBook = books.find(b => b.id === id);
      setBook(foundBook);
      
      if (foundBook) {
        setRelatedBooks(books.filter(b => 
          b.id !== id && 
          b.category.some(cat => foundBook.category.includes(cat))
        ).slice(0, 8));
      }
    }
  }, [id, book]);
  
  if (!book) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
            <p className="text-muted-foreground mb-6">The book you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/search">Browse Books</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleAddToCart = () => {
    toast.success("Book added to cart");
  };
  
  const handleSaveToWishlist = () => {
    toast.success("Book saved to wishlist");
  };
  
  const handleShare = () => {
    toast.success("Sharing options opened");
  };
  
  const handleContactSeller = () => {
    toast.success("Message sent to seller");
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-secondary/50">
          <div className="container px-4 py-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link to="/search" className="hover:text-primary transition-colors">Books</Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link 
                to={`/search?category=${book.category[0]}`} 
                className="hover:text-primary transition-colors"
              >
                {book.category[0].charAt(0).toUpperCase() + book.category[0].slice(1)}
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-foreground truncate max-w-[200px]">{book.title}</span>
            </div>
          </div>
        </div>
      
        {/* Book details */}
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex justify-center lg:justify-end">
                <div className="relative max-w-[350px] w-full">
                  <div className="aspect-[2/3] w-full overflow-hidden rounded-lg border bg-secondary/40">
                    {!isImageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-secondary animate-pulse">
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                    
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className={`h-full w-full object-cover transition-opacity ${
                        isImageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => setIsImageLoaded(true)}
                    />
                  </div>
                  
                  {book.bestSeller && (
                    <Badge className="absolute top-4 left-4 bg-amber-500 text-white">
                      Bestseller
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {book.category.map(cat => (
                      <Link key={cat} to={`/search?category=${cat}`}>
                        <Badge variant="secondary" className="capitalize">
                          {cat}
                        </Badge>
                      </Link>
                    ))}
                    <Badge variant="outline" className="capitalize">
                      {book.condition}
                    </Badge>
                  </div>
                  
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
                    {book.title}
                  </h1>
                  <p className="text-xl text-muted-foreground">by {book.author}</p>
                </div>
                
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-bold">${book.price.toFixed(2)}</div>
                  {book.originalPrice && (
                    <div className="text-muted-foreground line-through text-lg mb-1">
                      ${book.originalPrice.toFixed(2)}
                    </div>
                  )}
                  {book.originalPrice && (
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200 mb-1">
                      Save ${(book.originalPrice - book.price).toFixed(2)}
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {book.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    Listed {book.dateAdded}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" onClick={handleAddToCart} className="flex-1">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={handleSaveToWishlist}
                    className="flex-1"
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Add to Wishlist
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleContactSeller}
                    className="flex-1"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact Seller
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleShare}
                    className="flex-1"
                  >
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
                
                <div className="pt-6 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => setActiveTab('description')}
                      className={`px-4 py-2 text-sm font-medium ${
                        activeTab === 'description'
                          ? 'border-b-2 border-primary text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Description
                    </button>
                    <button
                      onClick={() => setActiveTab('details')}
                      className={`px-4 py-2 text-sm font-medium ${
                        activeTab === 'details'
                          ? 'border-b-2 border-primary text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Book Details
                    </button>
                    <button
                      onClick={() => setActiveTab('seller')}
                      className={`px-4 py-2 text-sm font-medium ${
                        activeTab === 'seller'
                          ? 'border-b-2 border-primary text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Seller
                    </button>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 animate-fade-in">
                    {activeTab === 'description' && (
                      <p className="text-muted-foreground text-pretty leading-relaxed">
                        {book.description}
                      </p>
                    )}
                    
                    {activeTab === 'details' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium">Condition</p>
                            <p className="text-muted-foreground capitalize">{book.condition}</p>
                          </div>
                          <div>
                            <p className="font-medium">Format</p>
                            <p className="text-muted-foreground">Paperback</p>
                          </div>
                          <div>
                            <p className="font-medium">Language</p>
                            <p className="text-muted-foreground">English</p>
                          </div>
                          <div>
                            <p className="font-medium">ISBN</p>
                            <p className="text-muted-foreground">978-3-16-148410-0</p>
                          </div>
                          <div>
                            <p className="font-medium">Publisher</p>
                            <p className="text-muted-foreground">Penguin Books</p>
                          </div>
                          <div>
                            <p className="font-medium">Publication Date</p>
                            <p className="text-muted-foreground">January 2020</p>
                          </div>
                          <div>
                            <p className="font-medium">Pages</p>
                            <p className="text-muted-foreground">336</p>
                          </div>
                          <div>
                            <p className="font-medium">Weight</p>
                            <p className="text-muted-foreground">0.5 kg</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'seller' && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 h-12 w-12 flex items-center justify-center">
                            <span className="font-medium text-primary">
                              {book.sellerName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium">{book.sellerName}</h4>
                            <div className="flex items-center gap-1 text-sm">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < Math.floor(book.sellerRating)
                                        ? 'text-amber-500 fill-amber-500'
                                        : 'text-muted stroke-muted'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-muted-foreground">
                                ({book.sellerRating.toFixed(1)})
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Verified seller with 98% positive feedback. Member since January 2020 with 230+ completed transactions.
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleContactSeller}
                          className="w-full"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Contact Seller
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Similar books */}
        <FeaturedBooks 
          title="You Might Also Like" 
          books={relatedBooks} 
        />
      </main>
      <Footer />
    </div>
  );
};

export default BookListing;
