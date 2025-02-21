import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Icon } from "../ui";

type Option = {
    label: string;
    value: string;
}

interface Props {
    options: Option[];
    onSelect: (e: string) => void;
}

export const FilterTrigger = ({ options = [], onSelect }: Props) => {
    const [title, setTitle] = useState('')

    const handleSelect = (option: Option) => {
        setTitle(option.label)
        onSelect(option.value)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className='gap-2 flex flex-row items-center justify-center px-3 cursor-pointer'>
                    <span className='text-placeholder font-normal text-sm capitalize'>
                        {title?.replace(/_/g, ' ') || options[0]?.label?.replace(/_/g, ' ')}
                    </span>
                    <Icon name='chevron-down' className='w-5 h-5 text-quaternary' fill='none' />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align='end'
                className='text-sm font-medium text-secondary rounded-[8px] px-1'
            >
                {options.map((option) => (
                    <DropdownMenuItem
                        key={option.label}
                        className='py-2 rounded-[8px] capitalize'
                        //disabled={data.role === SUPER_ADMIN || isDeleting}
                        onClick={() => handleSelect(option)}
                    >
                        {option.label?.replace(/_/g, ' ')}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}