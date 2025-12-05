import { InputParams, Settings } from '../../defaultOptions';
import { EmployerBenefit } from './calc/getEmployerBenefit';
import { BikePrices } from './calc/getBikePrices';
import { Salary } from './calc/getSalaryNetto';

interface Savings {
    savingsAbsolute: number;
    savingsLeasingAbsolute: number;
    savingsLeasingPercent: number;
    savingsPercent: number;
}
export interface ComparisonColumn {
    taxBasis: number;
    contributions: Salary;
    salaryGross: number;
    salaryNet: number;
}
export interface ComparisonColumnWithBikes extends ComparisonColumn {
    leasingRate: number;
    leasingTotal: number;
    salaryGross: number;
    salaryNet: number;
    takeoverPrice: number;
    totalCost: number;
}
export interface Comparison {
    withoutBikes: ComparisonColumn;
    withBikes: ComparisonColumnWithBikes;
}
export interface Results {
    comparison?: Comparison;
    settings?: Settings;
    inputParams?: InputParams;
    savings?: Savings;
    bikePrices?: BikePrices;
    benefit?: EmployerBenefit;
}
interface ResultsProps {
    results?: Results;
    extended?: boolean;
    layout?: "rows" | "columns";
}
declare const Result: ({ results, extended, layout }: ResultsProps) => import("react/jsx-runtime").JSX.Element;
export default Result;
