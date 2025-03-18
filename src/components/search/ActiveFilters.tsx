
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { FilterType } from './types';

interface ActiveFiltersProps {
  filters: FilterType;
  defaultPriceRange: [number, number];
  toggleCategoryFilter: (category: string) => void;
  toggleConditionFilter: (condition: string) => void;
  handlePriceChange: (value: number[]) => void;
  clearAllFilters: () => void;
}

const ActiveFilters = ({
  filters,
  defaultPriceRange,
  toggleCategoryFilter,
  toggleConditionFilter,
  handlePriceChange,
  clearAllFilters
}: ActiveFiltersProps) => {
  const hasActiveFilters = 
    filters.category.length > 0 || 
    filters.condition.length > 0 || 
    filters.priceRange[0] !== defaultPriceRange[0] || 
    filters.priceRange[1] !== defaultPriceRange[1];
    
  if (!hasActiveFilters) return null;
  
  return (
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
      
      {(filters.priceRange[0] !== defaultPriceRange[0] || filters.priceRange[1] !== defaultPriceRange[1]) && (
        <Badge variant="secondary">
          ${filters.priceRange[0]} - ${filters.priceRange[1]}
          <button 
            className="ml-1 hover:text-primary"
            onClick={() => handlePriceChange(defaultPriceRange)}
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
  );
};

export default ActiveFilters;
