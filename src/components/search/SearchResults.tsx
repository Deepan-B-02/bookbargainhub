
import { Book } from '@/data/books';
import BookCard from '@/components/BookCard';
import { Button } from '@/components/ui/button';

interface SearchResultsProps {
  books: Book[];
  clearAllFilters: () => void;
}

const SearchResults = ({ books, clearAllFilters }: SearchResultsProps) => {
  if (books.length === 0) {
    return (
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
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book, index) => (
        <div key={book.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
