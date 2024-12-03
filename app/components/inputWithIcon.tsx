import React, { forwardRef, ReactNode } from 'react'
import { AlertCircle, HelpCircle, CheckCircle2 } from 'lucide-react'
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { cva } from 'class-variance-authority'
import { cn, tw } from '~/lib/utils'

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
    variant?: 'default' | 'success' | 'hint' | 'error'
    sizes?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    message?: string,
    heading?: 'base' | 'medium' | 'large' | 'none'
    customLabel?: any
}

// Define variant styles using cva
const inputVariants = cva(
    'relative border text-gray-12 focus-visible:ring-2 focus-visible:border-gray-6 disabled:placeholder-gray-7 disabled:border-gray-7 disabled:bg-gray-3',
    {
        variants: {
            variant: {
                default: tw('border-gray-6 focus-visible:ring-2 focus-visible:ring-avocado-4 focus-visible:border-avocado-6'),
                success: tw('border-success-6 focus-visible:ring-2 focus-visible:ring-success-4 focus-visible:border-success-6'),
                hint: tw('border-gray-6 focus-visible:ring-2 focus-visible:ring-avocado-4 focus-visible:border-avocado-6 text-gray-12'),
                error: tw('border-failure-6 focus-visible:ring-2 focus-visible:ring-failure-4 focus-visible:border-failure-6'),
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
            variant: 'default',
            sizes: 'md',
        },
    }
)

const InputDefault = forwardRef<HTMLInputElement, InputWithIconProps>((
    { type, label, variant = 'default', message, sizes = 'md', className, icon: IconComponent, heading = 'base', customLabel, ...props }, ref) => {

    return (
        <div className={
            cn('space-y-1', {
                'py-1': heading === 'base',
                'py-2': heading === 'medium',
                'py-4': heading === 'large',
                '': heading === 'none'
            })}>
            {customLabel ? <span className='max-h-5'>{customLabel}</span> :
                <Label className='text-gray-10' htmlFor={props.id ?? label}>{label}</Label>}
            <div className="relative">
                {IconComponent && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <IconComponent className="h-5 w-5 text-gray-400" />
                    </div>
                )}
                <Input
                    ref={ref}
                    type={type}
                    className={cn(inputVariants({ variant, sizes }),
                        className,
                        'pr-8')}
                    {...props}
                />
                {variant !== 'default' && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        {variant === 'success' && <CheckCircle2 className="h-[13.33px] w-[13.33px] text-success-8" />}
                        {variant === 'hint' && <HelpCircle className="h-[13.33px] w-[13.33px] text-gray-8" />}
                        {variant === 'error' && <AlertCircle className="h-[13.33px] w-[13.33px] text-failure-8" />}
                    </div>
                )}
            </div>
            {message && (
                <p
                    className={cn("text-sm", {
                        "text-success-9": variant === "success",
                        "text-gray-9": variant === "hint" || variant === "default",
                        "text-failure-9": variant === "error",
                    })}
                >
                    {message}
                </p>
            )}
        </div>
    )
})

InputDefault.displayName = 'InputDefault'
export { InputDefault }
