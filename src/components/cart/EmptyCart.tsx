
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const EmptyCart = () => {
  return (
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
  );
};

export default EmptyCart;
