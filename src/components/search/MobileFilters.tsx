
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react';
import CategoryFilter from './CategoryFilter';
import ConditionFilter from './ConditionFilter';
import PriceRangeFilter from './PriceRangeFilter';
import { FilterType } from './types';

interface MobileFiltersProps {
  filters: FilterType;
  categories: { id: string; name: string; count: number }[];
  toggleCategoryFilter: (category: string) => void;
  toggleConditionFilter: (condition: string) => void;
  handlePriceChange: (value: number[]) => void;
  clearAllFilters: () => void;
  onClose: () => void;
}

const MobileFilters = ({
  filters,
  categories,
  toggleCategoryFilter,
  toggleConditionFilter,
  handlePriceChange,
  clearAllFilters,
  onClose
}: MobileFiltersProps) => {
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-auto rounded-t-xl bg-background animate-slide-up">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background p-4">
          <h3 className="font-medium text-lg">Filters</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-4 space-y-6">
          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-medium">Categories</h4>
            <div className="grid grid-cols-2 gap-2">
              <CategoryFilter 
                categories={categories}
                selectedCategories={filters.category}
                onToggleCategory={toggleCategoryFilter}
              />
            </div>
          </div>
          
          <Separator />
          
          {/* Condition */}
          <div className="space-y-3">
            <h4 className="font-medium">Condition</h4>
            <div className="grid grid-cols-2 gap-2">
              <ConditionFilter 
                selectedConditions={filters.condition}
                onToggleCondition={toggleConditionFilter}
              />
            </div>
          </div>
          
          <Separator />
          
          {/* Price Range */}
          <div className="space-y-3">
            <h4 className="font-medium">Price Range</h4>
            <div className="px-2">
              <PriceRangeFilter 
                priceRange={filters.priceRange}
                onChange={handlePriceChange}
              />
            </div>
          </div>
          
          <Separator />
          
          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={clearAllFilters} className="flex-1">
              Reset
            </Button>
            <Button onClick={onClose} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFilters;
