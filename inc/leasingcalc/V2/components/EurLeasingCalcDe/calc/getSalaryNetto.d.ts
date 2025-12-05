import { Taxes } from './getTaxes';
import { Insurances } from './2024getInsurances';
import { InputParams } from '../../../defaultOptions';

export interface Salary {
    taxes: Taxes;
    insurances: Insurances;
    contributionsTotal: number;
    salaryNet: number;
}
declare function getSalaryNetto({ taxBasis, inputParams, }: {
    taxBasis: number;
    inputParams: InputParams;
}): Salary;
export default getSalaryNetto;
