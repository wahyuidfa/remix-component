import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cva } from "class-variance-authority"

import { cn, tw } from "~/lib/utils"

export const variant = {
    "azure-primary": "border-transparent 	bg-azure-9 		text-white 			hover:bg-azure-10 		focus:ring-2 focus:ring-[#CAE1FF] focus:border focus:border-azure-7",
    "brand-primary": "border-transparent 	bg-avocado-9 	text-white 			hover:bg-avocado-10 	focus:ring-2 focus:ring-[#D5E6B0] focus:border focus:border-avocado-7",
    "danger-primary": "border-transparent 	bg-error-9 		text-white 			hover:bg-error-10 		focus:ring-2 focus:ring-[#FFCDC8] focus:border focus:border-error-7",
    "gray-primary": "border-transparent 	bg-gray-9 		text-white 			hover:bg-gray-10 		focus:ring-2 focus:ring-[#E8E8E8] focus:border focus:border-gray-7",
    "info-primary": "border-transparent 	bg-info-9 		text-white 			hover:bg-info-10 		focus:ring-2 focus:ring-[#96C7F2] focus:border focus:border-info-7",
    "success-primary": "border-transparent 	bg-success-9 	text-white 			hover:bg-success-10 	focus:ring-2 focus:ring-[#CCEBD7] focus:border focus:border-success-7",
    "warning-primary": "border-transparent 	bg-warning-9 	text-warning-12 	hover:bg-warning-10 	focus:ring-2 focus:ring-[#FFE3A2] focus:border focus:border-warning-7",
    //
    "azure-secondary": "border-transparent 	bg-azure-3 		text-azure-11 		hover:bg-azure-4 		focus:ring-2 focus:ring-[#CAE1FF] focus:border focus:border-azure-7",
    "brand-secondary": "border-transparent 	bg-avocado-3 	text-avocado-11 	hover:bg-avocado-4 		focus:ring-2 focus:ring-[#D5E6B0] focus:border focus:border-avocado-7",
    "danger-secondary": "border-transparent 	bg-error-3 		text-error-11 		hover:bg-error-4 		focus:ring-2 focus:ring-[#FFCDC8] focus:border focus:border-error-7",
    "gray-secondary": "border-transparent 	bg-gray-3 		text-[#171717] 		hover:bg-gray-4 		focus:ring-2 focus:ring-[#E8E8E8] focus:border focus:border-gray-7",
    "info-secondary": "border-transparent 	bg-info-3 		text-info-11 		hover:bg-info-4 		focus:ring-2 focus:ring-[#96C7F2] focus:border focus:border-info-7",
    "success-secondary": "border-transparent 	bg-success-3 	text-success-11 	hover:bg-success-4 		focus:ring-2 focus:ring-[#CCEBD7] focus:border focus:border-success-7",
    "warning-secondary": "border-transparent 	bg-warning-3 	text-warning-11 	hover:bg-warning-4 		focus:ring-2 focus:ring-[#FFE3A2] focus:border focus:border-warning-7",
    //
    "azure-outline": "border-azure-8 		bg-transparent 	text-azure-11 		hover:bg-azure-4 		focus:ring-2 focus:ring-[#CAE1FF] focus:border focus:border-azure-7",
    "brand-outline": "border-avocado-8 	bg-transparent 	text-avocado-11 	hover:bg-avocado-4 		focus:ring-2 focus:ring-[#D5E6B0] focus:border focus:border-avocado-7",
    "danger-outline": "border-error-8 		bg-transparent 	text-error-11 		hover:bg-error-4 		focus:ring-2 focus:ring-[#FFCDC8] focus:border focus:border-error-7",
    "gray-outline": "border-gray-8 		bg-transparent 	text-[#171717] 		hover:bg-[#F8F8F8] 		focus:ring-2 focus:ring-[#E8E8E8] focus:border focus:border-gray-7",
    "info-outline": "border-info-8 		bg-transparent 	text-info-11 		hover:bg-info-4 		focus:ring-2 focus:ring-[#96C7F2] focus:border focus:border-info-7",
    "success-outline": "border-success-8 	bg-transparent 	text-success-11 	hover:bg-success-4 		focus:ring-2 focus:ring-[#CCEBD7] focus:border focus:border-success-7",
    "warning-outline": "border-warning-8 	bg-transparent 	text-warning-11 	hover:bg-warning-4 		focus:ring-2 focus:ring-[#FFE3A2] focus:border focus:border-warning-7",
    //
    "azure-ghost": "border-none 			bg-transparent 	text-azure-11 		hover:bg-azure-4 		focus:ring-2 focus:ring-[#CAE1FF]",
    "brand-ghost": "border-none 			bg-transparent 	text-avocado-11 	hover:bg-avocado-4 		focus:ring-2 focus:ring-[#D5E6B0]",
    "danger-ghost": "border-none 			bg-transparent 	text-error-11 		hover:bg-error-4 		focus:ring-2 focus:ring-[#FFCDC8]",
    "gray-ghost": "border-none 			bg-transparent 	text-[#171717] 		hover:bg-[#F8F8F8] 		focus:ring-2 focus:ring-[#E8E8E8]",
    "info-ghost": "border-none 			bg-transparent 	text-info-11 		hover:bg-info-4 		focus:ring-2 focus:ring-[#96C7F2]",
    "success-ghost": "border-none 			bg-transparent 	text-success-11 	hover:bg-success-4 		focus:ring-2 focus:ring-[#CCEBD7]",
    "warning-ghost": "border-none 			bg-transparent 	text-warning-11 	hover:bg-warning-4 		focus:ring-2 focus:ring-[#FFE3A2]",
}

