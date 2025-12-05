interface SelectProps {
    options?: {
        name: string;
        optValue: string;
    }[];
    disabled?: boolean;
    initialValue?: string;
    onChange?: (value: string) => void;
    type?: "number" | "bool" | "text";
    required?: boolean;
}
declare const Select: ({ options, disabled, initialValue, onChange, type, required, }: SelectProps) => import("react/jsx-runtime").JSX.Element;
export default Select;
