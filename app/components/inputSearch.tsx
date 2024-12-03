import React, { forwardRef, useState } from 'react'
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Search, X } from 'lucide-react'
import { cn, tw } from "../lib/utils"
import { CheckCircle, AlertCircle, HelpCircle } from 'lucide-react'
import { cva } from 'class-variance-authority'

interface InputSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    variant?: 'default' | 'success' | 'hint' | 'error'
    sizes?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    message?: string
    onSearch?: (value: string) => void
    heading?: 'base' | 'medium' | 'large' | 'none'
}

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

const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>((
    { label, variant = 'default', message, sizes = 'md', onSearch, heading = 'base', ...props }, ref
) => {
    const [value, setValue] = useState('')
    const handleSearch = () => {
        onSearch && onSearch(value)
    }

    const handleClear = () => {
        setValue('')
        onSearch && onSearch('')
    }

    return (
        <div className={cn('space-y-1', {
            'py-1': heading === 'base',
            'py-2': heading === 'medium',
            'py-4': heading === 'large',
            '': heading === 'none'
        })}>
            <label htmlFor={props.id || label} className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="relative">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className=" absolute left-0 top-0 bottom-0 px-3 py-2 hover:bg-transparent"
                    onClick={handleSearch}
                >
                    <Search className={`text-gray-400 h-5 w-5`} />
                </Button>
                <Input
                    ref={ref}
                    type="search"
                    className={cn("pl-10 pr-10", inputVariants({ variant, sizes }))}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    {...props}
                />
                {value && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 bottom-0 px-3 py-2 hover:bg-transparent"
                        onClick={handleClear}
                    >
                        <X className={`text-gray-400 h-[13.33px] w-[13.33px]`} />
                    </Button>
                )}
            </div>
            {message && (
                <p className={cn("text-sm", {
                    'text-success-8': variant === 'success',
                    'text-gray-8': variant === 'hint',
                    'text-failure-8': variant === 'error'
                })}>
                    {message}
                </p>
            )}
        </div>
    )
})

InputSearch.displayName = 'InputSearch'

export { InputSearch }




// export function InputSearch({
//     label,
//     variant = 'default',
//     message,
//     sizes = 'md',
//     className,
//     onSearch,
//     ...props
// }: InputSearchProps) {
//     const [value, setValue] = useState('')
//     const { className: variantClassName } = variantMap[variant]
//     const { className: sizesClass, iconSize } = sizesMap[sizes]
//     const id = React.useId()

//     const handleSearch = () => {
//         onSearch && onSearch(value)
//     }

//     const handleClear = () => {
//         setValue('')
//         onSearch && onSearch('')
//     }

//     return (
//         <div id={id} className="space-y-1">
//             <label htmlFor={props.id || label} className="block text-sm font-medium text-gray-700">{label}</label>
//             <div className="relative">
//                 <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     className="absolute left-0 top-0 bottom-0 px-3 py-2 hover:bg-transparent"
//                     onClick={handleSearch}
//                 >
//                     <Search className={`text-gray-400`} size={iconSize} />
//                 </Button>
//                 <Input
//                     id={id}
//                     type="search"
//                     className={cn("pl-10 pr-10", variantClassName, className, sizesClass)}
//                     value={value}
//                     onChange={(e) => setValue(e.target.value)}
//                     {...props}
//                 />
//                 {value && (
//                     <Button
//                         type="button"
//                         variant="ghost"
//                         size="icon"
//                         className="absolute right-0 top-0 bottom-0 px-3 py-2 hover:bg-transparent"
//                         onClick={handleClear}
//                     >
//                         <X className={`text-gray-400`} size={iconSize} />
//                     </Button>
//                 )}
//             </div>
//             {message && (
//                 <p className={cn("text-sm", {
//                     'text-success-8': variant === 'success',
//                     'text-gray-8': variant === 'hint',
//                     'text-failure-8': variant === 'error'
//                 })}>
//                     {message}
//                 </p>
//             )}
//         </div>
//     )
// }

