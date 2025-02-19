import { Button, Icon } from "@/components/ui"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function RolesInCircula() {
    const roles = [
        {
            name: 'Admin',
            description: 'The Admin owns and oversees the entire platform, manages user roles, and ensures system configuration aligns with business processes. This role has unrestricted access to all modules and features.'
        },
        {
            name: 'Manager',
            description: 'The Manager has comprehensive access to the platform, including the ability to manage user roles (except for Admin accounts). Like the Admin, this role has no restrictions across modules.'
        },
        {
            name: 'Operations & Inventory Mannager',
            description: 'This role focuses on overseeing daily operational activities, including waste collection, processing, and inventory management. Users in this role have access exclusively to the Operations and Inventory modules.'
        },
        {
            name: 'Finance Manager',
            description: 'The Finance Manager handles financial transactions, invoicing, and compliance with regulatory payments. Access is restricted to the Sales and Invoicing modules.'
        },
        {
            name: 'Viewer',
            description: 'A read-only role for stakeholders requiring visibility across the platform without the ability to make changes. This role ensures operational transparency while maintaining data integrity and security.'
        }
    ]

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Icon name='help-circle' className='h-3 w-3 inline' />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader className="mb-5">
                    <div className="border p-3 w-12 h-12 rounded-lg mb-4">
                        <Icon name='users-left' className='h-6 w-6 text-[#A4A7AE]' />
                    </div>
                    <DialogTitle>Roles in Circula</DialogTitle>
                    <DialogDescription>
                        Learn more about roles and how your different teammates can improve your Circula experience.
                    </DialogDescription>
                </DialogHeader>
                <Accordion type='single' className='w-full space-y-4'>
                    {roles.map((role) => (
                        <AccordionItem key={role.name} value={role.name}>
                            <AccordionTrigger className='no-underline hover:no-underline focus:no-underline !pt-0 flex items-center justify-between'>
                                <h1 className="text-base font-semibold text-primary">{role.name}</h1>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-s text-tertiary">
                                    {role.description}
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                <DialogFooter className="flex items-center space-x-3 mt-8">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                        >
                            <Icon name='arrow-left' className='h-3 w-3 inline' /> Go back
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}