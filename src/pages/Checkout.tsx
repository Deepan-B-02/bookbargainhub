
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Check, CreditCard, Shield, CalendarClock } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };
  
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiry(e.target.value);
    setCardExpiry(formattedValue);
  };
  
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'card') {
      if (!cardName || !cardNumber || !cardExpiry || !cardCvc) {
        toast.error("Please fill in all payment details");
        return;
      }
      
      if (cardNumber.replace(/\s/g, '').length < 16) {
        toast.error("Please enter a valid card number");
        return;
      }
      
      if (cardExpiry.length < 5) {
        toast.error("Please enter a valid expiry date");
        return;
      }
      
      if (cardCvc.length < 3) {
        toast.error("Please enter a valid security code");
        return;
      }
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // After showing success, redirect to orders page
      setTimeout(() => {
        navigate('/profile?tab=orders');
      }, 3000);
    }, 2000);
  };
  
  if (paymentSuccess) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-12 bg-secondary/10">
          <div className="container px-4 max-w-md mx-auto">
            <Card className="animate-scale-in">
              <CardContent className="pt-6 pb-8 px-8 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <Check className="h-12 w-12 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
                <p className="text-muted-foreground mb-6">
                  Your order has been placed and payment was processed successfully.
                </p>
                <div className="w-full max-w-xs h-2 bg-secondary rounded-full overflow-hidden mb-6">
                  <div className="h-full bg-primary animate-pulse"></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Redirecting to your orders...
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-secondary/10">
        <div className="container px-4 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="card" onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card">Credit Card</TabsTrigger>
                      <TabsTrigger value="upi">UPI</TabsTrigger>
                      <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card" className="space-y-4 mt-4">
                      <form onSubmit={handlePayment}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Cardholder Name</Label>
                            <Input 
                              id="name" 
                              placeholder="John Doe" 
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="number">Card Number</Label>
                            <div className="relative">
                              <Input 
                                id="number" 
                                placeholder="1234 5678 9012 3456" 
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                maxLength={19}
                                required
                              />
                              <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input 
                                id="expiry" 
                                placeholder="MM/YY" 
                                value={cardExpiry}
                                onChange={handleExpiryChange}
                                maxLength={5}
                                required
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input 
                                id="cvc" 
                                placeholder="123" 
                                value={cardCvc}
                                onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                maxLength={4}
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-4">
                            <Shield className="h-4 w-4" />
                            <span>Your payment information is secure and encrypted</span>
                          </div>
                        </div>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="upi" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="upi-id">UPI ID</Label>
                        <Input id="upi-id" placeholder="name@upi" />
                      </div>
                      
                      <div className="mt-4 text-sm text-muted-foreground">
                        <p>You will receive a payment request on your UPI app.</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="netbanking" className="space-y-4 mt-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="border rounded-md p-3 text-center hover:border-primary cursor-pointer">
                            <p className="font-medium">HDFC Bank</p>
                          </div>
                          <div className="border rounded-md p-3 text-center hover:border-primary cursor-pointer">
                            <p className="font-medium">ICICI Bank</p>
                          </div>
                          <div className="border rounded-md p-3 text-center hover:border-primary cursor-pointer">
                            <p className="font-medium">SBI</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="other-bank">Other Banks</Label>
                          <select 
                            id="other-bank" 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="">Select Bank</option>
                            <option value="axis">Axis Bank</option>
                            <option value="kotak">Kotak Mahindra Bank</option>
                            <option value="pnb">Punjab National Bank</option>
                          </select>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>$37.49</span>
                    </div>
                    
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-$3.75</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>$5.99</span>
                    </div>
                    
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>$39.73</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">Delivery Information</h3>
                    <p className="text-sm">
                      Estimated delivery within 3-5 business days
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                      <CalendarClock className="h-4 w-4 mr-2" />
                      <span>Delivery by Wed, Jul 20</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    disabled={isProcessing}
                    onClick={handlePayment}
                  >
                    {isProcessing ? "Processing..." : "Complete Payment"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
