import { BMFCalculator } from './calculate';

export interface Insurances {
    employee: {
        total: number;
        aVers: number;
        rVers: number;
        pVers: number;
        kVers: number;
    };
    employer: {
        total: number;
        aVers: number;
        rVers: number;
        pVers: number;
        kVers: number;
    };
}
declare const getInsurances: ({ healthInsuranceFactor, childrenCount, taxBasis, b, }: {
    healthInsuranceFactor?: number;
    taxBasis: number;
    childrenCount?: number;
    b: BMFCalculator;
}) => Insurances;
export default getInsurances;
