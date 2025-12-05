import { default as React } from 'react';

interface HintContextType {
    content: React.ReactNode | null;
    setContent: React.Dispatch<React.SetStateAction<React.ReactNode | null>> | null;
}
export declare const HintContext: React.Context<HintContextType>;
export declare const useHintContext: () => HintContextType;
export default function HintContextProvider({ children, }: {
    children: React.ReactNode[] | React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export {};
