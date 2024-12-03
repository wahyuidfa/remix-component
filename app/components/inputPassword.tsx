import React, { useState, forwardRef } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Mail, User, Icon, CheckCircle, AlertCircle, XCircle, EyeOff, Eye, HelpCircle, CheckCircle2 } from 'lucide-react'
import { cn, tw } from '../lib/utils';
import { cva } from 'class-variance-authority';

interface InputPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    variant?: 'default' | 'success' | 'hint' | 'error';
    sizes?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    message?: string;
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



const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
    ({ label, variant = 'default', message, sizes = 'md', className, heading = 'base', ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <div className={
                cn('space-y-1', {
                    'py-1': heading === 'base',
                    'py-2': heading === 'medium',
                    'py-4': heading === 'large',
                    '': heading === 'none'
                })}>
                <Label className='text-gray-10' htmlFor={props.id || label}>{label}</Label>
                <div className="relative">
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        ref={ref}
                        className={cn(
                            inputVariants({ variant, sizes }),
                            {
                                'pr-20': variant === 'success' || variant === 'hint' || variant === 'error',
                                'pr-10': variant === 'default',
                            },
                            className
                        )}
                        {...props}
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={cn(
                            'absolute transition-all duration-300 ease-in-out transform top-0 h-full px-3 py-2 hover:bg-transparent',
                            {
                                'right-8': variant === 'success' || variant === 'hint' || variant === 'error',
                                'right-0': variant === 'default',
                            }
                        )}
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400 " />
                        ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                        )}
                    </Button>
                    {variant !== 'default' && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            {variant === 'success' && <CheckCircle2 className="h-[13.33px] w-[13.33px] text-success-8" />}
                            {variant === 'hint' && <HelpCircle className="h-[13.33px] w-[13.33px] text-gray-8" />}
                            {variant === 'error' && <AlertCircle className="h-[13.33px] w-[13.33px] text-failure-8" />}
                        </div>
                    )}
                </div>
                {
                    message && (
                        <p
                            className={cn('text-sm', {
                                'text-success-9': variant === 'success',
                                'text-gray-9': variant === 'hint',
                                'text-failure-9': variant === 'error',
                            })}
                        >
                            {message}
                        </p>
                    )
                }
            </div >
        );
    }
);

InputPassword.displayName = 'InputPassword';

export { InputPassword };
