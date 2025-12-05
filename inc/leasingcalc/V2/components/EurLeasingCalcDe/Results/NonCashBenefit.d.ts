import { BikePrices } from '../calc/getBikePrices';

interface NonCashBenefitProps {
    bikePrices?: BikePrices;
    useFullBikeUvpPrice?: boolean;
}
declare const NonCashBenefit: ({ bikePrices, useFullBikeUvpPrice, }: NonCashBenefitProps) => import("react/jsx-runtime").JSX.Element;
export default NonCashBenefit;
