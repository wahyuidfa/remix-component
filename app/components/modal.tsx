"use client"

import * as React from "react"
import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"
import { cva } from "class-variance-authority"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import { ScrollArea } from "./ui/scroll-area"

const contentVariant = cva(
    "",
    {
        variants: {

            contentSize: {

                sm: "max-w-[374px]",
                md: "sm:w-[374px] md:w-[640px] lg:w-[640px] xl:min-w-[640px] ",
                lg: "sm:w-[374px] md:w-[640px] lg:w-[1080px] xl:min-w-[1080px] ",
            },
        },
        defaultVariants: {
            contentSize: "sm",
        },
    }
)

interface DialogModalProps {
    trigger: React.ReactNode
    title: string
    description?: string
    children: React.ReactNode
    footer?: React.ReactNode
    contentSize?: "sm" | "md" | "lg"
}

export function DialogModal({ trigger, title, description, children, footer, contentSize }: DialogModalProps) {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className={
                cn(contentVariant({
                    contentSize
                }))
            }>
                <ScrollArea className="h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        {description && <DialogDescription>{description}</DialogDescription>}
                    </DialogHeader>
                    {children}
                    {footer && <DialogFooter>{footer}</DialogFooter>}
                </ScrollArea>

            </DialogContent>
        </Dialog>
    )
}

