import { AlertCircle, CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "~/lib/utils"

const notificationVariants = cva(
    "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
    {
        variants: {
            variant: {
                default: "bg-background text-foreground",
                destructive:
                    "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const iconMap = {
    info: Info,
    success: CheckCircle2,
    warning: AlertCircle,
    error: XCircle,
}

export interface NotificationProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notificationVariants> {
    type?: keyof typeof iconMap
    title?: string
    description?: string
    onClose?: () => void
}

export function Notification({
    className,
    variant,
    type = "info",
    title,
    description,
    onClose,
    ...props
}: NotificationProps) {
    const Icon = iconMap[type]

    return (
        <div
            className={cn(
                notificationVariants({ variant }),
                className
            )}
            {...props}
        >
            <Icon className="h-4 w-4" />
            <div className="flex items-start space-x-2">
                <div className="flex-1">
                    {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
                    {description && <div className="text-sm [&_p]:leading-relaxed">{description}</div>}
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="ml-4 rounded-full p-1 hover:bg-muted"
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </button>
                )}
            </div>
        </div>
    )
}

