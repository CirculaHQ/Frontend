import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

type MultiSelectProps = {
  options: { label: string; value: string }[];
  placeholder?: string;
  onChange?: (selectedValues: { value: string; label: string }[]) => void;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  placeholder = 'Select options',
  onChange,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    let updatedValues: string[];
    if (selectedValues.includes(value)) {
      updatedValues = selectedValues.filter((item) => item !== value);
    } else {
      updatedValues = [...selectedValues, value];
    }

    setSelectedValues(updatedValues);

    // Pass the selected options back to the parent component
    const selectedOptions = updatedValues.map(
      (val) => options.find((option) => option.value === val)!
    );
    onChange?.(selectedOptions);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' className='w-full justify-between font-normal text-gray-700'>
            {selectedValues.length > 0
              ? selectedValues
                  .map((val) => options.find((option) => option.value === val)?.label)
                  .join(', ')
              : placeholder}
            <ChevronDown className='ml-2 h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full light'>
          <div className='space-y-2'>
            {options.map((option) => (
              <label
                key={option.value}
                className='flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer'
              >
                <input
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 text-green-500 checked:bg-green-500!important focus:ring-0'
                  checked={selectedValues.includes(option.value)}
                  onChange={() => handleSelect(option.value)}
                />
                <span className='ml-2 font-normal text-gray-700'>{option.label}</span>
              </label>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MultiSelect;
