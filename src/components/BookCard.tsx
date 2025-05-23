
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '@/data/books';
import { Badge } from "@/components/ui/badge";
import { StarIcon, BookIcon } from 'lucide-react';

interface BookCardProps {
  book: Book;
  featured?: boolean;
}

const BookCard = ({ book, featured = false }: BookCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    console.error(`Failed to load image for book: ${book.title}`);
    setImageError(true);
    setImageLoaded(true); // Consider it "loaded" to remove loading state
  };
  
  return (
    <Link to={`/book/${book.id}`} className={`group block ${featured ? 'h-full' : ''}`}>
      <div className={`book-hover-card overflow-hidden rounded-lg border bg-card ${featured ? 'h-full flex flex-col' : ''}`}>
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-secondary/40">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-secondary animate-pulse">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          
          {imageError ? (
            <div className="h-full w-full flex items-center justify-center bg-secondary/60">
              <BookIcon className="h-12 w-12 text-primary/40" />
            </div>
          ) : (
            <img
              src={book.coverImage}
              alt={book.title}
              className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
          
          {book.condition !== 'new' && (
            <Badge className="absolute top-2 right-2 bg-foreground/75 z-10">{book.condition}</Badge>
          )}
          
          {book.bestSeller && (
            <Badge className="absolute top-2 left-2 bg-amber-500 text-white z-10">Bestseller</Badge>
          )}
        </div>
        
        <div className={`p-4 space-y-2 ${featured ? 'flex-1 flex flex-col' : ''}`}>
          <div className="space-y-1">
            <h3 className="font-medium leading-tight text-balance line-clamp-1">{book.title}</h3>
            <p className="text-sm text-muted-foreground">by {book.author}</p>
          </div>
          
          {featured && (
            <p className="text-sm text-muted-foreground line-clamp-3 mt-2 flex-1">
              {book.description}
            </p>
          )}
          
          <div className="flex justify-between items-end mt-auto pt-2">
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(book.sellerRating)
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-muted stroke-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-1">({book.sellerRating.toFixed(1)})</span>
            </div>
            <div className="text-right">
              <span className="font-semibold">${book.price.toFixed(2)}</span>
              {book.originalPrice && (
                <span className="text-sm text-muted-foreground line-through ml-2">
                  ${book.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
