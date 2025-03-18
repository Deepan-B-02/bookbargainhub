
import { Checkbox } from '@/components/ui/checkbox';

interface CategoryFilterProps {
  categories: { id: string; name: string; count: number }[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategories, onToggleCategory }: CategoryFilterProps) => {
  return (
    <>
      {categories.map(category => (
        <div key={category.id} className="flex items-center space-x-2">
          <Checkbox 
            id={`category-${category.id}`}
            checked={selectedCategories.includes(category.id)}
            onCheckedChange={() => onToggleCategory(category.id)}
          />
          <label 
            htmlFor={`category-${category.id}`}
            className="text-sm cursor-pointer"
          >
            {category.name} <span className="text-muted-foreground">({category.count})</span>
          </label>
        </div>
      ))}
    </>
  );
};

export default CategoryFilter;
