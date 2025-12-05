import { Options } from '../../defaultOptions';

export declare const OptionContext: import('react').Context<{
    options: Options;
}>;
export default function OptionContextProvider({ options, defaultOptions, children, }: {
    options: object;
    defaultOptions: Options;
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
