import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, onChangeValue, onChangeFunction, type, ...props }, ref) => {
  return (
    (<input
      onChange={onChangeFunction}
      value={onChangeValue}
      type={type}
      className={cn(
        "flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        // "bg-background block text-sm text-white file:ml-14 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:opacity-80",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
