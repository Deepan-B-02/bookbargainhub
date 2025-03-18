
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { books } from '@/data/books';
import CartItemsList from '@/components/cart/CartItemsList';
import OrderSummary from '@/components/cart/OrderSummary';
import EmptyCartState from '@/components/cart/EmptyCartState';
import PaymentSuccessAnimation from '@/components/cart/PaymentSuccessAnimation';

interface CartItem {
  id: string;
  book: typeof books[0];
  quantity: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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

  const applyCoupon = (couponCode: string) => {
    if (couponCode.toUpperCase() === 'BOOK10') {
      setDiscount(10);
      return true;
    }
    return false;
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping - ((subtotal * discount) / 100);

  // This would be used by the PaymentSuccessAnimation component
  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    
    // After animation, redirect to profile
    setTimeout(() => {
      navigate('/profile?tab=orders');
    }, 3000);
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
                <CartItemsList 
                  items={cartItems}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              </div>
              
              <div className="lg:col-span-1">
                <OrderSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  discount={discount}
                  total={total}
                />
              </div>
            </div>
          ) : (
            <EmptyCartState />
          )}
        </div>
      </main>
      
      <PaymentSuccessAnimation visible={paymentSuccess} />
      
      <Footer />
    </div>
  );
};

export default Cart;
