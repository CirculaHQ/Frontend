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
import { Role } from "@/types/team"

export default function RolesInCircula({ roles }: Readonly<{ roles: Role[] }>) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span>
                    <Icon name='help-circle' className='h-3 w-3 inline' />
                </span>
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
                                <h1 className="text-base font-semibold text-primary capitalize">{role.name.replace(/_/g, ' ')}</h1>
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