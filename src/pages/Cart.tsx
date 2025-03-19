
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Book } from '@/data/books';
import { books } from '@/data/books';

// Mock cart data - in a real app this would come from context or state management
const initialCartItems = [
  { bookId: 1, quantity: 1 },
  { bookId: 3, quantity: 2 },
];

interface CartItem {
  bookId: number;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [cartBooks, setCartBooks] = useState<(Book & { quantity: number })[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Calculate total price
  const subtotal = cartBooks.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  const shipping = 4.99;
  const total = subtotal + shipping;
  
  // Load cart items on mount
  useEffect(() => {
    // In a real app, this would fetch from localStorage or an API
    const loadCart = () => {
      const items = cartItems.map(item => {
        const book = books.find(book => book.id === item.bookId);
        if (book) {
          return {
            ...book,
            quantity: item.quantity
          };
        }
        return null;
      }).filter(Boolean) as (Book & { quantity: number })[];
      
      setCartBooks(items);
    };
    
    loadCart();
  }, [cartItems]);
  
  // Remove item from cart
  const removeItem = (bookId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.bookId !== bookId));
    
    toast({
      title: "Item removed",
      description: "The book has been removed from your cart",
    });
  };
  
  // Update quantity
  const updateQuantity = (bookId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.bookId === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  // Proceed to checkout
  const handleCheckout = () => {
    if (cartBooks.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some books to your cart before checking out",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate to checkout
    navigate('/checkout');
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Your Cart</h1>
          
          {cartBooks.length === 0 ? (
            <div className="py-12 text-center">
              <div className="inline-block p-6 rounded-full bg-secondary mb-6">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-3">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added any books to your cart yet.</p>
              <Button asChild size="lg">
                <Link to="/search">Browse Books</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                {/* Cart items */}
                <div className="rounded-lg border bg-card overflow-hidden">
                  <div className="bg-muted p-4">
                    <h2 className="font-semibold">Shopping Cart ({cartBooks.length} items)</h2>
                  </div>
                  
                  <div className="divide-y">
                    {cartBooks.map((item) => (
                      <div key={item.id} className="p-4 flex items-start animate-fade-in">
                        <div className="h-24 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                          <img
                            src={item.coverImage}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-sm font-medium">{item.title}</h3>
                              <p className="mt-1 text-sm text-muted-foreground">by {item.author}</p>
                              <p className="mt-1 text-xs text-muted-foreground capitalize">{item.condition}</p>
                            </div>
                            <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border rounded-md">
                              <button
                                type="button"
                                className="p-1 text-muted-foreground"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-2 text-sm">{item.quantity}</span>
                              <button
                                type="button"
                                className="p-1 text-muted-foreground"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <button
                              type="button"
                              className="text-sm text-muted-foreground hover:text-destructive flex items-center"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Continue shopping */}
                <div className="flex justify-start">
                  <Button variant="outline" asChild>
                    <Link to="/search">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
              
              {/* Order summary */}
              <div>
                <div className="sticky top-20 rounded-lg border bg-card overflow-hidden">
                  <div className="bg-muted p-4">
                    <h2 className="font-semibold">Order Summary</h2>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping estimate</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-medium">
                          <span>Order total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handleCheckout}
                    >
                      Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <div className="rounded bg-secondary/50 p-3 text-xs text-muted-foreground">
                      <p>Our checkout is secure and we accept all major credit cards. By proceeding, you agree to our terms and conditions.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
