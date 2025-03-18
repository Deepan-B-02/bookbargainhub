
import { useState, useRef, useEffect } from 'react';
import { Book } from '@/data/books';
import BookCard from './BookCard';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedBooksProps {
  title: string;
  description?: string;
  books: Book[];
  limit?: number;
}

const FeaturedBooks = ({ title, description, books, limit = 8 }: FeaturedBooksProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [maxIndex, setMaxIndex] = useState(0);
  
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerPage(1);
      } else if (width < 768) {
        setItemsPerPage(2);
      } else if (width < 1024) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
    };
    
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);
  
  useEffect(() => {
    setMaxIndex(Math.max(0, Math.min(books.length, limit) - itemsPerPage));
  }, [books.length, limit, itemsPerPage]);
  
  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };
  
  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const scrollPosition = currentIndex * (container.scrollWidth / Math.min(books.length, limit));
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }, [currentIndex, books.length, limit]);
  
  const displayedBooks = books.slice(0, limit);
  
  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <div 
            ref={containerRef}
            className="overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-300 ease-in-out space-x-4"
              style={{ 
                width: `${displayedBooks.length * 100 / itemsPerPage}%`,
                transform: `translateX(-${currentIndex * 100 / displayedBooks.length}%)`
              }}
            >
              {displayedBooks.map(book => (
                <div 
                  key={book.id} 
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-0 animate-fade-in"
                  style={{ 
                    animationDelay: `${displayedBooks.indexOf(book) * 0.05}s` 
                  }}
                >
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
