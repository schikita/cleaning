"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm shadow-sm",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      </div>
    );
  },
);

Select.displayName = "Select";

// Stub sub-components for compatibility with radix-style imports
const SelectTrigger = Select;
const SelectValue = ({ placeholder }: { placeholder?: string }) => (
  <span className="text-muted-foreground">{placeholder}</span>
);
const SelectContent = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
const SelectItem = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => <option value={value}>{children}</option>;
const SelectGroup = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);
const SelectLabel = ({ children }: { children: React.ReactNode }) => (
  <optgroup label={String(children)} />
);

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
};
