/// <reference types="react" />
interface SectionProps {
    noBorder?: boolean;
    children: React.ReactNode;
    className?: string;
}
declare const Section: ({ noBorder, children, className }: SectionProps) => import("react/jsx-runtime").JSX.Element;
export default Section;
