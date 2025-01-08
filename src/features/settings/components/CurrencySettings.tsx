import { useState, useEffect } from 'react';
import { FormSection } from '@/components/shared';
import { 
  Icon, 
  Label, 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue, 
} from '@/components/ui'; 

const CurrencySettings: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('');

  useEffect(() => { 
    setSelectedCurrency('dollars'); 
  }, []);

  return (
    <FormSection title='Organisation information' description='Supporting text goes here'>
      <div className='w-full flex flex-col gap-1.5'> 
        <Label>Default currency</Label> 
        <Select 
          value={selectedCurrency} 
          onValueChange={(value) => setSelectedCurrency(value)} 
        > 
          <SelectTrigger> 
            <SelectValue placeholder='Select currency' className='text-placeholder font-normal' /> 
          </SelectTrigger> 
          <SelectContent> 
            <SelectItem value='naira'> 
              <div className='flex items-center gap-2'> 
                <Icon name='flag' className='flex w-5 h-5 text-secondary' /> 
                <span>Naira - NGN</span> 
              </div> 
            </SelectItem> 
            <SelectItem value='dollars'> 
              <div className='flex items-center gap-2'> 
                <Icon name='us-flag' className='flex w-5 h-5 text-secondary' /> 
                <span>Dollars - USD</span> 
              </div> 
            </SelectItem> 
          </SelectContent> 
        </Select> 
      </div> 
    </FormSection>
  );
};

export default CurrencySettings;