
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { 
  ShoppingCart,
  Trash2, 
  Plus, 
  Minus,
  CreditCard,
  ArrowRight,
  ShoppingBag,
  AlertCircle,
  Check
} from 'lucide-react';
import { books } from '@/data/books';

interface CartItem {
  id: string;
  book: typeof books[0];
  quantity: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Simulate fetching cart from localStorage or API
    const sampleCart: CartItem[] = [
      { id: '1', book: books[0], quantity: 1 },
      { id: '3', book: books[2], quantity: 1 },
    ];
    setCartItems(sampleCart);
  }, []);

  const handleQuantityChange = (id: string, change: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) } 
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const handleApplyCoupon = () => {
    if (!couponCode) return;
    
    setIsApplying(true);
    
    // Simulate API call
    setTimeout(() => {
      if (couponCode.toUpperCase() === 'BOOK10') {
        setDiscount(10);
        toast.success("Coupon applied: 10% discount");
      } else {
        toast.error("Invalid coupon code");
      }
      setIsApplying(false);
    }, 800);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + shipping - discountAmount;

  const handleCheckout = () => {
    // Redirect to checkout/payment page
    navigate('/checkout');
    
    // For demo purposes, simulate a successful payment
    setTimeout(() => {
      // Show success animation 
      const paymentSuccess = document.getElementById('payment-success');
      if (paymentSuccess) {
        paymentSuccess.classList.remove('hidden');
      }
      
      // After animation, redirect to profile
      setTimeout(() => {
        navigate('/profile?tab=orders');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-secondary/10">
        <div className="container px-4 mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-6 flex items-center">
            <ShoppingCart className="mr-2 h-8 w-8" />
            Your Cart
          </h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex gap-4">
                          <div className="w-24 h-36 overflow-hidden rounded-md">
                            <img 
                              src={item.book.coverImage} 
                              alt={item.book.title}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          
                          <div className="flex-1 space-y-1">
                            <Link to={`/book/${item.id}`} className="font-medium hover:underline">
                              {item.book.title}
                            </Link>
                            <p className="text-sm text-muted-foreground">by {item.book.author}</p>
                            <p className="text-sm">Condition: {item.book.condition}</p>
                            <p className="text-sm">Seller: {item.book.sellerName}</p>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-8 w-8" 
                                  onClick={() => handleQuantityChange(item.id, -1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-8 w-8" 
                                  onClick={() => handleQuantityChange(item.id, 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              <div className="flex items-center gap-4">
                                <span className="font-medium">${(item.book.price * item.quantity).toFixed(2)}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8">
                      <Button variant="outline" asChild className="w-full sm:w-auto">
                        <Link to="/search">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Continue Shopping
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount ({discount}%)</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      
                      <Separator className="my-3" />
                      
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Coupon code" 
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button 
                          variant="outline" 
                          onClick={handleApplyCoupon}
                          disabled={isApplying || !couponCode}
                        >
                          {isApplying ? "Applying..." : "Apply"}
                        </Button>
                      </div>
                      
                      <Button onClick={handleCheckout} className="w-full">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Proceed to Checkout
                      </Button>
                      
                      <p className="text-xs text-center text-muted-foreground mt-3">
                        Secure payment processed by RazorPay
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="w-full max-w-md mx-auto">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <ShoppingCart className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">
                  Looks like you haven't added any books to your cart yet.
                </p>
                <Button asChild>
                  <Link to="/search">
                    Browse Books
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      {/* Payment Success Animation (hidden by default) */}
      <div id="payment-success" className="fixed inset-0 flex items-center justify-center bg-background/90 z-50 hidden">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full animate-scale-in text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-muted-foreground mb-6">
            Your payment was processed successfully. Thank you for your purchase!
          </p>
          <div className="animate-pulse text-green-600 mb-6">
            Redirecting to your orders...
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
