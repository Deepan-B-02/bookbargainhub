
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

interface BuyButtonProps {
  bookId: string;
  isSignedIn?: boolean;
}

const BuyButton = ({ bookId, isSignedIn = false }: BuyButtonProps) => {
  const navigate = useNavigate();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    // Simulate adding to cart
    setTimeout(() => {
      setIsAddingToCart(false);
      toast.success("Book added to cart!");
    }, 500);
  };
  
  const handleBuyNow = () => {
    if (!isSignedIn) {
      toast.error("Please sign in to continue", {
        action: {
          label: "Sign In",
          onClick: () => navigate('/auth'),
        },
      });
      return;
    }
    
    // Add to cart and navigate to checkout
    handleAddToCart();
    navigate('/checkout');
  };
  
  return (
    <div className="flex flex-col space-y-3 w-full">
      <Button 
        onClick={handleBuyNow}
        className="w-full"
      >
        <CreditCard className="mr-2 h-4 w-4" />
        Buy Now
      </Button>
      
      <Button 
        variant="outline" 
        onClick={handleAddToCart}
        disabled={isAddingToCart}
        className="w-full"
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        {isAddingToCart ? "Adding..." : "Add to Cart"}
      </Button>
    </div>
  );
};

export default BuyButton;
