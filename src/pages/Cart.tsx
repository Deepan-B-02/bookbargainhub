
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';
import CartItem from '@/components/cart/CartItem';
import OrderSummary from '@/components/cart/OrderSummary';
import EmptyCart from '@/components/cart/EmptyCart';

const Cart = () => {
  const { cartBooks, subtotal, shipping, total, removeItem, updateQuantity } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
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
            <EmptyCart />
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
                      <CartItem 
                        key={item.id}
                        item={item}
                        onRemove={removeItem}
                        onUpdateQuantity={updateQuantity}
                      />
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
                <OrderSummary 
                  subtotal={subtotal}
                  shipping={shipping}
                  total={total}
                  onCheckout={handleCheckout}
                />
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
