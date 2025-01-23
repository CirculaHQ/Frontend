import { EmptyState, ModuleHeader, TextBadge } from '@/components/shared'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui'
import { appRoute } from '@/config/routeMgt/routePaths';
import { useNavigate } from 'react-router-dom';

const Customers = () => {
  const navigate = useNavigate();

  const customerTypes = [
    { label: "business", icon: <TextBadge text='B' /> },
    { label: "individual", icon: <TextBadge text='I' /> }
  ]

  return (
    <div>
      <ModuleHeader title='Customers'>
        <div className='flex flex-row items-center gap-3'>
          <Button>Show archive</Button>
          <Button>Export</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary'>Add customer</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='text-sm font-medium text-secondary rounded-[8px] px-1'
            >
              {customerTypes.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  className='py-2 rounded-[8px] justify-between capitalize'
                  onClick={() => navigate(`${appRoute.add_customer}?type=${item.label}`)}
                >
                  {item.label} {item.icon}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </ModuleHeader>
      <EmptyState icon='users-right' title='No customers yet' description='Add a customer and they will show up here.' className='mt-8' />
    </div>
  )
}

export default Customers