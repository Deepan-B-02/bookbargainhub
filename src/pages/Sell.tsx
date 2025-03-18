
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { UploadCloud, DollarSign, Book, Tag, Check } from 'lucide-react';
import { categories } from '@/data/books';

const Sell = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [condition, setCondition] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !author || !description || !price || !condition || selectedCategories.length === 0 || !imagePreview) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Your book has been listed successfully!");
      navigate('/profile?tab=listings');
    }, 1500);
  };

  const goToNextStep = () => {
    if (currentStep === 1 && (!title || !author || !description)) {
      toast.error("Please fill in all required fields in this step");
      return;
    }

    if (currentStep === 2 && (!price || !condition || selectedCategories.length === 0)) {
      toast.error("Please fill in all required fields in this step");
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-secondary/20">
        <div className="container px-4 mx-auto max-w-3xl">
          <div className="space-y-2 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Sell Your Book</h1>
            <p className="text-muted-foreground">List your book for sale and connect with readers worldwide.</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center w-full max-w-md mx-auto mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      step < currentStep 
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : step === currentStep 
                        ? 'bg-background border-primary text-primary' 
                        : 'bg-background border-muted-foreground text-muted-foreground'
                    }`}
                  >
                    {step < currentStep ? <Check className="h-5 w-5" /> : step}
                  </div>
                  <span className="text-xs mt-1">
                    {step === 1 ? 'Details' : step === 2 ? 'Pricing & Category' : 'Image'}
                  </span>
                </div>
              ))}
              <div className="absolute left-0 right-0 flex justify-center -z-10">
                <div className="w-full max-w-xs h-0.5 bg-muted-foreground/30 mt-5"></div>
              </div>
            </div>
          </div>

          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>
                {currentStep === 1 
                  ? 'Book Details' 
                  : currentStep === 2 
                  ? 'Pricing & Categories' 
                  : 'Upload Cover Image'}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 
                  ? 'Fill in the basic information about your book' 
                  : currentStep === 2 
                  ? 'Set your price and categorize your book' 
                  : 'Upload a clear image of your book cover'}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Book Title *</Label>
                      <Input 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="e.g., The Great Gatsby"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="author">Author *</Label>
                      <Input 
                        id="author" 
                        value={author} 
                        onChange={(e) => setAuthor(e.target.value)} 
                        placeholder="e.g., F. Scott Fitzgerald"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea 
                        id="description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Provide a brief description of the book..."
                        className="min-h-32"
                        required
                      />
                    </div>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price" className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          Price *
                        </Label>
                        <Input 
                          id="price" 
                          value={price} 
                          onChange={(e) => setPrice(e.target.value)}
                          type="number"
                          min="0.01"
                          step="0.01" 
                          placeholder="19.99"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="originalPrice">Original Price (optional)</Label>
                        <Input 
                          id="originalPrice" 
                          value={originalPrice} 
                          onChange={(e) => setOriginalPrice(e.target.value)}
                          type="number"
                          min="0.01"
                          step="0.01" 
                          placeholder="24.99"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition *</Label>
                      <Select value={condition} onValueChange={setCondition} required>
                        <SelectTrigger id="condition">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="like-new">Like New</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="flex items-center">
                        <Tag className="h-4 w-4 mr-1" />
                        Categories *
                      </Label>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`category-${category.id}`} 
                              checked={selectedCategories.includes(category.id)}
                              onCheckedChange={() => handleCategoryToggle(category.id)}
                            />
                            <label
                              htmlFor={`category-${category.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-12 text-center">
                      <input
                        type="file"
                        id="cover-image"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      
                      {imagePreview ? (
                        <div className="space-y-4">
                          <div className="aspect-[3/4] max-w-[200px] mx-auto">
                            <img 
                              src={imagePreview} 
                              alt="Book cover preview" 
                              className="w-full h-full object-cover rounded-md shadow-md" 
                            />
                          </div>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => document.getElementById('cover-image')?.click()}
                          >
                            Change Image
                          </Button>
                        </div>
                      ) : (
                        <>
                          <UploadCloud className="h-12 w-12 text-muted-foreground mb-4" />
                          <p className="mb-2 text-lg font-medium">Drag and drop your cover image</p>
                          <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => document.getElementById('cover-image')?.click()}
                          >
                            Upload Cover Image
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              {currentStep > 1 ? (
                <Button type="button" variant="outline" onClick={goToPreviousStep}>
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 3 ? (
                <Button type="button" onClick={goToNextStep}>
                  Continue
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  disabled={isLoading || !imagePreview}
                  className="ml-auto"
                >
                  {isLoading ? "Listing..." : "List Book for Sale"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sell;
