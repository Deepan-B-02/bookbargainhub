
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { addToCart } from '@/lib/supabase';

interface BuyButtonProps {
  bookId: string;
}

const BuyButton = ({ bookId }: BuyButtonProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please sign in to add items to cart", {
        action: {
          label: "Sign In",
          onClick: () => navigate('/auth'),
        },
      });
      return;
    }
    
    setIsAddingToCart(true);
    
    try {
      const { error } = await addToCart(user.id, bookId);
      
      if (error) {
        toast.error("Failed to add book to cart");
        console.error(error);
      } else {
        toast.success("Book added to cart!");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsAddingToCart(false);
    }
  };
  
  const handleBuyNow = async () => {
    if (!user) {
      toast.error("Please sign in to continue", {
        action: {
          label: "Sign In",
          onClick: () => navigate('/auth'),
        },
      });
      return;
    }
    
    // Add to cart and navigate to checkout
    setIsAddingToCart(true);
    
    try {
      const { error } = await addToCart(user.id, bookId);
      
      if (error) {
        toast.error("Failed to add book to cart");
        console.error(error);
      } else {
        navigate('/checkout');
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsAddingToCart(false);
    }
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
