/// <reference types="react" />
interface ButtonProps {
    size?: "big" | "medium" | "small" | "mini";
    type?: "link" | "button";
    circle?: boolean;
    loading?: boolean;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: () => void;
    className?: string;
    noPadding?: boolean;
    variant?: "primary" | "secondary" | "tertiary";
}
declare const Button: ({ size, type, circle, noPadding, loading, children, variant, className, onClick, }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
export default Button;
