import { InputParams, Settings } from '../../../defaultOptions';
import { BikePrices } from './getBikePrices';

interface EmployerBenefitParams {
    inputParams: InputParams;
    bikePrices?: BikePrices;
    settings: Settings;
}
export interface EmployerBenefit {
    bikes: number;
    other: number;
}
export default function getEmployerBenefit({ settings, inputParams, bikePrices, }: EmployerBenefitParams): EmployerBenefit;
export declare function getPackageBenefit({ settings, insurancePackage, }: {
    settings: Settings;
    insurancePackage: string;
}): number;
export {};
