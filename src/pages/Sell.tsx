
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, ChevronLeft, ChevronRight, BookText, Image as ImageIcon, DollarSign, CheckCircle2 } from "lucide-react";

// Form schema
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  author: z.string().min(2, {
    message: "Author name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  condition: z.string({
    required_error: "Please select a condition.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number.",
  }),
});

const Sell = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      condition: "",
      category: "",
      price: "",
    },
  });

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (!e.target.files) return;
    
    const newFiles = Array.from(e.target.files);
    if (images.length + newFiles.length > 5) {
      toast({
        title: "Too many images",
        description: "You can upload a maximum of 5 images",
        variant: "destructive",
      });
      return;
    }
    
    setImages([...images, ...newFiles]);
    
    // Create preview URLs
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);
  };

  // Remove image
  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviewUrls = [...imagePreviewUrls];
    
    // Revoke URL to prevent memory leak
    URL.revokeObjectURL(newPreviewUrls[index]);
    
    newImages.splice(index, 1);
    newPreviewUrls.splice(index, 1);
    
    setImages(newImages);
    setImagePreviewUrls(newPreviewUrls);
  };

  // Navigate between steps
  const nextStep = () => {
    if (currentStep === 1 && images.length === 0) {
      toast({
        title: "Images required",
        description: "Please upload at least one image of your book",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep === 2) {
      // Validate form before proceeding to step 3
      form.trigger(["title", "author", "description", "condition", "category"]);
      const errors = form.formState.errors;
      if (errors.title || errors.author || errors.description || errors.condition || errors.category) {
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Here you would typically upload images to a server and create a book listing
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast({
        title: "Book listed successfully!",
        description: "Your book has been listed on BookBay.",
      });
      
      // Redirect to home after a delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "There was an error listing your book. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-secondary/20 py-12">
        <div className="container max-w-4xl">
          <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
            <div className="bg-primary/10 p-6">
              <h1 className="text-2xl md:text-3xl font-bold">Sell Your Book</h1>
              <p className="text-muted-foreground mt-2">
                List your book on BookBay in just a few simple steps.
              </p>
            </div>
            
            {/* Step indicator */}
            <div className="relative px-6 pt-6">
              <div className="flex justify-between mb-6">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <span className="text-xs mt-2">Upload Images</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                    <BookText className="h-5 w-5" />
                  </div>
                  <span className="text-xs mt-2">Book Details</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <span className="text-xs mt-2">Price</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 4 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <span className="text-xs mt-2">Confirmation</span>
                </div>
              </div>
              
              <div className="absolute top-11 left-11 right-11 h-0.5 bg-secondary">
                <div 
                  className="h-full bg-primary transition-all duration-300" 
                  style={{ width: `${(currentStep - 1) * 33.3}%` }}
                ></div>
              </div>
            </div>
            
            {/* Form content */}
            <div className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Step 1: Image Upload */}
                  {currentStep === 1 && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="bg-secondary/50 border border-dashed rounded-lg p-8 text-center">
                        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Upload Book Images</h3>
                        <p className="text-muted-foreground mb-4 text-sm">
                          Drag and drop your images here or click to browse. You can upload up to 5 images.
                          High-quality images increase your chances of selling.
                        </p>
                        <Button type="button" variant="outline" className="relative">
                          Choose Images
                          <input 
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleImageUpload}
                            accept="image/*"
                            multiple
                          />
                        </Button>
                      </div>
                      
                      {/* Preview uploaded images */}
                      {imagePreviewUrls.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                          {imagePreviewUrls.map((url, index) => (
                            <div key={index} className="relative group">
                              <img 
                                src={url} 
                                alt={`Book image ${index + 1}`} 
                                className="aspect-[3/4] object-cover rounded-md border"
                              />
                              <button
                                type="button"
                                className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                              >
                                <span className="sr-only">Remove image</span>
                                <span aria-hidden="true">×</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Step 2: Book Details */}
                  {currentStep === 2 && (
                    <div className="space-y-4 animate-fade-in">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Book Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter the title of the book" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Author</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter the author's name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe the book, its plot, and any other relevant details" 
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="condition"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Condition</FormLabel>
                              <Select 
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select condition" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="new">New</SelectItem>
                                  <SelectItem value="like-new">Like New</SelectItem>
                                  <SelectItem value="good">Good</SelectItem>
                                  <SelectItem value="fair">Fair</SelectItem>
                                  <SelectItem value="poor">Poor</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Be honest about the condition for better buyer trust.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select 
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="fiction">Fiction</SelectItem>
                                  <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                                  <SelectItem value="mystery">Mystery & Thriller</SelectItem>
                                  <SelectItem value="sci-fi">Science Fiction</SelectItem>
                                  <SelectItem value="fantasy">Fantasy</SelectItem>
                                  <SelectItem value="romance">Romance</SelectItem>
                                  <SelectItem value="biography">Biography</SelectItem>
                                  <SelectItem value="history">History</SelectItem>
                                  <SelectItem value="business">Business</SelectItem>
                                  <SelectItem value="cooking">Cooking</SelectItem>
                                  <SelectItem value="children">Children's Books</SelectItem>
                                  <SelectItem value="textbook">Textbooks</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: Price */}
                  {currentStep === 3 && (
                    <div className="space-y-6 animate-fade-in">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price ($)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  placeholder="29.99" 
                                  {...field} 
                                  className="pl-9" 
                                  type="number"
                                  step="0.01"
                                  min="0.01"
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Set a competitive price to attract buyers. The average book price on our platform is $15-30.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="bg-secondary/50 p-4 rounded-md">
                        <h4 className="font-medium mb-2">Pricing Tips</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>Consider the condition when setting your price</li>
                          <li>Books in high demand can be priced higher</li>
                          <li>Limited or rare editions might fetch premium prices</li>
                          <li>Recent releases typically sell for 50-70% of retail price</li>
                          <li>BookBay charges a 10% fee on successful sales</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 4: Confirmation */}
                  {currentStep === 4 && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">
                        <h3 className="flex items-center font-medium">
                          <CheckCircle2 className="h-5 w-5 mr-2" />
                          Ready to List Your Book
                        </h3>
                        <p className="mt-2 text-sm">
                          Please review all your information before submitting. Once listed, your book will be visible to thousands of potential buyers.
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {imagePreviewUrls.map((url, index) => (
                            <img 
                              key={index}
                              src={url} 
                              alt={`Book preview ${index + 1}`} 
                              className="aspect-[3/4] h-24 object-cover rounded-md border"
                            />
                          ))}
                        </div>
                        
                        <div className="bg-secondary/30 p-4 rounded-md space-y-3">
                          <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-1 text-sm font-medium">Title</div>
                            <div className="col-span-2 text-sm">{form.getValues("title")}</div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-1 text-sm font-medium">Author</div>
                            <div className="col-span-2 text-sm">{form.getValues("author")}</div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-1 text-sm font-medium">Condition</div>
                            <div className="col-span-2 text-sm capitalize">{form.getValues("condition")}</div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-1 text-sm font-medium">Category</div>
                            <div className="col-span-2 text-sm capitalize">{form.getValues("category")}</div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-1 text-sm font-medium">Price</div>
                            <div className="col-span-2 text-sm">${parseFloat(form.getValues("price")).toFixed(2)}</div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-1 text-sm font-medium">Description</div>
                            <div className="col-span-2 text-sm">{form.getValues("description")}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Navigation buttons */}
                  <div className="flex justify-between mt-8">
                    {currentStep > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                      >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                    ) : (
                      <div></div>
                    )}
                    
                    {currentStep < 4 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative"
                      >
                        {isSubmitting ? "Listing..." : "List Book"}
                        {isSubmitting && (
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sell;
