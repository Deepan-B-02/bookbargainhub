
import { useState, useEffect } from 'react';
import { Book, books } from '@/data/books';
import { useToast } from '@/hooks/use-toast';

// Mock cart data - in a real app this would come from context or state management
const initialCartItems = [
  { bookId: '1', quantity: 1 },
  { bookId: '3', quantity: 2 },
];

export interface CartItem {
  bookId: string;
  quantity: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [cartBooks, setCartBooks] = useState<(Book & { quantity: number })[]>([]);
  const { toast } = useToast();
  
  // Calculate total price
  const subtotal = cartBooks.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  const shipping = 4.99;
  const total = subtotal + shipping;
  
  // Load cart items on mount
  useEffect(() => {
    // In a real app, this would fetch from localStorage or an API
    const loadCart = () => {
      const items = cartItems.map(item => {
        const book = books.find(book => book.id === item.bookId);
        if (book) {
          return {
            ...book,
            quantity: item.quantity
          };
        }
        return null;
      }).filter(Boolean) as (Book & { quantity: number })[];
      
      setCartBooks(items);
    };
    
    loadCart();
  }, [cartItems]);
  
  // Remove item from cart
  const removeItem = (bookId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.bookId !== bookId));
    
    toast({
      title: "Item removed",
      description: "The book has been removed from your cart",
    });
  };
  
  // Update quantity
  const updateQuantity = (bookId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.bookId === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return {
    cartItems,
    cartBooks,
    subtotal,
    shipping,
    total,
    removeItem,
    updateQuantity,
  };
};
