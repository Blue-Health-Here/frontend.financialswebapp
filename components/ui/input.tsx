import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    Icon?: React.ComponentType<{ className?: string }>;
    onIconClick?: () => void; 
   }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type,Icon, onIconClick, ...props }, ref) => {
    return (
      <div className="relative">

      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs md:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
        />
        {Icon && (
              <span 
              onClick={onIconClick}
              className="h-5 w-5 absolute right-3 top-[12.8px] text-gray-500 cursor-pointer">
                  <Icon />
              </span>
          )}
        </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
