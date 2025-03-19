
import { Book } from '@/data/books';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  item: Book & { quantity: number };
  onRemove: (bookId: string) => void;
  onUpdateQuantity: (bookId: string, quantity: number) => void;
}

const CartItem = ({ item, onRemove, onUpdateQuantity }: CartItemProps) => {
  return (
    <div key={item.id} className="p-4 flex items-start animate-fade-in">
      <div className="h-24 w-16 flex-shrink-0 overflow-hidden rounded-md border">
        <img
          src={item.coverImage}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <div>
            <h3 className="text-sm font-medium">{item.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">by {item.author}</p>
            <p className="mt-1 text-xs text-muted-foreground capitalize">{item.condition}</p>
          </div>
          <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border rounded-md">
            <button
              type="button"
              className="p-1 text-muted-foreground"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-2 text-sm">{item.quantity}</span>
            <button
              type="button"
              className="p-1 text-muted-foreground"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          <button
            type="button"
            className="text-sm text-muted-foreground hover:text-destructive flex items-center"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
