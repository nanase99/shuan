import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../Form/";
import { Input, type InputProps } from "../Input";

export type FormInputProps = InputProps & {
  name: string;
  label?: string;
};

export function FormInput({
  name,
  label,
  onChange,
  onBlur,
  ...props
}: FormInputProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...props}
              {...field}
              onChange={(e) => {
                onChange?.(e);
                field.onChange(e);
              }}
              onBlur={(e) => {
                onBlur?.(e);
                field.onBlur();
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
