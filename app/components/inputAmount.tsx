import React, { useState, useRef, forwardRef } from 'react';
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "./ui/select";
import { cn, tw } from "../lib/utils";
import { AlertCircle, HelpCircle, CheckCircle2 } from 'lucide-react'
import { cva } from 'class-variance-authority';

interface InputAmountProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label: string;
    variant?: 'default' | 'success' | 'hint' | 'error';
    sizes?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    message?: string;
    onChange?: (value: number) => void;
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

const currencies = [
    { code: 'USD', symbol: '$', country: 'US' },
    { code: 'EUR', symbol: '€', country: 'EU' },
    { code: 'GBP', symbol: '£', country: 'GB' },
    { code: 'JPY', symbol: '¥', country: 'JP' },
    { code: 'CNY', symbol: '¥', country: 'CN' },
    { code: 'AUD', symbol: '$', country: 'AU' }, // Australia
    { code: 'CAD', symbol: '$', country: 'CA' }, // Canada
    { code: 'CHF', symbol: 'Fr.', country: 'CH' }, // Switzerland
    { code: 'INR', symbol: '₹', country: 'IN' }, // India
    { code: 'RUB', symbol: '₽', country: 'RU' }, // Russia
    { code: 'BRL', symbol: 'R$', country: 'BR' }, // Brazil
    { code: 'ZAR', symbol: 'R', country: 'ZA' }, // South Africa
    { code: 'KRW', symbol: '₩', country: 'KR' }, // South Korea
    { code: 'SGD', symbol: '$', country: 'SG' }, // Singapore
    { code: 'HKD', symbol: '$', country: 'HK' }, // Hong Kong
    { code: 'MXN', symbol: '$', country: 'MX' }, // Mexico
    { code: 'IDR', symbol: 'Rp', country: 'ID' }, // Indonesia
    { code: 'SAR', symbol: '﷼', country: 'SA' }, // Saudi Arabia
    { code: 'AED', symbol: 'د.إ', country: 'AE' }, // United Arab Emirates
    { code: 'THB', symbol: '฿', country: 'TH' }, // Thailand
    { code: 'MYR', symbol: 'RM', country: 'MY' }, // Malaysia
    { code: 'PHP', symbol: '₱', country: 'PH' }, // Philippines
    { code: 'TRY', symbol: '₺', country: 'TR' }, // Turkey
    { code: 'NGN', symbol: '₦', country: 'NG' }, // Nigeria
    { code: 'PLN', symbol: 'zł', country: 'PL' }, // Poland
    { code: 'SEK', symbol: 'kr', country: 'SE' }, // Sweden
    { code: 'NOK', symbol: 'kr', country: 'NO' }, // Norway
    { code: 'DKK', symbol: 'kr', country: 'DK' }, // Denmark
    { code: 'ARS', symbol: '$', country: 'AR' }, // Argentina
    { code: 'CLP', symbol: '$', country: 'CL' }, // Chile
    { code: 'EGP', symbol: '£', country: 'EG' }, // Egypt
    { code: 'PKR', symbol: '₨', country: 'PK' }, // Pakistan
    { code: 'VND', symbol: '₫', country: 'VN' }, // Vietnam
    { code: 'BDT', symbol: '৳', country: 'BD' }, // Bangladesh
];

const InputAmount = forwardRef<HTMLInputElement, InputAmountProps>((
    { label, variant = 'default', message, sizes = 'md', onChange, heading = 'base', ...props }
    , ref) => {
    const [currency, setCurrency] = useState(currencies[0]);
    const [inputValue, setInputValue] = useState<string>(''); // State untuk nilai input


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, ""); // Hanya angka
        const formattedValue = new Intl.NumberFormat().format(Number(rawValue));
        setInputValue(formattedValue);
        if (onChange) {
            onChange(Number(rawValue));
        }
    };

    return (
        <div className={
            cn('space-y-1', {
                'py-1': heading === 'base',
                'py-2': heading === 'medium',
                'py-4': heading === 'large',
                '': heading === 'none'
            })}>
            <Label className='text-gray-10' htmlFor={props.id ?? label}>{label}</Label>
            <div className="relative flex items-center">
                <Input
                    ref={ref}
                    type="text"
                    value={inputValue} // Ikat state ke value input
                    className={cn("pl-10 pr-20", inputVariants({ variant, sizes }))}
                    onChange={handleInputChange}
                    {...props}
                />
                <div className="absolute left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">{currency.symbol}</span>
                </div>
                <Select

                    value={currency.code}
                    onValueChange={(value) => setCurrency(currencies.find((c) => c.code === value) || currencies[0])}
                >
                    <SelectTrigger className="border-none focus:outline-none focus:ring-transparent focus:border-transparent absolute right-0 top-0 bottom-0 w-[60px] rounded-l-none border-l">
                        <SelectValue placeholder={currency.code} />
                    </SelectTrigger>
                    <SelectContent>
                        {currencies.map((c) => (
                            <SelectItem key={c.code} value={c.code}>
                                {c.country}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {variant !== 'default' && (
                    <div className="absolute inset-y-0 right-14 flex items-center  pointer-events-none">
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
    );
})

InputAmount.displayName = 'InputAmount'

export { InputAmount }


