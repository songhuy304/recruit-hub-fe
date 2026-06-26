import * as React from 'react';

import { cn } from '@/lib/utils';
import { InputGroup, InputGroupAddon, InputGroupText } from './input-group';

export interface InputCustomProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface InputProps extends React.ComponentProps<'input'>, InputCustomProps { }

function Input({ className, type, leftIcon, rightIcon, ...props }: InputProps) {
  return (
    <InputGroup>
      {leftIcon && (
        <InputGroupAddon align="inline-start" className="pr-3">
          <InputGroupText>{leftIcon}</InputGroupText>
        </InputGroupAddon>
      )}
      <input
        type={type}
        data-slot='input'
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className
        )}
        {...props}
      />
      {rightIcon && (
        <InputGroupAddon align="inline-end" className="pl-2">
          <InputGroupText>{rightIcon}</InputGroupText>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}

export { Input };
