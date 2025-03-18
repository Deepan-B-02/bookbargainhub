import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { books, categories } from '@/data/books';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, SlidersHorizontal } from 'lucide-react';
import SidebarFilters from '@/components/search/SidebarFilters';
import MobileFilters from '@/components/search/MobileFilters';
import ActiveFilters from '@/components/search/ActiveFilters';
import SearchResults from '@/components/search/SearchResults';
import { FilterType } from '@/components/search/types';

const PRICE_RANGE: [number, number] = [0, 100];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayedBooks, setDisplayedBooks] = useState(books);
  const [filterOpen, setFilterOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  const conditionParam = searchParams.get('condition') || '';
  
  const [filters, setFilters] = useState<FilterType>({
    category: categoryParam ? [categoryParam] : [],
    condition: conditionParam ? [conditionParam] : [],
    priceRange: PRICE_RANGE,
    sortBy: 'relevance',
  });
  
  useEffect(() => {
    let filteredBooks = [...books];
    
    if (query) {
      filteredBooks = filteredBooks.filter(
        book => 
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase()) ||
          book.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (filters.category.length > 0) {
      filteredBooks = filteredBooks.filter(
        book => book.category.some(cat => filters.category.includes(cat))
      );
    }
    
    if (filters.condition.length > 0) {
      filteredBooks = filteredBooks.filter(
        book => filters.condition.includes(book.condition)
      );
    }
    
    filteredBooks = filteredBooks.filter(
      book => book.price >= filters.priceRange[0] && book.price <= filters.priceRange[1]
    );
    
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
        break;
    }
    
    setDisplayedBooks(filteredBooks);
  }, [query, filters]);
  
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
  
  const handlePriceChange = (value: number[]) => {
    const safeValue: [number, number] = [
      value[0] ?? PRICE_RANGE[0],
      value[1] ?? PRICE_RANGE[1]
    ];
    
    setFilters(prevFilters => ({
      ...prevFilters,
      priceRange: safeValue
    }));
  };
  
  const handleSortChange = (value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      sortBy: value
    }));
  };
  
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
          
          <ActiveFilters 
            filters={filters}
            defaultPriceRange={PRICE_RANGE}
            toggleCategoryFilter={toggleCategoryFilter}
            toggleConditionFilter={toggleConditionFilter}
            handlePriceChange={handlePriceChange}
            clearAllFilters={clearAllFilters}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
            <div className={`hidden md:block ${filterOpen ? 'block' : 'hidden'}`}>
              <SidebarFilters 
                filters={filters}
                categories={categories}
                priceRange={PRICE_RANGE}
                toggleCategoryFilter={toggleCategoryFilter}
                toggleConditionFilter={toggleConditionFilter}
                handlePriceChange={handlePriceChange}
                clearAllFilters={clearAllFilters}
              />
            </div>
            
            {mobileFilterOpen && (
              <MobileFilters 
                filters={filters}
                categories={categories}
                toggleCategoryFilter={toggleCategoryFilter}
                toggleConditionFilter={toggleConditionFilter}
                handlePriceChange={handlePriceChange}
                clearAllFilters={clearAllFilters}
                onClose={() => setMobileFilterOpen(false)}
              />
            )}
            
            <div>
              <SearchResults 
                books={displayedBooks}
                clearAllFilters={clearAllFilters}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
