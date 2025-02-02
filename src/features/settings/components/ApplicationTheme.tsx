import { FormSection } from "@/components/shared";
import { useTheme } from "@/components/shared/theme-provider";
import { Icon, Input, Label } from "@/components/ui";
import { RadioGroup } from "@/components/ui/radio-group";



const ApplicationTheme: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleChange = (value: string) => {
    setTheme(value as "light" | "dark" | "system");
  };
  
  return(
    <FormSection title='Application theme' description='Supporting text goes here'>
      <RadioGroup className='flex space-x-6 mt-4' defaultValue={theme} onValueChange={handleChange}>
        {/* Use flex-col and items-center on the Label */}
        <Label className='flex flex-col items-center cursor-pointer'> 
          <Icon name='system-theme' className='w-36 h-24 mb-2' />
          <div className='flex items-center space-x-2'>
            <Input
              type='radio'
              className='w-4 h-4 border-gray-300 text-primary focus:ring-primary'
              id='theme-system'
              value="system"
              checked={theme === "system"}
              onChange={() => handleChange("system")}
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
              value="light"
              checked={theme === "light"}
              onChange={() => handleChange("light")}
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
              value="dark"
              checked={theme === "dark"}
              onChange={() => handleChange("dark")}
            />
            <span className='text-sm font-medium text-gray-600'>Dark</span>
          </div>
        </Label>
      </RadioGroup>
    </FormSection>
  )};

  export default ApplicationTheme;