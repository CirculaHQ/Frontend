import { EmptyState, ModuleHeader, TextBadge } from '@/components/shared'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui'
import React from 'react'

const Customers = () => {
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
              <DropdownMenuItem className='py-2  rounded-[8px] justify-between'>Business <TextBadge text='B'/></DropdownMenuItem>
              <DropdownMenuItem className='py-2 rounded-[8px] justify-between'>Individual <TextBadge text='I'/></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </ModuleHeader>
      <EmptyState icon='users-right' title='No customers yet' description='Add a customer and they will show up here.' className='mt-8'/>
    </div>
  )
}

export default Customers