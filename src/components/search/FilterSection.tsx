
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const FilterSection = ({ title, children, defaultExpanded = true }: FilterSectionProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="mb-6">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h4 className="font-medium">{title}</h4>
        {expanded ? 
          <ChevronUp className="h-4 w-4" /> : 
          <ChevronDown className="h-4 w-4" />
        }
      </div>
      {expanded && (
        <div className="mt-3 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default FilterSection;
