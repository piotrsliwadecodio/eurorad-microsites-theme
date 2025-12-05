import { Options } from './defaultOptions';

export declare const normalizeAttribute: (attribute: string) => string;
export interface WebComponentProps {
    options: Options | string;
    styleSheet: string;
    country: string;
}
declare class EurLeasingCalcWebComponent extends HTMLElement {
    constructor();
    connectedCallback(): void;
    private getPropsFromAttributes;
}
export default EurLeasingCalcWebComponent;
