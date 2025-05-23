
import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, 
  ShoppingCart, 
  Heart, 
  Settings, 
  LogOut, 
  Edit, 
  Book, 
  Package, 
  MessageCircle,
  Users
} from 'lucide-react';
import { books } from '@/data/books';
import BookCard from '@/components/BookCard';
import { useAuth } from '@/contexts/AuthContext';
import UserSearch from '@/components/UserSearch';
import UsersList from '@/components/UsersList';
import { toast } from 'sonner';

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, signOut } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || 'dashboard');
  
  // Real-time data states
  const [orders, setOrders] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [listedBooks, setListedBooks] = useState<any[]>([]);
  const [savedBooks, setSavedBooks] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Redirect if not logged in
    if (!currentUser) {
      navigate('/auth');
      return;
    }
    
    // Update URL when tab changes
    if (tabFromUrl !== activeTab) {
      setSearchParams({ tab: activeTab });
    }
    
    // Load real-time data
    loadUserData();

    // Set up interval for real-time updates
    const interval = setInterval(loadUserData, 30000);
    
    return () => clearInterval(interval);
  }, [currentUser, navigate, activeTab, tabFromUrl, setSearchParams]);
  
  // Load user-specific data
  const loadUserData = () => {
    if (!currentUser) return;
    
    // Load orders - in a real app, this would fetch from a database
    // For now, we'll simulate it with localStorage
    const storedOrders = JSON.parse(localStorage.getItem(`bookbay_orders_${currentUser.id}`) || '[]');
    setOrders(storedOrders);
    
    // Load messages
    const storedMessages = JSON.parse(localStorage.getItem(`bookbay_messages_${currentUser.id}`) || '[]');
    setMessages(storedMessages);
    
    // Load listed books (using a subset of the sample books data)
    // In a real app, this would be user-specific
    setListedBooks(books.slice(0, 4));
    
    // Load saved books
    setSavedBooks(books.slice(2, 6));
  };
  
  const handleLogout = () => {
    signOut();
    navigate('/');
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };
  
  // Handle various button actions
  const handleRemoveBook = (bookId: string) => {
    // In a real app, this would remove the book from the database
    toast.success('Book removed successfully');
    setListedBooks(listedBooks.filter(book => book.id !== bookId));
  };
  
  const handleRemoveSavedBook = (bookId: string) => {
    toast.success('Book removed from saved list');
    setSavedBooks(savedBooks.filter(book => book.id !== bookId));
  };
  
  const handleAddToCart = (bookId: string) => {
    // In a real app, this would add the book to the user's cart
    toast.success('Book added to cart');
    navigate('/cart');
  };
  
  const handleEditBook = (bookId: string) => {
    // In a real app, this would navigate to an edit page
    navigate(`/sell?edit=${bookId}`);
  };
  
  const handleViewOrderDetails = (orderId: string) => {
    // In a real app, this would show a modal or navigate to an order details page
    toast.info(`Viewing details for order ${orderId}`);
  };
  
  const handleReadMessage = (messageId: string) => {
    // Mark message as read
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, unread: false } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem(`bookbay_messages_${currentUser?.id}`, JSON.stringify(updatedMessages));
    toast.info('Opening message');
  };
  
  // If not logged in, don't render the profile page
  if (!currentUser) {
    return null;
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-secondary">
          <div className="container px-4 py-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-medium text-primary">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                  <p className="text-sm text-muted-foreground">Member since {currentUser.memberSince}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" asChild>
                  <Link to="/profile?tab=settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="container px-4 py-8">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full space-y-6">
            <div className="border-b">
              <TabsList className="w-full h-auto justify-start rounded-none p-0 bg-transparent">
                <TabsTrigger
                  value="dashboard"
                  className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger
                  value="listings"
                  className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <Book className="h-4 w-4 mr-2" />
                  My Listings
                </TabsTrigger>
                <TabsTrigger
                  value="saved"
                  className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Saved Books
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Orders
                </TabsTrigger>
                <TabsTrigger
                  value="messages"
                  className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Messages
                </TabsTrigger>
                <TabsTrigger
                  value="users"
                  className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Users
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="dashboard" className="animate-fade-in">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Books Listed
                    </CardTitle>
                    <Book className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {currentUser.booksListed}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +3 this month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Books Sold
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {currentUser.booksSold}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +2 this month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Books Purchased
                    </CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {currentUser.booksPurchased}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +1 this month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Unread Messages
                    </CardTitle>
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {messages.filter(m => m.unread).length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +{messages.filter(m => m.unread).length} new messages
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid gap-6 lg:grid-cols-2 mt-6">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>
                      Your most recent purchases
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.slice(0, 3).map(order => (
                          <div key={order.id} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{order.id}</p>
                              <p className="text-sm text-muted-foreground">
                                {order.date} • {order.items} {order.items === 1 ? 'item' : 'items'}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${order.totalAmount.toFixed(2)}</p>
                              <p className={`text-sm ${
                                order.status === 'Delivered' ? 'text-green-500' : 
                                order.status === 'Shipped' ? 'text-blue-500' :
                                'text-amber-500'
                              }`}>
                                {order.status}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div className="mt-4 pt-4 border-t">
                          <Button variant="outline" asChild className="w-full">
                            <Link to="/profile?tab=orders">View All Orders</Link>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">No recent orders.</p>
                        <Button asChild className="mt-4">
                          <Link to="/search">Browse Books</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                    <CardDescription>
                      Your latest conversations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {messages.length > 0 ? (
                      <div className="space-y-4">
                        {messages.slice(0, 3).map(message => (
                          <div key={message.id} className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center">
                                <span className="font-medium text-xs">{message.from.split(' ').map((n: string) => n[0]).join('')}</span>
                              </div>
                              <div>
                                <p className="font-medium">{message.from}</p>
                                <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                                  {message.subject}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">{message.date}</p>
                              {message.unread && (
                                <div className="h-2 w-2 bg-primary rounded-full ml-auto mt-1"></div>
                              )}
                            </div>
                          </div>
                        ))}
                        <div className="mt-4 pt-4 border-t">
                          <Button variant="outline" asChild className="w-full">
                            <Link to="/profile?tab=messages">View All Messages</Link>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground">No recent messages.</p>
                        <Button asChild className="mt-4" onClick={() => setActiveTab('users')}>
                          <Link to="/profile?tab=users">Find Users</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="listings" className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">My Listed Books</h2>
                <Button asChild>
                  <Link to="/sell">
                    <Edit className="h-4 w-4 mr-2" />
                    List a Book
                  </Link>
                </Button>
              </div>
              
              {listedBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {listedBooks.map(book => (
                    <div key={book.id}>
                      <BookCard book={book} />
                      <div className="mt-3 flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleEditBook(book.id)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 text-destructive hover:text-destructive"
                          onClick={() => handleRemoveBook(book.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Book className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No books listed yet</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      You haven't listed any books for sale. Start sharing your collection with other readers.
                    </p>
                    <Button asChild>
                      <Link to="/sell">
                        <Edit className="h-4 w-4 mr-2" />
                        List Your First Book
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="saved" className="animate-fade-in">
              <h2 className="text-xl font-bold mb-6">Saved Books</h2>
              
              {savedBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {savedBooks.map(book => (
                    <div key={book.id}>
                      <BookCard book={book} />
                      <div className="mt-3 flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleAddToCart(book.id)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 text-destructive hover:text-destructive"
                          onClick={() => handleRemoveSavedBook(book.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No saved books</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      You haven't saved any books yet. Browse the marketplace and save books you're interested in.
                    </p>
                    <Button asChild>
                      <Link to="/search">
                        Browse Books
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="orders" className="animate-fade-in">
              <h2 className="text-xl font-bold mb-6">Order History</h2>
              
              {orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map(order => (
                    <Card key={order.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.date} • {order.items} {order.items === 1 ? 'item' : 'items'}
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="text-right">
                              <p className="font-medium">${order.totalAmount.toFixed(2)}</p>
                              <p className={`text-sm ${
                                order.status === 'Delivered' ? 'text-green-500' : 
                                order.status === 'Shipped' ? 'text-blue-500' :
                                'text-amber-500'
                              }`}>
                                {order.status}
                              </p>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewOrderDetails(order.id)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <Package className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No orders yet</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      You haven't placed any orders yet. Start exploring books to purchase.
                    </p>
                    <Button asChild>
                      <Link to="/search">
                        Browse Books
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="messages" className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Messages</h2>
                <Button variant="outline" onClick={() => setActiveTab('users')}>
                  <Users className="h-4 w-4 mr-2" />
                  Find Users
                </Button>
              </div>
              
              {messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map(message => (
                    <Card key={message.id} className={`${message.unread ? 'bg-primary/5 border-primary/10' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                              <span className="font-medium text-xs">{message.from.split(' ').map((n: string) => n[0]).join('')}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{message.from}</p>
                                {message.unread && (
                                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {message.subject}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-muted-foreground">{message.date}</p>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleReadMessage(message.id)}
                            >
                              Read
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No messages</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      You don't have any messages yet. Messages from sellers and buyers will appear here.
                    </p>
                    <Button onClick={() => setActiveTab('users')}>
                      Find Users to Message
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="users" className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">Find Users</h2>
                <UserSearch 
                  onSelectUser={(user) => {
                    toast.info(`Selected ${user.name}`);
                    // In a real app, this would open a messaging interface
                  }}
                  className="mb-6"
                />
                <UsersList />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
