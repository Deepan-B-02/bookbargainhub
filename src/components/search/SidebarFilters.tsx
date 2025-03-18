
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import FilterSection from './FilterSection';
import CategoryFilter from './CategoryFilter';
import ConditionFilter from './ConditionFilter';
import PriceRangeFilter from './PriceRangeFilter';
import { FilterType } from './types';

interface SidebarFiltersProps {
  filters: FilterType;
  categories: { id: string; name: string; count: number }[];
  priceRange: [number, number];
  toggleCategoryFilter: (category: string) => void;
  toggleConditionFilter: (condition: string) => void;
  handlePriceChange: (value: number[]) => void;
  clearAllFilters: () => void;
}

const SidebarFilters = ({
  filters,
  categories,
  priceRange,
  toggleCategoryFilter,
  toggleConditionFilter,
  handlePriceChange,
  clearAllFilters
}: SidebarFiltersProps) => {
  return (
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
      <FilterSection title="Categories">
        <CategoryFilter 
          categories={categories}
          selectedCategories={filters.category}
          onToggleCategory={toggleCategoryFilter}
        />
      </FilterSection>
      
      <Separator className="my-4" />
      
      {/* Condition filter */}
      <FilterSection title="Condition">
        <ConditionFilter 
          selectedConditions={filters.condition}
          onToggleCondition={toggleConditionFilter}
        />
      </FilterSection>
      
      <Separator className="my-4" />
      
      {/* Price range filter */}
      <FilterSection title="Price Range">
        <PriceRangeFilter 
          priceRange={filters.priceRange}
          onChange={handlePriceChange}
        />
      </FilterSection>
    </div>
  );
};

export default SidebarFilters;
