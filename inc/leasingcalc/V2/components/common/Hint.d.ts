/// <reference types="react" />
interface HintProps {
    children: React.ReactNode;
    buttonText?: string | React.ReactNode;
    url?: string;
}
declare const Hint: ({ children, buttonText, url }: HintProps) => import("react/jsx-runtime").JSX.Element;
export default Hint;
