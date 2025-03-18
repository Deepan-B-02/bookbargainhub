
import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase URL and public anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type User = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
}

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  original_price?: number;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  category: string[];
  cover_image: string;
  seller_id: string;
  seller_name: string;
  seller_rating: number;
  location: string;
  date_added: string;
  featured: boolean;
  best_seller: boolean;
}

export type CartItem = {
  id: string;
  user_id: string;
  book_id: string;
  quantity: number;
  created_at: string;
}

export type Order = {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_address: string;
  payment_method: string;
  payment_status: 'pending' | 'paid' | 'failed';
  created_at: string;
}

export type OrderItem = {
  id: string;
  order_id: string;
  book_id: string;
  quantity: number;
  unit_price: number;
}

// Auth helpers
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, error };
};

// Book helpers
export const getBooks = async () => {
  const { data, error } = await supabase
    .from('books')
    .select('*');
  
  return { data, error };
};

export const getBookById = async (id: string) => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', id)
    .single();
  
  return { data, error };
};

export const createBook = async (book: Omit<Book, 'id' | 'date_added'>) => {
  const { data, error } = await supabase
    .from('books')
    .insert([{
      ...book,
      date_added: new Date().toISOString(),
    }])
    .select();
  
  return { data, error };
};

// Cart helpers
export const getCartItems = async (userId: string) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      *,
      books:book_id (*)
    `)
    .eq('user_id', userId);
  
  return { data, error };
};

export const addToCart = async (userId: string, bookId: string, quantity: number = 1) => {
  // Check if the item is already in the cart
  const { data: existingItem } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userId)
    .eq('book_id', bookId)
    .single();

  if (existingItem) {
    // Update quantity
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: existingItem.quantity + quantity })
      .eq('id', existingItem.id)
      .select();
    
    return { data, error };
  } else {
    // Add new item
    const { data, error } = await supabase
      .from('cart_items')
      .insert([{
        user_id: userId,
        book_id: bookId,
        quantity,
      }])
      .select();
    
    return { data, error };
  }
};

export const removeFromCart = async (cartItemId: string) => {
  const { data, error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId);
  
  return { data, error };
};

export const updateCartItemQuantity = async (cartItemId: string, quantity: number) => {
  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', cartItemId)
    .select();
  
  return { data, error };
};

// Order helpers
export const createOrder = async (
  userId: string, 
  items: { bookId: string; quantity: number; unitPrice: number }[],
  totalAmount: number,
  shippingAddress: string,
  paymentMethod: string
) => {
  // Create the order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([{
      user_id: userId,
      status: 'pending',
      total_amount: totalAmount,
      shipping_address: shippingAddress,
      payment_method: paymentMethod,
      payment_status: 'pending',
    }])
    .select()
    .single();

  if (orderError || !order) {
    return { data: null, error: orderError };
  }

  // Create order items
  const orderItems = items.map(item => ({
    order_id: order.id,
    book_id: item.bookId,
    quantity: item.quantity,
    unit_price: item.unitPrice
  }));

  const { data: orderItemsData, error: orderItemsError } = await supabase
    .from('order_items')
    .insert(orderItems)
    .select();

  if (orderItemsError) {
    return { data: { order, orderItems: [] }, error: orderItemsError };
  }

  // Clear the cart
  await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId);

  return { data: { order, orderItems: orderItemsData }, error: null };
};

export const getUserOrders = async (userId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items:order_items (
        *,
        book:book_id (*)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

// File upload helper
export const uploadBookCover = async (file: File, path: string) => {
  const { data, error } = await supabase.storage
    .from('book-covers')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) {
    return { data: null, error };
  }
  
  // Get the public URL
  const { data: { publicUrl } } = supabase.storage
    .from('book-covers')
    .getPublicUrl(data.path);
  
  return { data: { path: data.path, url: publicUrl }, error: null };
};
