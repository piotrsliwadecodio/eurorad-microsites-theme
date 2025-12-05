interface InputProps {
    initialValue: number;
    onChange: (newValue: number) => void;
    prefix?: string;
    type: "number" | "text";
    calculatedValue?: number;
    step?: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    placeholder?: string;
    variant?: string;
    required?: boolean;
}
declare const Input: ({ initialValue, calculatedValue, onChange, prefix, type, step, min, max, disabled, placeholder, variant, required, }: InputProps) => import("react/jsx-runtime").JSX.Element;
export default Input;
