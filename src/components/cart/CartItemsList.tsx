
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import CartItem from './CartItem';
import { Book } from '@/data/books';

interface CartItem {
  id: string;
  book: Book;
  quantity: number;
}

interface CartItemsListProps {
  items: CartItem[];
  onQuantityChange: (id: string, change: number) => void;
  onRemove: (id: string) => void;
}

const CartItemsList = ({ items, onQuantityChange, onRemove }: CartItemsListProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {items.map(item => (
            <CartItem
              key={item.id}
              id={item.id}
              book={item.book}
              quantity={item.quantity}
              onQuantityChange={onQuantityChange}
              onRemove={onRemove}
            />
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
  );
};

export default CartItemsList;
