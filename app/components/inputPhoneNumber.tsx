import React, { forwardRef } from 'react'
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from './ui/label'
import { cn, tw } from "../lib/utils"
import { Mail, User, Icon, CheckCircle, AlertCircle, XCircle, EyeOff, Eye, HelpCircle, CheckCircle2 } from 'lucide-react'
import { cva } from 'class-variance-authority'
import { signal } from '@preact/signals'

interface InputPhoneNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    variant?: 'default' | 'success' | 'hint' | 'error'
    sizes?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
    message?: string
    onCountryCodeChange: (value: string) => void
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

export const countryCodes = [
    { code: '+1', id: 'US' },
    { code: '+20', id: 'EG' },
    { code: '+27', id: 'ZA' },
    { code: '+30', id: 'GR' },
    { code: '+31', id: 'NL' },
    { code: '+32', id: 'BE' },
    { code: '+33', id: 'FR' },
    { code: '+34', id: 'ES' },
    { code: '+36', id: 'HU' },
    { code: '+39', id: 'IT' },
    { code: '+40', id: 'RO' },
    { code: '+41', id: 'CH' },
    { code: '+43', id: 'AT' },
    { code: '+44', id: 'GB' },
    { code: '+45', id: 'DK' },
    { code: '+46', id: 'SE' },
    { code: '+47', id: 'NO' },
    { code: '+48', id: 'PL' },
    { code: '+49', id: 'DE' },
    { code: '+51', id: 'PE' },
    { code: '+52', id: 'MX' },
    { code: '+53', id: 'CU' },
    { code: '+54', id: 'AR' },
    { code: '+55', id: 'BR' },
    { code: '+56', id: 'CL' },
    { code: '+57', id: 'CO' },
    { code: '+58', id: 'VE' },
    { code: '+60', id: 'MY' },
    { code: '+61', id: 'AU' },
    { code: '+62', id: 'ID' },
    { code: '+63', id: 'PH' },
    { code: '+64', id: 'NZ' },
    { code: '+65', id: 'SG' },
    { code: '+66', id: 'TH' },
    { code: '+81', id: 'JP' },
    { code: '+82', id: 'KR' },
    { code: '+84', id: 'VN' },
    { code: '+86', id: 'CN' },
    { code: '+90', id: 'TR' },
    { code: '+91', id: 'IN' },
    { code: '+92', id: 'PK' },
    { code: '+93', id: 'AF' },
    { code: '+94', id: 'LK' },
    { code: '+95', id: 'MM' },
    { code: '+98', id: 'IR' },
    { code: '+211', id: 'SS' },
    { code: '+212', id: 'MA' },
    { code: '+213', id: 'DZ' },
    { code: '+216', id: 'TN' },
    { code: '+218', id: 'LY' },
    { code: '+220', id: 'GM' },
    { code: '+221', id: 'SN' },
    { code: '+222', id: 'MR' },
    { code: '+223', id: 'ML' },
    { code: '+224', id: 'GN' },
    { code: '+225', id: 'CI' },
    { code: '+226', id: 'BF' },
    { code: '+227', id: 'NE' },
    { code: '+228', id: 'TG' },
    { code: '+229', id: 'BJ' },
    { code: '+230', id: 'MU' },
    { code: '+231', id: 'LR' },
    { code: '+232', id: 'SL' },
    { code: '+233', id: 'GH' },
    { code: '+234', id: 'NG' },
    { code: '+235', id: 'TD' },
    { code: '+236', id: 'CF' },
    { code: '+237', id: 'CM' },
    { code: '+238', id: 'CV' },
    { code: '+239', id: 'ST' },
    { code: '+240', id: 'GQ' },
    { code: '+241', id: 'GA' },
    { code: '+242', id: 'CG' },
    { code: '+243', id: 'CD' },
    { code: '+244', id: 'AO' },
    { code: '+245', id: 'GW' },
    { code: '+246', id: 'DG' },
    { code: '+247', id: 'AC' },
    { code: '+248', id: 'SC' },
    { code: '+249', id: 'SD' },
    { code: '+250', id: 'RW' },
    { code: '+251', id: 'ET' },
    { code: '+252', id: 'SO' },
    { code: '+253', id: 'DJ' },
    { code: '+254', id: 'KE' },
    { code: '+255', id: 'TZ' },
    { code: '+256', id: 'UG' },
    { code: '+257', id: 'BI' },
    { code: '+258', id: 'MZ' },
    { code: '+260', id: 'ZM' },
    { code: '+261', id: 'MG' },
    { code: '+262', id: 'RE' },
    { code: '+263', id: 'ZW' },
    { code: '+264', id: 'NA' },
    { code: '+265', id: 'MW' },
    { code: '+266', id: 'LS' },
    { code: '+267', id: 'BW' },
    { code: '+268', id: 'SZ' },
    { code: '+269', id: 'KM' },
    { code: '+290', id: 'SH' },
    { code: '+291', id: 'ER' },
    { code: '+297', id: 'AW' },
    { code: '+298', id: 'FO' },
    { code: '+299', id: 'GL' },
    { code: '+350', id: 'GI' },
    { code: '+351', id: 'PT' },
    { code: '+352', id: 'LU' },
    { code: '+353', id: 'IE' },
    { code: '+354', id: 'IS' },
    { code: '+355', id: 'AL' },
    { code: '+356', id: 'MT' },
    { code: '+357', id: 'CY' },
    { code: '+358', id: 'FI' },
    { code: '+359', id: 'BG' },
    { code: '+370', id: 'LT' },
    { code: '+371', id: 'LV' },
    { code: '+372', id: 'EE' },
    { code: '+373', id: 'MD' },
    { code: '+374', id: 'AM' },
    { code: '+375', id: 'BY' },
    { code: '+376', id: 'AD' },
    { code: '+377', id: 'MC' },
    { code: '+378', id: 'SM' },
    { code: '+379', id: 'VA' },
    { code: '+380', id: 'UA' },
    { code: '+381', id: 'RS' },
    { code: '+382', id: 'ME' },
    { code: '+383', id: 'XK' },
    { code: '+385', id: 'HR' },
    { code: '+386', id: 'SI' },
    { code: '+387', id: 'BA' },
    { code: '+389', id: 'MK' },
    { code: '+420', id: 'CZ' },
    { code: '+421', id: 'SK' },
    { code: '+423', id: 'LI' }
];

