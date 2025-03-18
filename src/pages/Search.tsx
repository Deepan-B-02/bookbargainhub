
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { books, categories } from '@/data/books';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Filter,
  ChevronDown,
  ChevronUp,
  X,
  SlidersHorizontal
} from 'lucide-react';

// Define the type for filter options
type FilterType = {
  category: string[];
  condition: string[];
  priceRange: [number, number];
  sortBy: string;
};

const PRICE_RANGE: [number, number] = [0, 100];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayedBooks, setDisplayedBooks] = useState(books);
  const [filterOpen, setFilterOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(true);
  const [expandedCondition, setExpandedCondition] = useState(true);
  const [expandedPrice, setExpandedPrice] = useState(true);
  
  // Get search parameters
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  const conditionParam = searchParams.get('condition') || '';
  
  // Initialize filters
  const [filters, setFilters] = useState<FilterType>({
    category: categoryParam ? [categoryParam] : [],
    condition: conditionParam ? [conditionParam] : [],
    priceRange: PRICE_RANGE,
    sortBy: 'relevance',
  });
  
  // Apply filters to books
  useEffect(() => {
    let filteredBooks = [...books];
    
    // Search query
    if (query) {
      filteredBooks = filteredBooks.filter(
        book => 
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase()) ||
          book.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Category filter
    if (filters.category.length > 0) {
      filteredBooks = filteredBooks.filter(
        book => book.category.some(cat => filters.category.includes(cat))
      );
    }
    
    // Condition filter
    if (filters.condition.length > 0) {
      filteredBooks = filteredBooks.filter(
        book => filters.condition.includes(book.condition)
      );
    }
    
    // Price range filter
    filteredBooks = filteredBooks.filter(
      book => book.price >= filters.priceRange[0] && book.price <= filters.priceRange[1]
    );
    
    // Sort results
    switch (filters.sortBy) {
      case 'price-low-high':
        filteredBooks.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filteredBooks.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filteredBooks.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      default:
        // 'relevance' - keep original sorting or implement relevance algorithm
        break;
    }
    
    setDisplayedBooks(filteredBooks);
  }, [query, filters]);
  
  // Update URL when filters change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    
    if (query) {
      newSearchParams.set('q', query);
    }
    
    if (filters.category.length === 1) {
      newSearchParams.set('category', filters.category[0]);
    }
    
    if (filters.condition.length === 1) {
      newSearchParams.set('condition', filters.condition[0]);
    }
    
    setSearchParams(newSearchParams, { replace: true });
  }, [query, filters.category, filters.condition, setSearchParams]);
  
  // Handle category filter toggle
  const toggleCategoryFilter = (category: string) => {
    setFilters(prevFilters => {
      const isSelected = prevFilters.category.includes(category);
      return {
        ...prevFilters,
        category: isSelected
          ? prevFilters.category.filter(cat => cat !== category)
          : [...prevFilters.category, category]
      };
    });
  };
  
  // Handle condition filter toggle
  const toggleConditionFilter = (condition: string) => {
    setFilters(prevFilters => {
      const isSelected = prevFilters.condition.includes(condition);
      return {
        ...prevFilters,
        condition: isSelected
          ? prevFilters.condition.filter(cond => cond !== condition)
          : [...prevFilters.condition, condition]
      };
    });
  };
  
  // Handle price range change
  const handlePriceChange = (value: number[]) => {
    // Ensure we always have exactly 2 values for the tuple
    const safeValue: [number, number] = [
      value[0] ?? PRICE_RANGE[0],
      value[1] ?? PRICE_RANGE[1]
    ];
    
    setFilters(prevFilters => ({
      ...prevFilters,
      priceRange: safeValue
    }));
  };
  
  // Handle sort by change
  const handleSortChange = (value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      sortBy: value
    }));
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      category: [],
      condition: [],
      priceRange: PRICE_RANGE,
      sortBy: 'relevance'
    });
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-secondary">
          <div className="container px-4 py-8">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Browse Books</h1>
            <SearchBar fullWidth placeholder="Search for books, authors, or ISBN..." />
          </div>
        </div>
        
        <div className="container px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-medium">
                {displayedBooks.length} {displayedBooks.length === 1 ? 'result' : 'results'}
                {query && <span> for "{query}"</span>}
              </h2>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={filters.sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                className="md:hidden"
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {filterOpen ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
          </div>
          
          {/* Active filters display */}
          {(filters.category.length > 0 || filters.condition.length > 0 || 
            filters.priceRange[0] !== PRICE_RANGE[0] || filters.priceRange[1] !== PRICE_RANGE[1]) && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              
              {filters.category.map(cat => (
                <Badge key={cat} variant="secondary" className="capitalize">
                  {cat}
                  <button 
                    className="ml-1 hover:text-primary"
                    onClick={() => toggleCategoryFilter(cat)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              
              {filters.condition.map(cond => (
                <Badge key={cond} variant="secondary" className="capitalize">
                  {cond}
                  <button 
                    className="ml-1 hover:text-primary"
                    onClick={() => toggleConditionFilter(cond)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              
              {(filters.priceRange[0] !== PRICE_RANGE[0] || filters.priceRange[1] !== PRICE_RANGE[1]) && (
                <Badge variant="secondary">
                  ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  <button 
                    className="ml-1 hover:text-primary"
                    onClick={() => handlePriceChange(PRICE_RANGE)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              
              <Button 
                variant="link" 
                size="sm" 
                className="text-primary hover:text-primary/80"
                onClick={clearAllFilters}
              >
                Clear all
              </Button>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
            {/* Filters sidebar - desktop */}
            <div className={`hidden md:block ${filterOpen ? 'block' : 'hidden'}`}>
              <div className="rounded-lg border bg-card p-4 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-lg">Filters</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={clearAllFilters}
                  >
                    Reset
                  </Button>
                </div>
                
                {/* Categories filter */}
                <div className="mb-6">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedCategories(!expandedCategories)}
                  >
                    <h4 className="font-medium">Categories</h4>
                    {expandedCategories ? 
                      <ChevronUp className="h-4 w-4" /> : 
                      <ChevronDown className="h-4 w-4" />
                    }
                  </div>
                  {expandedCategories && (
                    <div className="mt-3 space-y-2">
                      {categories.map(category => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category.id}`}
                            checked={filters.category.includes(category.id)}
                            onCheckedChange={() => toggleCategoryFilter(category.id)}
                          />
                          <label 
                            htmlFor={`category-${category.id}`}
                            className="text-sm cursor-pointer"
                          >
                            {category.name} <span className="text-muted-foreground">({category.count})</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <Separator className="my-4" />
                
                {/* Condition filter */}
                <div className="mb-6">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedCondition(!expandedCondition)}
                  >
                    <h4 className="font-medium">Condition</h4>
                    {expandedCondition ? 
                      <ChevronUp className="h-4 w-4" /> : 
                      <ChevronDown className="h-4 w-4" />
                    }
                  </div>
                  {expandedCondition && (
                    <div className="mt-3 space-y-2">
                      {['new', 'like-new', 'good', 'fair', 'poor'].map(condition => (
                        <div key={condition} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`condition-${condition}`}
                            checked={filters.condition.includes(condition)}
                            onCheckedChange={() => toggleConditionFilter(condition)}
                          />
                          <label 
                            htmlFor={`condition-${condition}`}
                            className="text-sm capitalize cursor-pointer"
                          >
                            {condition}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <Separator className="my-4" />
                
                {/* Price range filter */}
                <div>
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedPrice(!expandedPrice)}
                  >
                    <h4 className="font-medium">Price Range</h4>
                    {expandedPrice ? 
                      <ChevronUp className="h-4 w-4" /> : 
                      <ChevronDown className="h-4 w-4" />
                    }
                  </div>
                  {expandedPrice && (
                    <div className="mt-6 px-2">
                      <Slider
                        defaultValue={filters.priceRange}
                        max={100}
                        step={1}
                        onValueChange={handlePriceChange}
                      />
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">${filters.priceRange[0]}</span>
                        <span className="text-sm">${filters.priceRange[1]}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Mobile filters (slide in from the bottom) */}
            {mobileFilterOpen && (
              <div className="fixed inset-0 z-50 md:hidden">
                <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFilterOpen(false)} />
                <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-auto rounded-t-xl bg-background animate-slide-up">
                  <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background p-4">
                    <h3 className="font-medium text-lg">Filters</h3>
                    <Button variant="ghost" size="sm" onClick={() => setMobileFilterOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="p-4 space-y-6">
                    {/* Mobile filters content - similar to desktop but with larger touch targets */}
                    {/* Categories */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Categories</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map(category => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-category-${category.id}`}
                              checked={filters.category.includes(category.id)}
                              onCheckedChange={() => toggleCategoryFilter(category.id)}
                            />
                            <label 
                              htmlFor={`mobile-category-${category.id}`}
                              className="text-sm cursor-pointer"
                            >
                              {category.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Condition */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Condition</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {['new', 'like-new', 'good', 'fair', 'poor'].map(condition => (
                          <div key={condition} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`mobile-condition-${condition}`}
                              checked={filters.condition.includes(condition)}
                              onCheckedChange={() => toggleConditionFilter(condition)}
                            />
                            <label 
                              htmlFor={`mobile-condition-${condition}`}
                              className="text-sm capitalize cursor-pointer"
                            >
                              {condition}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Price Range */}
                    <div className="space-y-3">
                      <h4 className="font-medium">Price Range</h4>
                      <div className="px-2">
                        <Slider
                          defaultValue={filters.priceRange}
                          max={100}
                          step={1}
                          onValueChange={handlePriceChange}
                        />
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm">${filters.priceRange[0]}</span>
                          <span className="text-sm">${filters.priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" onClick={clearAllFilters} className="flex-1">
                        Reset
                      </Button>
                      <Button onClick={() => setMobileFilterOpen(false)} className="flex-1">
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Books grid */}
            <div>
              {displayedBooks.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {displayedBooks.map((book, index) => (
                    <div key={book.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                      <BookCard book={book} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-secondary/50 p-6 rounded-lg max-w-md mx-auto">
                    <h3 className="text-xl font-medium mb-2">No books found</h3>
                    <p className="text-muted-foreground mb-4">
                      We couldn't find any books matching your criteria. Try adjusting your filters or search terms.
                    </p>
                    <Button onClick={clearAllFilters}>
                      Clear all filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
