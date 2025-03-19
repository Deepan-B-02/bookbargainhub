
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
}

const OrderSummary = ({ subtotal, shipping, total, onCheckout }: OrderSummaryProps) => {
  return (
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
          onClick={onCheckout}
        >
          Checkout
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        
        <div className="rounded bg-secondary/50 p-3 text-xs text-muted-foreground">
          <p>Our checkout is secure and we accept all major credit cards. By proceeding, you agree to our terms and conditions.</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
