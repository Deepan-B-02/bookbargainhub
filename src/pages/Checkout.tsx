
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Check, CreditCard, Smartphone, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import confetti from '@/lib/confetti';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  zipCode: z.string().min(5, {
    message: "Zip code must be at least 5 characters.",
  }),
  saveAddress: z.boolean().default(false),
});

const Checkout = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [orderComplete, setOrderComplete] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Setup form with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      saveAddress: false,
    },
  });

  // Process payment and order
  const processOrder = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success animation
      setOrderComplete(true);
      
      // Show confetti animation
      confetti();
      
      // Reset form
      form.reset();
      
      // Show success message
      toast({
        title: "Order placed successfully!",
        description: "You will receive an email confirmation shortly.",
      });
      
      // Redirect to homepage after a delay
      setTimeout(() => {
        navigate('/');
      }, 5000);
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Process the order with the delivery info
    processOrder();
  };

  // Simulate order details (in a real app, this would come from a cart context)
  const orderDetails = {
    subtotal: 47.98,
    shipping: 4.99,
    tax: 2.88,
    total: 55.85,
    items: [
      { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 12.99, quantity: 1 },
      { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", price: 17.99, quantity: 2 },
    ],
  };

  if (orderComplete) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 py-16">
          <div className="container max-w-md text-center mx-auto px-4">
            <div className="flex justify-center mb-8">
              <div className="rounded-full bg-green-100 p-3">
                <div className="rounded-full bg-green-200 p-3">
                  <Check className="h-12 w-12 text-green-600" />
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
              Your order has been placed successfully. We've sent you an email with all the details.
            </p>
            
            <div className="bg-card rounded-lg border p-6 mb-8 text-center">
              <p className="text-sm text-muted-foreground mb-2">Order Number</p>
              <p className="text-xl font-mono font-medium mb-4">#ORD-{Math.floor(100000 + Math.random() * 900000)}</p>
              <p className="text-sm text-muted-foreground">Amount Paid</p>
              <p className="text-2xl font-semibold">${orderDetails.total.toFixed(2)}</p>
            </div>
            
            <div className="space-y-4">
              <Button className="w-full" size="lg" asChild>
                <a href="/">Continue Shopping</a>
              </Button>
              
              <Button variant="outline" className="w-full" size="lg" asChild>
                <a href="/profile">View Order History</a>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              Thank you for shopping with BookBay!
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Checkout</h1>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="rounded-lg border bg-card overflow-hidden mb-6">
                <div className="bg-muted p-4">
                  <h2 className="font-semibold">Shipping Information</h2>
                </div>
                
                <div className="p-4">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="New York" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input placeholder="NY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP Code</FormLabel>
                              <FormControl>
                                <Input placeholder="10001" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="saveAddress"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Save this address for future orders</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>
              </div>
              
              <div className="rounded-lg border bg-card overflow-hidden">
                <div className="bg-muted p-4">
                  <h2 className="font-semibold">Payment Method</h2>
                </div>
                
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <div
                        className={`flex-1 border rounded-md p-4 cursor-pointer ${
                          paymentMethod === 'card'
                            ? 'border-primary bg-primary/5'
                            : 'hover:border-primary/50 hover:bg-secondary/50'
                        }`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <div className="flex items-center mb-2">
                          <CreditCard className="h-5 w-5 mr-2 text-primary" />
                          <span className="font-medium">Credit / Debit Card</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Pay securely with your card
                        </p>
                      </div>
                      
                      <div
                        className={`flex-1 border rounded-md p-4 cursor-pointer ${
                          paymentMethod === 'upi'
                            ? 'border-primary bg-primary/5'
                            : 'hover:border-primary/50 hover:bg-secondary/50'
                        }`}
                        onClick={() => setPaymentMethod('upi')}
                      >
                        <div className="flex items-center mb-2">
                          <Smartphone className="h-5 w-5 mr-2 text-primary" />
                          <span className="font-medium">UPI / Mobile Payment</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Pay using UPI or mobile wallet
                        </p>
                      </div>
                    </div>
                    
                    {paymentMethod === 'card' && (
                      <div className="animate-fade-in space-y-4 rounded-md border p-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Card Number</label>
                          <Input placeholder="4242 4242 4242 4242" />
                          <div className="text-xs text-muted-foreground flex items-center mt-1">
                            <ShieldCheck className="h-3 w-3 mr-1" />
                            Your card details are secure and encrypted
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Expiry Date</label>
                            <Input placeholder="MM/YY" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">CVV</label>
                            <Input placeholder="123" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Name on Card</label>
                          <Input placeholder="John Doe" />
                        </div>
                      </div>
                    )}
                    
                    {paymentMethod === 'upi' && (
                      <div className="animate-fade-in space-y-4 rounded-md border p-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">UPI ID</label>
                          <Input placeholder="name@upi" />
                        </div>
                        
                        <div className="flex items-center">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" alt="UPI" className="h-6 mr-2" />
                          <img src="https://1000logos.net/wp-content/uploads/2021/03/Paytm_Logo.png" alt="Paytm" className="h-6 mr-2" />
                          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png" alt="Google Pay" className="h-6 mr-2" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/1200px-PhonePe_Logo.svg.png" alt="PhonePe" className="h-6" />
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-4">
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          `Pay $${orderDetails.total.toFixed(2)}`
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="sticky top-20 rounded-lg border bg-card overflow-hidden">
                <div className="bg-muted p-4">
                  <h2 className="font-semibold">Order Summary</h2>
                </div>
                
                <div className="p-4">
                  <div className="space-y-3 mb-4">
                    {orderDetails.items.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.title} {item.quantity > 1 && `(x${item.quantity})`}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${orderDetails.subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${orderDetails.shipping.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${orderDetails.tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between font-medium text-base pt-2 border-t mt-2">
                      <span>Total</span>
                      <span>${orderDetails.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
