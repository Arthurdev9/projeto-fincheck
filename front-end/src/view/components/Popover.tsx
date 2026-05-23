import type { ReactNode } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';

import { cn } from '@app/utils/cn';

interface PopoverRootProps {
  children: ReactNode;
}

export function PopoverRoot({ children }: PopoverRootProps) {
  return (
    <RadixPopover.Root>
      {children}
    </RadixPopover.Root>
  );
}

interface PopoverTriggerProps {
  children: ReactNode;
}

export function PopoverTrigger({ children }: PopoverTriggerProps) {
  return (
    <RadixPopover.Trigger asChild>
      {children}
    </RadixPopover.Trigger>
  );
}

interface PopoverContentProps {
  children: ReactNode;
  className?: string;
}

export function PopoverContent({
  children,
  className = '',
}: PopoverContentProps) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        className={cn(
          'bg-white p-2 rounded-2xl space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] data-[side=bottom]:animate-slide-up-and-fade data-[side=top]:animate-slide-down-and-fade',
          className,
        )}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );
}
