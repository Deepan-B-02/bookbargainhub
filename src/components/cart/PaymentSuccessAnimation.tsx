
import { Check } from 'lucide-react';

interface PaymentSuccessAnimationProps {
  visible: boolean;
}

const PaymentSuccessAnimation = ({ visible }: PaymentSuccessAnimationProps) => {
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/90 z-50">
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
  );
};

export default PaymentSuccessAnimation;
