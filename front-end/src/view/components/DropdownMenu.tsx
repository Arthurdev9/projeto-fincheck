import type { ReactNode } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';

import { cn } from '@app/utils/cn';

export function DropdownMenuRoot({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RadixDropdownMenu.Root>
      {children}
    </RadixDropdownMenu.Root>
  );
}

export function DropdownMenuTrigger({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RadixDropdownMenu.Trigger
      asChild
      className="outline-none"
    >
      {children}
    </RadixDropdownMenu.Trigger>
  );
}

interface DropdownMenuContentProps {
  children: ReactNode;
  className?: string;
  container?: HTMLElement | null;
}

export function DropdownMenuContent({
  container,
  children,
  className = '',
}: DropdownMenuContentProps) {
  return (
    <RadixDropdownMenu.Portal
      container={container ?? undefined}
    >
      <RadixDropdownMenu.Content
        className={cn(
          'bg-white p-2 rounded-2xl space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] data-[side=bottom]:animate-slide-up-and-fade data-[side=top]:animate-slide-down-and-fade',
          className,
        )}
      >
        {children}
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Portal>
  );
}

interface DropdownMenuItemProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onSelect?: () => void;
}

export function DropdownMenuItem({
  children,
  className = '',
  disabled = false,
  onSelect = () => {},
}: DropdownMenuItemProps) {
  return (
    <RadixDropdownMenu.Item
      className={cn(
        'min-h-[40px] outline-none flex items-center py-2 px-4 text-gray-800 text-sm data-[highlighted]:bg-gray-50 rounded-2xl transition-colors cursor-pointer data-[disabled]:bg-gray-200 data-[disabled]:cursor-default',
        className,
      )}
      onSelect={onSelect}
      disabled={disabled}
    >
      {children}
    </RadixDropdownMenu.Item>
  );
}
