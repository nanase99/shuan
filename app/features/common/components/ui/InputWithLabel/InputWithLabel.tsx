import * as React from "react";

import { Input, type InputProps } from "../Input/Input";
import { Label } from "../Label";

export interface InputWithLabelProps extends InputProps {
  label: string;
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ id, label, ...props }, ref) => {
    return (
      <div className="grid w-full max-w-sm items-center">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} {...props} ref={ref} />
      </div>
    );
  },
);
InputWithLabel.displayName = "InputWithLabel";

export { InputWithLabel };
