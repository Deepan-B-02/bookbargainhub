
import { Slider } from '@/components/ui/slider';

interface PriceRangeFilterProps {
  priceRange: [number, number];
  onChange: (value: number[]) => void;
  min?: number;
  max?: number;
}

const PriceRangeFilter = ({ 
  priceRange, 
  onChange, 
  min = 0, 
  max = 100 
}: PriceRangeFilterProps) => {
  return (
    <div className="mt-6 px-2">
      <Slider
        defaultValue={priceRange}
        max={max}
        step={1}
        onValueChange={onChange}
      />
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm">${priceRange[0]}</span>
        <span className="text-sm">${priceRange[1]}</span>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
