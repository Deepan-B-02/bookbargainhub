
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { toast } from 'sonner';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}

const OrderSummary = ({ subtotal, shipping, discount, total }: OrderSummaryProps) => {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  
  const handleApplyCoupon = () => {
    if (!couponCode) return;
    
    setIsApplying(true);
    
    // Simulate API call
    setTimeout(() => {
      if (couponCode.toUpperCase() === 'BOOK10') {
        // This will be handled by the parent component
        toast.success("Coupon applied: 10% discount");
      } else {
        toast.error("Invalid coupon code");
      }
      setIsApplying(false);
    }, 800);
  };

  const handleCheckout = () => {
    // Redirect to checkout/payment page
    navigate('/checkout');
  };

  const discountAmount = (subtotal * discount) / 100;

  return (
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
  );
};

export default OrderSummary;