const InputPhoneNumber = forwardRef<HTMLInputElement, InputPhoneNumberProps>((
    {
        label,
        variant = 'default',
        message,
        sizes = 'md',
        className,
        heading = 'base',
        onCountryCodeChange,
        ...props
    }, ref
) => {

    const handleCountryCodeChange = (value: string) => {
        if (onCountryCodeChange) onCountryCodeChange(value); // Notify parent component
    };;

    return (
        <div className={
            cn('space-y-1', {
                'py-1': heading === 'base',
                'py-2': heading === 'medium',
                'py-4': heading === 'large',
                '': heading === 'none'
            })}>
            < Label className='text-gray-10' htmlFor={props.id || label}>{label}</Label>
            <div className="flex relative">
                <Input
                    ref={ref}
                    type="number"
                    className={cn("pl-[60px] pr-10", inputVariants({ variant, sizes }), className)}
                    placeholder="Phone Number"
                    {...props}
                />
                <Select onValueChange={handleCountryCodeChange}>
                    <SelectTrigger className={cn({
                        'h-7 py-[4px] text-xs font-normal': sizes === 'xs',
                        'h-7 py-[4px] text-sm font-normal': sizes === 'sm',
                        'h-9 py-[5px] text-[14px] font-normal': sizes === 'md',
                        'h-11  py-[5px] text-[14px] font-medium': sizes === 'lg',
                        'h-11 py-[5px] text-[16px] font-normal': sizes === 'xl'
                    }, "absolute left-0 gap-0 top-0 bottom-0 w-[64px] rounded-r-none border-none focus:ring-transparent focus:outline-none focus:border-transparent border-r-0")}>
                        <SelectValue placeholder="US" />
                    </SelectTrigger>
                    <SelectContent>
                        {countryCodes.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                                {country.id}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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

InputPhoneNumber.displayName = 'InputPhoneNumber'

export { InputPhoneNumber }

