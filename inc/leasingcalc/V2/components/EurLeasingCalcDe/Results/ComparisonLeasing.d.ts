import { ComparisonColumnWithBikes, Results } from '../Result';
import { BikePrices } from '../calc/getBikePrices';

interface ComparisonLeasingProps {
    bikePrices?: BikePrices;
    withBikes?: ComparisonColumnWithBikes;
    results?: Results;
}
declare const ComparisonLeasing: ({ bikePrices, withBikes, results, }: ComparisonLeasingProps) => import("react/jsx-runtime").JSX.Element;
export default ComparisonLeasing;
