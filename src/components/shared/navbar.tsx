import React from 'react'
import { Icon } from '../ui'

const Navbar = () => {
  return (
        <div className='px-8 py-3 border-b border-b-[#D5D7DA] flex flex-row items-center justify-between w-full'>
            <div>
                <div className='flex flex-row items-center'>
                    <Icon name='search' className='text-quaternary w-5 h-' fill='none' />
                    <input type='text' className='border-none w-full px-3 py-2 text-sm rounded-md focus:outline-none font-inter  placeholder:font-inter placeholder:text-placeholder' placeholder='Search' />
                    <div className='text-quaternary font-medium text-xs border-[#E9EAEB] rounded-sm px-1 py-[1px]'>/</div>
                </div>
            </div>

    </div>
  )
}

export default Navbar