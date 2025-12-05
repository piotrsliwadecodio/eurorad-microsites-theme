import { BikePrices } from '../calc/getBikePrices';

declare const LeasingCosts: ({ bikePrices }: {
    bikePrices?: BikePrices;
}) => import("react/jsx-runtime").JSX.Element;
export default LeasingCosts;
