
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Book } from '@/data/books';

interface CartItemProps {
  id: string;
  book: Book;
  quantity: number;
  onQuantityChange: (id: string, change: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({ id, book, quantity, onQuantityChange, onRemove }: CartItemProps) => {
  return (
    <div className="flex gap-4">
      <div className="w-24 h-36 overflow-hidden rounded-md">
        <img 
          src={book.coverImage} 
          alt={book.title}
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="flex-1 space-y-1">
        <Link to={`/book/${id}`} className="font-medium hover:underline">
          {book.title}
        </Link>
        <p className="text-sm text-muted-foreground">by {book.author}</p>
        <p className="text-sm">Condition: {book.condition}</p>
        <p className="text-sm">Seller: {book.sellerName}</p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8" 
              onClick={() => onQuantityChange(id, -1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8" 
              onClick={() => onQuantityChange(id, 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="font-medium">${(book.price * quantity).toFixed(2)}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-destructive hover:text-destructive"
              onClick={() => onRemove(id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