const checkboxVariant = cva(
    "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",

    {
        variants: {
            variant: {
                ...variant
            },
            sizes: {
                xs: tw('h-7 py-[4px] text-xs font-normal placeholder:text-sx placeholder:font-normal'),
                sm: tw('h-7 py-[4px] text-sm font-normal placeholder:text-sm placeholder:font-normal'),
                md: tw('h-9 py-[5px] text-[14px] font-normal placeholder:text-[14px] placeholder:font-normal'),
                lg: tw('h-11 py-[5px] text-[14px] font-normal placeholder:text-[14px] placeholder:font-normal'),
                xl: tw('h-11 py-[5px] text-[16px] font-normal placeholder:text-[16px] placeholder:font-normal'),
            },
        },
        defaultVariants: {
            variant: 'brand-primary',
            sizes: 'md',
        },
    }
)



interface CheckboxCustomeProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
    description: string
    titles: string
    variant: 'azure-primary' | 'brand-primary' | 'danger-primary'
    sizes: 'sm' | 'md' | 'lg' | 'xl'
}

const CheckboxDefault = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
            className
        )}
        {...props}
    >
        <CheckboxPrimitive.Indicator
            className={cn("flex items-center justify-center text-current")}
        >
            <Check className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
))
CheckboxDefault.displayName = CheckboxPrimitive.Root.displayName

export { CheckboxDefault }


const CheckboxWithLabel = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    CheckboxCustomeProps

>(({ className, titles, description, variant, sizes, ...props }, ref) => (
    <div className="inline-flex gap-2 items-center">
        <CheckboxPrimitive.Root
            ref={ref}
            className={cn(checkboxVariant({
                variant, sizes
            }),
                className
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                className={cn("flex items-center justify-center text-current")}
            >
                <Check className="h-4 w-4" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        <span>
            {titles && <p className="text-base text-gray-12 font-medium">{titles}</p>}
            {description && <p className="text-sm text-gray-9">{description}</p>}
        </span>

    </div>
))
CheckboxWithLabel.displayName = CheckboxPrimitive.Root.displayName

export { CheckboxWithLabel }


