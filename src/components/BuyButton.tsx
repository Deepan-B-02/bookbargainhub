
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Book } from '@/data/books';

interface BuyButtonProps {
  book: Book;
  isLoggedIn?: boolean; // In a real app, this would come from auth context
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  showIcon?: boolean;
}

const BuyButton = ({ 
  book,
  isLoggedIn = false, // Mock authentication state
  variant = 'default',
  size = 'default',
  showIcon = true
}: BuyButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleBuy = async () => {
    if (!isLoggedIn) {
      // Redirect to auth page with return URL
      navigate(`/auth?returnUrl=/book/${book.id}&action=buy`);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would add the book to the cart via API or context
      // For now, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Add to cart notification
      toast({
        title: "Added to cart",
        description: `${book.title} has been added to your cart.`,
      });
      
      // Navigate to cart
      navigate('/cart');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add the book to your cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleBuy}
      disabled={isLoading}
      className={isLoading ? 'opacity-80' : ''}
    >
      {isLoading ? (
        <>
          <span className="mr-2">Adding...</span>
          <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        </>
      ) : (
        <>
          {showIcon && (
            <>
              {!isLoggedIn ? (
                <LogIn className="mr-2 h-4 w-4" />
              ) : (
                <ShoppingCart className="mr-2 h-4 w-4" />
              )}
            </>
          )}
          {!isLoggedIn ? 'Sign in to Buy' : 'Add to Cart'}
        </>
      )}
    </Button>
  );
};

export default BuyButton;
