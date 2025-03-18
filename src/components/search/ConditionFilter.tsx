
import { Checkbox } from '@/components/ui/checkbox';

interface ConditionFilterProps {
  selectedConditions: string[];
  onToggleCondition: (condition: string) => void;
}

const ConditionFilter = ({ selectedConditions, onToggleCondition }: ConditionFilterProps) => {
  const conditions = ['new', 'like-new', 'good', 'fair', 'poor'];
  
  return (
    <>
      {conditions.map(condition => (
        <div key={condition} className="flex items-center space-x-2">
          <Checkbox 
            id={`condition-${condition}`}
            checked={selectedConditions.includes(condition)}
            onCheckedChange={() => onToggleCondition(condition)}
          />
          <label 
            htmlFor={`condition-${condition}`}
            className="text-sm capitalize cursor-pointer"
          >
            {condition}
          </label>
        </div>
      ))}
    </>
  );
};

export default ConditionFilter;
