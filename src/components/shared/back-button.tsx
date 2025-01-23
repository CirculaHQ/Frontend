import { useNavigate } from "react-router-dom"
import { Icon } from "../ui"

interface Props {
    route: string,
    label: string,
    onClick?: () => void
}

export const BackButton = ({ route = "", label = "", onClick }: Props) => {
    const navigate = useNavigate()

    const click = () => {
        if (onClick) return onClick()
        navigate(route)
    }

    return (
        <button
            onClick={click}
            className='text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-4'
        >
            <Icon name='arrow-left' className='w-5 h-5' /> {label}
        </button>
    )
}