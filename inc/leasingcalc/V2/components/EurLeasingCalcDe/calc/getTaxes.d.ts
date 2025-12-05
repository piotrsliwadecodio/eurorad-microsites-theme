import { InputParams } from '../../../defaultOptions';
import { BMFCalculator } from './calculate';

interface TaxInputParams {
    inputParams: InputParams;
    taxBasis: number;
}
export interface Taxes {
    total: number;
    church: number;
    income: number;
    soli: number;
    b: BMFCalculator;
}
declare function getTaxes({ inputParams, taxBasis }: TaxInputParams): Taxes;
export default getTaxes;
