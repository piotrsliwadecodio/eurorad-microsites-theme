import { ComparisonColumnWithBikes } from '../Result';
import { BikePrices } from '../calc/getBikePrices';

interface YourPriceProps {
    bikePrices?: BikePrices;
    withBikes?: ComparisonColumnWithBikes;
}
declare const YourPrice: ({ bikePrices, withBikes }: YourPriceProps) => import("react/jsx-runtime").JSX.Element;
export default YourPrice;
