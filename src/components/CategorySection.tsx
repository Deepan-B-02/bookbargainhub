
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '@/data/books';
import { Button } from "@/components/ui/button";
import { BookOpen } from 'lucide-react';

const CategorySection = () => {
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
  const navigateToCategory = (categoryId: string) => {
    navigate(`/search?category=${categoryId}`);
  };
  
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Browse Categories</h2>
            <p className="text-muted-foreground mt-2">Find books by your favorite genre and topics</p>
          </div>
          <Button 
            variant="link" 
            className="hidden md:flex items-center mt-4 md:mt-0"
            onClick={() => navigate('/search')}
          >
            View all categories
            <BookOpen className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => navigateToCategory(category.id)}
            >
              <div className="p-6 transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer">
                <h3 className="text-lg font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{category.count} books</p>
                
                <div className={`absolute bottom-0 left-0 h-1 bg-primary transition-all duration-300 ${
                  hoveredCategory === category.id ? 'w-full' : 'w-0'
                }`} />
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-8 md:hidden">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={() => navigate('/search')}
          >
            View all categories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
