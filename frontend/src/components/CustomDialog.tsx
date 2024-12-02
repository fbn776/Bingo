import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export function CustomDialog({
                                 open,
                                 setOpen,
                                 title,
                                 description,
                                 children,
                                 closeBtn = true,
                                 buttons,
                                 contentClassName
                             }: {
    title: string,
    description?: string,
    children: React.ReactNode,
    open: boolean,
    setOpen: (open: boolean) => void,
    closeBtn?: boolean,
    buttons?: React.ReactNode,
    contentClassName?: string
}) {
    return (
        <Dialog modal open={open} onOpenChange={(e) => {
            setOpen(e);
        }}>
            <DialogContent className={contentClassName}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && <DialogDescription>
                        {description}
                    </DialogDescription>}
                </DialogHeader>
                {children}
                {
                    closeBtn &&
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                                Close
                            </Button>
                        </DialogClose>
                        {buttons}
                    </DialogFooter>
                }
            </DialogContent>
        </Dialog>
    )
}
