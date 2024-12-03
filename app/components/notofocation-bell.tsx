import React from 'react'
import { Bell } from 'lucide-react'
import { Button } from '~/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '~/components/ui/popover'

interface NotificationBellProps {
    count: number
    onOpen?: () => void
    children?: React.ReactNode
}

export function NotificationBell({ count, onOpen, children }: Readonly<NotificationBellProps>) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    onClick={onOpen}
                    aria-label={`${count} unread notifications`}
                >
                    <Bell className="h-5 w-5" />
                    {count > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                            {count > 99 ? '99+' : count}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                            You have {count} unread {count === 1 ? 'notification' : 'notifications'}.
                        </p>
                    </div>
                    {children}
                </div>
            </PopoverContent>
        </Popover>
    )
}

