import { FormSection } from "@/components/shared";
import { Icon, Input, Label } from "@/components/ui";
import { RadioGroup } from "@/components/ui/radio-group";



const ApplicationTheme: React.FC = () => (
    <FormSection title='Application theme' description='Supporting text goes here'>
      <RadioGroup className='flex space-x-6 mt-4' defaultValue='system'>
        {/* Use flex-col and items-center on the Label */}
        <Label className='flex flex-col items-center cursor-pointer'> 
          <Icon name='system-theme' className='w-36 h-24 mb-2' />
          <div className='flex items-center space-x-2'>
            <Input
              type='radio'
              className='w-4 h-4 border-gray-300 text-primary focus:ring-primary'
              id='theme-system'
            />
            <span className='text-sm font-medium text-gray-600'>System</span>
          </div>
        </Label>
  
        <Label className='flex flex-col items-center cursor-pointer'>
          <Icon name='light-theme' className='w-36 h-24 mb-2' />
          <div className='flex items-center space-x-2'>
            <Input
              type='radio'
              className='w-4 h-4 border-gray-300 text-primary focus:ring-primary'
              id='theme-light'
            />
            <span className='text-sm font-medium text-gray-600'>Light</span>
          </div>
        </Label>
  
        <Label className='flex flex-col items-center cursor-pointer'>
          <Icon name='dark-theme' className='w-36 h-24 mb-2' />
          <div className='flex items-center space-x-2'>
            <Input
              type='radio'
              className='w-4 h-4 border-gray-300 text-primary focus:ring-primary'
              id='theme-dark'
            />
            <span className='text-sm font-medium text-gray-600'>Dark</span>
          </div>
        </Label>
      </RadioGroup>
    </FormSection>
  );

  export default ApplicationTheme;